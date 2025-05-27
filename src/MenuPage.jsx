import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/MenuPage.css";

const MenuPage = () => {
  const navigate = useNavigate();

  const goToBooking = () => {
    navigate("/meeting");
  };

  const goToFinance = () => {
    navigate("/finance");
  };

  return (
    <div className="menu-container">
      <div className="menu">
        <div className="menu-button" onClick={goToBooking}>
          จองห้องประชุม
        </div>
        <div className="menu-button" onClick={goToFinance}>
          เบิกจ่ายเงิน-รายจ่าย<br />สำนักงานกลาง
        </div>
      </div>
    </div>
  );
};

export default MenuPage;
