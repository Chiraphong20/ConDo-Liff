import React, { useState, useEffect } from 'react';
import './CSS/machanic.css';
import { Input, Image, DatePicker } from 'antd';
import { db } from './firebase';
import { doc, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom'; // << เพิ่ม

const dummyRepairData = {
  id: 'repair123',
  room: '116',
  name: 'สุดหล่อ คนดี',
  topic: 'ประตูพัง',
  details: 'มีสนิมเกาะไม่สามารถใช้งานชั่วคราวได้',
  phone: '0812345678',
  imageUrl: 'https://s.isanook.com/wo/0/ud/45/228153/228153-20221224084331-ed33440.jpg?ip/resize/w728/q80/jpg',
};

const Machanic = () => {
  const [formData, setFormData] = useState({
    date: null,
  });

  const [repairData, setRepairData] = useState(null);
  const navigate = useNavigate(); // << สำหรับเปลี่ยนหน้า

  useEffect(() => {
    setRepairData(dummyRepairData);
  }, []);

  const handleDateChange = (date, dateString) => {
    setFormData({ date: dateString });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.date) {
      alert('กรุณาเลือกวันที่จะเข้าซ่อม');
      return;
    }

    try {
      const repairRef = doc(db, 'repairs', repairData.id);
      await updateDoc(repairRef, {
        mechanicDate: formData.date,
        status: 'scheduled',
      });

      alert('บันทึกวันที่สำเร็จ');
      navigate('/dashboard'); // เปลี่ยน path ได้ตามที่คุณต้องการ
    } catch (error) {
      console.error('Error updating document:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  const handleCancel = () => {
    navigate(-1); // ย้อนกลับ 1 หน้า หรือจะใช้ navigate('/dashboard') ก็ได้
  };

  if (!repairData) return <p>กำลังโหลด...</p>;

  return (
    <div className="container">
      <h2>รายละเอียดการซ่อมแซม</h2>

      <form onSubmit={handleSubmit}>
        <label>เลขห้อง</label>
        <Input value={repairData.room} disabled />

        <label>ชื่อ-นามสกุล</label>
        <Input value={repairData.name} disabled />

        <label>หัวข้อ</label>
        <Input value={repairData.topic} disabled />

        <label>รายละเอียด</label>
        <Input.TextArea value={repairData.details} disabled rows={4} />

        <label>เบอร์โทรศัพท์</label>
        <Input value={repairData.phone} disabled />

        

        <label>ภาพประกอบ</label>
        <div style={{ marginTop: '20px' ,marginBottom: '20px'}}>
  <Image
    width={200}
    src={repairData.imageUrl}
    alt="รูปภาพจากลูกบ้าน"
  />
</div>
        <label>วันที่จะเข้าซ่อม</label>
        <DatePicker
          style={{ width: '100%' }}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
          value={formData.date ? dayjs(formData.date) : null}
        />

        <div className="submit">
          <button type="button" className="buttoncancel" onClick={handleCancel}>
            ยกเลิก
          </button>
          <button type="submit" className="buttonOK">
            บันทึกวันที่
          </button>
        </div>
      </form>
    </div>
  );
};

export default Machanic;
