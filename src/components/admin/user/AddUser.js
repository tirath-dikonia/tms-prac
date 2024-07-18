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
  Box,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

const roles = [
  { value: "management", label: "Management" },
  { value: "developer", label: "Developer" },
];
const user_type = ["Admin", "Employee", "Manager"];
const validationSchema = Yup.object({
  name: Yup.string().required("Fullname is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  role: Yup.string().required("Role is required"),
  user_type: Yup.string().required("User Type is required"),
});

const initialValues = {
  name: "",
  email: "",
  password: "",
  role: "",
  user_type: "",
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
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit : (values, {resetForm, setSubmitting}) => {
      console.log(">> Values got : ", values);
    }
  });
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
        keepMounted={false}
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
              <Box>
                <TextField  name="name"
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      size="small"
                      {...formik.getFieldProps('name')}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                      />
              </Box>
              {/* <Formik
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
                      helperText={touched.role && errors.role}
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
                    <Field
                      as={FormControl}
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.user_type && Boolean(errors.user_type)}
                    >
                      <InputLabel id="user-type-label">User Type</InputLabel>
                      <Field
                        as={Select}
                        labelId="user-type-label"
                        label="User Type"
                        name="user_type"
                        defaultValue=""
                        size="small"
                      >
                        {user_type.map((type) => (
                          <MenuItem key={type} value={type}>
                            {type}
                          </MenuItem>
                        ))}
                      </Field>
                    </Field>
                    <Button type="submit" variant="contained" color="primary">
                      Add
                    </Button>
                  </Form>
                )}
              </Formik> */}
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
