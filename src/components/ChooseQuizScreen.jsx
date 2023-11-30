import { useState, useRef } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/native';

export default function ChooseQuizScreen({ navigation: { navigate } }){

  const route = useRoute();
  const username = route.params.username;
  const [category, setCategory] = useState("9");
  const [difficulty, setDifficulty] = useState("easy");

  const pickerRef = useRef();

  function handleStartButtonPress(){
    navigate('GameQuizScreen', { username, category, difficulty })
  }

  function handleBackButtonPress(){
    navigate('HomeScreen')
  }

  return(
    <View style={styles.container}>
      <Pressable
        style={styles.btnBack}
        onPress={handleBackButtonPress}
      >
        <Text style={styles.btnBackText}>back</Text>
      </Pressable>
      <Text style={styles.title}>{username}, To get Started choose your BigQuiz!</Text>
    <View style={styles.content}>
      <Text style={styles.lblSelectText}>THEME</Text>
      <Picker
        ref={pickerRef}
        style={styles.btnSelect}
        selectedValue={category}
        onValueChange={(itemValue) =>
          setCategory(itemValue)
        }>
        <Picker.Item label="General Knowledge" value="9" />
        <Picker.Item label="Entertainment: Books" value="10" />
        <Picker.Item label="Entertainment: Film" value="11" />
        <Picker.Item label="Entertainment: Music" value="12" />
        <Picker.Item label="Entertainment: Musicals & Theatres" value="13" />
        <Picker.Item label="Entertainment: Television" value="14" />
        <Picker.Item label="Entertainment: Video Games" value="15" />
        <Picker.Item label="Entertainment: Board Games" value="16" />
        <Picker.Item label="Science & Nature" value="17" />
        <Picker.Item label="Science: Computers" value="18" />
        <Picker.Item label="Science: Mathematics" value="19" />
        <Picker.Item label="Mythology" value="20" />
        <Picker.Item label="Sports" value="21" />
        <Picker.Item label="Geography" value="22" />
        <Picker.Item label="History" value="23" />
        <Picker.Item label="Politics" value="24" />
        <Picker.Item label="Art" value="25" />
        <Picker.Item label="Celebrities" value="26" />
        <Picker.Item label="Animals" value="27" />
      </Picker>

      <Text style={styles.lblSelectText}>DIFFICULTY</Text>
      <Picker
        ref={pickerRef}
        style={styles.btnSelect}
        selectedValue={difficulty}
        onValueChange={(itemValue) =>
          setDifficulty(itemValue)
        }>
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
    <View>
      <Pressable
        style={styles.btnStart}
        title="START!"
        onPress={handleStartButtonPress}
      >
        <Text style={styles.btnStartText}>START!</Text>
      </Pressable>
    </View>
    </View>
    <View style={styles.backgroundImage}>
      <Image
      style={styles.bgChooseQuiz}
      source={require('../../assets/images/bgChooseQuiz.png')}
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
    justifyContent: 'center',
    paddingTop: 40
  },
  title: {
    fontFamily: 'Knewave-Regular',
    fontSize: 32,
    paddingLeft: '5%',
    paddingRight: '5%',
    marginTop: '10%'
  },
  lblSelectText: {
    fontFamily: 'Knewave-Regular',
    color: '#fff',
    marginTop: 10,
  },
  btnSelect:  {
    backgroundColor: '#ffff',
    fontFamily: 'Knewave-Regular',
    borderRadius: 10,
  },
  btnStart: {
    fontFamily: 'Knewave-Regular',
    width: 200,
    height: 50,
    marginTop: 10,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  btnBack: {
    padding: 8,
    backgroundColor: "#000",
    borderRadius: 50,
    left: 10,
    top: 40,
    position: 'absolute'
  },
  btnBackText: {
    color: '#fff',
    fontFamily: 'Knewave-Regular',
    fontSize: 16
  },
  btnStartText: {
    color: '#fff',
    fontFamily: 'Knewave-Regular',
    fontSize: 24
  },
  bgChooseQuiz: {
    width: 400,
    height: 400,
    marginTop: 10,
  }
});