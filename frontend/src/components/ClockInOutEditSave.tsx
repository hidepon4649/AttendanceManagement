import React, { useState, useEffect } from "react";
import {
  formatShortTime,
  padFrontZero,
  getStartEndGap,
} from "../utils/dateTimeUtils";
import { Attendance } from "../models/Attendance";
import api from "../services/api";
import { Alert, Modal, Button } from "react-bootstrap";
import useLoginUserContext from "src/hooks/useLoginUserContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { formatDBStyle } from "src/utils/formatTimeUtils";
interface ClockInOutEditSaveProps {
  record: Attendance | null;
  callback: () => void;
  setTotalMinutes: (update: (preTotalMinutes: number) => number) => void;
  addRecord: () => void;
}

export const ClockInOutEditSave = (props: ClockInOutEditSaveProps) => {
  const { record, callback, setTotalMinutes, addRecord } = props;
  const { isAdmin } = useLoginUserContext();

  const [editRecordId, setEditRecordId] = useState<string | null>(null);
  const [clockInTime, setClockInTime] = useState(record?.clockInTime || "");
  const [clockOutTime, setClockOutTime] = useState(record?.clockOutTime || "");
  const [breakMinutes, setBreakMinutes] = useState(record?.breakMinutes || 0);

  const [startEndGap, setStartEndGap] = useState("");

  useEffect(() => {
    if (record) {
      setClockInTime(record.clockInTime);
      setClockOutTime(record.clockOutTime);
      setBreakMinutes(record.breakMinutes);

      const { hhmm, minutes } = getStartEndGap(
        record.clockInTime,
        record.clockOutTime,
        record.breakMinutes
      );
      setStartEndGap(hhmm);
      setTotalMinutes(
        (preTotalMinutes: number) => (preTotalMinutes += minutes)
      );
    }
  }, [record]);

  const [showModal, setShowModal] = useState(false);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  const handleSaveClick = async () => {
    if (!record) return;

    try {
      await api.put(`/attendance/maintenance/${record.id}`, {
        attendanceId: record.id,
        clockInTime: clockInTime || record.clockInTime,
        clockOutTime: clockOutTime || record.clockOutTime,
        breakMinutes: breakMinutes || record.breakMinutes,
      });
      setAlert({ type: "success", message: "勤怠が修正されました" });
    } catch (error) {
      setAlert({ type: "danger", message: "勤怠の修正に失敗しました" });
    }
    refresh();
  };
  const handleAddClick = async () => {
    try {
      await addRecord();
      setAlert({ type: "success", message: "勤怠が追加されました" });
    } catch (error) {
      setAlert({ type: "danger", message: "勤怠の追加に失敗しました" });
    }
    refresh();
  };
  const handleEditClick = (id: string) => {
    setEditRecordId(id);
  };
  const handleDeleteClick = async () => {
    if (!record) return;

    try {
      await api.delete(`/attendance/maintenance/${record.id}`);
      setAlert({ type: "success", message: "勤怠が削除されました" });
    } catch (error) {
      setAlert({ type: "danger", message: "勤怠の削除に失敗しました" });
    }
    refresh();
  };
  const refresh = () => {
    setShowModal(true);
    setEditRecordId(null);
    callback();
  };

  const handleClockInTimeChange = (value: any) => {
    console.log("in value:", value);
    setClockInTime(() => formatDBStyle(value));
  };

  const handleClockOutTimeChange = (value: any) => {
    console.log("out value:", value);
    setClockOutTime(() => formatDBStyle(value));
  };

  const handleBreakMinutes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBreakMinutes(parseInt(value));
  };

  return (
    <>
      {record ? (
        <>
          {editRecordId === record.id.toString() ? (
            <>
              <td className="align-middle p-0 m-0" style={{ width: "110px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    ampm={false}
                    timeSteps={{ hours: 1, minutes: 1 }}
                    value={dayjs(clockInTime)}
                    onChange={handleClockInTimeChange}
                  />
                </LocalizationProvider>
              </td>
              <td className="align-middle p-0 m-0" style={{ width: "110px" }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    ampm={false}
                    timeSteps={{ hours: 1, minutes: 1 }}
                    value={dayjs(clockOutTime)}
                    onChange={handleClockOutTimeChange}
                  />
                </LocalizationProvider>
              </td>
              <td className="align-middle p-0 m-0" style={{ width: "80px" }}>
                <input
                  type="number"
                  className="form-control"
                  value={breakMinutes}
                  onChange={handleBreakMinutes}
                />
              </td>
              <td className="align-middle">
                <span>
                  <div className="d-inline-block">{record && startEndGap}</div>
                </span>
              </td>
              <td className="align-middle text-end">
                <span>
                  <div className="d-inline-block">
                    <button
                      className="btn btn-primary mx-3 d-inline-block"
                      onClick={handleSaveClick}
                    >
                      保存
                    </button>
                    <button
                      className="btn btn-danger d-inline-block"
                      onClick={handleDeleteClick}
                    >
                      削除
                    </button>
                  </div>
                </span>
              </td>
            </>
          ) : (
            record.clockInTime && (
              <>
                <td className="align-middle">
                  {formatShortTime(record.clockInTime)}
                </td>
                <td className="align-middle">
                  {formatShortTime(record.clockOutTime)}
                </td>
                <td className="align-middle">{record.breakMinutes}</td>
                <td className="align-middle">
                  <span>
                    <div className="d-inline-block">
                      {record && startEndGap}
                    </div>
                  </span>
                </td>
                <td className="align-middle text-end">
                  <span>
                    <div className="d-inline-block">
                      {isAdmin && (
                        <>
                          <button
                            className="btn btn-secondary mx-3"
                            onClick={() =>
                              record && handleEditClick(record.id.toString())
                            }
                          >
                            修正
                          </button>
                        </>
                      )}
                    </div>
                  </span>
                </td>
              </>
            )
          )}
        </>
      ) : (
        <>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td>-</td>
          <td className="align-middle text-end">
            <span>
              <div className="d-inline-block">
                {isAdmin && (
                  <>
                    <button
                      className="btn btn-primary mx-3"
                      onClick={() => handleAddClick()}
                    >
                      追加
                    </button>
                  </>
                )}
              </div>
            </span>
          </td>
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
