import Identicon from 'identicon.js';
import { useContext } from 'react'
import { BlockchainContext } from './BlockchainContext'

export default function Header() {
    const { isConnected, connectWallet, account } = useContext(BlockchainContext);

    return (
        <header className="flex flex-row flex-wrap pt-10 px-96 items-center justify-between">
            <a className='text-center m-0 hover:opacity-50 duration-500' href="/">
                <div className='flex items-center gap-3'>
                    <div className='w-[75px] m-auto'>
                        <img src="/TekToken.png" />
                    </div>
                    <h1 className='font-extrabold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-300'>TekSwap</h1>
                </div>
            </a>
            {isConnected
                ?
                <div>
                    <span className="inline-block opacity-20 text-white">
                        {account.slice(0, 5)}...{account.slice(-5)}
                    </span>
                    {account ?
                        <img
                            className="inline-block ml-5"
                            src={`data:image/png;base64,${new Identicon(account, { size: 75, background: [21, 21, 21, 255] }).toString()}`}
                            alt=""
                        />
                        : null}
                </div>
                :
                <button type="button" onClick={connectWallet} className="bg-orange-500 hover:opacity-50 text-white font-bold py-2 px-4 rounded-lg duration-500">CONNECT WALLET</button>}
        </header>
    );
}
