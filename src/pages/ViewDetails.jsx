import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import React from "react";


const ViewDetails = () => {
    const food = useLoaderData()
    const { _id, foodImage, foodName, donatorName, donatorEmail,donatorImage, foodQuantity, pickupLocation, expiredDate, additionalNotes } = food

    // modal
    const {user} = useAuth()
    const {
        register,
        watch,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data) =>{
        data.foodQuantity = parseInt(data.foodQuantity)
        const myReqFood = {
            ...data, requester: user?.email, donatorEmail, donatorName, donatorImage, foodStatus: "requested" 
        }
        try {
            const {data} = await axios.put(`${import.meta.env.VITE_API_URL}/reqFood/${_id}`, myReqFood  
            )
            console.log(data);
            toast.success('Requested This Food!')
           
        }
        catch(err){
            console.log(err);
        }
    }

    const getCurrentDate = () => {
        const today = new Date();
        return today.toLocaleDateString();
    };
    React.useEffect(() => {
        setValue("requestDate", getCurrentDate());
    }, []);

    // Watch for changes in the requestDate field
    const requestDate = watch("requestDate");
    

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col-reverse lg:flex-row-reverse">
                {/* request modal */}
                <div>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                    <button className="btn btn-warning" onClick={() => document.getElementById('my_modal_5').showModal()}>Request</button>
                    <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box">
                            {/* modal form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                {/* food name & food image */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Name</span>
                        </label>
                        <input defaultValue={foodName} readOnly
                            {...register("foodName", { required: true })}
                            type="text" placeholder="food name" className="input input-bordered" required />
                        {errors.foodName && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Image</span>
                        </label>
                        <input defaultValue={foodImage} readOnly
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
                        <input defaultValue={foodQuantity} readOnly
                            {...register("foodQuantity", { required: true, min: 1 })}
                            type="number" placeholder="food amount" className="input input-bordered" required />
                        {errors.foodQuantity && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Pickup Location</span>
                        </label>
                        <input defaultValue={pickupLocation} readOnly
                            {...register("pickupLocation", { required: true })}
                            type="text" placeholder="type pickup location" className="input input-bordered" required />
                        {errors.pickupLocation && <span className="text-red-500">This field is required</span>}
                    </div>
                </div>

                {/* expired date & additional notes */}
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Request Date</span>
                        </label>
                        <DatePicker selected={requestDate} 
                
                onChange={(date) => setValue("requestDate", date)}
                {...register("requestDate", {required: true})}
                dateFormat="MM-dd-yyyy" // Set the date format
                className="input input-bordered"
            
            />
                        {errors.requestDate && <span className="text-red-500">This field is required</span>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Expired Date</span>
                        </label>
                        <input defaultValue={expiredDate} readOnly
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
                        <input defaultValue={donatorName} readOnly
                            {...register("donatorName")}
                            type="text" placeholder="food name" className="input input-bordered" />
                             
                    
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Donator Image</span>
                        </label>
                        <input
                        defaultValue={donatorImage} readOnly
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
                        <input defaultValue={donatorEmail} readOnly
                            {...register("donatorEmail")}
                            type="text" placeholder="food name" className="input input-bordered"/>
                             
                       
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Food Status</span>
                        </label>
                        <input
                        defaultValue={food?.foodStatus || 'available'} readOnly
                            {...register("foodStatus")}
                            type="text" placeholder="" className="input input-bordered" />
                             
                        
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text font-medium">Requester</span>
                        </label>
                        <input defaultValue={user?.email} readOnly
                            {...register("requester")}
                            type="text" placeholder="food name" className="input input-bordered"/>
                             
                       
                    </div>
                </div>

                <div className="form-control mt-6">
                    <input type="submit" value="Request" className="btn btn-success " />
                </div>
            </form>
                            <div className="flex justify-center">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-error">Close</button>
                                </form>
                            </div>
                        </div>


                    </dialog>
                </div>
                <div className="text-center lg:text-left">
                    <div>
                        <h2>Donor Name: {donatorName}</h2>
                        <p>Pickup Location: {pickupLocation}</p>
                    </div>
                    <h1 className="text-4xl font-bold">{foodName}</h1>
                    <p>Food Quantity: {foodQuantity}</p>
                    <p>Expire On: {expiredDate}</p>
                </div>
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <img src={foodImage} alt="" className="rounded-xl" />
                </div>
            </div>
        </div>
    );
};

export default ViewDetails;