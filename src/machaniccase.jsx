import React, { useState, useEffect } from 'react';
import { Tabs, Card, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { collectionGroup, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import liff from '@line/liff'; 

const { Title, Text } = Typography;

const MachanicCase = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');
  const [repairOrders, setRepairOrders] = useState([]);
  const [repairStatus, setRepairStatus] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initLiffAndFetchRepairs = async () => {
      try {
        await liff.init({ liffId: '2007355122-xBNrkXmM' });
        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        const uid = profile.userId;
        setUserId(uid);

       const repairSnapshot = await getDocs(collectionGroup(db, 'repair'));
const repairs = repairSnapshot.docs.map(doc => {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    ...data.userInfo,  // ดึงข้อมูลผู้ใช้ที่แนบมากับ repair
    image: data.media, // แปลง media เป็น image
    topic: data.title,
    detail: data.description,
    date: data.createdAt?.toDate().toLocaleDateString() || '-',
    status: data.status || 'pending'
  };
});


     const orders = repairs.filter(r => !r.status || r.status === 'pending');
const status = repairs.filter(r => r.status && r.status !== 'pending');

setRepairOrders(orders);
setRepairStatus(status);
      } catch (error) {
        console.error('โหลดข้อมูลซ่อมไม่สำเร็จ', error);
      }
    };

    initLiffAndFetchRepairs();
  }, []);

  const handleCardClick = (tab) => {
    navigate(tab === 'orders' ? '/machanic' : '/machanicstatus');
  };

  return (
    <div className="container" style={{ padding: 16 }}>
      <h2 style={{ textAlign: 'center' }}>
        {activeTab === 'orders' ? 'เคสสั่งซ่อม' : 'สถานะเคสสั่งซ่อม'}
      </h2>

      <Tabs
        activeKey={activeTab}
        onChange={(key) => setActiveTab(key)}
        centered
        items={[
          { key: 'orders', label: 'คำสั่งซ่อม' },
          { key: 'status', label: 'สถานะการซ่อม' },
        ]}
      />

      {(activeTab === 'orders' ? repairOrders : repairStatus).map((item) => (
        <Card
          key={item.id}
          hoverable
          onClick={() => handleCardClick(activeTab)}
          style={{
            width: 400,
            borderRadius: 12,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
            margin: '16px auto',
          }}
        >
          <Row gutter={16} style={{ alignItems: 'center' }}>
            <Col span={8}>
              <img
                src={item.image || 'https://via.placeholder.com/140'}
                alt={item.topic}
                style={{
                  width: '100%',
                  height: 140,
                  objectFit: 'cover',
                  borderRadius: 18,
                  display: 'block',
                }}
              />
            </Col>
            <Col span={16} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ textAlign: 'left' }}>
                <Title level={5} style={{ margin: 0 }}>ห้อง: {item.room || '-'}</Title>
                <Text strong>ชื่อ: </Text>{item.name || '-'}<br />
                <Text strong>เบอร์: </Text>{item.phone || '-'}<br />
                <Text strong>หัวข้อ: </Text>{item.topic || '-'}<br />
                <Text strong>รายละเอียด: </Text><br />
                <Text type="secondary" style={{ fontSize: 12 }}>{item.detail || '-'}</Text><br />
                {item.status && (
                  <>
                    <Text strong>สถานะ: </Text>
                    <Text type="danger">{item.status}</Text><br />
                  </>
                )}
                <Text strong>วันที่: </Text>{item.date || '-'}
              </div>
            </Col>
          </Row>
        </Card>
      ))}
    </div>
  );
};

export default MachanicCase;