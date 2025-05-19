import React, { useState } from 'react';
import { Input, Button, Modal, Form, Select, Upload, Avatar } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import './CSS/CondoStatus.css';

const { Option } = Select;

const CondoStatus = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([
    {
      room: '112',
      name: 'นาย สุดหล่อ คนดี',
      phone: '0938134123',
      complaintTopic: 'ข้างห้องเสียงดัง',
      status: 'กำลังดำเนินการ',
      detail: 'ddddddddddddddddddddddddd ddddddddddd',
      media: [
        'https://cdn.pixabay.com/photo/2016/08/08/09/17/people-1572058_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/01/20/00/30/building-1991894_960_720.jpg'
      ],
      officers: [
        { name: 'นายสมพง กกกก', phone: '0921312541' },
      ]
    },
     {
      room: '113',
      name: 'นาย สุดหล่อ คนดี',
      phone: '0938134123',
      complaintTopic: 'ข้างห้องเสียงดัง',
      status: 'กำลังดำเนินการ',
      detail: 'ddddddddddddddddddddddddd ddddddddddd',
      media: [
        'https://cdn.pixabay.com/photo/2016/08/08/09/17/people-1572058_960_720.jpg',
        'https://cdn.pixabay.com/photo/2017/01/20/00/30/building-1991894_960_720.jpg'
      ],
      officers: [
        { name: 'นายสมพง กกกก', phone: '0921312541' },
      ]
    }
    
  ]);

  const handleCardClick = (room) => {
    setSelectedRoom(room);
    setModalType('view');
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setSelectedRoom(null);
  };

  return (
    <div className="content">
      <div className="sectionheader">
        <div className="search-box">
          <img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" width="20" height="20" alt="search" />
          <Input placeholder="ค้นหา..." bordered={false} />
        </div>
        <p>ติดตามสภานะ</p>
        <div className="Group">
          
        </div>
      </div>

      {/* แสดงรายการร้องเรียน */}
      <div className="room-section">
  {rooms.map((room, index) => (
    <div key={index} className="room-card">
      <div className="status-label">
        <span className="red-dot" />
        <span className="status-text">{room.status}</span>
      </div>

      {/* ปุ่ม i แสดงรายละเอียด */}
      <div className="info-icon" onClick={() => handleCardClick(room)} style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}>
        <InfoCircleOutlined style={{ fontSize: 20, color: '#1890ff' }} />
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/6001/6001179.png"
        alt="building"
        style={{ width: 60, margin: '10px 0' }}
      />
      <div><b>{room.name}</b></div>
      <div><b>เบอร์ : {room.phone}</b></div>
      <div><b>ห้อง {room.room}</b></div>
      <div><b>{room.complaintTopic}</b></div>
    </div>
  ))}
</div>

      {/* Modal รายละเอียด */}
      <Modal
        title="รับเรื่องร้องขอ"
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        {selectedRoom && (
  <div>
    <p><b>หมวดหมู่:</b> แจ้งร้องเรียน</p>
    <p><b>หัวข้อ:</b> {selectedRoom.complaintTopic}</p>
   

    <p><b>ข้อมูลเพิ่มเติม:</b></p>
    <p>{selectedRoom.detail}</p>

    <p><b>มีเดีย:</b></p>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
      {selectedRoom.media?.map((url, idx) => (
        <img key={idx} src={url} alt={`media-${idx}`} width={100} height={100} style={{ borderRadius: 8 }} />
      ))}
    </div>

    <p style={{ marginTop: 16 }}><b>มอบหมายเจ้าหน้าที่:</b></p>
    <div style={{ display: 'flex', gap: '20px' }}>
      {selectedRoom.officers?.map((officer, i) => (
        <div key={i} style={{ textAlign: 'center' }}>
          <Avatar size={48} />
          <p style={{ margin: 4 }}>{officer.name}</p>
          <p style={{ fontSize: 12 }}>{officer.phone}</p>
        </div>
      ))}
    </div>
 <p><b>สถานะ:</b> 
      <span style={{ marginLeft: 8 }}>
        <span style={{ 
          display: 'inline-block', 
          width: 8, 
          height: 8, 
          borderRadius: '50%', 
          backgroundColor: 'red',  // สีส้ม "กำลังดำเนินการ"
          marginRight: 6 
        }} />
        {selectedRoom.status || 'กำลังดำเนินการ'}
      </span>
    </p>
    <div className="modal-buttons">
      <Button onClick={() => setModalVisible(false)} className="cancel">ยกเลิก</Button>
      <Button htmlType="submit" type="primary" className="save">บันทึก</Button>
    </div>
  </div>
)}

      </Modal>
    </div>
  );
};

export default CondoStatus;
