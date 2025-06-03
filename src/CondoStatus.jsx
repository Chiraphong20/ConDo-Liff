import React, { useEffect, useState } from 'react';
import { Modal, Input, Avatar, Button, Spin } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { collectionGroup, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const CondoStatus = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAssignedTasks = async () => {
      setLoading(true);
      try {
        const assignedTasksSnapshot = await getDocs(collectionGroup(db, 'assignedTasks'));
        const taskListRaw = assignedTasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ref: doc.ref,
          ...doc.data(),
        }));

        const userIdsSet = new Set();
        taskListRaw.forEach(task => {
          task.officers?.forEach(officer => {
            if (officer.id) userIdsSet.add(officer.id);
          });
        });

        const userProfiles = {};
        for (const userId of userIdsSet) {
          const userDoc = await getDoc(doc(db, 'users', userId));
          if (userDoc.exists()) {
            userProfiles[userId] = userDoc.data();
          }
        }

        const taskList = taskListRaw.map(task => {
          const officersWithProfile = task.officers?.map(officer => {
            const profile = userProfiles[officer.id] || {};
            return {
              ...officer,
              profileImage: profile.profileImage || null,
              name: profile.name || officer.name,
              phone: profile.phone || officer.phone,
            };
          }) || [];
          return { ...task, officers: officersWithProfile };
        });

        setTasks(taskList);
      } catch (error) {
        console.error('ไม่สามารถโหลดงานที่ได้รับมอบหมาย:', error);
      }
      setLoading(false);
    };

    fetchAssignedTasks();
  }, []);

  const getBase64Image = (base64String) => {
    if (!base64String) return null;
    if (base64String.startsWith('data:image')) return base64String;
    return `data:image/png;base64,${base64String}`;
  };

  const handleCardClick = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setSelectedTask(null);
    setModalVisible(false);
  };

  return (
    <div className="content-status">
      <div className="sectionheader">
        <div className="search-box">
          <img src="https://cdn-icons-png.flaticon.com/512/54/54481.png" width="20" height="20" alt="search" />
          <Input placeholder="ค้นหา..." bordered={false} />
        </div>
        <p>ติดตามสถานะ</p>
      </div>

      <div className="room-section">
        {loading ? (
          <div style={{ textAlign: 'center', padding: 20 }}>
            <Spin tip="กำลังโหลด..." size="large" />
          </div>
        ) : tasks.length === 0 ? (
          <p>ไม่มีงานที่ได้รับมอบหมาย</p>
        ) : (
          tasks.map((task, index) => (
            <div key={index} className="room-card" onClick={() => handleCardClick(task)}>
              <div className="status-label">
                <span className="red-dot" />
                <span className="status-text">{task.status || 'กำลังดำเนินการ'}</span>
              </div>
              <div
                className="info-icon"
                style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
              >
                <InfoCircleOutlined style={{ fontSize: 20, color: '#1890ff' }} />
              </div>
              <img
                src={
                  task.type === 'แจ้งซ่อม'
                    ? 'https://cdn-icons-png.flaticon.com/512/6001/6001179.png'
                    : 'https://cdn-icons-png.flaticon.com/512/1828/1828911.png'
                }
                alt="icon"
                style={{ width: 60, margin: '10px 0' }}
              />
              <div><b>{task.userInfo?.name || '-'}</b></div>
              <div><b>เบอร์ : {task.userInfo?.phone || '-'}</b></div>
              <div><b>ห้อง {task.userInfo?.room || '-'}</b></div>
              <div><b>{task.title || '-'}</b></div>
            </div>
          ))
        )}
      </div>

      <Modal
        title="รายละเอียดงาน"
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
      >
        {selectedTask && (
          <div>
            <p><b>หมวดหมู่:</b> {selectedTask.type}</p>
            <p><b>หัวข้อ:</b> {selectedTask.title}</p>
            <p><b>ข้อมูลเพิ่มเติม:</b></p>
            <p>{selectedTask.description || '-'}</p>

            {selectedTask.media && (
              <>
                <p><b>มีเดีย:</b></p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {selectedTask.mediaType?.startsWith('video') ? (
                    <video width="300" height="200" controls style={{ borderRadius: 8 }}>
                      <source src={selectedTask.media} type={selectedTask.mediaType} />
                    </video>
                  ) : (
                    <img
                      src={selectedTask.media}
                      alt="media"
                      width={200}
                      height={200}
                      style={{ borderRadius: 8, objectFit: 'cover' }}
                    />
                  )}
                </div>
              </>
            )}

            <p><b>เจ้าหน้าที่:</b></p>
            <div style={{ display: 'flex', gap: '20px' }}>
              {selectedTask.officers?.map((officer, i) => (
                <div key={i} style={{ textAlign: 'center' }}>
                  <Avatar size={48} src={getBase64Image(officer.profileImage)} />
                  <p>{officer.name}</p>
                  <p style={{ fontSize: 12 }}>{officer.phone}</p>
                </div>
              ))}
            </div>

            <p style={{ marginTop: 16 }}><b>สถานะ:</b> {selectedTask.status || 'กำลังดำเนินการ'}</p>

            <div className="modal-buttons" style={{ marginTop: 16 }}>
              <Button onClick={handleCancel}>ปิด</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CondoStatus;
