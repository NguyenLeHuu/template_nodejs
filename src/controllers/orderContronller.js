// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
const jwt = require("jsonwebtoken");
const {insertOne, findOne,updateOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;

module.exports = {
  

  async store(req,res){
    /* 
        #swagger.tags = ['order']
        */
    const {
      is_cart,
      uid,
      phone,
      san_pham,
      loai_hang,
      ghi_chu,
      gio_bat_dau,
      ngay_bat_dau,
      ngay_mua,
      phuong_thuc_thanh_toan,
      tong_hoa_don,
      trang_thai
    } = req.body
    let rs = await insertOne("fasthub_res_don_hang",req.body)
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  
  async findAll(req,res){
    /* 
        #swagger.tags = ['order']
        */
    let { page, limit, ...payload } = req.query;
    let startIndex
    if(page && limit){
       page = parseInt(page); 
       limit = parseInt(limit);
       startIndex = (page - 1) * limit;
    }else{
     startIndex = 0
     limit = 10
    }
    if(payload.is_cart){
     payload.is_cart = JSON.parse(payload.is_cart)
    }
    let rs = await findAll("fasthub_res_don_hang",{...payload},startIndex,limit)
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async find(req,res){
    /* 
        #swagger.tags = ['order']
        */
    const id = req.params
    let rs = await findOne("fasthub_res_don_hang",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async update(req,res){
    /* 
        #swagger.tags = ['order']
        */
    const id= req.params
    console.log(req.body);
    const {
      is_cart,
      uid,
      phone,
      san_pham,
      loai_hang,
      ghi_chu,
      gio_bat_dau,
      ngay_bat_dau,
      ngay_mua,
      phuong_thuc_thanh_toan,
      tong_hoa_don,
      trang_thai
    } = req.body
    let rs = await updateOne("fasthub_res_don_hang",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async delete(req,res){
    /* 
        #swagger.tags = ['order']
        */
    const id = req.params
    let rs = await deleteFunction("fasthub_res_don_hang",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  }
};