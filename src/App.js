import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Form from './Pages/Form';
import Home from './Pages/Home';

function App() {
  return (
  
    <Routes>
      <Route path="/" element={<Form />} />
    <Route path="/productinfo" element={< Home/>} />
      {/* <Route path="/productinfo" element={< />} /> */}
      {/* <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} /> */}
    </Routes>
  
   
  );
}

export default App;
