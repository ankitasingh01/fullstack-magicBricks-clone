import { Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Navbar from "./components/Navbar";
import ListedProperties from "./components/ListedProperties";
import store from "./components/reduxState/store";
import FrontPropertyPage from "./components/FrontPropertyPage";
// import { ListedPropertiesContextProvider } from "./components/context/ListedPropertiesContextProvider";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Navbar />
        {/* <ListedPropertiesContextProvider> */}
        <Routes>
          <Route path="/" element={<FrontPropertyPage />} />
          {/* <Route path="/" element={<ListedProperties />} /> */}
        </Routes>
        {/* </ListedPropertiesContextProvider> */}
      </Provider>
    </div>
  );
}

export default App;
