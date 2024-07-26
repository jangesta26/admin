'use client'
import React, { useState } from 'react';
import { DayPicker } from "react-day-picker";
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Birthdate.module.css';
import classNames from "react-day-picker/style.module.css";

const Birthdate = ({ selected } : {selected:any}) => {

  return (
      <DayPicker
       classNames={classNames}
        mode="single"
        selected={selected}
        onSelect={selected.onChange}
        captionLayout='dropdown'
        footer={
          selected ? `Selected: ${selected.toLocaleDateString()}` : "Pick a day."
        }
      />
  );
};

export default Birthdate;
