import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Grid,
} from "@mui/material";
import { Formik, Form, Field, useFormik } from "formik";
import * as Yup from "yup";
import { BASE_URL } from "@/config";
import toast from "react-hot-toast";

const roles = [
  { value: "management", label: "Management" },
  { value: "developer", label: "Developer" },
];

const validationSchema = Yup.object({
  role: Yup.string().required('Role is required'),
});

const initialValues = {
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

export default function AddRole({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (values) => {
    console.log(values); // Handle submit logic here
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async(values, { resetForm, setSubmitting }) => {
      console.log(">> Values got : ", values);
     try{
      const roleRes = await fetch(BASE_URL + "/admin/role/add-role", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({...values, desc: ""})
      })
      const gotRes = await roleRes.json();
      
      if(gotRes.success){
        console.log(">> ADDED USER : ", gotRes)
        toast.success("Role added successfully")
        handleClose()
      }else if(gotRes.message){
        toast.success(gotRes.message)
      }
      
     } catch (err){
      toast.error("Something went wrong while adding user")
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
          Add Role
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
             <TextField
                  name="role"
                  label="Role"
                  variant="outlined"
                  fullWidth
                  sx={{ marginBottom: 1 }}
                  size="small"
                  {...formik.getFieldProps("role")}
                  error={formik.touched.role && Boolean(formik.errors.role)}
                  helperText={formik.touched.role && formik.errors.role}
                />
              
              <Button type="submit" variant="contained" color="primary" onClick={()=> {formik.submitForm()}}>
                Add Role
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
