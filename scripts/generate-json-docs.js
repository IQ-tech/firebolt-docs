const fs = require('fs')
const path = require('path')
const schema = require('@iq-firebolt/json-schema/form-schema.json')
const parser = require('json-schema-to-markdown')
const md = parser(schema)
const header = `---
title: Schema
description: Schema documentation
layout: ../../layouts/MainLayout.astro
---
`
const sample = `\n
[sample](./json-sample)
`
const file = header + md + sample

fs.writeFileSync(path.join(process.cwd(), 'src/pages/en/schema.md'), file)
fs.writeFileSync(path.join(process.cwd(), 'src/pages/pt-BR/schema.md'), file)