// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
const {insertOne, findOne,updatetOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;

module.exports = {
  async store(req,res){
    /* 
        #swagger.tags = ['post']
        */
    const {
      author,
      title,
      description,
      price,
      area,
      list_image_url,
      address,
      comments,
      time_created,
      is_active,
      view_counts} = req.body
    let rs = await insertOne("post",req.body)
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