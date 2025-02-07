import { create } from 'zustand'


const useQuizStore = create((set) => ({
  questions: [
    {
      id: 1,
      question: 'VOID Linux is based on?',
      options: ['Arch Linux', 'Ubuntu', 'None', 'Fedora'],
      answer: 'None',

    },
    {
      id: 2,
      question: "Linux doesn't support which filesystem upstream?",
      options: ['BCacheFS', 'F2FS', 'EXT4', 'APFS'],
      answer: 'APFS',

    },
    {
      id: 3,
      question: "What is the origin of Pisi Linux?",
      options: ['Spain', 'Turkey', 'France', 'Italy'],
      answer: 'Turkey',

    },
    {
      id: 4,
      question: "What was the first kernel release to include support for Rust?",
      options: ['6.1', '6.10', '6.6', '6.4'],
      answer: '6.1',

    },
    {
      id: 5,
      question: "What's the default desktop of Red Star OS based on?",
      options: ['Gnome', 'Plasma', 'XFCE', 'Deepin'],
      answer: 'Plasma',
    },
    {
      id: 6,
      question: "What doesn't belong?",
      options: ['MX Linux', 'Garuda Linux', 'CatchyOS', 'Manjaro'],
      answer: 'MX Linux',

    },
  ],
  answers: {},
  score: 0,
  currentQuestionIndex: 0,

  setAnswer: (questionId, selectedAnswer) => {
    set((state) => {
      const updatedAnswers = { ...state.answers, [questionId]: selectedAnswer };

      // Calculate score
      const newScore = state.questions.reduce((score, question) => {
        return score + (updatedAnswers[question.id] === question.answer ? 1 : 0);
      }, 0);

      return { answers: updatedAnswers, score: newScore };
    });
  },

  nextQuestion: () => {
    set((state) => {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex < state.questions.length) {
        return { currentQuestionIndex: nextIndex };
      } else {
        return { currentQuestionIndex: state.questions.length - 1 }; 
      }
    });
  },

  resetQuiz: () => set({ answers: {}, score: 0, currentQuestionIndex: 0 }),
}));

export default useQuizStore;