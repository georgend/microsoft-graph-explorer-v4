import { IAction } from '../../../types/query-runner';
import { QUERY_GRAPH_ERROR, QUERY_GRAPH_SUCCESS } from '../constants';

export function queryResponse(response: object): IAction {
  return {
    type: QUERY_GRAPH_SUCCESS,
    response,
  };
}

export function queryResponseError(response: object): IAction {
  return {
    type: QUERY_GRAPH_ERROR,
    response,
  };
}

export function runQuery(url: string): Function {
  const headers = { Authorization: 'Bearer {token:https://graph.microsoft.com/}' };

  return (dispatch: Function) => {
    let respHeaders: object;

    return fetch(`https://proxy.apisandbox.msdn.microsoft.com/svc?url=${url}`, { headers })
      .then((resp) => {
        respHeaders = resp.headers;
        return resp.json();
      }, (error) => queryResponseError(error))
      .then((json) => dispatch(queryResponse({
        body: json,
        headers: respHeaders,
      })));
  };
}
