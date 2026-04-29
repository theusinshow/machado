/**
 * Helpers para SplitText
 * Centraliza os splits por chars e linhas para manter consistência entre módulos.
 */

export function splitTextByChars(element) {
  if (!element) return null;
  if (typeof SplitText === 'undefined') return null;

  return new SplitText(element, { type: 'chars, words' });
}

export function splitTextByLines(element) {
  if (!element) return null;
  if (typeof SplitText === 'undefined') return null;

  const wrapperSplit = new SplitText(element, {
    type: 'lines',
    linesClass: 'line-wrap',
  });

  wrapperSplit.lines.forEach((line) => {
    line.style.overflow = 'hidden';
  });

  const contentSplit = new SplitText(element, { type: 'lines' });

  return {
    wrapperSplit,
    contentSplit,
    lines: contentSplit.lines,
  };
}
