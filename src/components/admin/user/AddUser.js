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
  OutlinedInput,
  InputAdornment,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const roles = [
  { value: "management", label: "Management" },
  { value: "developer", label: "Developer" },
];
const user_type = ["Admin", "Employee", "Manager"];
const validationSchema = Yup.object({
  name: Yup.string().min(2).required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  mobile: Yup.number().required("Email is required"),
  // password: Yup.string()
  //   .required("Password is required")
  //   .min(6, "Password must be at least 6 characters"),
  role: Yup.string().required("Role is required"),
  user_type: Yup.string().required("User Type is required"),
});

const initialValues = {
  name: "",
  email: "",
  mobile: "",
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
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      console.log(">> Values got : ", values);
    },
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
                <TextField
                  name="name"
                  label="Full Name"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 1 }}
                  size="small"
                  {...formik.getFieldProps("name")}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
                <TextField
                  name="email"
                  label="Email"
                  sx={{ marginBottom: 1 }}
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...formik.getFieldProps("email")}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                  name="mobile"
                  label="Mobile"
                  sx={{ marginBottom: 1 }}
                  variant="outlined"
                  fullWidth
                  size="small"
                  {...formik.getFieldProps("mobile")}
                  error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                  helperText={formik.touched.mobile && formik.errors.mobile}
                />
                <FormControl fullWidth>
                <InputLabel id="user_type_label">User Type</InputLabel>
                <Select
                  id="user_type"
                  fullWidth
                  sx={{ marginBottom: 1 }}
                  labelId="user_type_label"
                  variant="outlined"
                  size="small"
                  {...formik.getFieldProps("user_type")}
                  error={
                    formik.touched.user_type && Boolean(formik.errors.user_type)
                  }
                  helperText={
                    formik.touched.user_type && formik.errors.user_type
                  }
                  label="User Type"
                >
                  <MenuItem value="">Select User Type</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Employee">Employee</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Select>
                </FormControl>
                <FormControl fullWidth>
                <InputLabel id="role_label">Role</InputLabel>
                <Select
                  id="role"
                  fullWidth
                  sx={{ marginBottom: 1 }}
                  labelId="role_label"
                  variant="outlined"
                  size="small"
                  {...formik.getFieldProps("role")}
                  error={
                    formik.touched.role && Boolean(formik.errors.role)
                  }
                  helperText={
                    formik.touched.role && formik.errors.role
                  }
                  label="Role"
                >
                  <MenuItem value="">Select Role</MenuItem>
                  <MenuItem value="Admin">Developer</MenuItem>
                  <MenuItem value="Employee">Manger</MenuItem>
                  <MenuItem value="Manager">Admin</MenuItem>
                </Select>
                </FormControl>
                <Button variant="contained" color="primary">
                  Add User
                </Button>
                {/* <FormControl sx={{ width: '100%' }} variant="outlined" size="small"> */}
                {/* <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          /> */}
                {/* </FormControl> */}
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
