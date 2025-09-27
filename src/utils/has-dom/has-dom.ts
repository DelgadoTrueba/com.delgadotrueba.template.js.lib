export const hasDOM = () => {
  const g = globalThis as Record<string, unknown>;
  return typeof g === 'object' && !!g.window && !!g.document;
};
