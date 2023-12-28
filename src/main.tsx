import React from 'react'
import ReactDOM from 'react-dom/client'
import Ruas from './routes.tsx'

import { Provider } from 'urql'
import ThemeTypeProvider from './contexts/themeType.tsx'
import WindowDimensionProvider from './contexts/windowResize.tsx'
import { client } from './global/graphql/client.ts'
import TypeIconGrid from './components/layout/typeIconGrid.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider value={client}>
      <WindowDimensionProvider>
        <ThemeTypeProvider>
          <TypeIconGrid/>
          <Ruas />
        </ThemeTypeProvider>
      </WindowDimensionProvider>
    </Provider>
  </React.StrictMode>
)
