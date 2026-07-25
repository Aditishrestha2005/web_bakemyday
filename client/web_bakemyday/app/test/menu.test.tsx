import { render, screen } from "@testing-library/react";
import MenuPage from "../(protected)/menu/page";


jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));


jest.mock("../(public)/_components/Navbar", () => () => (
  <div>Navbar</div>
));

jest.mock("../(public)/_components/Footer", () => () => (
  <div>Footer</div>
));


jest.mock("lucide-react", () => ({
  ShoppingCart: () => <div>ShoppingCart</div>,
}));


jest.mock("axios", () => ({
  get: jest.fn().mockResolvedValue({
    data: {
      data: [],
    },
  }),
}));

describe("Menu Page", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() =>
          JSON.stringify({ _id: "user123" })
        ),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            data: {
              items: [],
            },
          }),
      } as any)
    );
  });

  it("should render menu heading", () => {
    render(<MenuPage />);

    expect(
      screen.getByText("Our Menu")
    ).toBeInTheDocument();
  });
});