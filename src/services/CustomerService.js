const db = require("../models/index");
const crypto = require("crypto");

let getAll = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.customer.findAll({
        include: {
          model: db.account,
          attributes: ["status"],
        },
        raw: false,
        nest: true,
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let getOne = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // let data = await db.Customer.findByPk(id);
      let data = await db.customer.findOne({
        where: {
          customer_id: id,
        },
      });
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let createCustomer = (data, url) => {
  // let createCustomer = (data, image) => {

  return new Promise(async (resolve, reject) => {
    try {
      const id = crypto.randomBytes(15).toString("hex");
      const result = await db.customer.create({
        customer_id: data.account_id,
        account_id: data.account_id,
        email: data.email,
        address: data.address,
        name: data.name,
        status: 1,
        phone: data.phone,
        image: url,
        total_spent: 0,
        membership: "",
      });

      resolve(result);
    } catch (e) {
      reject(e);
    }
  });
};

let updateCustomer = (id, name, quantity, price, mainimg, detail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.customer.update(
        {
          name: name,
          quantity: quantity,
          price: price,
          detail: detail,
        },
        {
          where: {
            customer_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let updateTotalSpent = (id, total_spent) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cus = await getOne(id);

      let data = await db.customer.update(
        {
          total_spent: parseFloat(cus.total_spent) + parseFloat(total_spent),
        },
        {
          where: {
            customer_id: id,
          },
        }
      );

      let rank = "";
      if (total_spent <= 1000000) {
        rank = "Un_rank";
      } else if (total_spent <= 10000000) {
        rank = "Bạc";
      } else if (total_spent <= 50000000) {
        rank = "Vàng";
      } else {
        rank = "Kim cương";
      }
      await db.customer.update(
        {
          membership: rank,
        },
        {
          where: {
            customer_id: id,
          },
        }
      );

      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

let deleteCustomer = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.customer.update(
        {
          status: 0,
        },
        {
          where: {
            customer_id: id,
          },
        }
      );
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  getOne: getOne,
  getAll: getAll,
  createCustomer: createCustomer,
  updateCustomer: updateCustomer,
  updateTotalSpent,
  deleteCustomer: deleteCustomer,
};