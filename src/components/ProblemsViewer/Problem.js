import React, {useEffect, useState} from "react";
import s from './Problem.module.sass'
import cn from "../../utils/classNamesConcatenator";


export const Problem = ({localAppSettings, classList, problem, checkAnswer}) => {

  /// STYLES ///
  let currentColorTheme = localAppSettings.isColorThemeDark ? 'bg-dark text-info' : 'bg-light text-dark'

  /// VARIABLES ///
  const [answerFieldValue, setAnswerFieldValue] = useState('')

  const answerField = (
      <input
        type={'text'}
        inputMode='decimal'
        className={cn(s.answerField, currentColorTheme)}
        pattern={checkAnswer ? `^${problem.answer.toString().replace('.', '[.,]')}$` : null}
        value={answerFieldValue}
        onChange={(e)=>{ setAnswerFieldValue(e.target.value) }}
      />)

  useEffect(() => {
    // clear input value when receive new problem
    setAnswerFieldValue('')
  }, [problem.answer])


  /// PAYLOAD ///
  return (
    <div className={classList} >
      <label className={s.answerLine}>
        <span>{problem.problem}</span>
        <span className={localAppSettings.showAnswerOnHover ? s.showRightAnswer : s.rightAnswer} >{problem.answer}</span>
        {localAppSettings.inputsForTestAnswer ? answerField : ''}
      </label>
    </div>
  )
}