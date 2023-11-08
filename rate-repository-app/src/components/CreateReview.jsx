import { View, Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Formik } from 'formik';
import * as yup from 'yup';
import useCreateReview from '../hooks/useCreateReview';
import { useNavigate } from 'react-router-native';

const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: '',
  text: '',
};

const validationSchema = yup.object().shape({
  ownerName: yup.string().required('Repository owner name is required'),
  repositoryName: yup.string().required('Repository name is required'),
  rating: yup
    .number()
    .typeError('Rating must be a number')
    .required('Rating is required')
    .min(0, 'Rating must be between 0 and 100')
    .max(100, 'Rating must be between 0 and 100'),
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
  formContainer: {
    backgroundColor: theme.backgroungColors.white,
    padding: 10,
  },
  button: {
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
});

const ReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.formContainer}>
      <FormikTextInput
        name="ownerName"
        placeholder="Repository owner name"
        style={styles}
      />
      <FormikTextInput
        name="repositoryName"
        placeholder="Repository name"
        style={styles}
      />
      <FormikTextInput
        name="rating"
        placeholder="Rating between 0 and 100"
        style={styles}
      />
      <FormikTextInput name="text" placeholder="Review" style={styles} />
      <Pressable onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const { data } = await createReview(values);
      navigate(`/${data.createReview.repositoryId}`);
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
      {({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReview;
