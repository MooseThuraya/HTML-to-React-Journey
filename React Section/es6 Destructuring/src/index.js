// import animals, {useAnimals} from "./data";


// console.log(animals);

// const [cat, dog] = animals; //could call it anything you want, for array
// console.log(cat);

// const {name: catName, sound: catSound} = cat; // can't, must be the same as they are in the object
// const {name: dogName, sound: dogSound} = dog;
// console.log(dogSound);

// //const {name = "Fluffy", sound = "Purr"} = cat; //setting the values, will be default values just in case certain values don't exist.

// const {feedingRequirements: {food, water}} = cat;
// //const {food, water} = feedingRequirements;


// console.log(useAnimals(cat)); //output is an array
// const [animal, makeSound] = useAnimals(cat);
// console.log(animal);
// makeSound();



// CHALLENGE: uncomment the code below and see the car stats rendered
import React from "react";
import ReactDOM from "react-dom";
import cars from "./practice";

const [honda , tesla] = cars;

const { coloursByPopularity: [hondaTopColour]} = honda;
const { coloursByPopularity: [teslaTopColour] } = tesla;

const { speedStats: { topSpeed: hondaTopSpeed } } = honda;
const { speedStats: { topSpeed: teslaTopSpeed } } = tesla;


ReactDOM.render(
  <table>
    <tr>
      <th>Brand</th>
      <th>Top Speed</th>
    </tr>
    <tr>
      <td>{tesla.model}</td>
      <td>{teslaTopSpeed}</td>
      <td>{teslaTopColour}</td>
    </tr>
    <tr>
      <td>{honda.model}</td>
      <td>{hondaTopSpeed}</td>
      <td>{hondaTopColour}</td>
    </tr>
  </table>,
  document.getElementById("root")
);
