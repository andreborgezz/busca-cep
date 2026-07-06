# 📍 API de Consulta e Integração de CEP

Este projeto consiste no desenvolvimento de uma **API REST** utilizando o ecossistema **Node.js** e o framework **Express**. O objetivo principal é atuar como um microsserviço intermediário de busca e padronização de endereços, consumindo os dados oficiais do serviço [ViaCEP](https://viacep.com.br/).

A aplicação foi idealizada para resolver um problema comum em sistemas web: receber um dado bruto do cliente, tratá-lo, buscar a informação em um serviço externo confiável e devolver uma resposta limpa e estruturada.

---

## 🎯 Escopo do Projeto

O sistema funciona como uma ponte de comunicação assíncrona entre o cliente e a base de dados pública do ViaCEP. O fluxo de funcionamento do projeto segue a seguinte lógica:

1. **Entrada de Dados:** A API expõe um ponto de acesso (endpoint) que aguarda o recebimento de um CEP de 8 dígitos enviado dinamicamente na URL.
2. **Validação de Negócio:** Antes de realizar qualquer comunicação externa, o código intercepta a requisição para validar se o formato do CEP é estritamente numérico e possui a extensão correta, evitando requisições desnecessárias.
3. **Consumo de API de Terceiros:** Utilizando programação assíncrona (`async/await`), o servidor Node.js dispara uma requisição interna para a URL estável do serviço externo.
4. **Tratamento de Exceções:** O projeto prevê cenários de erro, como CEPs inexistentes na base de dados ou instabilidade de rede/indisponibilidade do serviço externo.
5. **Sanitização da Resposta:** Os dados retornados pelo serviço externo são filtrados e padronizados pelo nosso servidor antes de serem entregues ao usuário final em formato JSON.

---

## 🛠️ Tecnologias e Conceitos Aplicados

* **Ambiente de Execução:** Node.js
* **Roteamento HTTP:** Express Framework
* **Comunicação Assíncrona:** Fetch API (padrão nativo) ou Axios
* **Tratamento de Erros:** Blocos de controle `try / catch`
* **Formato de Dados:** JSON (JavaScript Object Notation)