---
title: Autofill
description: How to use autofill with firebolt
layout: ../../layouts/MainLayout.astro
lang: en
url: autofill
date: 2022-03-11T20:35:21.981Z
---

### What is it?

This functionality allows some data of a lead to be automatically filled in the form, let's see a use case:

1. We send an email to a lead offering a specific product.
2. This link redirects the user to a form that uses firebolt.
3. The url of the link has a base64 code that contains some information that we already have about this user
4. firebolt detects the code in the url and automatically fills some form fields for the user

### How to use

To use it, just follow a few simple rules:

- The object's properties must reflect the name of the form's fields;
- Each key receives two properties: value and mask
- The final string must pass through an encoder, this way we ensure that special characters are escaped. [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent)
- The value must be encrypted in base64 format

### Example

```jsx
const autofill = (userInfo) => {
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

The `autofill()` returns:

```plaintext
JTdCJTIyY3BmJTIyJTNBJTdCJTIydmFsdWUlMjIlM0ExMjM0NTY3ODkwJTJDJTIybWFzayUyMiUzQSUyMmNwZiUyMiU3RCUyQyUyMmZ1bGxfbmFtZSUyMiUzQSU3QiUyMnZhbHVlJTIyJTNBJTIySm9obiUyMERvZSUyMiUyQyUyMm1hc2slMjIlM0ElMjIlMjIlN0QlN0Q=
```

Now just pass the url as a parameter:

```plaintext
https://www.yoursite.com/?autofill:JTdCJTIyY3BmJTIyJTNBJTdCJTIy...
```
