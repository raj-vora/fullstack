import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Formik, useField } from 'formik';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import Button from './Button';
import * as yup from 'yup';

const initialValues = {
  username: '',
  password: '',
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 5,
    paddingVertical: 10,
    backgroundColor: theme.colors.secondary
  }
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Button onSubmit={onSubmit} text={"Sign In"} />
    </View>
  );
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required'),
  password: yup
    .string()
    .required('Password is required')
});

const SignIn = () => {
  const onSubmit = values => {
    console.log(values);
  };

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;