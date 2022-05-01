import { TwitterApi } from 'twitter-api-v2';
import 'dotenv/config';



//Pulling our api keys from the .env file
const apiKey = process.env.API_KEY
const apiSecret = process.env.API_KEY_SECRET
const accessToken = process.env.ACCESS_TOKEN
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET
const bearerToken = process.env.BEARER_TOKEN
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;


//This function decides if we will be authenticating using bearer token or api keys
const authMethod = () => {
  if(apiKey && apiSecret && accessToken && accessTokenSecret) {
    console.log('Authenticating with API Keys');
    // const auth = {
    //   appKey: apiKey,
    //   appSecret: apiSecret,
    //   accessToken: accessToken,
    //   accessSecret: accessTokenSecret,
    // };
    const auth = {
      clientId: clientId,
      clientSecret: clientSecret,
    }
    return auth;
  } else if(bearerToken){
    console.log('Authenticating with Bearer Token');
    const auth = bearerToken
    return auth;
  } else {
    console.log('Missing API keys. Please check your .env file');
  }
}


//defining our twitter object. we interact with the api using twitter.method-here()
//A list of possible endpoints (methods) can be found here:
//https://developer.twitter.com/en/docs/authentication/guides/v2-authentication-mapping
const auth = authMethod();
const auth2 = {
  appKey: apiKey,
  appSecret: apiSecret,
  accessToken: accessToken,
  accessSecret: accessTokenSecret,
}
console.log(auth2);
const twitter = new TwitterApi(auth2);
console.log(twitter);

twitter.v2.singleTweet('1507372124779995138').then((val) => {
  console.log(val);
});


twitter.v2.tweet('this is a test tweet').then((res) => {
  console.log('✅ Success',res);
}).catch((err) => {
  console.log('❌ error', err);
})
