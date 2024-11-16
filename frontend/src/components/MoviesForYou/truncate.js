export function truncate(str = "", symbolsCount) {
  return str.length < symbolsCount ? str : str.slice(0, symbolsCount).concat("...");
}
