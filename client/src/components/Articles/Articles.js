import React, { Component } from 'react'
import "./Articles.css"
import { withStyles } from '@material-ui/core/styles';
import Btn from '@material-ui/core/Button'
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const styles = theme => ({
    typography: {
        margin: theme.spacing.unit * 2,
    },
});

class Article extends Component {


    state = {
        anchorEl: null,
    };


    clicked = (event,id) => {
        event.preventDefault();
        //  this.props.saved ? this.props.deleteArticle(id) : this.props.saveArticle(id);

        if (!this.props.saved) {
            this.props.saveArticle(id)
            this.setState({
                anchorEl: event.currentTarget,
            });
        } else {
            this.props.deleteArticle(id)
        }
    }

    handleClick = event => {
        this.setState({
            anchorEl: event.currentTarget,
        });
    };


    handleClose = () => {
        this.setState({
            anchorEl: null,
        });
    };

    showArticles = () => {

        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);

        const { articles } = this.props;
        return articles.map((a, id) => (
            <div key={id} className="spacer">
                <a href={a.url} target="_blank" rel="noreferrer noopener"><h3>{a.title}</h3></a>
                <h6>{a.snippet}</h6>
                <Btn
                    aria-owns={open ? 'simple-popper' : null}
                    aria-haspopup="true"
                    variant="contained"
                    color="secondary"
                    onClick={ (event)=>{this.clicked(event, id)}}>
                    {this.props.saved ? 'Delete' : 'Save'}
                </Btn>
                <Popover
                    id="simple-popper"
                    open={open}
                    anchorEl={anchorEl}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <Typography className={classes.typography} >{this.props.saved ? 'Article Deleted!' : 'Article Saved!'}</Typography>
                </Popover>
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

Article.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Article)