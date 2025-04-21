import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import '../css/EmployeeList.css';
import { Employee } from '../models/Employee';
import { Alert } from 'react-bootstrap';
import SortIcon from '@mui/icons-material/Sort';

const EmployeeListPage = () => {
  const [list, setList] = useState<Employee[]>([]);
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );
  const [imageMap, setImageMap] = useState<Record<number, string>>({});
  const navigate = useNavigate();

  const fetchList = async () => {
    const response = await api.get('/employees');
    setList(response.data);
  };

  useEffect(() => {
    fetchList().catch((error) => console.error(error));
  }, []); // 空の配列を第2引数に渡すことで、初回レンダリング時のみ実行される

  // 画像を非同期に取得しURLをセット
  const fetchImage = async (employeeId: number) => {
    try {
      const response = await api.get(`/employees/${employeeId}/picture`, {
        responseType: 'blob',
        withCredentials: true,
      });
      return URL.createObjectURL(response.data); // Blob URLを返す
    } catch (error) {
      console.error('画像の取得に失敗しました', error);
      return ''; // 画像が取得できない場合は空文字を返す
    }
  };

  // 従業員ごとに画像を取得して状態に保存
  useEffect(() => {
    const loadImages = async () => {
      const newImageMap: Record<number, string> = {};

      for (const employee of list) {
        const imageUrl = await fetchImage(employee.id);
        newImageMap[employee.id] = imageUrl;
      }

      setImageMap(newImageMap);
    };

    if (list.length > 0) {
      loadImages();
    }
  }, [list]);

  const handleEdit = (id: number) => {
    console.log(`${id}`);
    navigate(`/employees/edit/${id}`);
  };
  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/employees/${id}`);
      setList(list.filter((employee: Employee) => employee.id !== id));
      setAlert({ type: 'success', message: '削除が成功しました' });
    } catch (error) {
      console.error('削除に失敗しました', error);
      setAlert({ type: 'danger', message: '削除に失敗しました' });
    }
  };

  const [isAscId, setIsAscId] = useState(true);
  const [isAscName, setIsAscName] = useState(true);
  const [isAscEmail, setIsAscEmail] = useState(true);
  const [isAscAdmin, setIsAscAdmin] = useState(true);

  const handleSort = (colname: string, asc: boolean = true) => {
    setList(
      [...list].sort((a: Employee, b: Employee) => {
        const aValue: string | number | boolean | File | null =
          a[colname as keyof Employee];
        const bValue: string | number | boolean | File | null =
          b[colname as keyof Employee];
        const order = asc ? 1 : -1;

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return aValue.localeCompare(bValue) * order;
        } else if (typeof aValue === 'number' && typeof bValue === 'number') {
          return (aValue - bValue) * order;
        } else if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
          return (aValue === bValue ? 0 : aValue ? -1 : 1) * order;
        }
        return 0;
      })
    );
  };

  const sortByColumn = (
    colname: string,
    currentValue: boolean,
    setter: (asc: boolean) => void
  ) => {
    const newValue = !currentValue;
    setter(newValue);
    handleSort(colname, newValue);
  };

  return (
    <div className="mx-3 mt-3">
      <h2>社員一覧</h2>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      <table className="table table-hover table-striped mt-3">
        <thead>
          <tr className="row">
            <th
              className="col-1"
              onClick={() => {
                sortByColumn('id', isAscId, setIsAscId);
              }}
            >
              <SortIcon className="me-2" />
              id
            </th>
            <th className="col-1">顔写真</th>
            <th
              className="col-2"
              onClick={() => {
                sortByColumn('name', isAscName, setIsAscName);
              }}
            >
              <SortIcon className="me-2" />
              名前
            </th>
            <th
              className="col-5"
              onClick={() => {
                sortByColumn('email', isAscEmail, setIsAscEmail);
              }}
            >
              <SortIcon className="me-2" />
              メールアドレス
            </th>
            <th
              className="col-1"
              onClick={() => {
                sortByColumn('admin', isAscAdmin, setIsAscAdmin);
              }}
            >
              <SortIcon className="me-2" />
              権限
            </th>
            <th className="col-2">アクション</th>
          </tr>
        </thead>
        <tbody>
          {list.map((employee: Employee) => (
            <tr className="row" key={employee.id}>
              <td className="col-1">{employee.id}</td>
              <td className="col-1">
                <img
                  src={imageMap[employee.id] || ''}
                  alt="顔写真"
                  width="50"
                  height="50"
                  style={{
                    objectFit: 'cover',
                    border: '1px solid #ccc', // 枠線
                    backgroundColor: '#f9f9f9', // 背景色
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '';
                  }}
                />
              </td>
              <td className="col-2">{employee.name}</td>
              <td className="col-5">{employee.email}</td>
              <td className="col-1">{employee.admin ? '管理者' : '一般'}</td>
              <td className="col-2">
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(employee.id)}
                >
                  編集
                </button>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => handleDelete(employee.id)}
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeListPage;
