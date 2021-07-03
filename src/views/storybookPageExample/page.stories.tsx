import { Story, Meta } from '@storybook/react';
import * as HeaderStories from 'src/views/components/header/header.stories';
import { Page, PageProps } from './page';

export default {
  title: 'Example/Page',
  component: Page
} as Meta;

const Template: Story<PageProps> = args => <Page {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  ...HeaderStories.LoggedIn.args
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  ...HeaderStories.LoggedOut.args
};
