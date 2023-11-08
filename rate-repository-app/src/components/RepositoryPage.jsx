import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import Text from './Text';
import { FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import { format, parseISO } from 'date-fns';

import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  flexContainer: {
    flexDirection: 'row',
    backgroundColor: theme.backgroungColors.white,
  },
  rating: {
    color: theme.backgroungColors.blue,
    borderWidth: 2,
    borderColor: theme.backgroungColors.blue,
    width: 50,
    height: 50,
    borderRadius: 25,
    textAlign: 'center',
    padding: 10,
    margin: 5,
    alignSelf: 'flex-start',
  },
  flexWrap: {
    flex: 1,
    flexWrap: 'wrap',
  },
  ratinContainer: {
    //justifyContent: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const date = format(parseISO(review.createdAt), 'dd.MM.yyyy');
  return (
    <View style={styles.flexContainer}>
      <View style={styles.ratinContainer}>
        <Text style={styles.rating} fontWeight="bold">
          {review.rating}
        </Text>
      </View>

      <View>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{date}</Text>
        <Text style={styles.flexWrap}>{review.text}</Text>
      </View>
    </View>
  );
};

const RepositoryPage = () => {
  const { id } = useParams();
  const { data, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 7 },
    skip: !id,
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>loading</Text>;
  }

  const handleEndReach = () => {
    const canFetchMore =
      !loading && data.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        id,
        after: data.repository.reviews.pageInfo.endCursor,
        first: 7,
      },
    });
  };

  const reviews = data.repository.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={() => (
        <RepositoryItem repo={data.repository} show={true} />
      )}
      onEndReached={handleEndReach}
      onEndReachedThreshold={0.5}
    />
  );
};

export default RepositoryPage;
