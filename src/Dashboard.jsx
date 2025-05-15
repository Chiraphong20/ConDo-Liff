import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  HomeOutlined,
  DollarOutlined,
  ToolOutlined,
  NotificationOutlined,
  TeamOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { Link, Routes, Route } from 'react-router-dom';
import CondoRoom from './CondoRoom';
import './CSS/Dashboard.css';

const { Header, Content, Sider } = Layout;
const { Title } = Typography;

function Dashboard() {
  return (
    <Layout>
      <Header className="custom-header">
        <Title level={3} className="custom-header-title">
          คอนโดพี่โต
        </Title>
      </Header>

      <Layout>
        <Sider width={220} className="site-layout-background">
          <Menu mode="inline" defaultSelectedKeys={['CondoRoom']} style={{ height: '100%', borderRight: 0 }}>
            <Menu.Item key="CondoRoom" icon={<HomeOutlined />}>
              <Link to="/dashboard/condo-room">ข้อมูลห้อง</Link>
            </Menu.Item>
            <Menu.Item key="CondoPayment" icon={<DollarOutlined />}>
              <Link to="/dashboard/payment">คนค้างชำระ</Link>
            </Menu.Item>
            <Menu.Item key="CondoReport" icon={<ToolOutlined />}>
              <Link to="/dashboard/report">คำร้องเรียน / แจ้งซ่อม</Link>
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
          </Menu>
        </Sider>

        <Layout>
          <Content className="custom-content">
            <Routes>
              <Route path="condo-room" element={<CondoRoom />} />
              <Route path="payment" element={<div>คนค้างชำระ</div>} />
              <Route path="report" element={<div>คำร้องเรียน / แจ้งซ่อม</div>} />
              <Route path="announcement" element={<div>ประกาศ</div>} />
              <Route path="staff" element={<div>จัดการพนักงาน</div>} />
              <Route path="meet" element={<div>ตรวจสอบการจอง</div>} />
              <Route path="/" element={<div>หน้าหลัก Dashboard</div>} />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default Dashboard;
