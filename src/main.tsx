import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import './index.css'
import {MantineProvider} from '@mantine/core'
import SocketContext from './context/SocketContext.tsx';
import AuthContext from './context/AuthContext.tsx';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter } from 'react-router-dom';
import JobContext from './context/JobContext.tsx';
import ProfileContext from './context/ProfileContext.tsx';
import CompanyContext from './context/CompanyContext.tsx';
import ApplicantsContext from './context/ApplicantsContext.tsx';


createRoot(document.getElementById('root')!).render(
  <MantineProvider defaultColorScheme="dark">
       <BrowserRouter>
   <AuthContext>
    <ApplicantsContext>
  <SocketContext>
 <StrictMode>
 <CompanyContext>
  <JobContext>
    <ProfileContext>

    <Notifications />

    <App />
    


    </ProfileContext>
    </JobContext>
    </CompanyContext>
  </StrictMode>
  </SocketContext>
  </ApplicantsContext>
  </AuthContext>
  </BrowserRouter>
   </MantineProvider>
)
