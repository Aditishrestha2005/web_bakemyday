import { render, screen } from "@testing-library/react";
import ProfilePage from "../(protected)/profile/page";

// Mock Router
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

// Mock Navbar
jest.mock("../(public)/_components/Navbar", () => {
  return function Navbar() {
    return <div>Navbar</div>;
  };
});

// Mock Footer
jest.mock("../(public)/_components/Footer", () => {
  return function Footer() {
    return <div>Footer</div>;
  };
});

describe("Profile Page", () => {
  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() =>
          JSON.stringify({
            _id: "1",
            fullName: "John Doe",
            username: "john",
            email: "john@test.com",
            phoneNumber: "9800000000",
            location: "Kathmandu",
            profilePicture: "",
          })
        ),
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
            data: [],
          }),
      } as any)
    );
  });

  it("should render personal information heading", () => {
    render(<ProfilePage />);

    expect(
      screen.getByText("Personal Information")
    ).toBeInTheDocument();
  });
});