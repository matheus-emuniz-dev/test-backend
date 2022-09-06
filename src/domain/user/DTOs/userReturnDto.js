export default class UserReturnDto {
  nome;

  email;

  telefones;

  dataCriacao;

  dataAtualizacao;

  ultimoLogin;

  token;

  constructor({
    nome, email, telefones, dataCriacao, dataAtualizacao, ultimoLogin, token,
  }) {
    this.nome = nome;
    this.email = email;
    this.telefones = telefones;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.ultimoLogin = ultimoLogin;
    this.token = token;
  }

  toJson() {
    return {
      nome: this.nome,
      email: this.email,
      telefones: this.telefones,
      dataCriacao: this.dataCriacao,
      dataAtualizacao: this.dataAtualizacao,
      ultimoLogin: this.ultimoLogin,
    };
  }
}
