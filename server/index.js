const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

const CHANNEL_ACCESS_TOKEN = process.env.CHANNEL_ACCESS_TOKEN;

const RICH_MENU_IDS = {
  resident: 'richmenu-dc6d9ecfe8aeb44ba250f9c18bd8e0c0',
  juristic: 'richmenu-df8332fe1894db979e3eb5a426e680ae',
  technician: 'richmenu-df8332fe1894db979e3eb5a426e680ae'
};

app.post('/register/api/link-richmenu', async (req, res) => {
  try {
    const { userId, role } = req.body;

    if (!userId || !role) {
      return res.status(400).json({ message: 'Missing userId or role' });
    }

    const richMenuId = RICH_MENU_IDS[role];
    if (!richMenuId) {
      return res.status(400).json({ message: 'Invalid role or no richMenuId set' });
    }

    const url = `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`;
    await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      }
    });

    res.json({ message: 'Rich menu linked successfully' });

  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ message: 'Failed to link rich menu', error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
