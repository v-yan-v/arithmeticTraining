import React from "react";
import s from './Problem.module.sass'
import cn from "../../utils/classNamesConcatenator";


export const Problem = ({localAppSettings, classList}) => {

  /// STYLES ///
  let currentColorTheme = localAppSettings.isColorThemeDark ? 'bg-dark text-info' : 'bg-light text-dark'

  /// SECONDARY FUNCTIONS ///
  const getRandomIntInclusive = (min, max) => {

    if (min > max) {
      [min, max] = [max, min] // swap values
    }

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
  }

  const getRandomNumber = (min, max) => {

    if (min > max) {
      [min, max] = [max, min] // swap values
    }

    return Math.random() * (max - min) + min
  }

  const newOperand = () => {
    let operand = 1
    if (localAppSettings.useDecimalFractions && !localAppSettings.useCommonFractions) {
      operand =  getRandomNumber(localAppSettings.minOperandValue, localAppSettings.maxOperandValue)
    }
    else if (!localAppSettings.useDecimalFractions && localAppSettings.useCommonFractions){

    }
    else if (localAppSettings.useDecimalFractions && localAppSettings.useCommonFractions) {

    }
    else {
      operand =  getRandomIntInclusive(localAppSettings.minOperandValue, localAppSettings.maxOperandValue)
    }

    operand = +(operand.toFixed(3).replace(/\.?0+$/, ''))

    return operand
  }

  const generateProblem = () => {
    const operations = Object.keys(localAppSettings.useOperations).map(key => localAppSettings.useOperations[key])

    const getRandomOperation = () => {
      if (operations.filter(el => el).length < 1) {
        return 'NoEnabledOperations'
      }

      let index

      while (1) {
        index = getRandomIntInclusive(0, operations.length - 1)
        if (operations[index]) {
          return index
        }
      }
    }

    let operationIndex = getRandomOperation()

    let op1 = newOperand()
    let op2 = newOperand()
    let problem = {
      problem: null
      , answer: null
    }

    switch (operationIndex) {
      case 1:
        problem.answer = op1 - op2
        problem.problem = `${op1} - ${op2} = `
        break
      case 2:
        problem.answer = op1 * op2
        problem.problem = `${op1} * ${op2} = `
        break
      case 3:
        problem.answer = op1 / op2
        problem.problem = `${op1} / ${op2} = `
        break
      case 0:
      default:
        problem.answer = op1 + op2
        problem.problem = `${op1} + ${op2} = `
    }

    // remove unnecessary zeros
    problem.answer = problem.answer.toFixed(3).replace(/\.?0+$/, '')

    return problem
  }


  /// PAYLOAD ///

  // problems generating
  let tmp = generateProblem()
  const answerField = (<input type={'text'} className={cn(s.answerField, currentColorTheme)} />)

  return (
    <div className={classList} >
      <div className={s.answerLine}>
        {tmp.problem}
        {tmp.answer}
        {localAppSettings.inputsForTestAnswer ? answerField : ''}
      </div>
    </div>
  )
}