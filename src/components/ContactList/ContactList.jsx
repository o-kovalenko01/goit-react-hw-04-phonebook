import css from './ContactList.module.css';

export const ContactList = ({ contacts, onDelete }) => {
  const handleDelete = e => {
    onDelete(e.target.id);
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
            onClick={handleDelete}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
