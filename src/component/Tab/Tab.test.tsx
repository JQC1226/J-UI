import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TabPanel, { TabProvider } from "../Tab/Tab";

const TabItem = ({
  tabId,
  tabLabel,
  children,
}: {
  tabId: string;
  tabLabel: string;
  children?: React.ReactNode;
}) => {
  return (
    <div data-testid={`tab-${tabId}`} tab-id={tabId} tab-label={tabLabel}>
      {children}
    </div>
  );
};

// **Fix 2: Explicitly type the `ui` parameter**
const renderWithProvider = (ui: React.ReactNode) => {
  return render(<TabProvider>{ui}</TabProvider>);
};

describe("TabPanel Component", () => {
  test("renders tabs correctly", () => {
    renderWithProvider(
      <TabPanel modelValue="tab1" a11yMessages={{ tabsLabelledby: "tablist1" }}>
        <TabItem tabId="tab1" tabLabel="Home">
          🏠 Home Content
        </TabItem>
        <TabItem tabId="tab2" tabLabel="Profile">
          👤 Profile Content
        </TabItem>
        <TabItem tabId="tab3" tabLabel="Settings">
          ⚙️ Settings Content
        </TabItem>
      </TabPanel>
    );

    expect(screen.getByRole("tab", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Profile" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Settings" })).toBeInTheDocument();

    expect(screen.getByRole("tab", { name: "Home" })).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  test("clicking on a tab selects it", () => {
    renderWithProvider(
      <TabPanel modelValue="tab1" a11yMessages={{ tabsLabelledby: "tablist1" }}>
        <TabItem tabId="tab1" tabLabel="Home">
          🏠 Home Content
        </TabItem>
        <TabItem tabId="tab2" tabLabel="Profile">
          👤 Profile Content
        </TabItem>
        <TabItem tabId="tab3" tabLabel="Settings">
          ⚙️ Settings Content
        </TabItem>
      </TabPanel>
    );

    const profileTab = screen.getByRole("tab", { name: "Profile" });
    fireEvent.click(profileTab);

    expect(profileTab).toHaveAttribute("aria-selected", "true");
  });

  test("keyboard navigation with ArrowRight and ArrowLeft works", () => {
    renderWithProvider(
      <TabPanel modelValue="tab1" a11yMessages={{ tabsLabelledby: "tablist1" }}>
        <TabItem tabId="tab1" tabLabel="Home">
          🏠 Home Content
        </TabItem>
        <TabItem tabId="tab2" tabLabel="Profile">
          👤 Profile Content
        </TabItem>
        <TabItem tabId="tab3" tabLabel="Settings">
          ⚙️ Settings Content
        </TabItem>
      </TabPanel>
    );
    const tabListItems = screen.getAllByRole("presentation"); 
  
    const homeTabLi = tabListItems[0];
    const profileTabLi = tabListItems[1];
    const settingsTabLi = tabListItems[2]; 

    fireEvent.keyDown(homeTabLi, { key: "ArrowRight" });
    expect(profileTabLi).toHaveFocus();

    fireEvent.keyDown(profileTabLi, { key: "ArrowRight" });
    expect(settingsTabLi).toHaveFocus();

    fireEvent.keyDown(settingsTabLi, { key: "ArrowLeft" });
    expect(profileTabLi).toHaveFocus();
  });

  test("tabs have correct accessibility attributes", () => {
    renderWithProvider(
      <TabPanel modelValue="tab1" a11yMessages={{ tabsLabelledby: "tablist1" }}>
        <TabItem tabId="tab1" tabLabel="Home">
          🏠 Home Content
        </TabItem>
        <TabItem tabId="tab2" tabLabel="Profile">
          👤 Profile Content
        </TabItem>
        <TabItem tabId="tab3" tabLabel="Settings">
          ⚙️ Settings Content
        </TabItem>
      </TabPanel>
    );

    const homeTab = screen.getByRole("tab", { name: "Home" });

    expect(homeTab).toHaveAttribute("role", "tab");
    expect(homeTab).toHaveAttribute("aria-controls", "tab-panel-tab1");
    expect(homeTab).toHaveAttribute("aria-selected", "true");
  });

  test("pressing Enter selects the tab", () => {
    renderWithProvider(
      <TabPanel modelValue="tab1" a11yMessages={{ tabsLabelledby: "tablist1" }}>
        <TabItem tabId="tab1" tabLabel="Home">
          🏠 Home Content
        </TabItem>
        <TabItem tabId="tab2" tabLabel="Profile">
          👤 Profile Content
        </TabItem>
        <TabItem tabId="tab3" tabLabel="Settings">
          ⚙️ Settings Content
        </TabItem>
      </TabPanel>
    );

    const profileTab = screen.getByRole("tab", { name: "Profile" });
    fireEvent.keyDown(profileTab, { key: "Enter" });

    expect(profileTab).toHaveAttribute("aria-selected", "true");
  });

  test("pressing Space selects the tab", () => {
    renderWithProvider(
      <TabPanel modelValue="tab1" a11yMessages={{ tabsLabelledby: "tablist1" }}>
        <TabItem tabId="tab1" tabLabel="Home">
          🏠 Home Content
        </TabItem>
        <TabItem tabId="tab2" tabLabel="Profile">
          👤 Profile Content
        </TabItem>
        <TabItem tabId="tab3" tabLabel="Settings">
          ⚙️ Settings Content
        </TabItem>
      </TabPanel>
    );

    const settingsTab = screen.getByRole("tab", { name: "Settings" });
    fireEvent.keyDown(settingsTab, { key: " " });

    expect(settingsTab).toHaveAttribute("aria-selected", "true");
  });
});
