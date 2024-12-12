import React from "react";
import axios from "axios";
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
    const token = localStorage.getItem("JWT-TOKEN");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {}, // 空のリクエストボディ
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "X-CSRF-TOKEN": localStorage.getItem("CSRF-TOKEN"),
          },
        }
      );
      // ログイン状態の更新
      onLogout();

      localStorage.removeItem("JWT-TOKEN");
      localStorage.removeItem("CSRF-TOKEN");
      localStorage.removeItem("isLoggedIn");

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
