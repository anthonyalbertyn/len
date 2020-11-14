import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";

import "./LoanPage.css";
import { getCurrentLoans, numberWithCommas } from "../../utils.js";
import LoanCard from "../LoanCard";
import InvestForm from "../InvestForm";

const propsDefinition = {
  pageTitle: PropTypes.string,
};

export function LoanPage(props) {
  const { pageTitle } = props;

  const [loanList, setLoanList] = useState([]);
  const [loansInvested, setLoansInvested] = useState([]);

  const [isModalActive, setIsModalActive] = useState(false);
  const [activeLoanId, setActiveLoanId] = useState(0);

  function getLoanDetails(id) {
    let loanDetails;
    const loans = loanList.filter((item) => item.id === id);
    if (loans.length > 0) {
      loanDetails = loans[0];
    }
    return loanDetails;
  }

  function handleClickInvest(id) {
    setActiveLoanId(id);
    setIsModalActive(true);
  }

  function handleModalClose() {
    setIsModalActive(false);
    setActiveLoanId(0);
  }

  function handleMakeInvestment(id, investmentAmount) {
    const loans = [...loanList];
    const invested = [...loansInvested];

    loans.forEach((item) => {
      if (item.id === id) {
        item.available = item.available - investmentAmount;
        invested.push(id);
      }
    });
    setLoanList(loans);
    setLoansInvested(invested);
    setIsModalActive(false);
  }

  function isLoanInvested(id) {
    return loansInvested.indexOf(id) !== -1;
  }

  function calculateAvailableToInvest() {
    let total = 0;
    loanList.forEach((item) => (total += item.available));
    return total;
  }

  useEffect(() => {
    // If we were fetching data from an API endpoint
    // then this would be a promise and we wuld need
    // to handle the promise with then() and catch()
    // and the state update would happen in then()
    const currentLoans = getCurrentLoans() || [];
    setLoanList(currentLoans);
  }, []);

  const availableToInvest = calculateAvailableToInvest();

  let activeLoan;

  if (activeLoanId !== 0) {
    activeLoan = getLoanDetails(activeLoanId);
  }

  return (
    <div className="loan-page" data-testid="loan-page">
      <h1 className="loan-page-title">{pageTitle}</h1>
      {loanList.length > 0 &&
        loanList.map((item) => {
          const {
            id,
            title,
            tranche,
            available,
            annualised_return: annualisedReturn,
            term_remaining: termRemaining,
            ltv,
            amount,
          } = item;
          return (
            <LoanCard
              id={id}
              key={id}
              title={title}
              tranche={tranche}
              available={available}
              annualisedReturn={annualisedReturn}
              termRemaining={termRemaining}
              ltv={ltv}
              amount={amount}
              hasInvested={isLoanInvested(id)}
              onClick={() => handleClickInvest(item.id)}
            />
          );
        })}
      <div className="loan-page-footer">
        <span className="loan-page-label">
          Total amount available to invest:
        </span>
        <span className="loan-page-total">
          £{numberWithCommas(availableToInvest)}
        </span>
      </div>
      {isModalActive && activeLoan && (
        <Modal
          title="Invest in Loan"
          visible={isModalActive}
          onCancel={handleModalClose}
          footer={null}
        >
          <InvestForm
            title={activeLoan.title}
            available={activeLoan.available}
            termRemaining={activeLoan.term_remaining}
            makeInvestment={(amount) =>
              handleMakeInvestment(activeLoan.id, amount)
            }
          />
        </Modal>
      )}
    </div>
  );
}

LoanPage.propTypes = propsDefinition;

export default LoanPage;
