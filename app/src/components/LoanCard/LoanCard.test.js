import { render, screen } from "@testing-library/react";
import LoanCard from "./LoanCard";

jest.mock("../../utils.js", () => ({
  numberWithCommas: (value) => value,
  getTimeRemaining: (value) => value,
}));

const loanCardProps = {
  title: "Title",
  tranche: "Tranche",
  available: 2000,
  annualisedReturn: "Return",
  termRemaining: 879000,
  ltv: "Ltv",
  amount: 50000,
  hasInvested: false,
  onClick: () => {},
};

test("renders title", () => {
  render(<LoanCard {...loanCardProps} />);
  const titleElement = screen.getByText(/Title/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders tranche", () => {
  render(<LoanCard {...loanCardProps} />);
  const trancheElement = screen.getByText(/Tranche/i);
  expect(trancheElement).toBeInTheDocument();
});

test("renders available", () => {
  render(<LoanCard {...loanCardProps} />);
  const availableElement = screen.getByText(/2000/i);
  expect(availableElement).toBeInTheDocument();
});

test("renders annualised return", () => {
  render(<LoanCard {...loanCardProps} />);
  const annualisedReturnElement = screen.getByText(/Return/i);
  expect(annualisedReturnElement).toBeInTheDocument();
});

test("renders term remaining", () => {
  render(<LoanCard {...loanCardProps} />);
  const termRemainingElement = screen.getByText(/879000/i);
  expect(termRemainingElement).toBeInTheDocument();
});

test("renders ltv", () => {
  render(<LoanCard {...loanCardProps} />);
  const ltvElement = screen.getByText(/Ltv/i);
  expect(ltvElement).toBeInTheDocument();
});

test("renders amount", () => {
  render(<LoanCard {...loanCardProps} />);
  const amountElement = screen.getByText(/50000/i);
  expect(amountElement).toBeInTheDocument();
});

test("renders invest button", () => {
  render(<LoanCard {...loanCardProps} />);
  const investButtonElement = screen.getByText(/INVEST/i);
  expect(investButtonElement).toBeInTheDocument();
});

test("renders invested text", () => {
  const investedProps = { ...loanCardProps, hasInvested: true };
  render(<LoanCard {...investedProps} />);
  const investedElement = screen.getByText(/invested/i);
  expect(investedElement).toBeInTheDocument();
});
