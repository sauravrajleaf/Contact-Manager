import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import ContactItem from "./ContactItem";

import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  //NOW WE HAVE ACCESS TO ANY STATE OR METHODS OR ACTIONS ASSOCIATED WITH ContactContext
  const contactContext = useContext(ContactContext);

  //PULLING THE STATE DATA FROM ContactContex via destructring
  const { contacts, filtered, clearFilter } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        {filtered
          ? filtered.map((contact) => (
              <CSSTransition key={contact._id} classNames="item" timeout={500}>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))
          : contacts.map((contact) => (
              <CSSTransition key={contact._id} classNames="item" timeout={500}>
                <ContactItem contact={contact} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Contacts;
