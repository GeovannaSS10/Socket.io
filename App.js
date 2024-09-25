import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-web';
import socket  from './socket';

export default function App() {

  const [room, setRoom] = useState('default');
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const sendMessage = () => {
    socket.emit('send_message', {room, message});
    setMessage('');
  };

  useEffect(() => {
    socket.emit('join_room', room);

    socket.on('receive_message',(msg)=>{
      setReceivedMessage(msg)
    })

    return () =>{
      socket.off('receive_message')
    }
  },[room])

  return (

    <View style={styles.container}>
     <Text style = {styles.title}> Canal:{room}</Text>

     <TextInput
     placeholder='Digite sua mensagem'
     value={message}
     onChangeText={setMessage}
     />

     <Pressable style={styles.button} onPress={sendMessage}>
      <Text style={styles.buttonText}>Enviar mensagem</Text>
     </Pressable>

     <Text style={styles.receivedMessageTitle}>mensagem recebida:</Text>
     <Text style>{receivedMessage || 'Nenhuma mensagem recebida'}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#f4f4f4',
    padding: 20,
    justifyContent:'center'
  },

  title:{
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input:{
    height:50,
    borderColor:'#ccc',
    borderWidth:1,
    borderRadius: 5,
    paddingHorizontal:5,
  },
  button:{
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:20
  },
  buttonText:{
    color: '#fff',
    fontSize: 16,
    fontWeight:'bold'
  },
  receivedMessageTitle:{
    fontSize:16,
    fontWeight:'bold',
    marginTop:20,
    textAlign:'center'
  },
  receivedMessage:{
    fontSize:16,
    color: '#333',
    marginTop:10,
    padding:10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
    textAlign:'center'
   }
});
