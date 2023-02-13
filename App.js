import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, Alert, Image } from 'react-native';
import { useState } from 'react';
import { FlatList } from 'react-native';


export default function App() {
  const [keyword, setKeyword] = useState('');
  const [receipts, setReceipts] = useState([]);

  const getReceipts =()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => setReceipts(data.meals))
    .catch(error => Alert('Error', error));

  }

  return (
    <View style={styles.container}>
      <FlatList
      keyExtractor={(item => item.id)}
      data={receipts}
      renderItem={( {item}) =>
      <View>
        <Text>{item.strMeal}</Text>
        <Image style={{width:50, height:50}} source= {{ uri: item.strMealThumb}}/>
        </View> }
        />
       <TextInput style={{fontSize:18, width:200}} 
      placeholder='keyword'
      onChangeText={text => setKeyword(text) } 
      value={keyword}/>
      <Button title="Find" onPress={getReceipts} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
