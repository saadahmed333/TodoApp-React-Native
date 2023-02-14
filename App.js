import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Modal,
  Image,
} from 'react-native';
const App = () => {
  const data = [
  ];
  const [updated, setUpdated] = useState('')
  const [todo, setTodo] = useState('');
  const [list, setList] = useState(data);
  const [modalValue, setModalValue] = useState('');
  const [load, setLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState(false)
  let count = list.length;

  useEffect(() => {
    setLoad(true);
  }, [])

  const getTodo = () => {
    if (todo === " " || todo === "") {
      setError(!error)
    }
    else {
      setList([...list, { title: todo, id: count + 1 }]);
      setTodo(' ');
      setLoad(true);
      setError(false)
    }

  };

  const deleteTodo = () => {
    setList('');
    setLoad(true);
    setTodo(' ');
  };

  const deleteOne = (id) => {
    let arr = list.filter(item => item.id !== id)
    setList(arr)
    setLoad(true)
  };

  const update = () => {
    for (let i = 0; i < list.length; i++) {
      if (list[i].title === updated) {
        list[i].title = modalValue
        list[i].id = list[i].id
      }
    }
    setLoad(true);
    setModalVisible(false)
  };

  const Item = ({ title, id }) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 5,
      }}>
      <View style={{ borderBottomColor: "gray", borderBottomWidth: 2, width: 220, paddingBottom: 2 }}>
        <Text style={{color: "black"}}>{title}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: 80,
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => { setModalVisible(true), setUpdated(title) }}>
          <Image
            source={require("./assets/edit1.jpg")}
            style={{ height: 25, width: 25 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteOne(id)}>
          <Image
            source={require("./assets/delete.jpg")}
            style={{ height: 30, width: 30 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 20,
      }}>
      {error && <Text style={{ color: "red", textAlign: 'center', fontSize: 15, marginBottom: 5 }}>Input field must not be empty</Text>}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TextInput
          value={todo}
          onChangeText={newText => setTodo(newText)}
          placeholder="TODO"
          placeholderTextColor="#404448"
          style={{
            paddingVertical: 5,
            paddingLeft: 10,
            borderColor: 'black',
            borderWidth: 2,
            minWidth: 150,
            maxWidth: 250,
            height: 35,
            borderRadius: 20,
          }}
        />

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => getTodo()}
            style={{
              borderRadius: 20,
              padding: 5,
            }}>
            <Image
              source={require("./assets/add.jpg")}
              style={{ height: 30, width: 30 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => deleteTodo()}
            style={{
              borderRadius: 20,
              padding: 5,
            }}>
            <Image 
              source={require("./assets/delete.jpg")}
              style={{ height: 30, width: 30 }}
            /> 
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ marginTop: 20 }}>
        {load && (
          <FlatList
            data={list}
            renderItem={({ item }) => <Item title={item.title} id={item.id} />}
            keyExtractor={item => item.id}
          />
        )}
      </View>

      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 22,
        }}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22,
            }}>
            <View
              style={{
                margin: 20,
                backgroundColor: 'white',
                borderRadius: 20,
                paddingTop: 10,
                paddingLeft: 35,
                paddingRight: 35,
                paddingBottom: 35,
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 55,
              }}>
              <View style={{width: 200, justifyContent: 'flex-end', alignItems: "flex-end", marginBottom: 20}}>
              <TouchableOpacity
                  style={{
                    borderRadius: 20,
                  }}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Image
                    source={require("./assets/cross.jpg")}
                    style={{ height: 25, width: 25 }}
                  />
                </TouchableOpacity>
              </View>
              <TextInput placeholder={updated} onChangeText={(e) => setModalValue(e)} style={{ borderColor: 'black', borderWidth: 2, paddingLeft: 10, width: 200, height: 40, marginBottom: 20, borderRadius: 20 }} />
              <View style={{ width: 200, flexDirection: "row", justifyContent: "flex-end" }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 20,
                    padding: 10,
                  }}
                  onPress={() => {setModalVisible(!modalVisible), update()}}>
                    <Image
                    source={require("./assets/update.jpg")}
                    style={{ height: 30, width: 30 }}
                  />
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default App;
