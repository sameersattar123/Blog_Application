import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import appwriteService from "../appwrite/config";
import PostCard from "../components/PostCard";

const AllPost = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {}, []);
  appwriteService.getPosts([]).then((posts) => {
    if (posts) {
      setPosts(posts.documents);
    }
  });

  return (
    <div className="py-8 w-full">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => {
            return (
              <div className="p-2 w-1/4" key={post.$id}>
                <PostCard post={post} />
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default AllPost;
