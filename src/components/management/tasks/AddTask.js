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

const validationSchema = yup.object().shape({
  task_type: yup.string().required('Task type is required'),
  description: yup.string().required('Description is required'),
});
const initialValues = {
    task_type: '',
  description: '',
};


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddTask({ open, setOpen }) {
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
          Add Task Type
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
              name="task_type"
              label="Task Type"
              variant="outlined"
              fullWidth
              error={touched.task_type && Boolean(errors.task_type)}
              helperText={touched.task_type && errors.task_type}
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
            <Button type="submit" variant="contained" color="primary">
            Add Task Type
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
