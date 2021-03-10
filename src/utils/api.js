

const error = (res, code, data) => {
    res.status(code)
    return response(res, data)
}


const response = (res, data) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
}


const cache = res => {
    res.setHeader('Cache-Control', 's-maxage=1, stale-while-revalidate')
}


export {
    response,
    error,
    cache,
}
