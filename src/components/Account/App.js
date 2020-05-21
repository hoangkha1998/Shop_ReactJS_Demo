import React, { Component } from 'react';
import Menuleft from './MenuLeft';
import Profile from './Profile';



class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
          <Menuleft />
          </div>
          <div className="col-md-8">
          {this.props.children}
          {/* <Profile/> */}
          </div>
        </div>
        
        
      </div>
    );
  }

}

export default App;