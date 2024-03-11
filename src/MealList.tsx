export interface Meal {
  strMeal: string
}

interface MealListProps {
  meals: Meal[]
}

function MealList(props: MealListProps) {
  return (
    <ol>
      {props.meals.map((meal, index) => (
        <li key={index}>{meal.strMeal}</li>
      ))}
    </ol>
  )
}
export default MealList
