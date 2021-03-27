import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Post } from "../models/Post";

interface Props {
  post?: Post | null;
  onSubmit:any;
  onCancel:any;
}

function PostFormCard({ post,onSubmit,onCancel }: Props) {
  const [id, setId] = useState("");
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    if (post) {
      setId(post.id || "");
      setImage(post.image || "");
      setTitle(post.title || "");
      setDescription(post.description || "");
      setUserId(post.userId || "");
    }
  }, [post]);

  function submit() {
    const postData = { id, image, title, description, userId: "1" };
    onSubmit(postData);
  }

  function cancel() {
    setId("");
    setImage("");
    setTitle("");
    setDescription("");
    setUserId("");
    onCancel();
  }

  return (
    <Card className="shadow mt-5" style={{ borderRadius: "10px" }}>
      <CardBody>
        <Form>
          <FormGroup>
            <Label for="image">Image URL</Label>
            <Input
              type="text"
              name="image"
              id="postImage"
              placeholder="Enter Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="postTitle"
              placeholder="Enter Post Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label for="image">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="postDescription"
              placeholder="Enter Post Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </FormGroup>
        </Form>
      </CardBody>
      <CardFooter>
        <span className="float-right h6 link" onClick={cancel}>
          Cancel
        </span>
        {id ? (
          <span className="float-right mr-3 h6 link" onClick={submit}>
            Update
          </span>
        ) : (
          <span className="float-right mr-3 h6 link" onClick={submit}>
            Post
          </span>
        )}
      </CardFooter>
    </Card>
  );
}

export default PostFormCard;
