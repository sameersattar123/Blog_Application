import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import Container from "../components/Container/Container";
import PostForm from "../components/PostForm/PostForm";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [post, setPosts] = useState(null);

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default EditPost;
