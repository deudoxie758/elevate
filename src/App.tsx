import React, {useEffect, useState} from 'react';

import './App.css';

const App: React.FC = () => {

  


return (
  <div className="App">
    <h1>Giphy Search</h1>
    <form>
      <input type="text" name="search" placeholder="Search GIF's"/>
      <button type="submit">Search</button>
    </form>
    <div>
      {/* Gifs go here */}
    </div>
  </div>
)
}

export default App