import { render, screen } from "@testing-library/react";
import LoginPage from "../(auth)/login/page";


jest.mock("next/image", () => (props: any) => {
  return <img {...props} />;
});

jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));

describe("Login Page", () => {

  it("should render login heading", () => {

    render(<LoginPage />);

    expect(
      screen.getByText("Welcome Back")
    ).toBeInTheDocument();

  });

});