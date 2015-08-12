import _omit from 'lodash/object/omit';
import StorefrontConstants from 'constants/StorefrontConstants';
import axios from 'axios';

class Search {

  static products(params) {
    const url = StorefrontConstants.BASE_URL + params.accountName + '/products/' + (params.product || '');

    return axios.get(url, _omit(params, ['accountName', 'product', 'id']));
  }

  static facets(params) {
    const url = StorefrontConstants.BASE_URL + params.accountName + '/facets';

    return axios.get(url, _omit(params, ['accountName']));
  }

  static categories(params) {
    const categoryId = params.category ? params.category : '';
    const url = StorefrontConstants.BASE_URL + params.accountName + '/categories/' + categoryId;

    return axios.get(url);
  }

}

export default Search;
