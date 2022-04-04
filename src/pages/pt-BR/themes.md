---
title: Temas
description: Adicionando temas aos formulários do Firebolt
layout: ../../layouts/MainLayout.astro
lang: pt-BR
url: themes
date: 2022-04-04T13:47:04.120Z
---
Temas são um conjunto de Widgets utilizados para montar um passo de formulário no Firebolt, esse tema pode ser passado como uma prop para o componente `FireboltForm` ou `StepForm`.

Atualmente no monorepo do firebolt mantemos dois temas, o `blueberry-theme` e o `material-theme`, porém outros temas podem ser criados pelos usuários do firebolt.

Os temas são necessários para permitir a customização dos componentes que devem ser renderizados pelo `FireboltForm` :

* O tema deve mapear o nome identificador utilizado no JSON para um componente React, por exemplo:

  * Se no JSON de configuração criarmos um campo que utiliza o `"ui:widget": "Text"` , o tema fica responsável por atribuir um componente a esse `Text`
  * Um tema deve obrigatoriamente implementar os Widgets básicos de formulário, ou seja `Text` , `Select`, `Checkbox`, `Radio` e etc.
  * Um tema pode definir outros Widgets mais específicos, por exemplo o tema do Blueberry implementa dois widgets extras: o `CEPWidget` e o `BRCityWidget`.

exemplo de um tema:

```javascript
const defaultTheme = {
  "Email": EmailWidget,
  "Text": TextWidget,
  "TextArea": TextAreaWidget,
  "Select": SelectWidget,
  "Number": NumberWidget,
  "Password": PasswordWidget,
  "Check": CheckWidget,
  "CheckboxGroup": CheckboxGroupWidget,
  "Radio": RadioWidget,
}
```

implementando o tema:

```jsx
import BlueberryTheme from "@iq-firebolt/blueberry-theme"
import { FireboltForm } from "@iq-firebolt/client"

const MyForm = () => {
	return (
		<FireboltForm theme={BlueberryTheme} />
	)
}
```