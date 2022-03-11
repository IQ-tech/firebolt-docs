---
title: Autofill
description: How to use autofill with firebolt
layout: ../../layouts/MainLayout.astro
lang: en
url: autofill
date: 2022-03-11T20:35:21.981Z
---

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
http://yoursite.com/?autofill:JTdCJTIyY3BmJTIyJTNBJTdCJTIy...
```
