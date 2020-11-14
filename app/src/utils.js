import * as data from "./data/currentLoans.json";

export function getCurrentLoans() {
  return data.loans;
}

export function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getTimeRemaining(seconds) {
  const displaytext = [];
  let delta = seconds;
  const days = Math.floor(delta / 86400);
  if (days > 0) {
    displaytext.push(`${days} days`);
  }
  delta = delta - days * 86400;
  const hours = Math.floor(delta / 3600) % 24;
  if (hours > 0) {
    displaytext.push(`${hours} hours`);
  }
  delta = delta - hours * 3600;
  const minutes = Math.floor(delta / 60) % 60;
  if (minutes > 0) {
    displaytext.push(`${minutes} minutes`);
  }
  if (displaytext.length === 0) {
    return "None";
  } else {
    return displaytext.join(" ");
  }
}
