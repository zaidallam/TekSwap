import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState, useEffect, useMemo } from 'react';
import { BlockchainContext } from './BlockchainContext';
import { ethers } from 'ethers';
import TokenInput from './TokenInput';
import Loader from './Loader';

const tekToken = {
    symbol: 'TEKT',
    image: "/TekToken.png"
};

const ethereum = {
    symbol: 'ETH',
    image: "/Ethereum.png"
};

const exchangeRate = 100;

export default function ExchangeForm() {
    const { isConnected, connectWallet, account, provider, TekToken, TekSwap } = useContext(BlockchainContext);
    const [tekTokenValue, setTekTokenValue] = useState(0);
    const [ethValue, setEthValue] = useState(0);
    const [balances, setBalances] = useState({ eth: 0, tekt: 0 });
    const [isBuying, setIsBuying] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const inputChanged = (value, token) => {
        if (token === 'TEKT') {
            setTekTokenValue(value);
            if (value)
                setEthValue(parseFloat(value) / exchangeRate);
            else
                setEthValue(0);
        } else if (token === 'ETH') {
            setEthValue(value);
            if (value)
                setTekTokenValue(parseFloat(value) * exchangeRate);
            else
                setTekTokenValue(0);
        }
    }

    const tekTokenField = useMemo(() => <TokenInput value={tekTokenValue} onChange={inputChanged} token={tekToken} />, [tekTokenValue]);
    const ethField = useMemo(() => <TokenInput value={ethValue} onChange={inputChanged} token={ethereum} />, [ethValue]);

    const getBalances = async () => {
        if (!account || !isConnected || !TekToken || !provider) return;

        try {
            const tekTokenBalance = (await TekToken.balanceOf(account)).div(ethers.utils.parseEther("1")).toNumber();
            const ethBalance = ethers.utils.formatEther((await provider.getBalance(account)));
            setBalances({ eth: ethBalance, tekt: tekTokenBalance });
        } catch (e) {
            console.log(e);
            if (e.code != 4001) alert("There was an error buying tokens! See console for details.");
        }
    }

    useEffect(() => {
        getBalances();
    }, [account, isConnected, TekToken, provider]);

    const fields = useMemo(() => {
        if (isBuying) return { input: ethField, output: tekTokenField };
        return { input: tekTokenField, output: ethField };
    }, [isBuying, ethField, tekTokenField]);

    const buyTokens = async () => {
        setIsLoading(true);
        try {
            await TekSwap.buy({ value: ethers.utils.parseEther(ethValue) });
        } catch (e) {
            console.log(e);
            if (e.code != 4001) alert("There was an error buying tokens! See console for details.");
        }
        setIsLoading(false);
    }

    const sellTokens = async () => {
        setIsLoading(true);
        try {
            await TekToken.approve(TekSwap.address, ethers.utils.parseEther(tekTokenValue.toString()))
            await TekSwap.sell(ethers.utils.parseEther((tekTokenValue).toString()));
        } catch (e) {
            console.log(e);
            if (e.code != 4001) alert("There was an error somewhere in the application! See console for details.");
        }
        setIsLoading(false);
    }

    return (
        <form onSubmit={(e) => e.preventDefault()} className='w-[800px] h-fit grid grid-rows-[repeat(6, min-content)] gap-2 text-white bg-slate-900 bg-opacity-20 rounded-xl p-8'>
            { isLoading ? <Loader /> : null }
            <div className='grid grid-rows-[min-content_min-content] gap-1'>
                <div className='flex flex-row w-full justify-between font-bold'>
                    <label>
                        Input
                    </label>
                    <span>
                        Balance: {isBuying ? balances.eth : balances.tekt}
                    </span>
                </div>
                {fields.input}
            </div>
            <div>
                <div onClick={() => setIsBuying(!isBuying)} className='w-fit m-auto cursor-pointer duration-500 hover:rotate-180 relative top-3'>
                    <FontAwesomeIcon height="25px" icon={faRightLeft} transform={{ rotate: 90 }} />
                </div>
            </div>
            <div className='grid grid-rows-[min-content_min-content] gap-1'>
                <div className='flex flex-row w-full justify-between font-bold'>
                    <label>
                        Output
                    </label>
                    <span>
                        Balance: {isBuying ? balances.tekt : balances.eth}
                    </span>
                </div>
                {fields.output}
            </div>
            <div className='h-4'>
            </div>
            <div className='flex flex-row w-full justify-between'>
                <span>
                    Exchange Rate
                </span>
                <span>
                    {isBuying ? `1 TEKT = ${1 / exchangeRate} ETH` : `1 ETH = ${exchangeRate} TEKT`}
                </span>
            </div>
            <div>
                {isConnected
                    ?
                    <button className="w-full bg-slate-800 hover:opacity-50 text-white font-bold py-2 px-4 rounded-lg duration-500 text-3xl" onClick={isBuying ? buyTokens : sellTokens}>
                        SWAP!
                    </button>
                    :
                    <button onClick={connectWallet} className="w-full bg-orange-500 hover:opacity-50 text-white font-bold py-2 px-4 rounded-lg duration-500 text-3xl">
                        CONNECT WALLET
                    </button>}
            </div>
        </form>
    );
}