# `ReactCDD` Admin template

This admin template is under development based on `Component/Test Driven Development` design. So, it has a philosophy on how should we develop `Frontend` apps. Please read the [Intro](./docs/intro.md) doc for how to use this template.

## Available Scripts

- `Start` The Project in Development Mode: `yarn start`
- `Storybook`: `yarn storybook`
- `Linting`: `yarn lint`
- `Type` Checking: `yarn check-types`
- Format by `Prettier`: `yarn format`
- Check format by `Prettier`: `yarn check-format`
- Validate and build: `yarn validate`
- Bundle Analyze: `yarn analyze`

**MSW Important Note**: `CRA` will call `unregister service worker`, which will disable the `msw browser server`. So, to working with `msw` in the browser, if you encountered with the `net::ERR_CONNECTION_REFUSED` error, just reload the page to register the service worker again, or simply remove `unregister` call.

#### Static Standalone/Mocked build

If you want to build a static version of the app which is working with the mock data, just run:

`yarn build:mocked`
