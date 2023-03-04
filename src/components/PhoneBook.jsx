import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import ContactsList from './PhoneBook/ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import ContactsForm from './ContactsForm/ContactsForm';

import {
  fetchAllContacts,
  fetchAddContact,
  fetchDeleteContact,
} from 'redux/contacts/contacts-operations';
// import { addContact, removeContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';

import {
  getAllContacts,
  getFilteredContacts,
} from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';

import css from './phone-book.module.scss';

const PhoneBook = () => {
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const onAddContact = ({ name, number }) => {
    const action = fetchAddContact({ name, number });
    dispatch(action);
  };

  const handleRemoveContact = id => {
    const action = fetchDeleteContact(id);
    dispatch(action);
  };

  const handleFilter = ({ target }) => {
    dispatch(setFilter(target.value));
  };

  return (
    <>
      <div className={css.block}>
        <h3 className={css.title}>Phone Book</h3>
        <ContactsForm onSubmit={onAddContact} />
      </div>
      <div className={css.block}>
        <ContactsFilter value={filter} handleChange={handleFilter} />
        <ContactsList
          contacts={filteredContacts}
          removeContact={handleRemoveContact}
        />
      </div>
    </>
  );
};

export default PhoneBook;
