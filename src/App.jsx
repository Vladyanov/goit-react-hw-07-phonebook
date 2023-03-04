import PhoneBook from 'components/PhoneBook';

import { Provider } from 'react-redux';

import { store } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PhoneBook />
    </Provider>
  );
};

export default App;
