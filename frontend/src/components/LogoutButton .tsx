import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    console.log("ログアウトボタンがクリックされました");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/logout",
        {}, // 空のリクエストボディ
        { headers: { Authorization: `Bearer ${token}` } }
      );
      localStorage.removeItem("token");
      localStorage.removeItem("CSRF-TOKEN");

      navigate("/"); // logout後はログインページにリダイレクト
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
