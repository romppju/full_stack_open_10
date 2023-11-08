import { FlatList, View, StyleSheet } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import React from 'react';
import TextInput from './TextInput';
import theme from '../theme';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  validTextInput: {
    color: theme.colors.textSecondary,
    backgroundColor: theme.backgroungColors.white,
    borderColor: theme.backgroungColors.grey,
    borderWidth: 1,
    borderRadius: 3,
    margin: 5,
    height: 50,
    paddingLeft: 5,
  },
  invalidTextInput: {
    color: theme.colors.textSecondary,
    backgroundColor: theme.backgroungColors.white,
    borderColor: theme.colors.error,
    borderWidth: 1,
    borderRadius: 3,
    margin: 5,
    height: 50,
    paddingLeft: 5,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const [order, setOrder] = useState('Latest');
  const [filter, setFilter] = useState('');
  const [delayedFilter] = useDebounce(filter, 500);

  let queryObj = {};

  order === 'Highest'
    ? (queryObj = { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' })
    : order === 'Lowest'
    ? (queryObj = { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' })
    : (queryObj = { orderBy: 'CREATED_AT', orderDirection: 'DESC' });

  queryObj.searchKeyword = delayedFilter;

  const { repositories } = useRepositories(queryObj);

  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <RepositoryListContainer
      repositoryNodes={repositoryNodes}
      order={order}
      setOrder={setOrder}
      filter={filter}
      setFilter={setFilter}
    />
  );
};

/*
export const RepositoryListContainer = ({
  repositoryNodes,
  order,
  setOrder,
}) => {
  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem repo={item} show={false} />}
      ListHeaderComponent={() => (
        <Picker
          selectedValue={order}
          onValueChange={(value) => setOrder(value)}
        >
          <Picker.Item label="Latest Repositories" value="Latest" />
          <Picker.Item label="Highest rated repositories" value="Highest" />
          <Picker.Item label="Lowest rated repositories" value="Lowest" />
        </Picker>
      )}
    />
  );
};
*/

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    return (
      <View>
        <TextInput
          placeholder="Search"
          style={styles}
          defaultValue={this.props.filter}
          onChangeText={(value) => this.props.setFilter(value)}
        ></TextInput>
        <Picker
          selectedValue={this.props.order}
          onValueChange={(value) => this.props.setOrder(value)}
        >
          <Picker.Item label="Latest Repositories" value="Latest" />
          <Picker.Item label="Highest rated repositories" value="Highest" />
          <Picker.Item label="Lowest rated repositories" value="Lowest" />
        </Picker>
      </View>
    );
  };

  render() {
    return (
      <FlatList
        data={this.props.repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem repo={item} show={false} />}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

export default RepositoryList;
