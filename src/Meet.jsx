import React, { useState } from 'react';
import './CSS/Meet.css';

const Meet = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    room: '',
    time: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ทำการส่งข้อมูลไปที่ server หรือ Firebase
    console.log(formData);
  };

  return (
    <div className="container">
      <h2>จองห้องประชุม</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">ชื่อ-นามสกุล</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">เบอร์โทรศัพท์</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="room">ห้องประชุม</label>
        <select
          id="room"
          name="room"
          value={formData.room}
          onChange={handleChange}
          required
        >
          <option value="">-- กรุณาเลือก --</option>
          <option value="ห้องประชุมใหญ่">ห้องประชุมใหญ่</option>
          <option value="ห้องประชุมเล็ก">ห้องประชุมเล็ก</option>
        </select>

        <label htmlFor="time">เวลาที่ต้องการใช้</label>
        <input
          type="time"
          id="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />

        <div className="submit">
          <button type="button" className="buttoncancel">
            ยกเลิก
          </button>
          <button type="submit" className="buttonOK">
            ยืนยัน
          </button>
        </div>
      </form>
    </div>
  );
};

export default Meet;
