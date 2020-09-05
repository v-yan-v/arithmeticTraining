import React, {useEffect, useState} from "react";
import {Problem} from "./Problem";
import s from './ProblemsViewer.module.sass'
import {problemsGenerator} from "./problemsGenerator";
import cn from "../../utils/classNamesConcatenator";

export const ProblemsViewer = ({localAppSettings, setOSK}) => {

  /// STYLES ///
  let btnColorTheme = localAppSettings.isColorThemeDark ? 'btn-outline-info' : 'btn-outline-secondary'

  /// VARIABLES ///
  let problemsOptions = {
    quantity             : parseInt(localAppSettings.numberOfProblemsPerPage)
    , minOperandValue    : localAppSettings.minOperandValue
    , maxOperandValue    : localAppSettings.maxOperandValue
    , useDecimalFractions: localAppSettings.useDecimalFractions
    , useCommonFractions : localAppSettings.useCommonFractions
    , useOperations      :
    {
        useAddition      : localAppSettings.useAddition
      , useSubtraction   : localAppSettings.useSubtraction
      , useMultiplication: localAppSettings.useMultiplication
      , useDivision      : localAppSettings.useDivision
    }
    , inCyrillicNotation : localAppSettings.displayNumbersInCyrillicNotation
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
    <div style={{fontSize: (localAppSettings.problemsTextSize * 0.2 + 1) + 'em'}}>
        <form className={s.flexContainer} >
          {problemsList.map((problem, i) => {
            return <Problem key={i} checkAnswer={checkAnswer} problem={problem} localAppSettings={localAppSettings} classList={s.flexItem}  setOSK={setOSK}/>
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