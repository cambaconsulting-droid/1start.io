'use client';

import { memo } from 'react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

function ConnectWalletButtonComponent() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p className="mb-2 text-sm">Connected as: {`${address?.slice(0, 6)}...${address?.slice(-4)}`}</p>
        <button 
          onClick={() => disconnect()} 
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => connect({ connector: injected() })} 
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
    >
      Connect Wallet
    </button>
  );
}

export const ConnectWalletButton = memo(ConnectWalletButtonComponent);