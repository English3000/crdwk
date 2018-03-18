import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { View, Text, ErrorBoundary } from '../../utils/elements';
import Field from '../../utils/Field';

const mapStateToProps = ({ session }) => ({
  currentUser: session.currentUser,
});
// click on comment to see replies (displayed above it)
// ADD `Delete` button
const Comment = ({ comment, currentUser, author }) => <ErrorBoundary>
  <View style={{flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffff99', borderBottom: '1px solid #ffd24d'}}>
    <Field field='body' item={comment} path='comments' color='transparent'
           multiline='true'/>

    <Link to={`/users/${author.id}`}>
      <View>
        <View style={{height: 25, width: 25, borderRadius: '100%', backgroundColor: 'lightgray',
                      backgroundImage: author.profile_pic}}/>
        <Text>{author.name}</Text>
      </View>
    </Link>

    <Text>{new Date(Date.now()).getDate() === new Date(comment.updated_at).getDate() ?
      new Date(comment.updated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}) :
      new Date(comment.updated_at).toLocaleDateString([], {month: 'short', day: 'numeric'})
    }</Text>
  </View>
</ErrorBoundary>;

export default connect(mapStateToProps)(Comment);
