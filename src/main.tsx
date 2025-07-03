import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import i18n from './i18n.ts'; 
import { I18nextProvider } from 'react-i18next';
import { store } from "./store/store";
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store} >
        <I18nextProvider i18n={i18n}>
         <App />
        </I18nextProvider>
     </Provider>
  </StrictMode>
)


