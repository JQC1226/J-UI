import type { Meta, StoryObj } from '@storybook/react';
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
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked:true,
  },
};
