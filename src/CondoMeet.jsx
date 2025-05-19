import React, { useState } from 'react';
import { Modal, Button, Select } from 'antd';
import './CSS/CondoMeet.css';

const { Option } = Select;

const rooms = [
  { id: 'A1', booked: true, time: '10:00–12:00', name: 'นาย สุดหล่อ คนดี', tel: '0923123512' },
  { id: 'A2', booked: false },
  { id: 'A3', booked: false },
  { id: 'B1', booked: false },
  { id: 'B2', booked: true, time: '10:00–12:00', name: 'นาย สุดหล่อ คนดี', tel: '0923123512' },
  { id: 'B3', booked: false },
];

const CondoMeet = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleRoomClick = (room) => {
    if (room.booked) {
      setSelectedRoom(room);
      setModalOpen(true);
    }
  };

  const handleCancel = () => {
    setModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <div className="meeting-container">
      <h2>ตรวจสอบการจองห้องประชุม</h2>
      <div className="room-grid">
        {rooms.map((room) => (
          <div
            key={room.id}
            className={`room-card ${room.booked ? 'booked' : ''}`}
            onClick={() => handleRoomClick(room)}
          >
            {room.booked && (
              <>
                <div className="time">{room.time}</div>
                <div className="room-id">{room.id}</div>
                <div>{room.name}</div>
                <div>เบอร์: {room.tel}</div>
              </>
            )}
            {!room.booked && <div className="room-id">{room.id}</div>}
          </div>
        ))}
      </div>

      <Modal
        open={modalOpen}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>ยกเลิก</Button>,
          <Button key="submit" type="primary" style={{ backgroundColor: '#00c896' }}>ยืนยัน</Button>,
        ]}
        centered
      >
        {selectedRoom && (
          <div className="modal-content">
            <p><strong>ชื่อ–นามสกุล</strong><br />{selectedRoom.name}</p>
            <p><strong>เบอร์โทร</strong><br />{selectedRoom.tel}</p>
            <p><strong>เวลาที่จอง</strong><br />{selectedRoom.time}</p>
            <p><strong>สถานะห้อง</strong><br />
              <Select defaultValue="ไม่ว่าง" style={{ width: 120 }}>
                <Option value="ไม่ว่าง">🔴 ไม่ว่าง</Option>
                <Option value="ว่าง">🟢 ว่าง</Option>
              </Select>
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CondoMeet;
