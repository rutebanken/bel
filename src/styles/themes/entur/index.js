/*
 * Licensed under the EUPL, Version 1.2 or – as soon they will be approved by
 * the European Commission - subsequent versions of the EUPL (the "Licence");
 * You may not use this work except in compliance with the Licence.
 * You may obtain a copy of the Licence at:
 *
 *   https://joinup.ec.europa.eu/software/page/eupl
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the Licence is distributed on an "AS IS" basis,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the Licence for the specific language governing permissions and
 * limitations under the Licence.
 *
 */

//import { fade } from "material-ui/utils/colorManipulator";

export const primary = "#5AC39A";
export const primaryDarker = "#51af8a";
export const darkColor = "#181C56";
const cyan700 = "#5AC39A";
const grey100 = "#f5f5f5";
const grey300 = "#e0e0e0";
const grey400 = "#bdbdbd";
const grey500 = "#9e9e9e";
export const white = "#ffffff";
const darkBlack = "rgba(0, 0, 0, 0.87)";
const fullBlack = "rgba(0, 0, 0, 1)";

export default {
  fontFamily: "Roboto, sans-serif",
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
    //disabledColor: fade(darkBlack, 0.3),
    pickerHeaderColor: primary,
    //clockCircleColor: fade(darkBlack, 0.07),
    shadowColor: fullBlack,
  },
  datePicker: {
    selectColor: primary,
    selectTextColor: white,
  },
  checkbox: {
    checkedColor: primaryDarker,
  },
  appBar: {
    color: darkColor,
    backgroundColor: darkColor,
  },
  tabs: {
    textColor: "#fff",
    selectedTextColor: "#fff",
    backgroundColor: darkColor,
  },
};

export const getTheme = () => ({
  fontFamily: "Roboto, sans-serif",
  palette: {
    primary: {
      main: primary,
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: "rgb(255, 89, 89)",
          height: "7px",
        },
      },
    },
  },
});
