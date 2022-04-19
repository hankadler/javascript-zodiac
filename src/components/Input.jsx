import { getSign as getWesternZodiac, getZodiac as getChineseZodiac } from 'horoscope/src';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

import styles from './Input.module.css';

const adjustedChineseZodiacs = {
  goat: 'Sheep',
  pig: 'Boar',
};

function Input({
  zodiacTypes, zodiacType, setZodiacType, setZodiac,
}) {
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [day, setDay] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);

  const onChangeDate = (event) => {
    const { value } = event.target;
    if (!value) {
      setZodiac(null);
      setSubmitDisabled(true);
      setDay(null);
      setMonth(null);
      setYear(null);
    } else {
      setSubmitDisabled(false);
      const [yyyy, mm, dd] = value.split('-');
      setDay(parseInt(dd, 10));
      setMonth(parseInt(mm, 10));
      setYear(parseInt(yyyy, 10));
    }
  };

  const onKeyPressDate = (event) => {
    if (event.key === 'Enter') {
      document.getElementById('submit').click();
    }
  };

  const onChangeZodiacType = (event) => {
    setZodiac(null);
    setZodiacType(event.target.value);
    if (day && month && year) {
      setSubmitDisabled(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    console.log({
      day, month, year, zodiacType,
    });
    switch (zodiacType) {
      case 'Western':
        setZodiac(getWesternZodiac({ day, month }));
        break;
      case 'Chinese':
        // eslint-disable-next-line no-case-declarations
        let value = getChineseZodiac(year);
        if (Object.keys(adjustedChineseZodiacs).includes(value.toLowerCase())) {
          value = adjustedChineseZodiacs[value.toLowerCase()];
        }
        setZodiac(value);
        break;
      default:
        console.log('ERROR: Somehow invalid $zodiacType entered!');
        return;
    }
    setSubmitDisabled(true);
  };

  return (
    <form className={styles.comp} onSubmit={onSubmit}>
      <h1>Zodiac Calculator</h1>
      <fieldset>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="birthdate">Birthdate:</label>
        <input
          id="birthdate"
          type="date"
          onChange={onChangeDate}
          onKeyPress={onKeyPressDate}
        />
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="zodiacType">Type:</label>
        <select
          name="zodiacType"
          id="zodiacType"
          value={zodiacType}
          onChange={onChangeZodiacType}
        >
          {/* eslint-disable-next-line react/no-array-index-key */}
          {zodiacTypes.map((value, index) => <option key={index} value={value}>{value}</option>)}
        </select>
      </fieldset>
      <button id="submit" type="submit" disabled={submitDisabled}>Submit</button>
    </form>
  );
}

Input.propTypes = {
  zodiacTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  zodiacType: PropTypes.string.isRequired,
  setZodiacType: PropTypes.func.isRequired,
  setZodiac: PropTypes.func.isRequired,
};

export default Input;
