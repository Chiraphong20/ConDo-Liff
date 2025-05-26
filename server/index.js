app.post('/register/api/link-richmenu', async (req, res) => {
  try {
    const { userId, role } = req.body;

    console.log('\n📥 Received request to link rich menu');
    console.log('🧾 userId:', userId, typeof userId);
    console.log('🎭 role:', role);

    if (!userId || !role) {
      return res.status(400).json({ message: 'Missing userId or role' });
    }

    // เช็ครูปแบบ userId
    if (typeof userId !== 'string' || !userId.match(/^[a-zA-Z0-9_\-]+$/)) {
      return res.status(400).json({ message: 'Invalid userId format' });
    }

    const richMenuId = RICH_MENU_IDS[role];
    console.log('📋 richMenuId selected:', JSON.stringify(richMenuId));

    if (!richMenuId) {
      return res.status(400).json({ message: 'Invalid role or no richMenuId set' });
    }

    const url = `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`;
    console.log('📡 Calling LINE API:', url);

    const response = await axios.post(url, {}, {
      headers: {
        'Authorization': `Bearer ${CHANNEL_ACCESS_TOKEN}`,
      },
    });

    console.log('✅ LINE API response:', response.status);

    res.json({ message: 'Rich menu linked successfully' });
  } catch (error) {
    console.error('❌ Error linking rich menu:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to link rich menu', error: error.message });
  }
});
