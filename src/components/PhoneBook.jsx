import { useSelector, useDispatch } from 'react-redux';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ContactsList from './PhoneBook/ContactsList/ContactsList';
import ContactsFilter from './ContactsFilter/ContactsFilter';
import ContactsForm from './ContactsForm/ContactsForm';

import { addContact, removeContact } from 'redux/contacts/contacts-slice';
import { setFilter } from 'redux/filter/filter-slice';

import {
  getAllContacts,
  getFilteredContacts,
} from 'redux/contacts/contacts-selectors';
import { getFilter } from 'redux/filter/filter-selectors';

import css from './phone-book.module.scss';

const PhoneBook = () => {
  const contacts = useSelector(getAllContacts);
  const filteredContacts = useSelector(getFilteredContacts);
  const filter = useSelector(getFilter);

  const dispatch = useDispatch();

  const isDuplicate = name => {
    const normalizedName = name.toLowerCase();

    const isUnique = contacts.find(({ name }) => {
      return name.toLocaleLowerCase() === normalizedName;
    });
    return isUnique;
  };

  const onAddContact = ({ name, number }) => {
    if (isDuplicate(name)) {
      return Notify.failure(`${name} is already in contacts list`);
    }

    const action = addContact({ name, number });
    dispatch(action);
  };

  const handleRemoveContact = id => {
    const action = removeContact(id);
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
