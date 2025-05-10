import React, { useState } from 'react';
import './CSS/Repair.css';

function Repair() {
  const [activeTab, setActiveTab] = useState('repair');

  return (
    <div>
      {/* ปุ่มสลับ Tab */}
      <div className="tab-bar">
        <div
          className={`tab ${activeTab === 'repair' ? 'active' : ''}`}
          onClick={() => setActiveTab('repair')}
        >
          แจ้งซ่อม
        </div>
        <div
          className={`tab ${activeTab === 'complaint' ? 'active' : ''}`}
          onClick={() => setActiveTab('complaint')}
        >
          ร้องเรียน
        </div>
      </div>

      {/* Form: แจ้งซ่อม */}
      {activeTab === 'repair' && (
        <div className="container tab-content active">
          <h2>แจ้งซ่อม</h2>
          <form>
            <label>หัวข้อ</label>
            <select required>
              <option value="">..................</option>
              <option value="A">ซ่อมประตู</option>
              <option value="B">ไฟฟ้า</option>
              <option value="C">ประปา</option>
            </select>

            <label>คำอธิบายเพิ่มเติม</label>
            <div className="textarea-wrapper">
              <textarea rows="20" placeholder="อธิบายปัญหา..."></textarea>
            </div>

            <div className="uploadpic">
              <label>อัพโหลดวิดีโอ / รูปภาพ</label>
              <input type="file" accept="image/*,video/*" />

              <label>หรือ</label>

              <label>ถ่ายรูป / วิดีโอ</label>
              <input type="file" accept="image/*,video/*" capture="environment" />
            </div>

            <button type="submit">ส่งแจ้งซ่อม</button>
          </form>
        </div>
      )}

      {/* Form: ร้องเรียน */}
      {activeTab === 'complaint' && (
        <div className="container tab-content active">
          <h2>ร้องเรียน</h2>
          <form>
            <label>หัวข้อ</label>
            <select required>
              <option value="">..................</option>
              <option value="A">นิติบุคคลไม่ให้ความร่วมมือ</option>
              <option value="B">พฤติกรรมเพื่อนบ้าน</option>
              <option value="C">อื่น ๆ</option>
            </select>

            <label>คำอธิบายเพิ่มเติม</label>
            <div className="textarea-wrapper">
              <textarea rows="20" placeholder="อธิบายปัญหา..."></textarea>
            </div>

            <div className="uploadpic">
              <label>อัพโหลดวิดีโอ / รูปภาพ</label>
              <input type="file" accept="image/*,video/*" />

              <label>หรือ</label>

              <label>ถ่ายรูป / วิดีโอ</label>
              <input type="file" accept="image/*,video/*" capture="environment" />
            </div>

            <button type="submit">ส่งเรื่องร้องเรียน</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Repair;
