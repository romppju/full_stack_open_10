import { View } from 'react-native';
import Text from './Text';

const styles = {
  flexItem: {
    flexGrow: 1,
  },
  centeredText: {
    textAlign: 'center',
  },
};

const RepositoryMetric = ({ metric, value }) => {
  if (Number(value) > 999) {
    value = `${(value / 1000).toFixed(1)}k`;
  }

  return (
    <View style={styles.flexItem}>
      <Text style={styles.centeredText} fontWeight="bold">
        {value}
      </Text>
      <Text style={styles.centeredText} color="textSecondary">
        {metric}
      </Text>
    </View>
  );
};

export default RepositoryMetric;
