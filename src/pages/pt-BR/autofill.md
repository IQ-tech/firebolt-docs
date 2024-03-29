---
title: Autofill
description: Preenche automaticamente campos informados
layout: ../../layouts/MainLayout.astro
lang: pt-BR
url: autofill
date: 2022-03-11T15:05:13.787Z
---

### O que é?

Esta funcionalidade permite que alguns dados de um lead sejam automaticamente preenchidos no formulário, vejamos um caso de uso:

1. Enviamos um email para algum lead oferecendo um produto específico.
2. Esse link redireciona o usuário para um formulário que utiliza o firebolt.
3. A url do link possuí um código base64 que contém algumas informações que já possuímos desse usuário.
4. O firebolt detecta o código na url e automaticamente preenche alguns campos do formulário para o usuário.

### Como funciona?

O autofill, por estar disponível na url, é aplicado em todos os passos do formulário.

Durante o processo de criação da tela, ao realizar a leitura do JSON de configuração do formulário também verificamos se o parâmetro de autofill está presente na url, se sim, descriptografamos a informação, fazemos uma comparação das chaves informadas e, caso exista o valor no objeto de autofill, definimos um valor pré estabelecido para o campo em questão.

Por esse motivo a chave informada no objeto de autofill **DEVE** ser a mesma que a fornecida no JSON de configuração do formulário.

### Como usar

Para utilizar basta seguir algumas regras simples:

- As propriedades do objeto devem refletir o nome dos campos do formulário
- Cada key recebe duas propriedades: value e mask
- A string final deve passar por um codificador, dessa forma garantimos que os caracteres especiais sejam escapados.
  [Documentação MDN](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
- O valor deve ser criptografado no formato base64

### Exemplo

A implementação para obter um base64 pode ser feita de diversas formas, essa é apenas uma delas.

```jsx
const createAutofillData = (userInfo) => {
  const autofillObject = {
    cpf: {
      value: userInfo?.cpf,
      mask: "cpf",
    },
    full_name: {
      value: userInfo?.name,
      mask: "",
    },
  };

  const encodedAutofill = encodeURIComponent(JSON.stringify(autofillObject));
  const encryptedAutofill = window.btoa(encodedAutofill);
  return encryptedAutofill;
};
```

O retorno de `createAutofillData()` será:

```plaintext
JTdCJTIyY3BmJTIyJTNBJTdCJTIydmFsdWUlMjIlM0ExMjM0NTY3ODkwJTJDJTIybWFzayUyMiUzQSUyMmNwZiUyMiU3RCUyQyUyMmZ1bGxfbmFtZSUyMiUzQSU3QiUyMnZhbHVlJTIyJTNBJTIySm9obiUyMERvZSUyMiUyQyUyMm1hc2slMjIlM0ElMjIlMjIlN0QlN0Q=
```

Agora é só passar na url como parâmetro:

```plaintext
https://www.seusite.com/?autofill:JTdCJTIyY3BmJTIyJT...
```
