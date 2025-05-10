import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import liff from '@line/liff';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await liff.init({ liffId: '2007355122-xBNrkXmM' });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const userProfile = await liff.getProfile();
        const userId = userProfile.userId;

        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile({ ...docSnap.data(), uid: userId });
        } else {
          navigate('/register'); // ไปหน้าลงทะเบียนถ้าไม่มีข้อมูล
          return;
        }

        setLoading(false);
      } catch (err) {
        console.error("❌ เกิดข้อผิดพลาด:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) return <div className="container">กำลังโหลดข้อมูล...</div>;

  return (
    <div className="container">
      <h2>ข้อมูลส่วนตัว</h2>
      <p>ชื่อ: {profile.name}</p>
      <p>ห้อง: {profile.room}</p>
      <p>อาคาร: {profile.building}</p>
      <p>เบอร์โทร: {profile.phone}</p>
      <p>UID: {profile.uid}</p>
    </div>
  );
}

export default Profile;
