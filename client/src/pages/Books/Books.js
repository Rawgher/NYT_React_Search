import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import Btn from '@material-ui/core/Button'
import API from "../../utils/API";
import Articles from "../../components/Articles"
import { Col, Row, Container } from "../../components/Grid";
import { Input } from "../../components/Form";

class Books extends Component {
  state = {
    articles: [],
    saved: [],
    title: "",
    startYear: "",
    endYear: ""
  };

  componentDidMount() {
    this.getSaved();
  }

  getSaved = () => {
    API.getArticle()
      .then(res =>
        this.setState({ articles: res.data, title: "", startYear: "", endYear: "" })
      )
      .catch(err => console.log(err));
  };

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.getSaved())
      .catch(err => console.log(err));
  };

  saveArticle = id => {
    API.saveArticle(id)
      .then(res => this.getSaved())
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    // if (this.state.title) {
    API.articleSearch({
      title: this.state.title,
      startYear: this.state.startYear,
      endYear: this.state.endYear
    })
      .then(response => API.parseArticle(response))
      .then(articles => this.setState({ articles }))
      .catch(err => console.log(err));
    // }
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
                  saveArticle={this.state.saved}
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
