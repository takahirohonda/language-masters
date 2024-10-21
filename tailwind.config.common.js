export const COLORS = {
  'primary-light-blue': '#3dd6f5',
  'primary-purple': '#a34fde',
  'primary-blue': '#405bff',
  'primary-red': '#ff386b',
  'primary-yellow': '#ebff38',
  'link-blue': '#7084ff',
  'primary-pink': '#ff35a2',
  'primary-black': '#191919',
  'secondary-text': '#d1d3d4',
}

export const CONTAINER = {
  center: true,
}

export const THEME = {
  container: CONTAINER,
  extend: {
    colors: COLORS,
    keyframes: {
      growLeft: {
        '0%': { width: '0' },
        '100%': { width: '100%' },
      },
    },
    animation: {
      growLeft: 'growLeft 500ms ease-in-out',
    },
  },
}
