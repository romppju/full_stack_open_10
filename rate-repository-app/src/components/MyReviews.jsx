import { FlatList, View, StyleSheet, Pressable, Alert } from 'react-native';
import theme from '../theme';
import { format, parseISO } from 'date-fns';
import Text from './Text';
import { Link } from 'react-router-native';

import { useQuery, useMutation } from '@apollo/client';
import { GET_USER } from '../graphql/queries';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: theme.backgroungColors.white,
  },
  flexContainer: {
    flexDirection: 'row',
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
  blueButton: {
    backgroundColor: theme.backgroungColors.blue,
    margin: 5,
    borderRadius: 3,
    color: theme.colors.white,
    height: 50,
    justifyContent: 'center',
    flexGrow: 1,
  },
  redButton: {
    backgroundColor: theme.colors.error,
    margin: 5,
    borderRadius: 3,
    color: theme.colors.white,
    height: 50,
    justifyContent: 'center',
    flexGrow: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: theme.colors.white,
    fontSize: 20,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const ReviewItem = ({ review }) => {
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    refetchQueries: [GET_USER, 'getCurrentUser'],
  });

  const date = format(parseISO(review.createdAt), 'dd.MM.yyyy');

  const createAlert = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: removeReview,
        },
      ]
    );
  };

  const removeReview = () => {
    deleteReview({ variables: { id: review.id } });
  };

  return (
    <View style={styles.container}>
      <View style={styles.flexContainer}>
        <View style={styles.ratinContainer}>
          <Text style={styles.rating} fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View>
          <Text fontWeight="bold">{review.repository.fullName}</Text>
          <Text color="textSecondary">{date}</Text>
          <Text style={styles.flexWrap}>{review.text}</Text>
        </View>
      </View>
      <View style={styles.flexContainer}>
        <Pressable style={styles.blueButton}>
          <Link to={`/${review.repository.id}`}>
            <Text style={styles.buttonText}>View repository</Text>
          </Link>
        </Pressable>
        <Pressable style={styles.redButton} onPress={createAlert}>
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </View>
  );
};

const MyReviews = () => {
  const user = useQuery(GET_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (user.loading) {
    return <Text>loading</Text>;
  }

  const reviews = user.data.me.reviews.edges.map((edge) => edge.node);

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
    />
  );
};

export default MyReviews;
