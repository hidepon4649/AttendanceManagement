import React, { useState } from "react";
import TimePicker from "react-bootstrap-time-picker";
import { formatTime, formatShortTime } from "../utils/formatTimeUtils";
import { Attendance } from "../models/Attendance";

interface ClockInOutEditSaveProps {
  isAdmin: boolean;
  record: Attendance | null;
}

export const ClockInOutEditSave = (props: ClockInOutEditSaveProps) => {
  const [editRecordId, setEditRecordId] = useState<string | null>(null);
  const [clockInTime, setClockInTime] = useState<string | null>(null);
  const [clockOutTime, setClockOutTime] = useState<string | null>(null);

  const handleSaveClick = () => {
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
    </>
  );
};
