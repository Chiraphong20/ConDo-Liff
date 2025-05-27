import React from "react";
import "./FinancePage.css";

const FinancePage = () => {
  return (
    <div className="finance-container">
      <div className="finance-card">
        <h2>รายงานรายรับ-รายจ่าย</h2>
        <p className="report-date">ข้อมูล ณ วันที่ <strong>30 เมษายน 2568</strong></p>

        <div className="section section-income">
          <h3 className="title green">รายรับ</h3>
          <div className="line">
            <span>ส่วนกลาง</span>
            <span>900,000 บาท</span>
          </div>
          <hr />
          <div className="line total green">
            <span>รวม</span>
            <span>900,000 บาท</span>
          </div>
        </div>

        <div className="section section-expense">
          <h3 className="title red">รายจ่าย</h3>
          <div className="line">
            <span>ค่าสำนักงาน</span>
            <span>780,000 บาท</span>
          </div>
          <div className="line">
            <span>ค่าใช้จ่ายส่วนกลาง</span>
            <span>100,000 บาท</span>
          </div>
          <div className="line">
            <span>ค่าบำรุงรักษา</span>
            <span>20,000 บาท</span>
          </div>
          <hr />
          <div className="line total red">
            <span>รวม</span>
            <span>900,000 บาท</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;
