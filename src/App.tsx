import "./App.css";
import { Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import 'antd/dist/antd.min.css'
import List from "./pages/list";
import Form from "./pages/form";

function App() {
  return (
    <div className="">
      <BrowserRouter>
        <Suspense>
          <Routes>
            <Route path="/" element={<List />} />
            <Route path="/list" element={<List />} />
            <Route path="/form" element={<Form />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
