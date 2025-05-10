import React, { useState } from 'react';
import './CSS/Status.css';

const Status = () => {
  const [activeTab, setActiveTab] = useState('status');
  const [modalOpen, setModalOpen] = useState(false);

  const openTab = (tabId) => setActiveTab(tabId);
  const showDetail = () => setModalOpen(true);
  const closeDetail = () => setModalOpen(false);

  return (
    <div className="container">
      <div className="tabs">
        <div className={`tab ${activeTab === 'status' ? 'active' : ''}`} onClick={() => openTab('status')}>ติดตามสถานะ</div>
        <div className={`tab ${activeTab === 'history' ? 'active' : ''}`} onClick={() => openTab('history')}>ประวัติ</div>
      </div>

      {/* ติดตามสถานะ */}
      {activeTab === 'status' && (
        <div className="tab-content active">
          <div style={{ display: 'flex', background: '#3366FF', color: 'white', fontWeight: 'bold', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', overflow: 'hidden' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '10px', borderRight: '1px solid white' }}>สถานะ</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '10px' }}>หัวข้อ</div>
          </div>
          <ul className="status-list">
            <li className="status-item" onClick={showDetail}>
              <span className="status pending">ยังไม่ดำเนินการ</span>
              <span className="label">ซ่อมประตู</span>
            </li>
          </ul>
        </div>
      )}

      {/* ประวัติ */}
      {activeTab === 'history' && (
        <div className="tab-content active">
          <div style={{ display: 'flex', background: '#3366FF', color: 'white', fontWeight: 'bold', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', overflow: 'hidden' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '10px', borderRight: '1px solid white' }}>สถานะ</div>
            <div style={{ flex: 1, textAlign: 'center', padding: '10px' }}>หัวข้อ</div>
          </div>
          <ul className="status-list">
            <li className="status-item">
              <span className="label">ซ่อมหน้าต่าง</span>
              <span className="status done">ดำเนินการเสร็จสิ้น</span>
            </li>
          </ul>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal" onClick={closeDetail}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeDetail}>&times;</span>
            <h3>รายละเอียดสถานะแจ้งซ่อม</h3>
            <img src="https://www.khaosod.co.th/wpapp/uploads/2019/01/50773168_1916508711811494_1854926805262139392_n.jpg" alt="งานซ่อม" />
            <p><strong>หัวข้อ:</strong> ประตูพัง</p>
            <p><strong>วันที่:</strong> 20/04/2025</p>
            <p><strong>รายละเอียด:</strong> กกกกกกกกกกกกกกกกกกกกก</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="https://pmserviceth.com/wp-content/uploads/2021/10/หน้าที่หลักของช่างอาคาร-คืออะไร.jpg" alt="เจ้าหน้าที่" style={{ width: 50, height: 50, borderRadius: '50%' }} />
              <div>
                <div>นายสุดหล่อ ท่อดัง</div>
                <div>0941232222</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Status;
