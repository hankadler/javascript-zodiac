import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';

import 'animate.css';
import styles from './Output.module.css';
import westernZodiacPng from '../assets/western-zodiac-500x500.png';
import chineseZodiacPng from '../assets/chinese-zodiac-500x500.png';

const zodiacImages = {
  western: westernZodiacPng,
  chinese: chineseZodiacPng,
};

const rots = {
  western: {
    default: '30deg',
    aquarius: '45deg',
    pisces: '75deg',
    aries: '105deg',
    taurus: '135deg',
    gemini: '165deg',
    cancer: '195deg',
    capricorn: '15deg',
    sagittarius: '-15deg',
    scorpio: '-45deg',
    libra: '-75deg',
    virgo: '-105deg',
    leo: '-135deg',
  },
  chinese: {
    default: '135deg',
    dog: '150deg',
    rooster: '180deg',
    monkey: '210deg',
    sheep: '240deg',
    horse: '270deg',
    boar: '120deg',
    rat: '90deg',
    ox: '60deg',
    tiger: '30deg',
    rabbit: '0deg',
    dragon: '-30deg',
    snake: '-60deg',
  },
};

function Output({ zodiacType, zodiac }) {
  const anim = `animate__animated animate__heartBeat ${styles.resultSpan}`;

  const [zodiacImgSrc] = useState(zodiacImages[zodiacType.toLowerCase()]);
  const [rot, setRot] = useState(rots[zodiacType.toLowerCase()].default);
  const [result, setResult] = useState(null);

  // Rotate img
  useEffect(() => {
    const k0 = zodiacType.toLowerCase();
    const k1 = zodiac ? zodiac.toLowerCase() : 'default';
    const rotValue = rots[k0][k1];
    // console.log("Rotation:", value)
    setResult(null);
    setTimeout(() => setResult(<span id="anim" className={anim}>{zodiac}</span>), 0);
    setRot(rotValue);
  }, [zodiacType, zodiac]);

  return (
    <div className={styles.comp}>
      <p className={styles.resultParagraph}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label className={styles.resultLabel} htmlFor="anim">Result:</label>
        {result}
      </p>
      <img
        id="resultImg"
        className={styles.resultImg}
        src={zodiacImgSrc}
        alt="zodiac"
        width={500}
        height={500}
        style={{ transform: `rotate(${rot})` }}
      />
    </div>
  );
}

Output.propTypes = {
  zodiacType: PropTypes.string.isRequired,
  zodiac: PropTypes.string.isRequired,
};

export default Output;
