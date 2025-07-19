const descriptionSuggestionMap = {
    run: [
        "To improve my cardiovascular health and endurance.",
        "To clear my head and reduce stress after a long day.",
        "To train for the upcoming 5k race.",
        "To feel more energized and start my day on a positive note."
    ],
    read: [
        "To expand my knowledge in my field of work.",
        "To enjoy new stories and escape into different worlds.",
        "To make it a relaxing part of my bedtime routine, away from screens.",
        "To learn at least one new thing every day."
    ],
    meditate: [
        "To find a moment of calm and mindfulness each morning.",
        "To improve my focus and reduce anxiety throughout the day.",
        "To connect with my inner self and find clarity.",
        "To let go of stress and tension before I go to sleep."
    ],
    water: [
        "To stay hydrated and improve my overall health.",
        "To boost my energy levels and avoid afternoon slumps.",
        "To improve my skin complexion and feel healthier.",
        "To support my physical performance during workouts."
    ],
    gym: [
        "To build strength and increase my muscle mass.",
        "To feel more confident and comfortable in my own skin.",
        "To have a dedicated time for myself and my well-being.",
        "To improve my discipline and mental toughness."
    ],
    code: [
        "To build my dream project, one line at a time.",
        "To become a better software engineer and advance my career.",
        "To contribute to an open-source project I believe in.",
        "To keep my mind sharp and always be learning."
    ],
    write: [
        "To express my thoughts and feelings in a private journal.",
        "To finish the first draft of my novel.",
        "To improve my communication skills and become more articulate.",
        "To share my ideas with the world by blogging."
    ],
    'no sugar': [
        "To reduce my cravings and improve my diet.",
        "To have more stable energy levels throughout the day.",
        "To improve my health and reduce the risk of chronic diseases.",
        "To lose weight and feel better about my body."
    ],
    music: [
        "To finally learn how to play my favorite song on the guitar.",
        "To express my creativity and emotions through music.",
        "To have a relaxing hobby that brings me joy.",
        "To practice daily and become a more skilled musician."
    ],
    learn: [
        "To acquire a new skill that will help me in my career.",
        "To challenge my brain and stay curious.",
        "To understand the world from a new perspective.",
        "To invest in my personal growth and development."
    ],
};

const defaultSuggestions = [
    "To become a better version of myself.",
    "To build discipline and consistency.",
    "To invest in my long-term health and happiness.",
    "To prove to myself that I can achieve my goals."
];

/**
 * Shuffles an array in place.
 * @param {Array} array The array to shuffle.
 * @returns {Array} The shuffled array.
 */
export const shuffleArray = (array) => {
  let currentIndex = array.length, randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};


/**
 * Gets a list of motivational suggestions for a given habit title.
 * @param {string} title The title of the habit.
 * @returns {string[]} A list of suggestions.
 */
export const getSuggestions = (title = '') => {
    const titleLower = title.toLowerCase();
    const foundKey = Object.keys(descriptionSuggestionMap).find((key) =>
      titleLower.includes(key)
    );
    const suggestions = foundKey ? descriptionSuggestionMap[foundKey] : defaultSuggestions;
    
    // Return a shuffled copy of the suggestions
    return shuffleArray([...suggestions]);
};