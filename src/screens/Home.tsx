import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
} from 'react-native';
import {useQuery} from '@tanstack/react-query';
import {API_URL} from '@env';
import axios from 'axios';

const Home = () => {
  const [text, onChangeText] = useState('');
  const [data, setData] = useState('');

  useEffect(() => {
    axios
      .get(`${API_URL}/todos`)
      .then(response => {
        console.log(response.data);
        setData(response.data.todos);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${API_URL}/todos`);
  //     console.log(response.data);
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const {data: response, isError, isLoading} = useQuery(['todos'], fetchData);

  // if (isLoading) {
  //   return <Text>Loading Data...</Text>;
  // }

  // if (isError) {
  //   return <Text>Error Fetching Data...</Text>;
  // }

  const handleSave = () => {
    console.log('Pressed!');
  };

  return (
    <View style={styles.bg}>
      <Text style={styles.txtTitle}>Todo List</Text>
      <View style={styles.viewTitle}>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={onChangeText}
        />
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.txtPlus}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={data}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <>
            <View style={styles.viewItem}>
              <Text style={styles.txtCatatan}>{item.todo}</Text>
            </View>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#fff',
  },
  viewTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 30,
    marginTop: 10,
    alignItems: 'center',
  },
  txtTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
  txtPlus: {
    fontSize: 25,
  },
  viewItem: {
    backgroundColor: '#dbdbdb',
    height: 50,
    marginHorizontal: 30,
    marginTop: 10,
    justifyContent: 'center',
    borderRadius: 10,
  },
  txtCatatan: {
    marginLeft: 10,
  },
  input: {
    height: 30,
    width: 340,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 10,
    paddingLeft: 20,
  },
});

export default Home;
