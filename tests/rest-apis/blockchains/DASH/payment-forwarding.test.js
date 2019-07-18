async function PaymentForwarding(caClient) {
    console.log('\n::DASH Payment Forwarding');

    await caClient.BC.DASH.paymentForwarding.listPayments();
    await caClient.BC.DASH.paymentForwarding.listPaymentsHistory();

    const testUrl = 'http://testUrl';
    const randomHDWalletName = Math.random().toString(36).substring(7);
    const hdWalletPass = 'testhdpass';

    await caClient.BC.DASH.wallet.createHDWallet(randomHDWalletName, 1, hdWalletPass); // Duplicated but needed for scenario
    const response = await caClient.BC.DASH.wallet.generateAddressInHDWallet(randomHDWalletName, 1, hdWalletPass); // Duplicated but needed for scenario
    const addresses = response && response.payload ? response.payload.addresses : [];

    if (addresses.length > 1) {
        const payment = await caClient.BC.DASH.paymentForwarding.createPaymentForwarding(addresses[0].address, addresses[1].address, testUrl, randomHDWalletName, hdWalletPass, 1).then(response => response.payload);
        await caClient.BC.DASH.paymentForwarding.deletePayment(payment.uuid);
    }

    await caClient.BC.DASH.wallet.deleteHDWallet(randomHDWalletName); // (Cleanup) Duplicated but needed for scenario cleanup
}

module.exports = PaymentForwarding;
