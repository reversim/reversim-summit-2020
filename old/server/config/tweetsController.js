import Twitter from 'twitter';
import { twitter } from './secrets';

const client =  new Twitter(twitter);

function transformTweet(tweet) {
  return {
    created_at: tweet.created_at,
    text: tweet.text,
    hashtags: tweet.entities && tweet.entities.hashtags,
    mentions: tweet.entities && tweet.entities.user_mentions.map(m => m.screen_name),
    urls: tweet.entities && tweet.entities.urls.map(url => { return { display: url.display_url, url: url.url } })
  }
}

export function reversimUserFeed(req, res, next) {
  client.get('statuses/user_timeline', { screen_name: 'reversim', count: 3, trim_user: false }, function(error, tweets, response) {
    if (error) {
      console.log(`Error fetching tweets: ${JSON.stringify(error)}`);
      return res.status(500).send('Something went wrong');
    }

    return res.json(tweets && tweets.map(transformTweet));
  });
}

export default {
  reversimUserFeed
};
