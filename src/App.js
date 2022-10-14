import { Route, Switch } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./page/Home";
import Login from "./page/Login";
import Register from "./page/Register";
import ForgetPassword from "./page/ForgetPassword";
import ResetPassword from "./page/Resetpassword";
function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/forget_password">
            <ForgetPassword />
          </Route>
          <Route path="/reset_password">
            <ResetPassword />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
