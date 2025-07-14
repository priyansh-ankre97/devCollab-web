import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import ROUTES from "./utils/routingUrls";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename={ROUTES.DEFAULT}>
          <Routes>
            <Route path={ROUTES.DEFAULT} element={<Body />}>
              <Route path={ROUTES.DEFAULT} element={<Feed />} />
              <Route path={ROUTES.LOGIN} element={<Login />} />
              <Route path={ROUTES.SIGNUP} element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
