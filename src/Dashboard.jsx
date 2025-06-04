import React, { useState } from 'react';
import {
  HomeOutlined,
  DollarOutlined,
  ToolOutlined,
  NotificationOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Typography, Button } from 'antd';
import { Link, Routes, Route } from 'react-router-dom';
import CondoRoom from './CondoRoom';
import CondoPayment from './CondoPayment';
import CondoReport from './CondoReport';
import Announcement from './Announcement';
import Staff from './Staff';
import CondoMeet from './CondoMeet';
import CondoStatus from './CondoStatus';
import './CSS/Dashboard.css';
import Income from './Income';
const { Header, Sider, Content } = Layout;

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="dashboard-wrapper">
      <Layout style={{ minHeight: '100vh' }}>
        {/* Header */}
        <Header
          className="custom-header"
          style={{
            background: '#94B9FF',
            padding: '20px',
            display: 'flex',
            alignItems: 'left',
            position: 'fixed',
            width: '100%',
            zIndex: 1000,
            height: 64,
          }}
        >
          <div className="condoname">คอนโดพี่โต</div>
        </Header>

        {/* Content under Header */}
        <Layout style={{ paddingTop: 64 }}>
          <Sider
            collapsible
            collapsed={collapsed}
            width={220}
            style={{ overflowY: 'auto'  
              
            }}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['CondoRoom']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="CondoRoom" icon={<HomeOutlined />} className="custom-menu-item">
                <Link to="/dashboard/condo-room" className="menu-link">ข้อมูลห้อง</Link>
              </Menu.Item>

              <Menu.Item key="CondoPayment" icon={<DollarOutlined />} className="custom-menu-item">
                <Link to="/dashboard/payment" className="menu-link">ค้างชำระ</Link>
              </Menu.Item>

              <Menu.Item key="CondoReport" icon={<ToolOutlined />} className="custom-menu-item">
                <Link to="/dashboard/report" className="menu-link">คำร้องเรียน / แจ้งซ่อม</Link>
              </Menu.Item>

              <Menu.Item key="CondoStatus" icon={<NotificationOutlined />} className="custom-menu-item">
                <Link to="/dashboard/condostatus" className="menu-link">ติดตามสถานนะ</Link>
              </Menu.Item>

              <Menu.Item key="Announcement" icon={<NotificationOutlined />} className="custom-menu-item">
                <Link to="/dashboard/announcement" className="menu-link">ประกาศ</Link>
              </Menu.Item>

              <Menu.Item key="Staff" icon={<TeamOutlined />} className="custom-menu-item">
                <Link to="/dashboard/staff" className="menu-link">จัดการพนักงาน</Link>
              </Menu.Item>

              <Menu.Item key="CondoMeet" icon={<CalendarOutlined />} className="custom-menu-item">
                <Link to="/dashboard/meet" className="menu-link">ตรวจสอบการจอง</Link>
              </Menu.Item>

              <Menu.Item key="Income" icon={<CalendarOutlined />} className="custom-menu-item">
                <Link to="/dashboard/income" className="menu-link">แจ้งยอดรายรับ-จ่าย</Link>
              </Menu.Item>

            </Menu>
          </Sider>

          <Layout>
            <Content className="custom-content" style={{ padding: 16, backgroundColor: 'white' }}>
              <Routes>
                <Route path="condo-room" element={<CondoRoom />} />
                <Route path="payment" element={<CondoPayment />} />
                <Route path="report" element={<CondoReport />} />
                <Route path="condostatus" element={<CondoStatus />} />
                <Route path="announcement" element={<Announcement />} />
                <Route path="staff" element={<Staff />} />
                <Route path="meet" element={<CondoMeet />} />
                <Route path="income" element={<Income />} />

              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </div>
  );
}

export default Dashboard;
