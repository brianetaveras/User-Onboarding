import React, {useState, useEffect} from "react";
import { withFormik, Form, Field} from "formik";
import * as Yup from 'yup'
import axios from 'axios'
import Users from './Users'


const OnboardingForm = ({ values, touched, errors, status }) => {

    const [users, setUsers] = useState([])

    useEffect(()=>{
        if(status)
        setUsers([status, ...users])
    }, [status])
 
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
        {users.map(user=>{
            return <Users key={user.id} user={user} />
        })}

    </div>
  );
};

const FormikOnboardingForm = withFormik({
  mapPropsToValues({ name, email, password, tos }) {
    return {
      name: "" || name,
      email: "" || email,
      password: "" || password,
      tos: '' || tos
    }
  },

  validationSchema: Yup.object().shape({
      name: Yup.string().required('Name is required'),
      email: Yup.string().required('Email is required'),
      password: Yup.string().required('Password is required')
  }),

  handleSubmit(values, {setStatus}) {
    console.log(values);
    axios
    .post('https://reqres.in/api/users/', values)
    .then(res=>{
        setStatus(res.data)
    })
    .catch(err=>{console.log(err.response)})
  }
})(OnboardingForm);
export default FormikOnboardingForm;
