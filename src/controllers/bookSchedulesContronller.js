// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
const {insertOne, findOne,updatetOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;

module.exports = {
  async store(req,res){
    /* 
        #swagger.tags = ['schedule']
        */
    const {post_id,
      address,
      owner_id,
      owner_name,
      renter_id,
      renter_name,
      time,
      status} = req.body
    let rs = await insertOne("schedule",{email,is_owner,is_renter})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },

  async findAll(req,res){
    /* 
        #swagger.tags = ['schedule']
        */
    let rs = await findAll("schedule",{})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async find(req,res){
    /* 
        #swagger.tags = ['schedule']
        */
    const id = req.params
    let rs = await findOne("schedule",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async update(req,res){
    /* 
        #swagger.tags = ['schedule']
        */
    const id= req.params
    console.log(req.body);
    const {status} = req.body
    let rs = await updatetOne("schedule",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async delete(req,res){
    /* 
        #swagger.tags = ['schedule']
        */
    const id = req.params
    let rs = await deleteFunction("schedule",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  }
};