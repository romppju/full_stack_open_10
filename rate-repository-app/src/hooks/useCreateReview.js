import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    const review = { ownerName, repositoryName, rating: Number(rating), text };

    const result = await mutate({ variables: { review } });

    return result;
  };

  return [createReview, result];
};

export default useCreateReview;
