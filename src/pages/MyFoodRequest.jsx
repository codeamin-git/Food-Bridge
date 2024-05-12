import { useLoaderData } from "react-router-dom";

const MyFoodRequest = () => {
    const reqFood = useLoaderData()
    return (
        <div>
            <h2>request food: {reqFood.length}</h2>
        </div>
    );
};

export default MyFoodRequest;