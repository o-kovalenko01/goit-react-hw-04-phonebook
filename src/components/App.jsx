import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = JSON.stringify(contacts);
    localStorage.setItem('contacts', savedContacts);
  }, [contacts]);

  const onSubmit = ({ name, number }) => {
    const hasContact = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (hasContact) {
      return false;
    }
    setContacts(prevContacts => [
      ...prevContacts,
      { id: nanoid(), name, number },
    ]);

    return true;
  };

  const onDelete = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const onFilterChange = e => {
    setFilter(e.target.value);
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLocaleLowerCase())
  );

  return (
    <div
      style={{
        width: 400,
        display: 'flex',
        flexDirection: 'column',
        margin: 20,
      }}
    >
      <h1
        style={{
          marginBottom: 20,
        }}
      >
        Phonebook
      </h1>
      <ContactForm onSubmit={onSubmit} />

      <h2
        style={{
          marginBottom: 20,
        }}
      >
        Contacts
      </h2>
      <Filter value={filter} onChange={onFilterChange} />
      <ContactList contacts={filteredContacts} onDelete={onDelete} />
    </div>
  );
};
