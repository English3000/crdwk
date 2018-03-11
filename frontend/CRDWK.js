import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { Page, ScrollView, View, Text, TextInput, ErrorBoundary } from './utils/elements';
import { signOut } from './actions/auth';
import { search, visit } from './actions/visit';
import AuthHeader from './pages/headers/AuthHeader';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Idea from './pages/Idea';

const mapStateToProps = ({ data, session, searches }) => ({
  data, session, searches
});

const mapDispatchToProps = dispatch => ({
  Search: query => dispatch(search(query)),
  Visit: (path, id) => dispatch(visit(path, id)),
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

  componentWillReceiveProps(newProps) {
    if (!this.props.session.currentUser && newProps.session.currentUser) {
      this.setState({query: ''});
    }
  }

  render() {
    const {data, SignOut, location, history} = this.props;
    const {currentUser, loading} = this.props.session;
    const {query} = this.state;

    const searchResults = {};

    Object.keys(data).forEach(category => {
      searchResults[category] = [];
      Object.values(data[category]).filter(item => item.name ?
        item.name.toLowerCase().includes(query.toLowerCase()) : false)
      .forEach(result => {searchResults[category].push({key: result});});
    });

    const homePath = currentUser ? `/users/${currentUser.id}` : '/';
    const url = location.pathname;
    function urlMatch(path, id) {
      return currentUser ? url.substring(
        url.length - `${id}`.length, url.length
      ) === `${id}` && url.includes(path) : true;
    }

    return [
      <ErrorBoundary key='Header'><div>
        {currentUser ? null : <AuthHeader />}
      </div></ErrorBoundary>,

      <ErrorBoundary key='Page'><div>
        <Page style={{paddingTop: 10}}>
          {query === '' || loading && query.length - 1 === 0 ? <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/users/:id' component={Profile}/>
            <Route exact path='/ideas/:id' component={Idea}/>
          </Switch> : [ //implement as SectionList on mobile

          <View key='row-1' style={{flexDirection: 'row'}}>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Projects</Text>
              {this.handleResults(searchResults.orgs, 'orgs')}
            </ScrollView>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Projects</Text>
              {this.handleResults(searchResults.projects, 'projects')}
            </ScrollView>
          </View>,
          <View key='row-2' style={{flexDirection: 'row'}}>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Users</Text>
              {this.handleResults(searchResults.users, 'users')}
            </ScrollView>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Ideas</Text>
              {this.handleResults(searchResults.ideas.filter(idea => idea.key.active), 'ideas')}
            </ScrollView>
          </View> ]}
        </Page>
      </div></ErrorBoundary>,
      //add onHover tooltips
      <ErrorBoundary key='Nav'><div>
        <View style={custom.navStyle}>
          <View style={{width: 115, justifyContent: 'space-between', alignItems: 'flex-end'}}>
          {currentUser ? !urlMatch('users', currentUser.id) && url.includes('users') ? [
            <Text key='Connect' style={custom.connectSym}>&infin;</Text>,
            <i key='Chat' className='fa fa-comments fa-lg'></i>,
            <Text key='placeholder' style={{width: 60}}></Text> ] :
          urlMatch('users', currentUser.id) ||
          data.users[currentUser.id].ideas.some(id => urlMatch('ideas', id)) ? [
            <i key='Delete' className='fa fa-trash fa-lg'></i>,
            <i key='Archive' className='fa fa-inbox fa-lg'></i>,
            <Text key='placeholder' style={{width: 60}}></Text>
          ] : null : null}
          </View>

          <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
            <TextInput placeholder='Search users & orgs'
                       style={{borderRadius: 1, paddingRight: 25}}
                       onChange={event => this.handleSearch(event.target.value)}
                       onFocus={event => this.setState({query: event.target.value})}/>

            {query.length === 0 ? url === homePath ? null :
            <Link to={homePath} onClick={() => this.setState({query: ''})}
              style={{position: 'absolute', marginRight: 5}}>
              <i className='fa fa-home fa-lg' style={{color: 'black'}}></i>
            </Link> : <Text onClick={() => this.setState({query: ''})}
                            style={{position: 'absolute', marginRight: 7.5, fontSize: '1.2em', fontWeight: 500, cursor: 'pointer'}}>&times;</Text>}
          </View>

          <View style={{width: 115, justifyContent: 'space-between'}}>{currentUser ? [
            <i key='MyOrgs' className='fa fa-briefcase fa-lg'></i>,
            <i key='Mail' className='fa fa-envelope fa-lg'></i>,
            <i key='Build' className='fa fa-plus fa-lg'></i>, //links to Build page
            <i key='SignOut' className='fa fa-sign-out fa-lg' style={{cursor: 'pointer'}}
               onClick={() => { SignOut(); this.setState({query: ''}); }}></i> ] : null}
          </View>
        </View>
      </div></ErrorBoundary>
    ];
  }

  handleSearch(query) {
    const {searches, Search} = this.props;
    const arr = searches[query.length];

    if (!arr || !arr.includes(query.toLowerCase()) && query.length > 0) Search(query);
    this.setState({query});
  }

  handleResults(results, path) {
    return results && results.length > 0 ? results.map(
      item => <Link key={item.key.id} style={{marginBottom: 5}}
                    to={`/${path}/${item.key.id}`}
                    onClick={() => this.props.Visit(path, item.key.id).then(
                             () => this.setState({query: ''}) )}>
                {item.key.name}
              </Link>
    ) : null;
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CRDWK));
