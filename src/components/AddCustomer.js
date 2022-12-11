import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

function AddCustomer(props) {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const [addCustomerOpen, setAddCustomerOpen] = useState(false);

    const dialogOpen = () => {
        setAddCustomerOpen(true);
    }

    const dialogClose = () => {
        setAddCustomerOpen(false);
    }

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    const addCustomer = () =>  {
        props.saveCustomer(customer);
        setCustomer({
            firstname: '',
            lastname: '',
            email: '',
            phone: '',
            streetaddress: '',
            postcode: '',
            city: ''
        });
        dialogClose();
    }

    return (
        <div>
            <div>
            <Button style={{ margin: 10, display: 'flex', flexDirection: 'row', float: 'left' }} variant='outlined' onClick={dialogOpen}>Add New Customer</Button>
            </div>
            <Dialog onClose={dialogClose} open={addCustomerOpen}>
                <DialogTitle>Add New Customer</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin='dense'
                        name='firstname'
                        value={customer.firstname}
                        onChange={e => handleInputChange(e)}
                        label='First name'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='lastname'
                        value={customer.lastname}
                        onChange={e => handleInputChange(e)}
                        label='Last name'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='email'
                        value={customer.email}
                        onChange={e => handleInputChange(e)}
                        label='Email'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='phone'
                        value={customer.phone}
                        onChange={e => handleInputChange(e)}
                        label='Phone number'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='streetaddress'
                        value={customer.streetaddress}
                        onChange={e => handleInputChange(e)}
                        label='Address'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='postcode'
                        value={customer.postcode}
                        onChange={e => handleInputChange(e)}
                        label='Postal code'
                        fullWidth
                    />
                    <TextField
                        autoFocus
                        margin='dense'
                        name='city'
                        value={customer.city}
                        onChange={e => handleInputChange(e)}
                        label='City'
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={dialogClose}>Cancel</Button>
                    <Button onClick={addCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default AddCustomer;