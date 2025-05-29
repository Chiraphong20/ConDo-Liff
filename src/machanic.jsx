import React, { useState, useEffect } from 'react';
import './CSS/machanic.css';
import { Input, Image, DatePicker } from 'antd';
import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router-dom';
import liff from '@line/liff'; // เพิ่ม liff

const Machanic = () => {
  const [formData, setFormData] = useState({ date: null });
  const [repairData, setRepairData] = useState(null);
  const [userId, setUserId] = useState(null); // userId ของเจ้าของ repair
  const navigate = useNavigate();

  const { repairId } = useParams();

  useEffect(() => {
    const fetchRepairData = async () => {
      try {
        await liff.init({ liffId: '2007355122-xBNrkXmM' });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        const uid = profile.userId;
        setUserId(uid); // เซ็ต userId ไว้ใช้ตอน update

        // ต้องรู้ userId ของ repair นั้น → สมมติว่า repairId มี structure เช่น "USERID_อะไรก็ได้"
        const [ownerId, rawId] = repairId.split('_'); // สมมุติว่า repairId เก็บไว้แบบนี้
        const docRef = doc(db, 'users', ownerId, 'repair', rawId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setRepairData({ id: docSnap.id, ...data });
          if (data.mechanicDate) {
            setFormData({ date: data.mechanicDate });
          }
        } else {
          alert('ไม่พบข้อมูลการซ่อม');
          navigate(-1);
        }
      } catch (error) {
        console.error('โหลดข้อมูลผิดพลาด', error);
        alert('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
    };

    if (repairId) {
      fetchRepairData();
    }
  }, [repairId, navigate]);

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
      const [ownerId, rawId] = repairId.split('_');
      const repairRef = doc(db, 'users', ownerId, 'repair', rawId);
      await updateDoc(repairRef, {
        mechanicDate: formData.date,
        status: 'scheduled',
      });

      alert('บันทึกวันที่สำเร็จ');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error updating document:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    }
  };

  const handleCancel = () => {
    navigate(-1);
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
        <Input.TextArea value={repairData.details || repairData.detail} disabled rows={4} />

        <label>เบอร์โทรศัพท์</label>
        <Input value={repairData.phone} disabled />

        <label>ภาพประกอบ</label>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Image
            width={200}
            src={repairData.imageUrl || repairData.image}
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
