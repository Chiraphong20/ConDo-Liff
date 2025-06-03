import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";
import "./CSS/FinancePage.css";

const FinancePage = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ref = collection(db, "incomes");
      const snapshot = await getDocs(ref);
      const data = snapshot.docs.map((doc, index) => ({
        id: doc.id,
        ...doc.data(),
        index,
      }));
      setReports(data);
    };

    fetchData();
  }, []);

  return (
    <div className="finance-report-list">
      <h2 className="title">รายงานรายรับ-รายจ่าย</h2>

      {reports.map((report, index) => (
        <div key={report.id} className="report-card">
          <p className="report-label">ข้อมูลแจ้งยอดรายรับ-รายจ่าย</p>
          <p className="report-date">{report.date}</p>

          {report.image && report.image.length > 0 ? (
            <div className="report-image-wrapper">
              <img
                src={report.image[0]} // แสดงรูปแรกเท่านั้น
                alt={`report-${index}`}
                className="report-image"
              />
            </div>
          ) : (
            <div className="no-image">ไม่มีรูปภาพแนบ</div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FinancePage;
