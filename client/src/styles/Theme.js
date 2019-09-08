const theme = {
  // the website's color scheme
  color: {
    background_1: 'rgba(81, 39, 255, 0.9)',
    background_3: 'rgb(51, 18, 188)',
    text_1: 'white',
    button_or_box_shadow_1: '#5127ff',
    button_or_box_shadow_2: '#fff',
  },
  // the website's fonts
  font: {
    main: 'Source Code Pro,monospace',
    button: 'PT Mono',
  },
  // spaces used for padding and margins
  space: {
    s: '5px',
    m: '10px',
    l: '15px',
    xl: '20px',
    xxl: '50px',
  },
  // borders used on the website, no colors only line styles and width
  border: {
    button_border: 'solid 2px',
  },
  // media queries parameters
  mq: {
    xs: '480px',
    m: '768px',
    l: '992px',
    xl: '1200px', //though classic tablet landscape is 1024px, 1200 worked better for Footer.js
    xxl: '1600px',
  },
};

export default theme;
