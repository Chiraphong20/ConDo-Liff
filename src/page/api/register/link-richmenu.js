import axios from 'axios';

const richMenuIds = {
  resident: 'richmenu-dc6d9ecfe8aeb44ba250f9c18bd8e0c0',
  juristic: 'richmenu-your-juristic-id',
  technician: 'richmenu-df8332fe1894db979e3eb5a426e680ae',
};

// รหัสลับสำหรับช่าง (เก็บใน ENV หรือ config)
const TECHNICIAN_SECRET_KEY = process.env.TECHNICIAN_SECRET_KEY || '12345';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { userId, role, keycode, name, phone, room, building, displayName } = req.body;

  if (!userId || !role) {
    return res.status(400).json({ message: 'Missing userId or role' });
  }

  if (!richMenuIds[role]) {
    return res.status(400).json({ message: 'Invalid role' });
  }

  // ตรวจสอบ keycode เฉพาะกรณี role เป็น technician
  if (role === 'technician' && keycode !== TECHNICIAN_SECRET_KEY) {
    return res.status(403).json({ message: 'Invalid technician keycode' });
  }

  // บันทึกข้อมูลผู้ใช้เพิ่มเติมลง Firestore (ถ้าอยากบันทึกซ้ำใน backend)
  // หรือบันทึกลง Firebase จาก frontend ก็ได้ตามสะดวก

  // เรียก LINE API เปลี่ยน Rich Menu
  try {
    const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
    if (!channelAccessToken) {
      throw new Error('Missing LINE_CHANNEL_ACCESS_TOKEN environment variable');
    }

    await axios.post(
      `https://api.line.me/v2/bot/user/${userId}/richmenu/${richMenuIds[role]}`,
      null,
      { headers: { Authorization: `Bearer ${channelAccessToken}` } }
    );

    return res.status(200).json({ message: 'Rich menu linked successfully' });
  } catch (error) {
    console.error('LINE API error:', error.response?.data || error.message);
    return res.status(500).json({ message: 'Failed to link rich menu' });
  }
}
