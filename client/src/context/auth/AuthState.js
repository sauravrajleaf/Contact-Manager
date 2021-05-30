import React, { useReducer, useContext } from "react";
import { v4 as uuid } from "uuid";

import AuthContext from "./authContext";
import authReducer from "./authReducer";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from "../types";

//CREATE INITIAL STATE
const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  //STATE ALLOWS US TO USE ANYTHING WE PUT IN THE STATE
  //DISPATCH ALLOWS US TO DISPATCH OBJECTS,ACTIONS,METHODS OR ANYTHING TO REDUCER
  const [state, dispatch] = useReducer(authReducer, initialState);

  //ACTIONS

  //LOAD USER - WHICH IS GOING TO TAKE CARE OF WHICH USER IS LOGGED AND ITS GOING TO HIT THAT AUTH ENDPOINT AND GET THE USER DATA

  //REGISTER USER - WHICH SIGNS THE USER UP AND GETS A TOKEN BACK

  //LOGIN USER - WHICH WILL LOG THE USER IN AND GET THE TOKEN

  //LOGOUT - WHICH WILL DESTROY THE TOKEN AND JUST CLEAR EVERYTHIN UP

  //CLEAR_ERRORS - TO CLEAR OUT ANY ERRORS IN THE STATE

  //BY SURROUNDING THE COMPONENT IN THE SPECIFIC PROVIDER TAGS WE GET ACCESS TO THE STATE AND FUCNTIONS OF THE PROVIDER
  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        user: state.user,
        error: state.error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
