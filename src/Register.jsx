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
        await liff.init({ liffId: 'YOUR_LIFF_ID' }); // 🔁 เปลี่ยนเป็นของจริง
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        console.log('LIFF profile:', profile);
        setUserId(profile.userId);
        setDisplayName(profile.displayName);
      } catch (err) {
        console.error('LIFF init error:', err);
        alert('ไม่สามารถเชื่อมต่อกับ LINE ได้');
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
      alert("ยังไม่สามารถระบุผู้ใช้ได้ กรุณาเข้าใหม่ผ่านแอป LINE");
      return;
    }

    if (formData.role === 'technician' && formData.keycode !== '12345') {
      alert("รหัสช่างไม่ถูกต้อง");
      return;
    }

    try {
      await setDoc(doc(db, 'users', userId), {
        name: formData.fullname,
        phone: formData.phone,
        room: formData.room,
        building: formData.building,
        role: formData.role,
        keycode: formData.role === 'technician' ? formData.keycode : '',
        displayName,
      });

      alert('✅ ลงทะเบียนสำเร็จ');

      // 🔁 เปิด Rich Menu ตาม Role
      switch (formData.role) {
        case 'resident':
          await liff.sendMessages([{ type: 'text', text: 'ยินดีต้อนรับลูกบ้าน 👤' }]);
          liff.closeWindow(); // หรือ navigate ไปหน้าอื่น
          break;
        case 'juristic':
          await liff.sendMessages([{ type: 'text', text: 'สวัสดีนิติบุคคล 🧑‍💼' }]);
          liff.closeWindow();
          break;
        case 'technician':
          await liff.sendMessages([{ type: 'text', text: 'เข้าสู่ระบบช่าง 🔧' }]);
          liff.closeWindow();
          break;
        default:
          alert('บทบาทไม่ถูกต้อง');
      }
    } catch (err) {
      console.error("❌ บันทึกไม่สำเร็จ:", err);
      alert("เกิดข้อผิดพลาดในการลงทะเบียน");
    }
  };

  return (
    <div className="container">
      <h2>ลงทะเบียนผู้ใช้</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullname" placeholder="ชื่อ-นามสกุล" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="เบอร์โทร" onChange={handleChange} required />
        <input type="text" name="room" placeholder="ห้อง" onChange={handleChange} required />
        <input type="text" name="building" placeholder="ตึก" onChange={handleChange} required />

        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">เลือกบทบาท</option>
          <option value="resident">ลูกบ้าน</option>
          <option value="juristic">นิติบุคคล</option>
          <option value="technician">ช่าง</option>
        </select>

        {/* แสดง Keycode เฉพาะตอนเลือกเป็นช่าง */}
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
