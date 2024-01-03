import css from './Filter.module.css';

export const Filter = ({ value, onChange }) => {
  return (
    <label className={css.label}>
      Find contacts by name
      <input className={css.input} value={value} onChange={onChange} />
    </label>
  );
};
