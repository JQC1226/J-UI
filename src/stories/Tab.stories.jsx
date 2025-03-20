import React from "react";
import TabPanel, { TabProvider } from "../component/Tab/Tab";

const meta = {
  title: "Components/TabPanel",
  component: TabPanel,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    modelValue: "tab1",
    a11yMessages: { tabsLabelledby: "tablist1" },
  },
};

export default meta;

export const Default = {
  render: (args) => (
    <TabProvider>
      <TabPanel {...args}>
        <div tabId="tab1" tabLabel="Home">🏠 Home Content</div>
        <div tabId="tab2" tabLabel="Profile">👤 Profile Content</div>
        <div tabId="tab3" tabLabel="Settings">⚙️ Settings Content</div>
      </TabPanel>
    </TabProvider>
  ),
};

export const InactiveTab = {
  render: (args) => (
    <TabProvider>
      <TabPanel {...args}>
        <div tabId="tab1" tabLabel="Home">🏠 Home Content</div>
        <div tabId="tab2" tabLabel="Profile">👤 Profile Content</div>
        <div tabId="tab3" tabLabel="Settings">⚙️ Settings Content</div>
      </TabPanel>
    </TabProvider>
  ),
  args: {
    modelValue: "tab3", 
  },
};

export const WithA11yMessage = {
  args: {
    a11yMessages: { tabsLabelledby: "screen-reader-tabs" },
  },
  render: (args) => (
    <TabProvider>
      <TabPanel {...args}>
        <div tabId="tab1" tabLabel="Dashboard">📊 Dashboard Content</div>
        <div tabId="tab2" tabLabel="Notifications">🔔 Notifications Content</div>
        <div tabId="tab3" tabLabel="Security">🔒 Security Content</div>
      </TabPanel>
    </TabProvider>
  ),
};
