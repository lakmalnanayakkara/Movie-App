import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,

  savedMovies: localStorage.getItem("savedMovies")
    ? JSON.parse(localStorage.getItem("savedMovies"))
    : [],
};

function reducer(state, action) {
  switch (action.type) {
    case "USER_SIGNIN":
      return { ...state, userInfo: action.payload };
    case "USER_SIGNOUT":
      return {
        userInfo: null,
      };
    case "SAVE_MOVIE":
      const newMovie = action.payload;
      const newFavMovies = [...state.savedMovies, newMovie];
      localStorage.setItem("savedMovies", JSON.stringify(newFavMovies));
      return { ...state, savedMovies: newFavMovies };
    case "UNSAVE_MOVIE":
      const movies = state.savedMovies.filter(
        (item) => item.id !== action.payload.id
      );
      localStorage.setItem("savedMovies", JSON.stringify(movies));
      return { ...state, savedMovies: movies };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
