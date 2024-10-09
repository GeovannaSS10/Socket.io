import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-web';
import socket  from './socket';

export default function App() {

  const [room, setRoom] = useState('Conversa');
  const [roomTwo] = useState('Conversa');

  const [message, setMessage] = useState('');
  const [messageTwo, setMessageTwo] = useState('');

  const [receivedMessage, setReceivedMessage] = useState('');
  const [messageList, setmessageList] =useState([]);

  const sendMessage = () => {

    if(message.trim()){
      socket.emit('send_message', {room, message});
      setmessageList((PreveMessages)=>[...PreveMessages,{texto:message, remetente:'a'}]);
      setMessage('');
    }
   
  };

  const sendMessageTwo = () => {

    if(messageTwo.trim()){
      socket.emit('send_messageTwo', {roomTwo, messageTwo});
      setmessageList((PreveMessages)=>[...PreveMessages,{texto: messageTwo, remetente:'b'}]);
      setMessageTwo('');
    }
   
  };


  useEffect(() => {
    socket.emit('join_room', room, roomTwo);

    socket.on('receive_message',(msg)=>{
      setReceivedMessage(msg)
      setmessageList((PreveMessages)=>[...PreveMessages,{texto:msg, remetente:'a'}]);

    })

    socket.on('receive_messageTwo',(msgB)=>{
      setReceivedMessage(msgB)
      setmessageList((PreveMessages)=>[...PreveMessages,{texto:msgB, remetente:'b'}]);

    })

    return () =>{
      socket.off('receive_message');
      socket.off('receive_messageTwo');
    }
  },[room ])


  return (

    <View style={styles.container}>
     <Text style = {styles.title}> Canal:{room}</Text>

     <TextInput
     placeholder='Digite sua mensagem'
     value={message}
     onChangeText={setMessage}
     
     style={styles.input}
     />   

     <Pressable style={styles.button} onPress={sendMessage}>
      <Text style={styles.buttonText}>Enviar mensagem</Text>
     </Pressable>


     <Text style = {styles.title}> Canal:{roomTwo}</Text>

      <TextInput
      placeholder='Digite sua mensagem'
      value={messageTwo}
      onChangeText={setMessageTwo}

      style={styles.input}
      />

      <Pressable style={styles.button} onPress={sendMessageTwo}>
      <Text style={styles.buttonText}>Enviar mensagem</Text>
      </Pressable>

     <Text style={styles.title}>mensagem recebida:</Text>
    {messageList.map((item)=>(
      <Text key={item.id || item.texto} style={[styles.message, item.remetente ==='a'? styles.remetenteA: styles.remetenteB]}>{item.texto}</Text>
    ))}
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
   },
   message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
   },
   remetenteA: {
    backgroundColor: '#d1e7dd',
    alignSelf: 'flex-start',
   },
   remetenteB: {
    backgroundColor: '#f3f3f3',
    alignSelf: 'flex-end'
   }
});
