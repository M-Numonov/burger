import React, { useEffect, Suspense } from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Auth from './containers/Auth/Auth';
import {Switch, BrowserRouter, Route,  Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
//import  asyncComponent  from './hoc/asyncComponent/asynComponent';

const Orders =  React.lazy(()=> {
  return import('./containers/Orders/Orders');
});

const Checkout =  React.lazy(()=> {
  return import('./containers/Checkout/Checkout');
});

const App = props => {
  useEffect(()=>{
    props.onTryAutoSignup();
  }, []);
    
  let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
        </Switch>
  )
  if (props.isAuthenticated){
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props}/>} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
        </Switch>
    )
  }
  return (
    <div>
      <BrowserRouter>
        <Layout>      
        <Suspense fallback={<p>Loding...</p>}>{routes}</Suspense>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()=>dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
