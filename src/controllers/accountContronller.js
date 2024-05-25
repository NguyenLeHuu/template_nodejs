// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
const jwt = require("jsonwebtoken");
const {insertOne, findOne,updatetOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;

var refreshTokens = [];
module.exports = {
  async checkUserInDB(req, res) {
  },

  async store(req,res){
    /* 
        #swagger.tags = ['account']
        */
    const {email,role,} = req.body
    let rs = await insertOne("account",{email,role})
    if(rs){
      return res.status(200).json({
        status: 200,
        message: "success",
        data: rs,
      });
    }else{
      return res.status(400).json({
        status: 400,
        message: "fail",
      });
    }
  },
  async login(req,res){
    /* 
        #swagger.tags = ['account']
        */
    const {email} = req.body
    let rs = await findOne("account",{email})
    if(rs){
      return res.status(200).json({
        status: 200,
        message: "success",
        data: rs,
      });
    }else{
      return res.status(400).json({
        status: 400,
        message: "fail",
      });
    }
  },
  async findAll(req,res){
    /* 
        #swagger.tags = ['account']
        */
    let rs = await findAll("account",{})
    if(rs){
      return res.status(200).json({
        status: 200,
        message: "success",
        data: rs,
      });
    }else{
      return res.status(400).json({
        status: 400,
        message: "fail",
      });
    }
  },
  async find(req,res){
    /* 
        #swagger.tags = ['account']
        */
    const id = req.params
    let rs = await findOne("account",{_id:new ObjectId(id)})
    if(rs){
      return res.status(200).json({
        status: 200,
        message: "success",
        data: rs,
      });
    }else{
      return res.status(400).json({
        status: 400,
        message: "fail",
      });
    }
  },
  async update(req,res){
    /* 
        #swagger.tags = ['account']
        */
    const id= req.params
    console.log(req.body);
    const {name,age,address} = req.body
    let rs = await updatetOne("account",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return res.status(200).json({
        status: 200,
        message: "success",
        data: rs,
      });
    }else{
      return res.status(400).json({
        status: 400,
        message: "fail",
      });
    }
  },
  async delete(req,res){
    /* 
        #swagger.tags = ['account']
        */
    const id = req.params
    let rs = await deleteFunction("account",{_id:new ObjectId(id)})
    if(rs){
      return res.status(200).json({
        status: 200,
        message: "success",
        data: rs,
      });
    }else{
      return res.status(400).json({
        status: 400,
        message: "fail",
      });
    }
  }
};