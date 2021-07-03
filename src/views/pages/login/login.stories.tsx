import { Meta } from '@storybook/react';
import Login from './login';
import { Provider } from 'react-redux';
import { store } from 'src/store/redux/store';

export default {
  title: 'App/Login',
  component: Login
} as Meta;

export const Template = () => (
  <Provider store={store}>
    <Login />
  </Provider>
);
