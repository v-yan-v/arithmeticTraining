import React, {useEffect, useState} from 'react';
import {Settings} from "./components/Settings/Settings";
import {ProblemsViewer} from "./components/ProblemsViewer/ProblemsViewer";
import './App.scss'
import {defaultAppSettings} from "./constantsAndDefaults";
import {isAppVersionLess} from "./utils/isAppVersionLess";

function App() {

  let [localAppSettings, setLocalAppSettings] = useState(JSON.parse(localStorage.getItem('simple-math-problems-settings')) || defaultAppSettings )

  if (!localAppSettings.appVersion || isAppVersionLess(localAppSettings.appVersion, defaultAppSettings.appVersion) ) {
    setLocalAppSettings(defaultAppSettings)
  }

  useEffect(()=>{
    localStorage.setItem('simple-math-problems-settings', JSON.stringify(localAppSettings))
    }, [localAppSettings])


  let currentColorTheme = localAppSettings.isColorThemeDark ? 'bg-dark text-info' : 'bg-light text-dark'

  return (
    <div className={'container' + ' ' + currentColorTheme}>
      <Settings localAppSettings={localAppSettings} setLocalAppSettings={setLocalAppSettings} />
      <ProblemsViewer localAppSettings={localAppSettings} />
    </div>
  );
}

export default App;
