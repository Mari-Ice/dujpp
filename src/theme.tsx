import styled, {css, DefaultTheme} from "styled-components";

export interface Theme extends DefaultTheme {

}

export interface Dimens {
  contentWidth: string,
}

export interface TextTheme {
  headline1: TextStyle;
  headline2: TextStyle;
  headline3: TextStyle;
  headline4: TextStyle;
  headline5: TextStyle;
  headline6: TextStyle;
  label: TextStyle;
  body: TextStyle;
  error: TextStyle;
  input: TextStyle;
  button: TextStyle;
}

interface TextStyleData {
  size?: string;
  weight?: string;
  height?: string;
  color?: string;
}

export class TextStyle {
  _overrides: { [k: string]: TextStyle } = {};

  _overridesKey(overrides: TextStyleData): string {
    let value = '';
    for (const style of Object.values(overrides)) {
      value += style;
    }
    return value;
  }

  data: TextStyleData;
  span: any;

  constructor(data: TextStyleData) {
    this.data = data;
    this.span = styled.span`
          ${() => this.css}
        `;
  }

  with(overrides: TextStyleData): TextStyle {
    const key = this._overridesKey(overrides);
    if (!this._overrides[key]) {
      this._overrides[key] = new TextStyle(
          {
            ...this.data,
            ...overrides
          }
      );
    }
    return this._overrides[key];
  }

  style(theme?: Theme) {
    return {
      color: this.data.color || theme?.content,
      fontSize: this.data.size || theme?.textTheme.body.data.size,
      fontWeight: this.data.weight || theme?.textTheme.body.data.weight,
      lineHeight: this.data.height || theme?.textTheme.body.data.height,
    }
  }

  get css() {
    return ({theme}: { theme: Theme }) => css`
          color: ${this.data.color || theme.content};
          font-size: ${this.data.size || theme.textTheme.body.data.size};
          font-weight: ${this.data.weight || theme.textTheme.body.data.weight};
          line-height: ${this.data.height || theme.textTheme.body.data.height};
        `;
  }
}

export abstract class DujppColors {
  static contentShade = '#6a696e'; // textInactive / iconPrimary
  static content = '#3a383c';      // textPrimary
  static content50 = 'rgba(58,56,60,0.5)'; // 50% opacity of content
  static content10 = 'rgba(58,56,60,0.1)'; // 10% opacity of content
  static content5 = 'rgba(58,56,60,0.05)'; // 5% opacity of content
  static primary = '#69d19d';      // primary
  static primaryDark = '#61ab6f';  // messageTextSuccess
  static neutral = '#FFFFFF';      // neutral
  static shade = '#f2f2f2';        // messageBackgroundInfo
  static idle = '#d7d7d7';         // iconDisabled
  static error = '#e24a4a';        // messageTextError
}

export interface StyledProps {
  theme: Theme;

  [x: string]: any;
}

export const DujppTheme: Theme = {
  primary: DujppColors.primary,
  primaryDark: DujppColors.primaryDark,
  neutral: DujppColors.neutral,
  content: DujppColors.content,
  content50: DujppColors.content50,
  content10: DujppColors.content10,
  content5: DujppColors.content5,
  contentShade: DujppColors.contentShade,
  shade: DujppColors.shade,
  idle: DujppColors.idle,
  error: DujppColors.error,
  dimens: {
    contentWidth: '500px',
  },
  textTheme: {
    headline1: new TextStyle({
      size: '60px',
      weight: 'bold',
    }),
    headline2: new TextStyle({
      size: '40px',
      weight: '300',
      color: DujppColors.content,
    }),
    headline3: new TextStyle({
      size: '30px',
      weight: '400'
    }),
    headline4: new TextStyle({
      size: '23px',
      weight: '400'
    }),
    headline5: new TextStyle({
      size: '20px',
      weight: '700'
    }),
    headline6: new TextStyle({
      size: '15px',
      weight: 'bold'
    }),
    label: new TextStyle({
      size: '15px',
      weight: '600',
      color: DujppColors.contentShade
    }),
    body: new TextStyle({
      size: '13px',
    }),
    error: new TextStyle({
      size: '15px',
      color: 'red'
    }),
    input: new TextStyle({
      size: '24px',
      color: 'black',
      height: '1.2',
    }),
    button: new TextStyle({
      size: '15px',
      weight: 'bold',
      color: DujppColors.content,
    })
  },
};
