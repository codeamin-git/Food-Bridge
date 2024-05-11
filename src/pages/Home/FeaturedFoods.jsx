import { Link } from "react-router-dom";

const FeaturedFoods = ({ food }) => {
    const {_id, foodImage, foodName, donatorImage, donatorName, foodQuantity, pickupLocation, expiredDate, additionalNotes } = food
    return (
        <div className="card card-compact bg-base-100 shadow-xl">
            <figure><img src={foodImage} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{foodName}</h2>
                <p>{pickupLocation}</p>
                <p>{expiredDate}</p>
                <p>{additionalNotes}</p>
                <div className="flex items-center justify-start border rounded-xl gap-2">
                    <p>Donator: </p>
                    <img src={donatorImage} alt="" className="w-10 rounded-full"/>
                    <p>{donatorName}</p>
                </div>
                <div className="card-actions justify-center">
                    <Link to={`/food/${_id}`}>
                    <button className="btn btn-info">View Details</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FeaturedFoods;