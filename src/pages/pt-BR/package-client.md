---
title: Client
description: Utilização do pacote client
layout: ../../layouts/MainLayout.astro
lang: pt-BR
url: package-client
date: 2022-04-20T19:16:24.775Z
---

## Firebolt Client

Uma biblioteca react que faz parte da stack Firebolt e tem como objetivos:

- Integrar-se automaticamente com o serviço do Firebolt onde os dados dos passos dos formulários são processados;
- Fornecer uma série de componentes que permitem a criação desses formulários em aplicações front-end de forma modular.

### Instalação

```bash
# npm
npm install @iq-firebolt/client --save

# yarn
yarn add @iq-firebolt/client
```

### Configuração

Para começarmos a usar o Firebolt client, precisamos configurar o `Provider`, ele é responsável por gerenciar o estado atual do formulário:

```jsx
import { createFireboltProvider } from "@iq-firebolt/client";

const withFirebolt = createFireboltProvider({
  formAccess: {
    root: "https://firebolt-api-endpoint",
    formName: "sample",
  },
  withHistory: true,
  stepQueryParam: "step",
  debug: true,
});
```

**Props `Provider`**

| Propriedade    | <div style="width: 120px;">Valor Padrão</div> | Descrição                                                                                                                                                                         |
| -------------- | --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                |                                               |                                                                                                                                                                                   |
| formAccess     | `null`                                        | Acesso da api do Firebolt, formName é o form que queremos consumir.                                                                                                               |
| withHistory    | `false`                                       | Com essa propriedade, cada transição de passo resultará em um push no history do browser do usuário, isso também permite o uso das setas do browser para navegação no formulário. |
| stepQueryParam | `"step"`                                      | Durante a navegação do formulário a url da página conterá um parâmetro que indica o slug do passo atual, exemplo `?step=personal_data`.                                           |
| debug          | `false`                                       | Nos permite usar o parâmetro `debug-step` na url da página, com isso, podemos debugar um passo especifico do formulário, exemplo: `?debug-step=personal_data`.                    |

Para usarmos o `Provider`, devemos encapsular a aplicação ou o componente da página que queremos renderizar o formulário:

```jsx
const App = () => {
  return <div> my app </div>;
};

export default withFirebolt(App);
```

### Componentes

### `Wizard`

O `Wizard` é semelhante ao `Switch` do `react-router`, ele define qual componente renderizar a cada passo do formulário e também é possível definir um componente padrão para ser utilizado. Além disso, possui características importantes como:

- Rodar callbacks em situações especificas do formulário, por exemplo, na mudança de passo, caso haja um erro de conexão ou quando o formulário for finalizado;
- Definir um componente de fallback, ou seja, renderizar um componente durante a transição de passos, por exemplo um loader.

```jsx
...
import { Wizard, createFireboltProvider} from "@iq-firebolt/client";

const withFirebolt = createFireboltProvider({...})

const App = () => {
	return (
		<div>
		  <h1>My form</h1>
		  <Wizard
		    fallback={<MyLoader />}
		    onFinishForm={(payload) => {}}
		    onConnectionError={(err) => {}}
		    onBeforeChangeStep={(proceed, {leavingStep, enteringStep}) => {})
		    onChangeStep={({sentStep, currentStep}) => {}}
		  >
		  </Wizard>
		</div>
	)
}

export default withFirebolt(App)

```

**Props `Wizard`**

| <div style="width: 150px;">Propriedade</div> | Descrição                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fallback`                                   | Recebe um componente ou marcação que deve ser renderizada durante a requisição de transição de passos .                                                                                                                                                                                                                                                                                                                                         |
| `onFinishForm`                               | Callback que roda ao avançar o último passo, a função recebe um payload como argumento (ultima resposta da Firebolt api).                                                                                                                                                                                                                                                                                                                       |
| `onConnectionError`                          | Esse callback deve rodar quando ocorre algum problema de conexão entre o Firebolt client e a API.                                                                                                                                                                                                                                                                                                                                               |
| `onBeforeChangeStep`                         | Quando o client recebe os dados de um novo passo da api, a transição não ocorre instantaneamente, esse callback pode ser utilizado para rodar algo antes que a transição ocorra, ou seja: Client requisita novo passo -> api retorna novo passo -> onBeforeChangeStep -> mudança de passo no estado atual do client, isso permite por exemplo redirecionar o usuário para algum site externo antes de renderizar o próximo passo do formulário. |
| `onChangeStep`                               | Podemos usar esse callback para rodar algo após a transição de um passo para outro.                                                                                                                                                                                                                                                                                                                                                             |

> O `Wizard` renderiza/monta apenas um componente por vez, ou seja, se o formulário avançar para o próximo passo, o componente do template do passo atual será desmontado e o `fallback` ocupará o seu lugar.

### `Wizard.Step`

O `Wizard.Step` funciona de forma similar ao `Route` do React router, ele fica responsável por atribuir a renderização de um componente especifico (template de passo/ step template) para um passo especifico do formulário. Com ele podemos definir utilizar um template padrão para os passos utilizando o pattern `*`:

```jsx
...
import { Wizard, createFireboltProvider} from "@iq-firebolt/client";

// template components
import DefaultTemplate from "components/StepTemplates/Default"
import SummaryTemplate from "components/StepTemplates/Summary"

const withFirebolt = createFireboltProvider({...})

const App = () => {
	return (
		<div>
		  <h1>My form</h1>
		  <Wizard fallback={<MyLoader />} >
			{/* Default step template: */}
			<Wizard.Step  match="*"  component={DefaultTemplate}  />
			{/* Custom template */}
			<Wizard.Step match={{slug:"summary_step"}} component={SummaryTemplate} />
		  </Wizard>
		</div>
	)
}

export default withFirebolt(App)

```

**Props `Wizard.Step`**

| <div style="width: 150px;">Propriedade</div> | Descrição                                                                                                                                                                          |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `match`                                      | Utilizado como identificador. O pattern `*` pode ser utilizado para definir um template padrão. Ou podemos definir o slug do passo passando um objeto tipo: `{slug: "step_slug"}`. |
| `component`                                  | Componente que deve ser utilizado como template de passo.                                                                                                                          |

> Toda prop passada para o Wizard.Step é repassada para o componente que ele deve renderizar.

### Template de passo

Todo componente que for utilizado como template de passo recebe uma prop chamada `fireboltStep`, ela contem algumas informações sobre o passo atual e alguns métodos para a navegação no formulário. Esses valores também podem ser obtidos utilizando o hook `useFirebolt`.

```jsx
const DefaultStepTemplate = ({ fireboltStep }) => {
  function goToNextStep() {
    fireboltStep.goNextStep({ cpf: "030.136.450-83" });
  }

  return (
    <div>
      <h1 className="default-step">Step title</h1>
      <button onClick={goToNextStep}>Próximo</button>
    </div>
  );
};

export default DefaultStepTemplate;
```

**Conteúdo da prop `fireboltStep`**

| <div style="width: 150px;">Propriedade</div> | Descrição                                                                                                                                                                               |
| -------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `capturedData`                               | Objeto que contém toda informação preenchida pelo usuário nos passos anteriores.                                                                                                        |
| `clearSession`                               | Função para limpar a sessão do formulário e cancelar a progressão da experiência.                                                                                                       |
| `fields`                                     | Sessão do JSON schema que descreve os campos necessários para o passo atual do formulário.                                                                                              |
| `formFlowMetadata`                           | Dados gerais sobre o formulário (total de passos, nome e slug dos passos e etc).                                                                                                        |
| `friendlyName`                               | Nome amigável do passo atual. Utilizado para UI (Definido no JSON schema).                                                                                                              |
| `goNextStep`                                 | Função que dispara a transição para o próximo passo. Recebe como argumento um payload, ou seja um mapa chave-valor do slug do campo e o valor que deve ser enviado para a firebolt api. |
| `goPreviousStep`                             | Função que dispara a transição para o passo anterior do formulário.                                                                                                                     |
| `position`                                   | Numero da posição do passo atual em relação ao total de passos, pode ser usado para renderizar um contador na tela como "passo 2/4" (Inicia em 1).                                      |
| `remoteErrors`                               | Erros validação de campo da api.                                                                                                                                                        |
| `slug`                                       | Slug identificador do passo atual, o mesmo utilizado no `Wizard.Step`.                                                                                                                  |
| `type`                                       | Tipo do passo atual (`form` ou `custom`).                                                                                                                                               |
| `webhookResult`                              | Resultado da chamada de webhook que pode ter ocorrido entre o passo anterior e o passo atual, ele pode conter qualquer dado que tenha vindo de uma api terceira.                        |

### `FireboltForm`

A função do `FireboltForm` é transformar a parte do `JSON Schema` que descreve os campos necessários, em um formulário real.
Ele mapeia e renderiza os campos, combinando eles com as inserções de conteúdo (Se necessário). exemplo:

```jsx
import { FireboltForm } from "@iq-firebolt/client";

const DefaultStepTemplate = ({ fireboltStep }) => {
  return (
    <div>
      <h1 className="default-step">Step title</h1>
      <FireboltForm
        onSubmit={fireboltStep.goNextStep}
        schema={fireboltStep.fields}
        onGoBack={fireboltStep.goPreviousStep}
      />
    </div>
  );
};

export default DefaultStepTemplate;
```

**Prop `FireboltForm`**

| <div style="width: 150px;">Propriedade</div> | Descrição                                                                                                                                                                                                                                                |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autofill`                                   | Recebe um objeto chave-valor (slug do campo e valor) que automaticamente preenche o payload do formulário, ou seja, se o objeto `{"name": "Marty Mcfly"}` for passado para essa prop, o campo de nome deve ser automaticamente preenchido no formulário. |
| `className`                                  | Adiciona uma classe customizada ao elemento `form`.                                                                                                                                                                                                      |
| `customActionsChild`                         | Permite passar um componente para lidar com o envio ou regressão do formulário. Geralmente são passados botões customizados.                                                                                                                             |
| `onChange`                                   | Esse callback roda sempre que ocorre alguma alteração nos dados do formulário, ele passa o payload atualizado do formulário como argumento do callback.                                                                                                  |
| `onFocusField`                               | Recebe uma função de callback que retorna informações a respeito do campo em foco (slug do campo e valor).                                                                                                                                               |
| `onGoBack`                                   | Função que deve rodar ao clicar no botão de voltar do passo.                                                                                                                                                                                             |
| `onSubmit`                                   | Função que deve rodar ao clicar no botão de submeter o passo.                                                                                                                                                                                            |
| `previousBtnText`                            | Texto que deve ser renderizado no botão padrão de voltar.                                                                                                                                                                                                |
| `remoteErrors`                               | Erros de validação de campo definidos por prop, pode ser usado para forçar um erro ou passa erros que vieram da firebolt api.                                                                                                                            |
| `schema`                                     | Parte do `JSON Schema` responsável por descrever os campos necessários para o passo.                                                                                                                                                                     |
| `submitBtnText`                              | Texto que deve ser renderizado no botão padrão de submeter.                                                                                                                                                                                              |
| `theme`                                      | Tema customizado para utilizar componentes diferentes para a renderização de campos. Exemplos de temas são o `firebolt-blueberry` e o padrão `material`. Um tema pode também implementar campos customizados.                                            |

### `FireboltForm.Insert`

O `FireboltForm.Insert` nos permite inserir componentes entre campos que são gerados pelo `FireboltForm`, ele precisa apenas de uma referencia de onde deve ser inserido e o que ele deve renderizar:

```jsx
import { FireboltForm } from "@iq-firebolt/client"

const DefaultStepTemplate = ({fireboltStep}) => {

	return (
		<div>
		  <h1 className="default-step">Step title</h1>
		  <FireboltForm
		    onSubmit={fireboltStep.goNextStep}
		    schema={fireboltStep.fields}
		    onGoBack={fireboltStep.goPreviousStep}
		  >
			{/* Irá renderizar "something" depois do ultimo campo */}
 		    <FireboltForm.Insert after="last" render={<p>something</p>}>
 		    {/* Irá renderizar "something" antes do primeiro campo */}
 		    <FireboltForm.Insert before="first" render={<p>something</p>}>
 		    {/* Irá renderizar "something" antes do campo de cpf */}
 		    <FireboltForm.Insert before={{fieldSlug: "cpf_field"}} render={<p>something</p>}>
		  </FireboltForm>
		</div>
	)
}

export default DefaultStepTemplate

```

A referencia pode ser `last` , `first` ou um objeto `{fieldSlug: "field_slug"}`

| <div style="width: 150px;">Propriedade</div> | Descrição                                        |
| -------------------------------------------- | ------------------------------------------------ |
| `after`                                      | Renderiza a marcação antes da referência.        |
| `before`                                     | Renderiza a marcação depois da referência.       |
| `render`                                     | Componente ou marcação que deve ser renderizada. |

### `StepForm`

A função do `StepForm` é simplificar a escrita dos templates de passo.
Ao encapsular o `FireboltForm`, todas as suas propriedades passam a ser igualmente suportadas no `StepForm` e o resultado será o mesmo, tanto utilizando o `StepForm` quanto o `FireboltForm`.
A diferença está na forma com que ele é utilizado, pois muitas dessas propriedades não precisam ser informadas no `StepForm` , deixando o código menor.

Exemplo de template de passo com `FireboltForm`

```jsx
import { FireboltForm } from "@iq-firebolt/client";
import fireboltBlueberry from "firebolt-blueberry"; // tema
import { ActionButtons } from "components/ActionButtons";

const DefaultStepTemplate = ({ fireboltStep }) => {
  const autofill = { cpf: "123.232.523.23" };
  return (
    <div>
      <h1>my step template</h1>
      <FireboltForm
        schema={fireboltStep?.fields}
        onSubmit={fireboltStep?.goNextStep}
        remoteErrors={fireboltStep?.remoteErrors}
        theme={fireboltBlueberry}
        autoFill={autofill}
        customActionsChild={({ formData }) => (
          <ActionButtons
            formData={formData}
            onGoBack={handleGoBackform}
            beforeSubmitStep={runBeforeChangeStep}
          />
        )}
      />
    </div>
  );
};

export default DefaultStepTemplate;
```

Exemplo de template de passo com `StepForm`

```jsx
import { StepForm } from "@iq-firebolt/client";
import { ActionButtons } from "components/ActionButtons";

const DefaultStepTemplate = ({ fireboltStep }) => {
  const autofill = { cpf: "123.232.523.23" };
  return (
    <div>
      <h1>my step template</h1>
      <StepForm
        autoFill={autofill}
        customActionsChild={({ formData }) => (
          <ActionButtons
            formData={formData}
            onGoBack={handleGoBackform}
            beforeSubmitStep={runBeforeChangeStep}
          />
        )}
      />
    </div>
  );
};

export default DefaultStepTemplate;
```

### `StepForm.Insert`

Como o `StepForm` encapsula o `FireboltForm`, precisamos de um `Insert` também para o `StepForm`.
O `StepForm.Insert` funciona exatamente igual o `FireboltForm.Insert`, nos permitindo inserir componentes nos espaços entre campos que são gerados pelo `FireboltForm`, que aqui, está dentro `StepForm` .

```jsx
import { StepForm } from "@iq-firebolt/client"

const DefaultStepTemplate = ({fireboltStep}) => {

	return (
		<div>
		  <h1 className="default-step">Step title</h1>
		  <StepForm>
			{/* Irá renderizar "something" depois do ultimo campo */}
 		    <StepForm.Insert after="last" render={<p>something</p>}>
 		    {/* Irá renderizar "something" antes do primeiro campo */}
 		    <StepForm.Insert before="first" render={<p>something</p>}>
 		    {/* Irá renderizar "something" antes do campo de cpf */}
 		    <StepForm.Insert before={{fieldSlug: "cpf_field"}} render={<p>something</p>}>
		  </StepForm>
		</div>
	)
}

export default DefaultStepTemplate
```

A referencia pode ser `last` , `first` ou um objeto `{fieldSlug: "field_slug"}`

| <div style="width: 150px;">Propriedade</div> | Descrição                                        |
| -------------------------------------------- | ------------------------------------------------ |
| `after`                                      | Renderiza a marcação antes da referência.        |
| `before`                                     | Renderiza a marcação depois da referência.       |
| `render`                                     | Componente ou marcação que deve ser renderizada. |
