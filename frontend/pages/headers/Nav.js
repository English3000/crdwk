import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { AuthRoute } from '../../utils/routing';
import { Page, View, Text, TextInput, ErrorBoundary } from '../../utils/elements';
import { signOut } from '../../actions/auth';
import Home from '../Home';
import Profile from '../Profile';

const mapStateToProps = ({ users, session }) => ({
  users, currentUser: session.currentUser
});

const mapDispatchToProps = dispatch => ({
  SignOut: () => dispatch(signOut())
});

const custom = {
  pageStyle: { display: 'flex', flexDirection: 'column',
               justifyContent: 'center', alignItems: 'center',
               fontSize: 50, backgroundColor: '#ffffe6',
               height: window.innerHeight },
  navStyle: { position: 'fixed', bottom: 7.5, width: '100%', margin: '0 -5px',
              justifyContent: 'space-between', alignItems: 'end' }
};

class Nav extends React.Component {
  constructor() {
    super();
    this.state = {query: ''};
  }

  render() {
    const {currentUser, users, SignOut, location} = this.props;
    const {query} = this.state;
    //could store user's X most recent selections (as default search results)
    //on search, could send back cached search result, then search db & cache & return that result

    const searchResults = Object.values(users).filter(user => user.name ?
      user.name.toLowerCase().includes(query.toLowerCase()) : false);

    return [
      query === '' ?
      <ErrorBoundary key='Page'>
        <Page style={custom.pageStyle}>
          <Switch>
            <AuthRoute exact path='/' component={Home}/>
            <Route exact path='/users/:id' component={Profile}/>
          </Switch>
        </Page>
      </ErrorBoundary> :

      <View key='Page' style={{flexDirection: 'column', backgroundColor: '#ffffe6', height: window.innerHeight}}>
        {searchResults.length > 0 ?
        searchResults.map(user => <Link to={`/users/${user.id}`}>{user.name}</Link> ) :
        <Text>No results found.</Text>}
      </View>,

      <View key='Nav' style={custom.navStyle}>
        <View style={{width: 20}}></View>

        <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
          <TextInput style={{borderRadius: 2.5, paddingRight: 25}}
                     placeholder='Search for users...'
                     onChange={event => this.setState({query: event.target.value})}
                     onFocus={event => this.setState({query: event.target.value})}
                     onBlur={() => this.setState({query: ''})}/>
          {!currentUser && location.pathname !== '/' ?
          <Link to={'/'} style={{position: 'fixed', marginRight: 5}}>
            <i className='fa fa-home fa-lg' style={{color: 'black'}}></i>
          </Link> : null}
        </View>

        <View style={{width: 20}}>
          {currentUser ? <i className='fa fa-sign-out fa-lg' style={{cursor: 'pointer'}}
                            onClick={SignOut}></i> : null}
        </View>
      </View>
    ];
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
