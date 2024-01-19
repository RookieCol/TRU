import React from 'react'
import ReactDOM from 'react-dom/client'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { polygonMumbai } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'

import {
	getDefaultWallets,
	lightTheme,
	RainbowKitProvider
} from '@rainbow-me/rainbowkit'

import App from './App.tsx'

import './index.css'
import '@rainbow-me/rainbowkit/styles.css'

const { chains, publicClient } = configureChains(
	[polygonMumbai],
	[
		alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_API_KEY }),
		publicProvider()
	]
)

const { connectors } = getDefaultWallets({
	appName: 'My RainbowKit App',
	projectId: 'YOUR_PROJECT_ID',
	chains
})

const wagmiConfig = createConfig({
	autoConnect: true,
	connectors,
	publicClient
})

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider
				chains={chains}
				theme={lightTheme({
					accentColor: '#5e67e4',
					borderRadius: 'small',
					fontStack: 'system',
					overlayBlur: 'small'
				})}
				modalSize='compact'
			>
				<App />
			</RainbowKitProvider>
		</WagmiConfig>
	</React.StrictMode>
)
