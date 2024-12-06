import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
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

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/employees/list" element={<EmployeeList />} />
          <Route
            path="/employees/register"
            element={<RegisterEmployeeForm />}
          />
          <Route path="/attendance" element={<AttendanceForm />} />
          <Route path="/report" element={<MonthlyReport />} />
          <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
