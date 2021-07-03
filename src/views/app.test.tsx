import { screen } from '@testing-library/react';
import { render } from 'src/mocks/renderViaAllProviders';
import App from './app';
import * as apis from 'src/api/consul';
import { mockedRawConsul } from 'src/mocks/db/consul';

test("Show init page when 'initialized:false' in consul.", async () => {
  render(<App />);

  const loading = screen.getByRole('heading', { name: /loading/i });
  expect(loading).toBeInTheDocument();

  const initTitle = await screen.findByRole('heading', {
    name: /Init/i
  });
  expect(initTitle).toBeInTheDocument();
});

describe('Consul Initialized:true', () => {
  beforeEach(() => {
    const initializedConsul = {
      ...mockedRawConsul,
      ...{ configs: { initialized: true } }
    };
    /*eslint-disable */
    //@ts-ignore
    apis.getConsulPublicConfig = jest.fn(() =>
      Promise.resolve(initializedConsul)
    );
  });
  test("Show Login page when 'initialized:true' in consul", async () => {
    render(<App />);
    const loginButton = await screen.findByRole('button', {
      name: /regularLogin/i
    });
    expect(loginButton).toBeInTheDocument();
  });
});
