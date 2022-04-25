---
title: Client
description: How to use client package
layout: ../../layouts/MainLayout.astro
lang: en
url: package-client
date: 2022-04-20T19:17:36.096Z
---

## Firebolt Client

A react library that is part of the Firebolt stack and aims to:

- Automatically integrate with the Firebolt service where data from the steps of the forms are processed;
- Provide a series of components that allow the creation of these forms in front-end applications in a modular way.

### Installation

```bash
# npm
npm install @iq-firebolt/client --save

# yarn
yarn add @iq-firebolt/client
```

### Configuration

To start using the Firebolt client, we need to configure the `Provider`, it is responsible for managing the current state of the form:

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

| Properties     | <div style="width: 120px;">Default value</div> | Description                                                                                                                                                          |
| -------------- | ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                |                                                |                                                                                                                                                                      |
| formAccess     | `null`                                         | Firebolt api access. formName is the form to consume.                                                                                                                |
| withHistory    | `false`                                        | With this property, each step transition will result in a push in the user's browser history, this also allows the use of browser arrows for navigation in the form. |
| stepQueryParam | `"step"`                                       | During form navigation the page url will contain a parameter that indicates the slug of the current step, example: `?step=personal_data`.                            |
| debug          | `false`                                        | It allows us to use the `debug-step` parameter in the page url, with that, we can debug a specific step of the form, example: `?debug-step=personal_data`.           |

To use `Provider`, we must encapsulate the application or page component that we want to render the form:

```jsx
const App = () => {
  return <div> my app </div>;
};

export default withFirebolt(App);
```

### Components

### `Wizard`

The `Wizard` is similar to the `Switch` of the `react-router`, it defines which component to render at each step of the form and it is also possible to define a default component to be used. In addition, it has important features such as:

- Run callbacks in specific situations of the form, for example, when changing the step, in case there is a connection error or when the form is finished;
- Define a fallback component, i.e. render a component during step transition, like a loader for example

```jsx
import { Wizard, createFireboltProvider } from "@iq-firebolt/client";

const withFirebolt = createFireboltProvider();

const App = () => {
  return (
    <div>
      <h1>My form</h1>
      <Wizard
        fallback={<MyLoader />}
        onFinishForm={(payload) => {}}
        onConnectionError={(err) => {}}
        onBeforeChangeStep={(proceed, { leavingStep, enteringStep }) => {}}
        onChangeStep={({ sentStep, currentStep }) => {}}
      ></Wizard>
    </div>
  );
};

export default withFirebolt(App);
```

**Props `Wizard`**

| <div style="width: 150px;">Properties</div> | Description                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fallback`                                  | Receives a component or markup that must be rendered during the step transition request.                                                                                                                                                                                                                                                                                                                                                |
| `onFinishForm`                              | Callback that runs when advancing the last step, the function receives a payload as an argument (last response from Firebolt api).                                                                                                                                                                                                                                                                                                      |
| `onConnectionError`                         | This callback should run when there is a connection problem between the Firebolt client and the API.                                                                                                                                                                                                                                                                                                                                    |
| `onBeforeChangeStep`                        | When the client receives the data of a new step from the api, the transition does not occur instantly, this callback can be used to run something before the transition takes place, that is: Client requests new step -> api returns new step -> onBeforeChangeStep - > step change in the current state of the client, this allows for example to redirect the user to some external site before rendering the next step of the form. |
| `onChangeStep`                              | We can use this callback to run something after transitioning from one step to another.                                                                                                                                                                                                                                                                                                                                                 |

> The `Wizard` renders/assembles only one component at a time. If the form advances to the next step, the template component of the current step will be unmounted and the `fallback` will take its place.

### `Wizard.Step`

O `Wizard.Step` funciona de forma similar ao `Route` do React router, ele fica responsável por atribuir a renderização de um componente especifico (template de passo/ step template) para um passo especifico do formulário. Com ele podemos definir utilizar um template padrão para os passos utilizando o pattern `*`:

```jsx
import { Wizard, createFireboltProvider } from "@iq-firebolt/client";

// template components
import DefaultTemplate from "components/StepTemplates/Default";
import SummaryTemplate from "components/StepTemplates/Summary";

const withFirebolt = createFireboltProvider();

const App = () => {
  return (
    <div>
      <h1>My form</h1>
      <Wizard fallback={<MyLoader />}>
        {/* Default step template: */}
        <Wizard.Step match="*" component={DefaultTemplate} />
        {/* Custom template */}
        <Wizard.Step
          match={{ slug: "summary_step" }}
          component={SummaryTemplate}
        />
      </Wizard>
    </div>
  );
};

export default withFirebolt(App);
```

**Props `Wizard.Step`**

| <div style="width: 150px;">Properties</div> | Description                                                                                                                                                         |
| ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `match`                                     | Used as an identifier. The character `*` can be used to define a pattern template. Or we can define the step slug by passing an object type: `{slug: "step_slug"}`. |
| `component`                                 | Component that must be used as a step template.                                                                                                                     |

> Every prop passed to Wizard.Step is passed to the component it should render.

### Step Template

Every component that is used as a step template receives a prop called `fireboltStep`, it contains some information about the current step and some methods for navigating the form. These values can also be obtained using the `useFirebolt` hook.

```jsx
const DefaultStepTemplate = ({ fireboltStep }) => {
  function goToNextStep() {
    fireboltStep.goNextStep({ cpf: "030.136.450-83" });
  }

  return (
    <div>
      <h1 className="default-step">Step title</h1>
      <button onClick={goToNextStep}>Next</button>
    </div>
  );
};

export default DefaultStepTemplate;
```

**Content of `fireboltStep` prop**

| <div style="width: 150px;">Properties</div> | Description                                                                                                                                                                                  |
| ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `capturedData`                              | Object that contains all the information filled in by the user in the previous steps.                                                                                                        |
| `clearSession`                              | Function to clear the form session and cancel the experience progression.                                                                                                                    |
| `fields`                                    | JSON schema session that describes the fields required for the current step of the form.                                                                                                     |
| `formFlowMetadata`                          | General data about the form (total of steps, name and slug of the steps, etc).                                                                                                               |
| `friendlyName`                              | Friendly name of the current step. Used for UI (Defined in JSON schema).                                                                                                                     |
| `goNextStep`                                | Function that triggers the transition to the next step. It takes as an argument a payload, that is, a key-value map of the field's slug and the value that must be sent to the firebolt api. |
| `goPreviousStep`                            | Function that triggers the transition to the previous step of the form.                                                                                                                      |
| `position`                                  | Number of current step position in relation to total steps, can be used to render an on-screen counter as "step 2/4" (Starts at 1).                                                          |
| `remoteErrors`                              | API field validation errors.                                                                                                                                                                 |
| `slug`                                      | Slug identifier of the current step, the same used in `Wizard.Step`.                                                                                                                         |
| `type`                                      | Current step type (`form` or `custom`).                                                                                                                                                      |
| `webhookResult`                             | Result of the webhook call that may have occurred between the previous step and the current step, it can contain any data that came from a third-party api.                                  |

### `FireboltForm`

The function of `FireboltForm` is to transform the part of the `JSON Schema` that describes the required fields, into a real form.
It maps and renders the fields, combining them with the content inserts (If necessary). example:

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

| <div style="width: 150px;">Properties</div> | Description                                                                                                                                                                                                                        |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `autofill`                                  | It receives a key-value object (field slug and value) that automatically fills the form payload, that is, if the object `{"name": "Marty Mcfly"}` is passed to this prop, the name field must be automatically filled in the form. |
| `className`                                 | Adds a custom class to the `form` element.                                                                                                                                                                                         |
| `customActionsChild`                        | Lets you pass a component to handle form submission or regression. Custom buttons are usually passed.                                                                                                                              |
| `onChange`                                  | This callback runs whenever there is a change in the form data, it passes the updated payload of the form as an argument to the callback.                                                                                          |
| `onFocusField`                              | Receives a callback function that returns information about the field in focus (field slug and value).                                                                                                                             |
| `onGoBack`                                  | Function that must run when clicking the step back button.                                                                                                                                                                         |
| `onSubmit`                                  | Function that must run when clicking the submit step button.                                                                                                                                                                       |
| `previousBtnText`                           | Text that should be rendered on the default back button.                                                                                                                                                                           |
| `remoteErrors`                              | Field validation errors defined by prop, can be used to force an error or pass errors that came from firebolt api.                                                                                                                 |
| `schema`                                    | Part of the `JSON Schema` responsible for describing the fields required for the step.                                                                                                                                             |
| `submitBtnText`                             | Text that should be rendered on the default submit button.                                                                                                                                                                         |
| `theme`                                     | Custom theme to use different components for field rendering. Examples of themes are `firebolt-blueberry` and the `material` pattern. A theme can also implement custom fields.                                                    |

### `FireboltForm.Insert`

`Firebolt Form.Insert` allows us to insert components between fields that are generated by `FireboltForm`, it only needs a reference of where it should be inserted and what it should render:

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
      >
        {/* Irá renderizar "something" depois do ultimo campo */}
        <FireboltForm.Insert after="last" render={<p>something</p>} />
        {/* Irá renderizar "something" antes do primeiro campo */}
        <FireboltForm.Insert before="first" render={<p>something</p>} />
        {/* Irá renderizar "something" antes do campo de cpf */}
        <FireboltForm.Insert
          before={{ fieldSlug: "cpf_field" }}
          render={<p>something</p>}
        />
      </FireboltForm>
    </div>
  );
};

export default DefaultStepTemplate;
```

The reference can be `last` , `first` or a `{fieldSlug: "field_slug"}` object

| <div style="width: 150px;">Properties</div> | Description                                  |
| ------------------------------------------- | -------------------------------------------- |
| `after`                                     | Renders the markup before the reference.     |
| `before`                                    | Renders the markup after the reference.      |
| `render`                                    | Component or markup that should be rendered. |

### `StepForm`

The responsibility of `StepForm` is to simplify the writing of step templates.
By encapsulating `FireboltForm`, all its properties are now equally supported in `StepForm` and the result will be the same, both using `StepForm` and `FireboltForm`.
The difference is in the way it is used, as many of these properties do not need to be informed in `StepForm` , making the code smaller.

Example step template with `FireboltForm`:

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

Step template example with `StepForm`:

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

As `Step Form` encapsulates `Firebolt Form`, we need an `Insert` for `StepForm` as well.
`StepForm.Insert` works exactly like `FireboltForm.Insert`, allowing us to insert components in the spaces between fields that are generated by `FireboltForm`, which here, is inside `StepForm`.

```jsx
import { StepForm } from "@iq-firebolt/client";

const DefaultStepTemplate = ({ fireboltStep }) => {
  return (
    <div>
      <h1 className="default-step">Step title</h1>
      <StepForm>
        {/* Irá renderizar "something" depois do ultimo campo */}
        <StepForm.Insert after="last" render={<p>something</p>} />
        {/* Irá renderizar "something" antes do primeiro campo */}
        <StepForm.Insert before="first" render={<p>something</p>} />
        {/* Irá renderizar "something" antes do campo de cpf */}
        <StepForm.Insert
          before={{ fieldSlug: "cpf_field" }}
          render={<p>something</p>}
        />
      </StepForm>
    </div>
  );
};

export default DefaultStepTemplate;
```

The reference can be `last` , `first` or a `{fieldSlug: "field_slug"}` object

| <div style="width: 150px;">Properties</div> | Description                                  |
| ------------------------------------------- | -------------------------------------------- |
| `after`                                     | Renders the markup before the reference.     |
| `before`                                    | Renders the markup after the reference.      |
| `render`                                    | Component or markup that should be rendered. |
