import React, { useState } from 'react';
import './CSS/machanicstatus.css';
import { Image, Select, Input } from 'antd';

const { TextArea } = Input;

const Machanicstatus = () => {
  const [formData, setFormData] = useState({
    room: '',
    name: '',
    topic: '',
    details: '',
    phone: '',
    status: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleStatusChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      status: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('ส่งข้อมูล:', formData);
  };

  return (
    <div className="container">
      <h2>อัพเดทสถานะคำสั่งซ่อม</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="room">เลขห้อง</label>
        <Input
          id="room"
          name="room"
          placeholder=""
          value={formData.room}
          onChange={handleChange}
          required
        />

        <label htmlFor="name">ชื่อ-นามสกุล</label>
        <Input
          id="name"
          name="name"
          placeholder=""
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="topic">หัวข้อ</label>
        <Input
          id="topic"
          name="topic"
          placeholder=""
          value={formData.topic}
          onChange={handleChange}
          required
        />

        <label htmlFor="details">รายละเอียด</label>
        <TextArea
          id="details"
          name="details"
          placeholder=""
          allowClear
          value={formData.details}
          onChange={handleChange}
          required
        />

        <label htmlFor="phone">เบอร์โทรศัพท์</label>
        <Input
          id="phone"
          name="phone"
          placeholder=""
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>มีเดียร์ (ตัวอย่างรูป)</label>
        <Image
          width={200}
          src="https://s.isanook.com/wo/0/ud/45/228153/228153-20221224084331-ed33440.jpg?ip/resize/w728/q80/jpg"
          alt="แจ้งซ่อม"
        />

        <label htmlFor="status">สถานะ</label>
        <Select
          showSearch
          style={{ width: '100%', marginBottom: '16px' }}
          placeholder="เลือกสถานะ"
          optionFilterProp="label"
          onChange={handleStatusChange}
          value={formData.status}
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
          }
          options={[
            { value: '1', label: 'ซ่อมแซมเสร็จสิ้น' },
            { value: '2', label: 'ไม่สามารถซ่อมแซมได้' },
            { value: '3', label: 'รออะไหล่ซ่อมแซม' },
          ]}
        />

        <div className="uploadpic">
          <label>อัพโหลดวิดีโอ / รูปภาพ</label>
          <input type="file" accept="image/*,video/*" />

          <label>หรือ</label>

          <label>ถ่ายรูป / วิดีโอ</label>
          <input type="file" accept="image/*,video/*" capture="environment" />
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

export default Machanicstatus;
