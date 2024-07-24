'use client'
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Birthdate.module.css'; // Import CSS module for local styling

const Birthdate = ({ selectedDate, onChange } : {selectedDate:any, onChange: (term: string) => void;}) => {
  const [startDate, setStartDate] = useState(selectedDate || null);

  const handleDateChange = (date:any) => {
    setStartDate(date);
    onChange(date);
  };

  return (
    <div className={styles.datePickerContainer}>
      <DatePicker
        selected={startDate}
        onChange={handleDateChange}
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={50}
        dateFormat="dd/MM/yyyy"
        maxDate={new Date()}
        placeholderText="Select a date"
        className={`${styles.datePicker} pl-3 text-left font-normal w-full`} // Apply additional class for styling
      />
    </div>
  );
};

export default Birthdate;
