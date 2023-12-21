import conf from "../conf/conf";
import { Client , ID , Databases , Storage ,  Query} from "appwrite"

export class Service{
  client = new Client();
  databases;
  bucket;

  constructor(){
    this.client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId)

    this.databases = new Databases(this.client)
    this.bucket = new Storage(this.client)
  }

  async createPost({title , content , slug , status , userId , featuredImage}){
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId ,
        conf.appwriteCollectionId ,
        slug,
        {
          title, content , slug , status , userId ,featuredImage
        }
      )
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }
  async updatePost(slug , {title , content , status ,  featuredImage}){
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId ,
        conf.appwriteCollectionId ,
        slug,
        {
          title, content , status ,featuredImage
        }
      )
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }
  async deletePost(slug){
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId ,
        conf.appwriteCollectionId ,
        slug
      )
      return true
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
      return false;
    }
  }

  async getPost(){
   try {
     return await this.databases.getDocument(
      conf.appwriteDatabaseId ,
      conf.appwriteCollectionId ,
      slug
     )
   } catch (error) {
    console.log("Appwrite serive :: getPost :: error", error);
    return false;
   } 
  }

  async getPosts(queries = [Query.equal("status" , "active")]){
   try {
    return await this.databases.listDocuments(
      conf.appwriteDatabaseId ,
      conf.appwriteCollectionId ,
      queries
    )
   } catch (error) {
    console.log("Appwrite serive :: getPosts :: error", error);
   } 
  }

  // file upload services

  async uploadFile(file){
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      )
    } catch (error) {
    console.log("Appwrite serive :: uploadFiles :: error", error);
    }
  }
  

  async deleteFile(fileId){
    try {
       await this.bucket.deleteFile(
        conf.appwriteBucketId,
        fileId
      )
      return true
    } catch (error) {
      console.log("Appwrite serive :: deleteFiles :: error", error);
      return false;
    }
  }

  getFilePreview(fileId){
      return this.bucket.getFilePreview(
      conf.appwriteBucketId,
      fileId
    )
  }

  
}

const service = new Service();

export default service;