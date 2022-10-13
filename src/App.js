import { Redirect, Route, Switch } from "react-router-dom";
import Layout from "./layout/layout";
import Home from "./page/Home";
import Login from "./page/Login";
import Reigster from "./page/Register";
import ForgetPassword from "./page/ForgetPassword";
import ResetPassword from "./page/Resetpassword";
function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/register">
            <Reigster />
          </Route>
          <Route path="/forget_password">
            <ForgetPassword />
          </Route>
          <Route path="/reset_password">
            <ResetPassword />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
