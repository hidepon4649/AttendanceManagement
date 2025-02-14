import { useContext } from "react";
import LoginUserContext from "../context/LoginUserContext";

const useLoginUserContext = () => {
  return useContext(LoginUserContext);
};

export default useLoginUserContext;
