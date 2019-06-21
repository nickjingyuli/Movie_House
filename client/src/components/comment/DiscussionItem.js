import React from "react";
import PropTypes from "prop-types";
import { Icon } from "semantic-ui-react";
import Moment from "react-moment";
import { connect } from "react-redux";

const DiscussionItem = ({ username, text, date, auth }) => {
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
      <div>
        <p>{text}</p>
      </div>
    </div>
  );
};

DiscussionItem.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(DiscussionItem);
