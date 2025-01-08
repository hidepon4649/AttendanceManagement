import React from "react";
import Button from "@mui/material/Button";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import jsPDF from "jspdf";
import "jspdf-autotable";
import NotoSansJP from "../fonts/NotoSansJP-Regular-base64.js";
import {
  formatShortTime,
  getYoubi,
  getDefaultRecords,
  getYearMonthForPrint,
} from "../utils/dateTimeUtils.js";
import { Attendance } from "../models/Attendance.js";

interface OutputReportButtonProps {
  employeeId: number;
  targetMonth: string;
  attendanceRecords: Attendance[];
}
const OutputReportButton: React.FC<OutputReportButtonProps> = ({
  employeeId,
  targetMonth,
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

        const dates = getDefaultRecords(targetMonth);
        let employeeName: string = "";

        {
          dates.map((date) => {
            const record: Attendance | null = attendanceRecords.length
              ? attendanceRecords.find((record) => record.date === date) || null
              : null;
            const row = [
              // record ? record.id : "",
              date + " " + getYoubi(date),
              record ? formatShortTime(record.clockInTime) : "",
              record ? formatShortTime(record.clockOutTime) : "",
              record ? record.remarks || "" : "",
            ];

            if (!employeeName && record) {
              employeeName = record.employeeName;
            }
            tableRows.push(row);
          });
        }

        doc.autoTable({
          head: [tableColumn],
          body: tableRows,
          startY: 20,
          styles: { font: "NotoSansJP" },
          // didDrawCell: (data: any) => {
          //   if (data.column.index === 0) {
          //     // 日付と曜日の列
          //     const cellText = data.cell.raw;
          //     const youbi = cellText.slice(-1); // 最後の文字を取得（曜日）
          //     let textColor: [number, number, number] | null = null;

          //     if (youbi === "土") {
          //       textColor = [0, 0, 255]; // 青色
          //     } else if (youbi === "日") {
          //       textColor = [255, 0, 0]; // 赤色
          //     }

          //     if (textColor) {
          //       const textParts = cellText.split(youbi);
          //       doc.text(textParts[0], data.cell.x + 2, data.cell.y + 10); // 日付部分を描画
          //       doc.setTextColor(...textColor); // 色を設定
          //       doc.text(
          //         youbi,
          //         data.cell.x + 2 + doc.getTextWidth(textParts[0]),
          //         data.cell.y + 10
          //       ); // 曜日部分を描画
          //       doc.setTextColor(0, 0, 0); // 色を元に戻す
          //     } else {
          //       doc.text(cellText, data.cell.x + 2, data.cell.y + 10); // 通常のテキスト描画
          //     }
          //   }
          // },
        });

        const pageWidth = doc.internal.pageSize.width;
        const textWidth = doc.getTextWidth(`${employeeName} 様`);

        doc.text(`${getYearMonthForPrint(targetMonth)} 勤怠表`, 14, 15);
        doc.text(`${employeeName} 様`, pageWidth - textWidth - 14, 15); // 右寄せの計算
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
