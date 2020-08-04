import React from "react";
import s from './Settings.module.sass'
import cn from '../../utils/classNamesConcatenator.js'


export const Settings = ({localAppSettings, setLocalAppSettings}) => {

  let currentColorTheme = localAppSettings.isColorThemeDark ? 'bg-dark text-info' : 'bg-light text-dark'

  function handleSettingChanges(e) {
    let name = e.target.name
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value

    // switch operations
    if (name === 'useAddition' || name === 'useSubtraction' || name === 'useMultiplication' || name === 'useDivision') {
      value = {...localAppSettings.useOperations, [name]: value}
      name = 'useOperations'
    }

    setLocalAppSettings({
      ...localAppSettings
      , [name]: value
    })

  }

  function changeFontSize(e) {
    e.preventDefault()

    let value = localAppSettings.problemsTextSize

    if (e.target.textContent === '+' && value < 5) {
      value++
    }
    if (e.target.textContent === '-' && value > 1) {
      value--
    }

    // чтоб не было лишних вызовов при неизменном значении
    if (value !== localAppSettings.problemsTextSize) {
      // кажись бред, но делает что надо
      handleSettingChanges({target: {type: 'text', name: 'problemsTextSize', value }})
    }

  }


  const handleSettingsClick = (e) => {
  //  как-то оно на одних классах из коробки не работает, а подключать ЖС код от бутстрапа ради одной функции не охота (тем более что он сам не подключился а разбираться влом)
    const collapseBlock = document.getElementById(e.target.dataset.target)

    if (collapseBlock.classList.contains('show')) {
      collapseBlock.classList.remove('show')
      e.target.setAttribute('aria-expanded', 'false')
    }
    else {
      collapseBlock.classList.add('show')
      e.target.setAttribute('aria-expanded', 'true')
    }
  }

  // in React onChange and onInput are the same, so I do this onBlur
  const fixInputedChanges = (e) => {
    const name = e.target.name
    let value = e.target.value

    if (name === 'numberOfProblemsPerPage' && value > 100){
      value = 100
    }
    else if (name === 'numberOfProblemsPerPage' && value < 5){
      value = 5
    }
    handleSettingChanges({target: {type: 'number', name, value }})
  }


  return (
    <div className={cn(s.settings, currentColorTheme)}>

        <button className={cn('btn', 'btn-block', s.headerButton, currentColorTheme)} type="button" data-toggle="collapse" data-target="settingsForm"
              aria-expanded="false" aria-controls="settingsForm" onClick={handleSettingsClick}>
          <img src="./settings-icons8.svg" alt="settings icon" className={s.headerIcon} aria-hidden/>
          Настройки
      </button>

      <form id='settingsForm' className='collapse '>
        <div className='form-row'>
          <div className="col-md-6 ">

            <div className="form-group">

              <fieldset>
                <legend>Использовать операции</legend>

                <div className='form-row'>

                  <div className='col'>
                    <div className="custom-control custom-checkbox">
                      <input id='useAddition' className='custom-control-input' type="checkbox" name='useAddition'
                             checked={localAppSettings.useOperations.useAddition || ''} onChange={handleSettingChanges}/>
                      <label className="custom-control-label" htmlFor='useAddition'
                             role='button'>Сложение&nbsp;+ </label>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input id='useSubtraction' className='custom-control-input' type="checkbox" name='useSubtraction'
                             checked={localAppSettings.useOperations.useSubtraction || ''} onChange={handleSettingChanges}/>
                      <label className="custom-control-label" htmlFor='useSubtraction'
                             role='button'>Вычитание&nbsp;- </label>
                    </div>

                  </div>


                  <div className='col'>

                    <div className="custom-control custom-checkbox">
                      <input id='useMultiplication' className='custom-control-input' type="checkbox"
                             name='useMultiplication' checked={localAppSettings.useOperations.useMultiplication || ''}
                             onChange={handleSettingChanges}/>
                      <label className="custom-control-label" htmlFor='useMultiplication'
                             role='button'>Умножение&nbsp;× </label>
                    </div>

                    <div className="custom-control custom-checkbox">
                      <input id='useDivision' className='custom-control-input' type="checkbox" name='useDivision'
                             checked={localAppSettings.useOperations.useDivision || ''} onChange={handleSettingChanges}/>
                      <label className="custom-control-label" htmlFor='useDivision'
                             role='button'>Деление&nbsp;÷ </label>
                    </div>

                  </div>
                </div>

                <div className="custom-control custom-checkbox">
                  <input id='groupByOperations' className='custom-control-input' type="checkbox"
                         name='groupByOperations' disabled aria-disabled
                         checked={localAppSettings.groupByOperations || ''}
                         onChange={handleSettingChanges}/>
                  <label className="custom-control-label" htmlFor='checkboxDiv' role='button'>Группировать примеры по
                    операциям</label>
                </div>

              </fieldset>

            </div>

            <div className="form-group">


              <fieldset>
                <legend>Типы операндов</legend>

                <div className="form-row">

                  <div className="col">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" id='useDecimalFractions' className='custom-control-input'
                             name='useDecimalFractions' checked={localAppSettings.useDecimalFractions || ''}
                             onChange={handleSettingChanges}/>
                      <label htmlFor="useDecimalFractions" className='custom-control-label' role='button'>Десятичные
                        дроби</label>
                    </div>
                  </div>

                  <div className="col">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" id='useCommonFractions' className='custom-control-input' disabled
                             aria-disabled name='useCommonFractions' checked={localAppSettings.useCommonFractions || ''}
                             onChange={handleSettingChanges}/>
                      <label htmlFor="useCommonFractions" className='custom-control-label' role='button'>Обычные
                        дроби</label>
                    </div>
                  </div>

                </div>

              </fieldset>

              <fieldset>
                <legend>Граничные значения операндов</legend>

                <div className='form-row'>

                  <div className="col">
                    <label htmlFor="minOperandValue">Минимум</label>
                    <input type="number" className={cn(currentColorTheme, 'short-number-field')} id='minOperandValue' name='minOperandValue'
                           value={localAppSettings.minOperandValue} onChange={handleSettingChanges}/>
                  </div>

                  <div className="col">
                    <label htmlFor="maxOperandValue">Максимум</label>
                    <input type="number" className={cn(currentColorTheme, 'short-number-field')} id='maxOperandValue' name='maxOperandValue'
                           value={localAppSettings.maxOperandValue} onChange={handleSettingChanges}/>
                  </div>

                </div>

              </fieldset>

            </div>

            <div className="form-group">
              <fieldset>
                <legend> Количество примеров на странице </legend>

                {/*<label htmlFor="numberOfProblemsPerPage"> Количество примеров на странице </label>*/}
                <input type="number" id='numberOfProblemsPerPage' name='numberOfProblemsPerPage'
                       className={cn(currentColorTheme, 'short-number-field')} value={localAppSettings.numberOfProblemsPerPage}
                       onChange={handleSettingChanges} onBlur={fixInputedChanges}/>


              </fieldset>
            </div>

          </div>


          <div className="col-md-6">

            <div className="form-group">
              <fieldset>
                <legend>Вариант проверки решений</legend>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" id='showAnswerOnHover' checked={localAppSettings.showAnswerOnHover || ''} className='custom-control-input'
                         name='showAnswerOnHover' onChange={handleSettingChanges}/>
                  <label htmlFor="showAnswerOnHover" className='custom-control-label' role='button'>Показывать ответы
                    при наведении</label>
                </div>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" id='inputsForTestAnswer' checked={localAppSettings.inputsForTestAnswer || ''}
                         className='custom-control-input' name='inputsForTestAnswer' onChange={handleSettingChanges}/>
                  <label htmlFor="inputsForTestAnswer" className='custom-control-label' role='button'>Показывать поля
                    для ввода ответа</label>
                </div>


              </fieldset>
            </div>

            <div className="form-group">
              <fieldset>
                <legend>Размер текста примеров</legend>

                <div className="input-group">
                  <input type="text" className={cn('form-control', s.shortinput, currentColorTheme)} readOnly id='problemsTextSize'
                         value={localAppSettings.problemsTextSize} onChange={handleSettingChanges}/>
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" onClick={changeFontSize}>+</button>
                    <button className="btn btn-outline-secondary" onClick={changeFontSize}>-</button>
                  </div>
                </div>

              </fieldset>
            </div>

            <div className="form-group">
              <fieldset>
                <legend>Прочее</legend>

                <div className="custom-control custom-checkbox">
                  <input type="checkbox" id='isColorThemeDark' className='custom-control-input'
                         name='isColorThemeDark' checked={localAppSettings.isColorThemeDark}
                         onChange={handleSettingChanges}/>
                  <label htmlFor="isColorThemeDark" className='custom-control-label' role='button'>Тёмная тема</label>
                </div>


                <div className="custom-control custom-checkbox">
                  <input type="displayAsRussianAlphabetNumbers" id='displayAsRussianAlphabetNumbers'
                         className='custom-control-input'
                         name='displayAsRussianAlphabetNumbers'
                         checked={localAppSettings.displayAsRussianAlphabetNumbers} onChange={handleSettingChanges}/>
                  <label htmlFor="displayAsRussianAlphabetNumbers" className='custom-control-label' role='button'>Отображать
                    числа числительными русского алфавита</label>
                </div>
              </fieldset>
            </div>

          </div>
        </div>
      </form>
    </div>
  )
}