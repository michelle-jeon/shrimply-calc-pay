import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './output.css'
import {PostHogProvider} from 'posthog-js/react';
import posthog from 'posthog-js';

const options = {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
}

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, options);

posthog.register({
  env: import.meta.env.MODE,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostHogProvider apiKey={import.meta.env.VITE_PUBLIC_POSTHOG_KEY} options={options}>
      <App />
    </PostHogProvider>
  </StrictMode>,
)
