import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Btn from '@material-ui/core/Button'
import API from "../../utils/API";
import Articles from "../../components/Articles"
import { Col, Row, Container } from "../../components/Grid";
import { Input } from "../../components/Form";
import Footer from "../../components/Footer";
import axios from 'axios';

const styles = {
  padTop: {
    paddingTop: '30px'
  }
}

class Search extends Component {
  state = {
    articles: [],
    saved: [],
    title: "",
    startYear: "",
    endYear: ""
  };

  // function for grabbing all the saved data
  componentDidMount() {
    axios('/api/articles').then(res => res.data).then(res => this.setState({ saved: res }))
  }

  // function used to grab all NYT articles. grabs helper function from utils/API
  grabArticles = search => {
    axios.get(search)
      .then(res =>
        API.parseRes(res))
      .then(articles => this.setState({ articles }))
      .catch(err => console.log(err));
  }

  // function used to add articles to the saved array
  saveArticle = id => {
    axios.post('/api/articles', this.state.articles[id]).then(res => res.data).then(res =>
      this.setState({
        saved: [res, ...this.state.saved]
      })).catch(err => console.log(err))
  }

  // handling input sections for use by the form submit function
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handles the state changes. then uses these in the helper API function to start a search
  handleFormSubmit = event => {
    event.preventDefault();
    const { title, startYear, endYear } = this.state;
    const search = API.articleSearch(title, startYear, endYear)
    this.grabArticles(search)
  };

  render() {
    return (
      <div>
        <Container fluid>
          <Row>
            <Col size="md-12 sm-12">
              <Jumbotron>
                <h1 className="text-center">
                  <strong>
                    <i className="fa fa-newspaper-o"></i> New York Times Search</strong>
                </h1>
              </Jumbotron>
              <div className="card">
                <div style={{ color: "white" }} className="card-header bg-primary">
                  <strong>
                    <i className="fa fa-list-alt"></i> Search Parameters</strong>
                </div>
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label for="search">Search Term:</label>
                      <Input
                        value={this.state.title}
                        onChange={this.handleInputChange}
                        name="title"
                      />
                    </div>
                    <div className="form-group">
                      <label for="start-year">Start Year (Optional):</label>
                      <Input
                        value={this.state.startYear}
                        onChange={this.handleInputChange}
                        name="startYear"
                      />
                    </div>
                    <div className="form-group">
                      <label for="end-year">End Year (Optional):</label>
                      <Input
                        value={this.state.endYear}
                        onChange={this.handleInputChange}
                        name="endYear"
                      />
                    </div>
                    <Btn
                      color="secondary"
                      variant="contained"
                      disabled={!(this.state.title)}
                      onClick={this.handleFormSubmit}
                    >
                      Search
              </Btn>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col size="md-12 sm-12">
              <div style={styles.padTop}>
                <div className="card">

                  <div style={{ color: "white" }} className="card-header bg-primary">
                    <strong>
                      <i className="fa fa-table"></i> Articles</strong>
                  </div>
                  <div className="card-body">
                    <Articles
                      articles={this.state.articles}
                      saveArticle={this.saveArticle}
                    />
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    );
  }
}

export default Search;
