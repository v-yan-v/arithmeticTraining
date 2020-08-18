import toCyrillicNotation from "../../utils/convertNumbersToCyrillicNotation";

const defaultGeneratorOptions = {
  quantity             : 5
  , minOperandValue    : 0
  , maxOperandValue    : 10
  , useDecimalFractions: false
  , useCommonFractions : false
  , useOperations      : {
      useAddition      : true
    , useSubtraction   : false
    , useMultiplication: false
    , useDivision      : false
  }
  , inCyrillicNotation : false
}
/**
 * Generate some quantity arithmetic problems
 * @param {Object} options
 * @param {number} options.quantity
 * @param {number} options.minOperandValue
 * @param {number} options.maxOperandValue
 * @param {Boolean} options.useDecimalFractions
 * @param {Boolean} options.useCommonFractions
 * @param {Boolean} options.inCyrillicNotation
 * @param {Object} options.useOperations
 * @param {Boolean} options.useOperations.useAddition
 * @param {Boolean} options.useOperations.useSubtraction
 * @param {Boolean} options.useOperations.useMultiplication
 * @param {Boolean} options.useOperations.useDivision
 *
 * @return {Object[]} problems - Array of problems
 *         {String} problems[].problem - condition of problem
 *         {Number} problems[].answer - calculated value of problem
 */
export const problemsGenerator = (options = defaultGeneratorOptions) => {
  if (options.quantity < 1) {
    return []
  }
  let q = options.quantity
  let problemsList = new Array(q)

  ///region SECONDARY FUNCTIONS ///
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
    if (options.useDecimalFractions && !options.useCommonFractions) {
      operand = getRandomNumber(options.minOperandValue, options.maxOperandValue)
    } else if (!options.useDecimalFractions && options.useCommonFractions) {

    } else if (options.useDecimalFractions && options.useCommonFractions) {

    } else {
      operand = getRandomIntInclusive(options.minOperandValue, options.maxOperandValue)
    }

    operand = +(operand.toFixed(3).replace(/\.?0+$/, ''))

    return operand
  }

  const generateProblem = () => {
    const operations = Object.keys(options.useOperations).map(key => options.useOperations[key])

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

    let problem = {
      problem : null
      , answer: null
      , op1   : newOperand()
      , op2   : newOperand()
    }

    switch (operationIndex) {
      case 1:
        problem.answer = problem.op1 - problem.op2
        problem.problem = problem.op1 + ' - ' + problem.op2 + ' = '
        break
      case 2:
        problem.answer = problem.op1 * problem.op2
        problem.problem = problem.op1 + ' * ' + problem.op2 + ' = '
        break
      case 3:
        problem.answer = problem.op1 / problem.op2
        problem.problem = `${problem.op1} / ${problem.op2} = `
        break
      case 0:
      default:
        problem.answer = problem.op1 + problem.op2
        problem.problem = `${problem.op1} + ${problem.op2} = `
    }

    // remove unnecessary zeros
    problem.answer = problem.answer.toFixed(3).replace(/\.?0+$/, '')

    // convert to cyrillic notation
    if (options.inCyrillicNotation) {
      problem.answer = toCyrillicNotation(problem.answer)
      problem.problem = problem.problem.split(' ').map((el, i) => (i === 1) || (i === 3) ? el : toCyrillicNotation(el)).join(' ')
    }

    return problem
  }
  ///endregion SECONDARY FUNCTIONS ///


  while (q--) {
    problemsList[q] = generateProblem()
  }


  return problemsList
}