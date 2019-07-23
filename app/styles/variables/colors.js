import { darken, lighten } from 'polished';
// https://flatuicolors.com/palette/ca

const colors = {
  lightBlue: lighten(0.3, '#22a7f0'),
  defaultBlue: darken(0.15, '#22a7f0'),
  darkerBlue: darken(0.3, '#22a7f0'),
  darkestBlue: darken(0.5, '#22a7f0'),
  defaultGrey: '#e9e9e9',
};

export default colors;
