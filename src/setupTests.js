// Polyfill require.context for Jest environment
if (typeof require.context === 'undefined') {
  require.context = () => {
    const fn = () => '';
    fn.keys = () => [];
    fn.resolve = () => '';
    return fn;
  };
}
