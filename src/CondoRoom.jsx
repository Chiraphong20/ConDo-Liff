import React, { useState } from 'react';
import { Input, Button, Modal, Form } from 'antd';
import './CSS/CondoRoom.css';

const CondoRoom = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rooms, setRooms] = useState([
    { room: '115', name: 'นาย สุดหล่อ คนดี', phone: '0938134123' },
    { room: '116', name: 'นาย สุดหล่อ คนดี', phone: '0938134123' },
  ]);

  const [form] = Form.useForm();

  const handleAddRoom = (values) => {
    setRooms([...rooms, {
      room: values.roomNumber,
      name: values.residentName,
      phone: values.phone,
    }]);
    setModalVisible(false);
    form.resetFields();
  };

  return (
    <div className="content">
      <div className="sectionheader">
        <div className="search-box">
          <img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" width="20" height="20" alt="search" />
          <Input placeholder="ค้นหา..." bordered={false} />
        </div>
        <h1>ข้อมูลห้อง</h1>
        <Button id="addRoomBtn" onClick={() => setModalVisible(true)}>
          เพิ่มห้อง +
        </Button>
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
