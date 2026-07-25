import { render, screen } from "@testing-library/react";
import OrderPage from "../(protected)/order/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  useSearchParams: () => ({
    get: jest.fn((key: string) => {
      if (key === "type") return "menu";
      return null;
    }),
  }),
}));


jest.mock("../(public)/_components/Navbar", () => {
  return function Navbar() {
    return <div>Navbar</div>;
  };
});


jest.mock("../(public)/_components/Footer", () => {
  return function Footer() {
    return <div>Footer</div>;
  };
});

describe("Order Page", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn((key: string) => {
          if (key === "user") {
            return JSON.stringify({
              _id: "1",
              fullName: "John Doe",
              email: "john@test.com",
              phoneNumber: "9800000000",
            });
          }

          if (key === "directOrderItem") {
            return JSON.stringify({
              _id: "cake1",
              name: "Chocolate Cake",
              price: 500,
            });
          }

          return null;
        }),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            data: {},
          }),
      } as any)
    );
  });

  it("should render confirm order heading", async () => {
    render(<OrderPage />);

    expect(
      await screen.findByText("Confirm Order")
    ).toBeInTheDocument();
  });
});