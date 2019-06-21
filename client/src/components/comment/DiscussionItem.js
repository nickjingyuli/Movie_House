import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "semantic-ui-react";
import Moment from "react-moment";
import { connect } from "react-redux";
import { deleteDis } from "../../actions/comment";

const DiscussionItem = ({
  username,
  text,
  date,
  auth,
  cmtId,
  disId,
  deleteDis
}) => {
  return (
    <div className="cmt-container bg-dark p-1">
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
      </div>
      <div className="cmt-mid my-1">
        <p>{text}</p>
      </div>
      {disId && (
        <div>
          <Button
            inverted
            color="red"
            onClick={() => {
              deleteDis(cmtId, disId);
            }}
          >
            <span>
              <Icon name="delete" />
              Delete
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

DiscussionItem.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired,
  cmtId: PropTypes.string.isRequired,
  deleteDis: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteDis }
)(DiscussionItem);
