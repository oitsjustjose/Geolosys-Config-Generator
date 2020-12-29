const defaultState = {
  isAuthenticated: false,
  user: null,
  mc114: true,
  editing: null,
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
    case 'SET_CONFIG_EDITING':
      return {
        ...state,
        editing: {
          id: action.id,
          json: action.json,
          name: action.name,
        },
      };
    default:
      return state;
  }
}
