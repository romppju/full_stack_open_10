import { Pressable } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const AppBarTab = ({ text, to, style }) => {
  return (
    <Pressable style={style}>
      <Link to={to}>
        <Text color="white" fontWeight="bold">
          {text}
        </Text>
      </Link>
    </Pressable>
  );
};

export default AppBarTab;
