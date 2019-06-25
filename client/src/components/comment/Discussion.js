import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import DiscussionItem from "./DiscussionItem";
import { Button, Loader } from "semantic-ui-react";
import { connect } from "react-redux";
import { getComment, addDis } from "../../actions/comment";

const Discussion = ({
  match: {
    params: { id }
  },
  comment: { currComment, currLoading },
  getComment,
  addDis
}) => {
  const [formData, setFormData] = useState("");

  useEffect(() => {
    getComment(id);
  }, [getComment, id]);

  const handleChange = e => {
    setFormData(e.target.value);
  };

  const handleSubmit = () => {
    addDis({ cmtId: id, text: formData });
    setFormData("");
  };

  return currLoading ? (
    <Loader active inline="centered" />
  ) : (
    <Fragment>
      <div className="bg-darker p-1 bd-radius-big">
        <div className="dis-top">
          <DiscussionItem
            username={currComment.username}
            text={currComment.text}
            date={currComment.date}
            cmtId={currComment._id}
            disId={null}
          />
        </div>

        <div className="dis-mid my-1">
          <h1 className="large">Make a comment</h1>
          <textarea
            placeholder="Write something..."
            className="cmt-form bg-dark my-1"
            onChange={e => handleChange(e)}
            value={formData}
          />
          <Button
            inverted
            onClick={() => {
              handleSubmit();
            }}
          >
            <span>Submit</span>
          </Button>
        </div>

        <div className="dis-bot">
          {currComment.comments.map(item => (
            <DiscussionItem
              key={item._id}
              username={item.username}
              date={item.date}
              text={item.text}
              cmtId={currComment._id}
              disId={item._id}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

Discussion.propTypes = {
  comment: PropTypes.object.isRequired,
  addDis: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { getComment, addDis }
)(Discussion);
