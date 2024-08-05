import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./pages/Home";
import { useSelector } from 'react-redux';
import Country from "./pages/Country";
import Layout from "./pages/Layout";
import Countries from './pages/Countries';


function App() {
  const isLoggedIn = useSelector((state) => !!state.auth.accessToken);

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <Navigate to="/countries" /> : <Home />
            }
          />
          <Route path="/countries" element={<Countries />} />
          <Route path="/countries/:id" element={<Country />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
