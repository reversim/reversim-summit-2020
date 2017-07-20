import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Helmet from 'react-helmet';
import _ from 'lodash';

import config from 'helmconfig.js';

// Remove stylesheets because we do not extract them into a css file
// in development mode
if (__DEVSERVER__) {
  config.link = config.link.filter(l => l.rel !== 'stylesheet');
}

const Meta = ({extraMeta, title}) => (<Helmet
    htmlAttributes={{"lang": "en", "amp": undefined}}
    title={ title || "Reversim Summit 2017"} meta={config.meta.concat(extraMeta || [])}
    link={config.link}
  />
)


export default function header(title, extraMeta) {
  ReactDOMServer.renderToString(<Meta title={title} extraMeta={extraMeta} />);

  return Helmet.rewind();
}
