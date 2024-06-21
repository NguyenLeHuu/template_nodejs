// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
const jwt = require("jsonwebtoken");
const {insertOne, findOne,updateOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;


module.exports = {
  async checkUserInDB(req, res) {
  },

  async store(req,res){
    /* 
        #swagger.tags = ['auth']
        */
    const {phone,role,} = req.body
    let rs = await insertOne("fasthub_res_khach_hang",{phone,role})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async login(req,res){
    /* 
        #swagger.tags = ['auth']
        */
    const {phone,password} = req.body
    let rs = await findOne("fasthub_res_khach_hang",{phone,password})
    delete rs.password;
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"Not found",)
    }
  },
  async findAll(req,res){
    /* 
        #swagger.tags = ['auth']
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
        #swagger.tags = ['auth']
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
        #swagger.tags = ['auth']
        */
    const id= req.params
    console.log(req.body);
    const {name,age,address} = req.body
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
        #swagger.tags = ['auth']
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