import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Btn from '@material-ui/core/Button'
import API from "../../utils/API";
import Articles from "../../components/Articles"
import { Col, Row, Container } from "../../components/Grid";
import { Input } from "../../components/Form";
import axios from 'axios'

class Books extends Component {
  state = {
    articles: [],
    saved: [],
    title: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    axios('/api/articles').then(res => res.data).then(res => this.setState({ saved: res}))
  }

  grabArticles = search => {
    axios.get(search)
    .then(res => API.parseRes(res))
    .then(articles => this.setState({ articles }))
    .catch(err => console.log(err));
  }

  saveArticle = id => {
    axios.post('/api/articles', this.state.articles[id]).then(res => res.data).then(res => 
      this.setState({
        saved: [res, ...this.state.saved]
      })).catch(err => console.log(err))
  }

  deleteArticle = id => {
    axios.delete('/api/articles', {
      params: { id: this.state.saved[id]._id}
    }).then(res => {
      let articles = {...this.state.saved}
      this.setState({saved: articles})
    })
  };

  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const {title, startYear, endYear} = this.state;
    const search = API.articleSearch(title, startYear, endYear)
    this.grabArticles(search)
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1 className="text-center">
                <strong>
                  <i className="fa fa-newspaper-o"></i> New York Times Search</strong>
              </h1>
            </Jumbotron>
            <div className="card">
              <div className="card-header">
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
                    color="primary"
                    variant="raised"
                    disabled={!(this.state.title)}
                    onClick={this.handleFormSubmit}
                  >
                    Search
              </Btn>
                </form>
              </div>
            </div>
          </Col>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            <div className="card">

              <div className="card-header">
                <strong>
                  <i className="fa fa-table"></i> Articles</strong>
              </div>
              <div className="card-body">
                <Articles
                  articles={this.state.articles}
                  saveArticle={this.state.saveArticle}
                />
              </div>
            </div>
          </Col>
          <Col size="md-12 sm-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            <div className="card">

              <div className="card-header">
                <strong>
                  <i className="fa fa-table"></i> Saved Articles</strong>
              </div>
              <div className="card-body">
                <Articles
                  articles={this.state.saved}
                  removeArticle={this.state.deleteArticle}
                  saved
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
