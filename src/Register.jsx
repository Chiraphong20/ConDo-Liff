import React, { useEffect, useState } from 'react';
import { Form, Input, Select, Button, message, Typography } from 'antd';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import { Row, Col } from 'antd';
import "./CSS/Register.css";
const { Title } = Typography;
const { Option } = Select;

const Register = () => {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({ liffId: '2007355122-xBNrkXmM', withLoginOnExternalBrowser: true });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        const accessToken = liff.getAccessToken();

        if (!accessToken) {
          message.error('⚠️ กรุณาเปิดลิงก์ผ่านแอป LINE และเพิ่มเพื่อนกับ OA ก่อนใช้งาน');
          return;
        }

        setUserId(profile.userId);
        setDisplayName(profile.displayName);
      } catch (err) {
        console.error('LIFF init error:', err);
        message.error('ไม่สามารถเชื่อมต่อกับ LINE ได้\n' + err.message);
      }
    };

    initLiff();
  }, []);

  const onFinish = async (values) => {
    if (!userId) {
      message.warning("⚠️ ไม่สามารถระบุผู้ใช้ได้ กรุณาเข้าใหม่ผ่านแอป LINE");
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        name: values.fullname,
        phone: values.phone,
        email: values.email,
        room: values.room,
        building: values.building,
        role: values.role,
        displayName,
      };

      await setDoc(doc(db, 'users', userId), userData);
      message.success('✅ ลงทะเบียนสำเร็จ');

      let welcomeMessage = 'ลงทะเบียนเรียบร้อย';
      if (values.role === 'resident') welcomeMessage = 'ยินดีต้อนรับลูกบ้าน';
      else if (values.role === 'juristic') welcomeMessage = 'สวัสดีนิติบุคคล';
      else if (values.role === 'technician') welcomeMessage = 'เข้าสู่ระบบช่าง';

      try {
        await liff.sendMessages([{ type: 'text', text: welcomeMessage }]);
      } catch (err) {
        console.warn('⚠️ ไม่สามารถส่งข้อความผ่าน LIFF ได้:', err.message);
      }

      // คุณสามารถ redirect ได้ที่นี่ เช่น navigate('/home');

    } catch (err) {
      message.error('❌ เกิดข้อผิดพลาด: ' + err.message);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container">
      <Title level={3} style={{ textAlign: 'center' ,color:'#FFF'}}>ลงทะเบียน</Title>
    <Form
  form={form}
  layout="vertical"
  onFinish={onFinish}
  className="custom-rounded-input"
  disabled={isSubmitting}
>
        <Form.Item
          name="fullname"
          label={<span style={{ color: 'white' }}>ชื่อ-นามสกุล</span>}
          rules={[{ required: true, message: 'กรุณากรอกชื่อ-นามสกุล' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label={<span style={{ color: 'white' }}>เบอร์โทร</span>}
          rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร' }]}
        >
          <Input />
        </Form.Item>

         <Form.Item
          name="email"
          label={<span style={{ color: 'white' }}>อีเมลล์</span>}
          rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร' }]}
        >
          <Input />
        </Form.Item>
<Row gutter={16}>
  <Col span={8}>
    <Form.Item
      name="room"
      label={<span style={{ color: 'white' }}>ห้อง</span>}
      rules={[{ required: true, message: 'กรุณากรอกห้อง' }]}
    >
      <Input />
    </Form.Item>
  </Col>

  <Col span={8}>
    <Form.Item
      name="building"
      label={<span style={{ color: 'white' }}>ตึก</span>}
      rules={[{ required: true, message: 'กรุณากรอกตึก' }]}
    >
      <Input />
    </Form.Item>
  </Col>

  <Col span={8}>
    <Form.Item
      name="role"
      label={<span style={{ color: 'white' }}>บทบาท</span>}
      rules={[{ required: true, message: 'กรุณาเลือกบทบาท' }]}
    >
      <Select placeholder="เลือกบทบาท" onChange={(value) => setRole(value)}>
        <Option value="resident">ลูกบ้าน</Option>
        <Option value="juristic">นิติบุคคล</Option>
        <Option value="technician">ช่าง</Option>
      </Select>
    </Form.Item>
  </Col>
</Row>

        {role === 'technician' && (
          <Form.Item
            name="keycode"
            label="รหัสช่าง"
            rules={[{ required: true, message: 'กรุณากรอกรหัสช่าง' }]}
          >
            <Input.Password />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={isSubmitting}>
            ลงทะเบียน
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
