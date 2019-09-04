const querystring = require('querystring');
const BaseChainComponent = require('./base-chain-component');

class BasePaymentForwarding extends BaseChainComponent {

    /**
     * List Payment Endpoint
     *
     * @async
     * @desc To list your currently active payment forwarding addresses, you can use this endpoint.
     *
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    listPayments(queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.get(this.basePath + this.getSelectedNetwork() + '/payments?' + queryString);
    }

    /**
     * List of Past Forward Payments By Users
     *
     * @async
     * @desc To list your currently active payment forwarding addresses, you can use this endpoint.
     *
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    listPaymentsHistory(queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.get(this.basePath + this.getSelectedNetwork() + '/payments/history?' + queryString);
    }

    /**
     * Delete Payment Endpoints
     *
     * @async
     * @desc When you’re done with a payment forwarding address, you can delete it via its id and current user id.
     *
     * @param {string} paymentID - Generated UUID when payment forwarding have been created.
     * @param {object} [queryParams] - Additional query parameters.
     *
     * @returns {*|Promise<any | never>}
     */
    deletePayment(paymentID, queryParams = {}) {
        const queryString = querystring.stringify(queryParams);

        return this.request.delete(this.basePath + this.getSelectedNetwork() + '/payments/' + paymentID + '?' + queryString);
    }

}

module.exports = BasePaymentForwarding;
