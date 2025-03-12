import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  ReactNode,
  ReactElement,
} from "react";
import "../../assets/scss/tab.scss";

interface A11yMessages {
  tabsLabelledby?: string;
}

interface TabItemA11yMessages {
  tabLabel?: string;
}

interface TabItemProps {
  tabId: string;
  tabLabel: string;
  a11yMessages?: TabItemA11yMessages;
  children?: ReactNode;
}

interface TabPanelProps {
  modelValue: string;
  a11yMessages?: A11yMessages;
  children: ReactNode;
}

const TabContext = createContext<{
  selectedTab: string;
  selectTab: (tabId: string) => void;
} | null>(null);

export function TabProvider({ children }: { children: ReactNode }) {
  const [selectedTab, setSelectedTab] = useState("");

  return (
    <TabContext.Provider value={{ selectedTab, selectTab: setSelectedTab }}>
      {children}
    </TabContext.Provider>
  );
}

// Custom hook to access the TabContext
export function useTabContext() {
  const context = useContext(TabContext);
  if (!context) {
    throw new Error("useTabContext must be used within a TabProvider.");
  }
  return context;
}

function isValidTabElement(
  child: ReactNode
): child is ReactElement<TabItemProps> {
  return (
    React.isValidElement(child) &&
    (child as ReactElement<TabItemProps>).props.tabId !== undefined
  );
}

function TabPanel({
  modelValue,
  a11yMessages = { tabsLabelledby: "" },
  children,
}: TabPanelProps) {
  const { selectedTab, selectTab } = useTabContext();
  const tabListItemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [isMouseClicked, setIsMouseClicked] = useState(false);
  const [currentFocusIndex, setCurrentFocusIndex] = useState(-1);

  useEffect(() => {
    selectTab(modelValue);
  }, [modelValue, selectTab]);

  const tabs: TabItemProps[] = React.Children.toArray(children)
    .filter(isValidTabElement)
    .map((child) => {
      const typedChild = child as ReactElement<TabItemProps>;
      return {
        tabId: typedChild.props.tabId,
        tabLabel: typedChild.props.tabLabel,
        a11yMessages: typedChild.props.a11yMessages,
      };
    });

  function handleSelectTab(tabId: string) {
    selectTab(tabId);
  }

  function handleClickTabItem(tabId: string, index: number) {
    if (currentFocusIndex !== -1) {
      tabListItemRefs.current[currentFocusIndex]?.blur();
    }
    setIsMouseClicked(true);
    tabListItemRefs.current[index]?.focus();
    handleSelectTab(tabId);
  }

  function handleKeyDown(
    event: React.KeyboardEvent,
    tabId: string,
    index: number
  ) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleSelectTab(tabId);
    } else if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveFocus(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveFocus(index - 1);
    }
  }

  function moveFocus(index: number) {
    if (index >= 0 && index < tabs.length) {
      setCurrentFocusIndex(index);
      tabListItemRefs.current[index]?.focus();
    }
  }

  return (
    <div className="tab-panel">
      <ul
        className="tab-list"
        role="tablist"
        aria-labelledby={a11yMessages.tabsLabelledby}
      >
        {tabs.map(({ tabId, tabLabel, a11yMessages }, index) => (
          <li
            key={tabId}
            ref={(el) => {
              tabListItemRefs.current[index] = el;
            }}
            className={`tab-item ${
              selectedTab === tabId ? "tab-selected" : ""
            }`}
            tabIndex={selectedTab === tabId ? 0 : -1}
            role="presentation"
            onClick={() => handleClickTabItem(tabId, index)}
            onBlur={() => setIsMouseClicked(false)}
            onFocus={() => setCurrentFocusIndex(index)}
            onKeyDown={(event) => handleKeyDown(event, tabId, index)}
          >
            <a
              id={`tab-${tabId}`}
              role="tab"
              aria-controls={`tab-panel-${tabId}`}
              aria-selected={selectedTab === tabId}
              aria-label={a11yMessages?.tabLabel || tabLabel}
              className="tab-link"
            >
              {tabLabel}
            </a>
          </li>
        ))}
      </ul>
      <div className="tab-content">
        {React.Children.toArray(children).map((child) => {
          if (
            React.isValidElement<{ tabId: string }>(child) &&
            child.props.tabId === selectedTab
          ) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
}

export default TabPanel;
