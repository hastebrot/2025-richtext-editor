import { Tab, TabList, TabPanel, TabProps, Tabs, type TabListProps } from "react-aria-components";
import { classNames } from "../../helpers/clsx";

export const DemoTabs = () => {
  return (
    <CarbonTabs>
      <CarbonTabList>
        <CarbonTab id="founding">Founding of Rome</CarbonTab>
        <CarbonTab id="republic">Monarchy and Republic</CarbonTab>
        <CarbonTab id="empire">Empire</CarbonTab>
      </CarbonTabList>

      <CarbonTabPanel id="founding">Arma virumque cano, Troiae qui primus ab oris.</CarbonTabPanel>
      <CarbonTabPanel id="republic">Senatus Populusque Romanus.</CarbonTabPanel>
      <CarbonTabPanel id="empire">Alea jacta est.</CarbonTabPanel>
    </CarbonTabs>
  );
};

export const CarbonTabs = Tabs;
export const CarbonTabPanel = TabPanel;

export type CarbonTabListProps<T> = TabListProps<T> & React.RefAttributes<HTMLDivElement>;

export const CarbonTabList = <T extends object>({ children, ...props }: CarbonTabListProps<T>) => {
  return (
    <div className="grid grid-cols-[auto_1fr] bg-token-background">
      <TabList
        {...props}
        className={classNames("inline-flex overflow-x-auto h-[var(--token-size-medium)]")}
      >
        {children}
      </TabList>
      <div className="border-b border-token-border-subtle"></div>
    </div>
  );
};

export type CarbonTabProps = TabProps;

export const CarbonTab = ({ children, ...props }: CarbonTabProps) => {
  return (
    <Tab
      {...props}
      className={(props) =>
        classNames(
          "flex outline-none cursor-pointer overflow-hidden box-border whitespace-nowrap",
          "font-[400] text-[14px] leading-[18px] text-token-text-primary",
          props.isFocused && "outline-2 outline-token-focus -outline-offset-2",
          [
            !props.isSelected && "shadow-[-1px_0_0_0_var(--token-border-strong)]",
            props.isSelected && "shadow-[inset_0_2px_0_0_var(--token-border-interactive)]",
            "[&[aria-selected=true]+*]:shadow-none",
          ],
          [
            !props.isSelected && "bg-token-layer-accent",
            props.isSelected && "bg-token-layer",
            !props.isSelected && props.isHovered && "bg-token-layer-selected-hover",
          ]
        )
      }
    >
      {(props) => {
        if (typeof children === "function") {
          children = children(props);
        }
        return (
          <div className="relative mx-4 mt-3 mb-2">
            <span className={classNames("invisible font-[600]")}>{children}</span>
            <span className={classNames("absolute inset-0", props.isSelected && "font-[600]")}>
              {children}
            </span>
          </div>
        );
      }}
    </Tab>
  );
};
