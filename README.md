# React Coding Challenge

Submitted by: Anthony Albertyn on 14 November 2020

For a quick overview of the outcome, see screenshots of the solution in solution-screenshots folder

## The brief

- Create a simple React app based on the coding challenge mockup (see coding-test-mockup folder)
- Don't over-engineer the app
- Solution does not need to be pixel-perfect
- The json data file supplied should be treated as if it was hard-coded into the app, so no API fetch required
- Write unit tests

### The app needs to

- Display a list of loans
- Display a total mount available to invest
- When the invest button of a loan is clicked, a modal should open with a form to place an investment
- When a user places an investment, the loan item needs to reduce its 'available to invest value' and the 'total available to invest' value on the page should be reduced by the amount invested
- When a user places an investment, the modal should close and the loan item should display 'invested' text
- When the modal is open, a user can close it without placing an investment

## Minor issue

This implementation uses antd component library and some components might produce minor console errors message relating to strict mode.

## How to run the app

```
  cd app
  yarn install
  yarn start
```

The app will be available at: http://localhost:3000

See /app/README.md for ore information
