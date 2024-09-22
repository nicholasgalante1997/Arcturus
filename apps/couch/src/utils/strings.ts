export const toTitleCase = (strArr: string[]): string =>
  strArr.map((str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()).join(' ');
export const fmtLocaleString = (s: string, keyDict: Record<string, string>): string => {
  for (const [k, v] of Object.entries(keyDict)) {
    const fKey = `{{ ${k} }}`;
    if (!s.includes(fKey)) {
      return '';
    } else {
      s.replace(fKey, v);
    }
  }
  return s;
};
