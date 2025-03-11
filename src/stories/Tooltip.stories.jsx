// Tooltip.stories.js
import React from 'react';
import Tooltip from '../component/Tooltip/Tooltip';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
};

const Template = (args) => <Tooltip {...args} />;

export const Default = Template.bind({});
Default.args = {
  text: "This is a tooltip",
  children: <button>Hover over me!</button>
};

export const Interactive = Template.bind({});
Interactive.args = {
  text: "Click here!",
  options: { interactive: true, trigger: 'click' },
  children: <button>Click me!</button>
};

export const Disabled = Template.bind({});
Disabled.args = {
  text: "You shouldn't see me",
  disable: true,
  children: <button>Hover over me!</button>
};

export const CustomTheme = Template.bind({});
CustomTheme.args = {
  text: "Stylish Tooltip",
  options: { theme: 'dark' },
  children: <button>Hover over me!</button>
};
