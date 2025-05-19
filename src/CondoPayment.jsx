import React, { useState } from 'react';
import { Input, Button, Modal, Form, Select } from 'antd';
import './CSS/CondoPayment.css';

const CondoPayment = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [rooms, setRooms] = useState([
  { room: '115', name: 'นาย สุดหล่อ คนดี', phone: '0938134123', status: 'ยังไม่ชำระ', billType: 'ค่าน้ำ', amount: '3500' },
  { room: '115', name: 'นาย สุดหล่อ คนดี', phone: '0938134123', status: 'ยังไม่ชำระ', billType: 'ค่าน้ำ', amount: '3500' },
  { room: '115', name: 'นาย สุดหล่อ คนดี', phone: '0938134123', status: 'ยังไม่ชำระ', billType: 'ค่าน้ำ', amount: '3500' },
  { room: '115', name: 'นาย สุดหล่อ คนดี', phone: '0938134123', status: 'ยังไม่ชำระ', billType: 'ค่าน้ำ', amount: '3500' },
  ]);
  const [form] = Form.useForm();
const { Option } = Select;

  const handleAddRoom = (values) => {
    setRooms([...rooms, {
      room: values.roomNumber,
      name: values.residentName,
      phone: values.phone,
      billType: values.billType,
      amount: values.billType,
    }]);
    setModalVisible(false);
    form.resetFields();
  };

  const handleDelete = () => {
    // ลบตัวสุดท้ายเพื่อเป็นตัวอย่าง (หรือกำหนดจากที่เลือกได้)
    setRooms(prev => prev.slice(0, -1));
    setModalVisible(false);
  };

  const openModal = (type) => {
    setModalType(type);
    setModalVisible(true);
  };

  return (
    <div className="content">
      <div className="sectionheader">
        <div className="search-box">
          <img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" width="20" height="20" alt="search" />
          <Input placeholder="ค้นหา..." bordered={false} />
        </div>
        <p>คนที่ค้างชำระ</p>
        <div className="Group">
        <Button className="btn-add" onClick={() => openModal('add')}>
          แจ้งยอดชำระ +
        </Button>
        <Button className="btn-edit" onClick={() => openModal('edit')}>
          แก้ไข
        </Button>
        <Button className="btn-delete" onClick={() => openModal('delete')}>
          ลบ
        </Button>
        </div>
      </div>

 <div className="room-section">
  {rooms.map((room, index) => (
    <div key={index} className="room-card">
      <div className="status-label">
        <span className="red-dot" />
        <span className="status-text">{room.status}</span>
      </div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/6001/6001179.png"
        alt="building"
        style={{ width: 60, margin: '10px 0' }}
      />
      <div><b>{room.name.split(' ')[0]} {room.name.split(' ').slice(1).join(' ')}</b></div>
      <div><b>เบอร์ : {room.phone}</b></div>
      <div><b>ห้อง {room.room}</b></div>
      <div><b>{room.billType} :{room.amount} บาท</b></div>
    </div>
  ))}
</div>


      {/* Modal สำหรับแต่ละประเภท */}
      <Modal
        title={
          modalType === 'add' ? 'แจ้งยอดชำระ' :
          modalType === 'edit' ? 'แก้ไขข้อมูล' :
          modalType === 'delete' ? 'ยืนยันการลบ' : ''
        }
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
     {modalType === 'add' && (
  <Form layout="vertical" onFinish={handleAddRoom} form={form}>
    <Form.Item label="ห้องที่" name="roomNumber" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
  <Form.Item label="ประเภทบิล" name="billType" rules={[{ required: true, message: 'กรุณาเลือกประเภทบิล' }]}>
  <Select placeholder="เลือกประเภทบิล">
    <Option value="ค่าน้ำ">ค่าน้ำ</Option>
    <Option value="ค่าไฟ">ค่าไฟ</Option>
    <Option value="ค่าส่วนกลาง">ค่าส่วนกลาง</Option>
  </Select>
</Form.Item>

    <Form.Item label="ยอดชำระ" name="amount" rules={[{ required: true }]}>
      <Input />
    </Form.Item>
    <Form.Item label="รอบเดือน" name="billingCycle" rules={[{ required: true }]}>
      <Input type="date" />
    </Form.Item>
    <Form.Item label="วันกำหนดชำระ" name="dueDate" rules={[{ required: true }]}>
      <Input type="date" />
    </Form.Item>
    <div className="modal-buttons">
      <Button onClick={() => setModalVisible(false)} className="cancel">ยกเลิก</Button>
      <Button htmlType="submit" type="primary" className="save">บันทึก</Button>
    </div>
  </Form>
)}

        {/* แบบฟอร์มแก้ไข */}
        {modalType === 'edit' && (
          <p>ฟอร์มแก้ไข (อยู่ระหว่างพัฒนา)</p>
        )}

        {/* ยืนยันการลบ */}
        {modalType === 'delete' && (
          <>
            <p>คุณต้องการลบข้อมูลล่าสุดใช่หรือไม่?</p>
            <div className="modal-buttons">
              <Button onClick={() => setModalVisible(false)} className="cancel">ยกเลิก</Button>
              <Button onClick={handleDelete} type="primary" danger>ลบ</Button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default CondoPayment;
