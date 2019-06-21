import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DiscussionItem from "./DiscussionItem";
import { Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { getComment } from "../../actions/comment";
import Spinner from "../layout/Spinner";

const Discussion = ({
  match: {
    params: { id }
  },
  // username,
  // text,
  // date,
  // discussions,
  comment: { currComment, loading },
  getComment
}) => {
  const [formData, setFormData] = useState("");

  useEffect(() => {
    getComment(id);
  }, [id]);

  const handleChange = e => {
    setFormData(e.target.value);
  };

  const handleSubmit = () => {};

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <div className="bg-darker">
        <div className="dsc-top">
          <DiscussionItem
            username={currComment.username}
            text={currComment.text}
            date={currComment.date}
          />
        </div>

        <div className="dsc-mid">
          <textarea
            placeholder="Write something..."
            className="cmt-form bg-dark"
            onChange={e => handleChange(e)}
            value={formData}
          />
          <div className="add-cmt">
            <Button
              inverted
              onClick={() => {
                handleSubmit();
              }}
            >
              <span>Submit</span>
            </Button>
          </div>
        </div>

        <div className="dsc-bot">
          {currComment.comments.map(item => (
            <DiscussionItem
              username={item.username}
              date={item.date}
              text={item.text}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Discussion.propTypes = {
  username: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  discussion: PropTypes.array.isRequired,
  comment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { getComment }
)(Discussion);
