import mobile from '../assets/mobile.png'
import playstore from '../assets/playstore.png'
import applestore from '../assets/applestore.png'

const Footer = () => {
  return (
    <footer className='w-full px-28 mb-10'>
        <div className="flex justify-between flex-wrap items-center">
            <div className='flex justify-center items-center'>
                <img className='w-20' src={mobile} alt="" />
                <div>
                    <h1 className='text-blue-900 font-semibold text-4xl'>Get the App!</h1>
                    <p className='text-gray-400 text-xl'>App is where the fun is! Its Easy, Fast and <br /> Conveniet</p>
                    <div className='flex justify-start mt-3 items-center gap-3'>
                        <img className='h-10' src={playstore} alt="" />
                        <img className='h-10' src={applestore} alt="" />
                    </div>
                </div>
            </div>
            <div className='text-xl text-gray-500'>
                <p>Copyright Broadway Pizza Pakistan J & S CORPORATION. All rights reserved. <br /> Created and managed with care by</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer