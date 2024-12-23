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
import {
  lsIsLoggedIn,
  lsIsAdmin,
  lsGetMyName,
  lsSetIsLoggedIn,
  lsSetIsAdmin,
} from "./utils/localStorageUtils";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return lsIsLoggedIn();
  });
  const [isAdmin, setIsAdmin] = useState(() => {
    return lsIsAdmin();
  });

  const [myName, setMyName] = useState(() => {
    return lsGetMyName();
  });

  const handleLoginSuccess = (roles: string[]) => {
    const wkIsAdmin = roles.includes("ROLE_ADMIN");

    setIsLoggedIn(true);
    setIsAdmin(wkIsAdmin);
    setMyName(lsGetMyName());

    // ローカルストレージの更新
    lsSetIsLoggedIn(true);
    lsSetIsAdmin(wkIsAdmin);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsAdmin(false);
    setMyName("");

    // ローカルストレージの更新
    lsSetIsLoggedIn(false);
    lsSetIsAdmin(false);
  };

  console.log("App.tsx is rendered. isLoggedIn:", isLoggedIn);

  return (
    <div className="container">
      <nav className="navbar bg-primary">
        <ul className="nav nav-tabs mx-3">
          {myName && (
            <li className="nav-item bg-light">
              <span className="nav-link text-primary">{myName}さん</span>
            </li>
          )}
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
            <>
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
            </>
          )}
          {isLoggedIn && (
            <>
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
              <li className="nav-item">
                <LogoutButton onLogout={handleLogout} />
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route
          path="/"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        {isLoggedIn && (
          <>
            <Route path="/employees/list" element={<EmployeeList />} />
            <Route
              path="/employees/register"
              element={<RegisterEmployeeForm />}
            />
            <Route path="/attendance" element={<AttendanceForm />} />
            <Route path="/report" element={<MonthlyReport />} />
            <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
