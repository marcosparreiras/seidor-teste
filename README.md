# Seidor - Teste Técnico

Sistema de API web para controle e gerenciamento de automóveis de uma empresa.

- Utiliza Express.js para criação de rotas HTTP.
- Utiliza o Zod para validação de inputs remotos.
- Utiliza o Supertest para testes de requisições HTTP.
- Utiliza o Vitest como framework de testes.
- Utiliza persistência de dados em memória.
- Utiliza o Github Action para integração continua.

### Requisitos Funcionais

- [x] Deve ser possível cadastrar um novo automóvel
- [x] Deve ser possível atualizar os dados de um automóvel cadastrado
- [x] Deve ser possível excluir um automóvel cadastrado
- [x] Deve ser possível recuperar um automóvel pelo seu id
- [x] Deve ser possível listar os automóveis cadastrados e utilizar filtos de marca e cor na listagem
- [x] Deve ser possível cadastrar um novo motorista
- [x] Deve ser possível atualizar os dados de um motorista cadastrado
- [x] Deve ser possível excluir um motorista cadastrado
- [x] Deve ser possível recuperar um motorista pelo seu id
- [x] Deve ser possível listar os motoristas cadastrados e utilizar filtro de nome na listagem
- [x] Deve ser possível registrar a utilização de um automóvel por um motorista, esse registro deve conter data de início e descrição do motivo de utilização
- [x] Deve ser possível encerrar a utilização do automóvel pelo motorista e incluir a data de encerramento no registro de utilização
- [x] Deve ser possível listar todos os registros de utilização de automóveis incluindo os dados do motorista e do automóvel utilizado

### Regras de Negócio

- [x] Um automóvel só pode ser utilizado por um motorista por véz
- [x] Um motorista só pode utilizar um autómovel por véz

### Requisitos Não Funcionais

- [x] O código fonte deve estar disponível em um repositório git público
- [x] O código deve possuir testes automatizados de unidade
- [x] O código deve estar limpo e organizado
- [x] O código deve ser desenvolvido em Node.js

## Instruções Para Execução Local

Antes de prosseguir, certifique-se de ter e o Node.js instalado na versão 20 em sua máquina.

- [Node.js](https://nodejs.org/)

1. Faça o clone do projeto

```bash
git clone https://github.com/marcosparreiras/seidor-teste.git
```

2. Navegue até a pasta do projeto

```bash
cd seidor-teste
```

3. Instale as dependências do projeto

```bash
npm install
```

4. Execute os testes na camada de domínio da aplicação

```bash
npm run test:domain
```

5. Execute os testes na camada http da aplicação

```bash
npm run test:http
```

6. Execute a aplicação em modo de desenvolvimento

```bash
npm run dev
```

7. Siga a documentação da sessão `Endpoints` para utilização da API web

## Instruções para execução em container Docker

Antes de prosseguir, certifique-se de ter o docker instalado.

- [Docker](https://docs.docker.com/engine/install/)

### OPÇÃO 01: Execute a aplicação com imagem publicada no Docker Hub

```bash
docker run --rm -d -p 3000:3000 marcosparreiras/seidor-teste-app:latest
```

### OPÇÃO 02: Execute o build da imagem localmente e execute o container

1. Faça o clone do projeto

```bash
git clone https://github.com/marcosparreiras/seidor-teste.git
```

2. Navegue até a pasta do projeto

```bash
cd seidor-teste
```

3. Suba o container docker com a aplicação

Caso você tenha o `docker-compose` em sua máquina execute:

```bash
docker compose up -d
```

Caso não tenha, execute:

```bash
docker build -t seidor-teste-app . #Para construir a imagem
docker run -p 3000:3000 -d seidor-teste-app #Para criar e executar o container
```

## Endpoints

### Vehicles

| Método | Rota                | Descrição                         |
| ------ | ------------------- | --------------------------------- |
| POST   | /vehicle            | Registra um novo automóveis       |
| GET    | /vehicle            | Lista os automóveis               |
| GET    | /vehicle/:vehicleId | Recupera um automóvel pelo seu id |
| PUT    | /vehicle/:vehicleId | Atualiza os dados de um autómovel |
| DELETE | /vehicle/:vehicleId | Deleta um automóvel               |

---

#### POST /vehicle

##### Body

```json
{
  "plate": "PGY5633",
  "brand": "BMW",
  "color": "black"
}
```

---

#### GET /vehicle

##### Query params

```bash
color=white
brand=FORD
```

---

#### PUT /vehicle/:vehicleId

##### Body

```json
{
  "color": "white"
}
```

---

### Drivers

| Método | Rota              | Descrição                         |
| ------ | ----------------- | --------------------------------- |
| POST   | /driver           | Registra um novo motorista        |
| GET    | /driver           | Lista os motoristas               |
| GET    | /driver/:driverId | Recupera um motorista pelo seu id |
| PUT    | /driver/:driverId | Atualiza os dados de um motorista |
| DELETE | /driver/:driverId | Deleta um motorista               |

---

#### POST /driver

##### Body

```json
{
  "name": "John Doe"
}
```

---

#### GET /driver

##### Query params

```bash
name=john
```

---

#### PUT /driver/:driverId

##### Body

```json
{
  "name": "John Albert Doe"
}
```

---

### Rides

| Método | Rota              | Descrição                                                            |
| ------ | ----------------- | -------------------------------------------------------------------- |
| POST   | /ride             | Cria um novo registro de utilização de um automóvel por um motorista |
| GET    | /ride             | Lista os registros de utilização dos automóveis                      |
| PATCH  | /ride/:rideId/end | Encerra a utilização de um automóvel por um motorista                |

---

#### POST /ride

##### Body

```json
{
  "reason": "Attending a bussiness meeting.",
  "driverId": "34fffacb-ebe5-42b6-9e33-6aba73efcee0",
  "vehicleId": "80b70816-b14a-4c38-931f-3feac723b70b"
}
```
