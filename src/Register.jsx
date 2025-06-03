import React, { useState, useEffect } from 'react';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import liff from '@line/liff';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  message,
  Typography,
} from 'antd';
import './CSS/Register.css';

const { Option } = Select;
const { Title } = Typography;

const Register = () => {
  const [form] = Form.useForm();
  const [userId, setUserId] = useState(null);
  const [displayName, setDisplayName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  // 🔁 ดึงภาพแล้วแปลง Base64
  const fetchImageAsBase64 = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    const initLiff = async () => {
      try {
        await liff.init({
          liffId: '2007355122-xBNrkXmM',
          withLoginOnExternalBrowser: true,
        });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();
        const accessToken = liff.getAccessToken();

        if (!accessToken) {
          message.warning('⚠️ กรุณาเปิดลิงก์ผ่านแอป LINE และเพิ่มเพื่อนกับ OA ก่อนใช้งาน');
          return;
        }

        const userId = profile.userId;
        setUserId(userId);
        setDisplayName(profile.displayName);

        const base64Image = await fetchImageAsBase64(profile.pictureUrl);
        form.setFieldsValue({ profileImage: base64Image });

        const docRef = doc(db, 'users', userId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          navigate('/register');
        }
      } catch (err) {
        console.error('LIFF init error:', err);
        message.error('ไม่สามารถเชื่อมต่อกับ LINE ได้\n' + err.message);
      }
    };

    initLiff();
  }, []);

  const handleSubmit = async (values) => {
    if (!userId) {
      message.error('⚠️ ไม่สามารถระบุผู้ใช้ได้ กรุณาเข้าใหม่ผ่านแอป LINE');
      return;
    }

    if (values.role === 'technician' && (!values.keycode || values.keycode.trim() === '')) {
      message.error('กรุณากรอกรหัสช่าง');
      return;
    }

    setIsSubmitting(true);

    try {
      const userData = {
        name: values.fullname,
        phone: values.phone,
        email: values.email,
        role: values.role,
        displayName,
        profileImage: values.profileImage || '',
      };

      if (values.role !== 'technician') {
        userData.room = values.room;
        userData.building = values.building;
      }

      await setDoc(doc(db, 'users', userId), userData);

      // 🔥 ยิง API เพื่อเปลี่ยน Rich Menu
      await fetch('https://your-vercel-backend.vercel.app/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, role: values.role }),
      });

      message.success('✅ ลงทะเบียนสำเร็จ');

      let welcomeMessage = '';
      switch (values.role) {
        case 'resident':
          welcomeMessage = 'ยินดีต้อนรับลูกบ้าน';
          break;
        case 'juristic':
          welcomeMessage = 'สวัสดีนิติบุคคล';
          break;
        case 'technician':
          welcomeMessage = 'เข้าสู่ระบบช่าง';
          break;
        default:
          welcomeMessage = 'ลงทะเบียนเรียบร้อย';
      }

      try {
        await liff.sendMessages([{ type: 'text', text: welcomeMessage }]);
      } catch (err) {
        console.warn('⚠️ ไม่สามารถส่งข้อความผ่าน LIFF ได้:', err.message);
      }
    } catch (err) {
      message.error('❌ เกิดข้อผิดพลาด: ' + err.message);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setRole('');
  };

  const onRoleChange = (value) => {
    setRole(value);
    form.setFieldsValue({ room: '', building: '', keycode: '' });
  };

  return (
    <div
      style={{
        maxWidth: 450,
        margin: 'auto',
        padding: 30,
        backgroundImage: "url('/images/2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        boxShadow: '0 8px 16px rgba(0,0,0,0.25)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <Title level={3} style={{ color: 'white', textAlign: 'center', marginBottom: 24 }}>
        ลงทะเบียน
      </Title>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{ role: '' }}
        style={{ color: 'white' }}
      >
        <Form.Item name="profileImage" hidden>
          <Input />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'white' }}>ชื่อ-นามสกุล</span>}
          name="fullname"
          rules={[{ required: true, message: 'กรุณากรอกชื่อ-นามสกุล' }]}
        >
          <Input disabled={isSubmitting} style={{ borderRadius: '64px' }} />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'white' }}>เบอร์โทร</span>}
          name="phone"
          rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร' }]}
        >
          <Input disabled={isSubmitting} style={{ borderRadius: '64px' }} />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'white' }}>อีเมลล์</span>}
          name="email"
          rules={[
            { required: true, message: 'กรุณากรอกอีเมล' },
            { type: 'email', message: 'รูปแบบอีเมลไม่ถูกต้อง' },
          ]}
        >
          <Input disabled={isSubmitting} style={{ borderRadius: '64px' }} />
        </Form.Item>

        <Form.Item
          label={<span style={{ color: 'white' }}>บทบาท</span>}
          name="role"
          rules={[{ required: true, message: 'เลือกบทบาท' }]}
        >
          <Select
            disabled={isSubmitting}
            className="rounded-input"
            onChange={onRoleChange}
            placeholder="เลือกบทบาท"
          >
            <Option value="resident">ลูกบ้าน</Option>
            <Option value="juristic">นิติบุคคล</Option>
            <Option value="technician">ช่าง</Option>
          </Select>
        </Form.Item>

        {role !== 'technician' && (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: 'white' }}>ห้อง</span>}
                name="room"
                rules={[{ required: true, message: 'กรุณากรอกห้อง' }]}
              >
                <Input disabled={isSubmitting} style={{ borderRadius: '64px' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={<span style={{ color: 'white' }}>ตึก</span>}
                name="building"
                rules={[{ required: true, message: 'กรุณากรอกตึก' }]}
              >
                <Input disabled={isSubmitting} style={{ borderRadius: '64px' }} />
              </Form.Item>
            </Col>
          </Row>
        )}

        {role === 'technician' && (
          <Form.Item
            label={<span style={{ color: 'white' }}>รหัสช่าง</span>}
            name="keycode"
            rules={[{ required: true, message: 'กรุณากรอกรหัสช่าง' }]}
          >
            <Input.Password disabled={isSubmitting} />
          </Form.Item>
        )}

        <Form.Item>
          <Row justify="center" gutter={16}>
            <Col>
              <Button
                htmlType="button"
                onClick={handleCancel}
                disabled={isSubmitting}
                style={{
                  backgroundColor: '#FF8282',
                  color: 'white',
                  padding: '8px 24px',
                  fontSize: '16px',
                  borderRadius: '20px',
                  border: 'none',
                  minWidth: '100px',
                  marginTop: '20px',
                }}
              >
                ยกเลิก
              </Button>
            </Col>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                style={{
                  backgroundColor: '#22C38A',
                  borderColor: '#4caf50',
                  padding: '8px 24px',
                  fontSize: '16px',
                  borderRadius: '20px',
                  minWidth: '100px',
                  marginTop: '20px',
                }}
              >
                ยืนยัน
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
