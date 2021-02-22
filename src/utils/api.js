

const error = (res, code, data) => {
    res.status(code)
    return response(res, data)
}


const response = (res, data) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
}


export {
    response,
    error,
}
