import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    // Завантаження контактів з локального сховища після монтажу компонента
    const savedContacts = localStorage.getItem('contacts');

    if (savedContacts) {
      this.setState({ contacts: JSON.parse(savedContacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // Збереження контактів у локальне сховище при оновленні стану
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  onSubmit = ({ name, number }) => {
    const hasContact = this.state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (hasContact) {
      return false;
    }
    this.setState(prev => ({
      contacts: [...prev.contacts, { id: nanoid(), name, number }],
    }));
    return true;
  };

  onDelete = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  onFilterChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
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
        <ContactForm onSubmit={this.onSubmit} />

        <h2
          style={{
            marginBottom: 20,
          }}
        >
          Contacts
        </h2>
        <Filter value={this.state.filter} onChange={this.onFilterChange} />
        <ContactList
          contacts={this.state.contacts.filter(contact =>
            contact.name.toLowerCase().includes(this.state.filter)
          )}
          onDelete={this.onDelete}
        />
      </div>
    );
  }
}
