---
title: Contribuição
description: Documentação de como contribuir com o projeto.
layout: ../../layouts/MainLayout.astro
lang: pt-BR
url: contributing
date: 2022-03-15T18:13:52.522Z
---
### O que é uma contribuição?

Toda alteração feita no repositório pode ser considerada uma contribuição.
O commit é a principal forma de contribuir, seja criando uma nova funcionalidade, corrigindo um bug, criando um teste ou escrevendo uma documentação, mas não é a única.

O github contabiliza como contribuição as seguintes ações:

* Commits
* Pull Requests
* Issues
* Discussons

### Como contribuir no Firebolt

Para contribuir com o Firebolt, antes de qualquer alteração, primeiro discuta a sua ideia com os ADM`s, seja por meio de uma issue, e-mail ou qualquer outro método.

Observe que temos alguns padrões(leia a [documentação](https://iq-tech.github.io/firebolt-docs/en/introduction/)), siga-os em todas as suas interações com o projeto.

Existem diversas formas de contribuir com o projeto:

* Reportando bugs
* Indicando melhorias
* Sugerindo funcionalidades
* Discutindo as issues
* Fazendo pull requests

### **Reportando bugs**

Se encontrou um bug você pode reportá-lo usando a ferramenta de [issues do github](https://github.com/IQ-tech/firebolt/issues). Porém antes de enviar seu bug é importante fazer as seguintes verificações:

1. Atualize seu repositório local no branch `main`mais recente. Talvez seu bug já tenha sido corrigido na versão mais recente;
2. Verifique se o bug já foi reportado por outra pessoa fazendo uma busca pelas issues.

Se o bug realmente não foi resolvido ou acolhido então está na hora de [criar uma nova issue](https://github.com/ccuffs/template/issues/new). No título da issue tente resumir da melhor forma o problema evitando títulos genéricos como ***"Problemas na instalação"***.

Se possível inclua imagens ou vídeos à descrição do bug para facilitar o processo de reprodução. 

### **Indicando melhorias**

Outra ótima forma de contribuir é indicando melhorias ao código do projeto e em como ele está estruturado. Se você tem qualquer ideia de como podemos melhorar alguma abordagem na solução de problemas, refatoração de código, melhoria em algum recurso ou qualquer outra coisa relacionada, siga estes passos:

1. Certifique-se de que sua ideia já não esteja sendo abordada em nosso [roadmap](https://github.com/ccuffs/site-static-template/blob/master/ROADMAP.md);
2. Também verifique se a ideia já não está pressente em nossas [issues do github](https://github.com/ccuffs/template/issues);
3. Defenda a sua ideia e explique de forma convincente porque ela deve ser acolhida. Eis algumas questões a considerar:

   1. Você realmente esta propondo uma ideia só ou um conjunto de ideias?
   2. Qual é o problema que sua ideia resolve?
   3. Por que sua sugestão é melhor do que o que já existe no código?
   4. Realmente vale a pena demandar tempo para implementar sua ideia dentro de nossas prioridades?

Tendo passado pelo crivo de todos estes questionamentos basta [criar uma nova issue](https://github.com/IQ-tech/firebolt/issues/new).

### Sugerindo **funcionalidades**

Tendo em vista o que estamos construindo junto com a comunidade, novas funcionalidades tem prioridade relativa. Vale a pena enviar sua sugestão de funcionalidade apenas se:

1. O recurso em questão resolve um problema que não é resolvido por nada que já exista no projeto;
2. O recurso resolve um problema real validado por pessoas que estão em contato direto com a utilização do projeto.

Para criar seu pedido de funcionalidade basta [criar uma nova issue](https://github.com/IQ-tech/firebolt/issues/new).

### **Discutindo as issues**

Antes de partirmos para o código em si é muito importante discutirmos com a comunidade como cada issue será abordada. Toda e qualquer questão deve ser colocada em discussão para que qualquer pessoa que deseje solucionar aquele problema tenha o máximo de informações para executar uma solução.

Idealmente todas as issues devem ter um plano de ação claro antes que qualquer código seja escrito. Sabemos que muitas vezes isto não é possível, sendo necessário explorar e analisar melhor o que foi indicado. Nestes casos, publique todas as suas descobertas nas discussões indicando caminhos e recebendo o feedback da comunidade a respeito do que está sendo proposto.

### **Outras formas de contribuir**

Se você não trabalha com código mas quer ajudar o projeto, existe muitas outras formas de contribuir:

* Ajude com a documentação do projeto;
* Organize eventos e dê palestras sobre o projeto;
* Viu alguma discussão que te interessa e onde você pode acrescentar mesmo sem conhecimento técnico? Não se acanhe e participe também nas issues do github.

Pensou em alguma outra forma de contribuir? Compartilha com a gente!

### Como criar **pull requests**

Depois de ter um plano de ação relativamente claro você deve estar pronto para contribuir com código. Para isso faça um fork do projeto e trabalhe em cima de um branch diferente de `main` implementando suas soluções. 

Antes de abrir seu PR (pull request) certique-se que:

* O código realmente resolve um problema real (de preferência baseado em alguma issue levantada);
* Seu PR resolve uma issue apenas. Se você quiser fazer mais de uma coisa, divida em vários PRs;
* Seu código é funcional (ou algo próximo disso). Providencie testes se possível;
* As mensagens de seus commits são claras e descrevem bem o trabalho.

#### 1- Faça um fork **do Firebolt**

Acesse <https://github.com/IQ-tech/firebolt> e faça um **fork** do Firebolt.

Isso criará uma cópia do Firebolt em sua conta do gIthub.

#### 2- **Clonar o Firebolt**

Agora clone o Firebolt que foi feito o fork para sua máquina. 

Abra um terminal onde deseja clonar o Firebolt e execute o seguinte comando git:

```
git clone "URL que você acabou de copiar"
```

onde tem **"URL que você acabou de copiar"** **(sem as aspas)** é o URL para o repositório (seu fork do Firebolt).

Por exemplo:

```
git clone https://github.com/seu-user/firebolt.git
```

onde tem`seu-user` coloque seu nome de usuário do github. Aqui você está copiando o conteúdo do Firebolt do github para o seu computador.

#### 3- **Crie um branch**

Mude para o diretório do repositório em seu computador (se você ainda não estiver lá):

```
cd firebolt
```

Agora crie um branch usando o comando `git checkout`(o padrão utilizado para nome do branch e dos commits é <https://www.conventionalcommits.org/en/v1.0.0/>):

Exemplo de uma nova funcionalidade:

`git checkout -b feat/nova-funcionalidade`

Exemplo de uma correção de bug:

`git checkout -b fix/bug-titulo-home`

#### 4- Como fazer commits

Faça as alterações necessárias.

Adicione essas alterações à branch que você acabou de criar usando o comando `git add`:

Agora confirme essas alterações usando o `git commit` (Siga o <https://www.conventionalcommits.org/en/v1.0.0/> e <https://gitmoji.dev/> para fazer seu commit):

`git commit -m "conventionalcommit(escopo): :GITMOJI: mensagem”`

| | |
| --- | ------- |
| conventionalcommit | \- seguir: https://www.conventionalcommits.org/en/v1.0.0/ |
| (escopo)           | \- local alterado do projeto, hoje existe os seguintes escopos:  all client client-core validators lab entities blueberry-theme json-schema |
| :GITMOJI:          | \- utilizar: https://gitmoji.dev/  O :GITMOJI: é opcional |
| mensagem           | \- mensagem que descreve a alteração (deve estar em inglês). |

\
**Exemplo:**

```
git commit -m "feat(client) :speech_balloon: updating main title"
```

#### 5- **Envie as alterações para o github**

Envie suas alterações usando o comando `git push`:

**Exemplo:**

```bash
git push  origin feat/nova-funcionalidade
```

substituindo `<feat/nova-funcionalidade>` pelo nome do branch que você criou anteriormente.

#### 6- **Envie suas alterações para revisão**

Se você acessar seu repositório no github, verá um `Compare & pull request`botão. Clique nesse botão. Ou clique em `Pull requests` depois em `New pull request`

Selecione sua branch e abra uma solicitação de `Pull request` para o branch  `main`  do          `IQ-tech/firebolt`

**Preencha o template do pull request**

```markdown
<! --- Provide a general summary of your changes in the title above -->

#### Description

<! --- Describe your changes in detail -->

---

#### Motivation and Context

<! --- Why is this change required? What problem does it solve? -->

---

#### Screenshots and links

---
```

|  |  | 
| ---------- | ----------- |
| <! --- Provide a general summary of your changes in the title above -> | No título preencha com um resumo geral de suas alterações.| 
| <! --- Describe your changes in detail -> | substitua por uma descrição do que foi alterado no projeto.|
| <! --- Why is this change required? What problem does it solve? -> | substitua por uma descrição da necessidade da mudança e qual problema resolve. |
| Screenshots and links | Preencha se acha necessário imagens, gifs ou vídeos. |

**Exemplo:** 

```markdown
docs: updating README for example

---

#### Description

entering an example text in the README

---

#### Motivation and Context

an example improvement

---

**Screenshots and links**
<.img src="exemplo” />

---
```

Por fim clique em `Create pull request` .

#### 7- Pull request aprovado

Quando o pull request for aprovado, a branch da feature pode ser mergeado na branch `main` , nesse momento um novo prerelease do firebolt contendo a alteração adicionada será lançada.

A feature será também adicionada ao proximo release oficial da biblioteca (quando um adm do repositório mergear a branch `main` à branch `latest`.