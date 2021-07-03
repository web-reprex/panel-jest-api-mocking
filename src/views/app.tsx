import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import * as Sentry from '@sentry/react';
import AppRouter from 'src/router/router';
import { ThemeProvider } from 'src/store/contexts/theme/provider';
import { logAppInfo } from 'src/utils/appVersion';
import { startBrowserBasedServerMocking } from 'src/mocks/utils';
import { LocaleProvider } from 'src/store/contexts/locale/provider';
import 'src/assets/styles';
import { SnackbarProvider } from 'notistack';

startBrowserBasedServerMocking();
logAppInfo();

const queryClient = new QueryClient();
const App = () => (
  <Sentry.ErrorBoundary fallback={'inja fallbacke!!'}>
    <SnackbarProvider
      maxSnack={5}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <LocaleProvider>
            <AppRouter />
          </LocaleProvider>
        </ThemeProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </SnackbarProvider>
  </Sentry.ErrorBoundary>
);

export default Sentry.withProfiler(App);
