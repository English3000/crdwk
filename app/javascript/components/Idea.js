import React from "react";
import PropTypes from "prop-types";
import { P } from './util';

const custom = {
  ideaBox: { flexDirection: 'column', width: 400, height: 200,
             display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

export default class Idea extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  render() {
    const {ideas} = this.props.data;
    const idea = Object.values(ideas)[0];

    return [
      <div key='Idea' style={Object.assign({backgroundImage: idea.cover_photo}, custom.ideaBox)}>
        <P>{idea.name}</P>
        <P>{idea.body}</P>
      </div>
    ];
  }
}
