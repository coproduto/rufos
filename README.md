# Rufos

* [English version below](#en)

## Descrição

Este repositório contém o aplicativo móvel do Projeto Rufos. O aplicativo 
realiza a leitura de QR Codes cadastrados com o projeto e apresenta
metadados previamente cadastrados, relacionados à localização do QR Code.

Esses metadados pode ser usados para fins de acessibilide ou para prover
maior informação sobre o contexto urbano da unidade Rufos.

## Registrando metadados

Para registrar um QR Code com o Projeto Rufos, faça um _fork_ deste repositório
e edite o arquivo `api/codes.json`. Uma entrada para um QR Code tem o seguinte 
formato:

```json
{
  string: "CONTEUDO_DO_QR_CODE",
  name: "Nome do objeto urbano no qual o Rufos será aplicado",
  description: "Descrição que o aplicativo deve exibir. A descrição
  pode ter, e encoraja-se que tenha 2 ou 3 parágrafos de comprimento."
}
```
Com a entrada do(s) seu(s) QR Codes adicionada ao arquivo, faça um pull request
para este repositório. Assim que o pull request for aceito, o QR Code passará 
a funcionar no aplicativo.

## Contribuindo

Este é um aplicativo de código-aberto, licenciado sob a licença MIT
(ver o artigo LICENÇA).

Contribuições ao aplicativo são bem-vindas. Em especial, aceitamos 
aprimoramentos de código, mas também apreciamos muito documentação.

Para começar a contribuir, verifique se há Issues em aberto aguardando
resolução.

## Histórico

Este aplicativo foi criado como parte do Makeathon Fab City de 
Janeiro de 2017 em Recife, Pernambuco.

# English version<a name="en"></a>

This repository contains the mobile app for Project Rufos. The app reads
registered QR Codes and shows previously registered metadata related to 
the QR Code's location.

This metadata can be used for purposes of accessibility or to provide
greater informations about the context in which the Rufos unit is located.

## Registering metadata

To register a QR Code with Project Rufos, fork this repository and edit the
`api/codes.json` file adding your entry. Each QR Code entry has the following
format:

```json
{
  string: "QR_CODE_CONTENTS",
  name: "Object or place where the Rufos unit shall be applied",
  description: "Description the app should show upon scanning 
  the QR Code. It is encouraged that this description be 2 to 3 
  paragraphs long."
}
```

## Contributin

The Rufos app is an open-source project (see LICENCE).

We welcome contributions to the source code and documentation.

## History

Rufos was built as an entry for the Fab City Makeathon at Recife, 
Pernambuco, Brazil in January 2017.
