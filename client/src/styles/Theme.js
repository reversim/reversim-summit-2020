const theme = {
  // the website's color scheme
  color: {
    // color
    text_1: '#ffffff',
    text_2: '#000000',
    text_3: '#5127ff',
    
    heading_2: '#5127ff',
    input_1: '#495057',
    font_awsome_trash: '#bd3a02',
    font_awsome_watch: '#ff6100',
    heading_decoration: '#ff6100',
    font_awsome_nav: '#5127ff',

    important: '#ff2e5f',
    note_this: '#ff6100',
    count_down: '#ffffff',

    step_zilla_sub_heading: '#6c757d',
    
    session_category: '#896cff',

    session_status_proposed: '#ff6100',
    session_status_accepted: '#29b342',
    session_status_decline: '#ff2e5f',
    
    // Background colors
    background_1: 'rgba(81, 39, 255, 0.9)', // #5127ff
    background_2: '#5127ff',
    background_3: '#3312bc',
    background_4: '#ffffff',
    background_count_down: '#ffffff',
    background_modal: '#fff8ed',

    background_linear_gradient_1: 'linear-gradient(to right, rgba(118, 12, 146, 0.4) 0%, rgba(0, 92, 177, 0.8) 100%)',

    font_awsome_background_1: 'rgba(118, 12, 146, 0.4)',
    font_awsome_background_2: `rgba(0, 92, 177, 0.2)`,

    button_bkgr_1: '#896cff',
    button_bkgr_2: '#ff6100',
    button_bkgr_3: '#29b342',
    button_bkgr_4: '#ff2e5f',
    button_bkgr_5: '#6c757d',

    image_link_bkgr: '#ffffff',
    input_bkgr_1: '#ffffff',
   
    // Borders and box shadows
    border_1: '#5127ff',
    border_2: '#ffffff',

    box_shadow_1: '#5127ff',
    box_shadow_1_dimmed: 'rgba(81, 39, 255, 0.5)',
    box_shadow_2: '#ffffff',
    box_shadow_3: '#c8c8c8',
    
    font_awsome_border: `#003acc`,
    font_awsome_box_shadow_1: 'rgba(0, 238, 255, 0.2)',
    font_awsome_box_shadow_2: 'rgba(89, 0, 255, 0.8)',
    font_awsome_box_shadow_3: 'rgba(0, 238, 255, 0.1)',
    
    input_border_1: '#ced4da',
    input_border_2: '#80a4ff',
    input_border_3: '#0048ff',
    input_box_shadow_1: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
    input_box_shadow_2: '0 0 0 calc(0.2 * 16px) rgba(0, 72, 255, 0.25)', //NOTE: when using this note that the size corraltes to font.size_reg (16px)
    form_button_box_shadow_1: 'rgba(0, 238, 255, 0.2)',
    form_button_box_shadow_2: 'rgba(89, 0, 255, 0.8)',
    form_button_border_hover: '#545b62',
    
    session_category_border: '#896cff',
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
    main_for_mq_m: '748px',
    main_for_mq_s: '460px',
    main_for_mq_xs: '340px',
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