// import original module declarations
import 'styled-components';
import {Dimens, TextTheme} from "../theme";


// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    primaryDark: string;
    neutral: string;
    content: string;
    content50: string;
    content10: string;
    content5: string;
    contentShade: string;
    error: string;
    shade: string;
    idle: string;
    textTheme: TextTheme,
    dimens: Dimens,
  }
}