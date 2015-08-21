import { sortBy, pairs } from 'lodash';

export default function hashRoute(route, params) {
  let paramsHash = JSON.stringify(sortBy(pairs(params)));
  return route + paramsHash;
}
