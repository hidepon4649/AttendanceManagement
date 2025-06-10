import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams } from 'react-router-dom';
import { Employee } from '../models/Employee';
import { Alert } from 'react-bootstrap';
import { lsGetJwtToken } from 'src/utils/localStorageUtils';

const EmployeeEditPage = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee>(
    new Employee(0, '', '', '', false, null)
  );
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [alert, setAlert] = useState<{ type: string; message: string } | null>(
    null
  );

  useEffect(() => {
    const fetchEmployee = async () => {
      const response = await api.get(`/employees/${id}`);
      setEmployee(response.data);
    };
    fetchEmployee().catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await api.get(`/employees/${id}/picture`, {
          responseType: 'blob',
        });
        if (response.data) {
          const imageUrl = URL.createObjectURL(response.data);
          setPreviewImage(imageUrl);
        }
      } catch (error) {
        console.error('画像の取得に失敗しました:', error);
        setPreviewImage(null); // エラー時もnullを設定
      }
    };
    fetchImage();
  }, [id]);

  const handleEdit = async () => {
    setErrors({});

    // 画像をアップロードする場合は、FormDataを使用して送信する必要があります。
    const formData = new FormData();
    formData.append('id', String(employee.id));
    formData.append('name', employee.name);
    formData.append('email', employee.email);
    formData.append('admin', String(employee.admin));
    if (employee.picture) {
      formData.append('picture', employee.picture);
    }

    const token = lsGetJwtToken();

    try {
      await api.put(`/employees/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      setAlert({ type: 'success', message: '編集が成功しました' });
    } catch (error: any) {
      if (error.response?.data) {
        setErrors({
          fieldErrors: error.response.data, // フィールドエラー
        });
      }
      setAlert({ type: 'danger', message: '編集が失敗しました' });
    }
  };

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;

    setEmployee((prevValue) => {
      const newValue = {
        ...prevValue,
        [name]: type === 'checkbox' ? checked : value,
      } as Employee;

      return newValue;
    });
  }

  const handleOnChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;

    const file: File | undefined = event.target.files?.[0];
    if (!file) {
      return;
    }
    const isValidType = ['image/jpeg', 'image/png'].includes(file.type);
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

    if (!isValidType) {
      setErrors({
        fieldErrors: { picture: 'jpgまたはpng形式のみ対応しています。' },
      });
      return;
    }

    if (!isValidSize) {
      setErrors({
        fieldErrors: { picture: 'ファイルサイズは5MB以下にしてください。' },
      });
      return;
    }

    setPreviewImage(URL.createObjectURL(file));

    setEmployee((prevValue) => {
      const newValue = {
        ...prevValue,
        [name]: type === 'checkbox' ? checked : value,
        picture: file,
      } as Employee;

      return newValue;
    });
  };

  return (
    <div className="mx-3 mt-3">
      <h2>社員編集</h2>
      {alert && (
        <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
          {alert.message}
        </Alert>
      )}

      {previewImage && (
        <div className="mb-3 mt-3 custom-file">
          <img
            src={previewImage}
            alt="顔写真プレビュー"
            style={{ width: '200px', height: 'auto', borderRadius: '10px' }}
          />
        </div>
      )}
      <div className="mb-3 mt-3 custom-file">
        <label className="form-label custom-file-label" htmlFor="picture">
          顔写真:
        </label>
        <input
          type="file"
          className="form-control custom-file-input"
          name="picture"
          id="picture"
          onChange={handleOnChangeFile}
          placeholder="顔写真の選択"
        />
        {errors.fieldErrors?.picture && (
          <p className="text-danger">{errors.fieldErrors.picture}</p>
        )}
      </div>

      <div className="mb-3 mt-3">
        <label className="form-label" htmlFor="name">
          名前:
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          autoComplete="username"
          value={employee.name}
          onChange={handleOnChange}
          placeholder="名前"
        />
        {errors.fieldErrors?.name && (
          <p className="text-danger">{errors.fieldErrors.name}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="email">
          メールアドレス:
        </label>
        <input
          type="email"
          className="form-control"
          name="email"
          autoComplete="email"
          value={employee.email}
          onChange={handleOnChange}
          placeholder="メールアドレス"
        />
        {errors.fieldErrors?.email && (
          <p className="text-danger">{errors.fieldErrors.email}</p>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="admin">
          管理者権限:
        </label>
        <input
          type="checkbox"
          name="admin"
          className="form-check-input"
          checked={employee.admin}
          onChange={handleOnChange}
        />
      </div>
      <button className="btn btn-primary" onClick={handleEdit}>
        更新
      </button>
    </div>
  );
};

interface FieldErrors {
  [key: string]: string;
}

interface Errors {
  fieldErrors?: FieldErrors;
}

export default EmployeeEditPage;
