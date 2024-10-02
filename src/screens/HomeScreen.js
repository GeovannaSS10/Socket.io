import { Button, StyleSheet, Text, View } from 'react-native'

const HomeScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>You're in Home</Text>
            <Button 
                title='Details'
                onPress={() => navigation.navigate('Detalhes')}
            />
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f4f4f4',
        padding: 30,
        justifyContent: 'center',    
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
        backgroundColor: '#fff'
    },
    button: {
        backgroundColor: '#4CAF50', // Adicionei o símbolo '#' para a cor
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 20 // Ajustei para ter uma margem em vez de 'bold'
    },
    receivedMessageTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center'
    },
    receivedMessage: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
        padding: 10,
        backgroundColor: '#e8e8e8',
        borderRadius: 5,
        textAlign: 'center'
    },
    formulario1: {
        marginTop: 50
    },
    formulario2: {
        marginTop: 250
    }
});
