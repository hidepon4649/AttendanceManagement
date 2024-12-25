import React, { useState, useEffect } from "react";
import api from "../services/api";

export const Bikou = (props: {
  employeeId: number;
  date: string;
  remarks: string;
}) => {
  const [remarks, setRemarks] = useState(props.remarks);

  useEffect(() => {
    setRemarks(props.remarks);
  }, [props.remarks]);

  const handleRemarksChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRemarks(event.target.value);
  };

  const handleRemarksSubmit = async () => {
    try {
      await api.post(`/attendance/${props.employeeId}/${props.date}/remarks`, {
        employeeId: props.employeeId,
        date: props.date,
        remarks: remarks,
      });
      alert("備考が登録されました");
    } catch (error) {
      console.error("備考の登録に失敗しました", error);
      alert("備考の登録に失敗しました");
    }
  };
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control"
        value={remarks}
        onChange={handleRemarksChange}
        maxLength={100}
        placeholder="説明事項があれば簡潔に入力して下さい"
      />
      <button className="btn btn-secondary mx-1" onClick={handleRemarksSubmit}>
        登録
      </button>
    </div>
  );
};
