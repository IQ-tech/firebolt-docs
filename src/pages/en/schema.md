---
title: Schema
description: Schema documentation
layout: ../../layouts/MainLayout.astro
---
# The Firebolt form schema

This schema should be used to the creation and validation of Firebolt Forms JSON files

The schema defines the following properties:

## `$schema-version` (string, required)

This version should match with the used Firebolt version

Default: `""`

## `category` (string, required)

This field requires a keyword to categorize the form

## `business` (string)

(deprecate) old way to categorize the form

## `webhook` (object)

While transitioning steps on a form, the Firebolt api can make webhook calls to third party api's. This property can be used to define which steps these calls should be made. it can also define the third party api url that should be used.

Properties of the `webhook` object:

### `triggers` (array)

This property should receive an array of step slugs, then, the webhook calls will happen on transitioning from these steps.

The object is an array with all elements of the type `string`.

Default:

```
[]
```

Additional restrictions:

* Minimum items: `1`

### `url` (string, required)

url to be used on webhook calls (between step transitions)

Default: `""`

### `headers` (object)

headers to be used with webhook calls

## `tracks` (array, required)

Tracks are the possible flows that can be performed during a form completion experience. the form process will use only one track at time, but the firebolt api can change the track of a form on the process.

The elements of the array must match *at least one* of the following properties:

## `any track` (object)

At least a default track is required

Properties of the `any track` object:

### `slug` (string, required)

An identifier to the track, every form should have a default track

### `steps` (array, required)

The list of steps that this track should have, this array contains a list of steps slugs

The elements of the array must match *at least one* of the following properties:

### `The first anyOf schema` (string)

An explanation about the purpose of this instance.

Default: `""`

Additional restrictions:

* Minimum items: `1`

## `steps` (array, required)

Here we can define the possible steps that the form can have

The elements of the array must match *at least one* of the following properties:

## `The first anyOf schema` (object)

An explanation about the purpose of this instance.

Properties of the `The first anyOf schema` object:

### `step` (object, required)

An explanation about the purpose of this instance.

Properties of the `step` object:

#### `slug` (string, required)

An unique identifier to this step

#### `type` (string, required)

Should be 'form' or 'custom', is used to distiguish between a regular form step or a custom step that should not have field validations

#### `friendlyname` (string, required)

this property is used to define a friendly display name to the step

#### `fields` (array)

Used to define the list of fields inside a step, is not required in custom steps

The elements of the array must match *at least one* of the following properties:

#### `The first anyOf schema` (object)

An explanation about the purpose of this instance.

Properties of the `The first anyOf schema` object:

##### `slug` (string, required)

An unique identifier to the field

##### `ui:widget` (string, required)

The Widget (firebolt-client component) that should be used on render the form. check the firebolt client to see the available widgets. custom widgets can be used with custom firebolt-client themes

Default: `"Text"`

##### `ui:props` (object, required)

Any value that can be passed right to the UI Widgets (components), values like label, placeholde, options, etc. these options are defined by the theme used by the front-end app

Default:

```
{}
```

##### `ui:props-preset` (string)

Used to apply a preset of props to a field Widget

##### `ui:props-conditional` (array)

Conditionally add properties to a widget

The elements of the array must match *at least one* of the following properties:

##### `UI prop conditional item` (object)

Properties of the `UI prop conditional item` object:

###### `conditional` (string, required) eg: `step.full_name === 'carlos alberto'`

receive a conditional expression, if evaluated truthy on the fron-end, then the props will be passed to the field widget

###### `props` (object, required)

can have any properties inside

Additional restrictions:

* Minimum items: `1`

##### `ui:styles` (object)

used to modify certain aspects of the fields presentation, such as size

Properties of the `ui:styles` object:

###### `size` (string, enum)

Set field horizontal size on UI

This element must be one of the following enum values:

* `half`
* `full`

##### `conditional` (string)

receives a logical expression, if false the field won't be rendered or validated

##### `validators` (array)

Used to defined wich validators should be applied to the field, these validators can run on the client app or in the server

The elements of the array must match *at least one* of the following properties:

##### `The first anyOf schema` (object)

An explanation about the purpose of this instance.

Properties of the `The first anyOf schema` object:

###### `type` (string, required)

here we can pass the validator name, check firebolt validators lib to se the supported validators

###### `properties` (object)

Any property that should be passed to the validator

###### `context` (string, enum)

Specify the context when the validator should be used

This element must be one of the following enum values:

* `client`
* `server`

Default:

```
{}
```

Default:

```
{}
```

Additional restrictions:

* Minimum items: `1`

Default:

```
{}
```

Default:

```
{}
```

Additional restrictions:

* Minimum items: `1`

[sample](./json-sample)
