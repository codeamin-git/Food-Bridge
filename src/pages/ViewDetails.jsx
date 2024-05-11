import { useLoaderData } from "react-router-dom";


const ViewDetails = () => {
    const food = useLoaderData()
    const { _id, foodImage, foodName, donator, foodQuantity, pickupLocation, expiredDate, additionalNotes } = food

    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col-reverse lg:flex-row-reverse">
            <div>
                <button className="btn-warning btn">Request</button>
            </div>
                <div className="text-center lg:text-left">
                    <div>
                        <h2>Donor Name: {donator.name}</h2>
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