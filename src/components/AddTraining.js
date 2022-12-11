import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fi';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

function AddTraining(props) {
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: 0,
        customer: ''
    });

    const [fullname, setFullname] = useState('');

    const [addTrainingOpen, setAddTrainingOpen] = useState(false);

    const dialogOpen = () => {
        fetch(props.link)
            .then(response => response.json())
            .then(data => setFullname(data.firstname + ' ' + data.lastname));
        setTraining({ ...training, customer: props.link })
        setAddTrainingOpen(true);
    }

    const dialogClose = () => {
        setAddTrainingOpen(false);
    }

    const handleInputChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value })
    }

    const changeDate = (date) => {
        setTraining({ ...training, date: dayjs(date)});
    }

    const addTraining = () => {
        setTraining({...training, date: dayjs(training.date).toISOString})
        props.saveTraining(training);
        dialogClose();
    }

    return (
        <div>
            <div>
                <Button style={{ margin: 5, display: 'flex' }} variant='text' onClick={dialogOpen}>Add Training</Button>
            </div>
            <Dialog onClose={dialogClose} open={addTrainingOpen}>
                <DialogTitle>Add Training for {fullname}</DialogTitle>
                <DialogContent>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='fi'>
                        <DateTimePicker
                            label="Date"
                            value={training.date}
                            inputFormat='DD/MM/YYYY HH:mm'
                            ampm={false}
                            onChange={changeDate}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        autoFocus
                        margin='dense'
                        name='activity'
                        value={training.activity}
                        onChange={e => handleInputChange(e)}
                        label='Activity'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='duration'
                        value={training.duration}
                        onChange={e => handleInputChange(e)}
                        label='Duration'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose}>Cancel</Button>
                    <Button onClick={addTraining}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddTraining;