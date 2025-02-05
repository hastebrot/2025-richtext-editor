export function stringify(value, replacer, space, level) {
  level = level || 0;
  replacer = replacer || ((_, value) => value);

  const isNull = (value) => value === null;
  const isUndefined = (value) => value === undefined;
  const isString = (value) => typeof value === "string";
  const isNumber = (value) => typeof value === "number";
  const isBoolean = (value) => typeof value === "boolean";
  const isDate = (value) => value instanceof Date;
  const isArray = (value) => value instanceof Array;
  const isObject = (value) =>
    !isNull(value) &&
    !isUndefined(value) &&
    !isString(value) &&
    !isNumber(value) &&
    !isBoolean(value) &&
    !isDate(value) &&
    !isArray(value);

  const formatNull = (value) => "" + value;
  const formatString = (value) => '"' + value.replace(/\\/g, "\\\\").replace('"', '\\"') + '"';
  const formatNumber = (value) => "" + value;
  const formatBoolean = (value) => "" + value;
  const formatDate = (value) => '"' + value.toISOString() + '"';

  const toEntries = (value) =>
    Object.entries(value).map((entry) => {
      return { key: entry[0], value: entry[1] };
    });
  const toSpace = (space) => "".padStart(space);

  if (isNull(value)) {
    return formatNull(value);
  }
  if (isString(value)) {
    return formatString(value);
  }
  if (isNumber(value)) {
    return formatNumber(value);
  }
  if (isBoolean(value)) {
    return formatBoolean(value);
  }
  if (isDate(value)) {
    return formatDate(value);
  }
  if (isArray(value)) {
    const entries = toEntries(value)
      .map((entry) => {
        return {
          key: entry.key,
          value: stringify(entry.value, replacer, space, level + 1),
        };
      })
      .filter((entry) => !!entry.value);
    if (entries.length === 0) {
      return "[]";
    }
    return [
      "[",
      entries
        .map((entry) => {
          return toSpace(space * (level + 1)) + `${entry.value}`;
        })
        .join(",\n"),
      toSpace(space * level) + "]",
    ].join("\n");
  }
  if (isObject(value)) {
    const isComplex = !!toEntries(value).find(
      (entry) =>
        isObject(replacer(entry.key, entry.value)) || isArray(replacer(entry.key, entry.value))
    );
    const entries = toEntries(value)
      .map((entry) => {
        return {
          key: entry.key,
          value: replacer(entry.key, entry.value),
        };
      })
      .map((entry) => {
        return {
          key: entry.key,
          value: stringify(entry.value, replacer, space, level + 1),
        };
      })
      .sort((entry, otherEntry) => -entry.key.localeCompare(otherEntry.key))
      .filter((entry) => !!entry.value);
    if (entries.length === 0) {
      return "{}";
    }
    return [
      "{",
      entries
        .map((entry) => {
          return (isComplex ? toSpace(space * (level + 1)) : "") + `${entry.key}: ${entry.value}`;
        })
        .join(isComplex ? ",\n" : ", "),
      isComplex ? toSpace(space * level) + "}" : "}",
    ].join(isComplex ? "\n" : " ");
  }
}
