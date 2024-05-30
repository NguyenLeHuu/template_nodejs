// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
const {insertOne, findOne,updatetOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;

module.exports = {
  async store(req,res){
    /* 
        #swagger.tags = ['config']
        */
    const {email,is_owner,is_renter} = req.body
    let rs = await insertOne("config",{email,is_owner,is_renter})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },

  async findAll(req,res){
    /* 
        #swagger.tags = ['config']
        */
    let rs = await findAll("config",{})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async find(req,res){
    /* 
        #swagger.tags = ['config']
        */
    const id = req.params
    let rs = await findOne("config",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async update(req,res){
    /* 
        #swagger.tags = ['config']
        */
    const id= req.params
    console.log(req.body);
    const {name,age,address} = req.body
    let rs = await updatetOne("config",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async delete(req,res){
    /* 
        #swagger.tags = ['config']
        */
    const id = req.params
    let rs = await deleteFunction("config",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  }
};