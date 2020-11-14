import "./App.css";
import "antd/dist/antd.css";
import LoanPage from "./components/LoanPage";

function App() {
  return (
    <div className="app" data-testid="app">
      <LoanPage pageTitle="Current Loans" />
    </div>
  );
}

export default App;
