import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, Avatar } from 'antd';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from './firebase'; // import firebase config ของคุณ
import liff from '@line/liff';
import './CSS/CondoReport.css';

const CondoReport = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [repairs, setRepairs] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initLiffAndLoadRepairs = async () => {
      try {
        await liff.init({ liffId: '2007355122-xBNrkXmM' });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }
        const profile = await liff.getProfile();
        setUserId(profile.userId);

        // ดึงข้อมูลแจ้งซ่อม จาก Firestore subcollection users/{userId}/repair
        const repairColRef = collection(db, 'users', profile.userId, 'repair');
        const repairSnapshot = await getDocs(repairColRef);
        const repairList = repairSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setRepairs(repairList);
      } catch (error) {
        console.error('โหลดข้อมูลแจ้งซ่อมไม่สำเร็จ:', error);
      }
    };

    initLiffAndLoadRepairs();
  }, []);

  const handleCardClick = (repair) => {
    setSelectedRoom(repair);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedRoom(null);
  };

  return (
    <div className="content">
      <div className="sectionheader">
        <div className="search-box">
          <img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" width="20" height="20" alt="search" />
          <Input placeholder="ค้นหา..." bordered={false} />
        </div>
        <p>รับเรื่องร้องขอ</p>
        <div className="Group">
          <Button className="btn-add" onClick={() => setModalVisible(true)}>
            รับเรื่อง
          </Button>
          <Button className="btn-delete">
            ลบ
          </Button>
        </div>
      </div>

      {/* แสดงรายการแจ้งซ่อม */}
      <div className="room-section">
        {repairs.length === 0 ? (
          <p>ไม่มีข้อมูลแจ้งซ่อม</p>
        ) : (
          repairs.map((repair, index) => (
            <div key={index} className="room-card" onClick={() => handleCardClick(repair)}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/6001/6001179.png"
                alt="building"
                style={{ width: 60, margin: '10px 0' }}
              />
              <div><b>{repair.userInfo?.name || '-'}</b></div>
              <div><b>เบอร์ : {repair.userInfo?.phone || '-'}</b></div>
              <div><b>ห้อง {repair.userInfo?.room || '-'}</b></div>
              <div><b>{repair.title || '-'}</b></div>
            </div>
          ))
        )}
      </div>

      {/* Modal รายละเอียดแจ้งซ่อม */}
      <Modal
        title="รับเรื่องร้องขอ"
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        {selectedRoom && (
          <div>
            <p><b>หมวดหมู่:</b> {selectedRoom.type || 'แจ้งซ่อม'}</p>
            <p><b>หัวข้อ:</b> {selectedRoom.title}</p>
            <p><b>ข้อมูลเพิ่มเติม:</b></p>
            <p>{selectedRoom.description}</p>

            {/* สมมติถ้ามี media เป็น array URL */}
        {selectedRoom.media && (
  <>
    <p><b>มีเดีย:</b></p>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {selectedRoom.mediaType?.startsWith('video') ? (
        <video width="300" height="200" controls style={{ borderRadius: 8 }}>
          <source src={selectedRoom.media} type={selectedRoom.mediaType} />
          เบราว์เซอร์ของคุณไม่รองรับการเล่นวิดีโอ
        </video>
      ) : (
        <img
          src={selectedRoom.media}
          alt="media"
          width={200}
          height={200}
          style={{ borderRadius: 8, objectFit: 'cover' }}
        />
      )}
    </div>
  </>
)}


            {/* แสดงเจ้าหน้าที่ ถ้ามี */}
            {selectedRoom.officers && selectedRoom.officers.length > 0 && (
              <>
                <p style={{ marginTop: 16 }}><b>มอบหมายเจ้าหน้าที่:</b></p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  {selectedRoom.officers.map((officer, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <Avatar size={48} />
                      <p style={{ margin: 4 }}>{officer.name}</p>
                      <p style={{ fontSize: 12 }}>{officer.phone}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            <div className="modal-buttons">
              <Button onClick={() => setModalVisible(false)} className="cancel">ยกเลิก</Button>
              <Button type="primary" className="save">บันทึก</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CondoReport;
