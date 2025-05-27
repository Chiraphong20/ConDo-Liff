import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./CSS/MenuPage.css";

const MenuPage = () => {
  return (
    <div className="menu-layout">
      <div className="menu-sidebar">
        <div className="menu-card">
          {/* ✅ ใช้ absolute path เพื่อหลีกเลี่ยง path ผิด */}
          <Link to="/Menupage/meet">จองห้องประชุม</Link>
        </div>
        <div className="menu-card">
          <Link to="/Menupage/finance">เบิกจ่ายค่าส่วนกลาง</Link>
        </div>
      </div>
      <div className="menu-content">
        {/* ✅ ใช้ Outlet ให้ React Router แสดงหน้าที่ตรงกับ Route */}
        <Outlet />
      </div>
    </div>
  );
};

export default MenuPage;
