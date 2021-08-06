import { Component } from 'react';
import shortid from 'shortid';

import Conteiner from './components/Container';
import Section from './components/Section';
import Form from './components/FormContacts';
import ContactsList from './components/ContactsList';
import Filter from './components/Filter';

import './styles.scss';

class App extends Component {
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
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const nextContact = this.state.contacts;
    const prevContact = prevState.contacts;

    if (nextContact !== prevContact) {
      localStorage.setItem('contacts', JSON.stringify(nextContact));
    }
  }

  addContacts = data => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    this.setState(prevState => ({
      contacts: [contact, ...prevState.contacts],
    }));
  };

  changleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleFilter = () => {
    const { filter, contacts } = this.state;
    const normalizeFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizeFilter),
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const visibleContacts = this.getVisibleFilter();

    return (
      <Conteiner>
        <h1>Phonebook</h1>
        <Section title="Create contact">
          <Form contacts={this.state.contacts} onSubmit={this.addContacts} />
        </Section>

        <Section title="Contacts">
          <Filter value={this.state.filter} onChange={this.changleFilter} />
          <ContactsList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </Conteiner>
    );
  }
}

export default App;
