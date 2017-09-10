var app = new Vue({
  el: '#app',
  data: {
    hash: {
      password: '',
      saltRound: 4
    },
    saltRounds: [
      { value: 4 },
      { value: 5 },
      { value: 6 },
      { value: 7 },
      { value: 8 },
      { value: 9 },
      { value: 10 }
    ]
  },
  methods: {

    generateHash: function() {
      axios.post('/api/hash', this.hash);
      console.log(this.hash);
    }
  }
})
