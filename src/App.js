import axios from "axios";
import {useState } from "react";
import List from "./Components/List";
import "./App.css";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  const [input, setInput] = useState("");
  const [meals, setMeals] = useState([]);
  const [select, setSelect] = useState(null);
  const [ingredients,setIngredients]=useState([]);
  const [isClick,setIsClick]=useState(false);
  const handlechange = (event) => {

    setInput(event.target.value);
  };
  const searchHandle = async () => {
    
    if(input){
      setIsClick(true);
      const response = await axios(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`
      );
      setMeals(response.data.meals);
    }
    else{
      alert("Please Enter a Search Keyword");
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
      <button onClick={searchHandle} className="search-btn">Search</button>
      <button onClick={randomMeal}>Shuffle</button>
      </div>
      {isClick && <div className="result-heading"><h2>Search result for "{input}"</h2></div>}
      {meals=== null ? (
        <div className="result-heading"><h3>No Result Found TRY AGAIN!</h3></div>
      ) : (
        <div>
        <List meals={meals} onSelect={handleSelect}
        addIngredients={addIngredients} />
        </div>
      )}
      {select !== null   && <div>
        <h1>{select?.strMeal}</h1>
        <img id="single-meal" src={select?.strMealThumb} alt="img" />
        <div id="details" className="method">
          <h4>Category:{"             "+select?.strCategory}</h4>
          <h4>Region:{"               "+select?.strArea}</h4>
        </div>
        <p className="method">{select?.strInstructions}</p>
        <h2>Ingredients</h2>
        <ul id="ing" className="method">
          {ingredients.map((ing)=><li id="list" key={Math.random()*20}>{ing}</li>)}
        </ul>
        </div>}
    </div>
  );
}
