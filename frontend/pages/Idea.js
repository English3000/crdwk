import React from 'react';
import { connect } from 'react-redux';
import Field from '../utils/Field';
import Idea from './components/Idea';
import Comment from './components/Comment';

const mapStateToProps = ({ data }, { match }) => ({
  parent: data.ideas[match.params.id],
  ideas: data.ideas,
  comments: data.comments
});

const Page = ({ parent, ideas, comments }) => {
  const versions = []; //"Stack"
  let current = parent;
  while (current) {
    versions.unshift(current);
    current = ideas[current.child_id];
  }

  return [
    <Field key='commentForm' field='body' path='comments' item={{}}
           isForm={true} multiline='true' text={{width: 175}}/>,

    versions.map((item, index) => {
      if (Object.keys(item).includes('comment_id')) {
        return <Comment key={`comment${item.id}`} comment={comments[item.id]}/>;
      }
      return <Idea key={`idea${item.id}`} id={`${index}`} idea={ideas[item.id]}/>;
    })
  ];
};

export default connect(mapStateToProps)(Page);
