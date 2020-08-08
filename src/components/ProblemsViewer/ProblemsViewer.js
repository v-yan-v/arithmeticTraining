import React from "react";
import {Problem} from "./Problem";
import s from './ProblemsViewer.module.sass'

export const ProblemsViewer = ({localAppSettings}) => {

  let quantity = parseInt(localAppSettings.numberOfProblemsPerPage)

  let problemsList = new Array(quantity).fill('_')


  return (
    <div className={s.flexContainer} style={{fontSize: (localAppSettings.problemsTextSize * 0.2 + 1) + 'em'}}>
      { problemsList.map((_, i) => {
        return <Problem key={i} localAppSettings={localAppSettings} classList={s.flexItem} />
      }) }
    </div>
  )
}