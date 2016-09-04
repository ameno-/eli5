var AYLIENTextAPI = require('aylien_textapi');

const textapi = new AYLIENTextAPI({
  application_id: "7f64910e",
  application_key: "8442d23cd8b185f078fc08d8130b6a72"
});

class Aylein {
  constructor(appId, appKey) { }
    GetSentiment(query){
      textapi.sentiment({
        'text': 'John is a very good football player!'
      }, function(error, response) {

          if (error === null) {
            return response;
          }
          else {
            return error;
        }

      })
    };

  }

export default Aylien;
