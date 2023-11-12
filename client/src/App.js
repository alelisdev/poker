import React, { useContext } from "react";
import MainLayout from "./layouts/_MainLayout";
import LoadingScreen from "./components/loading/LoadingScreen";
import globalContext from "./context/global/globalContext";
import Routes from "./components/routing/Routes";
import contentContext from "./context/content/contentContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const { isLoading } = useContext(globalContext);
  const { isLoading: contentIsLoading } = useContext(contentContext);

  return (
    <>
      {isLoading || contentIsLoading ? (
        <LoadingScreen />
      ) : (
        <MainLayout>
          <Routes />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </MainLayout>
      )}
    </>
  );
};

export default App;
