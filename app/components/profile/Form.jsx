import React, { Fragment } from 'react';
import Styled from 'styled-components';
import { rgba } from 'polished';
import { Formik, Field } from 'formik';
import { Colors } from '../../styles';

const Form = Styled.form`
  display: flex;
  flex-direction: column;
  padding: 48px;

  h1 {
    margin: 0 0 48px;
  }

  .row {
    display: block;
    margin: 0 0 28px;

    &:after {
      content: '';
      clear: both;
      display: table;
    }

    input,select {
      width: 100%;
      appearance: none;
    }
  }

  .label {
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 1.0px;
    font-weight: 700;
    margin: 0 0 8px;
    display: inline-block;
  }
`;

const Button = Styled.button`
  height: 50px;
  color: white;
  background-color: ${Colors.defaultBlue}
  border-radius: 3px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  min-width: 160px;
  align-self: flex-end;
  padding: 0 72px;

  &:hover {
    background-color: ${Colors.darkerBlue};
  }
`;

const ProfileForm = () => {
  const userData = window.INITIAL_STATE;

  return (
    <Fragment>
      <Formik
        initialValues={{
          firstName: userData.firstName,
          lastName: userData.lastName,
          currency: 'EU',
          budget: 0,
        }}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);
        }}
        render={props => (
          <Form onSubmit={props.handleSubmit}>
            <h1>Your profile.</h1>
            <fieldset>
              <div className="row">
                <label className="label">First name</label>
                <Field type="text" name="firstName" value={props.values.firstName}/>
              </div>
              <div className="row">
                <label className="label">Last name</label>
                <Field type="text" name="lastName" value={props.values.lastName}/>
              </div>
              <div className="row">
                <label className="label">Budget p/m</label>
                <Field type="text" name="budget"/>
              </div>
              <div className="row">
                <label className="label">Currency</label>
                <Field component="select" name="currency" >
                  <option defaultValue="eu">Euro</option>
                  <option value="usd">US Dollar</option>
                </Field>
              </div>
            </fieldset>
          
            <Button type="submit">Update profile</Button>
          </Form>
        )}
      >
      </Formik>
    </Fragment>
  );
};

export default ProfileForm;
