import { render, screen, fireEvent } from "@testing-library/react";
import LoanPage from "./LoanPage";

jest.mock("../../utils.js", () => ({
  getTimeRemaining: (value) => value,
  numberWithCommas: (value) => value,
  getCurrentLoans: () => [
    {
      id: "1",
      title: "Loan 1",
      tranche: "A",
      available: 10000,
      annualised_return: "8.60",
      term_remaining: 600,
      ltv: "48.80",
      amount: 85754,
    },
    {
      id: "2",
      title: "Loan 2",
      tranche: "B",
      available: 5000,
      annualised_return: "7.10",
      term_remaining: 500,
      ltv: "48.80",
      amount: 85754,
    },
  ],
}));

test("renders a page heading", () => {
  render(<LoanPage pageTitle="Page heading" />);
  const pageHeadingElement = screen.getByText(/Page heading/i);
  expect(pageHeadingElement).toBeInTheDocument();
});

test("renders loan cards", () => {
  render(<LoanPage />);
  const firstLoanCardElement = screen.getByText(/Loan 1/i);
  const secondLoanCardElement = screen.getByText(/Loan 2/i);
  expect(firstLoanCardElement).toBeInTheDocument();
  expect(secondLoanCardElement).toBeInTheDocument();
});

test("renders total amount available to invest", () => {
  render(<LoanPage />);
  const totalAmountAvailableElement = screen.getByText(/15000/i);
  expect(totalAmountAvailableElement).toBeInTheDocument();
});

test("by default modal is not active", () => {
  render(<LoanPage />);
  const modal = screen.queryByText(/Invest in Loan/i);
  expect(modal).toBeNull();
});

test("modal is not active when investment button is clicked", () => {
  render(<LoanPage />);
  const investButtonElements = screen.getAllByText(/INVEST/i);
  fireEvent.click(investButtonElements[0]);
  const modal = screen.queryByText(/Invest in Loan/i);
  expect(modal).not.toBeNull();
});

test("updates amounts available to invest", () => {
  render(<LoanPage />);
  const amountAvailableLoan1Element = screen.getByText(/10000/i);
  const totalAmountAvailableElement = screen.getByText(/15000/i);
  expect(amountAvailableLoan1Element).toBeInTheDocument();
  expect(totalAmountAvailableElement).toBeInTheDocument();

  const investButtonElements = screen.getAllByText(/INVEST/i);
  fireEvent.click(investButtonElements[0]);

  screen.getByText(/Invest in Loan/i);

  const investInputElement = screen.getByTestId(/invest-input/i);
  const investButtonElement = screen.getByTestId(/invest-button/i);
  fireEvent.change(investInputElement, { target: { value: 1000 } });
  fireEvent.click(investButtonElement);

  const updatedAmountAvailableLoan1Element = screen.getByText(/9000/i);
  const updatedTotalAmountAvailableElement = screen.getByText(/14000/i);
  expect(updatedAmountAvailableLoan1Element).toBeInTheDocument();
  expect(updatedTotalAmountAvailableElement).toBeInTheDocument();
});
