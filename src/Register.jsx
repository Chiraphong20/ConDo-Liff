// Register.jsx
import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    surname: '',
    phone: '',
    email: '',
    role: '',
    room: '',
    building: '',
  });

  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      await liff.init({ liffId: '2007355122-xBNrkXmM' });
      if (!liff.isLoggedIn()) {
        liff.login();
        return;
      }
      const profile = await liff.getProfile();
      setUserId(profile.userId);
    };
    initLiff();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("ยังไม่สามารถระบุผู้ใช้ได้ กรุณาลองใหม่");
      return;
    }

    try {
      await setDoc(doc(db, 'users', userId), {
        name: formData.fullname + ' ' + formData.surname,
        phone: formData.phone,
        email: formData.email,
        role: formData.role,
        room: formData.room,
        building: formData.building,
      });

      // 🔁 เรียก API ไปที่ Firebase Function เพื่อผูก Rich Menu
      await fetch('https://console.firebase.google.com/project/condoconnect-ae133/usage/details>/api/link-richmenu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          role: formData.role,
        }),
      });

      alert("✅ ลงทะเบียนสำเร็จ");
      navigate('/profile');
    } catch (err) {
      console.error("❌ บันทึกไม่สำเร็จ:", err);
      alert("เกิดข้อผิดพลาดในการลงทะเบียน");
    }
  };

  return (
    <div className="container">
      <h2>ลงทะเบียน</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="fullname" placeholder="ชื่อ" onChange={handleChange} required />
        <input type="text" name="surname" placeholder="นามสกุล" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="เบอร์โทร" onChange={handleChange} required />
        <input type="email" name="email" placeholder="อีเมล" onChange={handleChange} required />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="">เลือกบทบาท</option>
          <option value="A">ลูกบ้าน</option>
          <option value="B">นิติบุคคล</option>
          <option value="C">ช่าง</option>
        </select>
        <select name="room" value={formData.room} onChange={handleChange} required>
          <option value="">เลือกห้อง</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <select name="building" value={formData.building} onChange={handleChange} required>
          <option value="">เลือกตึก</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <button type="submit">ยืนยัน</button>
      </form>
    </div>
  );
};

export default Register;
