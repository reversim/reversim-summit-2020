const theme = {
  // the website's color scheme
  color: {
    // color
    text_1: 'rgb(255, 255, 255)',
    heading_2: 'rgb(81, 39, 255)',
    input_1: 'rgb(73, 80, 87)',

    // Background colors
    background_1: 'rgba(81, 39, 255, 0.9)',
    background_2: 'rgb(81, 39, 255)',
    background_3: 'rgb(51, 18, 188)',
    background_linear_gradient_1: 'linear-gradient(to right, rgba(118, 12, 146, 0.2) 0%, rgba(0, 92, 177, 0.2) 100%)',
    font_awsome_background_1: 'rgba(118, 12, 146, 0.4)',
    font_awsome_background_2: `rgba(0, 92, 177, 0.2)`,
    button_bkgr_1: 'rgb(137, 108, 255)',
    button_bkgr_2: 'rgb(255, 97, 0)',
    image_link_bkgr: 'rgb(255, 255, 255)',
    input_bkgr_1: 'rgb(255, 255, 255)',
   
    // Borders and box shadows
    box_shadow_1: 'rgb(81, 39, 255)',
    box_shadow_2: 'rgb(255, 255, 255)',
    box_shadow_3: 'rgb(222, 226, 230)',
    font_awsome_border: `rgb(0, 58, 204)`,
    font_awsome_box_shadow_1: 'rgba(0, 238, 255, 0.2)',
    font_awsome_box_shadow_2: 'rgba(89, 0, 255, 0.8)',
    font_awsome_box_shadow_3: 'rgba(0, 238, 255, 0.1)',
    input_border_1: 'rgb(206, 212, 218)',
    input_border_2: 'rgb(128, 164, 255)',
    input_box_shadow_1: 'rgba(0, 0, 0, 0.075)',
    input_box_shadow_2: 'rgba(0, 72, 255, 0.25)',
  },
  // the website's fonts
  font: {
    main: 'Source Code Pro, monospace',
    button: 'PT Mono',
    weight_normal: '300',
    weight_bold: '600',
    size_reg: '16px',
    size_md: '18px',
    size_bg: '24px',

    size_h2: '48px',
    size_h3: '35px',
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