const { Popover, Button, TextField } = require("@mui/material");
const { useState, useEffect } = require("react");
const { DayPicker } = require("react-day-picker");
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import dayjs from "dayjs";
import "react-day-picker/dist/style.css";

const DatePicker = ({
  placeholder = "",
  disabled = false,
  value = "",
  handleValue = () => {},
}) => {
  const [showDatePicker, setShowDatePicker] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [dateText, setDateText] = useState("");

  useEffect(() => {
    setDateText(value);
  }, []);

  useEffect(() => {
    handleValue(dateText);
  }, [dateText]);

  const handleShowDatePicker = e => {
    if (showDatePicker) {
      setShowDatePicker(null);
    } else {
      setShowDatePicker(e?.currentTarget);
    }
  };

  const handleDateSelect = val => {
    if (!val) return;
    setSelectedDay(val);
    setShowDatePicker(null);
    const newDate = dayjs(val);
    setDateText(newDate.format("DD/MM/YYYY"));
  };
  return (
    <>
      <TextField
        id="text-name"
        placeholder={placeholder}
        size="small"
        onClick={e => !disabled && handleShowDatePicker(e)}
        value={dateText}
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <CalendarMonthOutlinedIcon className="cursor-pointer" />
          ),
        }}
      />
      <Popover
        id={showDatePicker ? "simple-popover" : undefined}
        open={Boolean(showDatePicker)}
        anchorEl={showDatePicker}
        onClose={() => setShowDatePicker(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ zIndex: 10001 }}
      >
        <DayPicker
          mode="single"
          styles={{
            caption: { color: "red" },
          }}
          defaultMonth={new Date()}
          selected={selectedDay}
          onSelect={handleDateSelect}
          captionLayout="dropdown"
          fromYear={dayjs().year() - 100}
          toYear={dayjs().year()}
          today={new Date()}
        />
      </Popover>
    </>
  );
};

export default DatePicker;
