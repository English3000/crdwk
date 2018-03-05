import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route, Link } from 'react-router-dom';
import { Page, ScrollView, View, Text, TextInput, ErrorBoundary } from './utils/elements';
import { signOut } from './actions/auth';
import { search, visit } from './actions/visit';
import AuthHeader from './pages/headers/AuthHeader';
import Home from './pages/Home';
import Profile from './pages/Profile';

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

  render() { console.log(this.props);
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
    const urlLen = location.pathname.length;
    const urlMatch = currentUser ? location.pathname.substring(urlLen - `${currentUser.id}`.length, urlLen) === `${currentUser.id}` : true;

    return [
      <ErrorBoundary key='Header'><div>
        {currentUser ? null : <AuthHeader />}
      </div></ErrorBoundary>,

      <ErrorBoundary key='Page'><div>
        <Page>
          {query === '' || loading && query.length - 1 === 0 ?
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/users/:id' component={Profile}/>
          </Switch> : [
          //implement as SectionList on mobile
          <View key='row-1' style={{flexDirection: 'row'}}>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Projects</Text>
              {this.handleResults(searchResults.orgs, 'orgs')}
            </ScrollView>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Projects</Text>
              {this.handleResults(searchResults.projects, 'projects')}
            </ScrollView>
          </View>,<View key='row-2' style={{flexDirection: 'row'}}>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Users</Text>
              {this.handleResults(searchResults.users, 'users')}
            </ScrollView>
            <ScrollView style={custom.scrollViewStyle}>
              <Text style={custom.titleStyle}>Ideas</Text>
              {this.handleResults(searchResults.ideas, 'ideas')}
            </ScrollView>
          </View> ]}
        </Page>
      </div></ErrorBoundary>,
      //add onHover tooltips
      <ErrorBoundary key='Nav'><div>
        <View style={custom.navStyle}>
          <View style={{width: 87.5, justifyContent: 'space-between', alignItems: 'flex-end'}}>
          {currentUser && !urlMatch && location.pathname !== '/' ? [
            <Text key='Connect' style={custom.connectSym}>&infin;</Text>,
            <i key='Chat' className='fa fa-comments fa-lg'></i>,
            <Text key='placeholder' style={{width: 22}}></Text> ] : null}
          </View>

          <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
            <TextInput placeholder='Search users & orgs'
                       style={{borderRadius: 2.5, paddingRight: 25}}
                       onChange={event => this.handleSearch(event.target.value)}
                       onFocus={event => this.setState({query: event.target.value})}/>

            {query.length === 0 ? location.pathname === homePath ? null :
            <Link to={homePath} onClick={() => this.setState({query: ''})}
              style={{position: 'absolute', marginRight: 5}}>
              <i className='fa fa-home fa-lg' style={{color: 'black'}}></i>
            </Link> : <Text onClick={() => this.setState({query: ''})}
                            style={{position: 'absolute', marginRight: 7.5, fontSize: '1.2em', fontWeight: 500, cursor: 'pointer'}}>&times;</Text>}
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
    const {searches, Search} = this.props;
    const arr = searches[query.length];

    if (!arr || !arr.includes(query.toLowerCase()) && query.length > 0) Search(query);
    this.setState({query});
  }

  handleResults(results, path) {
    return results && results.length > 0 ? results.map(
      item => <Text key={item.key.id} style={{marginBottom: 5}}>
                <Link to={`/${path}/${item.key.id}`}
                      onClick={() => { if (path !== 'users') {
                        this.props.Visit(path, item.key.id).then(
                          () => this.setState({query: ''})
                        );
                      } else { this.setState({query: ''}); } }}>
                  {item.key.name}
                </Link>
              </Text>
    ) : null;
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CRDWK));
