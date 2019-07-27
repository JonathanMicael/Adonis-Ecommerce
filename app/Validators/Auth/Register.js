'use strict'

class AuthRegister {
  get rules() {
    return {
      // validation rules
      name: 'required',
      lastName: 'required',
      username: 'required|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required|confirmed',
      country: 'required',
      address: 'required',
      birthday: 'required',
      cpf: 'required|unique:users,cpf'
    }
  }
  get messages() {
    return {
      'name.required': 'O Nome é Obrigátorio!',
      'lastName.required': 'O Sobrenome é Obrigátorio!',
      'username.required': 'O Username é Obrigátorio!',
      'username.unique': 'O Username tem que ser unico!',
      'email.required': 'O email é Obrigátorio!',
      'email.email': 'O Email é invalido!',
      'email.unique': 'O Email tem que ser unico!',
      'password.required': 'A Senha é Obrigátoria!',
      'password.confirmed': 'As Senhas não são iguais!',
      'country.required': 'A Cidade é Obrigátorio!',
      'address.required': 'O Endereço é Obrigátorio!',
      'birthday.required': 'A Data de Nascimento é Obrigátorio!',
      'cpf.required': 'O Cpf é Obrigátorio!',
      'cpf.unique': 'O Cpf é invalido!'
    }
  }
}

module.exports = AuthRegister
