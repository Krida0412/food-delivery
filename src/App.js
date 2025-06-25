import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AppRoutes from "./routes"; // ini nanti ambil index.jsx
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";

const App = () => {
  const [{ foodItems }, dispatch] = useStateValue();

  const fetchData = async () => {
    const data = await getAllFoodItems();
    dispatch({
      type: actionType.SET_FOOD_ITEMS,
      foodItems: data,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AnimatePresence mode="wait">
      <AppRoutes />
    </AnimatePresence>
  );
};

export default App;
