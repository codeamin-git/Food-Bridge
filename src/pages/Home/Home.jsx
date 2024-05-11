import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import FeaturedFoods from "./FeaturedFoods";
import axios from "axios";

const Home = () => {
    const [foods, setFoods] = useState([])
    useEffect(()=>{
        const getData = async()=>{
            const {data} = await axios(`${import.meta.env.VITE_API_URL}/featured`);
            setFoods(data)
        }
        getData()
    }, [foods])
    return (
        <div className="">
            <Banner></Banner>
            <div className="grid grid-cols-1 md:grid-cols-3 mt-6 mx-auto gap-6">
                {
                    foods.map(food => 
                        <FeaturedFoods key={food._id} 
                        food={food}
                        ></FeaturedFoods>
                    )
                }
            </div>
        </div>
    );
};

export default Home;