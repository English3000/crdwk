import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { Page, ScrollView, View, Text, TextInput, ErrorBoundary } from './utils/elements';
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
  connectSym: {fontSize: 32, height: 23.5, fontWeight: 600, position: 'relative', top: -2.5},
  scrollViewStyle: { width: window.innerWidth * 0.5, alignItems: 'center',
                     height: (window.innerHeight - 85.5) * 0.5 },
  titleStyle: {fontWeight: 700, marginBottom: 10, marginTop: 5}
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
    //get Users, Ideas, Projects, & Orgs on same request (b/c assoc'd)
    Object.values(users).filter(user => user.name ?
      user.name.toLowerCase().includes(query.toLowerCase()) : false)
    .forEach(user => {searchResults.push({key: user});});

    const homePath = currentUser ? `/users/${currentUser.id}` : '/';

    return [
      <ErrorBoundary key='Header'><div>
        {currentUser ? currentUser.name ?
          null : <NewUserForm currentUser={currentUser}/> : <AuthHeader />}
      </div></ErrorBoundary>,

      <ErrorBoundary key='Page'><div>
        <Page>
          {query === '' || loading && query.length - 1 === 0 ?
          <Switch>
            <AuthRoute exact path='/' component={Home}/>
            <Route exact path='/users/:id' component={Profile}/>
          </Switch> :
          //implement as SectionList on mobile
          searchResults.length > 0 ? [ <View key='row-1' style={{flexDirection: 'row'}}>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Projects</Text>
            </ScrollView>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Ideas</Text>
            </ScrollView>
          </View>, <View key='row-2' style={{flexDirection: 'row'}}>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Users</Text>
              {searchResults.map(item => <Text style={{marginBottom: 5}}>
              <Link key={item.key.id} to={`/users/${item.key.id}`}
                    onClick={() => this.setState({query: ''})}>
                {item.key.name}
              </Link>
            </Text>)}</ScrollView>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Orgs</Text>
            </ScrollView>
          </View> ] : <Text>No results found.</Text>}
        </Page>
      </div></ErrorBoundary>,
      //add onHover tooltips
      <ErrorBoundary key='Nav'><div>
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
            <i key='Build' className='fa fa-plus fa-lg'></i>, //links to Build page
            <i key='SignOut' className='fa fa-sign-out fa-lg' style={{cursor: 'pointer'}}
               onClick={() => { SignOut(); this.setState({query: ''}); }}></i> ] : null}
          </View>
        </View>
      </div></ErrorBoundary>
    ];
  }

  handleSearch(query) {
    const {searches, FindUsers} = this.props;

    if (!searches.includes(query.toLowerCase()) && query.length > 0) FindUsers(query); //can't chain .then
    this.setState({query});
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CRDWK));
