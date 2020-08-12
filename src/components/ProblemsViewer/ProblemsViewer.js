import React, {useEffect, useState} from "react";
import {Problem} from "./Problem";
import s from './ProblemsViewer.module.sass'
import {problemsGenerator} from "./problemsGenerator";
import cn from "../../utils/classNamesConcatenator";

export const ProblemsViewer = ({localAppSettings}) => {

  /// STYLES ///
  let btnColorTheme = localAppSettings.isColorThemeDark ? 'btn-outline-info' : 'btn-outline-secondary'

  /// VARIABLES ///
  let problemsOptions = {
    quantity             : parseInt(localAppSettings.numberOfProblemsPerPage)
    , minOperandValue    : localAppSettings.minOperandValue
    , maxOperandValue    : localAppSettings.maxOperandValue
    , useDecimalFractions: localAppSettings.useDecimalFractions
    , useCommonFractions : localAppSettings.useCommonFractions
    , useOperations      : localAppSettings.useOperations
  }

  let [checkAnswer, toggleChekAnswer] = useState(false)
  let [problemsList, genProblemsList] = useState(problemsGenerator(problemsOptions))

  useEffect(() => {
    genProblemsList(problemsGenerator(problemsOptions))
  }, [localAppSettings])

  /// HANDLERS ///
  const handleNewProblemsClick = () => {
    genProblemsList(problemsGenerator(problemsOptions))
    toggleChekAnswer(false)
  }

  /// PAYLOAD ///
  return (
    <div>
        <form className={s.flexContainer} style={{fontSize: (localAppSettings.problemsTextSize * 0.2 + 1) + 'em'}}>
          {problemsList.map((problem, i) => {
            return <Problem key={i} checkAnswer={checkAnswer} problem={problem} localAppSettings={localAppSettings} classList={s.flexItem}/>
            })
          }
      </form>
      <div className={s.flexContainer}>
        <button onClick={handleNewProblemsClick} className={cn('btn', btnColorTheme)}>Новые примеры</button>
        {localAppSettings.inputsForTestAnswer ?
          <button onClick={() => { toggleChekAnswer(!checkAnswer) }} className={cn('btn', btnColorTheme)}>
            {checkAnswer ? 'Не показывать' : 'Показать'} не правильные
          </button>
          : ''
        }
      </div>
    </div>
  )
}