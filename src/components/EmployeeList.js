import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeUpdate from './EmployeeUpdate';
import EmployeeForm from './EmployeeForm';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [updateId, setUpdateId] = useState(null);

  const fetchEmployees = () => {
    axios.get('https://employeejava-production.up.railway.app/api/employees').then((response) => {
      setEmployees(response.data);
    });
  };
  const handleAddSuccess = () => {
    fetchEmployees(); // Fetch employees after successfully adding a new employee
  };
  useEffect(() => {
    axios.get('https://employeejava-production.up.railway.app/api/employees').then((response) => {
      setEmployees(response.data);
    });
  }, []);

  const handleSearch = () => {
    if (searchQuery.trim() !== '') {
      axios.get(`https://employeejava-production.up.railway.app/employees/search?search=${searchQuery}`)
        .then((response) => {
          setEmployees(response.data);
        });
    } else {
      axios.get('https://employeejava-production.up.railway.app/api/employees').then((response) => {
        setEmployees(response.data);
      });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`https://employeejava-production.up.railway.app/api/employees/${id}`).then(() => {
      // After successful deletion, refresh the employee list
      axios.get('https://employeejava-production.up.railway.app/api/employees').then((response) => {
        setEmployees(response.data);
      });
    });
  };

  const handleUpdate = (id) => {
    setUpdateId(id); // Set the employee ID being updated
  };
  const handleUpdateSuccess = () => {
    setUpdateId(null); // Clear the updateId to trigger a re-render of EmployeeList
    fetchEmployees();
  };

  return (
    <div>
      <h2>Employee List</h2>
      <div>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        
      </div>
      <ul>
        {employees.map((employee) => (
          <li key={employee.id}>
            {employee.name} - {employee.email} - {employee.department}
            <button onClick={() => handleDelete(employee.id)}>Delete</button>
            <button onClick={() => handleUpdate(employee.id)}>Update</button>
          </li>
        ))}
      </ul>
      {updateId && <EmployeeUpdate id={updateId} onUpdateSuccess={handleUpdateSuccess} />}
      <EmployeeForm onAddSuccess={handleAddSuccess} />
    </div>
  );
}

export default EmployeeList;
