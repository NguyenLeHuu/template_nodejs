// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
const jwt = require("jsonwebtoken");
const {insertOne, findOne,updateOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;


module.exports = {

  async store(req,res){
    /* 
        #swagger.tags = ['account']
        */
    const {phone,password,apartment,address,dob} = req.body
    let rs = await insertOne("fasthub_res_khach_hang",req.body)
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
    let rs = await findAll("fasthub_res_khach_hang",{})
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
    let rs = await findOne("fasthub_res_khach_hang",{_id:new ObjectId(id)})
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
    const id= req.params
    console.log(req.body);
    const {phone,name,address,dob} = req.body
    let rs = await updateOne("fasthub_res_khach_hang",
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
    let rs = await deleteFunction("fasthub_res_khach_hang",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  }
};