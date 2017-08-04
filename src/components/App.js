import React, {Component} from 'react';

import NavBar from './NavBar';


class App extends Component {
  render() {
    return (
      <div>
        <NavBar style={{zIndex: '1000'}} />
        {this.props.children}
      </div>
    )
  }
}

export default App;