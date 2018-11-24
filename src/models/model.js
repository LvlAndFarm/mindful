export default {
  namespace: 'index',
  state: {
    pending: [{
      subject: "Physics",
      concept: "Electricity: Resistivity of an element/compound",
      icon: "https://static.thenounproject.com/png/98751-200.png"
    },
      {
        subject: "Chemistry",
        concept: "Dative covalent bonding",
        icon: "https://cdn0.iconfinder.com/data/icons/industrial-icons/164/5-512.png"
      },
      {
        subject: "Further Maths",
        concept: "Equation of a plane",
        icon: "https://png.pngtree.com/svg/20170124/function_1249798.png"
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
