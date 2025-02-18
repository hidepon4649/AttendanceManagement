import React from "react";
import IconButton from "@mui/material/IconButton";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

interface MonthNavigationProps {
  targetMonth: string;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}
const MonthNavigation: React.FC<MonthNavigationProps> = ({
  targetMonth,
  handlePrevMonth,
  handleNextMonth,
}) => (
  <h3 className="d-inline-flex align-items-center">
    <IconButton
      aria-label="prev month"
      name="prevMonth"
      onClick={handlePrevMonth}
    >
      <NavigateBeforeIcon />
    </IconButton>
    {targetMonth}
    <IconButton
      aria-label="next month"
      name="nextMonth"
      onClick={handleNextMonth}
    >
      <NavigateNextIcon />
    </IconButton>
  </h3>
);

export default MonthNavigation;
