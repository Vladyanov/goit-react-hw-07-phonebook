import PhoneBook from 'components/PhoneBook';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from './redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={'...Loading'} persistor={persistor}>
        <PhoneBook />
      </PersistGate>
    </Provider>
  );
};

export default App;
