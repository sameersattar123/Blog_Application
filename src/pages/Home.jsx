import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config";



const Home = () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
      appwriteService.getPosts().then((post) => {
        if (post) {
            setPosts(post.documents)
        }
      })
  }, [])
  
  return (
    <div>
      
    </div>
  )
}

export default Home