import React, { useCallback }  from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from '../Button'
import Input from '../Input'
import appwriteService from "../../appwrite/config"
import { useForm } from 'react-hook-form'
import Select from "../Select"
import RTE from "../RTE"

const PostForm = ({post}) => {

  const {setValue , getValues , register , control , handleSubmit , watch} = useForm({
    defaultValues : {
      title: post?.title || "",
      slug: post?.$id || "",
      content: post?.content || "",
      status: post?.status || "active",
    }
  })

  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData)

  const submit = async(data) => {
    if (post) {
        const file = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null

        if (file) {
            appwriteService.deleteFile(post.featuredImage)
        }

        const dbPost = await appwriteService.updatePost(post.$id , {
          ...data , 
          featuredImage : file ? file.$id : undefined,
        })

        if (dbPost) {
            navigate(`post/${dbPost.$id}`)
        }
    } else {
      const file = await appwriteService.uploadFile(data.image[0])
      if (file) {
        const fileId = file.$id;
        data.featuredImage = fileId;
        const dbPost = await appwriteService.createPost({ ...data, userId: userData.$id });

        if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
        }
      }
    }
  }

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");

return "";
  } , [])

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
          setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
  });
  
    return () => subscription.unsubscribe();
  }, [slugTransform , watch , setValue])
  


  return (
    <div>PostForm</div>
  )
}

export default PostForm