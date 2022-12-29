import React, { useState } from 'react';
import { Input, Form, Select, Space } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";

const { Option } = Select;

interface BasicForm {
  props: {
    form: any,
  }
}
class BasicForm extends React.Component {

  phoneValidator(_: any, value: string, callback: () => any) {
    if (value) {
      let reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      if (reg.test(value)) {
        return callback();
      }
      return Promise.reject(new Error('请输入有效的手机号和区号'));
    } else {
      return Promise.reject(new Error('请输入有效的手机号和区号'));
    }
  }

  render(): React.ReactNode {

    const selectBefore = (
      <Select defaultValue="+86">
        <Option value="+86">+86</Option>
        <Option value="+852">+852</Option>
      </Select>
    );

    return (
      <div>
        <Form
          form={ this.props.form }
        >
          <h3>成员信息</h3>
          <Form.List name="users" initialValue={[{}]}>
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', alignItems: 'flex-start'}}>
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      rules={[{ required: true, message: '请填写姓名' }]}
                    >
                      <Input placeholder="姓名" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'email']}
                      rules={[{ required: true, message: '请输入正确的邮箱', type: 'email' }]}
                    >
                      <Input placeholder="员工邮箱" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'phone']}
                      rules={[{ validator: this.phoneValidator }]}
                    >
                      <Input placeholder="手机号" addonBefore={selectBefore}/>
                    </Form.Item>
                    {
                      fields.length > 1 ? (
                        <MinusCircleOutlined style={{ margin: 4, color: '#fe7b7a', fontSize: 20 }} onClick={() => remove(name)} />
                      ) : null
                    }
                    <PlusCircleOutlined style={{ margin: 4, color: '#00a8f0', fontSize: 20 }} onClick={() => add()} />
                  </Space>
                ))}
              </>
            )}
          </Form.List>
        </Form>
      </div>
    )
  }
}

export default BasicForm;