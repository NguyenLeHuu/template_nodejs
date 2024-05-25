const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const qr = require("qrcode");

const FCM = require("fcm-node");
var serverKey =
  // "AAAA8JPK4Do:APA91bGkM_iAGjUQRQNsOez0GScPQ2trWwe6hGxRMoulcHeN2sGG95P8am0upUbmaGst9cyjaAg19z05rpIWwSy_D_N6mBBgrx2gTtRgIw11J0oRDv7havimtyHEi5kx6fL-gpaTv8my";
  "AAAA7LqdmJY:APA91bFo9Thjb0kCmcN8I8S29QBpaA9KHfJ37JOxMD-FHVzenM5c2PvHetMC_Xs86iCzEI-dQAcmeDjagbxD195-7_lsBN2Oc43pzhrbG-TQBrlTMzKd1BFKoSHSwuHKIK2X81gaNiIh";
var fcm = new FCM(serverKey);

const serviceAccount = require("../config/firebase-sdk.json");

// const BUCKET = "bsc-symtem.appspot.com";
const BUCKET = "fir-auth-uicha.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET,
});

const bucket = admin.storage().bucket();

const uploadImage = (image) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filename = uuidv4();
      const file = bucket.file(filename);

      const stream = file.createWriteStream({
        metadata: {
          contentType: image.mimetype,
        },
      });

      stream.on("error", (e) => {
        console.log(e);
      });

      stream.on("finish", async () => {
        await file.makePublic();
      });
      stream.end(image.buffer);
      resolve(
        `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${filename}?alt=media`
      );
    } catch (e) {
      console.log(e);
      reject(e);
    }
  });
};
const gen_qr = (dataToEncode) => {
  return new Promise(async (resolve, reject) => {
    try {
      qr.toBuffer(dataToEncode, async (err, buffer) => {
        if (err) {
          console.error("loi me roi:", err);
          reject(e);
        }

        let a = await uploadImageUseBuffer(buffer);
        console.log(a);
        resolve(a);
      });
    } catch (error) {
      console.log("____lỗi ở gen_Qr___");
    }
  });
};

const uploadImageUseBuffer = async (buffer) => {
  return new Promise(async (resolve, reject) => {
    try {
      const filename = `${uuidv4()}.png`; // Đổi định dạng tên file nếu cần
      const file = bucket.file(filename);

      const stream = file.createWriteStream({
        metadata: {
          contentType: "image/png", // Định dạng của hình ảnh (có thể thay đổi tùy ý)
        },
      });

      stream.on("error", (e) => {
        console.error("Lỗi khi tải hình ảnh lên Firebase: ", e);
        reject(e);
      });

      stream.on("finish", async () => {
        await file.makePublic();
      });
      const downloadURL = `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${filename}?alt=media`;
      resolve(downloadURL);
      stream.end(buffer);
    } catch (e) {
      console.error("Lỗi khi tải hình ảnh lên Firebase: ", e);
      reject(e);
    }
  });
};

const msgtest = {
  to: "",
  notification: {
    title: "UiCha Company",
    body: '{"Message from node js app"}',
  },
};

const setMsg = (tokenDevice, body) => {
  msgtest.to = tokenDevice;
  msgtest.notification.body = body;
};

const sendNoti = () => {
  console.log(msgtest);
  fcm.send(msgtest, function (err, response) {
    console.log(msgtest.to);
    if (err) {
      console.log("____(fcmErr) Something has gone wrong!" + err);
      console.log("____(fcmErr) Respponse:! " + response);
    } else {
      // showToast("Successfully sent with response");
      console.log("_____(fcm) Successfully sent with response: ", response);
    }
  });
};

//pushnoti topic
//create topic
const customer_topic = "CUSTOMER_UICHA";
const creator_topic = "CREATOR_UICHA";
const uicha_topic = "UICHA_TOPIC";

//dang ki zo topic
const registerCustomerTopic = function () {
  const registrationTokens = [
    "eowymDzjzrDw-YfpzdJgJs:APA91bFpIgAosp6Z3SgHZr59sr2Juo9uJanEE7WtSw7Chp-bgNFcGyefVETfYJ1fuKhTDcmDmdtYd8TuyeALS_MkfIIyC-FU4q5gRfZCF6YHWkdfASqiE1Oul1NsS5GSFh8-hu0n545G", //huu
  ];

  admin
    .messaging()
    .subscribeToTopic(registrationTokens, customer_topic)
    .then(() => {
      console.log("________Người dùng đã được thêm vào topic thành công");
    })
    .catch((error) => {
      console.log("________Thêm người dùng vào topic thất bại:", error);
    });
};

const registerCreatorTopic = function () {
  const registrationTokens = [
    "cg9vLKO8RFaMBsW9LxELkB:APA91bFF0PM8MZOFQ_MQ4tcrEC7c6pNIRQ9s4JM7O388T75wfa5gEHDX8Il9MV7Bw79qh_MrcIJiWZ_grOcXwZ2O14SfRQMyCPDyNllJ_bNOevcig1hdh4ZvgcTBWEIIiaMNX0CQmLV0", //bảo mo
    "fSvUQ007QASluFETXUCIdx:APA91bF_1MBgHxqFV5bf51pTXvCCS4eO3FRCIUZt-DQS6cNA0lDphCd7D6TI7Kqfzzj8DBJxg0IPqueLh8I8arDOVlPni0rXMbAW0OBbxGlZTYZI4RjlLM3VWZprhJmfVuV1FaWqtbQv", //
    "eRVsNwobSVSttr8W3LT_CZ:APA91bEvQCsQhK4JM6yX5iZt3uahN-fin6y00D5j1_zbQPQ1BHVBpbcMcpnjhKZk0cFP8-BjQ2Vss1Fp6hdiAd4m496PUsP5gr1rz-L8pQi7UgWhkYpvNmjaFwU1PSr6kZf1HEVznx9e", //q.a
  ];
  admin
    .messaging()
    .subscribeToTopic(registrationTokens, creator_topic)
    .then(() => {
      console.log("________Người dùng đã được thêm vào topic thành công");
    })
    .catch((error) => {
      console.log("________Thêm người dùng vào topic thất bại:", error);
    });
};

const registerUichaTopic = function () {
  const registrationTokens = [
    // "eowymDzjzrDw-YfpzdJgJs:APA91bFpIgAosp6Z3SgHZr59sr2Juo9uJanEE7WtSw7Chp-bgNFcGyefVETfYJ1fuKhTDcmDmdtYd8TuyeALS_MkfIIyC-FU4q5gRfZCF6YHWkdfASqiE1Oul1NsS5GSFh8-hu0n545G",//huu
    "cg9vLKO8RFaMBsW9LxELkB:APA91bFF0PM8MZOFQ_MQ4tcrEC7c6pNIRQ9s4JM7O388T75wfa5gEHDX8Il9MV7Bw79qh_MrcIJiWZ_grOcXwZ2O14SfRQMyCPDyNllJ_bNOevcig1hdh4ZvgcTBWEIIiaMNX0CQmLV0", //bao
    "cS8_GueEQwm9boMEImnR3e:APA91bHwBuufX38B9s-rOxoX0BySzy5Ug2M_4QkGwp7LcMLhWPdwB4raS7gQHJC4MWYTdA1K8ay5f-9ck_WAqzrRCXBV9sl6C4ksTKi0x3BkCg4kyQz19z3gjhRaQgwprcdBxrLBFsML", //dth cua huu
    "emjevywaQ2W8L5wOMVL9bO:APA91bFgJqBvd4QDCF_Ng1h8uw5zhUfFLU3ICA-rKfLiEK9gA2hn3oHjrc4hl58Ttu1C5ChmYC-q2m3amNjAmFoqlhR4d9guCfsncxjRuEw0T3-eeEl44lyuOn0rMn6mWoNbfe8p-05N", //
  ];
  admin
    .messaging()
    .subscribeToTopic(registrationTokens, uicha_topic)
    .then(() => {
      console.log("________Người dùng đã được thêm vào topic thành công");
    })
    .catch((error) => {
      console.log("________Thêm người dùng vào topic thất bại:", error);
    });
};

const fcm_customer_Topic = (contentBody) => {
  const message = {
    notification: {
      title: "Thông báo mới từ UICHA",
      body: contentBody,
    },
    topic: customer_topic,
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log(
        "________Push notification đã được gửi thành công:",
        response
      );
    })
    .catch((error) => {
      console.log("________Gửi push notification thất bại:", error);
    });
};

const fcm_creator_Topic = (contentBody) => {
  const message = {
    notification: {
      title: "Thông báo mới từ UICHA",
      body: contentBody,
    },
    topic: creator_topic,
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log(
        "________Push notification đã được gửi thành công:",
        response
      );
    })
    .catch((error) => {
      console.log("________Gửi push notification thất bại:", error);
    });
};

const fcm_uicha_Topic = (contentBody) => {
  const message = {
    notification: {
      title: "Thông báo mới từ UICHA",
      body: contentBody,
    },
    topic: uicha_topic,
  };
  admin
    .messaging()
    .send(message)
    .then((response) => {
      console.log(
        "________Push notification đã được gửi thành công:",
        response
      );
    })
    .catch((error) => {
      console.log("________Gửi push notification thất bại:", error);
    });
};

module.exports = {
  uploadImage,
  uploadImageUseBuffer,
  sendNoti,
  setMsg,
  registerCustomerTopic,
  registerCreatorTopic,
  registerUichaTopic,
  fcm_customer_Topic,
  fcm_creator_Topic,
  fcm_uicha_Topic,
  gen_qr,
};