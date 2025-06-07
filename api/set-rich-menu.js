const axios = require('axios');

const RICH_MENU_IDS = {
  resident: 'richmenu-f5d18c5b7ff045b9726779fbc7aa68b8',
  technician: 'richmenu-9de16c97659ad8313c39652660b24d3d',
};

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  const { userId, role } = req.body;

  if (!userId || !role || !RICH_MENU_IDS[role]) {
    return res.status(400).send('Missing or invalid parameters');
  }

  try {
    await axios.post(
      `https://api.line.me/v2/bot/user/${userId}/richmenu/${RICH_MENU_IDS[role]}`,
      {},
      {
        headers: {
          'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`,
        },
      }
    );

    return res.status(200).json({ message: 'Rich menu set successfully' });
  } catch (error) {
    console.error(error.response?.data || error.message);
    return res.status(500).json({ error: 'Failed to set rich menu' });
  }
};
