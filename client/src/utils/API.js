export default {
  // function that creates the search query based on what it is given from the input
  articleSearch: function(title, startYear, endYear) {
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    queryURL += "q=" + title + "&api-key=xpMlxqgyxGMWTD0xZD13aisInTGMoGme";

    if (startYear) {
      queryURL += "&begin_date" + startYear + "0101";
    }

    if (endYear) {
      queryURL += "&end_date" + endYear + "1231";
    }

    return queryURL;
  },

  // function that parses through the response data that is given from the function above
  parseRes: function(response) {
    const docs = response.data.response.docs;
    console.log(docs);
    const articles = [];
    docs.forEach(a => {
      articles.push({
        title: a.headline.main,
        date: a.pub_date,
        url: a.web_url,
        snippet: a.snippet
      });
    });
    return articles;
  }
};
