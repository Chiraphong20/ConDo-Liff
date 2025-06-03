import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import dayjs from 'dayjs';
import { Input, DatePicker, Image } from 'antd';
import liff from '@line/liff';
import "./CSS/machanic.css";

const Machanic = () => {
  const { userId, taskId } = useParams(); // 🟡 ตอนนี้ใช้ taskId แทน repairId
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ date: null });
  const [taskData, setTaskData] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        await liff.init({ liffId: '2007355122-xBNrkXmM' });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        setCurrentUserId(profile.userId);

        const docRef = doc(db, 'users', userId, 'assignedTasks', taskId); // ✅ โหลดจาก assignedTasks
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTaskData({ id: docSnap.id, ...data });

          if (data.mechanicDate) {
            setFormData({ date: data.mechanicDate });
          }
        } else {
          alert('ไม่พบข้อมูลงาน');
          navigate(-1);
        }
      } catch (error) {
        console.error('โหลดข้อมูลผิดพลาด', error);
        alert('เกิดข้อผิดพลาดในการโหลดข้อมูล');
      }
    };

    if (userId && taskId) {
      fetchTaskData();
    }
  }, [userId, taskId, navigate]);

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
      const taskRef = doc(db, 'users', userId, 'assignedTasks', taskId);
      await updateDoc(taskRef, {
        mechanicDate: formData.date,
        status: 'in progress',
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

  if (!taskData) return <p>กำลังโหลด...</p>;
console.log('taskData:', taskData);

  return (
    <div className="container">
      <div className='mac'>
      <h2>รายละเอียดคำสั่งซ่อม</h2>
      <form onSubmit={handleSubmit}>
        <label>เลขห้อง</label>
        <Input value={taskData.room || taskData.userInfo?.room || ''} disabled />

        <label>ชื่อ-นามสกุล</label>
        <Input value={taskData.name || taskData.userInfo?.name || ''} disabled />

        <label>หัวข้อ</label>
        <Input value={taskData.title || taskData.topic} disabled />

        <label>รายละเอียด</label>
        <Input.TextArea value={taskData.description || taskData.detail} disabled rows={4} />

        <label>เบอร์โทรศัพท์</label>
        <Input value={taskData.phone || taskData.userInfo?.phone || ''} disabled />

        <label>ภาพประกอบ</label>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          <Image
            width={200}
            src={taskData.media || taskData.image}
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
    </div>
  );
};

export default Machanic;
