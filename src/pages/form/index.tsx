import React, { useState } from 'react';
import { Space, Table, Button, Modal, Divider, Form } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import './style.css';
import BasicForm from './components/form';

interface DataType {
  key: number;
  name: string;
  email: string;
  phone: string;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  }
];

const initForm = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState<Array<DataType>>([]);
  
  const [form] = Form.useForm();

  const showModal = () => { setIsModalOpen(true); };

  const handleOk = () => {
    form.validateFields().then((value) => {
      const res = data.slice();
      value.users.map((item: any) => {
        const User: DataType = {
          key: item.phone,
          name: item.name,
          email: item.email,
          phone: item.phone,
        };
        res.push(User)
      })
      setData(res);
      form.resetFields();
      setIsModalOpen(false);
    })
  };

  const handleCancel = () => {
    setIsModalOpen(false); 
    form.resetFields();
  };
  return (
    <div className="content">
      <div>
        <Button style={{ margin: '12px 0' }} type="primary" onClick={ () => showModal() }>
          添加企业成员
        </Button>
        <Table columns={ columns } dataSource={ data } />
        <Modal
          title="添加企业成员"
          width="40%"
          open={ isModalOpen }
          onCancel={ handleCancel }
          footer={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ color: '#999' }}>
                系统会向该邮箱和手机号发送邀请邮件
              </div>
              <div>
                <Button onClick={ handleCancel }>取消</Button>
                <Button type="primary" onClick={ handleOk }>确定</Button>
              </div>
            </div>
          }
        >
          <Divider />
          <BasicForm form={form} />
        </Modal>
      </div>
    </div>
  )
}

export default initForm;