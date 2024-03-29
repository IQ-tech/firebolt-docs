---
title: Schema Sample
description: Schema sample
layout: ../../layouts/MainLayout.astro
---

Functional form example

```json
{
  "$schema-version": "1.0.0",
  "$form-version": "0.0.1",
  "business": "sample",
  "webhook": {
    "triggers": ["personal_data"],
    "url": "{WEBHOOK_URL}"
  },
  "tracks": [
    {
      "slug": "default",
      "steps": ["personal_data", "documents", "address", "bills"]
    },
    {
      "slug": "medium",
      "steps": ["personal_data", "documents", "token"]
    },
    {
      "slug": "short",
      "steps": ["personal_data", "token"]
    }
  ],
  "steps": [
    {
      "step": {
        "id": 1,
        "slug": "personal_data",
        "type": "form",
        "friendlyname": "Vamos começar",
        "fields": [
          {
            "slug": "full_name",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Nome completo",
              "placeholder": "Nome completo"
            },
            "validators": [{ "type": "required" }, { "type": "name" }],
            "meta": {}
          },
          {
            "slug": "email",
            "ui:widget": "Email",
            "ui:props": {
              "label": "Email",
              "placeholder": "contato@email.com"
            },
            "validators": [{ "type": "required" }],
            "meta": {}
          }
        ]
      }
    },
    {
      "step": {
        "id": 2,
        "slug": "documents",
        "type": "form",
        "friendlyname": "Documentos",
        "fields": [
          {
            "slug": "brazil_id_number",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Número do documento"
            },
            "validators": [{ "type": "required" }],
            "meta": {}
          }
        ]
      }
    },
    {
      "step": {
        "id": 3,
        "slug": "address",
        "type": "form",
        "friendlyname": "Endereço",
        "fields": [
          {
            "slug": "zipcode",
            "ui:widget": "CEP",
            "ui:props-preset": "br-cep",
            "ui:props": {
              "relatedFieldsSlugs": {
                "cityFieldSlug": "city",
                "stateFieldSlug": "state",
                "streetFieldSlug": "street_address",
                "additionalAddressFieldSlug": "additional_info",
                "neighborhoodFieldSlug": "neighborhood"
              }
            },
            "validators": [{ "type": "required" }, { "type": "cep" }]
          },
          {
            "slug": "street_address",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Endereço",
              "placeholder": "Ex.: Av Paulista",
              "readonly": true
            },
            "validators": [{ "type": "required" }]
          },
          {
            "slug": "street_number",
            "ui:widget": "Number",
            "ui:props": {
              "label": "Número"
            },
            "validators": [{ "type": "required" }],
            "meta": {}
          },
          {
            "slug": "additional_info",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Complemento",
              "placeholder": "Ex.: Apto 25 bl C"
            },
            "meta": {}
          },
          {
            "slug": "neighborhood",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Bairro",
              "placeholder": "Ex.: Centro",
              "readonly": true
            },
            "validators": [{ "type": "required" }, { "type": "nonNumeric" }],
            "meta": {}
          },
          {
            "slug": "city",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Cidade",
              "readonly": true
            },
            "validators": [{ "type": "required" }, { "type": "nonNumeric" }],
            "meta": {}
          },
          {
            "slug": "state",
            "ui:widget": "Select",
            "ui:props-preset": "br-states",
            "ui:props": {
              "label": "Estado"
            },
            "validators": [{ "type": "required" }],
            "meta": {}
          }
        ]
      }
    },
    {
      "step": {
        "id": 4,
        "slug": "bills",
        "type": "iq_contas",
        "friendlyname": "Adicionar Contas",
        "sharedata": true,
        "fields": []
      }
    },
    {
      "step": {
        "id": 5,
        "slug": "token",
        "type": "form",
        "friendlyname": "Token",
        "fields": [
          {
            "slug": "received_token",
            "ui:widget": "Text",
            "ui:props": {
              "label": "Token recebido"
            },
            "validators": [{ "type": "required" }],
            "meta": {}
          }
        ]
      }
    }
  ]
}
```
