import React, { useState, useEffect } from 'react';
import './CSS/Status.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import liff from '@line/liff';

const Status = () => {
  const [activeTab, setActiveTab] = useState('status');
  const [modalOpen, setModalOpen] = useState(false);
  const [repairs, setRepairs] = useState([]);
  const [selectedRepair, setSelectedRepair] = useState(null);
  const [technicians, setTechnicians] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await liff.init({ liffId: '2007355122-Y1D6GoVR' });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        const repairColRef = collection(db, 'users', profile.userId, 'repair');
        const complaintColRef = collection(db, 'users', profile.userId, 'complaint');

        const [repairSnapshot, complaintSnapshot] = await Promise.all([
          getDocs(repairColRef),
          getDocs(complaintColRef),
        ]);

        const repairList = repairSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            type: 'repair',
            createdAt: data.createdAt?.toDate().toLocaleString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }) || '-',
          };
        });

        const complaintList = complaintSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            type: 'complaint',
            createdAt: data.createdAt?.toDate().toLocaleString('th-TH', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }) || '-',
          };
        });

        setRepairs([...repairList, ...complaintList]);
      } catch (err) {
        console.error('โหลดข้อมูลล้มเหลว:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const userColRef = collection(db, 'users');
        const userSnapshot = await getDocs(userColRef);
        const techList = userSnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(user => user.role === 'technician');
        setTechnicians(techList);
      } catch (err) {
        console.error('โหลดข้อมูลเจ้าหน้าที่ล้มเหลว:', err);
      }
    };

    fetchTechnicians();
  }, []);

  const openTab = (tabId) => setActiveTab(tabId);
  const showDetail = (repair) => {
    setSelectedRepair(repair);
    setModalOpen(true);
  };
  const closeDetail = () => {
    setModalOpen(false);
    setSelectedRepair(null);
  };

  const renderRepairItem = (repair) => (
    <li key={repair.id} className="status-item" onClick={() => showDetail(repair)}>
      <span className={`status ${repair.status === 'เสร็จสิ้น' ? 'done' : 'pending'}`}>
        {repair.status || 'ยังไม่ดำเนินการ'}
      </span>
      <span className="label">{repair.title}</span>
      <div className="type-label">{repair.type === 'complaint' ? 'ร้องเรียน' : 'แจ้งซ่อม'}</div>
    </li>
  );

  return (
    <div className="container">
      <div className="tabs">
        <div className={`tab ${activeTab === 'status' ? 'active' : ''}`} onClick={() => openTab('status')}>
          ติดตามสถานะ
        </div>
        <div className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => openTab('history')}>
          ประวัติ
        </div>
      </div>

      {activeTab === 'status' && (
        <div className="tab-content active">
          <div className="tab-header">
            <div>สถานะ</div>
            <div>หัวข้อ</div>
          </div>
          <ul className="status-list">
            {repairs.filter(r => r.status !== 'เสร็จสิ้น').map(renderRepairItem)}
          </ul>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="tab-content active">
          <div className="tab-header">
            <div>สถานะ</div>
            <div>หัวข้อ</div>
          </div>
          <ul className="status-list">
            {repairs.filter(r => r.status === 'เสร็จสิ้น').map(renderRepairItem)}
          </ul>
        </div>
      )}

      {modalOpen && selectedRepair && (
        <div className="modal" onClick={closeDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeDetail}>&times;</span>
            <h3>รายละเอียดสถานะ</h3>

            {selectedRepair.mediaType?.startsWith('video') ? (
              <video width="100%" style={{ maxWidth: '300px', display: 'block', margin: '0 auto' }} controls>
                <source src={selectedRepair.media} type={selectedRepair.mediaType} />
              </video>
            ) : (
              <img
                src={selectedRepair.media}
                alt="media"
                style={{ width: '100%', maxWidth: '200px', borderRadius: 10, display: 'block', margin: '0 auto' }}
              />
            )}

            <p><strong>ประเภท:</strong> {selectedRepair.type === 'complaint' ? 'ร้องเรียน' : 'แจ้งซ่อม'}</p>
            <p><strong>หัวข้อ:</strong> {selectedRepair.title}</p>
            <p><strong>วันที่:</strong> {selectedRepair.createdAt || '-'}</p>
            <p><strong>รายละเอียด:</strong> {selectedRepair.description}</p>

            {selectedRepair.officerId && (() => {
              const tech = technicians.find(
                t => t.id === selectedRepair.officerId || t.uid === selectedRepair.officerId
              );
              if (!tech) return null;
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <img
                    src="https://pmserviceth.com/wp-content/uploads/2021/10/หน้าที่หลักของช่างอาคาร-คืออะไร.jpg"
                    alt="เจ้าหน้าที่"
                    style={{ width: 50, height: 50, borderRadius: '50%' }}
                  />
                  <div>
                    <div>ช่าง{tech.name}</div>
                    <div>{tech.phone}</div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;