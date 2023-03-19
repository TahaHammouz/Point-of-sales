import "@testing-library/jest-dom/extend-expect";
Object.defineProperty(window, "matchMedia", {
    value: jest.fn(() => {
      return {
        matches: false,
        addListener: jest.fn(),
        removeListener: jest.fn(),
      };
    }),
  });
  