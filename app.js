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


let retweetList = [];


//This function decides if we will be authenticating using bearer token or api keys
const authMethod = () => {
  if(apiKey && apiSecret && accessToken && accessTokenSecret) {
    console.log('Authenticating with API Keys');
    const auth = {
      appKey: apiKey,
      appSecret: apiSecret,
      accessToken: accessToken,
      accessSecret: accessTokenSecret,
    };
    return auth;
  }  else {
    console.log('Missing API keys. Please check your .env file');
  }
}


//defining our twitter object. we interact with the api using twitter.method-here()
//A list of possible endpoints (methods) can be found here:
//https://developer.twitter.com/en/docs/authentication/guides/v2-authentication-mapping
const auth = authMethod();
const twitter = new TwitterApi(auth);


const searchQ = "(programming) OR (kind words) OR (best friend) -is:retweet -is:reply"

function searchTag() {
  twitter.v2.search(searchQ, { 'media.fields': 'url' }).then((res) => {
    for(let tweet in res.data.data){
      retweetList.push(res.data.data[tweet].id);
    }
    console.log('✅ -', res.data.meta.result_count, 'posts added to retweet list');
    retweetTweets();
  })
}

function retweetTweets() {
  if(retweetList.length < 1){
    searchTag();
  }
  if(retweetList.length > 0){
  twitter.v2.retweet('1520144044663484416', retweetList[0]).then((res) => {
    if(res.data.retweeted == true){
      console.log('✅ - Retweeted Tweet:', retweetList[0]);
    } else{
      console.log('❌ - Failed to retweet (perhaps the tweet was deleted?)', retweetList[0])
    }
  })

  retweetList.shift();

  }
}



retweetTweets();
setInterval(retweetTweets, 480000);





//sendTestTweet();                //
function sendTestTweet(){
twitter.v2.tweet('this is a second test tweet').then((res) => {
  console.log('✅ Success',res);
}).catch((err) => {
  console.log('❌ error', err);
})
}
