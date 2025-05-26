const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/api/link-richmenu', async (req, res) => {
  const { userId, role } = req.body;

  const richMenuId = {
    resident: 'richmenu-dc6d9ecfe8aeb44ba250f9c18bd8e0c0',
    juristic: 'richmenu-df8332fe1894db979e3eb5a426e680ae',
    technician: 'richmenu-df8332fe1894db979e3eb5a426e680ae',
  }[role];

  if (!richMenuId) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  try {
    await axios.post(
      `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
      {},
      {
        headers: {
          'Authorization': `Bearer qIvNO1l0vxERUs0TwZWrY4AtcpuR9FEGZLkXLvue0ooF1NxYNnnBOSfGNVdLB0i2T4ymCXsr/9mRSGdAjixhoHwjPFwA2eEzz0URvWSsFE8/PwH+9nHNEmjZ//s3CEwUDHhvW6vKwdutJ6w6M3cufAdB04t89/1O/w1cDnyilFU=`
        }
      }
    );

    res.status(200).json({ message: 'Rich menu linked successfully' });
  } catch (error) {
    console.error('Error linking rich menu:', error.response?.data || error.message);
    res.status(500).json({ message: 'Failed to link rich menu' });
  }
});

app.listen(3001, () => {
  console.log('Backend listening on http://localhost:3001');
});
