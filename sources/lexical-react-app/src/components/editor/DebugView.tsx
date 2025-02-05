import { stringify } from "../../helpers/json";
import { CarbonTab, CarbonTabList, CarbonTabPanel, CarbonTabs } from "../tabs/CarbonTabs";

export type DebugViewProps = {
  selection?: any;
  nodetree?: any;
  nodemap?: any;
};

export const DebugView = (props: DebugViewProps) => {
  function formatJson(value: object) {
    return stringify(
      value,
      (key, value) => {
        return !key.startsWith("_") ? value : undefined;
      },
      2
    );
  }

  return (
    <div>
      <CarbonTabs>
        <CarbonTabList>
          <CarbonTab id="selection">Selection</CarbonTab>
          <CarbonTab id="nodetree">Node Tree</CarbonTab>
          <CarbonTab id="nodemap">Node Map</CarbonTab>
        </CarbonTabList>

        <CarbonTabPanel id="selection" className="outline-none">
          <div className="p-4 font-mono bg-token-layer text-token-text-primary">
            <div className="outline-none text-[14px] leading-[18px] font-[400] whitespace-pre-wrap break-all">
              {formatJson(props.selection)}
            </div>
          </div>
        </CarbonTabPanel>

        <CarbonTabPanel id="nodetree" className="outline-none">
          <div className="p-4 font-mono bg-token-layer text-token-text-primary">
            <div className="text-[14px] leading-[18px] font-[400] whitespace-pre-wrap break-all">
              {formatJson(props.nodetree)}
            </div>
          </div>
        </CarbonTabPanel>

        <CarbonTabPanel id="nodemap" className="outline-none">
          <div className="p-4 font-mono bg-token-layer text-token-text-primary">
            <div className="text-[14px] leading-[18px] font-[400] whitespace-pre-wrap break-all">
              {formatJson(props.nodemap)}
            </div>
          </div>
        </CarbonTabPanel>
      </CarbonTabs>
    </div>
  );
};
