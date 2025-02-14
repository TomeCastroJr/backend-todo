const notFoundError = (res, message={error: "Recurso não encontrado"}) => {
    return res.status(404).send(message);
}

export default notFoundError;