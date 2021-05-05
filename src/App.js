import React, { useState, useContext, useEffect, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { FirebaseContext } from './components/firebase';
import ScrollToTop from './components/mainpage/ScrollToTop';
import HomePage from './components/mainpage/HomePage';
import Main from './components/mainpage/Main';
import SignUp from './components/ui/SignUp';
import LogIn from './components/ui/LogIn';
import PageTemplate from './components/PageTemplate';
import ForgetPassword from './components/ui/ForgetPassword';
import AddSection from './components/ui/AddSection';


function App() {

  const contextFirebase = useContext(FirebaseContext);

  const [userSession, setUserSession] = useState(null);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    document.getElementsByTagName('body').body.classList.add('is-preload');
  }, [contextFirebase])

  useEffect(() => {

    let listener = contextFirebase.auth.onAuthStateChanged((user) => {
      user ? (setUserSession(user)) : setUserSession(false)
    })

    if (userSession !== null && userSession !== false) {
      contextFirebase.userData(userSession.uid)
        .get()
        .then((user) => {
          if (user && user.exists) {
            setUserData(user.data())
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }

    return () => {
      listener()
    }
  }, [contextFirebase, userSession])

  return userSession === null ? (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Fragment>
            <div id="wrapper">
              <div className='loader'>
                <div>
                </div>
              </div>
            </div>
          </Fragment>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </ScrollToTop>
    </ BrowserRouter>
  )
    : (
      <BrowserRouter>
        <ScrollToTop>
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/main' render={() => (userSession ? (<Main userData={userData} />) : (<Redirect to='/' />))} />
            <Route path='/intro' render={() => (userSession ? (<Main userData={userData} />) : (<Redirect to='/' />))} />
            <Route path='/first' render={() => (userSession ? (<Main userData={userData} />) : (<Redirect to='/' />))} />
            <Route path='/second' render={() => (userSession ? (<Main userData={userData} />) : (<Redirect to='/' />))} />
            <Route path='/cta' render={() => (userSession ? (<Main userData={userData} />) : (<Redirect to='/' />))} />
            <Route path='/signup' render={() => (userSession ? (<Redirect to='/main' />) : (<SignUp />))} />
            <Route path='/login' render={() => (userSession ? (<Redirect to='/main' />) : (<LogIn />))} />
            <Route path='/forgetpassword' render={() => (userSession ? (<Redirect to='/main' />) : (<ForgetPassword />))} />
            <Route path='/pagetemplate' render={() => (userSession ? (<PageTemplate />) : (<Redirect to='/' />))} />
            <Route path='/addsection' render={() => (userSession ? (<AddSection />) : (<Redirect to='/' />))} />
          </Switch>
        </ScrollToTop>
      </ BrowserRouter>
    )
}

export default App;
