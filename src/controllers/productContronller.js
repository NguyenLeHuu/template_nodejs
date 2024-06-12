// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
const jwt = require("jsonwebtoken");
const {insertOne, findOne,updateOne,findAll,upsert,deleteFunction} =require("../mongodb/app") ;


module.exports = {
  

  async store(req,res){
    /* 
        #swagger.tags = ['product']
        */
    const {loai_hang,danh_muc,ten_hang_hoa,mo_ta,gia_ban,
           hinh_anh_url1_url2,la_hang_flash_sales,la_hang_cho_tang,
           la_hang_ky_gui,
           la_thue_nha
    } = req.body
    let rs = await insertOne("fasthub_san_pham",req.body)
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async findAll(req,res){
    /* 
        #swagger.tags = ['product']
        */
        const {
          loai_hang,
          danh_muc,
   } = req.body
    console.log(req.body);
    let rs = await findAll("fasthub_san_pham",req.body)
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async find(req,res){
    /* 
        #swagger.tags = ['product']
        */
    const id = req.params
    let rs = await findOne("fasthub_san_pham",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async update(req,res){
    /* 
        #swagger.tags = ['product']
        */
    const id= req.params
    console.log(req.body);
    const {ten_hang_hoa,gia_ban} = req.body
    let rs = await updateOne("fasthub_san_pham",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async delete(req,res){
    /* 
        #swagger.tags = ['product']
        */
    const id = req.params
    let rs = await deleteFunction("fasthub_san_pham",{_id:new ObjectId(id)})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  }
};