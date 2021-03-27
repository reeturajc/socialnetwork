/*
  Author Name  : Reeturaj Chatterjee
  Author Email : chatterjeereeturaj@gmail.com
*/

import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardImg,
  CardText,
  CardTitle,
} from "reactstrap";
import moment from "moment";
import { Post } from "../models/Post";
import { connect } from "react-redux";
import { CommentApiRepository } from "../services/comment/CommentApiRepository";
import useOnScreen from "../hooks/useOnScreen";

interface Props {
  post: Post;
  onEdit: any;
  onDelete: any;
  onDetails?: any;
  onFetchCommentsCount: any;
  detailView?: boolean;
}

function PostCardListItem({
  post,
  onEdit,
  onDelete,
  onDetails,
  onFetchCommentsCount,
  detailView,
}: Props) {
  const ref: any = useRef();
  // Used custom hook to get visiblility information
  const isVisible = useOnScreen(ref);

  const [commentsCount, setCommentsCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Get comments count for the the given post
  async function getCommentsCount() {
    const count = await onFetchCommentsCount(post.id);
    setCommentsCount(count);
  }

  // Fetch comments count only if the component is rendered for detailView
  // To prevent 429:Too Many Request Error from Server
  useEffect(() => {
    if (detailView) {
      getCommentsCount();
    }
  }, [post]);

  // Get log of count whenever the component is visible in viewport
  useEffect(() => {
    if (isVisible) {
      setViewCount(viewCount + 1);
    }
  }, [isVisible]);

  // Call comments API only for the first time when component is visible in viewport
  // To prevent 429:Too Many Request Error from Server
  useEffect(() => {
    if (viewCount === 1) {
      getCommentsCount();
    }
  }, [viewCount]);

  return (
    <div ref={ref}>
      <Card className="shadow mt-5" style={{ borderRadius: "10px" }}>
        {/* Load Image only when the component is visible */}
        {isVisible && (
          <CardImg
            top
            width="100%"
            src={post.image}
            alt={post.title}
            className="p-3"
            onClick={onDetails}
            style={{ cursor: "pointer", display: loading ? "none" : "block" }}
            onLoad={() => setLoading(false)}
          />
        )}
        {isVisible && (
          <CardImg
            top
            width="100%"
            src={
              "https://i0.wp.com/codemyui.com/wp-content/uploads/2017/03/loading-animation.gif?fit=880%2C440&ssl=1"
            }
            alt={post.title}
            className="p-3"
            onClick={onDetails}
            style={{ cursor: "pointer", display: loading ? "block" : "none" }}
          />
        )}
        <CardBody>
          <CardTitle tag="h5" onClick={onDetails} style={{ cursor: "pointer" }}>
            {post.title}
          </CardTitle>
          <p>{`Created: ${moment(post.createdAt).format(
            "D MMM YYYY, h:m A"
          )}`}</p>
          <p>{`Last Updated: ${moment(post.updatedAt).format(
            "D MMM YYYY, h:m A"
          )}`}</p>
          <CardText>{post.description}</CardText>
        </CardBody>
        <CardFooter>
          <span
            className="float-left h6"
            onClick={onDetails}
            style={{ cursor: "pointer" }}
          >
            {commentsCount && commentsCount > 1
              ? `${commentsCount} Comments`
              : `${commentsCount} Comment`}
          </span>
          {post.userId === "1" ? (
            <>
              <span className="float-right h6 link" onClick={onDelete}>
                Delete
              </span>
              <span className="float-right mr-3 h6 link" onClick={onEdit}>
                Edit
              </span>
            </>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  onFetchCommentsCount: (postId: string) =>
    dispatch(CommentApiRepository.fetchCommentsCount(postId)),
});

export default connect(null, mapDispatchToProps)(PostCardListItem);
