import { createContext, useReducer, useContext } from "react";

const cartContext = createContext(null);

export const useCart = () => {
  return useContext(cartContext);
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
          qty: action.qty,
          size: action.size,
          img: action.img,
          price: action.price,
        },
      ];
      break;

    case "UPDATE":
      let arr = [...state];
      arr.find((food, index) => {
        if (food.id === action.id) {
          console.log(
            food.qty,
            parseInt(action.qty),
            action.price + food.price
          );
          arr[index] = {
            ...food,
            qty: parseInt(action.qty) + food.qty,
            price: action.price + food.price,
          };
        }
        return arr;
      });
      return arr;

    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
      break;

    case "DROP":
      let empArray = [];
      return empArray;

    default:
      console.log("error in reducer");
      break;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <cartContext.Provider value={{ state, dispatch }}>
      {children}
    </cartContext.Provider>
  );
};
