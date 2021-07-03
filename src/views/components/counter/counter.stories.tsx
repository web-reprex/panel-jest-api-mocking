import { Meta } from '@storybook/react';
import { Provider } from 'react-redux';
import { store } from 'src/store/redux/store';
import { Counter } from './counter';

export default {
  title: 'App/Components/Counter',
  component: Counter
} as Meta;

export const Template = () => (
  <Provider store={store}>
    <Counter />
  </Provider>
);
