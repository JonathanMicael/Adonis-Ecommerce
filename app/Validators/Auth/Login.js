'use strict'

class Login {
  get rules() {
    return {
      // validation rules
      email: 'required|email',
      password: 'required'
    }
  }
  //get messages() {} para poder traduzir as validacoes
}

module.exports = Login
