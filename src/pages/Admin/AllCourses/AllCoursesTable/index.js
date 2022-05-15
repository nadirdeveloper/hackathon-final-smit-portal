import React, { useEffect } from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { adminService } from '../../../../services/adminService';
import { firebase } from '../../../../config/firebase';

function AllCourseTable() {
  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  const searchInput = React.useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    adminService.getAllCourses(dispatch);
  }, [])


  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setSearchText('');
  };

  const handleDelete = async (row) => {
    const { id } = row;
   adminService.deleteCourse(id, dispatch);
   adminService.getAllCourses(dispatch);
  }

  const { data, loading } = useSelector(state => state.allCourses)

  const columns = [
    {
      title: 'Course ID',
      dataIndex: 'id',
      key: 'id',
      width: '5%',
      ...getColumnSearchProps('id'),
    },
    //   {
    //     title: 'Course Image',
    //     dataIndex: 'courseImage',
    //     key: 'courseImage',
    //     width: '10%',
    //   },
    {
      title: 'Course Name',
      dataIndex: 'courseName',
      key: 'courseName',
      width: '20%',
      ...getColumnSearchProps('courseName'),
    },
    {
      title: 'Course Description',
      dataIndex: 'courseDescription',
      key: 'courseDescription',
      width: '20%',
      ...getColumnSearchProps('courseDescription'),
    },
    {
      title: 'Status',
      dataIndex: 'courseStatus',
      key: 'courseStatus',
      width: '10%',
      ...getColumnSearchProps('courseStatus'),
    },

    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary">Edit</Button>
          <Button onClick={() => handleDelete(record)} style={{ backgroundColor: 'red', border: 'none' }} type="primary">Delete</Button>
          {/* <DeleteBtn record={record} /> */}
        </Space>
      ),
    },
  ];
  return (
    <Table columns={columns} loading={loading} dataSource={data || []} />
  )
}

export default AllCourseTable
