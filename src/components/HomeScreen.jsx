import { Image, StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import { useState } from 'react';

export default function HomeScreen({ navigation: { navigate } }){
  const [username, setUsername] = useState('');

  function handlePlayButtonPress() {
    navigate('ChooseQuizScreen', { username })
  };

  return(
    <View style={styles.container}>
      <Text style={styles.titulo}>BiGQuiz!</Text>
      <View style={styles.content}>
        <TextInput
         style={styles.txtNick} 
         placeholder='Username' 
         maxLength={15}
         value={username}
         onChangeText={(text) => setUsername(text)}
        />
        <Pressable style={styles.btnPlay} onPress={handlePlayButtonPress}>
          <Text style={styles.txtBtnPlay}>Play</Text>
        </Pressable>
      </View>
      <View style={styles.backgroundImage}>
        <Image
        style={styles.bgImgHome}
        source={require('../../assets/images/bgHome.png')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1BADFF',
    alignItems: 'center',
  },
  titulo: {
    fontFamily: 'Knewave-Regular',
    fontSize: 48,
    marginTop: 100,
  },
  content: {
    marginTop: 60,
    gap: 10,
    alignItems: 'center'
  },
  txtNick: {
    backgroundColor: '#ffff',
    fontSize: 20,
    width: 180,
    height: 50,
    color: 'black',
    borderRadius: 50,
    textAlign: 'center',
  },
  btnPlay: {
    backgroundColor: 'black',
    fontSize: 20,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  txtBtnPlay: {
    color: '#ffff',
    textAlign: 'center',
    fontFamily: 'Knewave-Regular',
    fontSize: 20,
  },
  bgImgHome: {
    width: 400,
    height: 420,
  }
});