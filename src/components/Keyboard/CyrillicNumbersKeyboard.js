import React from 'react';
import CyrillicNumbersLayout from "./src/layouts/CyrillicNumbersLayout";
import Keyboard from "./src/Keyboard";
import KeyboardButton from "./src/KeyboardButton";
import BackspaceIcon from "./src/icons/BackspaceIcon";
import './CyrillicNumericKeyboard.sass'

class CyrillicNumbersKeyboard extends Keyboard {

  isUppercase () {return null}

  renderCyrillicNumber () {
    const keys = CyrillicNumbersLayout.layout;
    const {leftButtons, rightButtons} = this.props;


    return (
      <div className="keyboard cyrillic-numeric-keyboard" onClick={e => e.stopPropagation()}>
        {keys.map((row, i) =>
          <div className="keyboard-row" key={`row-${i}`}>
            {row.map(button =>
              <KeyboardButton
                value={button}
                onClick={this.handleLetterButtonClick}
                key={button}
              />
            )}
            {i === keys.length - 1 &&
            <KeyboardButton
              value={<BackspaceIcon />}
              classes="keyboard-backspaceButton"
              onClick={this.handleBackspaceClick}
            />
            }
          </div>
        )}
        <div className="keyboard-row">
          {leftButtons}
          {rightButtons}
        </div>
      </div>
    );
  }

  render() {
    if (!this.props.inputNode) {
      return null;
    }

    if (this.props.isNumeric) {
      return this.renderNumeric()
    }

    if (this.props.isCyrillicNumbers) {
      return  this.renderCyrillicNumber()
    }

    return this.renderAlphanumeric();
  }
}

export default CyrillicNumbersKeyboard;

