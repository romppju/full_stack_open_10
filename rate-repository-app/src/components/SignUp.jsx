import { View, Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-native';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';

import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const initialValues = {
  username: '',
  password: '',
  passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords do not match')
    .required('Password confirmation is required'),
});

const styles = StyleSheet.create({
  validTextInput: {
    color: theme.colors.textSecondary,
    backgroundColor: theme.backgroungColors.white,
    borderColor: theme.backgroungColors.grey,
    borderWidth: 1,
    borderRadius: 3,
    margin: 5,
    height: 50,
    paddingLeft: 5,
  },
  invalidTextInput: {
    color: theme.colors.textSecondary,
    backgroundColor: theme.backgroungColors.white,
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: 3,
    margin: 5,
    height: 50,
    paddingLeft: 5,
  },
  signInButton: {
    backgroundColor: theme.backgroungColors.blue,
    margin: 5,
    borderRadius: 3,
    color: theme.colors.white,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    color: theme.colors.white,
    fontSize: 20,
  },
  formContainer: {
    backgroundColor: theme.backgroungColors.white,
    padding: 10,
  },
});

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput name="username" placeholder="Username" style={styles} />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={styles}
      />
      <FormikTextInput
        name="passwordConfirmation"
        placeholder="Password confirmation"
        secureTextEntry
        style={styles}
      />
      <Pressable onPress={onSubmit} style={styles.signInButton}>
        <Text style={styles.buttonText}>Sign up</Text>
      </Pressable>
    </View>
  );
};

const SignUp = () => {
  const navigate = useNavigate();
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      await createUser({ variables: { user: { username, password } } });
      await signIn({ username, password });
      navigate('/');
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignUp;
