// const db = require("../models/index");
// const CustomerService = require("../services/CustomerService");
import {ObjectId } from "mongodb";
import { Response } from "../utils";
const jwt = require("jsonwebtoken");
const {insertOne, findOne,updateOne,findAll,upsert,deleteFunction,pushToArrField,pullfromArrField,aggregate} =require("../mongodb/app") ;

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
        ##swagger.description  = "page, limit > 0, không truyền thì mặc đinh sẽ lấy 10 thằng"
        */
    let { page, limit, ...payload } = req.query;
    let startIndex
    if(page && limit && page>0 && limit>0){
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

  async getCartForHangHoa(req,res){
    /* 
        #swagger.tags = ['cart']
        */
    const uid = req.params

    const pipeline = [
      {
        $match: { uid:uid, is_cart:true, loai_hang:"Hàng hóa" } 
      }
      // {
      //   $lookup: {
      //     from: 'fasthub_san_pham', 
      //     localField: 'san_pham._id', 
      //     foreignField: '_id', 
      //     as: 'san_pham' 
      //   }
      // }
  ];

    // let rs = await aggregate("fasthub_res_don_hang",pipeline)
    let rs = await findAll("fasthub_res_don_hang",{ uid:uid, is_cart:true, loai_hang:"Hàng hóa" },1,1)

    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },

  async push(req,res){
    /* 
        #swagger.tags = ['cart']
        */
    const id= req.params
    // console.log(req.body);
    let {
      _id,
    } = req.body
    let cart = await findOne("fasthub_res_don_hang",{_id:new ObjectId(id)})
    let existProduct = cart.san_pham.find(product => String(product._id) === String(_id));

    if(existProduct){
        await pullfromArrField("fasthub_res_don_hang","san_pham",
        {filter:{_id:new ObjectId(id)},data:{_id:_id}})
        req.body.so_luong = parseInt(existProduct["so_luong"]) + 1
    }else{
      req.body.so_luong = 1
    }
    
    let rs = await pushToArrField("fasthub_res_don_hang","san_pham",
    {filter:{_id:new ObjectId(id)},data:req.body})
    if(rs){
      return Response(res,200,"success",rs)
    }else{
      return Response(res,400,"fail","")
    }
  },
  async pull(req,res){
    /* 
        #swagger.tags = ['cart']
        #swagger.description = "truyen id product zo"
        */
    const id= req.params
    console.log(req.body);
    let {
      _id,
    } = req.body
    let cart = await findOne("fasthub_res_don_hang",{_id:new ObjectId(id)})
    let existProduct = cart.san_pham.find(product => String(product._id) === String(_id));
    console.log(existProduct,"existProductexistProduct");

    if(existProduct && parseInt(existProduct.so_luong) > 1){
        req.body.so_luong = parseInt(existProduct["so_luong"]) - 1
        console.log(req.body);
        await pushToArrField("fasthub_res_don_hang","san_pham",
          {filter:{_id:new ObjectId(id)},data:req.body})
    }

    let rs = await pullfromArrField("fasthub_res_don_hang","san_pham",
    {filter:{_id:new ObjectId(id)},data:existProduct})
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