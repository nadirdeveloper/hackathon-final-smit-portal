import './Global.css'
import AppRoutes from './AppRoutes';
import { Provider } from 'react-redux'
import { store } from './redux/store';
import CurrentUserWrapper from './components/CurrentUserWrapper';

function App() {
  return (
    <Provider store={store}>
      <CurrentUserWrapper>
        <AppRoutes />
      </CurrentUserWrapper>
    </Provider>
  );
}

export default App;
