import { BrowserRouter, Routes, Route } from "react-router-dom";
import SiteLayout from "./layouts/SiteLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
