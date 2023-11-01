import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import MainLayout from "./layouts/_MainLayout";
import LoadingScreen from "./components/loading/LoadingScreen";
import globalContext from "./context/global/globalContext";
import Routes from "./components/routing/Routes";
import contentContext from "./context/content/contentContext";
import Text from "./components/typography/Text";
import modalContext from "./context/modal/modalContext";
import config from "./clientConfig";
import GoogleAnalytics from "./components/analytics/GoogleAnalytics";
import "./App.css";

const App = () => {
  const { isLoading, chipsAmount } = useContext(globalContext);
  const history = useHistory();
  const { openModal, closeModal } = useContext(modalContext);
  const { isLoading: contentIsLoading } = useContext(contentContext);

  function showFreeChipsModal() {
    openModal(
      () => (
        <Text textAlign="center">
          Oh noes, it seems like you're running out of balance! You should
          deposit some balance into your account so you can continue playing!
        </Text>
      ),
      `Deposit`,
      `OK`,
      handleFreeChipsRequest
    );
  }

  const handleFreeChipsRequest = async () => {
    closeModal();
    history.push("/payments");
  };

  useEffect(() => {
    chipsAmount !== null &&
      chipsAmount < 0.01 &&
      !isLoading &&
      !contentIsLoading &&
      setTimeout(showFreeChipsModal, 2000);
    // eslint-disable-next-line
  }, [chipsAmount, isLoading, contentIsLoading]);

  return (
    <>
      {isLoading || contentIsLoading ? (
        <LoadingScreen />
      ) : (
        <MainLayout>
          <Routes />
        </MainLayout>
      )}
      {config.isProduction && <GoogleAnalytics />}
    </>
  );
};

export default App;
