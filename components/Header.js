import Identicon from 'identicon.js';
import { useContext } from 'react'
import { BlockchainContext } from './BlockchainContext'

export default function Header() {
    const { isConnected, connectWallet, account } = useContext(BlockchainContext);

    return (
        <header className="flex flex-row flex-wrap py-4 px-32 justify-center items-center bg-gradient-to-r from-blue-900 via-red-900 to-gray-900 text-white mobile:justify-between">
            <a className='text-center mb-4 mobile:m-0' href="/">
                <h1 className='font-extrabold text-4xl hover:opacity-50 duration-500'>TekSwap</h1>
            </a>
            {isConnected
                ?
                <div>
                    <span>
                        {account}
                    </span>
                    {account ?
                        <img
                            className="ml-2"
                            width='30'
                            height='30'
                            src={`data:image/png;base64,${new Identicon(account, 30).toString()}`}
                            alt=""
                        />
                        : null}
                </div>
                :
                <button type="button" onClick={connectWallet} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full duration-500">CONNECT WALLET</button>}
        </header>
    );
}
