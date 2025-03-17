import Image1 from '../assets/image-1.jpg'

const Banner = () => {
  return (
    <div className='border-2 flex justify-center'>
        <img className='w-full h-auto rounded-2xl' src={Image1} alt="" />
    </div>
  )
}

export default Banner