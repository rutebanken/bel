import { fade } from 'material-ui/utils/colorManipulator';

export const primary = '#5AC39A';
export const primaryDarker = '#51af8a';
export const darkColor = '#181C56';
const cyan700 = '#5AC39A';
const grey100 = '#f5f5f5';
const grey300 = '#e0e0e0';
const grey400 = '#bdbdbd';
const grey500 = '#9e9e9e';
const white = '#ffffff';
const darkBlack = 'rgba(0, 0, 0, 0.87)';
const fullBlack = 'rgba(0, 0, 0, 1)';

export default {
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: primary,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: primary,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: primary,
    clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack
  },
  datePicker: {
    selectColor: primary,
    selectTextColor: white
  },
  checkbox: {
    checkedColor: primaryDarker
  },
  appBar: {
    color: darkColor,
    backgroundColor: darkColor,
  },
  tabs: {
    textColor: '#fff',
    selectedTextColor: '#fff',
    backgroundColor: darkColor,
  }
};