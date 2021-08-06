import PropTypes from 'prop-types';

import styles from './ContactsList.module.scss';

const ContactsList = ({ contacts, onDeleteContact }) => (
  <ul className={styles.List}>
    {contacts.map(({ id, name, number }) => (
      <li key={id}>
        {name}: {number}
        <button
          className={styles.Btn}
          type="button"
          onClick={() => onDeleteContact(id)}
        >
          Delete
        </button>
      </li>
    ))}
  </ul>
);

ContactsList.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
};

export default ContactsList;
