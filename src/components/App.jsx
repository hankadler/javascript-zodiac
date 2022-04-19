import React, { useState } from 'react';

import styles from './App.module.css';
import Input from './Input';
import Output from './Output';

const zodiacTypes = ['Western', 'Chinese'];

function App() {
  const [zodiacType, setZodiacType] = useState(zodiacTypes[0]);
  const [zodiac, setZodiac] = useState('');

  return (
    <div className={styles.comp}>
      <Input
        zodiacTypes={zodiacTypes}
        zodiacType={zodiacType}
        setZodiacType={setZodiacType}
        setZodiac={setZodiac}
      />
      {zodiac ? <Output zodiacType={zodiacType} zodiac={zodiac} /> : null}
    </div>
  );
}

export default App;
