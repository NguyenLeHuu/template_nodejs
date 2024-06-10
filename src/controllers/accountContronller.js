// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
import Firebase  from "../services/firebase";
const jwt = require("jsonwebtoken");
const {insertOne, findOne,updatetOne,findAll,aggregate,deleteFunction,pullfromArrField,pushToArrField} =require("../mongodb/app") ;

var refreshTokens = [];
module.exports = {
  async login(req, res) {
    /* 
        #swagger.tags = ['account']
        */
    try {
      const { email } = req.body;
      let account = await findOne("account",{email})
      let newAccount = {email,
        is_private:false,
        is_new:true,
        amount_spent:0,
        address:"",
        image: req.body.photoURL,
        name:req.body.displayName,
        phone: "",
        favorite_post:[]
      }
          if(!account){
             await insertOne("account",newAccount)
          }
          const accessToken = jwt.sign(
            { account_id: account?account.email:email},
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1000d",
            }
          );
          return Response(res,200,"success",{data: account?account:newAccount, accessToken })
        } 
      catch (error) {
      return Response(res,400,"fail","")
    }
  },

  async store(req,res){
    /* 
        #swagger.tags = ['account']
        */
    const {email,is_owner,is_renter} = req.body
    let account = await findOne("account",{email})

    if(account){
      return Response(res,400,"Tài khoản đã tồn tại","")
    }
    let rs = await insertOne("account",{email,is_owner,is_renter})
      if(rs){
        return Response(res,200,"success",rs)
      }else{
        return Response(res,400,"Tạo tài khoản thất bại","")
      }
  },

  async findAll(req,res){
    /* 
        #swagger.tags = ['account']
        */
    let rs = await findAll("account",{})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async find(req,res){
    /* 
        #swagger.tags = ['account']
        */
    const id = req.params
    let rs = await findOne("account",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async update(req,res){
    /* 
        #swagger.tags = ['account']
        */
       /*
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'false',
        } */
    const id= req.params
    console.log(req.body);
    const {name,phone,address,is_private} = req.body

    const isPrivateBoolean = is_private === 'true' ? true : is_private === 'false' ? false : undefined;
    if (isPrivateBoolean !== undefined) {
      req.body.is_private = isPrivateBoolean;
    }
    if (req.file) {
        console.log("zo");
        const image = await Firebase.uploadImage(req.file);
        req.body.image = image
      }
    let rs = await updatetOne("account",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async delete(req,res){
    /* 
        #swagger.tags = ['account']
        */
    const id = req.params
    let rs = await deleteFunction("account",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async getFavoritePost(req,res){
    /* 
        #swagger.tags = ['favorite post']
        */
    const id = req.params
    const pipeline = [
      {
          $match: { _id: new ObjectId(id) }
      },
      {
          $lookup: {
              from: 'post', // The collection to join
              localField: 'favorite_post', // The field from the account collection
              foreignField: '_id', // The field from the posts collection
              as: 'favoritePostsDetails' // The output array field
          }
      },
    //   {
    //     $unwind: "$favoritePostsDetails" // Unwind the array to handle each post separately
    // },
    {
        $project: {
          _id:0,
          favoritePostsDetails: 1
        }
    }
  ];

    let rs = await aggregate("account",pipeline)

    if(rs){
      return Response(res,200,"success",rs[0].favoritePostsDetails)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async storeFavoritePost(req,res){
    /* 
        #swagger.tags = ['favorite post']
        */
    const id = req.params
    const {push_id} = req.body
    let rs = await pushToArrField("account","favorite_post",{filter:{_id:new ObjectId(id)},data:new ObjectId(push_id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async deleteFavoritePost(req,res){
    /* 
        #swagger.tags = ['favorite post']
        */
    const id = req.params
    const {pull_id} = req.body
    let rs = await pullfromArrField("account","favorite_post",{filter:{_id:new ObjectId(id)},data:new ObjectId(pull_id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
};