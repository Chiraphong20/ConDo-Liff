import React, { useState } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  DatePicker,
  Upload,
} from 'antd';
import {
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import './CSS/Announcement.css';

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([
    {
      key: '1',
      title: 'ตัดไฟตอนเช้า',
      detail: 'ตัดไฟเวลา......',
      date: '15/เมษายน/2568',
      image: null,
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form] = Form.useForm();

  const [imageUrl, setImageUrl] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);

  const showModal = (record = null) => {
    setEditing(record);
    if (record) {
      form.setFieldsValue({
        title: record.title,
        detail: record.detail,
        date: moment(record.date, 'DD/MMMM/YYYY'),
      });
      setImageUrl(record.image || null);
    } else {
      form.resetFields();
      setImageUrl(null);
    }
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const formattedDate = values.date.format('DD/MMMM/YYYY');
      if (editing) {
        setAnnouncements((prev) =>
          prev.map((item) =>
            item.key === editing.key
              ? {
                  ...item,
                  ...values,
                  date: formattedDate,
                  image: imageUrl,
                }
              : item
          )
        );
      } else {
        setAnnouncements([
          ...announcements,
          {
            key: String(announcements.length + 1),
            title: values.title,
            detail: values.detail,
            date: formattedDate,
            image: imageUrl,
          },
        ]);
      }
      setIsModalOpen(false);
    });
  };

  const handleDelete = (key) => {
    setAnnouncements((prev) => prev.filter((item) => item.key !== key));
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(file);
  };

  const beforeUpload = () => true; // ✅ ไม่จำกัดขนาด

  const handleImageChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoadingImage(true);
      return;
    }
    if (info.file.status === 'done') {
      getBase64(info.file.originFileObj, (url) => {
        setLoadingImage(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loadingImage ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>อัปโหลดรูป</div>
    </div>
  );

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'คำอธิบาย',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'เนื้อหา',
      dataIndex: 'detail',
      key: 'detail',
    },
    {
      title: 'วันที่',
      dataIndex: 'date',
      key: 'date',
    },
   
    {
      title: 'แก้ไข',
      key: 'edit',
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => showModal(record)}
          style={{ marginRight: 8 }}
        >
          แก้ไข
        </Button>
      ),
    },
    {
      title: 'ลบ',
      key: 'delete',
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record.key)}>
          ลบ
        </Button>
      ),
    },
  ];

  return (
    <div className="announcement-container">
      <div className="header">
        <div className="search-box">
          <img
            src="https://cdn-icons-png.flaticon.com/512/54/54481.png"
            width="20"
            height="20"
            alt="search"
          />
          <Input placeholder="ค้นหา..." bordered={false} />
        </div>
        <p>ประกาศ</p>
        <div className="Group">
          <Button
            className="btn-add"
            type="primary"
            onClick={() => showModal()}
          >
            เพิ่มประกาศใหม่ +
          </Button>
        </div>
      </div>

      <Table columns={columns} dataSource={announcements} pagination={false} />

      <Modal
        title={editing ? 'แก้ไขประกาศ' : 'เพิ่มประกาศใหม่'}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        okText="บันทึก"
        cancelText="ยกเลิก"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="คำอธิบาย"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="detail"
            label="เนื้อหา"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item
            name="date"
            label="วันที่"
            rules={[{ required: true }]}
          >
            <DatePicker format="DD/MMMM/YYYY" style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="รูปภาพประกอบ">
            <Upload
              name="image"
              listType="picture-card"
              showUploadList={false}
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              beforeUpload={beforeUpload}
              onChange={handleImageChange}
            >
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="uploaded"
                  style={{ width: '100%' }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Announcement;
