import React, { useState } from 'react';
import './CSS/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    surname: '',
    phone: '',
    email: '',
    role: '',
    room: '',
    building: '',
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
      <h2>ลงทะเบียน</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">ชื่อ</label>
        <input
          type="text"
          id="fullname"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />

        <label htmlFor="surname">นามสกุล</label>
        <input
          type="text"
          id="surname"
          name="surname"
          value={formData.surname}
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

        <label htmlFor="email">อีเมลล์</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <div className="row">
          <div className="form-group">
            <label htmlFor="role">บทบาท</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">เลือกบทบาท</option>
              <option value="A">ลูกบ้าน</option>
              <option value="B">นิติบุคคล</option>
              <option value="C">ช่าง</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="room">ห้อง</label>
            <select
              id="room"
              name="room"
              value={formData.room}
              onChange={handleChange}
              required
            >
              <option value="">เลือกห้อง</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="building">ตึก</label>
            <select
              id="building"
              name="building"
              value={formData.building}
              onChange={handleChange}
              required
            >
              <option value="">เลือกตึก</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </select>
          </div>
        </div>

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

export default Register;
