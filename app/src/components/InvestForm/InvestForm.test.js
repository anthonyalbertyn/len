import { render, screen, fireEvent } from "@testing-library/react";
import InvestForm from "./InvestForm";

jest.mock("../../utils.js", () => ({
  numberWithCommas: (value) => value,
  getTimeRemaining: (value) => value,
}));

const investFormProps = {
  title: "Title",
  available: 1000,
  termRemaining: 879000,
  makeInvestment: () => {},
};

test("renders title", () => {
  render(<InvestForm {...investFormProps} />);
  const titleElement = screen.getByText(/Title/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders available", () => {
  render(<InvestForm {...investFormProps} />);
  const availableElement = screen.getByText(/1000/i);
  expect(availableElement).toBeInTheDocument();
});

test("renders term remaining", () => {
  render(<InvestForm {...investFormProps} />);
  const termRemainingElement = screen.getByText(/879000/i);
  expect(termRemainingElement).toBeInTheDocument();
});

test("renders an input field label", () => {
  render(<InvestForm {...investFormProps} />);
  const investLabelElement = screen.getByText(/Investment amount/i);
  expect(investLabelElement).toBeInTheDocument();
});

test("renders invest input field", () => {
  render(<InvestForm {...investFormProps} />);
  const investInputElement = screen.getByTestId(/invest-input/i);
  expect(investInputElement).toBeInTheDocument();
});

test("renders invest button", () => {
  render(<InvestForm {...investFormProps} />);
  const investButtonElement = screen.getByTestId(/invest-button/i);
  expect(investButtonElement).toBeInTheDocument();
});

test("by default does not display an error message", () => {
  render(<InvestForm {...investFormProps} />);
  const errorMessage = screen.queryByText(/exceeds available/i);
  expect(errorMessage).toBeNull();
});

test("displays an error message when amount exceeded", () => {
  render(<InvestForm {...investFormProps} />);
  const investInputElement = screen.getByTestId(/invest-input/i);
  const investButtonElement = screen.getByTestId(/invest-button/i);
  fireEvent.change(investInputElement, { target: { value: 99999 } });
  fireEvent.click(investButtonElement);
  const errorMessageElement = screen.getByText(/exceeds available/i);
  expect(errorMessageElement).toBeInTheDocument();
});

test("does not display an error message when amount not exceeded", () => {
  render(<InvestForm {...investFormProps} />);
  const investInputElement = screen.getByTestId(/invest-input/i);
  const investButtonElement = screen.getByTestId(/invest-button/i);
  fireEvent.change(investInputElement, { target: { value: 100 } });
  fireEvent.click(investButtonElement);
  const errorMessage = screen.queryByText(/exceeds available/i);
  expect(errorMessage).toBeNull();
});
