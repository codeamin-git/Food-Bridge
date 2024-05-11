import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import useAuth from '../../hooks/useAuth';

const SignUp = () => {
    const {createUser} = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const from = '/'

    const onSubmit = (data) => {
        const {name,email,photo,password} = data;
        createUser(email,password)
        .then(result => {
            console.log(result.user);
            const newUser = result.user
            updateProfile(newUser, {
                displayName: name,
                photoURL: photo
            })
            if (newUser) {
                navigate(from)
                toast.success("Successfully registered!")
            }
        })
        .catch(error=>{
            console.error(error)
        })
    }

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Register now!</h1>
                    <img src="https://i.ibb.co/vH615zs/Humaaans-Wireframe.png" alt="" />
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form 
                    onSubmit={handleSubmit(onSubmit)}
                    className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input 
                            {...register("name", { required: true })}
                            type="text" placeholder="your name" className="input input-bordered" required />
                            {errors.name && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input 
                            {...register("email", { required: true })}
                            type="email" placeholder="your email" className="input input-bordered" required />
                            {errors.email && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input 
                            {...register("photo", { required: true })}
                            type="text" placeholder="photo URL" className="input input-bordered" required />
                            {errors.photo && <span className="text-red-500">This field is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input 
                            {...register("password", { required: true, minLength: 6})}
                            type="password" placeholder="password" className="input input-bordered" required />
                            {errors.password && <span role="alert" className="text-red-500">
                                {errors.password.type === "required" && "This field is required"}
                                {errors.password.type === "minLength" && "Password must be at least 6 characters"}
                                
                            </span>}
                        </div>
                        <p>Already have an account? <Link className='link text-blue-600' to='/login'>Login</Link></p>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#228B22] text-white">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;