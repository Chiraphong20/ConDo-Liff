import React, { useState, useEffect } from 'react';
import { Input, Button, Modal, Form } from 'antd';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { db } from './firebase';
import './CSS/CondoRoom.css';

const CondoRoom = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userData = querySnapshot.docs.map(doc => ({
          ...doc.data(),
          id: doc.id,
        }));
        setRooms(userData);
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการโหลดข้อมูล:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleAddRoom = async (values) => {
    const newRoom = {
      room: values.roomNumber,
      name: values.residentName,
      phone: values.phone,
      uid: values.uid || '',
      moveInDate: values.moveInDate || '',
    };

    try {
      await addDoc(collection(db, 'users'), newRoom);
      setRooms([...rooms, newRoom]);
      form.resetFields();
      setModalVisible(false);
    } catch (err) {
      console.error('เกิดข้อผิดพลาดในการเพิ่มห้อง:', err);
    }
  };

  return (
    <div className="content">
      <div className="sectionheader">
        <div className="search-box">
          <img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" width="20" height="20" alt="search" />
          <Input placeholder="ค้นหา..." bordered={false} />
        </div>
        <p>ข้อมูลห้อง</p>
        <Button className="btn-large" onClick={() => setModalVisible(true)}>เพิ่มห้อง +</Button>
      </div>

      <div className="room-section">
        {rooms.map((room, index) => (
          <div key={index} className="room-card">
            <img src="https://cdn-icons-png.flaticon.com/512/6001/6001179.png" alt="avatar" />
            <div>{room.name}</div>
            <div>เบอร์ : {room.phone}</div>
            <b>ห้อง {room.room}</b>
          </div>
        ))}
      </div>

      <Modal
        title="เพิ่มห้องใหม่"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleAddRoom} form={form}>
          <Form.Item label="ห้องที่" name="roomNumber" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="ผู้พักอาศัย" name="residentName" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="เบอร์โทร" name="phone" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item label="UID" name="uid">
            <Input />
          </Form.Item>
          <Form.Item label="วันเข้าอาศัย" name="moveInDate">
            <Input type="date" />
          </Form.Item>
          <div className="modal-buttons">
            <Button onClick={() => setModalVisible(false)} className="cancel">ยกเลิก</Button>
            <Button htmlType="submit" type="primary" className="save">บันทึก</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CondoRoom;
