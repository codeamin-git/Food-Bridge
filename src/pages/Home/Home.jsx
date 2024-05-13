import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import FeaturedFoods from "./FeaturedFoods";
import axios from "axios";
import ImpactSection from "./ImpactSection";
import EventsSection from "./EventsSection";
import {Helmet} from "react-helmet-async"

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
            <Helmet>
                <title>Food Bridge | Home</title>
            </Helmet>
            <h1 className="text-center text-3xl my-6">Food Bridge: Nourishing Communities, One Meal at a Time</h1>
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
            <ImpactSection></ImpactSection>
            <EventsSection></EventsSection>
        </div>
    );
};

export default Home;