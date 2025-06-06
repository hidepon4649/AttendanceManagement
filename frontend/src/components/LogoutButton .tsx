import React from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import { lsClear } from "src/utils/localStorageUtils";
import useLoginUserContext from "src/hooks/useLoginUserContext";

const LogoutButton = () => {
  const { handleLogout } = useLoginUserContext();
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await api.post("/auth/logout", {});
      // ログイン状態の更新
      handleLogout();

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
      onClick={logout}
    >
      ログアウト
    </Button>
  );
};

export default LogoutButton;
