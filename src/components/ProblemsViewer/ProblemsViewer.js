import React from "react";

export const ProblemsViewer = ({localAppSettings}) => {
  return (
    <div>
      PROBLEMS LIST
      <p className={'bg-' + localAppSettings.isColorThemeDark ? 'dark' : 'light'}>Color Theme is ${localAppSettings.currentColorTheme}</p>
    </div>
  )
}