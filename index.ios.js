import React, { Component } from 'react';
import {
  AppRegistry,
   StyleSheet,
   Text,
   TextInput,
   View,
   TouchableHighlight,
   AlertIOS,
   ScrollView,
} from 'react-native';

class eli5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      placeHolderText: 'enter text or url',
      queryAction: 'summarize',
      queryType: 'url',
      queryContent: '',
      queryTitle: 'test',
      querySentencesPercentage: '1',
      text: '',
     };

     this.doAction = this.doAction.bind(this);
  }

  doAction() {
    const baseUrl = `https://api.aylien.com/api/v1/${this.state.queryAction}?${this.state.queryType}=${this.state.queryContent}&title=${this.state.queryTitle}&sentences_percentage=${this.state.querySentencesPercentage}`;

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    myHeaders.append("X-AYLIEN-TextAPI-Application-ID", "7f64910e");
    myHeaders.append("X-AYLIEN-TextAPI-Application-Key", "8442d23cd8b185f078fc08d8130b6a72");

    var myInit = { method: 'GET',
               headers: myHeaders };

    fetch(baseUrl, myInit)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ text: responseJson.text });
      }).catch((err) => {
        AlertIOS.alert(
            "Error",
            "Error Data: " + err
        )
      })
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.welcome}>
            Explain like I'm five
          </Text>
          <TextInput
               style={styles.queryInput}
               placeholder={this.state.placeHolderText}
               editable = {true}
               multiline = {true}
               autoCorrect = {false}
               autoCapitalize = {'none'}
               onChangeText={(queryContent) => this.setState({queryContent})} />
          <TouchableHighlight onPress={this.doAction} style={styles.button}>
              <Text>Explain like I'm five</Text>
          </TouchableHighlight>
      </View>
      <View style={styles.explanationView}>
        <ScrollView
          ref={(scrollView) => { _scrollView = scrollView; }}
          automaticallyAdjustContentInsets={false}
          onScroll={() => { console.log('onScroll!'); }}
          scrollEventThrottle={200}
          height={500}>
          <Text>
            {this.state.text}
          </Text>
        </ScrollView>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#F8E61B',
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 20,
  },
  explanationView: {
    flex: 2,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#EAF2E3',
  },
  welcome: {
    alignSelf: 'flex-start',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  button: {
    alignSelf: 'center',
    backgroundColor: '#eeeeee',
    padding: 10,
    marginTop: 10,
    marginRight: 5,
    marginLeft: 5,
    },
  queryInput: {
    alignSelf: 'stretch',
    height: 40,
    borderColor: '#EAF2E3',
    borderWidth: 0.5,
    backgroundColor: '#EAF2E3',
    padding: 6,
    fontSize: 16,
    shadowOffset:{
            width: 1,
            height: 1,
        },
        shadowColor: 'black',
        shadowOpacity: 0.2,
  }
});

AppRegistry.registerComponent('eli5', () => eli5);
