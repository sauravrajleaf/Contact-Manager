import React, { Fragment, useContext } from "react";

import ContactItem from "./ContactItem";

import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  //NOW WE HAVE ACCESS TO ANY STATE OR METHODS OR ACTIONS ASSOCIATED WITH ContactContext
  const contactContext = useContext(ContactContext);

  //PULLING THE STATE DATA FROM ContactContex via destructring
  const { contacts, filtered } = contactContext;

  if (contacts.length === 0) {
    return <h4>Please add a contact</h4>;
  }

  return (
    <Fragment>
      {filtered
        ? filtered.map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))
        : contacts.map((contact) => (
            <ContactItem contact={contact} key={contact.id} />
          ))}
    </Fragment>
  );
};

export default Contacts;
