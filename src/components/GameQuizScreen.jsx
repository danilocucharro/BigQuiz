import { Image, View, StyleSheet, Text, Pressable, ScrollView } from "react-native";
import { useRoute } from '@react-navigation/native';
import { useState, useEffect } from "react";
import axios from "axios";
export default function GameQuizScreen(){

  const route = useRoute();
  const difficulty = route.params.difficulty;
  const theme = route.params.category;
  const [triviaQuestion, setTriviaQuestion] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentPoints, setCurrentPoints] = useState(0);
  const [allPossibleAnswers, setAllPossibleAnswers] = useState([]);
  const [loading, setLoading] = useState(false);

  async function combineAllAnswers(incorrectAnswers, correctAnswer) {
    let allAnswers = [];
    incorrectAnswers.map((item) => {
      item.incorrect_answers.map((incorrectAnswer) => {
        allAnswers.push(incorrectAnswer)
      });
    });
    allAnswers.push(correctAnswer);
    allAnswers.sort(() => Math.random() - 0.5);
    setAllPossibleAnswers(allAnswers);
  }

  async function getTriviaData() {

    setLoading(true);

    const resp = await axios.get(`https://opentdb.com/api.php?amount=1&category=
    ${theme}&difficulty=${difficulty}&type=multiple`).catch(function (error){
      getTriviaData();
    })

      setTriviaQuestion(resp.data.results);
      setCorrectAnswer(resp.data.results[0].correct_answer);
  
      await combineAllAnswers(resp.data.results, resp.data.results[0].correct_answer);
  
      setLoading(false);
  }

  useEffect(() => {
    getTriviaData();
  }, []);

  function verifyAnswer(selectedAnswer) {
    if (selectedAnswer === correctAnswer) {
      getTriviaData();
      setCurrentPoints(currentPoints + 1);
    } else {
      getTriviaData();
      setCurrentPoints(currentPoints - 1);
    }
  }

  function removeCharacters(question) {
    return question.replace(/(&quot\;)/g, "\"").replace(/(&rsquo\;)/g, "\"").replace(/(&#039\;)/g, "\'").replace(/(&amp\;)/g, "\"");
  }

  return(
  <ScrollView style={styles.container}>
    <View style={styles.userInfo}>
      <Image
        style={styles.userImg}
        source={require('../../assets/images/imgPerfil.jpg')}
      />
      <Text style={styles.txtPoints}>Points: {currentPoints}</Text>
    </View>
    <Text style={styles.title}>BigQuiz!</Text>
    {loading ? (
      <Text style={styles.txtLoading}>BigQuiz is Loading...</Text>
    ) : (
      <View style={styles.content}>
        <Text style={styles.quizTitle}>
          {triviaQuestion.map((triviaData, index) => (
            triviaData.category
          ))}
        </Text>
        {triviaQuestion.map((triviaData, index) => (
          <View style={styles.quizContent} key={index}>
            <Text style={styles.quizQuestion}>
              {removeCharacters(triviaData.question)}
            </Text>
          </View>
        ))}
          <View style={styles.quizAnswers}>
            {allPossibleAnswers.map((answer, index) => (
                <Pressable
                  key={index}
                  onPress={() => verifyAnswer(answer)}
                  style={styles.btnAnswer}
                >
                  <Text style={styles.txtAnswer}>
                    {removeCharacters(answer)}
                  </Text>
                </Pressable>
            ))}
            </View>
      </View>
    )}
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1BADFF',
  },
  userInfo: {
    flexDirection: 'row',
    gap: 12,
    marginTop: '10%',
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  userImg: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  txtPoints: {
    fontFamily: 'Knewave-Regular',
    fontSize: 26,
    color: '#fff'
  },
  title: {
    fontFamily: 'Knewave-Regular',
    fontSize: 48,
    textAlign: 'center'
  },
  quizTitle: {
    color: '#fff',
    fontFamily: 'Knewave-Regular',
    fontSize: 24,
    textAlign: 'center',
    marginTop: '5%'
  },
  content: {
    width: '100%'
  },
  txtLoading: {
    marginTop: '10%',
    color: '#fff',
    fontFamily: 'Knewave-Regular',
    fontSize: 24,
    textAlign: 'center'
  },
  quizContent: {
    width: '100%',
    height: 'auto',
    backgroundColor: '#ffff',
  },
  quizQuestion: {
    fontFamily: 'Knewave-Regular',
    fontSize: 36,
    paddingLeft: '4%',
    paddingRight: '4%',
  },
  quizAnswers: {
    marginTop: '6%',
    width: '100%',
    alignItems: 'center',
    gap: 18,
  },
  btnAnswer: {
    width: '60%',
    padding: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    color: 'black',
    borderRadius: 5,
    justifyContent: 'center'
  },
  txtAnswer: {
    fontFamily: 'Knewave-Regular',
    textAlign: 'center',
    fontSize: 24
  }
});