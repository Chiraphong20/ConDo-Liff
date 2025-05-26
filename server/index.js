const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

// โหลด environment variables จาก .env
dotenv.config();

const app = express();
app.use(express.json());

// โหลด Access Token และ Rich Menu ID จาก .env
const CHANNEL_ACCESS_TOKEN = process.env.LINE_CHANNEL_ACCESS_TOKEN;

const RICH_MENU_IDS = {
  resident: process.env.RESIDENT_MENU_ID,
  juristic: process.env.JURISTIC_MENU_ID,
  technician: process.env.TECHNICIAN_MENU_ID,
};

// 🔗 Endpoint สำหรับเชื่อมโยง Rich Menu ให้กับ user
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
    console.log('📋 richMenuId selected:', richMenuId);

    if (!richMenuId) {
      return res.status(400).json({ message: 'Invalid role or no richMenuId set' });
    }

    const url = `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`;

    console.log('📡 Calling LINE API:', url);
    console.log('🔑 Using Token:', CHANNEL_ACCESS_TOKEN ? CHANNEL_ACCESS_TOKEN.slice(0, 20) + '...' : 'NOT FOUND');

    // ส่ง request ไปยัง LINE API
    const response = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
    });

    console.log('✅ LINE API response:', response.status, response.data);

    res.json({ message: 'Rich menu linked successfully' });
  } catch (error) {
    console.error('❌ Error linking rich menu:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to link rich menu', error: error.message });
  }
});

// เริ่ม server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
