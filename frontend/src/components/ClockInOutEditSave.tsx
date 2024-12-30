import React, { useState, useEffect } from "react";
import TimePicker from "react-bootstrap-time-picker";
import { formatShortTime, padFrontZero } from "../utils/formatTimeUtils";
import { Attendance } from "../models/Attendance";
import api from "../services/api";
import { Alert, Modal, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";

export const ClockInOutEditSave = (props: {
  isAdmin: boolean;
  record: Attendance | null;
}) => {
  const [editRecordId, setEditRecordId] = useState<string | null>(null);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  // const navigate = useNavigate();

  const handleSaveClick = async () => {
    if (!props.record) {
      return;
    }
    // 時刻がint型の場合は、時刻を文字列に変換
    let inTime = clockInTime ? clockInTime : "00:00:00";
    if (clockInTime != null && !clockInTime.includes(":")) {
      const inTimeHours = padFrontZero(
        Math.floor(parseInt(clockInTime) / 3600),
        2
      );
      const inTimeMinutes = padFrontZero(
        Math.floor((parseInt(clockInTime) % 3600) / 60),
        2
      );
      inTime = `${inTimeHours}:${inTimeMinutes}:00`;
    }
    // 時刻がint型の場合は、時刻を文字列に変換
    let outTime = clockOutTime ? clockOutTime : "00:00:00";
    if (clockOutTime != null && !clockOutTime.includes(":")) {
      const outTimeHours = padFrontZero(
        Math.floor(parseInt(clockOutTime) / 3600),
        2
      );
      const outTimeMinutes = padFrontZero(
        Math.floor((parseInt(clockOutTime) % 3600) / 60),
        2
      );
      outTime = `${outTimeHours}:${outTimeMinutes}:00`;
    }

    try {
      await api.put(`/attendance/maintenance/${props.record.id}`, {
        attendanceId: props.record.id,
        clockInTime: inTime,
        clockOutTime: outTime,
      });
      setAlert({ type: "success", message: "勤怠が修正されました" });
    } catch (error) {
      setAlert({ type: "danger", message: "勤怠の修正に失敗しました" });
    }
    setShowModal(true);
    setEditRecordId(null);
  };

  const handleEditClick = (id: string) => {
    setEditRecordId(id);
    setClockInTime(
      props.record ? formatShortTime(props.record.clockInTime) : null
    );
    setClockOutTime(
      props.record ? formatShortTime(props.record.clockOutTime) : null
    );
  };

  const handleClockInTimeChange = (value: number) => {
    console.log("clockInTime, newValue", clockInTime, value);
    setClockInTime(value.toString());
  };

  const handleClockOutTimeChange = (value: number) => {
    console.log("clockOutTime, newValue", clockOutTime, value);
    setClockOutTime(value.toString());
  };

  // useEffect(() => {
  //   console.log("finish.");
  //   console.log("editRecordId", editRecordId);
  //   if (editRecordId !== props.record?.id.toString()) {
  //     setClockInTime(null);
  //     setClockOutTime(null);
  //   }
  // }, [editRecordId]);

  return (
    <>
      {props.record ? (
        <>
          {editRecordId === props.record.id.toString() ? (
            <>
              <td className="align-middle">
                <TimePicker
                  value={clockInTime}
                  step={1}
                  format={24}
                  onChange={handleClockInTimeChange}
                />
              </td>
              <td className="align-middle">
                <span>
                  <div className="d-inline-block">
                    <TimePicker
                      value={clockOutTime}
                      step={1}
                      format={24}
                      onChange={handleClockOutTimeChange}
                    />
                  </div>
                  <button
                    className="btn btn-primary mx-3 d-inline-block"
                    onClick={handleSaveClick}
                  >
                    保存
                  </button>
                </span>
              </td>
            </>
          ) : props.record.clockInTime ? (
            <>
              <td className="align-middle">
                {formatShortTime(props.record.clockInTime)}
              </td>
              <td className="align-middle">
                {formatShortTime(props.record.clockOutTime)}
                {props.isAdmin && (
                  <button
                    className="btn btn-secondary mx-3"
                    onClick={() =>
                      props.record &&
                      handleEditClick(props.record.id.toString())
                    }
                  >
                    修正
                  </button>
                )}
              </td>
            </>
          ) : (
            <>
              <td>-</td>
              <td>-</td>
            </>
          )}
        </>
      ) : (
        <>
          <td>-</td>
          <td>-</td>
        </>
      )}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          // navigate("/attendance");
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>通知</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {alert && <Alert variant={alert.type}>{alert.message}</Alert>}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              // navigate("/attendance");
            }}
          >
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
