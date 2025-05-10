import React, { useState, useEffect } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import './CSS/Register.css';

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

      alert("✅ ลงทะเบียนสำเร็จ");
      navigate('/profile'); // ไปที่หน้าข้อมูลส่วนตัว
    } catch (err) {
      console.error("❌ บันทึกไม่สำเร็จ:", err);
      alert("เกิดข้อผิดพลาดในการลงทะเบียน");
    }
  };

  return (
    <div className="container">
      <h2>ลงทะเบียน</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">ชื่อ</label>
        <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />

        <label htmlFor="surname">นามสกุล</label>
        <input type="text" name="surname" value={formData.surname} onChange={handleChange} required />

        <label htmlFor="phone">เบอร์โทรศัพท์</label>
        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />

        <label htmlFor="email">อีเมลล์</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <div className="row">
          <div className="form-group">
            <label htmlFor="role">บทบาท</label>
            <select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">เลือกบทบาท</option>
              <option value="A">ลูกบ้าน</option>
              <option value="B">นิติบุคคล</option>
              <option value="C">ช่าง</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="room">ห้อง</label>
            <select name="room" value={formData.room} onChange={handleChange} required>
              <option value="">เลือกห้อง</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="building">ตึก</label>
            <select name="building" value={formData.building} onChange={handleChange} required>
              <option value="">เลือกตึก</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>

        <div className="submit">
          <button type="button" className="buttoncancel" onClick={() => navigate('/')}>ยกเลิก</button>
          <button type="submit" className="buttonOK">ยืนยัน</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
