import React from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { lsClear } from "../utils/localStorageUtils";

interface LogoutPageProps {
  onLogout: () => void;
}
const LogoutButton = (props: LogoutPageProps) => {
  const { onLogout } = props;
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {});
      // ログイン状態の更新
      onLogout();

      // ローカルストレージのクリア
      lsClear();

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
