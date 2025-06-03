import React, { useState, useEffect } from 'react';
import { Tabs, Card, Row, Col, Typography, Spin } from 'antd';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import liff from '@line/liff';
import "./CSS/machaniccase.css";

const { Title, Text } = Typography;

const MachanicCase = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [repairOrders, setRepairOrders] = useState([]);
  const [repairStatus, setRepairStatus] = useState([]);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ เรียก LIFF เพื่อดึง userId ของช่าง
  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: '2007355122-N49L86B2' });
        if (!liff.isLoggedIn()) {
          liff.login();
        } else {
          const profile = await liff.getProfile();
          setUserId(profile.userId);
        }
      } catch (error) {
        console.error('❌ LIFF Error:', error);
      }
    };
    initLiff();
  }, []);

  // ✅ โหลดงานจาก assignedTasks
  useEffect(() => {
    const fetchAssignedTasks = async () => {
      if (!userId) return;
      setLoading(true);

      try {
        const assignedRef = collection(db, 'users', userId, 'assignedTasks');
        const assignedSnap = await getDocs(assignedRef);

        const assignedList = assignedSnap.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            ...(data.userInfo || {}),
            image: data.media || '',
            topic: data.title || '',
            detail: data.description || '',
            date: data.createdAt?.toDate?.().toLocaleDateString?.() || '-',
            status: data.status || 'pending',
          };
        });

        const orders = assignedList.filter(r => r.status === 'กำลังดำเนินการ' || !r.status || r.status === 'pending');
        const status = assignedList.filter(r => r.status && r.status !== 'pending' && r.status !== 'กำลังดำเนินการ');

        setRepairOrders(orders);
        setRepairStatus(status);
      } catch (error) {
        console.error('❌ ดึงข้อมูลไม่สำเร็จ:', error);
      }

      setLoading(false);
    };

    fetchAssignedTasks();
  }, [userId]);

  const handleCardClick = (item, tab) => {
    navigate(`/machanic/${userId}/${item.id}`);
  };

  const currentItems = activeTab === 'orders' ? repairOrders : repairStatus;

  return (
    <div
    className="container"
    style={{
      padding: '300px 16px 16px',
      backgroundColor: '#fff', // พื้นหลังสีขาว
      minHeight: '100vh' // ให้เต็มหน้าจอ
    }}
  >
    <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#FFF' }}>
      {activeTab === 'orders' ? 'เคสสั่งซ่อม' : 'สถานะเคสสั่งซ่อม'}
    </h2>
    <Tabs
      activeKey={activeTab}
      onChange={setActiveTab}
      centered
      tabBarStyle={{
        color: '#fff',             
      }}
      items={[
        { key: 'orders', label: <span style={{ color: '#fff' }}>คำสั่งซ่อม</span> },
        { key: 'status', label: <span style={{ color: '#fff' }}>สถานะการซ่อม</span> },
      ]}
    />
      {loading ? (
        <div style={{ textAlign: 'center', padding: 50 }}>
          <Spin tip="กำลังโหลดงาน..." size="large" />
        </div>
      ) : currentItems.length === 0 ? (
        <p style={{ textAlign: 'center' }}>ยังไม่มีงาน</p>
      ) : (
        currentItems.map(item => (
          <Card
            key={item.id}
            hoverable
            onClick={() => handleCardClick(item, activeTab)}
            style={{
              width: '95%',
              maxWidth: 440,
              borderRadius: 16,
              boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
              margin: '20px auto',
              backgroundColor: '#f9f9f9',
            }}
          >
            <Row gutter={16} style={{ alignItems: 'center' }}>
              <Col span={8}>
                <img
                  src={item.image || 'https://via.placeholder.com/140'}
                  alt={item.topic}
                  style={{
                    width: '100%',
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 12,
                    display: 'block',
                  }}
                />
              </Col>
             <Col
            span={16}
            className="card-text"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            <div style={{ textAlign: 'left', paddingLeft: 8 }}>
              <Title level={5} style={{ margin: '0 0 4px 0' }}>ห้อง: {item.room || '-'}</Title>
              
              <label>ชื่อ: </label>{item.name || '-'}<br />
              <label>เบอร์: </label>{item.phone || '-'}<br />
              <label>หัวข้อ: </label>{item.topic || '-'}<br />
              <label>รายละเอียด: </label><br />
              <span style={{ fontSize: 12, display: 'inline-block', marginBottom: 4 }}>
                {item.detail || '-'}
              </span><br />

              {item.status && (
                <>
                  <label>สถานะ: </label>
                  <span style={{ color: 'red' }}>{item.status}</span><br />
                </>
              )}

              <label>วันที่: </label>{item.date || '-'}
            </div>
          </Col>
            </Row>
          </Card>
        ))
      )}
    </div>
  );
};

export default MachanicCase;
