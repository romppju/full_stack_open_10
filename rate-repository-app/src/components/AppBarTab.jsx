import { Pressable, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  tab: {
    width: 100,
    height: 30,
    alignItems: 'center',
  },
});

const AppBarTab = ({ text, to }) => {
  return (
    <Pressable style={styles.tab}>
      <Link to={to}>
        <Text color="white" fontWeight="bold">
          {text}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
