// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import 'src/mocks/skipCryptoForAuth0Library';
// import 'src/mocks/localstorageMock';
/** Disable testing library too many messages
// import { configure } from '@testing-library/dom';
// configure({
//   //@ts-ignore
//   getElementError: (message: string, container) => {
//     const error = new Error(message);
//     error.name = 'TestingLibraryElementError';
//     //@ts-ignore
//     error.stack = null;
//     return error;
//   }
// });
*/
// src/setupTests.js
import { server } from './mocks/server.js';
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
// Clean up after the tests are finished.
afterAll(() => server.close());
