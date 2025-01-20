import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import FarmDetailPage from "./FarmDetailPage";
import textLogo from "./assets/textlogo.png";
import { FaHeart } from "react-icons/fa";

const App = () => {


    return (
        <Router>
            <div className="w-full max-w-[428px] mx-auto min-h-screen bg-gray-100">
                {/* 고정된 헤더 */}

                {/* 콘텐츠 영역 */}
                <div >
                    <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/farm/:id" element={<FarmDetailPage />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
