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
        #swagger.tags = ['order']
        */
    const {email} = req.body
    let rs = await findOne("fasthub_res_don_hang",{email})
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
        #swagger.tags = ['order']
        */
    let rs = await findAll("fasthub_res_don_hang",{})
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
        #swagger.tags = ['order']
        */
    const id = req.params
    let rs = await findOne("fasthub_res_don_hang",{_id:new ObjectId(id)})
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
    let rs = await updatetOne("fasthub_res_don_hang",
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
        #swagger.tags = ['order']
        */
    const id = req.params
    let rs = await deleteFunction("fasthub_res_don_hang",{_id:new ObjectId(id)})
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