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
import * as yup from "yup";

const roles = [
  { value: "management", label: "Management" },
  { value: "developer", label: "Developer" },
];

const validationSchema = yup.object().shape({
  project_name: yup.string().required('Project name is required'),
  description: yup.string().required('Description is required'),
  sec_allocated: yup.number()
    .integer('Seconds allocated must be an integer')
    .min(0, 'Seconds allocated must be a positive integer')
    .required('Seconds allocated is required'),
  started_from: yup.date()
    .transform((value, originalValue) => originalValue.split('T')[0])
    .required('Start date is required')
    .typeError('Invalid date format, expected YYYY-MM-DD'),
  deadline: yup.date()
    .transform((value, originalValue) => originalValue.split('T')[0])
    .required('Deadline date is required')
    .typeError('Invalid date format, expected YYYY-MM-DD'),
});
const initialValues = {
  project_name: '',
  description: '',
  sec_allocated: 0,
  started_from: '',
  deadline: '',
};


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function UpdateProject({ open, setOpen }) {
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
          Update Project
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
              name="project_name"
              label="Project Name"
              variant="outlined"
              fullWidth
              error={touched.project_name && Boolean(errors.project_name)}
              helperText={touched.project_name && errors.project_name}
              margin="normal"
              size="small"
            />
            <Field
              as={TextField}
              name="description"
              label="Description"
              variant="outlined"
              fullWidth
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
              margin="normal"
              size="small"
            />
            <Field
              as={TextField}
              name="sec_allocated"
              type="number"
              label="Seconds Allocated"
              variant="outlined"
              fullWidth
              error={touched.sec_allocated && Boolean(errors.sec_allocated)}
              helperText={touched.sec_allocated && errors.sec_allocated}
              margin="normal"
              size="small"
            />
            <Field
              as={TextField}
              name="started_from"
              type="date"
              label="Started From"
              variant="outlined"
              fullWidth
              error={touched.started_from && Boolean(errors.started_from)}
              helperText={touched.started_from && errors.started_from}
              margin="normal"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <Field
              as={TextField}
              name="deadline"
              type="date"
              label="Deadline"
              variant="outlined"
              fullWidth
              error={touched.deadline && Boolean(errors.deadline)}
              helperText={touched.deadline && errors.deadline}
              margin="normal"
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" variant="contained" color="primary">
            Update
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
