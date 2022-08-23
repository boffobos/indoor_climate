var http = require('node:http');


var getRoomTemp = (url) => {
    return new Promise((resolve, reject) => {
        let data = '';
        const reqData = http.request(url, response => {
            const { body } = response;

            response.on('data', chunk => {
                data += chunk.toString();
            });

            response.on('end', () => {
                if (data) {
                    data = JSON.parse(data);
                    resolve(data);
                }
            });

        });

        reqData.end().on('error', (e) => reject(e));

    });
}

module.exports = getRoomTemp;