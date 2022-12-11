import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

function EditCustomer(props) {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        streetaddress: '',
        postcode: '',
        city: ''
    });

    const [editCustomerOpen, setEditCustomerOpen] = useState(false);

    const dialogOpen = () => {
        setEditCustomerOpen(true);
        fetch(props.link)
        .then(response => response.json())
        .then(data => setCustomer(data));
    }

    const dialogClose = () => {
        setEditCustomerOpen(false);
    }

    const handleInputChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value })
    }

    const updateCustomer = () => {
        props.updateCustomer(customer, props.link);
        dialogClose();
    }

    return (
        <div>
            <IconButton aria-label="edit" onClick={dialogOpen}>
                <EditIcon />
            </IconButton>
            <Dialog onClose={dialogClose} open={editCustomerOpen}>
                <DialogTitle>Edit Customer</DialogTitle>
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
                    <Button onClick={updateCustomer}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default EditCustomer;