let colorVarients = {};
let colorVarientsMap = {
  primary: [
    '#ECF8F3',
    '#DAF2E8',
    '#CCECE2',
    '#9ADAC5',
    '#1DBF84',
    '#03A973',
    '#028C5F',
    '#2C785F',
    '#01593D',
    '#24332E',
    '#093B4D', 
  ],
  neutral: [
    '#F8F8F8',
    '#F0F1F2',
    '#E1E4E8',
    '#D2D5D9',
    '#C9CBCE',
    '#B7BABD',
    '#868B91',
    '#686C71',
    '#4A4E51',
    '#1E1F20',
  ],

  error: [
    '#FEF2F2',
    '#FEE2E2',
    '#FECACA',
    '#FCA5A5',
    '#F87171',
    '#EF4444',
    '#DC2626',
    '#B91C1C',
    '#991B1B',
    '#7F1D1D',
  ],
  warning: [
    '#FFFBEB',
    '#FEF3C7',
    '#FDE68A',
    '#FCD34D',
    '#FBBF24',
    '#F59E0B',
    '#D97706',
    '#B45309',
    '#92400E',
    '#78350F',
  ],

  shades: ['#FFFFFF', '#000000'],
  secondary: [
    '#F7F8F9',
    '#F1F4F6',
    '#E8EAED',
    '#B8C0CC',
    '#A0ABBB',
    '#647488',
    '#4B5768',
    '#38414D',
    '#252C33',
    '#13161A',
  ],

  unique: [
    '#ECF2F8',
    '#E5F6FD',
    '#2F80ED',
    '#7407FF',
    '#4E36B2',
    '#00559E',
    '#172B4D',
    '#45526CC',
    '#42526E',
    '#1B2A33',
  ],
   'secondary-unique': ['#9D9D9D', "#ECEEF1", '#2F80ED', '#7407FF', '#4E36B2', '#00559E', '#172B4D', '#9D9D9D', '#42526E', '#FCE3E3']
};

for (let key in colorVarientsMap) {
  colorVarientsMap[key].map(
    (color, idx) => (colorVarients[`${key}-${idx * 100 || 50}`] = color)
  );
}


module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ...colorVarients,
        black: '#3A4352',
        white: '#ffffff',
        'editor-brown': '#986801',
        'editor-green': '#50A14F',
        'button-pressed': '#DFFCF0'
      },
      spacing: {
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        6.5: '1.625rem',
      },
      boxShadow: {
        'ts': '0px 0px 1px rgba(0, 0, 0, 0.1), 0px 10px 30px rgba(0, 0, 0, 0.25)',
        'y-sm': '0px 0px 4px rgba(0, 0, 0, 0.15)',
        'hover-border': '0px 0px 0px 3px #DAF2E8',
        sm: '0px 0px 8px rgba(0, 0, 0, 0.15)'
      },
      dropShadow: {
        sm: '0px 0px 8px rgba(0, 0, 0, 0.15)',
        md: '0px 4px 12px rgba(0, 0, 0, 0.15)',
        lg: '0px 10px 30px rgba(0, 0, 0, 0.25)',
      },
      lineHeight: {
        3.5: '0.875rem',
        3.75: '0.9375rem',
        4.5: '0.875rem',
      },
      minWidth: {
        '3/10': '30%',
        5: '20px',
      },
      maxWidth: {
        '7/10': '70%',
      },
      height: {
        content: 'calc(100% - 64px)',
      },
      width: {
        '3/10': '30%',
        '4/10': '40%',
        '6/10': '60%',
        '7/10': '70%',
        5.5: '22px',
      },
      flexBasis: {
        '3/10': '30%',
        '4/10': '40%',
        '6/10': '60%',
        '7/10': '70%',
      },
      fontSize: {
        '2xs': '12px',
        small: '13px',
        xs: '13px',
        '10px': '10px',
        xxs: '11px',
      },
    },
  },
  plugins: [],
};
