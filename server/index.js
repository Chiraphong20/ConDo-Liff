const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

// 👇 แทนด้วย token และ rich menu id จริง
const CHANNEL_ACCESS_TOKEN = 'qIvNO1l0vxERUs0TwZWrY4AtcpuR9FEGZLkXLvue0ooF1NxYNnnBOSfGNVdLB0i2T4ymCXsr/9mRSGdAjixhoHwjPFwA2eEzz0URvWSsFE8/PwH+9nHNEmjZ//s3CEwUDHhvW6vKwdutJ6w6M3cufAdB04t89/1O/w1cDnyilFU=';

const RICH_MENU_IDS = {
  resident: 'richmenu-dc6d9ecfe8aeb44ba250f9c18bd8e0c0',
  juristic: 'richmenu-df8332fe1894db979e3eb5a426e680ae',
  technician: 'richmenu-df8332fe1894db979e3eb5a426e680ae'
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ POST /register/api/link-richmenu
app.post('/register/api/link-richmenu', async (req, res) => {
  try {
    const { userId, role } = req.body;

    console.log('\n📥 Received request to link rich menu');
    console.log('🧾 userId:', userId);
    console.log('🎭 role:', role);

    if (!userId || !role) {
      return res.status(400).json({ message: 'Missing userId or role' });
    }

    const richMenuId = RICH_MENU_IDS[role];
    if (!richMenuId) {
      return res.status(400).json({ message: 'Invalid role or no richMenuId set' });
    }

    const url = `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`;

    const response = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
    });

    console.log('✅ Linked rich menu:', response.status);
    res.json({ message: 'Rich menu linked successfully' });

  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to link rich menu', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
