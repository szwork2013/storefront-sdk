# CartActions

`CartActions` gera ações que afetam o carrinho.

## O parâmetro expectedOrderFormSections

Você vai reparar que grande parte das actions requerem o argumento `expectedOrderFormSections`.

O orderForm é composto de várias seções (ou attachments). É possível requisitar que somente algumas sejam enviadas na resposta.

Isso serve primariamente para melhorar a performance quando você sabe que a sua chamada não vai afetar as seções que você não pediu, ou se você simplesmente não se importa com as mudanças.

Em geral, é seguro não enviar esse argumento; nesse caso, todas as seções serão requisitadas.

Dada essa explicação, não será mais explicado esse argumento na documentação dos métodos.

## requestCart

Pede os dados do carrinho.

#### Argumentos

Esta action não possui argumentos.

#### Retorna

Promise com a chamada a API.

#### Actions chamadas

O resultado da chamada API:
- Em caso de sucesso: chama a action `requestSuccess` com o `orderForm` como argumento
- Em caso de erro: chama a action `requestFail` com o `erro` como argumento

## updateItems



#### Argumentos

1. `orderFormId` *(String)*:
2. `items` *(Array)*:
3. [`expectedOrderFormSections`] *(Array)*:
4. [`waitTime`] *(Number)*:

#### Resultado

## removeItems

#### Argumentos

1. `orderFormId` *(String)*:
2. `items` *(Array)*:
3. [`expectedOrderFormSections`] *(Array)*:

## addToCart

#### Argumentos

1. `orderFormId` *(String)*:
2. `items` *(Array)*:
3. [`expectedOrderFormSections`] *(Array)*:

## addShippingData

#### Argumentos

1. `orderFormId` *(String)*:
2. `shippingData` *(Object)*:
3. [`expectedOrderFormSections`] *(Array)*:

## requestSuccess

#### Argumentos

1. `orderForm` *(Object)*:

## requestFail

#### Argumentos

1. `error` *(Object)*:
