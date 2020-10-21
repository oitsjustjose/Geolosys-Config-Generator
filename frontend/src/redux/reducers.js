const defaultState = {
  isAuthenticated: false,
  user: null,
  mc114: true,
};

export default function reducer(
  state = defaultState,
  action,
) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: {
          ...action.user,
        },
        isAuthenticated: true,
      };
    case 'CLEAR_USER':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    case 'TOGGLE_MC_VER':
      return {
        ...state,
        mc114: !state.mc114,
      };
    case 'SET_CONFIGS':
      return {
        ...state,
        configs: action.configs,
      };
    default:
      return state;
  }
}
