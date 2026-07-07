const express = require('express');
const axios = require('axios');

const app = express();

app.listen(3000, () => {
  console.log("Api rodando na porta 3000");
});

function caracteresEspeciais(cep) { //vai validar se o cep possui caratere especial e vai remover se tiver
  return cep.replace(/[^0-9]/g, ''); // remove caracteres especiais do cep
}

function validarEscritaCep(cep) { //valida se o cep digitado é válido (quantidade de caracteres e se é um número)
  if (!cep || cep.length !== 8 || isNaN(cep)) {
    console.log("Cep digitado incorretamente");//printa o erro no console
    return false;
 }else{
  return true;
 }
}
  
app.get('/cep/:cep', async (req, res) => { // rota que recebe o cep pela URL (parâmetro:cep)
  const cep = caracteresEspeciais(req.params.cep); // limpa o cep recebido, removendo caracteres especiais
  const writeIsValid = validarEscritaCep(cep); // valida se o cep tem 8 dígitos numéricos

  if (!writeIsValid) { // se a validação retornou false
    return res.status(400).json({ erro: 'CEP inválido' }); // responde com erro 400 e para a execução aqui
  }

  try {
    const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`); // consulta o ViaCEP

    res.json({ // devolve pro cliente só os campos que interessam, filtrados da resposta do ViaCEP
      cep: cep,
      logradouro: resposta.data.logradouro,
      complemento: resposta.data.complemento,
      bairro: resposta.data.bairro,
      localidade: resposta.data.localidade,
      uf: resposta.data.uf,
      estado: resposta.data.estado,
      regiao: resposta.data.regiao,
      ddd: resposta.data.ddd,
    });
  } catch (erro) { // se o ViaCEP falhar ou a requisição der problema...
    res.status(500).json({ erro: 'Erro ao consultar o CEP' }); // responde com erro 500 (erro do servidor)
  }
});
