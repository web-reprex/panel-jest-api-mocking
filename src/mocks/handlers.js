import { rest } from 'msw';
import sundaeOptions from './db/sundae-options.json';
import { mockUsers } from './db/mockUsers';
import { endpoints, urls } from 'src/api/constants';
import { mockedToken } from 'src/mocks/db/login';
import { mockedRawConsul } from 'src/mocks/db/consul';
// update server uri based on env later
// export const serverUri = 'http://localhost:3030';

/**
 * Default API Handlers
 */
export const handlers = [
  rest.get(`${urls.base}/scoops`, (req, res, ctx) =>
    res(ctx.json(sundaeOptions.iceCreamFlavors))
  ),
  rest.get(`${urls.base}/toppings`, (req, res, ctx) =>
    res(ctx.json(sundaeOptions.toppings))
  ),
  rest.post(`${urls.base}/order`, (req, res, ctx) =>
    res(ctx.json({ orderNumber: 123 }))
  ),
  rest.get(`${urls.base}/users`, (req, res, ctx) => res(ctx.json(mockUsers))),
  rest.post(`${urls.base}/users`, (req, res, ctx) => {
    const newUser = req.body;
    mockUsers.push(newUser);
    return res(ctx.json(newUser));
  })
];
export const loginHandlers = [
  rest.get(
    `/${endpoints.publicPlatformConfig.split('?')[0]}`,
    (req, res, ctx) => {
      return res(ctx.json(mockedRawConsul));
    }
  )
];

/**
 * API Error Handlers:
 * How to use e.g.
test('handles error for scoops and toppings routes', async () => {
  server.resetHandlers(...handlersWith500Error); // just reset handlers to use handlersWith500Error
  render(<OrderEntry />);
  const alerts = await screen.findAllByRole('alert', {
    name: 'An unexpected error ocurred. Please try again later.'
  });
  expect(alerts).toHaveLength(2);
});

*/

export const handlersWith500Error = [
  rest.get(`${urls.base}/scoops`, (req, res, cx) => res(cx.status(500))),
  rest.get(`${urls.base}/toppings`, (req, res, cx) => res(cx.status(500))),
  rest.post(`${urls.base}/order`, (req, res, ctx) => res(ctx.status(500)))
];
