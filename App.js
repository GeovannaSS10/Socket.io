import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Text, TextInput } from 'react-native-web';
import socket from './socket';

export default function App() {
  const [room, setRoom] = useState('Conversa');
  const [roomTwo] = useState('Conversa');

  const [message, setMessage] = useState('');
  const [messageTwo, setMessageTwo] = useState('');

  const [receivedMessage, setReceivedMessage] = useState('');
  const [messageList, setMessageList] = useState([]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { room, message });
      setMessageList((PrevMessages) => [...PrevMessages, { texto: message, remetente: 'a' }]);
      setMessage('');
    }
  };

  const sendMessageTwo = () => {
    if (messageTwo.trim()) {
      socket.emit('send_messageTwo', { roomTwo, messageTwo });
      setMessageList((PrevMessages) => [...PrevMessages, { texto: messageTwo, remetente: 'b' }]);
      setMessageTwo('');
    }
  };

  useEffect(() => {
    socket.emit('join_room', room, roomTwo);

    socket.on('receive_message', (msg) => {
      setReceivedMessage(msg);
      setMessageList((PrevMessages) => [...PrevMessages, { texto: msg, remetente: 'a' }]);
    });

    socket.on('receive_messageTwo', (msgB) => {
      setReceivedMessage(msgB);
      setMessageList((PrevMessages) => [...PrevMessages, { texto: msgB, remetente: 'b' }]);
    });

    return () => {
      socket.off('receive_message');
      socket.off('receive_messageTwo');
    };
  }, [room]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Canal: {room}</Text>

      <TextInput
        placeholder="Digite sua mensagem"
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Enviar mensagem</Text>
      </Pressable>

      <Text style={styles.title}>Canal: {roomTwo}</Text>

      <TextInput
        placeholder="Digite sua mensagem"
        value={messageTwo}
        onChangeText={setMessageTwo}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={sendMessageTwo}>
        <Text style={styles.buttonText}>Enviar mensagem</Text>
      </Pressable>

      <Text style={styles.receivedMessageTitle}>Mensagens recebidas:</Text>
      {messageList.map((item, index) => (
        <Text
          key={index}
          style={[
            styles.message,
            item.remetente === 'a' ? styles.remetenteA : styles.remetenteB,
          ]}
        >
          {item.texto}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#555', 
  },

  input: {
    height: 50,
    borderColor: '#dcdcdc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fafafa',
  },

  button: {
    backgroundColor: '#a6d6a1',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  receivedMessageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
    color: '#666',
  },

  message: {
    marginVertical: 5,
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },

  remetenteA: {
    backgroundColor: '#d5f0dc', 
    alignSelf: 'flex-start',
  },

  remetenteB: {
    backgroundColor: '#e8d4f0', 
    alignSelf: 'flex-end',
  },
});
