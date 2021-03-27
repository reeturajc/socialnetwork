/*
  Author Name  : Reeturaj Chatterjee
  Author Email : chatterjeereeturaj@gmail.com
*/

import React, { useEffect, useState } from "react";
import { Post } from "../models/Post";
import PostCardListItem from "./PostCardListItem";

interface Props {
  posts: Post[];
  onEdit: any;
  onDelete: any;
  onDetails: any;
}

function PostCardList({ posts, onEdit, onDelete, onDetails }: Props) {
  const [sortedPosts, setSortedPosts]: any = useState([]);
  // Sort the posts from latest to old
  useEffect(() => {
    posts.sort((a, b) => {
      const first: any = a.createdAt;
      const second: any = b.createdAt;
      if (new Date(first) > new Date(second)) {
        return -1;
      }
      return 0;
    });
    setSortedPosts(posts);
  }, [posts]);
  return (
    <div>
      {sortedPosts &&
        sortedPosts.length > 0 &&
        sortedPosts.map((post: Post, key: any) => (
          <PostCardListItem
            detailView={false}
            post={post}
            key={post.id}
            onEdit={() => onEdit(post)}
            onDelete={() => onDelete(post)}
            onDetails={() => onDetails(post.id)}
          />
        ))}
    </div>
  );
}

export default PostCardList;
