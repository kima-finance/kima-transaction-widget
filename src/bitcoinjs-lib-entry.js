if (typeof window !== 'undefined') {
    window.bitcoin = require('bitcoinjs-lib');
} else if (typeof global !== 'undefined') {
    global.bitcoin = require('bitcoinjs-lib');
} else if (typeof self !== 'undefined') {
    self.bitcoin = require('bitcoinjs-lib');
} else {
    throw new Error('Cannot export bitcoinjs-lib');
}