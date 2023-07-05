import { useState, useEffect } from "react";
import { Button, Table, Space } from "antd";
import type { ColumnsType } from "antd/es/table";
import "../styles/JSON.css";

type Json = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const JSONPractice = () => {
  const [jsons, setJsons] = useState<Json[]>([]);

  useEffect(() => {
    fetchData();
  }, []);
  console.log(jsons);

  const fetchData = async () => {
    await fetch("https://jsonplaceholder.typicode.com/posts?_limit=10")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setJsons(data);
      });
  };

  const deleteJson = async (id: number) => {
    await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10 ${id}`, {
      method: "DELETE",
    });
    const updatedJsons = jsons.filter((json) => json.id !== id);

    setJsons(updatedJsons);
  };

  const columns: ColumnsType<Json> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Body",
      dataIndex: "body",
      key: "body",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            className="delete-btn"
            onClick={() => deleteJson(record.id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ height: "100%" }}>
      <Table
        className="table"
        columns={columns}
        dataSource={jsons}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default JSONPractice;
