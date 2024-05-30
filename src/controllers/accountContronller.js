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
    let image ="data:image/png;base64,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"
      if (req.file) {
        console.log("zo");
        image = await Firebase.uploadImage(req.file);
      }
      req.body.image = image
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