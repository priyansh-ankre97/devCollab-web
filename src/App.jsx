import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import ROUTES from "./utils/routingUrls";
import Profile from "./components/Profile";
import Connections from "./components/Connections";
import Requests from "./components/Requests";

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
              <Route path={ROUTES.PROFILE} element={<Profile />} />
              <Route path={ROUTES.CONNECTIONS} element={<Connections />} />
              <Route path={ROUTES.REQUESTS} element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
