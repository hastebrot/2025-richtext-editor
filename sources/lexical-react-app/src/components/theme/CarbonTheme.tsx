import { createContext, useContext } from "react";
import { classNames } from "../../helpers/clsx";

export type ThemeType = "white" | "g10" | "g100" | "g90";
export type LayerType = "00" | "01" | "02" | "03";

const defaultTheme = "white";
const defaultLayer = "00";

const ThemeContext = createContext<ThemeType>(defaultTheme);

export const useCarbonTheme = (): ThemeType => {
  return useContext(ThemeContext);
};

export type CarbonThemeProps = React.PropsWithChildren<{
  theme?: ThemeType;
  className?: string;
}>;

export const CarbonTheme = ({ children, ...props }: CarbonThemeProps) => {
  const themeOfContext = useCarbonTheme();
  const theme = props.theme ?? themeOfContext;

  return (
    <ThemeContext value={theme}>
      <div
        className={classNames(
          [
            theme === "white" && "theme-white-layer-00",
            theme === "g10" && "theme-g10-layer-00",
            theme === "g100" && "theme-g100-layer-00",
            theme === "g90" && "theme-g90-layer-00",
          ],
          `bg-token-background`,
          props.className
        )}
      >
        {children}
      </div>
    </ThemeContext>
  );
};

type CarbonThemeLayerProps = React.PropsWithChildren<{
  theme?: ThemeType;
  layer?: LayerType;
  className?: string;
}>;

export const CarbonThemeLayer = ({ children, ...props }: CarbonThemeLayerProps) => {
  const themeOfContext = useCarbonTheme();
  const theme = props.theme ?? themeOfContext;
  const layer = props.layer ?? defaultLayer;

  return (
    <div
      className={classNames(
        [
          theme === "white" && [
            layer === "00" && "theme-white-layer-00",
            layer === "01" && "theme-white-layer-01",
            layer === "02" && "theme-white-layer-02",
            layer === "03" && "theme-white-layer-03",
          ],
          theme === "g10" && [
            layer === "00" && "theme-g10-layer-00",
            layer === "01" && "theme-g10-layer-01",
            layer === "02" && "theme-g10-layer-02",
            layer === "03" && "theme-g10-layer-03",
          ],
          theme === "g100" && [
            layer === "00" && "theme-g100-layer-00",
            layer === "01" && "theme-g100-layer-01",
            layer === "02" && "theme-g100-layer-02",
            layer === "03" && "theme-g100-layer-03",
          ],
          theme === "g90" && [
            layer === "00" && "theme-g90-layer-00",
            layer === "01" && "theme-g90-layer-01",
            layer === "02" && "theme-g90-layer-02",
            layer === "03" && "theme-g90-layer-03",
          ],
        ],
        `bg-token-layer`,
        props.className
      )}
    >
      {children}
    </div>
  );
};
