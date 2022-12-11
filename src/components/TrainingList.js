import React, { useState, useRef, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';

function TrainingList() {
    const dayjs = require('dayjs')

    const [trainings, setTrainings] = useState([]);
    const gridRef = useRef();

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [message, setMessage] = useState('');

    const snackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setSnackbarOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={snackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    const columns = [{
        headerName: 'Trainings',
        children: [
            {
                field: 'id', headerName: '', maxWidth: 100,
                cellRenderer: params => {
                    return <IconButton aria-label="delete" onClick={() => deleteTraining(params.value)}>
                        <DeleteIcon />
                    </IconButton>
                }
            },
            {
                field: 'activity', headerName: 'Activity',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                headerName: 'Date', valueGetter(params) {
                    return dayjs(params.data.date).format('DD.MM.YYYY HH:mm')
                },
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'duration', headerName: 'Duration',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                headerName: 'Customer', valueGetter(params) {
                    return params.data.customer.firstname + ' ' + params.data.customer.lastname
                },
                sortable: true, filter: true, floatingFilter: true
            }
        ]
    }]

    const fetchTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
            .then(response => response.json())
            .then(data => setTrainings(data));
    }

    const deleteTraining = (id) => {
        if (window.confirm('Are you sure?')) {
            fetch(`https://customerrest.herokuapp.com/api/trainings/${id}`, { method: 'DELETE' })
                .then(res => {
                    fetchTrainings();
                    setMessage('Training deleted.');
                    setSnackbarOpen(true);
                })
                .catch(err => {
                    console.error(err);
                    setMessage('An error occurred.' + err);
                    setSnackbarOpen(true);
                });
        }
    }

    useEffect(() => {
        fetchTrainings();
    }, [])

    return (
        <div>
            <div className='ag-theme-material'
                style={{ height: '600px', width: '100%', margin: 'auto' }}>
                <AgGridReact
                    ref={gridRef}
                    rowSelection='single'
                    columnDefs={columns}
                    rowData={trainings}
                    animateRows={true}
                    pagination={true}
                    paginationPageSize={10}>
                </AgGridReact>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={snackbarClose}
                    message={message}
                    action={action}
                />
            </div>
        </div>
    );
};

export default TrainingList;