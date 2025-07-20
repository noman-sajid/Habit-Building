import api from '../services/axiosInstance';

// Create a new habit
export const createHabit = async (habitData) => {
  const response = await api.post('/habits', habitData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

// Get all habits for the logged-in user
export const getHabits = async () => {
  const response = await api.get('/habits');
  return response.data.habits;
};

// Get a single habit's details
export const getHabitDetails = async (id) => {
  const response = await api.get(`/api/habits/${id}`);
  return response.data.habit;
};

// Update a habit
export const updateHabit = async ({ id, habitData }) => {
  const response = await api.put(`/api/habits/${id}`, habitData, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

// Mark a habit as complete
export const markHabitComplete = async (id) => {
  const response = await api.patch(`/api/habits/${id}/complete`);
  return response.data;
};

// Get summary of habits
export const getHabitSummary = async () => {
  const response = await api.get('/api/habits/summary');
  return response.data;
};



// Delete a habit
export const deleteHabit = async (id) => {
  const response = await api.delete(`/api/habits/${id}`);
  return response.data;
};
