import { useEffect, useRef, useState } from "react";
import { Meal } from "./MealList";

export default function useFetchMeal(name: string) {
    const requestRef = useRef<any>();
    const [meals, setMeals] = useState<Meal[]>([])

    useEffect(() => {
    clearTimeout(requestRef.current)
    requestRef.current = setTimeout(() => {
        if(name.length > 2){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
        .then(response => response.json())
        .then(data => {
            setMeals(data?.meals || [])
        })
        }
    },300)
    },[name])

    return meals
}