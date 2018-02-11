const moment = require('moment');

const generateMessage = (from, text) => {
    return {
        from: from,
        text: text,
        createAt: new moment().valueOf()
    };
};

const generateLocationMessage = (from, latitude, longitude) => {
    return{
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createAt: new moment().valueOf()
    }
}

module.exports = {generateMessage, generateLocationMessage};