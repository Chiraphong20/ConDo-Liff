import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select, Upload, Tabs, Typography, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { db } from './firebase';
import { addDoc, collection, doc, getDoc, serverTimestamp } from 'firebase/firestore';
import liff from '@line/liff';
import './CSS/Repair.css';
import repairIcon from './assets/repair-icon.png';
import complaintIcon from './assets/complaint-icon.png';
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const { Title } = Typography;

function Repair() {
  const [userId, setUserId] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: '2007355122-N49L86B2' });

        if (!liff.isLoggedIn()) {
          liff.login({ redirectUri: window.location.href });
          return;
        }

        const profile = await liff.getProfile();
        setUserId(profile.userId);

        const userRef = doc(db, 'users', profile.userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          setUserProfile(userSnap.data());
        } else {
          message.warning('ไม่พบข้อมูลผู้ใช้ กรุณาลงทะเบียนก่อน');
        }
      } catch (error) {
        message.error('เกิดข้อผิดพลาดในการโหลดข้อมูล LINE: ' + error.message);
      }
    };

    initLiff();
  }, []);

  const handleSubmit = async (values, type) => {
    if (!userId || !userProfile) {
      message.warning('ไม่สามารถระบุผู้ใช้งานได้ กรุณาลงทะเบียนก่อน');
      return;
    }

    const { title, description, upload } = values;

    let base64Data = null;
    if (upload && upload[0]?.originFileObj) {
      const file = upload[0].originFileObj;
      base64Data = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const userInfo = {
      name: userProfile.name || '',
      phone: userProfile.phone || '',
      email: userProfile.email || '',
      role: userProfile.role || '',
      room: userProfile.room || '',
      building: userProfile.building || '',
      userId,
    };

    try {
      const subcollectionRef = collection(db, 'users', userId, type);
      await addDoc(subcollectionRef, {
        title,
        description,
        type,
        userInfo,
        createdAt: serverTimestamp(),
        media: base64Data || null,
        mediaType: upload?.[0]?.type || null,
        mediaName: upload?.[0]?.name || null,
      });

      message.success('✅ ส่งข้อมูลสำเร็จ');
    } catch (error) {
      console.error('❌ Error:', error);
      message.error('เกิดข้อผิดพลาดในการส่งข้อมูล');
    }
  };

  return (
    <div className="container">
      <Title level={4} style={{ textAlign: 'center', color:'white' }}>แจ้งซ่อม / ร้องเรียน</Title>
      <Tabs defaultActiveKey="repair" centered>
            <TabPane
              key="repair"
              tab={
                <div className="tab-icon" style={{ color: 'white' }}>
                  <img src={repairIcon} alt="แจ้งซ่อม" />
                  <div className="repair-label">แจ้งซ่อม</div>
                </div>
              }
            >

          <Form layout="vertical" onFinish={(v) => handleSubmit(v, 'repair')}>
            <Form.Item name="title" label={<span style={{ color: 'white' }}>หัวข้อ</span>} rules={[{ required: true, message: 'กรุณาเลือกหัวข้อ' }]}>
              <Select placeholder="เลือกประเภทการซ่อม">
                <Option value="ซ่อมประตู">ซ่อมประตู</Option>
                <Option value="ไฟฟ้า">ไฟฟ้า</Option>
                <Option value="ประปา">ประปา</Option>
              </Select>
            </Form.Item>

            <Form.Item name="description" label="คำอธิบายเพิ่มเติม" rules={[{ required: true }]}>
              <TextArea rows={5} placeholder="อธิบายปัญหา..." />
            </Form.Item>

            <Form.Item name="upload" label="อัปโหลดวิดีโอ / รูปภาพ" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
              <Upload beforeUpload={() => false} accept="image/*,video/*" maxCount={1}>
                <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>ส่งแจ้งซ่อม</Button>
            </Form.Item>
          </Form>
        </TabPane>

        <TabPane
          key="complaint"
          tab={
            <div className="tab-icon" style={{ color: 'white' }}>
              <img src={complaintIcon} alt="ร้องเรียน" />
              <div className="repair-label">ร้องเรียน</div>
            </div>
          }
        >

          <Form layout="vertical" onFinish={(v) => handleSubmit(v, 'complaint')}>
            <Form.Item name="title" label="หัวข้อ" rules={[{ required: true, message: 'กรุณาเลือกหัวข้อ' }]}>
              <Select placeholder="เลือกหัวข้อร้องเรียน">
                <Option value="นิติบุคคลไม่ให้ความร่วมมือ">นิติบุคคลไม่ให้ความร่วมมือ</Option>
                <Option value="พฤติกรรมเพื่อนบ้าน">พฤติกรรมเพื่อนบ้าน</Option>
                <Option value="อื่น ๆ">อื่น ๆ</Option>
              </Select>
            </Form.Item>

            <Form.Item name="description" label="คำอธิบายเพิ่มเติม" rules={[{ required: true }]}>
              <TextArea rows={5} placeholder="อธิบายปัญหา..." />
            </Form.Item>

            <Form.Item name="upload" label="อัปโหลดวิดีโอ / รูปภาพ" valuePropName="fileList" getValueFromEvent={e => e.fileList}>
              <Upload beforeUpload={() => false} accept="image/*,video/*" maxCount={1}>
                <Button icon={<UploadOutlined />}>เลือกไฟล์</Button>
              </Upload>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>ส่งเรื่องร้องเรียน</Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
}

export default Repair