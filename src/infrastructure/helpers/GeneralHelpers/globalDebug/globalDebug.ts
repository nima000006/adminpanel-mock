/* eslint-disable no-console */
export const GlobalDebug = (function () {
  const savedConsole = { ...console };

  return function (debugOn: boolean) {
    // suppress all type of consoles functionality
    if (debugOn) {
      console.log = savedConsole.log;
      console.info = savedConsole.info;
      console.warn = savedConsole.warn;
      console.error = savedConsole.error;
    } else {
      console.log = function () {};
      console.info = function () {};
      console.warn = function () {};
      console.error = function () {};
    }
  };
})();
