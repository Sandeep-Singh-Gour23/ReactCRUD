
//import {Table, Tag, Space, Card, Button, Input, Form} from 'antd';
import { Row, Col, Table, Card, Form, Button, Input,Modal } from 'antd'
import 'antd/dist/antd.css';
import { useState } from 'react';

function App() {
  const [taskForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [dataSource, setDataSource] = useState([
    { "id": 79,
       "key" : "Testing",
        "value": "11" 
    },
    { "id": 35,
       "key" : "sbuhrl.default",
        "value": "6+6"
     },
    { "id": 39,
       "key" : "Test2",
        "value": "3+9"
     },
    { "id": 40,
       "key" : "Test3",
        "value": "4+8"
     },
    { "id": 41,
       "key" : "Test4",
        "value": "5+7"
     },
    { "id": 49,
       "key" : "testing",
        "value": "8+4"
     }
]);

const columns = [
{
  key: "1",
  title: "ID",
  dataIndex: "id",
},
{
  key: "2",
  title: "Key",
  dataIndex: "key",
},
{
  key: "3",
  title: "Value",
  dataIndex: "value",
},
{
  key: "4",
  title: "Action",
  render: (record) => {
    return (
     <>
          <Button
        type="default"
        onClick={() => {
          onEditClick(record);
        }}
      >
        Edit
      </Button>
      <Button danger style={{marginLeft:'0.5rem'}} onClick={() => onDeleteStudent(record)}>
          Delete
      </Button>
     </>
    );
  },
},
];

  const handleCancel = () => {
    setIsModalVisible(false);
    taskForm.resetFields();
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const onEditClick = (record, id) => {
    taskForm.setFieldsValue({
      id: record.id,
      key: record.key,
      value: record.value,
    });
    setIsModalVisible(true);
  };

  const onDeleteStudent = (record) => {
    Modal.confirm({
      title: "Are you sure, you want to delete this student record?",
      okText: "Yes",
      okType: "danger",
      onOk: () => {
        setDataSource((pre) => {
          return pre.filter((student) => student.id !== record.id);
        });
      },
    });
  };

  const onFormSubmit = (values) => {
    const randomNumber = parseInt(Math.random() * 1000)
      if(values.id === undefined){
        setDataSource((pre) => {
            const newEntry = {
              id: randomNumber,
              key: values.key,
              value: values.value,
            }
            return [...pre, newEntry];
          });
      }else{
        setDataSource((pre) => {
            return pre.map((data) => {
                if(data.id === values.id){
                    return values;
                }else{
                    return data;
                }
            })
        })
      }
      setIsModalVisible(false)
    // console.log("values received :", values);
  };

  return (
    <>
      <Card title="Table" headStyle={{ textAlign: "center" }} type="inner" extra={
         <Button
         type="primary"
          onClick={() => {
           showModal();
         }}
       >
         Create
       </Button>
      }>
        <Table
          columns={columns}
          dataSource={dataSource}
          className="col-8 mx-auto"
          rowKey="id"
          width={400}
          style={{width:'50vw',marginLeft:'27%'}}
          pagination={false}
        ></Table>

        <Modal
          title="Basic Modal"
          visible={isModalVisible}
          onCancel={handleCancel}
          // onOk={onEditClickI}
          okText="Save"
          footer={
            <div key="userModalFooter">
              <Button key="back" onClick={handleCancel}>
                Cancel
              </Button>
              <Button
                key="submit"
                type="primary"
                htmlType="submit"
                form="taskForm"
              >
                Save
              </Button>
            </div>
          }
        >
          <Form form={taskForm} name="taskForm" onFinish={onFormSubmit}>
            <Form.Item name="id">
              <Input type="hidden" />
            </Form.Item>
            
            <Form.Item label="Key" name="key">
              <Input />
            </Form.Item>

            <Form.Item label="Value" name="value">
              <Input />
            </Form.Item>

          </Form>
        </Modal>
      </Card>
    </>
    
  );
}

export default App;
