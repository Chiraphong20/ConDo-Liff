import React, { useState, useEffect } from 'react';
import './CSS/Repair.css';
import { db } from './firebase';
import { addDoc, collection, serverTimestamp, doc, getDoc } from 'firebase/firestore';
import liff from '@line/liff';

function Repair() {
  const [activeTab, setActiveTab] = useState('repair');
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const initLiffAndFetchUser = async () => {
      try {
        await liff.init({ liffId: '2007355122-xBNrkXmM' });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        setUserId(profile.userId);

        const userDocRef = doc(db, 'users', profile.userId);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          setUserProfile(userDocSnap.data());
        } else {
          alert('ไม่พบข้อมูลผู้ใช้ในระบบ กรุณาลงทะเบียนก่อน');
        }
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', err);
      }
    };

    initLiffAndFetchUser();
  }, []);

  const handleSubmit = async (e, type) => {
    e.preventDefault();
    const form = e.target;
    const title = form.querySelector('select').value;
    const description = form.querySelector('textarea').value;

    if (!userId || !userProfile) {
      alert('ไม่สามารถระบุผู้ใช้งานได้ กรุณาลงทะเบียนก่อน');
      return;
    }

    const userInfo = {
      name: userProfile.name || '',
      phone: userProfile.phone || '',
      email: userProfile.email || '',
      role: userProfile.role || '',
      room: userProfile.room || '',
      building: userProfile.building || '',
      userId: userId,
    };

    try {
      await addDoc(collection(db, type === 'repair' ? 'repairs' : 'complaints'), {
        title,
        description,
        type,
        userId,
        userInfo,
        createdAt: serverTimestamp(),
      });

      alert('✅ ส่งข้อมูลสำเร็จ');
      form.reset();
    } catch (error) {
      console.error('❌ เกิดข้อผิดพลาด:', error);
      alert('ส่งข้อมูลไม่สำเร็จ');
    }
  };

  return (
    <div>
      {/* ข้อมูลผู้ใช้งาน */}
      {userProfile && (
        <div className="user-info">
          <h3>ข้อมูลผู้ใช้งาน</h3>
          <p><strong>ชื่อ:</strong> {userProfile.name || 'ไม่ระบุ'}</p>
          <p><strong>เบอร์โทร:</strong> {userProfile.phone || 'ไม่ระบุ'}</p>
          <p><strong>อีเมล:</strong> {userProfile.email || 'ไม่ระบุ'}</p>
          <p><strong>ห้อง:</strong> {userProfile.room || 'ไม่ระบุ'}</p>
          <p><strong>อาคาร:</strong> {userProfile.building || 'ไม่ระบุ'}</p>
          <p><strong>สิทธิ์:</strong> {userProfile.role || 'ไม่ระบุ'}</p>
          <p><strong>LINE UserID:</strong> {userId}</p>
        </div>
      )}

      {/* ปุ่มสลับ Tab */}
      <div className="tab-bar">
        <div className={`tab ${activeTab === 'repair' ? 'active' : ''}`} onClick={() => setActiveTab('repair')}>
          แจ้งซ่อม
        </div>
        <div className={`tab ${activeTab === 'complaint' ? 'active' : ''}`} onClick={() => setActiveTab('complaint')}>
          ร้องเรียน
        </div>
      </div>

      {/* ฟอร์มแจ้งซ่อม */}
      {activeTab === 'repair' && (
        <div className="container tab-content active">
          <h2>แจ้งซ่อม</h2>
          <form onSubmit={(e) => handleSubmit(e, 'repair')}>
            <label>หัวข้อ</label>
            <select required>
              <option value="">..................</option>
              <option value="ซ่อมประตู">ซ่อมประตู</option>
              <option value="ไฟฟ้า">ไฟฟ้า</option>
              <option value="ประปา">ประปา</option>
            </select>

            <label>คำอธิบายเพิ่มเติม</label>
            <div className="textarea-wrapper">
              <textarea rows="6" placeholder="อธิบายปัญหา..." required></textarea>
            </div>

            <div className="uploadpic">
              <label>อัพโหลดวิดีโอ / รูปภาพ</label>
              <input type="file" accept="image/*,video/*" />
              <label>หรือ</label>
              <label>ถ่ายรูป / วิดีโอ</label>
              <input type="file" accept="image/*,video/*" capture="environment" />
            </div>

            <button type="submit">ส่งแจ้งซ่อม</button>
          </form>
        </div>
      )}

      {/* ฟอร์มร้องเรียน */}
      {activeTab === 'complaint' && (
        <div className="container tab-content active">
          <h2>ร้องเรียน</h2>
          <form onSubmit={(e) => handleSubmit(e, 'complaint')}>
            <label>หัวข้อ</label>
            <select required>
              <option value="">..................</option>
              <option value="นิติบุคคลไม่ให้ความร่วมมือ">นิติบุคคลไม่ให้ความร่วมมือ</option>
              <option value="พฤติกรรมเพื่อนบ้าน">พฤติกรรมเพื่อนบ้าน</option>
              <option value="อื่น ๆ">อื่น ๆ</option>
            </select>

            <label>คำอธิบายเพิ่มเติม</label>
            <div className="textarea-wrapper">
              <textarea rows="6" placeholder="อธิบายปัญหา..." required></textarea>
            </div>

            <div className="uploadpic">
              <label>อัพโหลดวิดีโอ / รูปภาพ</label>
              <input type="file" accept="image/*,video/*" />
              <label>หรือ</label>
              <label>ถ่ายรูป / วิดีโอ</label>
              <input type="file" accept="image/*,video/*" capture="environment" />
            </div>

            <button type="submit">ส่งเรื่องร้องเรียน</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Repair;
