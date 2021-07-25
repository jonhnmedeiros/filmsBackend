<p align="center">
  <a href="#-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-acessos">Acessos</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=49AA26&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=49AA26&labelColor=000000">
</p>

<br>


## 🚀 Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:

- JavaScript
- NodeJS
- Express
- SQLite

## 💻 Projeto

API desenvolvida a cargo de avaliação de conhecimentos para conexão com banco de dados compostos de filmes e espectadores.
É possível registrar os filmes e as pessoas que assistiram.

## 🔖 Acessos

Através do código fonte é possível iniciar o nodejs através de 

```
yarn
yarn start 
```

O mesmo irá criar o banco de dados na pasta DB caso ainda não esteja.

A API é acessada através da porta 3000

### GETS and POSTS - JSON

```
Consultar Filmes
GET http://localhost:3000/movies
```
```
Pesquisa por Filme
GET http://localhost:3000/movies/id
```
```
Incluir um Filme
POST http://localhost:3000/movies/

{
	"title": "Título do Filme",S
	"year": Ano do filme
}
```
```
Consultar Espectadores
GET http://localhost:3000/spectators
```
```
Pesquisa por Espectador
GET http://localhost:3000/spectators/id
```
```
Incluir um Espectador
POST http://localhost:3000/spectators

{
	"name": "Primeiro nome",
	"last_name": "Segundo nome"
}
```
```
Sinalizar que um espectador assistiu um filme
POST http://localhost:3000/view/

{
	"id_spectators": id do espectador,
	"id_movies": id do filme
}
```
```
Consultar todos os filmes e espectadores
GET http://localhost:3000/views
```
```
Pesquisa por filmes e espectadores que viram.
GET http://localhost:3000/views_spectator/id 
```
```
Pesquisa por espectadores e filmes que foram vistos por ele
GET http://localhost:3000/views_movies/id
```

