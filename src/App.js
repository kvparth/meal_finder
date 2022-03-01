import axios from "axios";
import {useState } from "react";
import List from "./Components/List";
import "./App.css";

export default function App() {
  const [input, setInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [select, setSelect] = useState(null);
  const [ingredients,setIngredients]=useState([]);
  const handlechange = (event) => {
    setInput(event.target.value);
  };
  const searchHandle = async () => {
    if(input){
      const response = await axios(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
      );
      setMeals(response.data.meals);
    } 
  };
  const handleSelect = (item) => {
    setSelect(item);
  };
  const addIngredients=(item)=>{
    console.log(ingredients);
    console.log(item);
    let addedIngredients = []
  if(item!==null){
    Object.keys(item).forEach((object,i)=>{
      if (item[`strIngredient${i}`]){
         //setIngredients([...ingredients,`${item[`strIngredient${i}`]} - ${item[`strMeasure${i}`]}`])
         addedIngredients.push(`${item[`strIngredient${i}`]} - ${item[`strMeasure${i}`]}`)
      }
    })
    console.log('addedIngredients', addedIngredients)
    setIngredients(addedIngredients)
  }
}
  console.log(ingredients);
  console.log(meals);
  return (
    <div className="App">
      <h1>Meal Finder</h1>
      <input type="text" value={input} onChange={(e) => handlechange(e)} />
      <button onClick={searchHandle}>Search</button>
      {meals=== null ? (
        <div>No Data Found</div>
      ) : (
        <List meals={meals} onSelect={handleSelect}
        addIngredients={addIngredients} />
      )}
      {select !== null   && <div>
        <h1>{select?.strMeal}</h1>
        <img src={select?.strMealThumb} alt="img" />
        <div>
          <p>Category:{select?.strCategory}</p>
          <p>Region:{select?.strArea}</p>
        </div>
        <p>{select?.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((ing)=><li>{ing}</li>)}
        </ul>
        </div>}
    </div>
  );
}
