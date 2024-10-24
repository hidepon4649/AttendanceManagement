import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import AttendanceForm from './components/AttendanceForm';
import MonthlyReport from './components/MonthlyReport';
import RegisterEmployeeForm from './components/RegisterEmployeeForm';

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="navbar bg-primary">
          <ul className="nav nav-tabs mx-3">
            <li className="nav-item">
              <Link className="nav-link" style={{color: "white"}} to="/">ログイン</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color: "white"}}  to="/register">社員登録</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color: "white"}}  to="/attendance">出退勤管理</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" style={{color: "white"}}  to="/report">月末帳票出力</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/" exact component={LoginForm} />
          <Route path="/register" component={RegisterEmployeeForm} />
          <Route path="/attendance" component={AttendanceForm} />
          <Route path="/report" component={MonthlyReport} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
