import React, { useReducer } from "react";
import uuid from "uuid";
import contactContext from "./contactContext";
import contactReducer from "./contactReducer";

import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from "../types";

//  CREATE INITIAL STATE
const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "Saurav Raj",
        email: "saurav@gmail.com",
        phone: "3424324234",
        type: "personal",
      },
      {
        id: 1,
        name: "Sonalika ",
        email: "sonalika@gmail.com",
        phone: "3424324234",
        type: "personal",
      },
      {
        id: 1,
        name: "Brad Trav",
        email: "brad@gmail.com",
        phone: "37898794234",
        type: "professional",
      },
    ],
  };

  //State allows us to access anything in state
  //Dispatch allows us to dispatch objects to the Reducer
  const [state, dispatch] = useReducer(contactReducer, initialState);

  //ADD CONTACT

  //DELETE CONTACT

  //SET CURRENT CONTACT

  //CLEAR CURRNET CONTACT

  //UPDATE CONTACT

  //FILTER CONTACTS

  //CLEAR FILTERS

  return (
    <contactContext.Provider
      value={{
        contacts: state.contacts,
      }}
    >
      {props.children}
    </contactContext.Provider>
  );
};

export default ContactState;
