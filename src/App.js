import React, { useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import AppRoutes from "./routes"; // rute utama
import { useStateValue } from "./context/StateProvider";
import { getAllFoodItems } from "./utils/firebaseFunctions";
import { actionType } from "./context/reducer";
import { Toaster } from "react-hot-toast"; // ← Tambahan

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
    <>
      <Toaster
        position="top-right"
        toastOptions={{ duration: 3000 }}
      />
      <AnimatePresence mode="wait">
        <AppRoutes />
      </AnimatePresence>
    </>
  );
};

export default App;
