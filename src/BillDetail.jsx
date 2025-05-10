import React from 'react';
import './CSS/BillDetail.css';

const BillDetail = () => {
  return (
    <div className="container">
      <h2>รายละเอียดบิลของฉัน</h2>

      <div className="bill-detail">
        <div className="row">
          <div>เมษายน 2568</div>
          <div className="status">ยังไม่ชำระเงิน</div>
        </div>

        <div className="row">
          <div>กำหนดชำระ:</div>
          <div>30 เมษายน 2568</div>
        </div>

        <div className="row">
          <div>รวมค่าบริการก่อนภาษีมูลค่าเพิ่ม</div>
          <div>465฿</div>
        </div>

        <div className="row">
          <div>ภาษีมูลค่าเพิ่ม (VAT 7%)</div>
          <div>35฿</div>
        </div>

        <div className="row total">
          <div>รวมค่าใช้บริการรอบปัจจุบัน</div>
          <div>500฿</div>
        </div>
      </div>
    </div>
  );
};

export default BillDetail;
