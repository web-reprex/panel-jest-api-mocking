import { render } from '@testing-library/react';
import { ReactElement } from 'react';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import i18n from 'src/locales';
import { ThemeProvider } from 'src/store/contexts/theme/provider';
import { store } from 'src/store/redux/store';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

const queryClient = new QueryClient();

const AllTheProviders = ({ children }: { children: ReactElement }) => {
  // you can wrap as many as provider as you want
  return (
    <Provider store={store}>
      <SnackbarProvider
        maxSnack={5}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            <I18nextProvider i18n={i18n}>
              <Router>
                <Switch>{children}</Switch>
              </Router>
            </I18nextProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </SnackbarProvider>
    </Provider>
  );
};

const customRender = (uiComponent: ReactElement, options?: any) =>
  render(uiComponent, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
