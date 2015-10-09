# Roteamento

Para que o SDK consiga fazer o roteamento das páginas, é preciso que:

1. O componente que responde pela página esteja registrado na `ComponentStore`
2. O arquivo de definição do componente esteja criado em `storefront/components/`

Já vimos como registrar um componente em [Registro](registro.md). Vamos ver como devemos definir o componente no Storefront.

## Arquivo de definição do componente

Precisamos informar ao servidor que a rota **"/product"** é respondida com o componente React criado no passo anterior. Além disso, ele deve saber quais arquivos Javascript devem ser inseridos na página para que esse componente possa ser renderizado.

A forma de nos comunicarmos com o servidor se dá pelos arquivos na pasta `storefront/`. Crie um arquivo de definição de componente no seguinte formato:

> storefront/components/ProductPage.json

```json
{
  "route": {
    "name": "product",
    "path": "/product"
  },
  "assets": [
    "commons.js",
    "ProductPage.js"
  ]
}
```

O nome do arquivo deve ser o nome do componente React, por isso, demos o nome de "ProductPage.json".

O JSON contém informações sobre a rota e os assets (arquivos estáticos que ficam dentro da pasta `storefront/assets/`) necessários para renderizar o componente.

Internamente, o SDK usa o [React Router](http://rackt.github.io/react-router/), logo, a propriedade `path` deve ser um parâmetro válido para o React Router ([formatos válidos de path](https://github.com/rackt/react-router/blob/master/docs/guides/basics/RouteMatching.md)). Os servidores do Storefront e o SDK pegam todas as definições de componentes das apps instaladas e geram a configuração de roteamento automaticamente para que você não tenha que se preocupar com isso.
