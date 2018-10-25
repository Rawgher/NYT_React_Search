import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

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
    if (this.state.title) {
      API.saveArticle({
        title: this.state.title,
        startYear: this.state.startYear,
        endYear: this.state.endYear
      })
        .then(res => this.getSaved())
        .catch(err => console.log(err));
    }
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
                  <FormBtn
                    disabled={!(this.state.title)}
                    onClick={this.handleFormSubmit}
                  >
                    Search
              </FormBtn>
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
              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <ListItem key={article._id}>
                      <Link to={"/articles/" + article._id}>
                        <strong>
                          {article.title} by {article.startYear}
                        </strong>
                      </Link>
                      <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                  <h3>No Results to Display</h3>
                )}
                </div>
                </div>
          </Col>
        </Row>
      </Container>
        );
      }
    }
    
    export default Books;
