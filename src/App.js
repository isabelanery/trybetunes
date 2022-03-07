import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
import NavBar from './components/Nav';

class App extends React.Component {
  render() {
    return (
      <>
        <Header />
        <NavBar />
        <Content />
      </>
    );
  }
}

export default App;
