export const getAllContacts = store => store.contacts;

export const getFilteredContacts = ({ contacts, filter }) => {
  if (!filter) {
    return contacts;
  }
  const normalizedFilter = filter.toLowerCase();
  const res = contacts.filter(({ name }) => {
    return name.toLowerCase().includes(normalizedFilter);
  });
  return res;
};
