import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Login = () => {
    const { signIn, signInWithGoogle, githubLogin } = useAuth()

    const navigate = useNavigate()
    const location = useLocation()
    const from = location?.state || '/'

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    // handle social login
    const handleSocialLogin = socialProvider => {
        socialProvider().then(result => {
            toast.success('Successfully logged in')
            console.log(result.user);
            if (result.user) {
                navigate(from)
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    const onSubmit = data => {
        const { email, password } = data
        signIn(email, password)
            .then(result => {
                toast.success('Logged in successfully')
                console.log(result.user);
                if (result.user) {
                    navigate(from)
                }
            })
            .catch(error => {
                console.error(error)
                toast.error('Email or Password did not match!')
            })
    }
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl font-bold">Login now!</h1>
                    <img src="https://i.ibb.co/mHZJGVt/Humaaans-3-Characters.png" alt=""/>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body">
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
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register("password", { required: true })}
                                type="password" placeholder="password" className="input input-bordered" required />
                            {errors.password && <span className="text-red-500">This field is required</span>}
                        </div>
                        <p>Already have an account? <Link className='link text-blue-600' to='/signup'>Register</Link></p>
                        <div className="form-control mt-6">
                            <button className="btn bg-[#228B22] text-white">Login</button>
                        </div>
                    </form>
                    <div className="ml-7 mr-7 mb-6">
                            <button
                                onClick={() => handleSocialLogin(signInWithGoogle)}
                                className="btn w-1/2 bg-[#0095ffca]">
                                <FcGoogle />
                                Google</button>
                                <button
                            onClick={() => handleSocialLogin(githubLogin)}
                            className="btn w-1/2 text-white bg-[#000000]">
                            <FaGithub />
                            Github</button>
                        </div>
                </div>
            </div>
        </div>
    );
};

export default Login;