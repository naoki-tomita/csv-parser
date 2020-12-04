function toValue(text: string): boolean | number | string | null {
  if (/^".*"$/.test(text)) {
    return text.replace(/^"(.*)"$/, "$1");
  }
  if (text === "null") {
    return null;
  }
  if (/^\d+(?:\.\d+)?$/.test(text)) {
    return parseFloat(text);
  }
  return text;
}

function removeQuote(head: string): string {
  if (/^".*"$/.test(head)) {
    return head.replace(/^"(.*)"$/, "$1");
  }
  return head;
}

export function parse(text: string): {[key: string]: boolean | number | string | null}[] {
  const keys = text.trim()
    .split("\n")[0]
    .match(/"[^"]*"|[^,]+/g)!
    .map(it => it.trim())
    .map(removeQuote);
  return text.trim()
    .split("\n").slice(1)
    .map(it => it.trim())
    .map(it => it.match(/"[^"]*"|[^,]+/g))
    .map(it => it!.map(cell => cell.trim()))
    .map(it => it.reduce((prev, next, i) => ({ ...prev, [keys[i]]: toValue(next) }), {}));
}
