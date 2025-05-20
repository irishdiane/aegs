import React from 'react';
import AppRouter from './route'; // adjust path if needed
function App() {
  React.useEffect(() => {
    window.location.href = '/aegs/home';
  }, []);
  
  return <AppRouter />;
}

export default App;
