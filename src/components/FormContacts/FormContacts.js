import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './FormContacts.module.scss';

class FormContacts extends Component {
  static propTypes = {
    name: PropTypes.string,
    number: PropTypes.number,
  };

  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { name } = this.state;
    const coincidenceContacts = this.props.contacts.some(
      el => el.name === name,
    );
    if (coincidenceContacts) {
      alert(`${name} is already in contacts`);
      return;
    }

    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <form className={styles.Form} onSubmit={this.handleSubmit}>
        <label>
          {' '}
          Name
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
            required
          />
        </label>

        <label>
          {' '}
          Number
          <input
            type="tel"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
            required
          />
        </label>

        <button type="submit" className={styles.Btn}>
          Add contact
        </button>
      </form>
    );
  }
}

export default FormContacts;
