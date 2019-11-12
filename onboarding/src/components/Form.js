import React from "react";
import { withFormik, Form, Field} from "formik";
import * as Yup from 'yup'
// removed:
// state
// handleSubmit
// onChange

const OnboardingForm = ({ values, touched, errors }) => {
  return (
    <div className="onboarding-form">
      <Form>
        <Field
          className="form-input"
          type="text"
          name="name"
          placeholder="Name"
          value={values.name}
        />
        {touched.name && errors.name && ( <p className="error">{errors.name}</p>
)}
        <Field
          className="form-input"
          type="text"
          name="email"
          placeholder="Email"
          value={values.email}
        />
        {touched.email && errors.email && ( <p className="error">{errors.email}</p>
)}
        <Field
          className="form-input"
          type="password"
          name="password"
          placeholder="Password"
          value={values.password}
        />
        {touched.password && errors.password && ( <p className="error">{errors.password}</p>
)}
        <label>
          <Field
            type="checkbox"
            name="password"
            placeholder="Password"
            checked={values.tos}
          />
          {touched.tos && errors.tos && ( <p className="error">{errors.tos}</p>
)}
                      Agree to Terms of Service

        </label>
        <button type="submit">Submit!</button>
      </Form>
    </div>
  );
};

const FormikOnboardingForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: "" || name,
      email: "" || email,
      password: "" || password,
      tos: false || tos
    }
  },

  validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required')
  }),

  handleSubmit(values, {}) {
    console.log(values);
  }
})(OnboardingForm);
export default FormikOnboardingForm;
