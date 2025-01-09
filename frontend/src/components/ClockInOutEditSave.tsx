import React, { useState, useEffect } from "react";
import TimePicker from "react-bootstrap-time-picker";
import {
  formatShortTime,
  padFrontZero,
  getStartEndGap,
} from "../utils/dateTimeUtils";
import { Attendance } from "../models/Attendance";
import api from "../services/api";
import { Alert, Modal, Button } from "react-bootstrap";

export const ClockInOutEditSave = (props: {
  isAdmin: boolean;
  record: Attendance | null;
  callback: () => void;
}) => {
  const [editRecordId, setEditRecordId] = useState<string | null>(null);
  const [clockInTime, setClockInTime] = useState(
    props.record?.clockInTime || ""
  );
  const [clockOutTime, setClockOutTime] = useState(
    props.record?.clockOutTime || ""
  );
  const [breakMinutes, setBreakMinutes] = useState(
    props.record?.breakMinutes || 0
  );

  const [startEndGap, setStartEndGap] = useState("");

  useEffect(() => {
    if (props.record) {
      const sTime = props.record.clockInTime;
      const eTime = props.record.clockOutTime;
      const bMins = props.record.breakMinutes;

      setClockInTime(formatShortTime(sTime));
      setClockOutTime(formatShortTime(eTime));
      setBreakMinutes(bMins);
      setStartEndGap(getStartEndGap(sTime, eTime, bMins));
    }
  }, [props.record]);

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

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
      inTime = `${inTimeHours}:${inTimeMinutes}`;
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
      outTime = `${outTimeHours}:${outTimeMinutes}`;
    }

    try {
      setClockInTime(inTime);
      setClockOutTime(outTime);

      await api.put(`/attendance/maintenance/${props.record.id}`, {
        attendanceId: props.record.id,
        clockInTime: inTime,
        clockOutTime: outTime,
        breakMinutes: breakMinutes,
      });
      setAlert({ type: "success", message: "勤怠が修正されました" });
    } catch (error) {
      setAlert({ type: "danger", message: "勤怠の修正に失敗しました" });
    }
    setShowModal(true);
    setEditRecordId(null);
    props.callback();
  };

  const handleEditClick = (id: string) => {
    setEditRecordId(id);
  };

  const handleClockInTimeChange = (value: number) => {
    setClockInTime(value.toString());
  };

  const handleClockOutTimeChange = (value: number) => {
    setClockOutTime(value.toString());
  };

  const handleBreakMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.match(/^[0-9]+$/)) {
      setBreakMinutes(parseInt(value));
    }
  };

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
                <TimePicker
                  value={clockOutTime}
                  step={1}
                  format={24}
                  onChange={handleClockOutTimeChange}
                />
              </td>
              <td className="align-middle">
                <input
                  type="number"
                  value={breakMinutes}
                  onChange={handleBreakMinutes}
                />
              </td>
              <td className="align-middle">
                <span>
                  <div className="d-inline-block">
                    {props.record && startEndGap}
                    <button
                      className="btn btn-primary mx-3 d-inline-block"
                      onClick={handleSaveClick}
                    >
                      保存
                    </button>
                  </div>
                </span>
              </td>
            </>
          ) : props.record.clockInTime ? (
            <>
              <td className="align-middle">{clockInTime}</td>
              <td className="align-middle">{clockOutTime}</td>
              <td className="align-middle">{breakMinutes}</td>
              <td className="align-middle">
                <span>
                  <div className="d-inline-block">
                    {props.record && startEndGap}
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
                  </div>
                </span>
              </td>
            </>
          ) : (
            <>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </>
          )}
        </>
      ) : (
        <>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
        </>
      )}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
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
            }}
          >
            閉じる
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
