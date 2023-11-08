import { View, StyleSheet, ScrollView, Pressable } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';
import { useQuery } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import Text from './Text';
import { useNavigate } from 'react-router-native';

import useAuthStorage from '../hooks/useAuthStorage';
import { useApolloClient } from '@apollo/client';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.backgroungColors.grey,
  },
  tab: {
    width: 100,
    height: 30,
    alignItems: 'center',
  },
});

const AppBar = () => {
  const user = useQuery(GET_USER, {
    fetchPolicy: 'cache-and-network',
  });

  if (user.loading) {
    return <Text>loading</Text>;
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal centerContent>
        <AppBarTab text="Repositories" to="/" style={styles.tab} />
        {!user.data.me && (
          <AppBarTab text="Sign in" to="/signin" style={styles.tab} />
        )}
        {!user.data.me && (
          <AppBarTab text="Sign up" to="/signup" style={styles.tab} />
        )}
        {user.data.me && (
          <AppBarTab
            text="Create review"
            to="/createreview"
            style={styles.tab}
          />
        )}
        {user.data.me && (
          <AppBarTab text="My reviews" to="/myreviews" style={styles.tab} />
        )}
        {user.data.me && <SignOut />}
      </ScrollView>
    </View>
  );
};

const SignOut = () => {
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    navigate('/');
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <Pressable style={styles.tab} onPress={handleSignOut}>
      <Text color="white" fontWeight="bold">
        Sign out
      </Text>
    </Pressable>
  );
};

export default AppBar;
