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
     <Text>Canal:{room}</Text>

     <TextInput
     placeholder='Digite sua mensagem'
     value={message}
     onChangeText={setMessage}
     />

     <Pressable onPress={sendMessage}>
      <Text>Enviar mensagem</Text>
     </Pressable>

     <Text>mensagem recebida:</Text>
     <Text>{receivedMessage || 'Nenhuma mensagem recebida'}</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
