import React from 'react';
import DatePicker from 'react-datepicker';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface DatePickerWithTitleProps {
  title: string;
  selected: Date | null;
  onChange: (date: Date | null) => void;
  startDate?: Date;
  endDate: Date;
  placeholderText: string;
}

const DatePickerWithTitle: React.FC<DatePickerWithTitleProps> = ({
  title,
  selected,
  onChange,
  startDate,
  endDate,
  placeholderText,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
      <h4 style={{ marginRight: '4px', minWidth: '90px', textAlign: 'end'}}>{title}</h4>
      <DatePicker
        selected={selected}
        onChange={onChange}
        startDate={startDate}
        showYearDropdown
        endDate={endDate}
        placeholderText={placeholderText}
        selectsStart
        dateFormat="MMMM d, yyyy"
        popperPlacement="bottom-start"
        renderCustomHeader={({
        date,
        changeYear,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
        }) => {
        const currentYear = new Date().getFullYear();
        const years = Array.from(
        { length: currentYear - 2015 + 1 },
        (_, i) => 2015 + i
        );

        const month = date.toLocaleString('default', { month: 'long' });
        
        return (
        <div className="flex items-center justify-center gap-3 px-2 py-1">
        <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            aria-label="Previous month"
            className="p-1 hover:bg-gray-200 rounded"
            style={{ marginRight: 8 }}
            ><FaArrowLeft size={16}/>
        </button>

        <span className="mx-2 font-medium" style={{ marginRight: 6 }}>{month} </span>

        <select
            value={date.getFullYear()}
            onChange={({ target: { value } }) => changeYear(Number(value))}
            className="border rounded px-2 py-1"
            style={{ marginRight: 8 }}
        >
            {years.map((year) => (
            <option key={year} value={year}>
                {year}
            </option>
            ))}
        </select>

        <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            aria-label="Next month"
            className="p-1 hover:bg-gray-200 rounded"
        >
            <FaArrowRight size={16} />
        </button>
        </div> );
        }}
      />
    </div>
  );
};

export default DatePickerWithTitle;