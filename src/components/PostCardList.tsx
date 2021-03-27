import React, { useEffect, useState } from "react";
import { Post } from "../models/Post";
import PostCardListItem from "./PostCardListItem";

interface Props {
  posts: Post[];
  onEdit: any;
  onDelete: any;
}

function PostCardList({ posts, onEdit, onDelete }: Props) {
  const [sortedPosts, setSortedPosts]:any = useState([]);
  useEffect(() => {
    posts.sort((a,b)=>{
      const first:any = a.createdAt;
      const second:any = b.createdAt;
      if(new Date(first) > new Date(second)){
        return -1;
      }
      return 0;
    })
    setSortedPosts(posts)
  }, [posts])
  return (
    <div>
      {sortedPosts &&
        sortedPosts.length > 0 &&
        sortedPosts.map((post: Post, key: any) => (
          <PostCardListItem
            post={post}
            key={key}
            onEdit={()=>onEdit(post)}
            onDelete={()=>onDelete(post)}
          />
        ))}
    </div>
  );
}

export default PostCardList;
