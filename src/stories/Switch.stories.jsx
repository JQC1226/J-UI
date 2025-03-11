import { fn } from '@storybook/test';

import Switch from '../component/switch/Switch';

const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    id: 'switch',
    checked: false,
    text: 'Toggle me',
    disabled: false,
    onChange: fn(),
  },
}

export default meta;

export const Default = {};

export const Checked = {
  args: {
    checked: true,
  },
};

export const Disabled = {
  args: {
    disabled: true,
    checked:true,
  },
};
