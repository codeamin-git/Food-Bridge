import Lottie from 'react-lottie';
import error from './errorAnimation.json'
import { Link } from 'react-router-dom';
const Error = () => {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: error,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className=''>
        <Lottie options={defaultOptions}
        height={600}        
        width={600}
          
        />
        <div className='flex items-center justify-center'>
        <Link to='/'>
        <button className='btn btn-accent'>Back to Home</button>
        </Link>
        </div>
    </div>
    );
};

export default Error;