export default {
  namespace: 'index',
  state: {
    pending: [{
      subject: "Physics",
      concept: "Electricity: Potential difference",
      icon: "https://static.thenounproject.com/png/98751-200.png",
      duration: "10 mins",
      difficulty: "MEDIUM"
    },
      {
        subject: "Chemistry",
        concept: "Dative covalent bonding",
        icon: "https://cdn0.iconfinder.com/data/icons/industrial-icons/164/5-512.png",
        duration: "10 mins",
        difficulty: "EASY"
      },
      {
        subject: "Further Maths",
        concept: "Equation of a plane",
        icon: "https://png.pngtree.com/svg/20170124/function_1249798.png",
        duration: "15 mins",
        difficulty: "MEDIUM"
      },
      {
        subject: "Maths",
        concept: "Scalar product",
        icon: "https://png.pngtree.com/svg/20160622/math_777518.png",
        duration: "10 mins",
        difficulty: "EASY"
      }
    ],

    showPreview: false
  },
  reducers: {
    'delete'(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
    'preview'(state, { payload: toggle }) {
      return {...state, showPreview: toggle};
    }
  },
};
