import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { format, parse } from "date-fns";

import { TextField, Grid } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Fragment, useEffect } from "react";
import { BASE_URL } from "@/config";
import toast from "react-hot-toast";

const validationSchema = yup.object().shape({
  name: yup.string().required("Project name is required"),
  desc: yup.string().required("Description is required"),
  hours_allocated: yup
    .number()
    .integer("Hours allocated must be an integer")
    .min(1, "Hours allocated must be greater than 1")
    .required("Hours allocated is required"),
  start_date: yup
    .date()
    // .transform((value, originalValue) => originalValue.split("T")[0])
    .required("Start is required")
    .typeError("Invalid date format, expected YYYY-MM-DD")
    .test("is-before-deadline", "Start date must be before deadline", function(value) {
      const { deadline } = this.parent;
      return !deadline || value <= deadline;
    }),
  deadline: yup
    .date()
    .required("Deadline is required")
    .typeError("Invalid date format, expected YYYY-MM-DD")
    .test("is-after-start_date", "Deadline must be after start date", function(value) {
      const { start_date } = this.parent;
      return !start_date || value >= start_date;
    }),
});
const initialValues = {
  name: "",
  desc: "",
  hours_allocated: "",
  start_date: "",
  deadline: "",
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddProject({ open, setOpen }) {
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
      try {
        const resGot = await fetch(BASE_URL + "/admin/project/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const gotRes = await resGot.json();

        if (gotRes.success) {
          // console.log(">> ADDED project : ", gotRes);
          toast.success("Project added successfully");
          handleClose();
        } else if (gotRes.message) {
          toast.success(gotRes.message);
        }
      } catch (err) {
        toast.error("Something went wrong while adding project");
      }
    },
  });

  return (
    <Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Add Project
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
                label="Project Name"
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
              <TextField
                name="hours_allocated"
                label="Hours Allocated"
                type="number"
                variant="outlined"
                fullWidth
                sx={{ marginBottom: 1 }}
                size="small"
                {...formik.getFieldProps("hours_allocated")}
                error={
                  formik.touched.hours_allocated &&
                  Boolean(formik.errors.hours_allocated)
                }
                helperText={
                  formik.touched.hours_allocated &&
                  formik.errors.hours_allocated
                }
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  name="start_date"
                  label="Start Date"
                  value={
                    formik.values.start_date
                      ? parse(
                          formik.values.start_date,
                          "yyyy-MM-dd",
                          new Date()
                        )
                      : null
                  }
                  onChange={(date) => {
                    if (date) {
                      formik.setFieldValue(
                        "start_date",
                        format(date, "yyyy-MM-dd")
                      );
                    }
                  }}
                  format="dd MMM, yy"
                  slotProps={{
                    textField: {
                      size: "small",
                      error:
                        formik.touched.start_date &&
                        Boolean(formik.errors.start_date),
                      helperText:
                        formik.touched.start_date && formik.errors.start_date,
                      sx: { width: "100%", marginBottom: 1 },
                      onBlur: () => {
                        console.log(">>> START DATE  BLURRED::: ");
                        formik.setFieldTouched("start_date", true);
                      },
                    },
                  }}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  name="deadline"
                  label="Deadline"
                  value={
                    formik.values.deadline
                      ? parse(formik.values.deadline, "yyyy-MM-dd", new Date())
                      : null
                  }
                  onChange={(date) => {
                    if (date) {
                      formik.setFieldValue(
                        "deadline",
                        format(date, "yyyy-MM-dd")
                      );
                    }
                  }}
                  format="dd MMM, yy"
                  slotProps={{
                    textField: {
                      size: "small",
                      error:
                        formik.touched.deadline &&
                        Boolean(formik.errors.deadline),
                      helperText:
                        formik.touched.deadline && formik.errors.deadline,
                      sx: { width: "100%", marginBottom: 1 },
                      onBlur: () => {
                        console.log(">>> START DATE  BLURRED::: ");
                        formik.setFieldTouched("deadline", true);
                      },
                    },
                  }}
                />
              </LocalizationProvider>

              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  formik.submitForm();
                }}
              >
                Create Project
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </BootstrapDialog>
    </Fragment>
  );
}
