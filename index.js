const functions = require("firebase-functions");
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

const CHANNEL_ACCESS_TOKEN = 'qIvNO1l0vxERUs0TwZWrY4AtcpuR9FEGZLkXLvue0ooF1NxYNnnBOSfGNVdLB0i2T4ymCXsr/9mRSGdAjixhoHwjPFwA2eEzz0URvWSsFE8/PwH+9nHNEmjZ//s3CEwUDHhvW6vKwdutJ6w6M3cufAdB04t89/1O/w1cDnyilFU=';

// แผนผังบทบาท → Rich Menu ID
const RICH_MENU_IDS = {
  A: 'richmenu-583c72d4a3a539fa0c78e50a54931fc4',     // ลูกบ้าน
  B: 'richmenu-8dc7bd9f8b30b2a64e9605f765f729f0',     // นิติบุคคล
  C: 'RICH_MENU_ID_FOR_TECHNICIAN',   // ช่าง
};

app.post("/api/link-richmenu", async (req, res) => {
  const { userId, role } = req.body;
  const richMenuId = RICH_MENU_IDS[role];

  if (!richMenuId) {
    return res.status(400).send("Invalid role or rich menu not set");
  }

  try {
    await axios.post(
      `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${CHANNEL_ACCESS_TOKEN}`,
        },
      }
    );
    return res.status(200).send("Rich Menu linked");
  } catch (error) {
    console.error("Error linking rich menu:", error.response?.data || error.message);
    return res.status(500).send("Failed to link Rich Menu");
  }
});

exports.api = functions.https.onRequest(app);
