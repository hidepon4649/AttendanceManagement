import React from 'react';
import Button from '@mui/material/Button';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import NotoSansJP from '../fonts/NotoSansJP-Regular-base64.js';
import {
  formatShortTime,
  getYoubi,
  getDefaultRecords,
  getYearMonthForPrint,
  getStartEndGap,
  minutesToHHMM,
} from '../utils/dateTimeUtils.js';
import { Attendance } from '../models/Attendance.js';

interface OutputReportButtonProps {
  employeeId: number;
  targetMonth: string;
  attendanceRecords: Attendance[];
  totalMinutes: number;
}
const OutputReportButton = (props: OutputReportButtonProps) => {
  const { employeeId, targetMonth, attendanceRecords, totalMinutes } = props;
  const handleOutputReport = async () => {
    if (employeeId) {
      try {
        const doc = new jsPDF();

        // フォントの追加
        doc.addFileToVFS('NotoSansJP-Regular.ttf', NotoSansJP);
        doc.addFont('NotoSansJP-Regular.ttf', 'NotoSansJP', 'normal');
        doc.setFont('NotoSansJP');

        const tableColumn = [
          '日付',
          '出勤時間',
          '退勤時間',
          '休憩(分)',
          '作業時間',
          '備考',
        ];
        const tableRows: (string | number)[][] = [];

        const dates = getDefaultRecords(targetMonth);
        let employeeName: string = '';

        {
          dates.map((date) => {
            const record: Attendance | null = attendanceRecords.length
              ? attendanceRecords.find((record) => record.date === date) || null
              : null;
            const row = [
              date + ' ' + getYoubi(date),
              record ? formatShortTime(record.clockInTime) : '',
              record ? formatShortTime(record.clockOutTime) : '',
              record ? record.breakMinutes : '',
              record
                ? getStartEndGap(
                    record.clockInTime,
                    record.clockOutTime,
                    record.breakMinutes
                  ).hhmm
                : '',
              record ? record.remarks || '' : '',
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
          styles: { font: 'NotoSansJP' },
        });

        const pageWidth = doc.internal.pageSize.width;

        const titleText = `${getYearMonthForPrint(
          targetMonth
        )} 勤怠表　${employeeName} 様`;
        const timeText = `当月作業時間の合計: ${minutesToHHMM(totalMinutes)}`;

        const w1 = doc.getTextWidth(titleText);

        doc.text(titleText, 14, 15);
        doc.text(
          timeText,
          pageWidth - w1, // 右寄せ計算
          15
        );

        const pdfBlob = doc.output('blob');

        const url = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'report.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        console.log(`output report success`);
      } catch (error) {
        console.error('output report failed:', error);
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
