//import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import Text from '../components/Text';

const useRepositories = (order) => {
  /*
  const [repositories, setRepositories] = useState();
  const [loading, setLoading] = useState(false);

  const fetchRepositories = async () => {
    setLoading(true);

    // Replace the IP address part with your own IP address!
    const response = await fetch('http://192.168.0.100:5000/api/repositories');
    const json = await response.json();

    console.log('JSON data:');
    console.log(json);

    setLoading(false);
    setRepositories(json);
  };

  useEffect(() => {
    fetchRepositories();
  }, []);

  return { repositories, loading, refetch: fetchRepositories };
  */
  const result = useQuery(GET_REPOSITORIES, {
    variables: order,
    fetchPolicy: 'cache-and-network',
  });

  if (result.loading) {
    return <Text>loading</Text>;
  }

  return result.data;
};

export default useRepositories;
