import React from 'react';
import { connect } from 'react-redux';
import Field from '../utils/Field';
import Idea from './components/Idea';
import Comment from './components/Comment';

const mapStateToProps = ({ data }, { match }) => ({
  parent: data.ideas[match.params.id],
  ideas: data.ideas,
  comments: data.comments,
  users: data.users
});

const Page = ({ parent, ideas, comments, users }) => {
  const versions = []; //"Stack"
  let current = parent;
  while (current) {
    versions.unshift(current);
    current = ideas[current.child_id];
  }

  return Object.keys(comments).length > 0 ? [
    <Field key='commentForm' field='body' path='comments' item={{}} isForm={true}
           ideaId={parent.id} multiline='true' text={{width: 175}} style={{marginBottom: 0}}/>,

    versions.map((item, index) => {
      return [
        item.comments.map(
          id => <Comment key={`comment${id}`} comment={comments[id]}
                         author={users[comments[id].user_id]}/>
        ),<Idea key={`idea${item.id}`} id={`${index}`} idea={ideas[item.id]}/>
      ];
    })
  ] : null;
};

export default connect(mapStateToProps)(Page);
