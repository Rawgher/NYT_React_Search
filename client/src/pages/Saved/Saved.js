import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import Articles from "../../components/Articles"
import Footer from "../../components/Footer";
import axios from 'axios'

class Saved extends Component {
  state = {
    articles: [],
    saved: []
  };

  componentDidMount() {
    axios('/api/articles').then(res => res.data).then(res => this.setState({ saved: res }))
  }

  deleteArticle = id => {
    axios.delete('/api/articles', {
      params: { id: this.state.saved[id]._id }
    }).then(res => {
      let articles = [...this.state.saved]
      this.setState({ saved: articles })
    }).then(function () {
      window.location.reload();
    })
  };

  render() {
    return (
      <div>
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>
                Saved Articles
              </h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-12">
            <div className="card">

              <div style={{ color: "white" }} className="card-header bg-primary">
                <strong>
                  <i className="fa fa-table"></i> Saved Articles</strong>
              </div>
              <div className="card-body">
                <Articles
                  articles={this.state.saved}
                  deleteArticle={this.deleteArticle}
                  saved
                />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Search</Link>
          </Col>
        </Row>
      </Container>
      <div className="fixed-bottom">
      <Footer />
      </div>
      </div>
    );
  }
}

export default Saved;
