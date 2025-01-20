import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaMapMarkerAlt, FaClock, FaPhone, FaGlobe } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { RiMoneyDollarCircleFill } from "react-icons/ri";

const dummyData = [
    {
        id: 1,
        name: "제주약선감귤농장",
        address: "제주 제주시 무진굴길 26",
        phone: "0507-1321-8634",
        operatingHours: "08:00 - 21:00",
        description: "무농약 재배로 안전하고 신선한 감귤을 제공합니다.",
        latitude: 33.3785614,
        longitude: 126.5661908,
        keywords: "무농약, GAP, 저탄소",
        isFavorite: true,
        imageUrl: null,
        homepageLink: "https://blog.naver.com/farmerjeju",
        products: [
            { name: "무농약귤 3kg", price: 15000 },
            { name: "무농약귤 5kg", price: 20000 },
        ],
    },
    {
        id: 2,
        name: "제주농장 2",
        address: "제주 서귀포시 효돈로 234",
        phone: "0507-1111-2222",
        operatingHours: "09:00 - 20:00",
        description: "제주농장 2 설명입니다.",
        latitude: 39.3785614,
        longitude: 226.5661908,
        keywords: "무농약, GAP, 저탄소",
        isFavorite: false,
        imageUrl: null,
        homepageLink: "https://example.com",
        products: [
            { name: "제주귤 3kg", price: 13000 },
            { name: "제주귤 5kg", price: 19000 },
        ],
    },
];

const FarmDetailPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const farm = dummyData.find((place) => place.id === parseInt(id));

    const [isFavorite, setIsFavorite] = useState(farm?.isFavorite || false); // 초기값 설정

    if (!farm) {
        return <p>농장 정보를 찾을 수 없습니다.</p>;
    }

    const toggleFavorite = async () => {
        try {
            const newFavoriteStatus = !isFavorite;
            setIsFavorite(newFavoriteStatus); // 상태 업데이트

            // API 요청 (예: POST, PATCH 또는 PUT)
            // const response = await fetch(`/api/farms/${farm.id}/favorite`, {
            //     method: "PATCH",
            //     headers: {
            //         "Content-Type": "application/json",
            //     },
            //     body: JSON.stringify({ isFavorite: newFavoriteStatus }),
            // });

            // if (!response.ok) {
            //     throw new Error("Failed to update favorite status.");
            // }
        } catch (error) {
            console.error("Error updating favorite status:", error);
            alert("즐겨찾기 상태를 업데이트할 수 없습니다.");
        }
    };

    return (
        <div className="w-full max-w-[428px] p-4">
            <header className="flex items-center justify-between mb-4">
                {/* 뒤로가기 버튼 */}
                <IoIosArrowBack
                    size={30}
                    className="cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                {/* 즐겨찾기 아이콘 */}
                <FaHeart
                    size={30}
                    className={`cursor-pointer ${isFavorite ? "text-red-500" : "text-gray-400"}`}
                    onClick={toggleFavorite} // 클릭 시 즐겨찾기 상태 토글
                />
            </header>
            <div className="p-3">
                <img src={farm.imageUrl} className="rounded-bl"/>
                <h1 className="text-3xl font-bold mt-4">{farm.name}</h1>
                <div className="flex gap-2 mt-2">
                    {farm.keywords
                        ? farm.keywords.split(", ").map((keyword, index) => (
                            <span
                                key={index}
                                className="bg-gray-200 rounded px-2 py-1 text-sm"
                            >
                                  #{keyword}
                              </span>
                        ))
                        : "No keywords available"}
                </div>
                <p className="flex items-center mt-4">
                    <FaMapMarkerAlt className="w-5 h-5 mr-2" />
                    {farm.address}
                </p>
                <p className="flex items-center mt-2">
                    <FaClock className="w-5 h-5 mr-2" />
                    {farm.operatingHours}
                </p>
                <p className="flex items-center mt-2">
                    <FaPhone className="w-5 h-5 mr-2" />
                    {farm.phone}
                </p>
                <p className="flex items-center mt-2">
                    <FaGlobe className="w-5 h-5 mr-2" />
                    <a href={farm.homepageLink} target="_blank" rel="noopener noreferrer">
                        {farm.homepageLink}
                    </a>
                </p>
                <div className="flex items-start mt-4">
                    <RiMoneyDollarCircleFill className="w-7 h-7 mr-2" />
                    <ul>
                        {farm.products?.map((product, index) => (
                            <li key={index} className="text-sm">
                                {product.name} - {product.price.toLocaleString()}원
                            </li>
                        ))}
                    </ul>
                </div>
                <p className="mt-4">{farm.description}</p>
            </div>
        </div>
    );
};

export default FarmDetailPage;
