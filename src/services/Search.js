import axios from 'axios';

class Search {
  static productResource = '/_resources/product@vtex.storefront-sdk/'
  static productsResource = '/_resources/products@vtex.storefront-sdk/'

  static products(params) {
    return axios.get(this.productResource, { params: params });
  }

  static facets(params) {
    const url = this.productsResource + '/facets';

    return axios.get(url, { params: params });
  }

  static categories(params) {
    const categoryId = params.category ? params.category : '';
    const url = this.productsResource + '/categories/' + categoryId;

    return axios.get(url);
  }
}

export default Search;
