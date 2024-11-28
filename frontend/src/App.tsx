import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AttendanceForm from "./components/AttendanceForm";
import MonthlyReport from "./components/MonthlyReport";
import RegisterEmployeeForm from "./components/EmployeeRegisterForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeEdit from "./components/EmployeeEdit";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar bg-primary">
          <ul className="nav nav-tabs mx-3">
            <li className="nav-item">
              <Button
                className="nav-link text-light"
                size="medium"
                href="/"
                variant="outlined"
                startIcon={<HomeIcon />}
              >
                ホーム
              </Button>
            </li>
            <li className="nav-item">
              <Button
                className="nav-link text-light"
                size="medium"
                href="/employees/list"
                variant="outlined"
                startIcon={<PeopleIcon />}
              >
                社員一覧
              </Button>
            </li>
            <li className="nav-item">
              <Button
                className="nav-link text-light"
                size="medium"
                href="/employees/register"
                variant="outlined"
                startIcon={<BadgeIcon />}
              >
                社員登録
              </Button>
            </li>
            <li className="nav-item">
              <Button
                className="nav-link text-light"
                size="medium"
                href="/attendance"
                variant="outlined"
                startIcon={<PunchClockIcon />}
              >
                出退勤管理
              </Button>
            </li>
            <li className="nav-item">
              <Button
                className="nav-link text-light"
                size="medium"
                href="/report"
                variant="outlined"
                startIcon={<CalendarMonthIcon />}
              >
                月末帳票出力
              </Button>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={LoginPage} />
          <Route path="/employees/list" component={EmployeeList} />
          <Route path="/employees/register" component={RegisterEmployeeForm} />
          <Route path="/attendance" component={AttendanceForm} />
          <Route path="/report" component={MonthlyReport} />
          <Route path="/employees/edit/:id" component={EmployeeEdit} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
