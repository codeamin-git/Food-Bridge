import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { updateProfile } from 'firebase/auth';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const SignUp = () => {
    const {createUser} = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const navigate = useNavigate()
    const from = '/'

    const onSubmit = async (data) => {
        try {
            const { name, email, photo, password } = data;
    
            // Create user with email and password
            const result = await createUser(email, password);
            console.log(result.user);
    
            // Update user profile with name and photo
            const newUser = result.user;
            await updateProfile(newUser, {
                displayName: name,
                photoURL: photo
            });
            const {res} = await axios.post(
                `${import.meta.env.VITE_API_URL}/jwt`,
                {
                    email: result?.user?.email,
                },
                { withCredentials: true }
            )
            
            console.log(res);
            // Navigate and show success message
            navigate(from);
            toast.success("Successfully Registered!");
        } catch (error) {
            console.error(error);
            // Handle error if any
        }
    }
    

    return (
        <div className="hero min-h-screen bg-base-200">
            <Helmet>
                <title>Food Bridge | Sign Up</title>
            </Helmet>
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Sign Up now!</h1>
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