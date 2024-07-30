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
import { Formik, Form, Field, useFormik } from "formik";
import * as yup from "yup";
import { BASE_URL } from "@/config";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  name: yup.string().required("Task type is required"),
  desc: yup.string(),
});
const initialValues = {
  name: "",
  desc: "",
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

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log(">> Values got : ", values);
      try {
        const resGot = await fetch(BASE_URL + "/admin/task-type/add-task-type", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const gotRes = await resGot.json();

        if (gotRes.success) {
          console.log(">> ADDED Task : ", gotRes);
          toast.success("Task added successfully");
          handleClose();
        } else if (gotRes.message) {
          toast.success(gotRes.message);
        }
      } catch (err) {
        toast.error("Something went wrong while adding user");
      }
    },
  });

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
              <TextField
                name="name"
                label="Type"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 1 }}
                size="small"
                {...formik.getFieldProps("name")}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
              <TextField
                name="desc"
                label="Description"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 1 }}
                size="small"
                {...formik.getFieldProps("desc")}
                error={formik.touched.desc && Boolean(formik.errors.desc)}
                helperText={formik.touched.desc && formik.errors.desc}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  formik.submitForm();
                }}
              >
                Add Task Type
              </Button>
             
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
