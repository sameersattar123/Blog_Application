import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./components/AuthLayout.jsx"
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import AllPost from "./pages/AllPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import AddPost from "./pages/AddPost.jsx";
import Post from "./pages/Post.jsx";

const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>,
    children : [
      {
        path:"/",
        element : <Home/>
      },
      {
        path : "/login",
        element : (
          <AuthLayout authenication={false}>
            <Login/>
          </AuthLayout>
        )
      },
      {
        path : "/signup",
        element : (
          <AuthLayout authenication={false}>
            <Signup/>
          </AuthLayout>
        )
      },
      {
        path : "/all-posts",
        element : (
          <AuthLayout authenication>
            <AllPost/>
          </AuthLayout>
        )
      },
      {
        path : "/add-post",
        element : (
          <AuthLayout authenication>
            <AddPost/>
          </AuthLayout>
        )
      },
      {
        path : "/edit-post/:slug",
        element : (
          <AuthLayout authenication>
            <EditPost/>
          </AuthLayout>
        )
      },
      {
        path : "/post/:slug",
        element : (         
            <Post/>
        )
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
