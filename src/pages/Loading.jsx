import Lottie from 'react-lottie';
import loading from './handLoading.json'

const Loading = () =>{
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: loading,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className=''>
        <Lottie options={defaultOptions} 
        height={400}       
        width={400}
          
        />
    </div>
    );
};

export default Loading;