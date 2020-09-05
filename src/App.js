import React, {useEffect, useState} from 'react';
import {Settings} from "./components/Settings/Settings";
import {ProblemsViewer} from "./components/ProblemsViewer/ProblemsViewer";
import './App.scss'
import {defaultAppSettings} from "./constantsAndDefaults";
import {isAppVersionLess} from "./utils/isAppVersionLess";
import CyrillicNumbersKeyboard from "./components/Keyboard/CyrillicNumbersKeyboard";

function App() {

  let [localAppSettings, setLocalAppSettings] = useState(JSON.parse(localStorage.getItem('simple-math-problems-settings')) || defaultAppSettings )

  if (!localAppSettings.appVersion || isAppVersionLess(localAppSettings.appVersion, defaultAppSettings.appVersion) ) {
    setLocalAppSettings(defaultAppSettings)
  }

  useEffect(()=>{
    localStorage.setItem('simple-math-problems-settings', JSON.stringify(localAppSettings))
    }, [localAppSettings])


  let currentColorTheme = localAppSettings.isColorThemeDark ? 'bg-dark text-info' : 'bg-light text-dark'

  // on screen keyboard
  const [OSK, setOSK] = useState({showOSK: false, inputNode: null})

  function handleClick(evt) {
    if (!evt.target.closest('.keyboard') && evt.target.tagName !== 'INPUT'){
      setOSK({showOSK: false, inputNode: null})
    }
  }

  return (
    <div className={'container' + ' ' + currentColorTheme}
      onClick={handleClick}
    >
      <Settings localAppSettings={localAppSettings} setLocalAppSettings={setLocalAppSettings} />
      <ProblemsViewer localAppSettings={localAppSettings} setOSK={setOSK} />
      { localAppSettings.displayNumbersInCyrillicNotation
        && OSK.showOSK
        && <CyrillicNumbersKeyboard inputNode={OSK.inputNode}  isCyrillicNumbers={true} /> }
    </div>
  );
}

export default App;
