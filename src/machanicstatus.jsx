import React, { useState, useEffect } from 'react';
import './CSS/machanicstatus.css';
import { Image, Select, Input, Upload, message, Modal } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { db } from './firebase';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // ✅ เพิ่มตรงนี้

const { TextArea } = Input;

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const Machanicstatus = () => {
  const [formData, setFormData] = useState({
    id: 'repair123',
    room: '116',
    name: 'สุดหล่อ คนดี',
    topic: 'ประตูพัง',
    details: 'มีสนิมเกาะไม่สามารถใช้งานชั่วคราวได้',
    phone: '0812345678',
    imageUrl: 'https://s.isanook.com/wo/0/ud/45/228153/228153-20221224084331-ed33440.jpg?ip/resize/w728/q80/jpg',
    status: '',
  });
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate(); // ✅ ใช้ navigate

  useEffect(() => {
    const q = query(collection(db, 'repairRequests'), orderBy('timestamp', 'desc'), limit(1));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        const data = doc.data();
        setFormData((prev) => ({
          ...prev,
          room: data.room,
          name: data.name,
          topic: data.topic,
          details: data.details,
          phone: data.phone,
          imageUrl: data.imageUrl || '',
        }));
      });
    });

    return () => unsubscribe();
  }, []);

  const handleStatusChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      status: value,
    }));
  };

  const handleImageChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('ส่งข้อมูล:', formData);
    console.log('ภาพอัปโหลด:', fileList);

    // ใส่ logic บันทึกข้อมูลกลับ Firebase ได้ตรงนี้ถ้าต้องการ

    // แสดง Modal แจ้งเตือนบันทึกสำเร็จ
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    navigate(-1); // ✅ ย้อนกลับหน้าก่อนหน้า
  };

  const handleCancel = () => {
    navigate(-1); // ✅ ทำงานแล้ว
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className="container">
      <h2>อัพเดทสถานะคำสั่งซ่อม</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="room">เลขห้อง</label>
        <Input id="room" name="room" value={formData.room} disabled />

        <label htmlFor="name">ชื่อ-นามสกุล</label>
        <Input id="name" name="name" value={formData.name} disabled />

        <label htmlFor="topic">หัวข้อ</label>
        <Input id="topic" name="topic" value={formData.topic} disabled />

        <label htmlFor="details">รายละเอียด</label>
        <TextArea id="details" name="details" value={formData.details} disabled />

        <label htmlFor="phone">เบอร์โทรศัพท์</label>
        <Input id="phone" name="phone" value={formData.phone} disabled />

        <label>มีเดียร์ (จากลูกบ้าน)</label>
        <div style={{ marginTop: '20px', marginBottom: '20px' }}>
          {formData.imageUrl && (
            <Image width={200} src={formData.imageUrl} alt="รูปจากลูกบ้าน" />
          )}
        </div>

        <label htmlFor="status">สถานะ</label>
        <Select
          showSearch
          style={{ width: '100%', marginBottom: '16px', textAlign: 'left' }}
          placeholder="เลือกสถานะ"
          value={formData.status}
          onChange={handleStatusChange}
          options={[
            {
              value: '1',
              label: <span style={{ color: 'green' }}>ซ่อมแซมเสร็จสิ้น</span>,
            },
            {
              value: '2',
              label: <span style={{ color: 'red' }}>ไม่สามารถซ่อมแซมได้</span>,
            },
            {
              value: '3',
              label: <span style={{ color: '#faad14' }}>รออะไหล่ซ่อมแซม</span>,
            },
          ]}
        />

        <label>อัพโหลดรูปภาพเพิ่มเติม</label>
        <div style={{ textAlign: 'left' }}>
          <Upload
            name="image"
            listType="picture-card"
            className="avatar-uploader"
            multiple
            showUploadList={true}
            fileList={fileList}
            onChange={handleImageChange}
            beforeUpload={beforeUpload}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
        </div>

        <div className="submit">
          <button type="button" className="buttoncancel" onClick={handleCancel}>
            ยกเลิก
          </button>
          <button type="submit" className="buttonOK">
            ยืนยัน
          </button>
        </div>
      </form>

      <Modal
        title="บันทึกข้อมูล"
        open={isModalVisible}
        onOk={handleOk}
        footer={[
          <button key="ok" className="buttonOK" onClick={handleOk}>
            กลับ
          </button>,
        ]}
        closable={false}
      >
        <p>บันทึกเสร็จสิ้นแล้ว</p>
      </Modal>
    </div>
  );
};

export default Machanicstatus;