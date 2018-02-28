import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { Page, FlatList, View, Text, TextInput, ErrorBoundary } from './utils/elements';
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

const custom = {
  navStyle: { justifyContent: 'space-between', alignItems: 'flex-end',
              position: 'fixed', bottom: 7.5, width: '97.5%', margin: '0 1.25%' },
  connectSym: {fontSize: 32, height: 23.5, fontWeight: 600, position: 'relative', top: -2.5}
};

class CRDWK extends React.Component {
  constructor() {
    super();
    this.state = {query: ''};
  }

  render() {
    const {users, SignOut, location} = this.props;
    const {currentUser, loading} = this.props.session;
    const {query} = this.state;

    const searchResults = [];
    Object.values(users).filter(user => user.name ?
      user.name.toLowerCase().includes(query.toLowerCase()) : false)
    .forEach(user => {searchResults.push({key: user});});

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
          //implement as SectionList on mobile (4 "FlatLists" on web)
          searchResults.length > 0 ?
          <FlatList Itemdata={searchResults} Itemrender={data => data.map(item => (
            <Link key={item.key.id} to={`/users/${item.key.id}`}
                  onClick={() => this.setState({query: ''})}>
              {item.key.name}
            </Link>
          ))}/> : <Text>No results found.</Text>}
        </Page>
      </ErrorBoundary>,
      //add onHover tooltips
      <ErrorBoundary key='Nav'>
        <View style={custom.navStyle}>
          <View style={{width: 87.5, justifyContent: 'space-between', alignItems: 'flex-end'}}>
          {currentUser && location.pathname[location.pathname.length - 1] !== `${currentUser.id}` ? [
            <Text key='Connect' style={custom.connectSym}>&infin;</Text>,
            <i key='Chat' className='fa fa-comments fa-lg'></i>,
            <Text key='placeholder' style={{width: 22}}></Text> ] : null}
          </View>

          <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
            <TextInput placeholder='Search users & orgs'
                       style={{borderRadius: 2.5, paddingRight: 25}}
                       onChange={event => this.handleSearch(event.target.value)}
                       onFocus={event => this.setState({query: event.target.value})}/>

            {location.pathname === homePath ? null :
            <Link to={homePath} onClick={() => this.setState({query: ''})}
              style={{position: 'absolute', marginRight: 5}}>
              <i className='fa fa-home fa-lg' style={{color: 'black'}}></i>
            </Link>}
          </View>

          <View style={{width: 87.5, justifyContent: 'space-between'}}>{currentUser ? [
            <i key='MyOrgs' className='fa fa-briefcase fa-lg'></i>,
            <i key='NewOrg' className='fa fa-sitemap fa-lg'></i>,
            <i key='SignOut' className='fa fa-sign-out fa-lg' style={{cursor: 'pointer'}}
               onClick={() => { SignOut(); this.setState({query: ''}); }}></i> ] : null}
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
