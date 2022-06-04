import { createContext } from "react";
import useMetamask from "../hooks/useMetamask";
import useTekSwap from "../hooks/useTekSwap";

export const BlockchainContext = createContext();

export const BlockchainContextProvider = ({children}) => {
    const { isConnected, provider, signer, connectWallet, account } = useMetamask();
    const TekSwap = useTekSwap(isConnected, provider, signer);
    
    const value = {
        isConnected,
        provider,
        signer,
        connectWallet,
        TekSwap,
        account
    }

    return (
        <BlockchainContext.Provider
            value={value}
        >
            {children}
        </BlockchainContext.Provider>
    )
}