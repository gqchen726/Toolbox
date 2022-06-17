import React from 'react';
import {
    Input,
    Space,
    Table,
    Button
} from 'antd';
import { AudioOutlined } from '@ant-design/icons';
const { Search } = Input;
const suffix = (
    <AudioOutlined
      style={{
        fontSize: 16,
        color: '#1890ff',
      }}
    />
);
export class UserManagerH extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [
                {
                    id: "1",
                    username: "aa",
                    password: "aaa123"
                }
            ],
            
        }
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            },
            {
                title: '用户名',
                dataIndex: 'username',
                key: 'username',
            },
            {
                title: '密码',
                dataIndex: 'password',
                key: 'password',
            },
            {
                title: '修改',
                dataIndex: 'edit',
                key: 'edit',
                render: () => (
                    <Space size="middle">
                      <Button type="primary">修改</Button>
                    </Space>
                  ),
            },
            {
                title: '删除',
                dataIndex: 'remove',
                key: 'remove',
                render: () => (
                    <Space size="middle">
                      <Button type="primary" danger="true">删除</Button>
                    </Space>
                  ),
            }
          ]
          
    }

    onSearch = () => {
              console.log("onSearch")
          }

    render() {
        return (
            <div>
                <Search
                    placeholder="用户名"
                    enterButton=">搜索"
                    size="large"
                    allowClear="true"
                    suffix={suffix}
                    onSearch={this.onSearch}
                />
                <Table columns={this.columns} dataSource={this.state.dataSource} />

                <Button type="primary">添加</Button>
            </div>
        );
    }
}