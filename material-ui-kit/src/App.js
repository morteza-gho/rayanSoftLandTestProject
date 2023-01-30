import { useState } from 'react';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
import { appContext } from './context/AppContext';


// ----------------------------------------------------------------------

export default function App() {

  const [isRtl, toggleRtl] = useState(false);

  return (
    <appContext.Provider value={{
      isRtl, toggleRtl
    }}>
      <ThemeProvider>
        <ScrollToTop />
        <StyledChart />
        <Router />
      </ThemeProvider>
    </appContext.Provider>
  );
}
