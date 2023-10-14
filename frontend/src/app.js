import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PassageProvider } from '@passageidentity/passage-react';

import Home from './views/Home';
import Dashboard from './views/Dashboard';
import Profile from './views/Profile';
import Banner from './components/banner';
import styles from './styles/App.module.css';

function App() {
  return (
    <PassageProvider appId={process.env.REACT_APP_PASSAGE_APP_ID}>
      <div>
        <Banner />
        <div className={styles.mainContainer}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Routes>
        </div>
      </div>
    </PassageProvider>
  );
}

export default App;
