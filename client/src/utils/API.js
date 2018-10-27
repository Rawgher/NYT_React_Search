import axios from "axios";

export default {

  articleSearch: function(title, startYear, endYear) {
    let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?";

    queryURL += "api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=" + title;

    if (startYear) {
      queryURL += "&begin_date" + startYear + '0101';
    }

    if (endYear) {
      queryURL += "&end_date" + endYear + "1231";
    }

    console.log(queryURL)
    return axios.get(queryURL)
      
  },
  parseRes: function(response) {
    const docs = response.data.response.docs;
    const articles = [];
    docs.forEach(a => {
      articles.push({
        title: a.headline.main,
        date: a.pub_date,
        url: a.web_url
      })
    })
    return articles;

  }
};
