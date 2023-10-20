import { View, Image, StyleSheet } from 'react-native';
import Text from './Text';
import RepositoryMetric from './RepositoryMetric';

import theme from '../theme';

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
});

const RepositoryItem = ({ repo }) => {
  return (
    <View style={styles.greyBackground}>
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
    </View>
  );
};

export default RepositoryItem;
