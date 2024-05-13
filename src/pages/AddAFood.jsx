import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

const AddAFood = () => {
    const {user} = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) =>{
        data.foodQuantity = parseInt(data.foodQuantity)
        console.log(data);
        const newFood = {
            ...data, donatorEmail: user?.email, donatorName: user?.displayName, donatorImage: user?.photoURL, foodStatus: "available" 
        }
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/addFood`, newFood)
            if(data?.insertedId){
                toast.success('Your Food Added!')
                console.log(data);
            }
            console.log(data);
        }
        catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <Helmet>
                <title>Food Bridge | Add A Food</title>
            </Helmet>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                {/* food name & food image */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Name</span>
                        </label>
                        <input
                            {...register("foodName", { required: true })}
                            type="text" placeholder="food name" className="input input-bordered" required />
                        {errors.foodName && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Image</span>
                        </label>
                        <input
                            {...register("foodImage", { required: true })}
                            type="text" placeholder="food image URL" className="input input-bordered" required />
                        {errors.foodImage && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                {/* food quantity & pickup location */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Quantity</span>
                        </label>
                        <input
                            {...register("foodQuantity", { required: true, min: 1 })}
                            type="number" placeholder="food amount" className="input input-bordered" required />
                        {errors.foodQuantity && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Pickup Location</span>
                        </label>
                        <input
                            {...register("pickupLocation", { required: true })}
                            type="text" placeholder="type pickup location" className="input input-bordered" required />
                        {errors.pickupLocation && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                {/* expired date & additional notes */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Expired Date</span>
                        </label>
                        <input
                            {...register("expiredDate", { required: true })}
                            type="date" placeholder="food name" className="input input-bordered" required />
                        {errors.expiredDate && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Additional Notes</span>
                        </label>
                        <input
                            {...register("additionalNotes", { required: true })}
                            type="text" placeholder="type additional notes here" className="input input-bordered" required />
                        {errors.additionalNotes && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                {/* donator name, image */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Donator Name</span>
                        </label>
                        <input defaultValue={user?.displayName} readOnly
                            {...register("donatorName")}
                            type="text" placeholder="food name" className="input input-bordered" />
                             
                    
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Donator Image</span>
                        </label>
                        <input
                        defaultValue={user?.photoURL} readOnly
                            {...register("donatorImage", { required: true })}
                            type="text" placeholder="" className="input input-bordered"/>
                            
                    
                    </div>
                </div>

                {/* donator email & food status */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Donator Email</span>
                        </label>
                        <input defaultValue={user?.email} readOnly
                            {...register("donatorEmail")}
                            type="text" placeholder="food name" className="input input-bordered"/>
                             
                       
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Status</span>
                        </label>
                        <input
                        defaultValue="available" readOnly
                            {...register("foodStatus")}
                            type="text" placeholder="" className="input input-bordered" />
                             
                        
                    </div>
                </div>

                <div className="form-control mt-6">
                    <input type="submit" value="Add Food" className="btn btn-accent " />
                </div>
            </form>
        </div>
    );
};

export default AddAFood;