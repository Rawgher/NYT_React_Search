import React, { Component } from 'react'

import Btn from '@material-ui/core/Button'

class Article extends Component {
    clicked = id => {
        this.props.saved ? this.props.deleteArticle(id) : this.props.saveArticle(id);
    }

    showArticles = () => {
        const { articles } = this.props;
        return articles.map((a, id) => (
            <div key={id}>
                <h3>{a.title}</h3>
                <Btn
                    color="primary"
                    variant="raised"
                    onClick={
                        this.props.saved ? this.clicked.bind(this, id) : this.clicked.bind(this, id)
                    }>
                    {this.props.saved ? 'Delete' : 'Save'}
                </Btn>
            </div>
        ));
    };
    render() {
        return (
            <div>
                {this.props.articles && this.showArticles()}
            </div>
        )
    }

}


export default Article