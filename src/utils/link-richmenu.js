import axios from 'axios';

const channelAccessToken = 'qIvNO1l0vxERUs0TwZWrY4AtcpuR9FEGZLkXLvue0ooF1NxYNnnBOSfGNVdLB0i2T4ymCXsr/9mRSGdAjixhoHwjPFwA2eEzz0URvWSsFE8/PwH+9nHNEmjZ//s3CEwUDHhvW6vKwdutJ6w6M3cufAdB04t89/1O/w1cDnyilFU='; // 🔒 ใส่ token ของคุณที่นี่

// 🔧 กำหนด richMenuId ตามบทบาท
const roleMenus = {
  resident: 'richmenu-dc6d9ecfe8aeb44ba250f9c18bd8e0c0',
  juristic: 'richmenu-df8332fe1894db979e3eb5a426e680ae',
  technician: 'RICH_MENU_ID_FOR_TECHNICIAN',
};

export default async function handler(req, res) {
  // ❌ ป้องกันการใช้ method ที่ไม่ใช่ POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userId, role } = req.body;

  // ⚠️ ตรวจสอบว่าข้อมูลครบถ้วนไหม
  if (!userId || !roleMenus[role]) {
    return res.status(400).json({ error: 'Missing userId or invalid role' });
  }

  const richMenuId = roleMenus[role];

  try {
    // ✅ เรียก LINE API เพื่อเชื่อม Rich Menu
    await axios.post(
      `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${channelAccessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json({ message: 'Rich menu linked successfully' });
  } catch (error) {
    console.error('Error linking rich menu:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to link rich menu' });
  }
}
