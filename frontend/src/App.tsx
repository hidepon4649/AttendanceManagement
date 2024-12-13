import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import AttendanceForm from "./components/AttendanceForm";
import MonthlyReport from "./components/MonthlyReport";
import RegisterEmployeeForm from "./components/EmployeeRegisterForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeEdit from "./components/EmployeeEdit";
import LogoutButton from "./components/LogoutButton ";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("isAdmin") === "true";
  });

  const handleLoginSuccess = (roles: string[]) => {
    const wkIsAdmin = roles.includes("ROLE_ADMIN");

    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");

    setIsAdmin(wkIsAdmin);
    localStorage.setItem("isAdmin", wkIsAdmin ? "true" : "false");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
  };

  console.log("App.tsx is rendered. isLoggedIn:", isLoggedIn);

  return (
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
          {isLoggedIn && isAdmin && (
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
          )}
          {isLoggedIn && isAdmin && (
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
          )}
          {isLoggedIn && (
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
          )}
          {isLoggedIn && (
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
          )}
          {isLoggedIn && (
            <li className="nav-item">
              <LogoutButton onLogout={handleLogout} />
            </li>
          )}
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        {isLoggedIn && (
          <Route path="/employees/list" element={<EmployeeList />} />
        )}
        {isLoggedIn && (
          <Route
            path="/employees/register"
            element={<RegisterEmployeeForm />}
          />
        )}
        {isLoggedIn && (
          <Route path="/attendance" element={<AttendanceForm />} />
        )}
        {isLoggedIn && <Route path="/report" element={<MonthlyReport />} />}
        {isLoggedIn && (
          <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
        )}
      </Routes>
    </div>
  );
};

export default App;
