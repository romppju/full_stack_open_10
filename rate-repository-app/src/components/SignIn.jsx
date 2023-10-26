import { View, Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import theme from '../theme';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
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

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput name="username" placeholder="Username" style={styles} />
      <FormikTextInput
        name="password"
        placeholder="Password"
        secureTextEntry
        style={styles}
      />
      <Pressable onPress={onSubmit} style={styles.signInButton}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

const SignIn = () => {
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const { username, password } = values;

    try {
      const { data } = await signIn({ username, password });
      console.log(data);
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
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default SignIn;
