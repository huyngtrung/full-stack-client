import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { publicRoutes } from "./routes/routes";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";

import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    userName: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            userName: response.data.userName,
            id: response.data.id,
            status: true,
          });
        }
      });
  }, []);

  return (
    <AuthContext.Provider value={{ authState, setAuthState }}>
      <Router>
        <div className="App">
          <Routes>
            {publicRoutes.map((route, index) => {
              let Page = route.component;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={<Page></Page>}
                ></Route>
              );
            })}
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
