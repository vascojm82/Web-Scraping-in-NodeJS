const mongoose = require("mongoose");
const cheerio  = require("cheerio");
const request  = require("request-promise");
const RedditArticle = require("./redditArticle");     //Mongoose Schema

//mongodb://vascojm:kof99kis@ds131814.mlab.com:31814/reddit-scrapper-db

async function connectToMongoDb() {
    await mongoose.connect(
      "mongodb://vascojm:kof99kis@ds131814.mlab.com:31814/reddit-scrapper-db",
      { userNewUrlParser: true}
    );
    console.log("Connected to Mlab");
}

async function scrapeReddit(){
  const html = await request.get("https://www.reddit.com");
  const $ = await cheerio.load(html);
  const titles = $("h2");

  titles.each(async (i, element) => {
    const title = $(element).text();
    console.log(title);
    const redditArticle = new RedditArticle({
      title: title
    });

    await redditArticle.save();
  });
}

async function main(){
  await connectToMongoDb();
  await scrapeReddit();
}

main();
