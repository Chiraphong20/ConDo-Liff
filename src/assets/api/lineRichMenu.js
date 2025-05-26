// backend/lineRichMenu.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const channelAccessToken = 'qIvNO1l0vxERUs0TwZWrY4AtcpuR9FEGZLkXLvue0ooF1NxYNnnBOSfGNVdLB0i2T4ymCXsr/9mRSGdAjixhoHwjPFwA2eEzz0URvWSsFE8/PwH+9nHNEmjZ//s3CEwUDHhvW6vKwdutJ6w6M3cufAdB04t89/1O/w1cDnyilFU='; // สำคัญมาก

const roleMenus = {
  resident: 'richmenu-dc6d9ecfe8aeb44ba250f9c18bd8e0c0',
  juristic: 'richmenu-df8332fe1894db979e3eb5a426e680ae',
  technician: 'RICH_MENU_ID_FOR_TECHNICIAN',
};

router.post('/link-richmenu', async (req, res) => {
  const { userId, role } = req.body;

  const richMenuId = roleMenus[role];
  if (!richMenuId) return res.status(400).send('Invalid role');

  try {
    await axios.post(
      `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${channelAccessToken}`,
        },
      }
    );
    res.send('Rich menu linked');
  } catch (err) {
    console.error('Error linking rich menu:', err.response?.data || err.message);
    res.status(500).send('Failed to link rich menu');
  }
});

module.exports = router;
