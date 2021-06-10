import React from 'react';
import { ThemeProvider } from 'styled-components';

import Theme from '../../packages/Theme';

function App(): JSX.Element {
  return (
    <ThemeProvider theme={Theme}>
      <div>
        <div
          style={{
            height: '50px',
            width: '50px',
            padding: '20px',
            backgroundColor: Theme.colors.teal.main,
          }}
        ></div>
        <div
          style={{
            height: '50px',
            width: '50px',
            padding: '20px',
            backgroundColor: Theme.colors.teal.main,
          }}
        ></div>
        <div
          style={{
            height: '50px',
            width: '50px',
            padding: '20px',
            backgroundColor: Theme.colors.teal.main,
          }}
        ></div>
      </div>
    </ThemeProvider>
  );
}

export default App;
