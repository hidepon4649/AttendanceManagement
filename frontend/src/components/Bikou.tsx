import React, { useState, useEffect } from "react";
import api from "../services/api";
import { Alert } from "react-bootstrap";

interface BikouProps {
  employeeId: number;
  date: string;
  initalRemarks: string;
  callback: () => void;
}

export const Bikou = (props: BikouProps) => {
  const { employeeId, date, initalRemarks, callback } = props;
  const [remarks, setRemarks] = useState(initalRemarks);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  useEffect(() => {
    setRemarks(initalRemarks);
  }, [initalRemarks]);

  const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (remarks !== newValue) {
      setRemarks(newValue);
      setIsButtonVisible(true);
    }
  };

  const handleRemarksSubmit = async () => {
    try {
      await api.post(`/attendance/${employeeId}/${date}/remarks`, {
        employeeId: employeeId,
        date: date,
        remarks: remarks,
      });
      setAlert({ type: "success", message: "備考が登録されました" });
      callback();
    } catch (error: any) {
      setAlert({
        type: "danger",
        message: `備考の登録に失敗しました:${error.message}`,
      });
    }
  };
  return (
    <>
      {alert && (
        <Alert
          variant={alert.type}
          onClose={() => {
            setAlert(null);
            setIsButtonVisible(false);
          }}
          dismissible
        >
          {alert.message}
        </Alert>
      )}
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={remarks}
          onChange={handleRemarksChange}
          maxLength={100}
        />
        {isButtonVisible && (
          <button
            className="btn btn-secondary mx-1"
            onClick={handleRemarksSubmit}
          >
            登録
          </button>
        )}
      </div>
    </>
  );
};
