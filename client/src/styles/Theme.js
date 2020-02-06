const theme = {
  // the website's color scheme
  color: {
    // color
    text_1: 'rgb(255, 255, 255)',
    text_2: 'rgb(0, 0, 0)',
    text_3: 'rgb(81, 39, 255)',

    heading_2: 'rgb(81, 39, 255)',
    input_1: 'rgb(73, 80, 87)',
    font_awsome_trash: 'rgb(189, 58, 2)',
    font_awsome_watch: 'rgb(255, 97, 0)',
    heading_decoration: 'rgb(255, 97, 0)',
    font_awsome_nav: 'rgb(1, 39, 255)',

    important: 'rgb(255, 46, 95)',
    note_this: 'rgb(255, 97, 0)',
    count_down: 'rgb(108, 117, 125)',

    step_zilla_sub_heading: 'rgb(108, 117, 125)',

    // Background colors
    background_1: 'rgba(81, 39, 255, 0.9)',
    background_2: 'rgb(81, 39, 255)', // #5127ff
    background_3: 'rgb(51, 18, 188)',
    background_4: 'rgb(255, 255, 255)',
    background_count_down: 'rgb(222, 226, 230)',
    background_modal: 'rgb(255, 248, 237)',

    background_linear_gradient_1: 'linear-gradient(to right, rgba(118, 12, 146, 0.4) 0%, rgba(0, 92, 177, 0.8) 100%)',
    background_linear_gradient_2: 'linear-gradient(to right, rgb(118, 12, 146) 0%, rgb(0, 92, 177) 100%)', //NOTE: used in FormButton :hover

    font_awsome_background_1: 'rgba(118, 12, 146, 0.4)',
    font_awsome_background_2: `rgba(0, 92, 177, 0.2)`,

    button_bkgr_1: 'rgb(137, 108, 255)',
    button_bkgr_2: 'rgb(255, 97, 0)',

    image_link_bkgr: 'rgb(255, 255, 255)',
    input_bkgr_1: 'rgb(255, 255, 255)',
   
    // Borders and box shadows
    box_shadow_1: 'rgb(81, 39, 255)',
    box_shadow_1_dimmed: 'rgba(81, 39, 255, 0.5)',
    box_shadow_2: 'rgb(255, 255, 255)',
    box_shadow_3: 'rgb(200, 200, 200)',

    font_awsome_border: `rgb(0, 58, 204)`,
    font_awsome_box_shadow_1: 'rgba(0, 238, 255, 0.2)',
    font_awsome_box_shadow_2: 'rgba(89, 0, 255, 0.8)',
    font_awsome_box_shadow_3: 'rgba(0, 238, 255, 0.1)',
    
    input_border_1: 'rgb(206, 212, 218)',
    input_border_2: 'rgb(128, 164, 255)',
    input_border_3: 'rgb(0, 72, 255)',
    input_box_shadow_1: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
    input_box_shadow_2: '0 0 0 calc(0.2 * 16px) rgba(0, 72, 255, 0.25)', //NOTE: when using this note that the size corraltes to font.size_reg (16px)
    form_button_box_shadow_1: 'rgba(0, 238, 255, 0.2)',
    form_button_box_shadow_2: 'rgba(89, 0, 255, 0.8)',
    form_button_border_hover: 'rgb(84, 91, 98)',
  },

  // the website's fonts
  font: {
    main: 'Source Code Pro, monospace',
    form_button: 'Montserrat, sans-serif',
    button: 'PT Mono',
    
    size_sml: '14px',
    size_reg: '16px',
    size_md: '18px', //NOTE: used for Intros as main text size
    size_bg: '24px', //NOTE: used for Intros as an announcment like in SponsorsPage.jsx
    
    size_h2: '48px',
    size_h3: '35px',
    size_h4: '24px',
    size_h5: '18px',

    weight_normal: '300',
    weight_medium: '400',
    weight_bold: '600',
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

  // common content widths

  width: {
    main: '1250px',
    main_for_mq_xl: '1100px',
    main_for_mq_l: '895px',
    main_for_mq_m: '758px',
    main_for_mq_s: '460px',
    main_for_mq_xs: '300px',
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