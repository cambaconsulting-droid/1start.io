'use client';

import { memo } from 'react'; // Importar 'memo'
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

// Primero, definimos el componente como una función normal.
function ConnectWalletButtonComponent() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <p className="mb-2 text-sm">Conectado como: {`${address?.slice(0, 6)}...${address?.slice(-4)}`}</p>
        <button 
          onClick={() => disconnect()} 
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Desconectar
        </button>
      </div>
    );
  }

  return (
    <button 
      onClick={() => connect({ connector: injected() })} 
      className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
    >
      Conectar Billetera
    </button>
  );
}

// Luego, exportamos la versión "memorizada" del componente.
// Esta sintaxis es más robusta y evita errores.
export const ConnectWalletButton = memo(ConnectWalletButtonComponent);