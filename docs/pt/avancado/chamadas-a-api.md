# Chamadas a API

Podemos fazer chamadas a API facilmente no front end com AJAX, porém em alguns casos a API está em um domínio diferente da aplicação front end. Por motivos de segurança, o browser bloqueia esse tipo de chamada (leia a página da Wikipedia sobre [CORS](https://pt.wikipedia.org/wiki/Cross-origin_resource_sharing)).

O Storefront possui um recurso para contornar esse problema chamado **resources** (trocadilho não intencional). Além de resolver o problema com CORS, resources são importantes para realizar o carregamento de dados no servidor, agilizando o carregamento da página.

O SDK já provê alguns resources por padrão, eles estão listados na [referência da API](../api/resources/README.md).

### Usando um resource

Iremos usar o resource "product@vtex.storefront-sdk" como exemplo.

#### Componente requer um dado da API

O arquivo de definição do componente (arquivos localizados em `storefront/components/`), possui um parâmetro util para carregar um dado da API chamado **resourceBinding**.

Veja o arquivo de definição de uma página de produto:

```json
{
  "route": {
    "path": "/:slug/p",
    "name": "product"
  },
  "resourceBinding": {
    "locator": "product@vtex.storefront-sdk",
    "params": {
      "slug": "{{ route.slug }}"
    }
  },
  "assets": [
    "common.js",
    "ProductPage.js"
  ]
}
```

Um `resourceBinding` recebe dois parâmetros: `locator` e `params`.

**locator**: é o identificador único do resource no formato: `<nome-do-arquivo>@<vendor>.<app>`. Neste caso é facil identificar onde o resource foi definido. No nosso exemplo usamos "product@vtex.storefront-sdk", neste caso deve existir um arquivo chamado "product.json" na pasta `storefront/resources` da app do SDK e de fato [ele existe](https://github.com/vtex-apps/storefront-sdk/blob/master/storefront/resources/product.json).

**params**: define os parâmetros a serem passados para o resource. Os valores do objeto params podem ser [tags Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers). No exemplo, o parâmetro `slug` recebe o valor de uma variável Liquid chamada `route.slug`. Além de parâmetros da rota usando `route`, você pode usar a variável `settings` para pegar valores de configuração salvos pelo Editor do componente. Mais simples ainda, você pode colocar uma string fixa.

### Criando um novo resource

Caso você queira usar uma API que não possua um resource atrelado, você pode criar um novo. Crie um arquivo JSON na pasta `storefront/resources/`, o nome deste arquivo deve ser em caixa baixa.

Exemplo do resource `category.json`:

```json
{
  "url": "http://api.beta.vtex.com/:account/products/",
  "cacheDuration": 60,
  "parameters": {
    "account": "{{ account.name }}"
  },
  "queryString": {
    "query": "{{ parameters.query }}",
    "category": "{{ parameters.category }}",
    "brands": "{{ parameters.brand }}"
  }
}
```

Note que na URL usamos `:account`, esse valor será substituído pelo parâmetro de mesmo nome dentro de `parameters`.

Os parâmetros definidos em `params` dentro de `resourceBinding` preencherão a variável Liquid `parameters`.

Variávels liquid disponíveis|Descrição|Exemplo
---|---|---
account.name|Nome da conta|`basedevmkp`
culture.code|Código ISO 2 dígitos da cultura|`pt-BR`
culture.language|Lingua|`pt`
culture.country|Código ISO 2 dígitos do páis|`BR`
culture.currency.code|Código ISO da moeda|`BRL`
user.roles.admin|Permissão de administrador|`false`
user.roles.customer|Permissão de usuário|`true`
user.roles.developer|Permissão de desenvolvedor|`false`
