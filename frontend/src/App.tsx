import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import AttendanceForm from "./components/AttendanceForm";
import RegisterEmployeeForm from "./components/EmployeeRegisterForm";
import EmployeeList from "./components/EmployeeList";
import EmployeeEdit from "./components/EmployeeEdit";
import LogoutButton from "./components/LogoutButton ";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import BadgeIcon from "@mui/icons-material/Badge";
import PunchClockIcon from "@mui/icons-material/PunchClock";
import LoginUserContext from "./context/LoginUserContext";

const App = () => {
  const { isLoggedIn, isAdmin, myName } = useContext(LoginUserContext);

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
                <LogoutButton />
              </li>
            </>
          )}
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<LoginPage />} />
        {isLoggedIn && (
          <>
            <Route path="/employees/list" element={<EmployeeList />} />
            <Route
              path="/employees/register"
              element={<RegisterEmployeeForm />}
            />
            <Route path="/attendance" element={<AttendanceForm />} />
            <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
