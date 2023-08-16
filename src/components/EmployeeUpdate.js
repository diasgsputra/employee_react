import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EmployeeUpdate({ id, onUpdateSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  useEffect(() => {
    axios.get(`https://employeejava-production.up.railway.app/api/employees/${id}`).then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setDepartment(response.data.department);
    });
  }, [id]);

  const handleUpdate = () => {
    const updatedEmployee = { id, name, email, department };
    axios.put(`https://employeejava-production.up.railway.app/api/employees/${id}`, updatedEmployee).then((response) => {
      // Handle success, you might want to display a message or redirect to the employee list
      onUpdateSuccess();
    });
  };

  return (
    <div>
      <h2>Update Employee</h2>
      <form>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />
        <button type="button" onClick={handleUpdate}>Update Employee</button>
      </form>
    </div>
  );
}

export default EmployeeUpdate;
