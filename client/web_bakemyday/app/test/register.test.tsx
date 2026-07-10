import { render, screen } from "@testing-library/react";
import RegisterPage from "../(auth)/register/page";

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

describe("Register Page", () => {

  it("should render register heading", () => {

    render(<RegisterPage />);

    expect(
      screen.getByText("Create an Account")
    ).toBeInTheDocument();

  });

});