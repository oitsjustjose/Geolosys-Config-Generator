const defaultState = {
    isAuthenticated: false,
    user: null,
    posts: null,
    editingPost: null,
  //   editingPost: {
  //     id: null,
  //     title: null,
  //     contents: null,
  //   },
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
      default:
        return state;
    }
  }
  