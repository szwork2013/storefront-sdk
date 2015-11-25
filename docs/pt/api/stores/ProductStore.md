# ProductStore

É um [Immutable.Map](http://facebook.github.io/immutable-js/docs/#/Map) no formato:

```js
{
  'promocaoproduto29': {
    'href': 'http://api.vtex.com/dreamstore/products/promocaoproduto29',
    'slug': 'promocaoproduto29',
    'name': 'PROMOCAO PRODUTO 29 - PROMOCAO SKU 29',
    'brand': {
      'href': 'http://api.vtex.com/dreamstore/brands/marca-exemplo',
      'slug': 'marca-exemplo',
      'name': 'Marca Exemplo'
    },
    'categories': [
      {
        'href': 'http://api.vtex.com/dreamstore/categories/Promoções',
        'slug': 'promocoes',
        'name': 'Promoções',
        'children': null
      },
      {
        'href': 'http://api.vtex.com/dreamstore/categories/Promoções/Infantil',
        'slug': 'promocoes/infantil',
        'name': 'Infantil',
        'children': null
      },
      {
        'href': 'http://api.vtex.com/dreamstore/categories/Promoções/Infantil/Menino',
        'slug': 'promocoes/infantil/menino',
        'name': 'Menino',
        'children': null
      },
      {
        'href': 'http://api.vtex.com/dreamstore/categories/Promoções/Infantil/Menino/Macacões e Macaquinhos',
        'slug': 'promocoes/infantil/menino/macacoes-e-macaquinhos',
        'name': 'Macacões e Macaquinhos',
        'children': null
      }
    ],
    'description': '',
    'measurement': {
      'unit': 'un',
      'multiplier': 1
    },
    'skus': [
      {
        'id': '2000447',
        'name': 'PROMOCAO SKU 29',
        'ean': '',
        'images': [
          {
            'src': '/arquivos/ids/155646-#width#-#height#/imagemteste12.jpg',
            'title': 'imagemteste12'
          }
        ],
        'properties': [],
        'offers': [
          {
            'price': 35.99,
            'listPrice': 99.99,
            'validUntil': null,
            'availability': 9999,
            'seller': {
              'id': '1',
              'name': 'Dream Store'
            }
          }
        ]
      }
    ],
    'properties': []
  }
}
```

- Slug do produto (*String*)
  - href (*String*): URL para pegar dados da API deste recurso
  - slug (*String*): Slug do produto
  - name (*String*): Nome do produto
  - brand (*Object*): Marca
    - href (*String*): URL para pegar dados da API deste recurso
    - slug (*String*): Slug da marca
    - name (*String*): Nome da marca
  - categories (*Array*): Categorias
    - href (*String*): URL para pegar dados da API deste recurso
    - slug (*String*): Slug da categoria
    - name (*String*): Nome da categoria
    - children (*Array*): Array de subcategorias
  - description (*String*): Descrição do produto
  - measurement (*Object*): Informações sobre unidade
    - unit (*String*): Nome da unidade de medida (ex: 'kg')
    - multiplier (*Integer*): Unidade multiplicadora
  - skus (*Array*): SKUs associados
    - id (*String*): ID do SKU
    - name (*String*): Nome do SKU
    - ean (*String*): Código de barras (EAN-13) do SKU
    - images (*Array*): Images do SKU
      - src (*String*): URL relativa da imagem com **#width#** e **#height#** para serem substituídos
      - title (*String*): Título da imagem
    - offers (*Array*): Array de ofertas de venda do SKU
      - price (*Float*): Preço do SKU
      - listPrice (*Float*): Preço anterior do SKU
      - validUntil (*String*): Preço válido até esta data
      - availability (*Integer*): Quantidade de itens disponíveis
      - seller (*Object*): Informações do seller que oferece esta oferta
        - id (*String*): ID do seller
        - name (*String*): Nome do seller
    - properties (*Array*): Array de propriedades
  - properties (*Array*): Array de propriedades

### Actions relacionadas

- [`ResourceActions.getAreaResources`](../actions/ResourceActions.md): pega os resources da página
- [`SearchActions.onRequestSearch`](../actions/SearchActions.md): faz uma busca por produtos
- [`ProductActions.requestProduct`](../actions/ProductActions.md): pega dados de um produto específico

### Exemplo

```js
import React from 'react';
import { stores, utils } from 'sdk';

@utils.connectToStores()
class ProductPage extends React.Component {
  static getStores() {
    return [stores.ProductStore];
  }

  static getPropsFromStores(props) {
    return {
      product: stores.ProductStore.getState().get(props.params.slug)
    }
  }

  render() {
    let product = this.props.product;

    return (
      <div>
        <h1>{product ? product.name : null}</h1>
      </div>
    );
  }
}

export default ProductPage;
```
