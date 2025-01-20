import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import FarmDetailPage from "./FarmDetailPage";
import Register from "./Register";

const App = () => {


    return (
        <Router>
            <div className="w-full max-w-[428px] mx-auto min-h-screen bg-gray-100">
                {/* 고정된 헤더 */}

                {/* 콘텐츠 영역 */}
                <div>
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/farm/:id" element={<FarmDetailPage />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
