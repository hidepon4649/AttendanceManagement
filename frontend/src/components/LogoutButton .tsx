import React from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

interface LogoutPageProps {
  onLogout: () => void;
}
const LogoutButton: React.FC<LogoutPageProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("ログアウトボタンがクリックされました");

    try {
      const response = await api.post("/auth/logout", {});
      // ログイン状態の更新
      onLogout();

      localStorage.clear();

      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Button
      className="nav-link text-light"
      size="medium"
      variant="outlined"
      startIcon={<LogoutIcon />}
      onClick={handleLogout}
    >
      ログアウト
    </Button>
  );
};

export default LogoutButton;
