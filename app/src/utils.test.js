import { getTimeRemaining, numberWithCommas } from "./utils.js";

test("getTimeRemaining function formats days, hours and minutes", () => {
  const formattedTime = getTimeRemaining(879000);
  expect(formattedTime).toBe("10 days 4 hours 10 minutes");
});

test("getTimeRemaining function formats days", () => {
  const formattedTime = getTimeRemaining(864000);
  expect(formattedTime).toBe("10 days");
});

test("getTimeRemaining function formats hours", () => {
  const formattedTime = getTimeRemaining(14400);
  expect(formattedTime).toBe("4 hours");
});

test("getTimeRemaining function formats minutes", () => {
  const formattedTime = getTimeRemaining(120);
  expect(formattedTime).toBe("2 minutes");
});

test("getTimeRemaining copes with zero", () => {
  const formattedTime = getTimeRemaining(0);
  expect(formattedTime).toBe("None");
});

test("numberWithCommas function formats thousands", () => {
  const formattedNumber = numberWithCommas(5342);
  expect(formattedNumber).toBe("5,342");
});

test("numberWithCommas function does not format hundreds", () => {
  const formattedNumber = numberWithCommas(999);
  expect(formattedNumber).toBe("999");
});
