---
title: Introdução
description: O Firebolt é um conjunto de ferramentas desenvolvido para acelerar
  o processo de criação e manutenção de fluxos de formulários de multistep.
layout: ../../layouts/MainLayout.astro
url: introduction
date: 2022-03-03T20:42:00.540Z
thumbnail: ""
---
## O que é o Firebolt?

O Firebolt é um conjunto de ferramentas desenvolvido para acelerar o processo de criação e manutenção de fluxos de formulários multistep. É uma ferramenta fullstack javascript/typescript com compartilhamento de código para auxiliar esse cenário.

Orientado à configuração, com apenas um arquivo de esquema json, podemos definir uma experiência de formulário completa. Esse esquema json é interpretado tanto pelo back-end quanto pelo front-end.

A ideia do Firebolt não é ser um gerador de formulário, pois seguir por essa ideia poderia acabar dificultando as customizações que são feitas corriqueiramente nesses tipos de formulários, mas ser um organizador/orquestrador de todo o processo de criação e gerenciamento dos forms.

## Por que usar o Firebolt?

* Evita a reescrita de formulário similares e de código;
* Facilita a modificação de formulários existentes, como: alterar a posição de campos e ordem dos passos;
* Define um único padrão de formulário pra ser utilizado tanto pelo back-end quanto pelo front-ent, facilitando a criação e manutenção dos formulários;
* Permite o versionamento dos formulários;
* Reduz atrito entre o back-end e o front-end em relação aos endpoints, pois a o formato dos dados enviados e os endpoints utilizados é automatizado pelo Firebolt;
* O desenvolvedor pode customizar os componentes de cada formulário (tematização) e também criar presets de configurações de campos.

## Firebolt x Outras tecnologias

|                                                                            | Firebolt | React JSON Schema Form |
| -------------------------------------------------------------------------- | -------- | ---------------------- |
|                                                                            |          |                        |
|                                                                            |          |                        |
| Renderiza um formulário a partir de um JSON                                | ✅        | ✅                      |
| Integra front-end e back-end                                               | ✅        | ❌                      |
| Cuida do formato dos dados enviados para o back-end e dos endpoints        | ✅        | ❌                      |
| JSON Schema minimalista                                                    | ✅        | ❌                      |
| Suporte a formulários multistep com comunicação entre back-end e front-end | ✅        | ❌                      |
| Suporte a diferentes temas de estilização                                  | ✅        | ✅                      |

O uso do Firebolt é mais indicado para situações em que você precisa criar uma infraestrutura de formulários multistep, entre o back-end e o front-end (base de dados, endpoints e etc).

## Estrutura

O projeto é composto principalmente por duas partes, o Client e a API.

O Client é uma biblioteca front-end que pode ser usada em qualquer aplicativo React. Ele fornece uma série de componentes que ajudam nas tarefas comuns de front-end na construção de formulários como: progressão de etapas, solicitações http, sessão do usuário e assim por diante. ele pode se conectar automaticamente com a API do firebolt, fazendo com que o desenvolvedor não precise se preocupar com endpoints, corpos de solicitação e etc.

Tanto a API quanto o Client utilizam uma biblioteca comum para realizar validações, falaremos um pouco mais sobre isso em breve.

## Pacotes que compõem o Firebolt

* Client
* Core
* Validadores
* Temas