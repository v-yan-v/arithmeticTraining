/** Function convert numbers to Cyrillic notation
 * @param {Number} number - some number to convert into cyrillic notation (max 999_999_999 because of additional symbols that need to mark larger order of magnitude have not aesthetic view in standard types)
 * @return {String | Number} - converted string or NaN
 */
export default function (number) {


  let result = {integer: '', fractional: ''}

  let numberParts = {integer: Math.trunc(number), fractional: parseInt((number % 1).toString().slice(2, 5))}

  result.integer = expandNumber(numberParts.integer)

  // it  need to check how show fractional in cyrillic notation
  // result.fractional = expandNumber(numberParts.fractional)

  return result.integer
}


/**
 * Function slice Number to groups by 3 digit and map each to cyrillic number
 * @param {Number | String} number
 * @return {String} - number in cyrillic notation or 'NaN'
 */
const expandNumber = (number) => {
  if (Math.abs(parseInt(number))  >= 1000000000) {
    return 'NaN'
  }

  let result = ''
  let sign = (number < 0 ? '-' : '')

  let num = Math.abs(number).toString()

  // for each chunk of 3 digit (from right to left)
  for (let k = 0, till = Math.ceil(num.length / 3); k < till; k++) {

    let cyrillic = ''

    // get last (max 3) symbols
    let chunk = num.slice(-3)

    // map hundreds, dozens, ones to cyrillic symbols
    for (let i = 0; i < chunk.length; i++) {
      cyrillic += mapToCyrillicNumber(chunk[i].padEnd(chunk.length - i, '0'))
    }

    let tail = parseInt(chunk.slice(-2))
    if (tail > 10 && tail < 20) {
      // swap last symbols because in cyrillic notation for numbers > 10 and < 20 it writes like pronounce - ones first, tens after
      cyrillic = cyrillic.slice(0, -2) + cyrillic.slice(-1) + cyrillic.slice(-2, -1)
    }

    // drop used chunk
    num = num.slice(0, -3)

    //update result, insert zero, one or two marks of thousand
    result = '҂'.repeat(k) + cyrillic + result
  }

  return sign + result
}

/**
 * Function map numbers to cyrillic notation
 * @param {String | Number} number
 * @return {String}
 */
const mapToCyrillicNumber = (number) => {
  let result = ''
  switch (number.toString()) {
    case '1':
      result += 'А'
      break
    case '2':
      result += 'В'
      break
    case '3':
      result += 'Г'
      break
    case '4':
      result += 'Д'
      break
    case '5':
      result += 'Є'
      break
    case '6':
      result += 'Ѕ'
      break
    case '7':
      result += 'Ꙁ'
      break
    case '8':
      result += 'И'
      break
    case '9':
      result += 'Ѳ'
      break
    case '10':
      result += 'І'
      break
    case '11':
      result += 'АІ'
      break
    case '12':
      result += 'ВІ'
      break
    case '13':
      result += 'ГІ'
      break
    case '14':
      result += 'ДІ'
      break
    case '15':
      result += 'ЄІ'
      break
    case '16':
      result += 'ЅІ'
      break
    case '17':
      result += 'ꙀІ'
      break
    case '18':
      result += 'ИІ'
      break
    case '19':
      result += 'ѲІ'
      break
    case '20':
      result += 'К'
      break
    case '30':
      result += 'Л'
      break
    case '40':
      result += 'М'
      break
    case '50':
      result += 'Н'
      break
    case '60':
      result += 'Ѯ'
      break
    case '70':
      result += 'О'
      break
    case '80':
      result += 'П'
      break
    case '90':
      result += 'Ч'
      break
    case '100':
      result += 'Р'
      break
    case '200':
      result += 'С'
      break
    case '300':
      result += 'Т'
      break
    case '400':
      result += 'У'
      break
    case '500':
      result += 'Ф'
      break
    case '600':
      result += 'Х'
      break
    case '700':
      result += 'Ѱ'
      break
    case '800':
      result += 'Ѿ'
      break
    case '900':
      result += 'Ц'
      break
    case '0':
    default:
      result += ''
  }

  return result
}
