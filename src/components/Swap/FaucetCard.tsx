import { useEffect, useState } from 'react'
import { Contract } from 'ethers'
import { Oval } from 'react-loader-spinner'
import { useAccount } from 'wagmi'

import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { MUMBAI_USDC_ADDRESS } from '@/constants'
import { ConnectButton } from '@rainbow-me/rainbowkit'

type Props = {
	aavePoolContract: Contract
	aavefaucetContract: Contract
	usdcContract: Contract
}

export default function FaucetCard(props: Props): JSX.Element {
	const { aavefaucetContract, usdcContract } = props
	const { isConnected, address } = useAccount()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [accountBalance, setAccountBalance] = useState<number>(0)
	const { toast } = useToast()

	const getBalance = async () => {
		const balance = await usdcContract.balanceOf(address)
		setAccountBalance(parseFloat(balance))
	}

	const onMint = async () => {
		try {
			setIsLoading(true)
			const mintTx = await aavefaucetContract.mint(
				MUMBAI_USDC_ADDRESS,
				address,
				10000000,
				{
					gasLimit: 600000
				}
			)

			await mintTx.wait()
			await getBalance()

			setIsLoading(false)
			toast({
				variant: 'success',
				title: 'Tokens minted!',
				description: '10 USDC have been added to your account'
			})
		} catch (error) {
			setIsLoading(false)
			toast({
				variant: 'destructive',
				title: 'Error minting tokens',
				description: 'Please try again.'
			})
		}
	}

	useEffect(() => {
		if (isConnected) {
			getBalance()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isConnected, address])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Get funds</CardTitle>
				<CardDescription>
					By clicking the button below you&apos;ll get 10 USDC from our faucet
				</CardDescription>
			</CardHeader>
			<CardContent className='space-y-2 flex flex-col gap-5 items-center'>
				{isConnected ? (
					<>
						<p className='text-center'>
							<span className='font-semibold'>USDC balance:</span>{' '}
							{accountBalance / 10 ** 6}
						</p>
						<Button
							className={`mt-[10px] px-6 bg-blue-600 hover:opacity-80 hover:bg-blue-600 ${isLoading && 'pointer-events-none opacity-80'}`}
							onClick={onMint}
						>
							{isLoading ? (
								<Oval color='white' strokeWidth={3} height={30} width={30} />
							) : (
								'Get tokens'
							)}
						</Button>
					</>
				) : (
					<>
						<p className='text-center opacity-60'>
							Connect your wallet in order to use the faucet
						</p>
						<ConnectButton />
					</>
				)}
			</CardContent>
		</Card>
	)
}
