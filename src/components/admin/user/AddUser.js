import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const roles = [
  { value: "management", label: "Management" },
  { value: "developer", label: "Developer" },
];

const validationSchema = Yup.object({
  fullname: Yup.string().required('Fullname is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  role: Yup.string().required('Role is required'),
});

const initialValues = {
  fullname: '',
  email: '',
  password: '',
  role: '',
};


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddUser({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (values) => {
    console.log(values); // Handle submit logic here
  };
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add User
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
        <Grid container justifyContent="center">
      <Grid item xs={6}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                as={TextField}
                name="fullname"
                label="Full Name"
                variant="outlined"
                fullWidth
                error={touched.fullname && Boolean(errors.fullname)}
                helperText={touched.fullname && errors.fullname}
                margin="normal"
                size="small" 
              />
              <Field
                as={TextField}
                name="email"
                type="email"
                label="Email"
                variant="outlined"
                fullWidth
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                margin="normal"
                size="small" 
              />
              <Field
                as={TextField}
                name="password"
                type="password"
                label="Password"
                variant="outlined"
                fullWidth
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                margin="normal"
                size="small" 
              />
              <Field
                as={FormControl}
                variant="outlined"
                fullWidth
                margin="normal"
                error={touched.role && Boolean(errors.role)}
              >
                <InputLabel id="role-label">Role</InputLabel>
                <Field
                  as={Select}
                  labelId="role-label"
                  label="Role"
                  name="role"
                  defaultValue=""
                  size="small" 
                >
                  {roles.map((role) => (
                    <MenuItem key={role.value} value={role.value}>
                      {role.label}
                    </MenuItem>
                  ))}
                </Field>
              </Field>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Grid>
        </DialogContent>
       
      </BootstrapDialog>
    </React.Fragment>
  );
}
