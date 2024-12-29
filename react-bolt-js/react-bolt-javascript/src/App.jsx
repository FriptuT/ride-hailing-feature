import { Outlet } from 'react-router';
import './App.css'
import Header from './components/Header/Header'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div>
      <Header />
      <Outlet/>
    </div>
  )
}

export default App
