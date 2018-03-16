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

      return [ //anchor tag not working
        <a key={index} href={`#${index}`}
           style={{height: (window.innerHeight - 200) * 0.5, display: 'none'}}></a>,
        <Idea key={`idea${item.id}`} idea={ideas[item.id]}/>
      ];
    })
  ];
};

export default connect(mapStateToProps)(Page);
