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
            style={{ overflowY: 'auto' }}
          >
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={['CondoRoom']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="CondoRoom" icon={<HomeOutlined />}>
                <Link to="/dashboard/condo-room">ข้อมูลห้อง</Link>
              </Menu.Item>
              <Menu.Item key="CondoPayment" icon={<DollarOutlined />}>
                <Link to="/dashboard/payment">คนค้างชำระ</Link>
              </Menu.Item>
              <Menu.Item key="CondoReport" icon={<ToolOutlined />}>
                <Link to="/dashboard/report">คำร้องเรียน / แจ้งซ่อม</Link>
              </Menu.Item>
              <Menu.Item key="CondoStatus" icon={<NotificationOutlined />}>
                <Link to="/dashboard/condostatus">ติดตามสถานนะ</Link>
              </Menu.Item>
              <Menu.Item key="Announcement" icon={<NotificationOutlined />}>
                <Link to="/dashboard/announcement">ประกาศ</Link>
              </Menu.Item>
              <Menu.Item key="Staff" icon={<TeamOutlined />}>
                <Link to="/dashboard/staff">จัดการพนักงาน</Link>
              </Menu.Item>
              <Menu.Item key="CondoMeet" icon={<CalendarOutlined />}>
                <Link to="/dashboard/meet">ตรวจสอบการจอง</Link>
              </Menu.Item>
                  <Menu.Item key="Income" icon={<CalendarOutlined />}>
                <Link to="/dashboard/income">ตรวจสอบการจอง</Link>
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
