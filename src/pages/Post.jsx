import React, { useEffect, useState } from "react";
import Container from "../components/Container/Container";
import PostForm from "../components/PostForm/PostForm";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";

const Post = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  const { slug } = useParams();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return (
    <div className="py-8">
      <Container>
        
      </Container>
    </div>
  );
};

export default Post;
