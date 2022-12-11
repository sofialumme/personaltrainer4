import './App.css';
import React, { useState } from 'react';
import CustomerList from './components/CustomerList';
import TrainingList from './components/TrainingList';
import TrainingCalendar from './components/TrainingCalendar';
import Statistics from './components/Statistics';
import { AppBar } from '@mui/material';
import Tabs from'@mui/material/Tabs';
import Tab from'@mui/material/Tab';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  const [value, setValue] = useState('customerlist');

  const handleTabChange = (event, value) => {
    setValue(value);
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" >
            Personal Trainer
          </Typography>
        </Toolbar>
      </AppBar>
      <Tabs value={value} onChange={handleTabChange}>
        <Tab value="customerlist" label="Customers" />
        <Tab value="traininglist" label="Trainings" />
        <Tab value="trainingcalendar" label="Calendar" />
        <Tab value="statistics" label="Statistics" />
      </Tabs>
      {value === 'customerlist' && <CustomerList />}
      {value === 'traininglist' && <TrainingList />}
      {value === 'trainingcalendar' && <TrainingCalendar />}
      {value === 'statistics' && <Statistics />}
    </div>
  );
}

export default App;
