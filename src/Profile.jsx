import React, { useEffect, useState } from 'react';
import liff from '@line/liff';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import './CSS/Profile.css';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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

        const docRef = doc(db, "users", userId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile({ ...docSnap.data(), uid: userId });
        } else {
          console.warn("ไม่มีข้อมูลในฐานข้อมูลสำหรับ UID:", userId);
          setProfile({
            name: userProfile.displayName,
            room: '-',
            building: '-',
            phone: '-',
            uid: userId,
          });
        }

        setLoading(false);
      } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

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
