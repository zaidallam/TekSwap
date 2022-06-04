const TekToken = artifacts.require('TekToken');
const TekSwap = artifacts.require('TekSwap');

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('TekSwap', ([deployer, investor]) => {
    let token, tekSwap;

    before(async () => {
        token = await TekToken.new();
        tekSwap = await TekSwap.new(token.address);
        await token.transfer(tekSwap.address, web3.utils.toWei('1000000', 'ether'));
    });

    describe('Token deployment', async () => {
        it('Token initializes properly', async () => {
            const tokenName = await token.name();
            assert.equal(tokenName, 'Tek Token');
        });
    });

    describe('TekSwap deployment', async () => {
        it('TekSwap initializes properly', async () => {
            const name = await tekSwap.name();
            assert.equal(name, 'TekSwap Decentralized Exchange');
        });

        it('TekSwap has tokens', async () => {
            let balance = await token.balanceOf(tekSwap.address);
            assert.equal(balance.toString(), web3.utils.toWei('1000000', 'ether'));
        });
    });

    describe('Buying Tokens', async () => {
        let purchase;

        before(async () => {
            purchase = await tekSwap.buy({ from: investor, value: web3.utils.toWei('1', 'ether') });
        });

        it('User can purchase tokens from the exchange at a fixed price', async () => {
            let investorBalance = await token.balanceOf(investor);
            assert.equal(investorBalance.toString(), web3.utils.toWei('100', 'ether'));

            let tekSwapBalance;
            tekSwapBalance = await token.balanceOf(tekSwap.address);
            assert.equal(tekSwapBalance.toString(), web3.utils.toWei('999900', 'ether'));
            tekSwapBalance = await web3.eth.getBalance(tekSwap.address);
            assert.equal(tekSwapBalance.toString(), web3.utils.toWei('1', 'Ether'));

            const event = purchase.logs[0].args;
            assert.equal(event.account, investor);
            assert.equal(event.token, token.address);
            assert.equal(event.amount.toString(), web3.utils.toWei('100', 'ether').toString());
            assert.equal(event.rate.toString(), '100');
        });
    });

    describe('Selling Tokens', async () => {
        let sale;

        before(async () => {
            await token.approve(tekSwap.address, web3.utils.toWei('100', 'ether'), { from: investor });
            sale = await tekSwap.sell(web3.utils.toWei('100', 'ether'), { from: investor });
        });

        it('User can sell tokens from the exchange at a fixed price', async () => {
            let investorBalance = await token.balanceOf(investor);
            assert.equal(investorBalance.toString(), web3.utils.toWei('0', 'ether'));

            let tekSwapBalance;
            tekSwapBalance = await token.balanceOf(tekSwap.address);
            assert.equal(tekSwapBalance.toString(), web3.utils.toWei('1000000', 'ether'));
            tekSwapBalance = await web3.eth.getBalance(tekSwap.address);
            assert.equal(tekSwapBalance.toString(), web3.utils.toWei('0', 'Ether'));

            const event = sale.logs[0].args;
            assert.equal(event.account, investor);
            assert.equal(event.token, token.address);
            assert.equal(event.amount.toString(), web3.utils.toWei('100', 'ether').toString());
            assert.equal(event.rate.toString(), '100');

            await tekSwap.sell(web3.utils.toWei('500', 'ether'), { from: investor }).should.be.rejected;
        });
    });
})
