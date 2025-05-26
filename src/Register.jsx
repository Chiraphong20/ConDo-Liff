import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    phone: '',
    room: '',
    building: '',
    role: '',
    keycode: '',
  });

  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: '2007355122-xBNrkXmM', withLoginOnExternalBrowser: true });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        const context = liff.getContext();
        const accessToken = liff.getAccessToken();

        console.log('LIFF Profile:', profile);
        console.log('LIFF Context:', context);

        if (!accessToken) {
          alert('⚠️ กรุณาเปิดลิงก์ผ่านแอป LINE และเพิ่มเพื่อนกับ OA ก่อนใช้งาน');
        }

        setUserId(profile.userId);
        setDisplayName(profile.displayName);
      } catch (err) {
        console.error('LIFF init error:', err);
        alert('ไม่สามารถเชื่อมต่อกับ LINE ได้\n' + err.message);
      }
    };

    initLiff();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!userId) {
    alert("⚠️ ไม่สามารถระบุผู้ใช้ได้ กรุณาเข้าใหม่ผ่านแอป LINE");
    return;
  }

  if (formData.role === 'technician' && formData.keycode !== '12345') {
    alert("🚫 รหัสช่างไม่ถูกต้อง");
    return;
  }

  try {
    const userData = {
      name: formData.fullname,
      phone: formData.phone,
      room: formData.room,
      building: formData.building,
      role: formData.role,
      keycode: formData.role === 'technician' ? formData.keycode : '',
      displayName,
    };

    console.log("📤 Sending user data to Firestore:", userData);

    await setDoc(doc(db, 'users', userId), userData);

    // 🔗 เรียก API ไปยัง backend server พร้อม log
    console.log('🔵 Sending to API:', {
      url: 'https://con-do-liff-wel9.vercel.app/register/api/link-richmenu',
      body: { userId, role: formData.role }
    });

    const response = await fetch('https://con-do-liff-wel9.vercel.app/register/api/link-richmenu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, role: formData.role }),
    });

    const result = await response.json();

    console.log('🟢 API Response:', result);

    if (!response.ok) {
      throw new Error(result.message || 'API failed');
    }

    alert('✅ ลงทะเบียนสำเร็จ');

    // 📨 ส่งข้อความต้อนรับ
    let welcomeMessage = '';
    switch (formData.role) {
      case 'resident':
        welcomeMessage = 'ยินดีต้อนรับลูกบ้าน';
        break;
      case 'juristic':
        welcomeMessage = 'สวัสดีนิติบุคคล';
        break;
      case 'technician':
        welcomeMessage = 'เข้าสู่ระบบช่าง';
        break;
      default:
        welcomeMessage = 'ลงทะเบียนเรียบร้อย';
    }

    try {
      await liff.sendMessages([{ type: 'text', text: welcomeMessage }]);
    } catch (err) {
      console.warn('⚠️ ไม่สามารถส่งข้อความผ่าน LIFF ได้:', err.message);
    }

    liff.closeWindow();
  } catch (err) {
    console.error("❌ บันทึกไม่สำเร็จ:", err);
    alert("เกิดข้อผิดพลาดในการลงทะเบียน: " + err.message);
  }
};

  return (
    <div className="container">
      <h2>ลงทะเบียนผู้ใช้</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullname"
          placeholder="ชื่อ-นามสกุล"
          value={formData.fullname}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="เบอร์โทร"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="room"
          placeholder="ห้อง"
          value={formData.room}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="building"
          placeholder="ตึก"
          value={formData.building}
          onChange={handleChange}
          required
        />

        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">เลือกบทบาท</option>
          <option value="resident">ลูกบ้าน</option>
          <option value="juristic">นิติบุคคล</option>
          <option value="technician">ช่าง</option>
        </select>

        {formData.role === 'technician' && (
          <input
            type="password"
            name="keycode"
            placeholder="กรอกรหัสช่าง"
            value={formData.keycode}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit">ลงทะเบียน</button>
      </form>
    </div>
  );
};

export default Register;
