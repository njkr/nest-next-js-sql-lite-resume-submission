import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
    FormControl,
    FormGroup,
    FormHelperText,
    MenuItem,
    Button,
    Typography,
    Select,
    InputLabel,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import { CustomTextField } from '@/components/inputs/CustomTextField';
import { CustomCheckboxGroup } from '@/components/inputs/CustomCheckboxGroup';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/router';
import { postResume } from '@/redux/dashboardReducerSlice';

interface FormValues {
    fullName: string;
    dateOfBirth: string;
    preferredLocation: string;
    programmingSkills: string[];
    resumeSummary: string;
}

const validationSchema = Yup.object({
    fullName: Yup.string()
        .max(50, 'Must be 50 characters or less')
        .required('Required'),
    dateOfBirth: Yup.date().required('Required'),
    preferredLocation: Yup.string().required('Required'),
    programmingSkills: Yup.array()
        .of(Yup.string())
        .min(1, 'Select at least one skill')
        .required('Required'),
    resumeSummary: Yup.string()
        .max(250, 'Must be 250 characters or less')
        .required('Required'),
});

const initialValues: FormValues = {
    fullName: '',
    dateOfBirth: '',
    preferredLocation: '',
    programmingSkills: [],
    resumeSummary: '',
};

const skills = ['React', 'C#', 'Ruby', 'Angular', 'Java', 'Python'];
const location = ['Sydney', 'Melbourne', 'Brisbane', 'Adelaide', 'Perth'];

const SubmitResume: React.FC = () => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const handleSubmit = (values: FormValues) => {
        dispatch(postResume(values, router));
    };

    return (<div className="m-5 sm:m-8 md:m-10 lg:mx-[25%] xl:mx-[20%]">
        <Typography
            variant="h6"
            component="h6"
            className="mb-4"
        >
            Submit Resume
        </Typography>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >

            {({ values, errors, touched, handleChange, setFieldValue }) => (
                <Form className="space-y-8">
                    <Field
                        name="fullName"
                        label="Full Name"
                        component={CustomTextField}
                        inputProps={{ maxLength: 50 }}
                    />
                    <Field
                        name="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                        component={CustomTextField}
                        InputLabelProps={{ shrink: true }}
                    />
                    <FormControl fullWidth error={touched.preferredLocation && Boolean(errors.preferredLocation)}>
                        <InputLabel>Preferred Location</InputLabel>
                        <Select
                            name="preferredLocation"
                            value={values.preferredLocation}
                            onChange={(e: SelectChangeEvent) => handleChange(e)}
                        >
                            {location.map((location) => (
                                <MenuItem key={location} value={location}>
                                    {location}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{touched.preferredLocation && errors.preferredLocation}</FormHelperText>
                    </FormControl>
                    <div>
                        <Typography>Programming Skills</Typography>
                        <FormControl error={touched.programmingSkills && Boolean(errors.programmingSkills)}>
                            <FormGroup row className="space-x-2">
                                {CustomCheckboxGroup(values.programmingSkills, setFieldValue, 'programmingSkills', skills)}
                            </FormGroup>
                            <FormHelperText>{touched.programmingSkills && errors.programmingSkills}</FormHelperText>
                        </FormControl>
                    </div>
                    <Field
                        name="resumeSummary"
                        label="Resume Summary"
                        component={CustomTextField}
                        multiline
                        rows={4}
                        inputProps={{ maxLength: 250 }}
                        helperText={`${values.resumeSummary.length} / 250 characters`}
                    />
                    <div className="flex justify-between items-center mb-4">

                        <Button
                            variant="outlined"
                            color="secondary"
                            className="px-4 py-2"
                        >
                            <Link href="/" className="text-secondary">
                                Back
                            </Link>
                        </Button>


                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="w-full sm:w-auto"
                        >
                            Submit
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    </div>
    );
};

export default SubmitResume;