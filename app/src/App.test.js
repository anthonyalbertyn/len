import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders an App component", () => {
  render(<App />);
  const appComponent = screen.getByTestId(/app/i);
  expect(appComponent).toBeInTheDocument();
});

test("contains a LoanPage component", () => {
  render(<App />);
  const loanPageComponent = screen.getByTestId(/loan-page/i);
  expect(loanPageComponent).toBeInTheDocument();
});
