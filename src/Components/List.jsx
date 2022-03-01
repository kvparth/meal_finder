import "./List.css";
const List = (props) => {
  return (
    <div className="imgContainer">
      {props.meals.map((item) => (
        <img
          className="img"
          src={item.strMealThumb}
          key={item.idMeal}
          onClick={() => {
            props.onSelect(item);
            props.addIngredients(item);
          
          }}
          alt="ima"
        />
      ))}
    </div>
  );
};
export default List;
