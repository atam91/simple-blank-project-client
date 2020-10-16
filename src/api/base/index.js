import resources from '@/config/resources';
import sessionService from '@/services/session';
import * as apiMiddleware from './middleware';



const getResource = (res) => {
    const resName = res.res || res;
    const resource = resources[resName];
    if (!resource) {
        throw new Error(`Unknown resource: ${resName}`);
    }

    let { path } = resource;

    if (path.indexOf(':') !== -1) {
        path = path
            .split('/')
            .map(p => {
                if (p[0] === ':') {
                    const name = p.slice(1);

                    if (name in res) {
                        return res[name];
                    } else {
                        throw new Error(`Missing parameter ${name} for request: ${resName}`);
                    }
                }

                return p;
            })
            .join('/');
    }

    return {
        ...resource,
        path
    };
};


const QUERY_USE_SQUARE_BRACKETS_FOR_ARRAY = false; /// PHP feature, not documented in URI standart

export const getQueryString = (params) => {
    if (!params) return '';

    const parts = [];
    const addPart = (_key, _value, isArray = false) => {
        const value = (_value === null) ? '' : encodeURIComponent(_value);
        const key = encodeURIComponent(_key) + (isArray && QUERY_USE_SQUARE_BRACKETS_FOR_ARRAY ? '[]' : '');

        parts.push(`${key}=${value}`);
    };

    Object.keys(params)
        .sort()
        .forEach(key => {
            const value = params[key];

            if (Array.isArray(value)) {
                value.forEach(val => addPart(key, val, true));
            } else {
                addPart(key, value);
            }
        });

    return '?' + parts.join('&');
};


const cnsl = false;

const fetchApi = async (url, options, callback) => {
    cnsl && console.log('___fetch', url, options);

    const handleResponse = res => apiMiddleware.response(res, callback);  //// TODO unAuth check

    try {
        const response = await fetch(url, options);

        cnsl && console.log('____response', response);

        const contentType = response.headers.get('Content-Type');

        let data;
        if (!contentType) {
            data = null;
        } else if (contentType.startsWith('application/json')) {
            data = await response.json();
        } else if (contentType.startsWith('text/plain') || contentType.startsWith('text/html')) {
            const message = await response.text();
            data = { message };
            /*} else if (contentType.startsWith('text/html')) {
             const text = await response.text();
             data = { text };*/
        } else {
            throw new Error('Server response with unexpected Content-Type ' + contentType);
        }

        cnsl && console.log('____responseData', data);

        handleResponse({                             /// TODO response middleware check HERE MAYbE
            status: response.status == 200,
            httpCode: response.status,
            data
        });

        if (response.status !== 200) {
            throw {
                status: response.status == 200,
                httpCode: response.status,
                data
            }
        }


        return {
            status: response.status == 200,             //// FIXME really need????
            httpCode: response.status,
            data
        }
    } catch (err) {
        console.log(err);

        throw err;

        /*handleResponse({
            status: false,
            data: {
                message: 'Request error'
            }
        });*/
    }
};


const makeRequest = (res, _data, _callback) => {
    let data;
    let callback;

    if (typeof _data === 'object') {
        data = _data;
        ///callback = _callback;
    } /**else if (typeof _data === 'function') {
        callback = _data;
    } else {
        console.log('Unexpected callbackOrData arg', res, _data, _callback);
        throw new Error('Unexpected callbackOrData arg', res, _data, _callback);
    }**/

    const resource = getResource(res);
    const url = resource.path + getQueryString(res.params);

    const options = {
        method: resource.method,
        ///credentials: 'include',
        headers: {}
    };

    if (resource.auth) {
        const token = sessionService.getToken();
        if (!token) {
            throw new Error(`Miss token for auth request: ${res}`, data);
        }

        options.headers['Authorization'] = token;
    }

    if (data) {
        if (data instanceof FormData) {
            options.body = data;
        } else {
            options.headers['Content-Type'] = 'application/json';
            options.body = JSON.stringify(data);
        }
    }

    return fetchApi(url, options, callback);
};

export default makeRequest;
