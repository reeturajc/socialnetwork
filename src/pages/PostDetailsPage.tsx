/*
  Author Name  : Reeturaj Chatterjee
  Author Email : chatterjeereeturaj@gmail.com
*/

import moment from "moment";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  ListGroup,
  ListGroupItem,
  Input,
} from "reactstrap";
import PostCardListItem from "../components/PostCardListItem";
import PostFormCard from "../components/PostFormCard";
import { Comment } from "../models/Comment";
import { Post } from "../models/Post";
import { CommentApiRepository } from "../services/comment/CommentApiRepository";
import { PostApiRepository } from "../services/post/PostApiRepository";

interface Props {
  match: any;
  fetchPost: any;
  onDelete: any;
  onUpdate: any;
  history: any;
  onFetchComments: any;
  comments: Comment[];
  onCommentDelete: any;
  onCommentAdd: any;
}

interface State {
  postId: string;
  post: Post | null;
  postFormFlag: number;
  deleteConfirm: boolean;
  commentBody: string;
}

class PostDetailsPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      postId: props.match.params.id,
      post: null,
      postFormFlag: 0,
      deleteConfirm: false,
      commentBody: "",
    };
  }

  componentDidMount = async () => {
    await this.fetchOnePost();
    await this.props.onFetchComments(this.state.post ? this.state.post.id : "");
  };

  fetchOnePost = async () => {
    const { postId }: State = this.state;
    const post = await this.props.fetchPost(postId);
    if (post) {
      this.setState({
        post,
      });
    }
  };

  postEditHandler = (post: Post) => {
    if (post) {
      this.setState({
        postFormFlag: 1,
      });
    }
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  postDeleteConfirm = (post: Post) => {
    this.setState({ deleteConfirm: true });
  };

  postDeleteHandler = async () => {
    await this.props.onDelete(this.state.post);
    this.setState({ deleteConfirm: false });
    this.props.history.goBack();
  };

  postFormSubmitHandler = async (post: Post) => {
    console.log("POST FORM LOG", post);
    this.setState({
      postFormFlag: 0,
    });
    // Update Existing Post
    await this.props.onUpdate(post);
    await this.fetchOnePost();
  };

  postFormCancelHandler = () => {
    this.setState({
      postFormFlag: 0,
    });
  };

  deleteCommentHandler = async (comment: Comment) => {
    const { post } = this.state;
    if (window.confirm("Are you sure you want to delete this comment?")) {
      // DELETE COMMENT HERE
      await this.props.onCommentDelete(post?.id, comment);
      await this.props.onFetchComments(
        this.state.post ? this.state.post.id : ""
      );
      await this.fetchOnePost();
    }
  };

  addCommentHandler = async () => {
    const { post, commentBody } = this.state;
    await this.props.onCommentAdd(post?.id, commentBody);
    this.setState({ commentBody: "" });
    await this.props.onFetchComments(this.state.post ? this.state.post.id : "");
    await this.fetchOnePost();
  };

  render() {
    const { post, deleteConfirm, postFormFlag, commentBody }: any = this.state;
    const { comments } = this.props;
    return (
      <>
        <Modal
          isOpen={deleteConfirm}
          toggle={() => this.setState({ deleteConfirm: !deleteConfirm })}
          className={""}
          centered
        >
          <ModalHeader>Delete</ModalHeader>
          <ModalBody>Are you sure you want to delete this Post?</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={() => this.postDeleteHandler()}>
              Delete
            </Button>
            <Button
              color="secondary"
              onClick={() => this.setState({ deleteConfirm: !deleteConfirm })}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Container className="mb-5" style={{ maxWidth: "600px" }}>
          {postFormFlag !== 0 && (
            <PostFormCard
              post={post}
              onSubmit={(post: Post) => this.postFormSubmitHandler(post)}
              onCancel={this.postFormCancelHandler}
            />
          )}
          {post ? (
            <PostCardListItem
              detailView={true}
              post={post}
              onEdit={this.postEditHandler}
              onDelete={this.postDeleteConfirm}
            />
          ) : (
            <Spinner
              style={{ width: "3rem", height: "3rem" }}
              className="preloader"
            />
          )}
          <Input
            placeholder="Enter Comment"
            type="textarea"
            name="text"
            id="exampleText"
            className={"mt-5"}
            rows={5}
            value={commentBody}
            onChange={(e) => this.setState({ commentBody: e.target.value })}
          />
          <span
            className="float-right mt-2 h6 btn btn-secondary btn-sm"
            onClick={this.addCommentHandler}
          >
            Comment
          </span>
          <ListGroup type="inline" className={"mt-5"}>
            {comments &&
              comments.length > 0 &&
              comments.map((comment: Comment, key: number) => (
                <ListGroupItem key={key}>
                  <p className={"p"}>{comment.commentBody}</p>
                  <span
                    className={"float-left btn btn-secondary btn-sm"}
                    onClick={() => this.deleteCommentHandler(comment)}
                  >
                    Delete
                  </span>
                  <p className={"p float-right"}>
                    {`Created: ${moment(comment.createdAt).format(
                      "D MMM YYYY, h:m A"
                    )}`}
                  </p>
                </ListGroupItem>
              ))}
          </ListGroup>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state: any) => ({
  comments: state.commentReducer.comments,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchPost: (postId: string) => dispatch(PostApiRepository.fetchPost(postId)),
  onUpdate: (postData: Post) =>
    dispatch(PostApiRepository.updatePost(postData)),
  onDelete: (postData: Post) =>
    dispatch(PostApiRepository.deletePost(postData)),
  onFetchComments: (postId: string) =>
    dispatch(CommentApiRepository.fetchComments(postId)),
  onCommentDelete: (postId: string, comment: Comment) =>
    dispatch(CommentApiRepository.deleteComment(postId, comment)),
  onCommentAdd: (postId: string, commentBody: string) =>
    dispatch(CommentApiRepository.createComment(postId, commentBody)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailsPage);
