import React, { useState } from 'react';
import { Tabs, Card, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

// ข้อมูลคำสั่งซ่อม
const repairOrders = [
  {
    id: 1,
    room: '116',
    name: 'สุดหล่อ คนดี',
    phone: '0821451235',
    topic: 'ประตูพัง',
    detail: 'ประตูเปิดไม่ติดมีสนิมเกาะอย่างมาก....................',
    date: '11/5/2568',
    image:
      'https://s.isanook.com/wo/0/ud/45/228153/228153-20221224084331-ed33440.jpg?ip/resize/w728/q80/jpg',
  },
  // เพิ่มรายการอื่นได้
];

// ข้อมูลสถานะการซ่อม
const repairStatus = [
  {
    id: 1,
    room: '116',
    name: 'สุดหล่อ คนดี',
    phone: '0821451235',
    topic: 'ประตูพัง',
    detail: 'ประตูเปิดไม่ติดมีสนิมเกาะอย่างมาก',
    date: '11/5/2568',
    status: 'กำลังดำเนินการ',
    image:
      'https://s.isanook.com/wo/0/ud/45/228153/228153-20221224084331-ed33440.jpg?ip/resize/w728/q80/jpg',
  },
  // เพิ่มรายการอื่นได้
];

const MachanicDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  const handleCardClick = (tab) => {
    if (tab === 'orders') {
      navigate('/machanic');
    } else {
      navigate('/machanicstatus');
    }
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
          {
            key: 'orders',
            label: 'คำสั่งซ่อม',
          },
          {
            key: 'status',
            label: 'สถานะการซ่อม',
          },
        ]}
      />

      {/* แสดงคำสั่งซ่อม */}
       {activeTab === 'orders' &&
        repairOrders.map((item) => (
          <Card
            key={item.id}
            hoverable
            onClick={() => handleCardClick('orders')}
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
                  src={item.image}
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
              <Col
                span={16}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <div style={{ textAlign: 'left' }}>
                  <Title level={5} style={{ margin: 0 }}>
                    ห้อง: {item.room}
                  </Title>
                  <Text strong>ชื่อ: </Text>
                  {item.name}
                  <br />
                  <Text strong>เบอร์: </Text>
                  {item.phone}
                  <br />
                  <Text strong>หัวข้อ: </Text>
                  {item.topic}
                  <br />
                  <Text strong>รายละเอียด: </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.detail}
                  </Text>
                  <br />
                  <Text strong>วันที่: </Text>
                  {item.date}
                  <br />
                </div>
              </Col>
            </Row>
          </Card>
        ))}
      {activeTab === 'orders' &&
        repairOrders.map((item) => (
          <Card
            key={item.id}
            hoverable
            onClick={() => handleCardClick('orders')}
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
                  src={item.image}
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
              <Col
                span={16}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <div style={{ textAlign: 'left' }}>
                  <Title level={5} style={{ margin: 0 }}>
                    ห้อง: {item.room}
                  </Title>
                  <Text strong>ชื่อ: </Text>
                  {item.name}
                  <br />
                  <Text strong>เบอร์: </Text>
                  {item.phone}
                  <br />
                  <Text strong>หัวข้อ: </Text>
                  {item.topic}
                  <br />
                  <Text strong>รายละเอียด: </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.detail}
                  </Text>
                  <br />
                  <Text strong>วันที่: </Text>
                  {item.date}
                  <br />
                </div>
              </Col>
            </Row>
          </Card>
        ))}

      {/* แสดงสถานะการซ่อม */}
      {activeTab === 'status' &&
        repairStatus.map((item) => (
          <Card
            key={item.id}
            hoverable
            onClick={() => handleCardClick('status')}
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
                  src={item.image}
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
              <Col
                span={16}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <div style={{ textAlign: 'left' }}>
                  <Title level={5} style={{ margin: 0 }}>
                    ห้อง: {item.room}
                  </Title>
                  <Text strong>ชื่อ: </Text>
                  {item.name}
                  <br />
                  <Text strong>เบอร์: </Text>
                  {item.phone}
                  <br />
                  <Text strong>หัวข้อ: </Text>
                  {item.topic}
                  <br />
                  <Text strong>รายละเอียด: </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.detail}
                  </Text>
                  <br />
                  <Text strong>สถานะ: </Text>
                  <Text type="danger">{item.status}</Text>
                  <br />
                  <Text strong>วันที่: </Text>
                  {item.date}
                  <br />
                </div>
              </Col>
            </Row>
          </Card>
        ))}
      {activeTab === 'status' &&
        repairStatus.map((item) => (
          <Card
            key={item.id}
            hoverable
            onClick={() => handleCardClick('status')}
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
                  src={item.image}
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
              <Col
                span={16}
                style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
              >
                <div style={{ textAlign: 'left' }}>
                  <Title level={5} style={{ margin: 0 }}>
                    ห้อง: {item.room}
                  </Title>
                  <Text strong>ชื่อ: </Text>
                  {item.name}
                  <br />
                  <Text strong>เบอร์: </Text>
                  {item.phone}
                  <br />
                  <Text strong>หัวข้อ: </Text>
                  {item.topic}
                  <br />
                  <Text strong>รายละเอียด: </Text>
                  <br />
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    {item.detail}
                  </Text>
                  <br />
                  <Text strong>สถานะ: </Text>
                  <Text type="danger">{item.status}</Text>
                  <br />
                  <Text strong>วันที่: </Text>
                  {item.date}
                  <br />
                </div>
              </Col>
            </Row>
          </Card>
        ))}
    </div>
  );
};

export default MachanicDashboard;
