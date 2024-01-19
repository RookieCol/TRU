import { useEffect, useState } from 'react'
import { Contract, ethers } from 'ethers'
import { useAccount } from 'wagmi'

import aaveFaucetContractJson from '@/assets/contracts/aave-faucet.json'
import aavePoolContractJson from '@/assets/contracts/aave-pool.json'
import aaveUsdcContractJson from '@/assets/contracts/aave-usdc.json'
import aaveUsdcAtokenContractJson from '@/assets/contracts/aave-usdc-atoken.json'
import Navbar from '@/components/Navbar/Navbar'
import TabsSection from '@/components/Swap/TabsSection'
import { Toaster } from '@/components/ui/toaster'

function App() {
	const { address } = useAccount()

	const [aavePoolContract, setAavePoolContract] = useState<Contract | null>(
		null
	)
	const [aavefaucetContract, setAavefaucetContract] = useState<Contract | null>(
		null
	)

	const [usdcContract, setUsdcContract] = useState<Contract | null>(null)

	const [aUsdcContract, setAUsdcContract] = useState<Contract | null>(null)

	useEffect(() => {
		if (address) {
			;(async () => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const ethereum = (window as any).ethereum

				const web3Provider: ethers.BrowserProvider = new ethers.BrowserProvider(
					ethereum
				)
				await web3Provider.send('eth_requestAccounts', [])
				const web3Signer: ethers.JsonRpcSigner = await web3Provider.getSigner()

				const aaveContract = new ethers.Contract(
					aavePoolContractJson.address,
					aavePoolContractJson.abi,
					web3Signer
				)

				const faucetContract = new ethers.Contract(
					aaveFaucetContractJson.address,
					aaveFaucetContractJson.abi,
					web3Signer
				)

				const usdcContract = new ethers.Contract(
					aaveUsdcContractJson.address,
					aaveUsdcContractJson.abi,
					web3Signer
				)

				const aUsdcContract = new ethers.Contract(
					aaveUsdcAtokenContractJson.address,
					aaveUsdcAtokenContractJson.abi,
					web3Signer
				)

				setAavePoolContract(aaveContract)
				setAavefaucetContract(faucetContract)
				setUsdcContract(usdcContract)
				setAUsdcContract(aUsdcContract)
			})()
		}
	}, [address])

	return (
		<main>
			<Navbar />
			<div className='flex justify-center flex-col items-center h-[90vh] gap-5 w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'>
				{aavePoolContract !== null &&
					aavefaucetContract !== null &&
					usdcContract !== null &&
					aUsdcContract !== null && (
						<TabsSection
							aavePoolContract={aavePoolContract}
							aavefaucetContract={aavefaucetContract}
							usdcContract={usdcContract}
							aUsdcContract={aUsdcContract}
						/>
					)}
			</div>
			<Toaster />
		</main>
	)
}

export default App
