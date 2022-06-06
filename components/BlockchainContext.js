import { createContext } from "react";
import useMetamask from "../hooks/useMetamask";
import useTekSwap, { useTekToken } from "../hooks/useTekSwap";

export const BlockchainContext = createContext();

export const BlockchainContextProvider = ({children}) => {
    const { isConnected, provider, signer, connectWallet, account } = useMetamask();
    const TekSwap = useTekSwap(isConnected, provider, signer);
    const TekToken = useTekToken(isConnected, provider, signer);
    
    const value = {
        isConnected,
        provider,
        signer,
        connectWallet,
        TekSwap,
        account,
        TekToken
    }

    return (
        <BlockchainContext.Provider
            value={value}
        >
            {children}
        </BlockchainContext.Provider>
    )
}