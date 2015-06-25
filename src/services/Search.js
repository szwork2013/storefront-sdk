import jQuery from 'jQuery';
import extend from 'lodash/object/extend';
import _omit from 'lodash/object/omit';

const baseUrl = "http://api.beta.vtex.com/";

const basicAjax = {
  type: "GET",
  crossDomain: true,
  dataType: "json"
};

class Search {

  static products(params) {
    let url = baseUrl + params.accountName + '/products/' + (params.product || "");

    let props = {
      url: url,
      data: _omit(params, ['accountName', 'product', 'id'])
    };

    return jQuery.ajax(extend({}, basicAjax, props));
  }

  static facets(params) {
    let url = baseUrl + params.accountName + '/facets';

    let props = {
      url: url,
      data: _omit(params, ['accountName'])
    };

    return jQuery.ajax(extend({}, basicAjax, props));
  }

  static categories(params) {
    let categoryId = params.category ? params.category : '';
    let url = baseUrl + params.accountName + '/categories/' + categoryId;

    let props = {
      url: url
    };

    return jQuery.ajax(extend({}, basicAjax, props));
  }

}

export default Search;
