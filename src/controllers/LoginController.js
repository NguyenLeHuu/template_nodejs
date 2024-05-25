const db = require("../models/index");
const CustomerService = require("../services/CustomerService");
const jwt = require("jsonwebtoken");
const {insertOne} =require("../mongodb/app") ;

var refreshTokens = [];
module.exports = {
  async checkUserInDB(req, res) {
    /* 
        #swagger.tags = ['login']
         #swagger.description = "return information of account if it exist in DB"
        */

    try {
      const { phone, password } = req.query;
      //   const password = req.params["password"];
      console.log("__checkUserInDB");
      let account = await db.account.findOne({
        where: {
          phone: phone,
          password: password,
        },
      });
      let data;
      if (account) {
        if (account.status !== "active") {
          res.status(400).json({
            status: 403,
            message: "Tai khoan bi ban",
          });
        } else {
          const accessToken = jwt.sign(
            { account_id: account.account_id },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1000d",
            }
          );
          let role = account.role;
          switch (account.role) {
            case "customer":
              data = await CustomerService.getOne(account.account_id);
              break;
            case "vet":
              // data = await VetService.getOne(account.account_id);
              data = await db.veterinarian.findOne({
                where: {
                  veterinarian_id: account.account_id,
                },
                attributes: [
                  "veterinarian_id",
                  "account_id",
                  "specialized",
                  "name",
                  "status",
                  "image",
                  "service_type_id",
                  "is_primary",
                  [
                    db.sequelize.literal(
                      "(SELECT GROUP_CONCAT(`service_id`) FROM `vet_service_catalogs` WHERE `vet_service_catalogs`.`veterinarian_id` = `veterinarian`.`veterinarian_id`)"
                    ),
                    "service_id",
                  ],
                ],
                include: [
                  {
                    model: db.account,
                  },
                ],
                raw: true,
                nest: true,
              });
              break;
            case "staff":
              data = account;
              break;
            default:
              break;
          }
          // console.log(data);
          res.status(200).json({
            status: 200,
            data: { role: role, data: data, accessToken },
          });
        }
      } else {
        res.status(400).json({
          status: 400,
          message: "Not exist account",
        });
      }
    } catch (error) {
      console.log("___Problem when query DB____", error);
      return res.status(400).json({
        status: 400,
        message: error,
      });
    }
  },

  async login(req,res){
    /* 
        #swagger.tags = ['test']
        */
    let rs = await insertOne({name:"lehu"})
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