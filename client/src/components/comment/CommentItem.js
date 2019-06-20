import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  deleteAComment,
  likeAComment,
  unlikeAComment
} from "../../actions/comment";
import { Button, Icon, Rating } from "semantic-ui-react";

const CommentItem = ({
  deleteAComment,
  likeAComment,
  unlikeAComment,
  auth,
  comment: { _id, movieRating, username, date, text, likes, comments }
}) => {
  return (
    <Fragment>
      <div className="cmt-container p-1 my-1 bg-dark">
        <div className="cmt-top">
          <div>
            <h3>
              {username}{" "}
              {auth.isAuthenticated && auth.user.username === username && (
                <Icon name="user circle" />
              )}
            </h3>
            <p>
              Posted on: <Moment format="YYYY/MM/DD">{date}</Moment>
            </p>
          </div>
          <Rating
            className="cmt-rate"
            icon="star"
            rating={movieRating}
            maxRating={10}
            disabled
          />
        </div>
        <div className="cmt-mid">
          <p>{text}</p>
        </div>
        <div className="cmt-bot">
          <Button
            size="tiny"
            inverted
            onClick={() => {
              likeAComment(_id);
            }}
          >
            <Icon name="thumbs up" />
            <span>{likes.length}</span>
          </Button>
          <Button
            size="tiny"
            inverted
            onClick={() => {
              unlikeAComment(_id);
            }}
          >
            <Icon name="thumbs down" />
          </Button>
          <Link to={`/discussion/${_id}`}>
            <Button size="tiny" inverted>
              <Icon name="discussions" />
              <span>{comments.length}</span>
            </Button>
          </Link>

          {auth.isAuthenticated && auth.user.username === username && (
            <Button
              size="tiny"
              color="red"
              inverted
              onClick={() => deleteAComment(_id)}
            >
              <span>
                <Icon name="delete" />
                Delete
              </span>
            </Button>
          )}
        </div>
      </div>
    </Fragment>
  );
};

CommentItem.propTypes = {
  deleteAComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  likeAComment: PropTypes.func.isRequired,
  unlikeAComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteAComment, likeAComment, unlikeAComment }
)(CommentItem);
