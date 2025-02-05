const plugin = require("tailwindcss/plugin");
const { themes } = require("@carbon/themes");

const themeMap = toThemeMap(themes);
const tokenMap = toTokenMap(themeMap["theme-white"]);

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", "InterVariable", "sans-serif"],
      },
      colors: tokenMap,
      backgroundColor: tokenMap,
      borderColor: tokenMap,
      outlineColor: tokenMap,
      textColor: tokenMap,
      placeholderColor: tokenMap,
    },
  },
  plugins: [
    plugin(function (context) {
      context.addBase({
        ".theme-white-layer-00": toCssMap(themeMap["theme-white"], "00"),
        ".theme-white-layer-01": toCssMap(themeMap["theme-white"], "01"),
        ".theme-white-layer-02": toCssMap(themeMap["theme-white"], "02"),
        ".theme-white-layer-03": toCssMap(themeMap["theme-white"], "03"),

        ".theme-g10-layer-00": toCssMap(themeMap["theme-g10"], "00"),
        ".theme-g10-layer-01": toCssMap(themeMap["theme-g10"], "01"),
        ".theme-g10-layer-02": toCssMap(themeMap["theme-g10"], "02"),
        ".theme-g10-layer-03": toCssMap(themeMap["theme-g10"], "03"),

        ".theme-g100-layer-00": toCssMap(themeMap["theme-g100"], "00"),
        ".theme-g100-layer-01": toCssMap(themeMap["theme-g100"], "01"),
        ".theme-g100-layer-02": toCssMap(themeMap["theme-g100"], "02"),
        ".theme-g100-layer-03": toCssMap(themeMap["theme-g100"], "03"),

        ".theme-g90-layer-00": toCssMap(themeMap["theme-g90"], "00"),
        ".theme-g90-layer-01": toCssMap(themeMap["theme-g90"], "01"),
        ".theme-g90-layer-02": toCssMap(themeMap["theme-g90"], "02"),
        ".theme-g90-layer-03": toCssMap(themeMap["theme-g90"], "03"),
      });
    }),
  ],
};

function toThemeMap(themes) {
  const themeMap = {};
  for (const [themeKey, tokens] of Object.entries(themes)) {
    const themeName = `theme-${themeKey}`;
    themeMap[themeName] = {};
    for (const [tokenKey, value] of Object.entries(tokens)) {
      if (isTokenColor(value)) {
        const tokenName = `token-${formatTokenName(tokenKey)}`;
        themeMap[themeName][tokenName] = value.replace(/\s/g, "");
      }
    }
  }
  return themeMap;
}

function toTokenMap(theme) {
  const tokenMap = {};
  for (const [token] of Object.entries(theme)) {
    const { tokenName } = parseTokenName(token);
    const cssVariableName = `var(--${tokenName})`;
    Object.assign(tokenMap, { [tokenName]: cssVariableName });
  }
  return tokenMap;
}

function toCssMap(theme, layer) {
  const cssVariableMap = {};
  for (const [token, cssVariableName] of Object.entries(theme)) {
    const { tokenName, layerSuffix } = parseTokenName(token);
    if (layerSuffix === undefined || layerSuffix === layer) {
      Object.assign(cssVariableMap, { [`--${tokenName}`]: cssVariableName });
    }
  }
  return cssVariableMap;
}

function isTokenColor(value) {
  if (typeof value === "string") {
    return value.startsWith("#") || value.startsWith("rgb");
  }
  return false;
}

function formatTokenName(token) {
  let outputToken = "";

  for (const tokenChar of token) {
    if (!isNaN(tokenChar)) {
      if (isNaN(outputToken[outputToken.length - 1])) {
        outputToken += "-";
      }
      outputToken += tokenChar;
      continue;
    }

    if (tokenChar === tokenChar.toUpperCase()) {
      if (outputToken[outputToken.length - 1] !== "-") {
        outputToken += "-";
      }
      outputToken += tokenChar.toLowerCase();
      continue;
    }

    outputToken += tokenChar;
  }

  return outputToken;
}

function parseTokenName(token) {
  const [tokenName, layerSuffix] = token.split(/-(00|01|02|03)$/);
  return { tokenName, layerSuffix };
}
