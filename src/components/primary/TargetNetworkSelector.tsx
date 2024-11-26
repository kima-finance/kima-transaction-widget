import React from "react";
const PizzaDropdown = () => {
  const pizzas = ["Margherita", "Pepperoni", "Hawaiian", "BBQ Chicken"];
  return (
    <select>
      {pizzas.map((pizza) => (
        <option key={pizza}>{pizza}</option>
      ))}
    </select>
  );
};
export default PizzaDropdown;
