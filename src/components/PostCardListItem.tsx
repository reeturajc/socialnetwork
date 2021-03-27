import React from "react";
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

interface Props {
  post: Post;
  onEdit: any;
  onDelete: any;
}

function PostCardListItem({ post, onEdit, onDelete }: Props) {
  return (
    <Card className="shadow mt-5" style={{ borderRadius: "10px" }}>
      <CardImg
        top
        width="100%"
        src={post.image}
        alt={post.title}
        className="p-3"
      />
      <CardBody>
        <CardTitle tag="h5">{post.title}</CardTitle>
        <p>{`Created: ${moment(post.createdAt).format(
          "D MMM YYYY, h:m A"
        )}`}</p>
        <p>{`Last Updated: ${moment(post.updatedAt).format(
          "D MMM YYYY, h:m A"
        )}`}</p>
        <CardText>{post.description}</CardText>
      </CardBody>
      <CardFooter>
        <span className="float-left h6">4 Comments</span>
        <span className="float-right h6 link" onClick={onDelete}>
          Delete
        </span>
        <span className="float-right mr-3 h6 link" onClick={onEdit}>
          Edit
        </span>
      </CardFooter>
    </Card>
  );
}

export default PostCardListItem;
