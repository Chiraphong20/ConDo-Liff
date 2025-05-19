import React, { useState } from 'react';
import {
  Table,
  Button,
  Dropdown,
  Menu,
  Modal,
  message,
  Upload,
  Input,
  Form,
  DatePicker
} from 'antd';
import { EllipsisOutlined, UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import './CSS/Staff.css';

const Staff = () => {
  const [dataSource, setDataSource] = useState([
    {
      key: '1',
      name: 'สุดหล่อ คนดี',
      tel: '0912342134',
      status: 'ยังไม่ได้มอบหมายงาน',
      date: '02/11/2568',
    },
    {
      key: '2',
      name: 'สุดหล่อ คนดี',
      tel: '0912342134',
      status: 'มอบหมายงานแล้ว',
      date: '02/11/2568',
    },
  ]);

  const [form] = Form.useForm();
  const [assignForm] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const showAssignModal = (record) => {
    setSelectedRecord(record);
    setIsAssignModalOpen(true);
  };

  const handleAssignSubmit = () => {
    assignForm.validateFields().then((values) => {
      setDataSource((prev) =>
        prev.map((item) =>
          item.key === selectedRecord.key
            ? { ...item, status: 'มอบหมายงานแล้ว' }
            : item
        )
      );
      setIsAssignModalOpen(false);
      message.success('มอบหมายงานสำเร็จ');
      assignForm.resetFields();
    });
  };

  const showEditModal = (record) => {
    setSelectedRecord(record);
    form.setFieldsValue({
      name: record.name,
      tel: record.tel,
      date: moment(record.date, 'DD/MM/YYYY'),
    });
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      const updated = {
        ...values,
        date: values.date.format('DD/MM/YYYY'),
      };

      setDataSource((prev) =>
        prev.map((item) =>
          item.key === selectedRecord.key
            ? { ...item, ...updated }
            : item
        )
      );
      setIsEditModalOpen(false);
      message.success('แก้ไขข้อมูลสำเร็จ');
      form.resetFields();
    });
  };

  const confirmDelete = (key) => {
    Modal.confirm({
      title: 'คุณแน่ใจหรือไม่ว่าต้องการลบข้อมูลนี้?',
      okText: 'ลบ',
      okType: 'danger',
      cancelText: 'ยกเลิก',
      onOk: () => {
        setDataSource((prev) => prev.filter((item) => item.key !== key));
        message.success('ลบข้อมูลเรียบร้อยแล้ว');
      },
    });
  };

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'key',
    },
    {
      title: 'ชื่อ',
      dataIndex: 'name',
    },
    {
      title: 'เบอร์โทรติดต่อ',
      dataIndex: 'tel',
    },
    {
      title: 'สถานะ',
      dataIndex: 'status',
      render: (status) => (
        <span style={{ color: status === 'มอบหมายงานแล้ว' ? 'red' : 'green' }}>
          {status}
        </span>
      ),
    },
    {
      title: 'วันจ้างงาน',
      dataIndex: 'date',
    },
    {
      title: 'อื่นๆ',
      key: 'actions',
      render: (_, record) => {
        const menu = (
          <Menu
            onClick={({ key }) => {
              if (key === 'manage') showAssignModal(record);
              else if (key === 'edit') showEditModal(record);
              else if (key === 'delete') confirmDelete(record.key);
            }}
            items={[
              { key: 'manage', label: 'มอบหมายงาน' },
              { key: 'edit', label: 'แก้ไข' },
              { key: 'delete', label: 'ลบ', danger: true },
            ]}
          />
        );
        return (
          <Dropdown overlay={menu} trigger={['click']}>
            <Button shape="circle" icon={<EllipsisOutlined />} />
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div className="staff-container">
      <h2 style={{ textAlign: 'center' }}>จัดการพนักงาน</h2>
      <Table columns={columns} dataSource={dataSource} pagination={false} />

      {/* Modal มอบหมายงาน */}
      <Modal
        title="มอบหมายงาน"
        open={isAssignModalOpen}
        onCancel={() => setIsAssignModalOpen(false)}
        onOk={handleAssignSubmit}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        width={600}
      >
        <Form layout="vertical" form={assignForm}>
          <Form.Item
            name="title"
            label="หัวข้องาน"
            rules={[{ required: true, message: 'กรุณากรอกหัวข้องาน' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="details"
            label="รายละเอียดงาน"
            rules={[{ required: true, message: 'กรุณากรอกรายละเอียด' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            name="duration"
            label="ระยะเวลา"
            rules={[{ required: true, message: 'กรุณากรอกระยะเวลา' }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="file"
            label="ไฟล์แนบ"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload beforeUpload={() => false} listType="picture-card">
              <div>
                <UploadOutlined />
                <div>โปรดเลือกไฟล์</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal แก้ไขพนักงาน */}
      <Modal
        title="แก้ไขข้อมูลพนักงาน"
        open={isEditModalOpen}
        onCancel={() => setIsEditModalOpen(false)}
        onOk={handleEditSubmit}
        okText="ยืนยัน"
        cancelText="ยกเลิก"
        width={500}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="ชื่อ"
            rules={[{ required: true, message: 'กรุณากรอกชื่อ' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="tel"
            label="เบอร์โทร"
            rules={[{ required: true, message: 'กรุณากรอกเบอร์โทร' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="date"
            label="วันจ้างงาน"
            rules={[{ required: true, message: 'กรุณาเลือกวันจ้างงาน' }]}
          >
            <DatePicker format="DD/MM/YYYY" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="profilePic"
            label="รูปโปรไฟล์แนบ"
            valuePropName="fileList"
            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          >
            <Upload beforeUpload={() => false} listType="picture-card">
              <div>
                <UploadOutlined />
                <div>โปรดเลือกไฟล์</div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Staff;
