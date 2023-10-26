import { useMutation } from '@apollo/client';
import { GET_TOKEN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const useSignIn = () => {
  const [mutate, result] = useMutation(GET_TOKEN);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const credentials = { username, password };

    const result = await mutate({ variables: { credentials } });
    await authStorage.setAccessToken(result.data.authenticate.accessToken);
    apolloClient.resetStore();

    return result;
  };

  return [signIn, result];
};

export default useSignIn;
