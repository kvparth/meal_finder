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
  const randomMeal=()=>{
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`).then((response)=>response.json()).then((data)=>{
      handleSelect(data.meals[0]);
      addIngredients(data.meals[0])   
  })
  }
  const addIngredients=(item)=>{
    // console.log(ingredients);
    // console.log(item);
    let addedIngredients = []
  if(item!==null){
    Object.keys(item).forEach((object,i)=>{
      if (item[`strIngredient${i}`]){
         addedIngredients.push(`${item[`strIngredient${i}`]} - ${item[`strMeasure${i}`]}`)
      }
    })
    // console.log('addedIngredients', addedIngredients)
    setIngredients(addedIngredients)
  }
}
  // console.log(ingredients);
  // console.log(meals);
  return (
    <div className="App">
      <h1 style={{color:"221260"}}>Meal Finder</h1>
      <div>
        <form  id="submit">
      <input type="text" value={input} onChange={(e) => handlechange(e)} onSubmit={searchHandle}/>
      </form>
      <button onClick={searchHandle}>Search</button>
      <button onClick={randomMeal}>Shuffle</button>
      </div>
      {meals=== null ? (
        <div><h3>No Result Found TRY AGAIN!</h3></div>
      ) : (
        <List meals={meals} onSelect={handleSelect}
        addIngredients={addIngredients} />
      )}
      {select !== null   && <div>
        <h1>{select?.strMeal}</h1>
        <img id="single-meal" src={select?.strMealThumb} alt="img" />
        <div>
          <p>Category:{select?.strCategory}</p>
          <p>Region:{select?.strArea}</p>
        </div>
        <p>{select?.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul>
          {ingredients.map((ing)=><li key={Math.random()*20}>{ing}</li>)}
        </ul>
        </div>}
    </div>
  );
}
