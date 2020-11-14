import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, InputNumber } from "antd";

import "./InvestForm.css";
import { getTimeRemaining, numberWithCommas } from "../../utils.js";

const propsDefinition = {
  title: PropTypes.string.isRequired,
  available: PropTypes.number.isRequired,
  termRemaining: PropTypes.number.isRequired,
  makeInvestment: PropTypes.func.isRequired,
};

export function InvestForm(props) {
  const { title, available, termRemaining, makeInvestment = () => {} } = props;

  const [investAmount, setInvestAmount] = useState(0);
  const [hasError, setHasError] = useState(false);

  function handleClickInvest() {
    if (investAmount > 0 && !hasError) {
      makeInvestment(investAmount);
    }
  }

  function handleChange(value) {
    setInvestAmount(value);
    if (value > available) {
      setHasError(true);
    } else if (hasError) {
      setHasError(false);
    }
  }

  return (
    <div className="invest-form" data-testid="invest-form">
      <div className="invest-form-heading">{title}</div>
      <div className="invest-form-details-wrapper">
        <div className="invest-form-details">
          Amount available: £{numberWithCommas(available)}
        </div>
        <div className="invest-form-details">
          Loan ends in: {getTimeRemaining(termRemaining)}
        </div>
      </div>

      <div className="invest-form-items-wrapper">
        <div className="invest-form-label">Investment amount (£)</div>
        <div className="invest-form-items-inner">
          <div className="invest-form-amount">
            <InputNumber
              min={0}
              max={available}
              defaultValue={investAmount}
              value={investAmount}
              step={1000}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
              onChange={handleChange}
              onPressEnter={handleClickInvest}
              data-testid="invest-input"
            />
          </div>
          <div className="invest-form-cta">
            <Button
              type="primary"
              size="medium"
              onClick={handleClickInvest}
              disabled={hasError || !(investAmount > 0)}
              data-testid="invest-button"
            >
              Invest
            </Button>
          </div>
        </div>
        {hasError && (
          <div className="invest-form-error">
            Investment amount exceeds available amount
          </div>
        )}
      </div>
    </div>
  );
}

InvestForm.propTypes = propsDefinition;

export default InvestForm;
