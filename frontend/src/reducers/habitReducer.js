import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  getHabits,
  createHabit,
  getHabitDetails,
  updateHabit,
  deleteHabit,
  markHabitComplete,
  getHabitSummary,
} from '../actions/habitActions';

// ✅ Thunks
export const fetchHabits = createAsyncThunk('habits/fetchHabits', getHabits);
export const addHabit = createAsyncThunk('habits/addHabit', createHabit);
export const fetchHabitDetails = createAsyncThunk('habits/fetchHabitDetails', getHabitDetails);
export const editHabit = createAsyncThunk('habits/editHabit', updateHabit);
export const removeHabit = createAsyncThunk('habits/removeHabit', deleteHabit);
export const completeHabit = createAsyncThunk('habits/completeHabit', markHabitComplete);
export const fetchHabitSummary = createAsyncThunk('habits/fetchHabitSummary', getHabitSummary);

const initialState = {
  habits: [],
  habit: {},
  summary: {},
  loading: false,
  error: null,
  isCreated: false,
  isUpdated: false,
  isDeleted: false,
  isCompleted: false,
  successMessage: null,

  // ✅ For full-page goal completion flow
  goalCompletion: {
    habit: null, // stores the habit that achieved the goal
  },
};

const habitSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    createHabitReset: (state) => {
      state.isCreated = false;
    },
    updateHabitReset: (state) => {
      state.isUpdated = false;
    },
    deleteHabitReset: (state) => {
      state.isDeleted = false;
    },
    markHabitCompleteReset: (state) => {
      state.isCompleted = false;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },

    // ✅ Manually set or reset goal completion habit
    setGoalCompletionHabit: (state, action) => {
      state.goalCompletion.habit = action.payload; // habit object or null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all habits
      .addCase(fetchHabits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.loading = false;
        state.habits = action.payload;
      })
      .addCase(fetchHabits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Fetch single habit details
      .addCase(fetchHabitDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHabitDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.habit = action.payload;
      })
      .addCase(fetchHabitDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create a new habit
      .addCase(addHabit.pending, (state) => {
        state.loading = true;
      })
      .addCase(addHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.isCreated = true;
        state.habits.push(action.payload.habit);
      })
      .addCase(addHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Update a habit
      .addCase(editHabit.pending, (state) => {
        state.loading = true;
      })
      .addCase(editHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.isUpdated = true;
        state.habits = state.habits.map((habit) =>
          habit._id === action.payload.habit._id ? action.payload.habit : habit
        );
      })
      .addCase(editHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Delete a habit
      .addCase(removeHabit.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.isDeleted = true;
        state.habits = state.habits.filter(
          (habit) => habit._id !== action.meta.arg
        );
      })
      .addCase(removeHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Mark habit as complete
      .addCase(completeHabit.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.isCompleted = false;
      })
      .addCase(completeHabit.fulfilled, (state, action) => {
        state.loading = false;
        state.isCompleted = true;
        state.successMessage = 'Habit marked complete!';
        state.habits = state.habits.map((habit) =>
          habit._id === action.payload.habit._id ? action.payload.habit : habit
        );
      })
      .addCase(completeHabit.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Get habit summary
      .addCase(fetchHabitSummary.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHabitSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.summary = action.payload;
      })
      .addCase(fetchHabitSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  clearErrors,
  createHabitReset,
  updateHabitReset,
  deleteHabitReset,
  markHabitCompleteReset,
  clearSuccessMessage,
  setGoalCompletionHabit,
} = habitSlice.actions;

export default habitSlice.reducer;
