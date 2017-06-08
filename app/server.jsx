import axios from 'axios';
import React from 'react';
import {renderToString} from 'react-dom/server';
import {createMemoryHistory, match, RouterContext} from 'react-router';
import {Provider} from 'react-redux';
import createRoutes from 'routes';
import configureStore from 'store/configureStore';
import preRenderMiddleware from 'middlewares/preRenderMiddleware';
import ssrAuth from 'middlewares/preRenderAuthenticationMiddleware';
import header from 'components/Meta';
import removeMd from 'remove-markdown';
import summitSocialLogo from 'images/summit2016_social.png';
import {setFeatureOverrides, parseFeatureOverridesFromQuery} from 'features';

const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};

const reversimSocialMediaImage = "http://1.bp.blogspot.com/-dgtZLgzwzpU/UQxClcR57BI/AAAAAAAAMb8/Da3xz5hjLNo/s300/reversim-logo-white.png";

// configure baseURL for axios requests (for serverside API calls)
axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const authenticated = req.isAuthenticated();
  const history = createMemoryHistory();
  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true,
      google: req.user && req.user.google,
      name: req.user && req.user.profile.name,
      oneLiner: req.user && req.user.profile.oneLiner,
      email: req.user && req.user.email,
      isReversimTeamMember: req.user && req.user.isReversimTeamMember,
      picture: req.user && req.user.profile.picture,
      bio: req.user && req.user.profile.bio,
      trackRecord: req.user && req.user.profile.trackRecord,
      linkedin: req.user && req.user.profile.linkedin,
      twitter: req.user && req.user.profile.twitter,
      stackOverflow: req.user && req.user.profile.stackOverflow,
      id: req.user && req.user._id,
      proposals: req.user && req.user.proposals
    }
  }, history);
  const routes = createRoutes(store);

  /*
   * From the react-router docs:
   *
   * This function is to be used for server-side rendering. It matches a set of routes to
   * a location, without rendering, and calls a callback(err, redirect, props)
   * when it's done.
   *
   * The function will create a `history` for you, passing additional `options` to create it.
   * These options can include `basename` to control the base name for URLs, as well as the pair
   * of `parseQueryString` and `stringifyQuery` to control query string parsing and serializing.
   * You can also pass in an already instantiated `history` object, which can be constructured
   * however you like.
   *
   * The three arguments to the callback function you pass to `match` are:
   * - err:       A javascript Error object if an error occured, `undefined` otherwise.
   * - redirect:  A `Location` object if the route is a redirect, `undefined` otherwise
   * - props:     The props you should pass to the routing context if the route matched,
   *              `undefined` otherwise.
   * If all three parameters are `undefined`, this means that there was no route found matching the
   * given location.
   */

  //if user is authenticated, it creates an interceptor
  //that adds current session cookie to next session to be used for server side rendering
  if (authenticated) {
    ssrAuth(req.headers.cookie);
  }

  function escapeTags(state) {
    return JSON.parse(JSON.stringify(state).replace(/<\//g, ""));
  }

  match({routes, location: req.url}, (err, redirect, props) => {
    if (err) {
      res.status(500).json(err);
    } else if (redirect) {
      res.redirect(302, redirect.pathname + redirect.search);
    } else if (props) {
      let featureOverrides = parseFeatureOverridesFromQuery(props.location.query);
      setFeatureOverrides(featureOverrides);

      // This method waits for all render component
      // promises to resolve before returning to browser
      preRenderMiddleware(
        store.dispatch,
        props.components,
        props.params
      )
        .then(() => {
          //after preRendering is complete, we destroy the interceptors
          authenticated ? ssrAuth() : null;
        })
        .then(() => {
          const initialState = escapeTags(store.getState());
          const componentHTML = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>
          );

          let socialTags;
          let baseUrl = req.protocol + '://' + req.get('host');
          if (req.url.match(/\/session\//g)) {
            let title = 'Reversim Summit 2017';
            if (initialState && initialState.proposal && initialState.proposal.currentProposal) {
              title = initialState.proposal.currentProposal.title;
            }

            // add meta tags for social share- session page
            socialTags = [
              // search engines
              {name: "description", content: "Reversim Summit 2017 Session"},

              // twitter
              // { name: "twitter:card", content: "CARD" },
              {name: "twitter:title", content: title},
              {name: "twitter:site", content: "Reversim Summit 2017"},
              {
                name: "twitter:description",
                content: "Reversim Summit 2017 Session"
              },
              {name: "twitter:image:src", content: baseUrl + summitSocialLogo},

              // facebook
              {property: "og:type", content: "article"},
              {property: "og:title", content: title},
              {
                property: "og:description",
                content: "Reversim Summit 2017 Session"
              },
              {property: "og:site_name", content: "Reversim Summit 2017"},
              {property: "og:image", content: baseUrl + summitSocialLogo},
              {property: "og:url", content: baseUrl + req.url},
            ]
          } else {
            socialTags = [
              // twitter
              {name: "twitter:card", content: "CARD"},
              {name: "twitter:title", content: "Reversim Summit 2017"},
              {name: "twitter:site", content: "Reversim Summit 2017"},
              {
                name: "twitter:description",
                content: "The summit is our intention to create a conference for developers by developers. Like in the podcast, we bring you the content we are interested in, and we hope you will be too."
              },
              {name: "twitter:image:src", content: baseUrl + summitSocialLogo},

              // facebook
              {property: "og:type", content: "article"},
              {property: "og:title", content: "Reversim Summit 2017"},
              {
                property: "og:description",
                content: "The summit is our intention to create a conference for developers by developers. Like in the podcast, we bring you the content we are interested in, and we hope you will be too."
              },
              {property: "og:site_name", content: "Reversim Summit 2017"},
              {property: "og:url", content: "http://summit2017.reversim.com"},
              {property: "og:image", content: baseUrl + summitSocialLogo},
            ]
          }

          let headerTags = header(socialTags);

          res.status(200).send(`
        <!doctype html>
        <html ${headerTags.htmlAttributes.toString()}>
        <head>
        ${headerTags.title.toString()}
        ${headerTags.meta.toString()}
        ${headerTags.link.toString()}
        </head>
        <body>
        <div id="app">${componentHTML}</div>
      <script>
      window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      window.__FT_OVERRIDES__ = ${JSON.stringify(featureOverrides)};
      </script>
      <script src="https://maps.googleapis.com/maps/api/js?v=3&libraries=places"></script>
    <script type="text/javascript" charset="utf-8" src="/assets/app.js"></script>
  </body>
  </html>
  `);
        })
        .catch((err) => {
          console.error('Error in server.jsx ' + err);
          console.error('stack: ' + err.stack);
          res.status(500).json(err);
        });
    } else {
      res.sendStatus(404);
    }
  });
}
