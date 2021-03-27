import React, { Component } from "react";
import { connect } from "react-redux";
import { Post } from "../models/Post";
import { PostApiRepository } from "../services/post/PostApiRepository";
import "../css/PostListPage.css";

import {
  Spinner,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "reactstrap";
import PostCardList from "../components/PostCardList";
import PostFormCard from "../components/PostFormCard";

interface Props {
  posts: Post[];
  onFetch: any;
  onCreate: any;
  onUpdate: any;
  onDelete: any;
  history:any;
}

interface State {
  selectedPost: Post | null;
  postFormFlag: number;
  deleteConfirm: boolean;
}

class PostListPage extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      selectedPost: null,
      postFormFlag: 0,
      deleteConfirm: false,
    };
  }

  componentDidMount = async () => {
    await this.props.onFetch();
  };

  postEditHandler = (post: Post) => {
    if (post) {
      this.setState({
        selectedPost: post,
        postFormFlag: 1,
      });
    }
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  postDeleteConfirm = (post: Post) => {
    this.setState({ selectedPost: post, deleteConfirm: true });
  };

  postDeleteHandler = async () => {
    await this.props.onDelete(this.state.selectedPost);
    this.setState({ deleteConfirm: false });
  };

  postFormSubmitHandler = async (post: Post) => {
    this.setState({
      selectedPost: null,
      postFormFlag: 0,
    });
    if (post && post.id === "") {
      // Create New Post
      await this.props.onCreate(post);
    } else if (post && post.id !== "") {
      // Update Existing Post
      await this.props.onUpdate(post);
    }
  };

  postFormCancelHandler = () => {
    this.setState({
      selectedPost: null,
      postFormFlag: 0,
    });
  };

  postAddHandler = () => {
    this.setState({
      selectedPost: null,
      postFormFlag: 1,
    });
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  gotoPostDetails = (postId:string) => {
    this.props.history.push(`/post-details/${postId}`);
  }

  render() {
    const { selectedPost, postFormFlag, deleteConfirm } = this.state;
    const { posts } = this.props;
    return (
      <div>
        <Container className="mb-5" style={{ maxWidth: "600px" }}>
          <Button
            id="addPostBtn"
            onClick={this.postAddHandler}
            style={{ display: "none" }}
          />
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
          {postFormFlag !== 0 && (
            <PostFormCard
              post={selectedPost}
              onSubmit={(post: Post) => this.postFormSubmitHandler(post)}
              onCancel={this.postFormCancelHandler}
            />
          )}
          <PostCardList
            posts={posts}
            onEdit={(post: Post) => this.postEditHandler(post)}
            onDelete={this.postDeleteConfirm}
            onDetails={(postId:string)=>this.gotoPostDetails(postId)}
          />
        </Container>
        {posts.length === 0 && (
          <Spinner
            style={{ width: "3rem", height: "3rem" }}
            className="preloader"
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => ({
  posts: state.postReducer.posts,
});

const mapDispatchToProps = (dispatch: any) => ({
  onFetch: () => dispatch(PostApiRepository.fetchPosts()),
  onCreate: (postData: Post) =>
    dispatch(PostApiRepository.createPost(postData)),
  onUpdate: (postData: Post) =>
    dispatch(PostApiRepository.updatePost(postData)),
  onDelete: (postData: Post) =>
    dispatch(PostApiRepository.deletePost(postData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostListPage);
