import { useMemo } from 'react';
import { ethers } from 'ethers';
import TekSwap from '../build/contracts/TekSwap.json'

export default function useTekSwap(isConnected, provider, signer) {
    return useMemo(() => {
        if (!isConnected || !provider || !signer) {
            return null;
        }

        let contract;

        try {
            contract = new ethers.Contract(TekSwap.networks[Object.keys(TekSwap.networks)[0]].address, TekSwap.abi, signer);
        } catch (ex) {
            console.log(ex);
            alert("There was an error somewhere in the application! See console for details.");
        }

        return contract;
    }, [isConnected, provider, signer]);
}