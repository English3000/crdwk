import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { View, Text, ErrorBoundary } from '../../utils/elements';
import Field from '../../utils/Field';

const mapStateToProps = ({ session, data }, { comment }) => ({
  currentUser: session.currentUser,
  author: data.users[comment.user_id]
});
// click on comment to see replies (displayed above it)
const Comment = ({ comment, currentUser, author }) => <ErrorBoundary>
  <View style={{flexDirection: 'column'}}>
    <Field field='body' item={comment} path='comments' multiline='true'/>

    <Link to={`/users/${author.id}`}>
      <View style={{height: 25, width: 25, borderRadius: '100%',
                    backgroundImage: author.profile_pic}}/>
      <Text>{author.name}</Text>
    </Link>

    <Text>{new Date(Date.now()).getDate() === new Date(comment.updated_at).getDate() ?
      new Date(comment.updated_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true}) :
      new Date(comment.updated_at).toLocaleDateString([], {month: 'short', day: 'numeric'})
    }</Text>
  </View>
</ErrorBoundary>;

export default connect(mapStateToProps)(Comment);
