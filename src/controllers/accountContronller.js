// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
import Firebase  from "../services/firebase";
const jwt = require("jsonwebtoken");
const {insertOne, findOne,updatetOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;

var refreshTokens = [];
module.exports = {
  async login(req, res) {
    /* 
        #swagger.tags = ['account']
         #swagger.description = "return information of account if it exist in DB"
        */
    try {
      const { email } = req.body;
      let account = await findOne("account",{email}) 
          const accessToken = jwt.sign(
            { account_id: account.email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1000d",
            }
          );
          return Response(res,200,"success",{data: account, accessToken })
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
    let rs = await insertOne("account",{email,is_owner,is_renter})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
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
              required: 'true',
        } */
    const id= req.params
    console.log(req.body);
    const {name,age,address} = req.body
    let image =
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy_QPLISHeW6nHqBiEzRi7iMSlDv35C8cj1Q&usqp=CAU";
      if (req.file) {
        image = await Firebase.uploadImage(req.file);
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
  }
};