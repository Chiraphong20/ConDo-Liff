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
  const [isSubmitting, setIsSubmitting] = useState(false);
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
        const accessToken = liff.getAccessToken();

        if (!accessToken) {
          alert('⚠️ กรุณาเปิดลิงก์ผ่านแอป LINE และเพิ่มเพื่อนกับ OA ก่อนใช้งาน');
          return;
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

    setIsSubmitting(true);

    try {
      const userData = {
        name: formData.fullname,
        phone: formData.phone,
        room: formData.room,
        building: formData.building,
        role: formData.role,
        displayName,
      };

      await setDoc(doc(db, 'users', userId), userData);

      alert('✅ ลงทะเบียนสำเร็จ');

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
      alert('❌ เกิดข้อผิดพลาด: ' + err.message);
      console.error(err);
    } finally {
      setIsSubmitting(false);
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
          disabled={isSubmitting}
        />
        <input
          type="tel"
          name="phone"
          placeholder="เบอร์โทร"
          value={formData.phone}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
        <input
          type="text"
          name="room"
          placeholder="ห้อง"
          value={formData.room}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />
        <input
          type="text"
          name="building"
          placeholder="ตึก"
          value={formData.building}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        />

        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          required
          disabled={isSubmitting}
        >
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
            disabled={isSubmitting}
          />
        )}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'กำลังส่งข้อมูล...' : 'ลงทะเบียน'}
        </button>
      </form>
    </div>
  );
};

export default Register;
