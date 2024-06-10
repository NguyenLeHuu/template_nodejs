// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
const {insertOne, findOne,updatetOne,pushToArrField,findAll,upsert,deleteFunction} =require("../mongodb/app") ;
import Firebase  from "../services/firebase";
import {sendMail}  from "../services/mail";

module.exports = {
  async store(req,res){
    /* 
        #swagger.tags = ['post']
         #swagger.consumes = ['multipart/form-data']  
          #swagger.parameters['image'] = {
              in: 'formData',
              type: 'file',
              required: 'true',
        } */
    const {
      author,
      phone,
      title,
      description,
      price,
      area,
      utilities,
      address,
      comments,
      is_active,
      view_counts} = req.body

      const images = [];
      req.files.forEach(async file =>  {
        const url = await Firebase.uploadImage(file);
        images.push(url);
      });
      //now.getTime() + 7 * 60 * 60 * 1000
      req.body.time_created = new Date();
      req.body.comments = []
      req.body.images = images

    let rs = await insertOne("post",req.body)
    let acc_id = new ObjectId(req.body.author)
    let account = await findOne("account",{_id:acc_id})
    let new_amount = parseInt(account.amount_spent) + parseInt(req.body.fee)
    await updatetOne("account",
      {filter:{_id:acc_id},data:{amount_spent:new_amount, is_new: account.is_new && false }})

    sendMail("nguyenlehuu1102000@gmail.com","thong bao tu nha tot","Ban da dang tin thanh cong")
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },

  async findAll(req,res){
    /* 
        #swagger.tags = ['post']
        */
    let rs = await findAll("post",{})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async find(req,res){
    /* 
        #swagger.tags = ['post']
        */
    const id = req.params
    let rs = await findOne("post",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async updateCmt(req,res){
    /* 
        #swagger.tags = ['post']
        */
    const id= req.params
    console.log(req.body);
    const {
      account_id,
      displayName,
      photoURL,
      content
    } = req.body
    let rs = await pushToArrField("post","comments",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async update(req,res){
    /* 
        #swagger.tags = ['post']
        */
    const id= req.params
    console.log(req.body);
    const {
      author,
      title,
      description,
      price,
      area,
      list_image_url,
      address,
      time_created,
      comments,
      is_active,
      view_counts} = req.body
    let rs = await updatetOne("post",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async delete(req,res){
    /* 
        #swagger.tags = ['post']
        */
    const id = req.params
    let rs = await deleteFunction("post",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  }
};