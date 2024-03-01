import "./App.css";
import SignIn from "./Pages/SignIn";
import ResetPassword from "./Pages/ResetPassword";
import Dashboard from "./Pages/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Expense from "./Pages/expense";
import ExpenseForm from "./components/Expense/expenseForm";
import { customTheme } from "./utils/theme";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <div>
        <Router>
          <Routes>
            <Route exact path="/" element={<SignIn />} />
            <Route exact path="/dashboard" element={<Dashboard />} />
            <Route exact path="/expense" element={<Expense />} />
            <Route exact path="/resetpassword" element={<ResetPassword />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
