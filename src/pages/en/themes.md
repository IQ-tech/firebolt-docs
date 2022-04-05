---
title: Themes
description: Adding themes to Firebolt Forms
layout: ../../layouts/MainLayout.astro
lang: en
url: themes
date: 2022-04-04T13:49:43.541Z
---
Themes are a set of widgets used to build a form step in Firebolt, this theme can be passed as a prop to the `FireboltForm` or `StepForm` component.

Currently in the firebolt monorepo we maintain two themes, the blueberry-theme and the material-theme, but other themes can be created by firebolt users.

Themes are needed to allow customization of the components that should be rendered by FireboltForm :

* The theme must map the identifier name used in the JSON to a React component, for example:

  * If in the configuration JSON we create a field that uses the `"ui:widget": "Text"` , the theme is responsible for assigning a component to this `Text`
  * A theme must implement the basic form widgets, ie `Text` , `Select`, `Checkbox`, `Radio` and so on.
  * A theme can define other more specific widgets, for example the Blueberry theme implements two extra widgets: the `CEPWidget` and the `BRCityWidget`.

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