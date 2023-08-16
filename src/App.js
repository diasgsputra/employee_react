import React from 'react';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Employee Management App</h1>
      <EmployeeList />
    </div>
  );
}

export default App;
