import { UserAddOutlined } from '@ant-design/icons'
import { Button, notification } from 'antd'
import React, { useState } from 'react'
import readXlsxFile from 'read-excel-file'
import { firebase } from '../../../config/firebase';

function AllBatches() {
  const [data, setData] = useState([]);
  const [dataHeaders, setDataHeaders] = useState([]);
  const [loading,setLoading] = useState(false);
  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      const selectedFile = files[0];
      readXlsxFile(selectedFile).then((rows) => {
        const rawData = [...rows];
        const headers = rawData[0];
        rawData.shift();
        const newData = rawData.map((singleData) => {
          return {
            [headers[0]]: singleData[0],
            [headers[1]]: singleData[1],
            [headers[2]]: singleData[2],
            [headers[3]]: singleData[3],
          }
        })
        setDataHeaders(headers)
        setData(newData);
      })
    }
  }
  const handleSave = async() => {
    setLoading(true);
    const docRef = firebase.firestore.collection(firebase.firestore.db, "studentBatchData");
   const addAllDAta = data.map(async (item) => {
      const addStudent = await firebase.firestore.addDoc(docRef, {
        ...item,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
      });
      return addStudent;
    });
    const resolvePromise = await Promise.all(addAllDAta);
    console.log("🚁 ~ file: index.jsx ~ line 44 ~ handleSave ~ resolvePromise", resolvePromise)
    setData([]);
    setDataHeaders([])
    notification.success({
      message: 'Successfully Saved Students'
    })
    setLoading(false);
  }
  return (
    <div>
      <h2 className="main-heading" level={2}>ADD BATCHES STUDENTS</h2>
      <div>
        <div style={{
          textAlign: "center"
        }}>
          <Button
            type="primary"
            onClick={() => {
              document.getElementById("fileInput").click()
            }}
            icon={<UserAddOutlined />}
            size="small"
            style={{ width: 150, height: 60, margin: "4px" }}
          >Upload Excel File</Button>
          <Button
            type="primary"
            onClick={() => {
              window.open("/students.xlsx", '_blank')
            }}
            icon={<UserAddOutlined />}
            size="small"
            style={{ width: 180, height: 60, margin: "4px" }}
          >Download Demo File</Button>
          <input
            onChange={handleFileChange}
            type="file" hidden id="fileInput" />
          {data.length > 0 && <Button
            type="primary"
            onClick={() => handleSave()}
            icon={<UserAddOutlined />}
            size="small"
            loading={loading}
            disabled={loading}
            style={{ width: 220, height: 60, margin: "4px" }}>
            Save All Student To Database
          </Button>}
          <table
            border="1"
            className='batch-table'
          >
            <thead>
              {
                dataHeaders.map((item) => (
                  <th>{item}</th>
                ))
              }
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{item[dataHeaders[0]]}</td>
                  <td>{item[dataHeaders[1]]}</td>
                  <td>{item[dataHeaders[2]]}</td>
                  <td>{item[dataHeaders[3]]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AllBatches