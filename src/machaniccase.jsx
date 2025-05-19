import React from 'react';
import { Card, Row, Col, Typography, Image } from 'antd';

const { Title, Text } = Typography;

const MachanicCase = () => {
  return (

    <div className="container"> 
      <h2>คำสั่งซ่อม</h2>

    <Card 
  hoverable
 style={{
  width: 400,
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  margin: '16px auto', // ตรงกลางทุกใบ!
}}
>
      <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
        <Col span={8} style={{ height: '100%' }}>
          <div style={{ height: '100%' }}>
            <img
              src="https://s.isanook.com/wo/0/ud/45/228153/228153-20221224084331-ed33440.jpg?ip/resize/w728/q80/jpg"
              alt="broken door"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 18,
              }}
            />
          </div>
        </Col>
        <Col span={16}>
          <div style={{ textAlign: 'left' }}>
            <Title level={5} style={{ margin: 0 }}>ห้อง: 116</Title>
            <Text strong>ชื่อ: </Text>สุดหล่อ คนดี<br />
            <Text strong>เบอร์: </Text>0821451235<br />
            <Text strong>หัวข้อ: </Text>ประตูพัง<br />
            <Text strong>รายละเอียด: </Text><br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              ประตูเปิดไม่ติดมีสนิมเกาะอย่างมาก....................
            </Text><br />
            <Text strong>วันที่: </Text> 11/5/2568<br />
          </div>
        </Col>
      </Row>
    </Card>

    <Card 
  hoverable
 style={{
  width: 400,
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  margin: '16px auto', // ตรงกลางทุกใบ!
}}
>
      <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
        <Col span={8} style={{ height: '100%' }}>
          <div style={{ height: '100%' }}>
            <img
              src="https://s.isanook.com/wo/0/ud/45/228153/228153-20221224084331-ed33440.jpg?ip/resize/w728/q80/jpg"
              alt="broken door"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 18,
              }}
            />
          </div>
        </Col>
        <Col span={16}>
          <div style={{ textAlign: 'left' }}>
            <Title level={5} style={{ margin: 0 }}>ห้อง: 116</Title>
            <Text strong>ชื่อ: </Text>สุดหล่อ คนดี<br />
            <Text strong>เบอร์: </Text>0821451235<br />
            <Text strong>หัวข้อ: </Text>ประตูพัง<br />
            <Text strong>รายละเอียด: </Text><br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              ประตูเปิดไม่ติดมีสนิมเกาะอย่างมาก....................
            </Text><br />
            <Text strong>วันที่: </Text> 11/5/2568<br />
          </div>
        </Col>
      </Row>
    </Card>

    <Card 
  hoverable
  style={{
  width: 400,
  borderRadius: 12,
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  margin: '16px auto', // ตรงกลางทุกใบ!
}}
>
      <Row gutter={16} style={{ display: 'flex', alignItems: 'stretch' }}>
        <Col span={8} style={{ height: '100%' }}>
          <div style={{ height: '100%' }}>
            <img
              src="https://s.isanook.com/wo/0/ud/45/228153/228153-20221224084331-ed33440.jpg?ip/resize/w728/q80/jpg"
              alt="broken door"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 18,
              }}
            />
          </div>
        </Col>
        <Col span={16}>
          <div style={{ textAlign: 'left' }}>
            <Title level={5} style={{ margin: 0 }}>ห้อง: 116</Title>
            <Text strong>ชื่อ: </Text>สุดหล่อ คนดี<br />
            <Text strong>เบอร์: </Text>0821451235<br />
            <Text strong>หัวข้อ: </Text>ประตูพัง<br />
            <Text strong>รายละเอียด: </Text><br />
            <Text type="secondary" style={{ fontSize: 12 }}>
              ประตูเปิดไม่ติดมีสนิมเกาะอย่างมาก....................
            </Text><br />
            <Text strong>วันที่: </Text> 11/5/2568<br />
          </div>
        </Col>
      </Row>
              <onclick></onclick>
    </Card>
    </div>
    
  );
};

export default MachanicCase;
