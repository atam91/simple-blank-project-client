
const join = (_host, _path) => {
    const host = _host.endsWith('/') ? _host.slice(0, -1) : _host;
    const path = _path.startsWith('/') ? _path.slice(1) : _path;

    return host + '/' + path;
};

const Module = (host) => {
    const get = (path, auth = true) => ({
        method: 'get',
        path: join(host, path),
        auth
    });

    const post = (path, auth = true) => ({
        method: 'post',
        path: join(host, path),
        auth
    });

    const put = (path, auth = true) => ({
        method: 'put',
        path: join(host, path),
        auth
    });

    const patch = (path, auth = true) => ({
        method: 'PATCH',
        path: join(host, path),
        auth
    });

    const drop = (path) => ({
        method: 'delete',
        auth: true,
        path: join(host, path),
    });

    const upload = (path, auth = true) => ({
        method: 'post',
        type: 'form-data',
        path: join(host, path),
        auth
    });

    return {
        get,
        post,
        put,
        patch,
        drop,
        upload
    };
};


export default Module;
