import React from 'react'
import { useDispatch } from 'react-redux'
import { Link , useNavigate} from 'react-router-dom'
import {login as authLogin} from "../store/authSlice"
import {useForm} from "react-hook-form"
import { useState } from 'react'
import authService from "../appwrite/auth"
import Button from './Button'
import Logo from './Logo'
import Input from './Input'

const Login = () => {
  return (
    <div>Login</div>
  )
}

export default Login