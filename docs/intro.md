# `ReactCDD` Admin template

This admin template is under development based on `Component/Test Driven Development` design. So, it has a philosophy on how should we develop `Frontend` apps:

#### Step1: Use `Component Library` for common components e.g. `button, input, form, table, ...`.

Because of better `maintainability` and `reusability` which those offer to us, And you should consider that `modular programming` will decrease the cost of `unit testing` on your team and `CI/CD` process.

> You should choose one of major Component libraries out there e.g. `Material-UI, AntDesign, React-Bootstrap, ...` or using your own company's `CMP`

#### Step2: Develope a UI item(component/page) in this order(`Red❌->Green✅ testing`):

1. write a shell for the component( we've used `button` for simplicity, but in fact it should be in `CMP` ):

```typescript
//src/views/components/button.tsx
export const Button = () => <div />;
```

2.  `Write its functional tests based on Product Owner's requirements`:
    > It's better to have a `Design System`, Which has all variant of the components.

```typescript
//src/views/components/button.test.tsx
import { render, screen } from '@testing-library/react';
/*
If your component needs to access the react `Providers` e.g. [redux Provider, react-query QueryClientProvider, react-router Router/Switch] or other custom contexts providers,
 just use custom `renderer` function from `renderViaAllProviders`, which wraps all providers.

import { render } from 'src/mocks/renderViaAllProviders';
*/
import userEvent from '@testing-library/user-event';
import { Button } from './button';

describe('Button', () => {
  test('renders a default button with text', async () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
  });

  test('renders a primary button', async () => {
    render(<Button primary>Click me</Button>);
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toHaveClass('cmpButtonPrimary');
  });

  test('renders a button with custom colors', async () => {
    render(
      <Button size="small" backgroundColor="#A78BFA">
        Click me
      </Button>
    );
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toHaveStyle({ backgroundColor: '#A78BFA' });
  });

  test('handles onClick', async () => {
    const mockOnClick = jest.fn();
    render(<Button onClick={mockOnClick}>Click me</Button>);
    userEvent.click(screen.getByText('Click me'));
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
```

3. `Write code to pass all tests one by one like below`:

```typescript
//pass first test
import { ReactElement } from 'react';
/**
 * Primary UI component for user interaction
 */
export const Button = ({ children }: { children: ReactElement }) => {
  return <button>{children}</button>;
};
```

<details>
<summary>Code to pass 2nd test</summary>

```typescript
//pass second test
import { ReactElement } from 'react';
import './button.css';
/*button.css
.cmpButton {
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}
.cmpButtonPrimary {
  color: white;
  background-color: #1ea7fd;
}
.cmpButtonSecondary {
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}
*/

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  children,
  primary
}: {
  primary?: boolean;
  children: ReactElement;
}) => {
  const defaultClass = primary ? 'cmpButtonPrimary' : 'cmpButtonSecondary';
  const classNames = ['cmpButton', defaultClass].join(' ');
  return <button className={classNames}>{children}</button>;
};
```

</details>

<details>
<summary>Code to pass 3rd test</summary>

```typescript
//pass third test
import { ReactElement } from 'react';
import './button.css';
/*button.css
.cmpButton {
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}
.cmpButtonPrimary {
  color: white;
  background-color: #1ea7fd;
}
.cmpButtonSecondary {
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}
*/
/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  backgroundColor,
  children
}: {
  primary?: boolean;
  backgroundColor?: string;
  children: ReactElement;
}) => {
  const defaultClass = primary ? 'cmpButtonPrimary' : 'cmpButtonSecondary';
  const classNames = ['cmpButton', defaultClass].join(' ');
  const styles = { backgroundColor };
  return (
    <button className={classNames} style={styles}>
      {children}
    </button>
  );
};
```

</details>

<details>
<summary>Code to pass 4th(last) test</summary>

```typescript
//pass last test
import { ReactElement } from 'react';
import './button.css';
/*button.css
.cmpButton {
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}
.cmpButtonPrimary {
  color: white;
  background-color: #1ea7fd;
}
.cmpButtonSecondary {
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}
*/
/**
 * Primary UI component for user interaction
 */
export const Button = ({
  primary,
  backgroundColor,
  onClick,
  children
}: {
  primary?: boolean;
  backgroundColor?: string;
  onClick?: () => void;
  children: ReactElement;
}) => {
  const defaultClass = primary ? 'cmpButtonPrimary' : 'cmpButtonSecondary';
  const classNames = ['cmpButton', defaultClass].join(' ');
  const styles = { backgroundColor };
  return (
    <button className={classNames} style={styles} onClick={onClick}>
      {children}
    </button>
  );
};
```

</details>

<details>
<summary>Advanced button(Write tests as an exercise)</summary>

```typescript
import React from 'react';
import './button.css';
/*button.css
.cmpButton {
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}
.cmpButtonPrimary {
  color: white;
  background-color: #1ea7fd;
}
.cmpButtonSecondary {
  color: #333;
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 0px 0px 1px inset;
}
.cmpButton-small {
  font-size: 12px;
  padding: 10px 16px;
}
.cmpButton-medium {
  font-size: 14px;
  padding: 11px 20px;
}
.cmpButton-large {
  font-size: 16px;
  padding: 12px 24px;
}
*/
export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: 'small' | 'medium' | 'large';
  /**
   * Button contents
   */
  label?: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  size = 'medium',
  backgroundColor,
  label,
  ...props
}) => {
  const defaultClass = primary ? 'cmpButtonPrimary' : 'cmpButtonSecondary';
  const classNames = ['cmpButton', defaultClass, `cmpButton-${size}`].join(' ');
  const styles = { backgroundColor };

  return (
    <button type="button" className={classNames} style={styles} {...props}>
      {label ?? props.children}
    </button>
  );
};
```

</details>

<br/>

#### Step3: Use Storybook/Styleguidist/bit.dev for Developing Components in Isolation

If you are developing a UI component which can/needs to be developed in isolation, You should use one of major `UI components management/creation tools`. We will use `button` here:

1. Add button story via creating `button.stories.tsx` and export default info like `title` which will put it in right `menu section`

```typescript
//src/components/button.stories.tsx
import { Meta } from '@storybook/react';
import { Button } from './button';
export default {
  title: 'Example/Button', // storybook navigation bar
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta;
export const Template = () => <Button label="Click me" />;
```

<details>
<summary>Advanced story for button</summary>

```typescript
import { Story, Meta } from '@storybook/react';

import { Button, ButtonProps } from './button';

export default {
  title: 'Example/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta;

const Template: Story<ButtonProps> = args => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
  label: 'Button'
};

export const Secondary = Template.bind({});
Secondary.args = {
  label: 'Button'
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button'
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button'
};
```

</details>
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
