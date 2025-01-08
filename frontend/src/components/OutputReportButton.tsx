import React from "react";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import jsPDF from "jspdf";
import "jspdf-autotable";
import NotoSansJP from "../fonts/NotoSansJP-Regular-base64.js";
import { formatShortTime, getYoubi } from "../utils/dateTimeUtils.js";
import { Attendance } from "../models/Attendance.js";

interface OutputReportButtonProps {
  employeeId: number;
  attendanceRecords: Attendance[];
}
const OutputReportButton: React.FC<OutputReportButtonProps> = ({
  employeeId,
  attendanceRecords,
}) => {
  const handleOutputReport = async () => {
    if (employeeId) {
      try {
        const doc = new jsPDF();

        // フォントの追加
        doc.addFileToVFS("NotoSansJP-Regular.ttf", NotoSansJP);
        doc.addFont("NotoSansJP-Regular.ttf", "NotoSansJP", "normal");
        doc.setFont("NotoSansJP");

        const tableColumn = ["ID", "日付", "出勤時間", "退勤時間", "備考"];
        const tableRows: any = [];
        let isFirstRecord = true;

        attendanceRecords.forEach((json, index) => {
          const { id, date, clockInTime, clockOutTime, remarks } = json;
          const row = [
            id,
            date + " " + getYoubi(date),
            formatShortTime(clockInTime),
            formatShortTime(clockOutTime),
            remarks || "",
          ];
          tableRows.push(row);
        });

        doc.autoTable({
          head: isFirstRecord ? [tableColumn] : undefined, // 1レコード目だけヘッダを出力
          body: tableRows,
          startY: 20,
          styles: { font: "NotoSansJP" },
        });
        isFirstRecord = false;

        doc.text("Attendance Report", 14, 15);
        const pdfBlob = doc.output("blob");

        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "report.pdf";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        console.log("output report success");
      } catch (error) {
        console.error("output report failed:", error);
      }
    }
  };

  return (
    <>
      <Button
        className="btn btn-info mx-5"
        size="large"
        onClick={handleOutputReport}
        variant="outlined"
        startIcon={<CalendarMonthIcon />}
      >
        帳票出力
      </Button>
    </>
  );
};

export default OutputReportButton;
