export function splitTextByLines(el) {
  if (typeof SplitText === 'undefined') return null;
  return new SplitText(el, { type: 'lines', linesClass: 'line-wrap' });
}
