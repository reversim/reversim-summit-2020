/*
 * Based on the template in Web Starter Kit : https://github.com/google/web-starter-kit/blob/master/app/index.html
 * To add to the config, add an object:
 * {
 *  type: 'link' | 'meta',
 *  sizes: 'widthxheight',
 *  rel: 'rel value'
 *  filename: <Name of your file'
 * }
 */

// Import all your needed files first (webpack will grab the url)
import favicon from 'images/favicon.png';

import apple57 from 'images/apple-touch-icon-57x57.png';
import apple60 from 'images/apple-touch-icon-60x60.png';
import apple72 from 'images/apple-touch-icon-72x72.png';
import apple76 from 'images/apple-touch-icon-76x76.png';
import apple114 from 'images/apple-touch-icon-114x114.png';
import apple120 from 'images/apple-touch-icon-120x120.png';
import apple144 from 'images/apple-touch-icon-144x144.png';
import apple152 from 'images/apple-touch-icon-152x152.png';
import apple180 from 'images/apple-touch-icon-180x180.png';

import favicon32 from 'images/favicon-32x32.png';
import favicon16 from 'images/favicon-16x16.png';
import favicon96 from 'images/favicon-96x96.png';

import android192 from 'images/android-chrome-192x192.png';
import manifest from 'images/manifest.json';
import maskIcon from 'images/safari-pinned-tab.svg';

import msTile from 'images/mstile-144x144.png';

const config = {
  link: [
    // Add to homescreen for Chrome on Android
    { rel: 'icon', href: favicon },
    { rel: 'icon', type:'image/png', sizes: '32x32', favicon32 },
    { rel: 'icon', type:'image/png', sizes: '16x16', favicon16 },
    { rel: 'icon', type:'image/png', sizes: '96x96', favicon96 },
    { rel: 'icon', type:'image/png', sizes: '192x192', android192 },
    // Add to homescreen for Safari on IOS
    { rel: 'apple-touch-icon', sizes: '57x57', apple57 },
    { rel: 'apple-touch-icon', sizes: '60x60', apple60 },
    { rel: 'apple-touch-icon', sizes: '72x72', apple72 },
    { rel: 'apple-touch-icon', sizes: '76x76', apple76 },
    { rel: 'apple-touch-icon', sizes: '114x114', apple114 },
    { rel: 'apple-touch-icon', sizes: '120x120', apple120 },
    { rel: 'apple-touch-icon', sizes: '144x144', apple144 },
    { rel: 'apple-touch-icon', sizes: '152x152', apple152 },
    { rel: 'apple-touch-icon', sizes: '180x180', apple180 },

    { rel: 'manifest', manifest },
    { rel: 'mask-icon', color: '#5bbad5', maskIcon },

    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed', type: 'text/css' },
    { rel: 'stylesheet', href: '/assets/styles/main.css' }
    // SEO: If your mobile URL is different from the desktop URL,
    // add a canonical link to the desktop page https://developers.google.com/webmasters/smartphone-sites/feature-phones
    // { 'rel': 'canonical', 'href': 'http://www.example.com/' }
  ],
  meta: [
    { charset: 'utf-8' },
    // Setting IE=edge tells Internet Explorer to use the latest engine to render the page and execute Javascript
    { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    //  Meta descriptions are commonly used on search engine result pages to display preview snippets for a given page.
    { name: 'description', content: 'Reversim Summit 2016' },
    // Mobile Safari introduced this tag to let web developers control the viewport's size and scale
    // The width property controls the size of the viewport, the initial-scale property controls
    // the zoom level when the page is first loaded
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
    // Add to homescreen for Chrome on Android
    { name: 'mobile-web-app-capable', content: 'yes' },
    // Add to homescreen for Safari on IOS
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black' },
    { name: 'apple-mobile-web-app-title', content: 'Reversim Summit 2016' },
    // Tile icon for Win8 (144x144 + tile color)
    { name: 'msapplication-TileColor', content: '#da532c' },
    { name: 'theme-color', content: '#ffffff' },
    { name: 'msapplication-TileImage', content: msTile },
  ]
};

export default config;
