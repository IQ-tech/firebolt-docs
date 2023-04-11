---
title: Instalação
description: Lorem ipsum dolor sit amet - 2
layout: ../../layouts/MainLayout.astro
url: installation
date: 2022-02-16T13:20:25.269Z
---
## **Firebolt Client**

Primeiramente vamos instalar o pacote do *firebolt* *client* no projeto:

```shell
yarn add @iq-firebolt/client
# ou
npm install @iq-firebolt/client --save
```

Para começar a usar o *firebolt*, primeiro precisamos configurar o *provider*, nele podemos passar algumas configurações para conectar o *client* com o formulário configurado previamente.

### Provider

Para configurar o provider do *firebolt* vamos usar a função *`createFireboltProvider`* do pacote `@iq-firebolt/client`

```javascript
// config.js
import { createFireboltProvider } from "@iq-firebolt/client"

export const withFirebolt = createFireboltProvider({
  formAccess: {
    root: "https://firebolt-api-endpoint",
    formName: "sample",
  },
  withHistory: true,
});
```

Essa função recebe como parâmetro um objeto que podemos passar algumas informações para configurar o *firebolt client* no projeto e nos retorna um *high-order component (HOC)* que devemos encapsular a aplicação/componente que iremos renderizar o formulário

```asp
| Atributos            | Valor  | Descrição                                      |
|                      | Padrão |                                                |
|----------------------|---------------------------------------------------------|
| formAccess           | null   | Obejto que recebe a configuração de acesso ao  |
|                      |        | firebolt-api                                   |
|----------------------|---------------------------------------------------------|
| formAccess.root      | null   | Url de acesso ao firebolt-api                  |
|----------------------|---------------------------------------------------------|
| formAccess.formName  | null   | Nome do formulário configurado no firebolt-api |
|----------------------|---------------------------------------------------------|
| withHistory          | false  | Transições de passos gera um push no history   |
|                      |        | do browser, podendo ser utilizado a navegação  |
|                      |        | padrão do browser para navegar entre passos    |
|----------------------|---------------------------------------------------------|
| stepQueryParam       | step   | Nome do query param que indica o passo atual   |
|                      |        | ex. ?step=primeiro_passo                       |
|----------------------|---------------------------------------------------------|
| debug                | false  | Permite degubar um passo do formulário         |
|                      |        | passando o query param debug-step com o nome   |
|                      |        | do passo a ser debugado ex. ?debug-step=step   |
```

```javascript
// app.js
import { withFirebolt } = './config.js'

const App = () => {
  return <div>Hello Firebolt</div>
}

export default withFirebolt(App)
```

### Wizard

Semelhante ao `Switch` do `react-router`, sua função é renderizar um passo de cada vez. Com ele é possível definir um componente para cada passo do formulário ou um componente padrão para ser utilizado na maioria dos passos. Além disso também é responsável por executar alguns *callbacks* em algumas situações especificas do formulário e pela renderização de um *fallback* durante a transição entre passos do formulário.

```javascript
// app.js
import { Wizard } from "@iq-firebolt/client";
import { withFirebolt } = './config.js'

import MyLoader from 'components/MyLoader.js'

const App = () => {
  return (
    <div>
      <h1>Firebolt Form</h1>
      <Wizard
        fallback={<MyLoader />}
        onFinishForm={(payload) => {}}
        onConnectionError={(err) => {}}
        onBeforeChangeStep={(proceed, { leavingStep, enteringStep }) => proceed())
        onChangeStep={({ sentStep, currentStep }) => {}}
      >
      </Wizard>
    </div>
  )
}

export default withFirebolt(App)
```

* `fallback:` Recebe um componente que é renderizado durante a transição de passos;
* `onFinishForm:` *Callback* executado ao finalizar o ultimo passo do formulário, recebe um *payload* como argumento;
* `onConnectionError:` *Callback* executado quando ocorre algum problema de conexão entre o *firebolt-client* e o *firebolt-api*;
* `onBeforeChangeStep:` *Callback* executado ao receber os dados de um novo passo. Esse *callback* interrompe o redirecionamento para o próximo passo do formulário, recebendo informações do ultimo passo executado *(leavingStep)* e do próximo passo a ser renderizado *(enteringStep)* e uma função que libera a renderização do próximo passo do formulário *(proceed)*;
* `onChangeStep:` *Callback* executado após a transição entre passos do formulário.

### Step

Semelhante ao `Route` do `react-router`, sua função é a renderização de um componente para um passo do formulário. É possível com ele definir um componente *default* para todos os passos e também componentes específicos para cada passo do formulário.

```javascript
// app.js
import { Wizard } from "@iq-firebolt/client";
import { withFirebolt } = './config.js'

import MyLoader from 'components/MyLoader.js'
import DefaultTemplate from "components/DefaultTemplate.js"
import SummaryTemplate from "components/SummaryTemplate.js"

const App = () => {
  const { Step } = Wizard
  
  return (
    <div>
      <h1>Firebolt Form</h1>
      <Wizard
        fallback={<MyLoader />}
        onFinishForm={(payload) => {}}
        onConnectionError={(err) => {}}
        onBeforeChangeStep={(proceed, { leavingStep, enteringStep }) => proceed())
        onChangeStep={({ sentStep, currentStep }) => {}}
      >
        <Step match="*" component={DefaultTemplate}  />
        <Step match={{ slug: "summary_step" }} component={SummaryTemplate} />
      </Wizard>
    </div>
  )
}

export default withFirebolt(App)
```

* `match:` Identificador do passo para ser renderizado o componente. Recebe como parâmetro um `*` , como um *wildcard* para todos os passos, ou um objeto com um atributo `slug` que recebe o nome específico do passo.
* `component:` Componente que deve ser renderizado no passo do formulário.

Todo componente recebe utilizado para renderizar um passo do formulário recebe uma propriedade *`fireboltStep`* que contem algumas informações do passo em questão.

```javascript
// components/DefaultTemplate.js
const DefaultTemplate = ({ fireboltStep }) => {
  function goToNextStep(){
    fireboltStep.goNextStep({ cpf: "030.136.450-83" })
  }

  return (
    <div>
      <h1 className="default-step">Step title</h1>
      <button onClick={goToNextStep}>Próximo</button>
    </div>
  )
}


export default DefaultTemplate
```

Propriedades do `fireboltStep`

* `slug:` Identificador do passo atual;
* `friendlyName:` Nome amigável para o passo atual definido no *JSON* do formulário;
* `fields:` Descreve os campos do passo atual do formulário;
* `type:` Tipo do passo atual, pode ser *form* ou *custom;*
* `capturedData:` Dados capturados dos passos já executados do formulário;
* `position:` Numero da posição do passo atual em relação ao total de passos;
* `remoteErrors:` Recebe os erros de validação dos campos do formulário ao executar a função de transição de passo;
* `formFlowMetadata:` Dados gerais sobre o formulário como total de passos, nome e slug dos passos e etc;
* `goNextStep:` Função de transição de passo do formulário, recebe como argumento um objeto chave-valor com o *slug* do campo e o valor a ser enviado para o *firebolt-api*;
* `goPreviousStep:` Função de transição para o passo anterior do formulário;
* `clearSession:` Função que reseta o formulário.

### FireboltForm

Sua função é mapear e renderizar o formulário combinando ele com as possíveis inserções de conteúdo entre campos do formulário.

```javascript
// components/DefaultTemplate.js
import { FireboltForm } from "@iq-firebolt/client";

const DefaultTemplate = ({ fireboltStep }) => {
  function goToNextStep(){
    fireboltStep.goNextStep({ cpf: "030.136.450-83" })
  }

  return (
    <div>
      <h1 className="default-step">Step title</h1>
      <FireboltForm
        onSubmit={fireboltStep.goNextStep}
        schema={fireboltStep.fields}
        onGoBack={fireboltStep.goPreviousStep}
      />
      <button onClick={goToNextStep}>Próximo</button>
    </div>
  )
}


export default DefaultTemplate
```

Propriedades do `FireboltForm`

* `schema:` Recebe o JSON Schema que descreve os campos necessários para o passo do formulário;
* `className:` Nome da classe customizada a ser adicionada ao elemento *form*;
* `theme:` Tema customizado para utilizar componentes diferentes para a renderização de campos do formulário;
* `autoFill:` Recebe um objeto chave-valor com o *slug* do campo e o valor que deve ser preenchido automaticamente no campo do formulário;
* `remoteErrors:` Recebe os erros de validação dos campos do formulário, pode ser usado para forçar um erro ou repassar os erros que vieram da *firebolt-api*;
* `previousBtnText:` Texto rederizado no botão padrão de voltar passo do formulário;
* `submitBtnText:` Texto rederizado no botão padrão de avançar/submeter passo do formulário;
* `customActionsChild:` Permite passar um componente para lidar com o envio ou regressão do formulário;
* `onChange:` *Callback* executado sempre que ocorre alguma alteração nos dados do formulário, recebe como argumento o payload atualizado dos campos do formulário;
* `onFocusField:` Callback executado sempre que um campo é focado, recebe como argumento informações sobre o campo focado;
* `onGoBack:` Função executada ao clicar no botão de voltar passo do formulário;
* `onSubmit:` Função executada ao clicar no botão de submeter o passo do formulário.

#### Insert

Permite inserir componentes entre campos que são gerados pelo `FireboltForm`. Podemos inserir antes ou depois dos campos.

```javascript
// components/DefaultTemplate.js
import { FireboltForm } from "@iq-firebolt/client";

const DefaultTemplate = ({ fireboltStep }) => {
  function goToNextStep(){
    fireboltStep.goNextStep({ cpf: "030.136.450-83" })
  }

  return (
    <div>
      <h1 className="default-step">Step title</h1>
      <FireboltForm
        onSubmit={fireboltStep.goNextStep}
        schema={fireboltStep.fields}
        onGoBack={fireboltStep.goPreviousStep}
      >
        <FireboltForm.Insert before="first" render={<p>something</p>} />
        <FireboltForm.Insert after="last" render={<p>something</p>} />
        <FireboltForm.Insert before={{ fieldSlug: "field_name" }} render={<p>something</p>} />
      </FireboltForm>
      <button onClick={goToNextStep}>Próximo</button>
    </div>
  )
}


export default DefaultTemplate
```

podemos inserir com referencia ao primeiro, ultimo ou pelo nome do campo no formulário.

* `after:` Renderiza a marcação antes da referência;
* `before:` Renderiza a marcação depois da referência;
* `render:` Componente ou marcação que deve ser renderizada.