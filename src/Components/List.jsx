import "./List.css";
const List = (props) => {
  return (
    <div className="imgContainer">
      {props.meals.map((item) => (
        <div className="meal" >
        <img
          className="img"
          src={item.strMealThumb}
          key={item.idMeal}
          onClick={() => {
            props.onSelect(item);
            props.addIngredients(item);
          
          }}
          alt={item.strMeal}
        />
        <div className="meal-info">
          <h3 className="h4">{item.strMeal}</h3>
        </div>
        </div>
      ))}
    </div>
  );
};
export default List;
