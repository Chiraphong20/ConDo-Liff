import React, { useState } from 'react';
import './CSS/machanic.css';
import { Flex, Input, Image, DatePicker } from 'antd';

const { TextArea } = Input;

const Machanic = () => {
  const [formData, setFormData] = useState({
    room: '',
    name: '',
    topic: '',
    details: '',
    phone: '',
    date: null, // เพิ่ม field วันที่
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date, dateString) => {
    setFormData((prevData) => ({
      ...prevData,
      date: dateString,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container">
      <h2>รายละเอียดการซ่อมแซม</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="room">เลขห้อง</label>
        <input
          type="text"
          id="room"
          name="room"
          value={formData.room}
          onChange={handleChange}
          required
        />

        <label htmlFor="name">ชื่อ-นามสกุล</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="topic">หัวข้อ</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
        />

        <label htmlFor="details">รายละเอียด</label>
        <TextArea
          id="details"
          name="details"
          placeholder="กรอกรายละเอียดเพิ่มเติม"
          allowClear
          value={formData.details}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">เบอร์โทรศัพท์</label>
        <input
          type="text"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label htmlFor="date">วันที่จะเข้าซ่อม</label>
        <DatePicker
          id="date"
          style={{ width: '100%' }}
          onChange={handleDateChange}
          format="YYYY-MM-DD"
        />

        <label htmlFor="media">มีเดียร์</label>
        <Image
          width={200}
          src="https://s.isanook.com/wo/0/ud/45/228153/228153-20221224084331-ed33440.jpg?ip/resize/w728/q80/jpg"
          alt="แจ้งซ่อม"
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

export default Machanic;
