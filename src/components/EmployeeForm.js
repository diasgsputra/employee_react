import React, { useState } from 'react';
import axios from 'axios';

function EmployeeForm({ onAddSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEmployee = { name, email, department };
    axios.post('https://employeejava-production.up.railway.app/api/employees', newEmployee).then(() => {
      // Clear form fields after successful submission
      setName('');
      setEmail('');
      setDepartment('');
      onAddSuccess();
    });
  };

  return (
    <div>
      <h2>Add Employee</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
}

export default EmployeeForm;
