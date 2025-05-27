import './CSS/App.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h2>เมนูหลัก</h2>
      <div className="menu">
        <Link to="/profile" className="button">ไปที่โปรไฟล์</Link>
        <a href="/repair" className="button">แจ้งซ่อม</a>
        <a href="/my-bills" className="button">ค้างชำระ</a>
        <a href="/register" className="button">ลงทะเบียน</a>
        <a href="/meet" className="button">จองห้องประชุม</a>
        <a href="/status" className="button">ติดตามสถานะ</a>
        <a href="/manupage" className="button">อื่นๆ</a>
        <a href="/dashboard" className="button">นิติห้อง</a>
        <a href="CondoPayment.html" className="button">คนค้างชำระ</a>
        <a href="/machanicstatus" className="button">ติดตามสถานะช่าง</a>
        <a href="/machaniccase" className="button">เคสซ่อมแซม</a>
        <a href="/machanic" className="button">รายละเอียดคำสั่งซ่อม</a>
      </div>
    </div>
  );
}

export default Home;
