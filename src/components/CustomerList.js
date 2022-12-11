import React, { useState, useRef, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';
import AddTraining from './AddTraining';
import { Button } from '@mui/material';

function CustomerList() {
    const [customers, setCustomers] = useState([]);
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
        headerName: 'Customers',
        children: [
            {
                field: 'links.0.href', headerName: '', maxWidth: 100,
                cellRenderer: params => {
                    return <IconButton aria-label="delete" onClick={() => deleteCustomer(params.value)}>
                        <DeleteIcon />
                    </IconButton>
                }
            },
            {
                field: 'links.0.href', headerName: '', maxWidth: 100,
                cellRenderer: params => {
                    return <EditCustomer link={params.value} updateCustomer={updateCustomer} />
                }
            },
            {
                field: 'links.0.href', headerName: '', maxWidth: 200,
                cellRenderer: params => {
                    return <AddTraining link={params.value} saveTraining={saveTraining} />
                }
            },
            {
                field: 'firstname', headerName: 'First name',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'lastname', headerName: 'Last name',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'email', headerName: 'Email',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'phone', headerName: 'Phone',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'streetaddress', headerName: 'Address',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'postcode', headerName: 'Postal code',
                sortable: true, filter: true, floatingFilter: true
            },
            {
                field: 'city', headerName: 'City',
                sortable: true, filter: true, floatingFilter: true
            }
        ]
    }]

    const fetchCustomers = () => {
        fetch('https://customerrest.herokuapp.com/api/customers')
            .then(response => response.json())
            .then(data => setCustomers(data.content));
    }

    const saveCustomer = (customer) => {
        fetch('https://customerrest.herokuapp.com/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => {
                fetchCustomers();
                setMessage('Customer added.');
                setSnackbarOpen(true);
            })
            .catch(err => {
                console.error(err);
                setMessage('An error occurred.' + err);
                setSnackbarOpen(true);
            });
    }

    const updateCustomer = (customer, link) => {
        fetch(link, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => {
                fetchCustomers();
                setMessage('Customer edited.');
                setSnackbarOpen(true);
            })
            .catch(err => {
                console.error(err);
                setMessage('An error occurred.' + err);
                setSnackbarOpen(true);
            });
    }

    const deleteCustomer = (link) => {
        if (window.confirm('Are you sure?')) {
            fetch(link, { method: 'DELETE' })
                .then(res => {
                    fetchCustomers();
                    setMessage('Customer deleted.');
                    setSnackbarOpen(true);
                })
                .catch(err => {
                    console.error(err);
                    setMessage('An error occurred.' + err);
                    setSnackbarOpen(true);
                });
        }
    }

    const saveTraining = (training) => {
        fetch('https://customerrest.herokuapp.com/api/trainings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(training)
        })
            .then(res => {
                fetchCustomers();
                setMessage('Training added.');
                setSnackbarOpen(true);
            })
            .catch(err => {
                console.error(err);
                setMessage('An error occurred.' + err);
                setSnackbarOpen(true);
            });
    }

    const csvParams = {
        columnKeys: ['firstname', 'lastname', 'email', 'phone', 'streetaddress', 'postcode', 'city'],
        allColumns: false,
        skipColumnGroupHeaders: true
    }

    const exportCsv = useCallback(() => {
        gridRef.current.api.exportDataAsCsv(csvParams);
    }, []);

    useEffect(() => {
        fetchCustomers();
    }, [])

    return (
        <div>
            <AddCustomer saveCustomer={saveCustomer} />
            <Button style={{
                margin: 10,
                display: 'flex',
                flexDirection: 'row',
                float: 'left'
            }}
                variant='outlined' onClick={exportCsv}>Export to CSV</Button>
            <div className='ag-theme-material'
                style={{ height: '550px', width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
                <AgGridReact
                    ref={gridRef}
                    rowSelection='single'
                    columnDefs={columns}
                    rowData={customers}
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

export default CustomerList;