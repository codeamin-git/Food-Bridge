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
          
        />
        <Link to='/'>
        <button className='w-full btn btn-accent'>Back to Home</button>
        </Link>
    </div>
    );
};

export default Error;