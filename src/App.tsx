import './App.css'
import PagerView from './components/chart_settings/chart_settings_form'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BacktestingChart from './pages/backtesting/backtesting';
import { Layout } from './components/logo_layout';


function App() {

  return (
    <>
     <BrowserRouter>
        <Layout>
          <Routes>
          <Route path='/' element={<PagerView/>}/>
          <Route path='/chart' element={<BacktestingChart />} />
        </Routes>
        </Layout>
     </BrowserRouter>
    </>
  )
}

export default App
