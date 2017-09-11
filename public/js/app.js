var app = new Vue({
  el: '#app',
  data: {
    hash: {
      password: '',
      saltRound: 4,
      hash: ''
    },
    hash2: {
      password: '',
      hash: ''
    },
    saltRounds: [
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 }
    ],
    result: false
  },
  methods: {
    getGeneratedHash: function() {
      // Make a variable to access this(Vue) inside the axios function
      var self = this;

      axios.get('/api/hash')
        .then(function(response) {
          console.log(response);
          self.hash = response.data;
          console.log(self.hash.hash);
        }).catch(function(error) {
          console.log(error);
        });
    },
    generateHash: function(hash) {
      // Make a variable to access this(Vue) inside the axios function
      var self = this;

      axios.post('/api/hash', this.hash)
        .then(function(response) {
          console.log(response);
          // Wait 1/2 sec before calling getGeneratedHash so bcrypt has enough time to encrypt password
          // If computer has low processing power, this might execute before hash is returned from the server
          setTimeout(function() {self.getGeneratedHash()}, 500);
        }).catch(function(error) {
          console.log(error);
        });
    },
    getResult: function() {
      var self = this;

      axios.get('/api/hash2')
        .then(function(response) {
          console.log(response);
          self.result = response.data;
        }).catch(function() {
          console.log(response);
        })
    },
    postComparison: function() {
      var self = this;

      axios.post('/api/hash2', this.hash2)
        .then(function(response) {
          console.log(response);
          // Wait 1/2 sec before calling getResult so bcrypt has enough time to compare password to hash
          // If computer has low processing power, this might execute before result is returned from the server
          setTimeout(function() {self.getResult()}, 500);
        }).catch(function(error) {
          console.log(error);
        });
    }
  }
})
