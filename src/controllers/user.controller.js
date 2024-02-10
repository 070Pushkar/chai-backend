import {asyncHandler}   from "../utils/asyncHandler.js";
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"

import {ApiResponse} from "../utils/ApiResponse.js"

import {uploadOnCloudinary} from "../utils/cloudinary.js"
import mongoose from "mongoose";
/*
const generateAccessAndRefreshTokens = async(userId) =>{
   try {
    
  const user =  await User.findById(userId)
   const accessToken = user.generateAccessToken()
   const refreshToken =  user.generateRefreshToken()
    
   user.refreshToken = refreshToken
  await  user.save({validateBeforeSave: false})
   
  return {accessToken, refreshToken};
  } catch (error) {
    throw new ApiError(500, "something went wrong")
   }

}
  */

const registerUser = asyncHandler ( async (req, res) =>{
 
   // get user details from fronted
   // validation-not empty
   // check if user is already exist: username, email
   // check for image , check for avatar
   // upload them to cloudinary
   // create user object -- create entry in db
   // remove password and refresh token filed from response
   // check for user creation
   // return res
  
 const {fullName, email, username, password} = req.body
  
   if(
     [fullName, email, username,password].some((field) =>
       
     field?.trim() === "")
   ){
     throw new ApiError(400, "all fields are required") 
   }
  const existedUser = User.findOne({
     $or:[{username}, {email}]
   })
    
   if(existedUser){
    throw new ApiError(409, "user with email aur username already exist")
   }

 
   const  avatarLocalPath = req.files?.avatar[0]?.path
   const  coverImageLocalPath = req.files?.coverImage[0]?.path
  
   if(!avatarLocalPath){
     throw new ApiError(400, "avatar is required")
   }

  const avatar =   await  uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath) 
  if(!avatar){
   throw new ApiError(400, "avatar file is required")
  }
  
  const user = await User.create({
    fullName ,
     avatar : avatar.url,
     coverImage: coverImage.url || "",
      email,
      password,
      username : username.toLowerCase()
  })
  
 const createdUser = await  User.findById(user._id).select(
  "-password -refreshToken"
 )
 
 if(!createdUser){
   throw new ApiError(500, "something went wrong")
 }

 return res.status(201).json(
   new ApiResponse(200, createdUser, "user registered successfully")
 )

})

 /*
const loginUser = asyncHandler(async(req, res) =>{


  const {username, email, password} = req.body

  if(!username || !email){
    throw new  ApiError(400, "username or email is required")
  }

 const user = await User.findOne({
    $or:[{username}, {email}]
  })

  if(!user){
    throw new ApiError(404, "user does not exist")
  }
  const isPasswordValid = await user.isPasswordCorrect(password);

  if(!isPasswordValid){
    throw new ApiError(401, "password does not exist")
  }
  

  const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)
  

  const loggedInUser = await User.findById(user._id).
  select("-password  -refreshToken")


  const options = {
    httpOnly: true,
    scure: true,
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken, options)
  .cookie("refreshToken", refreshToken, options)
  .json(
    new ApiResponse(
      200, {
        user: loggedInUser, accessToken, refreshToken
      }, 
      "user login successfully"
    )
  )
})

const logoutUser = asyncHandler(async (req, res) =>{

  
})
 */

export {registerUser}