import React, { useState } from 'react';
import './CSS/Payment.css';

const Payment = () => {
  const [activeTab, setActiveTab] = useState('my-bills');

  const switchTab = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      {/* แถบเมนู */}
      <div className="tab-bar">
        <div
          className={`tab ${activeTab === 'my-bills' ? 'active' : ''}`}
          onClick={() => switchTab('my-bills')}
        >
          บิลของฉัน
        </div>
        <div
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => switchTab('history')}
        >
          ประวัติ
        </div>
      </div>

      <div className="container">
        {/* Tab: บิลของฉัน */}
        <div className={`tab-content ${activeTab === 'my-bills' ? 'active' : ''}`} id="my-bills">
          <div className="bill-card">
            <div className="bill-header">
              <div>ค่าไฟ</div>
              <div className="status-red">ยังไม่ชำระเงิน</div>
            </div>
            <div className="row">
              <div>ยอดที่ต้องชำระ</div>
              <div>500฿</div>
            </div>
            <div className="row">
              <div>รอบบิล</div>
              <div>เมษายน 2568</div>
            </div>
            <div className="row">
              <div>กำหนดชำระ</div>
              <div>30 เมษายน 2568</div>
            </div>
            <a href="bill-detail" className="detail-link">รายละเอียดบิล</a>
          </div>

          <div className="bill-card">
            <div className="bill-header">
              <div>ค่าน้ำ</div>
              <div className="status-red">ยังไม่ชำระเงิน</div>
            </div>
            <div className="row">
              <div>ยอดที่ต้องชำระ</div>
              <div>500฿</div>
            </div>
            <div className="row">
              <div>รอบบิล</div>
              <div>เมษายน 2568</div>
            </div>
            <div className="row">
              <div>กำหนดชำระ</div>
              <div>30 เมษายน 2568</div>
            </div>
            <a href="bill-detail" className="detail-link">รายละเอียดบิล</a>
          </div>
        </div>

        {/* Tab: ประวัติ */}
        <div className={`tab-content ${activeTab === 'history' ? 'active' : ''}`} id="history">
          <div className="bill-card">
            <div className="bill-header">
              <div>ค่าไฟ</div>
              <div className="status-green">ชำระแล้ว</div>
            </div>
            <div className="row">
              <div>ยอดที่ชำระ</div>
              <div>500฿</div>
            </div>
            <div className="row">
              <div>รอบบิล</div>
              <div>มีนาคม 2568</div>
            </div>
            <div className="row">
              <div>วันชำระ</div>
              <div>31 มีนาคม 2568</div>
            </div>
            <a href="bill-detail.html" className="detail-link">รายละเอียดบิล</a>
          </div>

          <div className="bill-card">
            <div className="bill-header">
              <div>ค่าส่วนกลาง</div>
              <div className="status-green">ชำระแล้ว</div>
            </div>
            <div className="row">
              <div>ยอดที่ชำระ</div>
              <div>500฿</div>
            </div>
            <div className="row">
              <div>รอบบิล</div>
              <div>มีนาคม 2568</div>
            </div>
            <div className="row">
              <div>วันชำระ</div>
              <div>31 มีนาคม 2568</div>
            </div>
            <a href="bill-detail.html" className="detail-link">รายละเอียดบิล</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
