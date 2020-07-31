import React, {useEffect, useState} from 'react';
import {Settings} from "./components/Settings/Settings";
import {ProblemsViewer} from "./components/ProblemsViewer/ProblemsViewer";
import './App.scss'
import {defaultAppSettings} from "./constantsAndDefaults";

function App() {

  let [localAppSettings, setLocalAppSettings] = useState(JSON.parse(localStorage.getItem('simple-math-problems-settings')) || defaultAppSettings )

  useEffect(()=>{
    localStorage.setItem('simple-math-problems-settings', JSON.stringify(localAppSettings))
    }, [localAppSettings])

  return (
    <div className='container'>
      <Settings localAppSettings={localAppSettings} setLocalAppSettings={setLocalAppSettings} />
      <ProblemsViewer localAppSettings={localAppSettings} />
    </div>
  );
}

export default App;
