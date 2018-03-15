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
  const revisions = parent.revisions.map(id => ideas[id]);
  const feedback = parent.comments.map(id => comments[id]);

  function reverseChron(a, b) {
    if (a.created_at > b.created_at) return -1;
    if (a.created_at < b.created_at) return 1;
    return 0;
  }

  const components = [parent].concat(revisions, feedback).sort(reverseChron);
  //could pass in attr to most recent revision so only it has cover_photo
  return [
    <Field isForm={true} key='commentForm'/>,

    components.map(item => {
      console.log(Object.keys(item)); //to confirm my conditional works
      if (Object.keys(item).includes('comment_id')) {
        return <Comment key={`comment${item.id}`} comment={comments[item.id]}/>;
      }
      return <Idea key={`idea${item.id}`} idea={ideas[item.id]}/>;
    })
  ];
};

export default connect(mapStateToProps)(Page);
