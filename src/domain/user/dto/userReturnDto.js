export default class UserReturnDto {
  id;

  nome;

  email;

  telefones;

  dataCriacao;

  dataAtualizacao;

  ultimoLogin;

  token;

  constructor({
    _id, nome, email, telefones, dataCriacao, dataAtualizacao, ultimoLogin, token,
  }) {
    this.id = _id;
    this.nome = nome;
    this.email = email;
    this.telefones = telefones;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.ultimoLogin = ultimoLogin;
    this.token = token;
  }

  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      telefones: this.telefones,
      dataCriacao: this.dataCriacao,
      dataAtualizacao: this.dataAtualizacao,
      ultimoLogin: this.ultimoLogin,
      token: this.token,
    };
  }
}
