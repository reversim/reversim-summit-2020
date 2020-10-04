const theme = {
  // the website's color scheme
  color: {
    // color
    text_1: '#ffffff',
    text_2: '#000000',
    text_3: '#535352',

    heading_2: '#535352',
    input_1: '#495057',
    font_awsome_trash: '#bd3a02',
    font_awsome_watch: '#71cea6',
    heading_decoration: '#71cea6',
    font_awsome_nav: '#535352',

    important: '#ff2e5f',
    note_this: '#71cea6',
    count_down: '#ffffff',

    step_zilla_sub_heading: '#6c757d',

    session_category: '#71cea6',

    session_status_proposed: '#71cea6',
    session_status_accepted: '#29b342',
    session_status_decline: '#ff2e5f',
    session_status_not_found: '#c8c8c8',

    
    // Background colors
    background_1: '#535352', // #535352
    background_2: '#535352',
    background_3: '#535352',
    background_4: '#ffffff',
    background_count_down: '#ffffff',
    background_modal: '#fff8ed',

    background_linear_gradient_1: 'linear-gradient(to right, rgba(118, 12, 146, 0.4) 0%, rgba(0, 92, 177, 0.8) 100%)',

    font_awsome_background_1: 'rgba(118, 12, 146, 0.4)',
    font_awsome_background_2: `rgba(0, 92, 177, 0.2)`,

    button_bkgr_1: '#71cea6',
    button_bkgr_2: '#71cea6',
    button_bkgr_3: '#9fe1c5',
    button_bkgr_4: '#ff2e5f',
    button_bkgr_5: '#6c757d',

    image_link_bkgr: '#ffffff',
    input_bkgr_1: '#ffffff',

    // Borders and box shadows
    border_1: '#535352',
    border_2: '#ffffff',

    box_shadow_1: '#535352',
    box_shadow_1_dimmed: 'rgba(81, 39, 255, 0.5)',
    box_shadow_2: '#ffffff',
    box_shadow_3: '#c8c8c8',

    font_awsome_border: `#003acc`,
    font_awsome_box_shadow_1: 'rgba(0, 238, 255, 0.2)',
    font_awsome_box_shadow_2: 'rgba(89, 0, 255, 0.8)',
    font_awsome_box_shadow_3: 'rgba(0, 238, 255, 0.1)',

    input_border_1: '#ced4da',
    input_border_2: '#80a4ff',
    input_border_3: '#71cea6',
    input_box_shadow_1: 'inset 0 1px 1px rgba(0, 0, 0, 0.075)',
    input_box_shadow_2: '0 0 0 calc(0.2 * 16px) rgba(0, 72, 255, 0.25)', //NOTE: when using this note that the size corraltes to font.size_reg (16px)
    form_button_box_shadow_1: 'rgba(0, 238, 255, 0.2)',
    form_button_box_shadow_2: 'rgba(89, 0, 255, 0.8)',
    form_button_border_hover: '#545b62',

    session_category_border: '#71cea6',
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
