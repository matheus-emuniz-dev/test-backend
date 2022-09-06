export default class UserCreateDto {
  nome;

  email;

  telefones;

  senha;

  constructor({
    nome, email, telefones, senha,
  }) {
    this.nome = nome;
    this.email = email;
    this.telefones = telefones;
    this.senha = senha;
  }

  toJSON() {
    return {
      nome: this.nome,
      email: this.email,
      telefones: this.telefones,
      senha: this.senha,
    };
  }
}
