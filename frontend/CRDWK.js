import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { Page, View, Text, TextInput, ErrorBoundary } from './utils/elements';
import { AuthRoute } from './utils/routing';
import { signOut } from './actions/auth';
import { findUsers } from './actions/visit';
import AuthHeader from './pages/headers/AuthHeader';
import NewUserForm from './pages/headers/NewUserForm';
import Home from './pages/Home';
import Profile from './pages/Profile';

const mapStateToProps = ({ users, session, searches }) => ({
  users, session, searches
});

const mapDispatchToProps = dispatch => ({
  FindUsers: query => dispatch(findUsers(query)),
  SignOut: () => dispatch(signOut())
});

const navStyle = { justifyContent: 'space-between', alignItems: 'end',
                   position: 'fixed', bottom: 7.5, width: '100%',
                   margin: '0 -5px' };

class CRDWK extends React.Component {
  constructor() {
    super();
    this.state = {query: ''};
  }

  render() {
    const {users, SignOut, location} = this.props;
    const {currentUser, loading} = this.props.session;
    const {query} = this.state;

    const searchResults = Object.values(users).filter(user => user.name ?
      user.name.toLowerCase().includes(query.toLowerCase()) : false);

    const homePath = currentUser ? `/users/${currentUser.id}` : '/';

    return [
      <ErrorBoundary key='Header'>
        {currentUser ? currentUser.name ?
          null : <NewUserForm currentUser={currentUser}/> : <AuthHeader />}
      </ErrorBoundary>,
      // v- add styling -v
      <ErrorBoundary key='Page'>
        <Page>
          {query === '' || loading && query.length - 1 === 0 ?
          <Switch>
            <AuthRoute exact path='/' component={Home}/>
            <Route exact path='/users/:id' component={Profile}/>
          </Switch> :

          searchResults.length > 0 ? searchResults.map(user => (
            <Link key={user.id} to={`/users/${user.id}`}
                  onClick={() => this.setState({query: ''})}>
              {user.name}
            </Link>
          )) : <Text>No results found.</Text>}
        </Page>
      </ErrorBoundary>,

      <ErrorBoundary key='Nav'>
        <View style={navStyle}>
          <View style={{width: 20}}></View>

          <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
            <TextInput placeholder='Search for users...'
                       style={{borderRadius: 2.5, paddingRight: 25, boxShadow: '0 0 2.5px #ffd24d'}}
                       onChange={event => this.handleSearch(event.target.value)}
                       onFocus={event => this.setState({query: event.target.value})}/>

            {location.pathname === homePath ? null :
            <Link to={homePath} onClick={() => this.setState({query: ''})}
              style={{position: 'absolute', marginRight: 5}}>
              <i className='fa fa-home fa-lg' style={{color: 'black'}}></i>
            </Link>}
          </View>

          <View style={{width: 20}}>
            {currentUser ? <i className='fa fa-sign-out fa-lg' style={{cursor: 'pointer'}}
                              onClick={() => { SignOut(); this.setState({query: ''}); }}></i> : null}
          </View>
        </View>
      </ErrorBoundary>
    ];
  }

  handleSearch(query) {
    const {searches, FindUsers} = this.props;

    if (!searches.includes(query.toLowerCase()) && query.length > 0) FindUsers(query); //can't chain .then
    this.setState({query});
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CRDWK));
