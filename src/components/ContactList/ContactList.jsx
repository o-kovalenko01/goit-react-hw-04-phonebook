import React from 'react';
import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => {
  const handleDelete = id => {
    onDelete(id);
  };

  return (
    <ul className={css.list}>
      {contacts.map(({ id, name, number }) => (
        <li className={css.item} key={id}>
          {name}: {number}
          <button
            className={css.btn}
            type="button"
            id={id}
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
