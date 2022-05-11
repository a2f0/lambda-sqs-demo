exports.handler = async (event) => {
    console.info('Here')
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
