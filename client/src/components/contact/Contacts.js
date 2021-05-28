import React, { Fragment, useContext } from "react";

import ContactItem from "./ContactItem";

import ContactContext from "../../context/contact/contactContext";

const Contacts = () => {
  //NOW WE HAVE ACCESS TO ANY STATE OR METHODS OR ACTIONS ASSOCIATED WITH ContactContext
  const contactContext = useContext(ContactContext);

  //PULLING THE STATE DATA FROM ContactContex via destructring
  const { contacts } = contactContext;

  return (
    <Fragment>
      {contacts.map((contact) => (
        <ContactItem contact={contact} key={contact.id} />
      ))}
    </Fragment>
  );
};

export default Contacts;
