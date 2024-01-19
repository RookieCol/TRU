import { Contract } from 'ethers'

import BorrowCard from '@/components/Swap/BorrowCard'
import FaucetCard from '@/components/Swap/FaucetCard'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type Props = {
	aavePoolContract: Contract
	aavefaucetContract: Contract
	usdcContract: Contract
	aUsdcContract: Contract
}

export default function TabsSection(props: Props): JSX.Element {
	const { aavePoolContract, aavefaucetContract, usdcContract, aUsdcContract } =
		props

	return (
		<Tabs defaultValue='faucet' className='w-[400px]'>
			<TabsList className='grid w-full grid-cols-2'>
				<TabsTrigger value='faucet'>Faucet</TabsTrigger>
				<TabsTrigger value='deposit'>Deposit</TabsTrigger>
			</TabsList>
			<TabsContent value='faucet'>
				<FaucetCard
					aavePoolContract={aavePoolContract}
					aavefaucetContract={aavefaucetContract}
					usdcContract={usdcContract}
				/>
			</TabsContent>
			<TabsContent value='deposit'>
				<BorrowCard
					aavePoolContract={aavePoolContract}
					aavefaucetContract={aavefaucetContract}
					usdcContract={usdcContract}
					aUsdcContract={aUsdcContract}
				/>
			</TabsContent>
		</Tabs>
	)
}
