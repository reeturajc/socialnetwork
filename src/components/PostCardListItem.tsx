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
import useOnScreen from "../js/useOnScreen";

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
  detailView
}: Props) {
  const ref: any = useRef();
  const isVisible = useOnScreen(ref);

  const [commentsCount, setCommentsCount] = useState(0);
  const [viewCount, setViewCount] = useState(0);

  async function getCommentsCount() {
    const count = await onFetchCommentsCount(post.id);
    setCommentsCount(count);
  }

  useEffect(() => {
    if(detailView){
      getCommentsCount();
    }  
  }, [post])

  useEffect(() => {
    if (isVisible) {
      setViewCount(viewCount + 1);
    }
  }, [isVisible]);

  useEffect(() => {
    if (viewCount === 1) {
      getCommentsCount();
    }
  }, [viewCount]);

  return (
    <div ref={ref}>
      <Card className="shadow mt-5" style={{ borderRadius: "10px" }}>
        {isVisible && (
          <CardImg
            top
            width="100%"
            src={post.image}
            alt={post.title}
            className="p-3"
            onClick={onDetails}
            style={{ cursor: "pointer" }}
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
