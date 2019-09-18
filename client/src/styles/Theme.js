const theme = {
  // the website's color scheme
  color: {
    background_1: 'rgba(81, 39, 255, 0.9)',
    background_2: 'rgb(81, 39, 255)',
    background_3: 'rgb(51, 18, 188)',
    
    text_1: 'rgb(255, 255, 255)',
    heading_2: 'rgb(81, 39, 255)',

    button_bkgr_1: 'rgb(137, 108, 255)', 
    button_bkgr_2: 'rgb(255, 97, 0)',
    
    box_shadow_1: 'rgb(81, 39, 255)',
    box_shadow_2: 'rgb(255, 255, 255)',
  },
  // the website's fonts
  font: {
    main: 'Source Code Pro, monospace',
    button: 'PT Mono',
    weight_normal: '300',
    weight_bold: '600',
    size_reg: '16px',
    size_md: '18px',
    size_h2: `48px`,
  },
  // spaces used for padding and margins
  space: {
    s: '5px',
    m: '10px',
    l: '15px',
    xl: '25px',
    xxl: '50px',
  },
  // borders used on the website, no colors only line styles and width
  border: {
    button_border: 'solid 2px',
  },
  // media queries parameters
  mq: {
    xs: '360px',
    s: '480px',
    m: '768px',
    l: '992px',
    xl: '1200px',
    xxl: '1600px',
  },
};

export default theme;