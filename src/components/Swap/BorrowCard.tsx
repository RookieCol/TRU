import { useEffect, useRef, useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import { MUMBAI_USDC_ADDRESS } from '@/constants'
import { ConnectButton } from '@rainbow-me/rainbowkit'

type Props = {
	aavePoolContract: Contract
	aavefaucetContract: Contract
	usdcContract: Contract
	aUsdcContract: Contract
}

export default function BorrowCard(props: Props): JSX.Element {
	const { aavePoolContract, usdcContract, aUsdcContract } = props
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { toast } = useToast()
	const { isConnected, address } = useAccount()

	const [accountBalance, setAccountBalance] = useState<number>(0)

	const amountRef = useRef<HTMLInputElement>(null)

	const getBalance = async () => {
		const balance = await aUsdcContract.balanceOf(address)
		setAccountBalance(parseFloat(balance))
	}

	const onDeposit = async () => {
		const amount: string | undefined = amountRef.current?.value

		if (!amount) {
			toast({
				variant: 'destructive',
				title: 'Please enter an amount'
			})
			return
		}

		try {
			setIsLoading(true)
			const parsedAmount: bigint = BigInt(parseFloat(amount) * 10 ** 6)

			const approveTx = await usdcContract.approve(
				await aavePoolContract.getAddress(),
				parsedAmount
			)
			await approveTx.wait()

			const depositTx = await aavePoolContract.deposit(
				MUMBAI_USDC_ADDRESS,
				parsedAmount,
				address,
				0,
				{ gasLimit: 600000 }
			)

			await depositTx.wait()
			await getBalance()
			setIsLoading(false)
			toast({
				variant: 'success',
				title: 'Funds deposited!',
				description: "USDC-AToken's have been deposited"
			})
		} catch (error) {
			setIsLoading(false)
			toast({
				variant: 'destructive',
				title: 'Error depositing funds',
				description: 'Please try again.'
			})
		}
	}

	useEffect(() => {
		if (isConnected) {
			;(async () => {
				await getBalance()
			})()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [address, isConnected])

	return (
		<Card>
			<CardHeader>
				<CardTitle>Deposit Funds</CardTitle>
				<CardDescription>
					Set the amount you&apos;ll like to deposit and click on Deposit
				</CardDescription>
			</CardHeader>
			<CardContent className='flex flex-col gap-5'>
				{isConnected ? (
					<>
						<p className='text-center'>
							<span className='font-semibold'>USDC-AToken balance:</span>{' '}
							{accountBalance / 10 ** 6}
						</p>
						<div className='space-y-2'>
							<Label htmlFor='new'>Amount</Label>
							<Input type='number' ref={amountRef} />
							<Button
								className={`mt-[10px] px-6 bg-blue-600 hover:opacity-80 hover:bg-blue-600 ${isLoading && 'pointer-events-none opacity-80'}`}
								onClick={onDeposit}
							>
								{isLoading ? (
									<Oval color='white' strokeWidth={3} height={30} width={30} />
								) : (
									'Deposit'
								)}
							</Button>
						</div>
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
