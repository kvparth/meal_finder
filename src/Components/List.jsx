import React,{useState} from "react";
import "./List.css";
const List = (props) => {
  const [toggle,setToggle]=useState(null);
  function changeBackground(id) {
    setToggle(id);
    
  }
  function changeBackground1(e) {
    setToggle(null);
  }

  return (
    <div className="imgContainer">
      {props.meals.map((item) => (
        <div className="meal" key={item.idMeal} 
        onMouseEnter ={()=>changeBackground(item.idMeal)}
        onMouseLeave={changeBackground1}>
          <img
            className="img"
            src={item.strMealThumb}
            onClick={() => {
              props.onSelect(item);
              props.addIngredients(item);
          
          }}
          alt={item.strMeal}
        />
          {item.idMeal===toggle && <div className="meal-info">
          <h3 className="desc">{item.strMeal}</h3>
        </div>}
        </div>
      ))}
    </div>
  );
};
export default List;
