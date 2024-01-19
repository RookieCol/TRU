import { ConnectButton } from '@rainbow-me/rainbowkit'

export default function Navbar(): JSX.Element {
	return (
		<nav className='w-full bg-primary py-3 px-3 md:px-5'>
			<div className='flex justify-between items-center max-w-[1400px] mx-auto'>
				<img src='/images/swap-logo.svg' alt='logo' width={50} height={50} />
				<ConnectButton />
			</div>
		</nav>
	)
}
