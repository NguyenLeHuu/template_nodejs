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
    const id = req.params

    let cart = await findAll("fasthub_res_don_hang",{uid:id.id, is_cart:true, loai_hang:"Hàng hóa"},0,1)
    if(cart && cart.length > 0){
      console.log(cart,"cảtttttt");
      const pipeline = [
        {
          $match: { uid:id.id, is_cart:true, loai_hang:"Hàng hóa" } 
        },
        {
          $addFields: {
            'san_pham_id': { $map: { input: '$san_pham', as: 'sp', in: { $toObjectId: '$$sp._id' } } }
          }
        },
        {
          $lookup: {
            from: 'fasthub_san_pham', 
            localField: 'san_pham_id', 
            foreignField: '_id', 
            as: 'san_pham_docs' 
          }
        },
        {
          $project: {
            'san_pham_docs._id': 1, 
            'san_pham_docs.ten_hang_hoa': 1, 
            'san_pham_docs.gia_ban': 1, 
            'san_pham_docs.hinh_anh_url1_url2': 1,
          }
        },
        {
          $project: {
            san_pham_id: 0 ,
          }
        },
    ];
      let rs = await aggregate("fasthub_res_don_hang",pipeline)
  
      if(rs && rs[0].san_pham_docs){
        rs[0].san_pham_docs = rs[0].san_pham_docs.map(sp => {
          let sp_rs2 = cart[0].san_pham.find(sp2 => sp2._id.toString() == sp._id.toString());
          return {
            ...sp,
            so_luong: sp_rs2 ? sp_rs2.so_luong : 0
          };
        });
      }
      
      if(rs){
        return Response(res,200,"success",rs)
      }else{
        return Response(res,400,"fail","")
      }
    }else{
      let newCart = await insertOne("fasthub_res_don_hang",{
        "is_cart": true,
        "uid": id.id,
        "san_pham": [],
        "loai_hang": "Hàng hóa"    
       })
    return Response(res,200,"success",newCart)
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