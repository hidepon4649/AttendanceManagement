import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterEmployeeForm from './components/RegisterEmployeeForm';
import AttendanceForm from './components/AttendanceForm';
import MonthlyReport from './components/MonthlyReport';

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/">ログイン4</Link>
            </li>
            <li>
              <Link to="/register">社員登録</Link>
            </li>
            <li>
              <Link to="/attendance">出退勤管理</Link>
            </li>
            <li>
              <Link to="/report">月末帳票出力</Link>
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
