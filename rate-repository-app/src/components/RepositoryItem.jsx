import { View, Image, StyleSheet, Pressable } from 'react-native';
import Text from './Text';
import RepositoryMetric from './RepositoryMetric';
import theme from '../theme';
import * as Linking from 'expo-linking';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  logo: {
    width: 50,
    height: 50,
    borderRadius: 4,
    margin: 2,
  },
  flexContainer: {
    flexDirection: 'row',
  },
  coloredContainer: {
    alignSelf: 'flex-start',
  },
  flexItem: {
    flexGrow: 1,
  },
  centeredText: {
    textAlign: 'center',
  },
  greyBackground: {
    backgroundColor: theme.backgroungColors.white,
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

const RepositoryItem = ({ repo, show }) => {
  const navigate = useNavigate();

  const handlePress = () => {
    Linking.openURL(repo.url);
  };

  return (
    <Pressable onPress={() => navigate(`/${repo.id}`)}>
      <View style={styles.greyBackground} testID="repositoryItem">
        <View style={styles.flexContainer}>
          <Image style={styles.logo} source={{ uri: repo.ownerAvatarUrl }} />
          <View>
            <Text fontWeight="bold">{repo.fullName}</Text>
            <Text color="textSecondary">{repo.description}</Text>
            <View style={styles.coloredContainer}>
              <Text color="white" background="blue">
                {repo.language}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.flexContainer}>
          <RepositoryMetric metric="Stars" value={repo.stargazersCount} />
          <RepositoryMetric metric="Forks" value={repo.forksCount} />
          <RepositoryMetric metric="Reviews" value={repo.reviewCount} />
          <RepositoryMetric metric="Rating" value={repo.ratingAverage} />
        </View>
        {show && (
          <Pressable style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Open in GitHub</Text>
          </Pressable>
        )}
      </View>
    </Pressable>
  );
};

export default RepositoryItem;
