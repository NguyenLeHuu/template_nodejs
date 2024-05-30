// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
const {insertOne, findOne,updatetOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;

module.exports = {

  async store(req,res){
    /* 
        #swagger.tags = ['favorite']
        */
    const {
      renter_id,
      post_id,
      image_url,
      title,
      description} = req.body
    let rs = await insertOne("favorite",req.body)
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },

  async findAll(req,res){
    /* 
        #swagger.tags = ['favorite']
        */
    let rs = await findAll("favorite",{})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async find(req,res){
    /* 
        #swagger.tags = ['favorite']
        */
    const id = req.params
    let rs = await findOne("favorite",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async update(req,res){
    /* 
        #swagger.tags = ['favorite']
        */
    const id= req.params
    console.log(req.body);
    const {
      renter_id,
      post_id,
      image_url,
      title,
      description} = req.body
    let rs = await updatetOne("favorite",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async delete(req,res){
    /* 
        #swagger.tags = ['favorite']
        */
    const id = req.params
    let rs = await deleteFunction("favorite",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  }
};