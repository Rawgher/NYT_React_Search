## NYT_React_Search

A tool built which allows users to search the New York Times for articles related to their search parameter. They can also set which year they would like the results to come from. If nothing is entered, the most recent articles will appear below the search form. Clicking an articles title will take the user to the actual article page. The user can save articles and view them on the "saved articles" page. The user can then delete the article from the mongo database if they would like to.

You can visit the deployed project [here](https://peaceful-headland-96719.herokuapp.com/)

## Screenshots

![Search Page](/client/public/gifs/search_page.gif)
![Saved Page](/client/public/gifs/saved_page.gif)

## Tech/Libraries Used

Built with:

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/en/)
- [Express.js](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Material UI](https://material-ui.com/)
- New York Times API

## Features

- NYT API search engine
- Saving articles
- Viewing articles

## Installation

Clone this repo to your desktop and run `yarn install` to install all the dependencies.

Additionally, if you want to run the site locally using sample user data, you can run `yarn seed` to create users in your MongoDB.

## Usage

To run the page locally in the browser, simply run the command `yarn start`.
