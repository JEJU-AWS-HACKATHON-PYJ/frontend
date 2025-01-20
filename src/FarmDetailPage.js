import React from "react";
import { useParams } from "react-router-dom";
import { FaHeart, FaMapMarkerAlt, FaClock, FaPhone, FaGlobe } from "react-icons/fa";

const dummyData = [
    {
        id: 1,
        name: "제주약선감귤농장",
        address: "제주 제주시 무진굴길 26",
        operatingHours: "08:00 - 21:00",
        description:
            "무농약 재배로 안전하고 신선한 감귤을 제공합니다. 제주의 청전 자연 속에서 자란 프리미엄 감귤을 맛보고 가세요!",
        phone: "0507-1321-8634",
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
        operatingHours: "09:00 - 20:00",
        description: "제주농장 2 설명입니다.",
        phone: "0507-1111-2222",
        homepageLink: "https://example.com",
        products: [
            { name: "제주귤 3kg", price: 13000 },
            { name: "제주귤 5kg", price: 19000 },
        ],
    },
];

const FarmDetailPage = () => {
    const { id } = useParams();
    const farm = dummyData.find((place) => place.id === parseInt(id));

    if (!farm) {
        return <p>농장 정보를 찾을 수 없습니다.</p>;
    }

    return (
        <div className="w-full max-w-[428px] p-4">
            <header className="flex items-center justify-between">
                <button className="text-lg">←</button>
                <FaHeart className="text-red-500" />
            </header>
            <h1 className="text-2xl font-bold mt-4">{farm.name}</h1>
            <div className="flex gap-2 mt-2">
                <span className="bg-gray-200 rounded px-2 py-1 text-sm">#무농약</span>
                <span className="bg-gray-200 rounded px-2 py-1 text-sm">#GAP</span>
            </div>
            <p className="mt-2">
                <FaMapMarkerAlt /> {farm.address}
            </p>
            <p>
                <FaClock /> {farm.operatingHours}
            </p>
            <p>
                <FaPhone /> {farm.phone}
            </p>
            <p>
                <FaGlobe /> <a href={farm.homepageLink}>{farm.homepageLink}</a>
            </p>
            <ul className="mt-4">
                {farm.products.map((product, index) => (
                    <li key={index}>
                        {product.name} - {product.price.toLocaleString()}원
                    </li>
                ))}
            </ul>
            <p className="mt-4">{farm.description}</p>
        </div>
    );
};

export default FarmDetailPage;
