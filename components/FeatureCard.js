import Image from "next/image";
import React from "react";

const FeatureCard = ({ icon, title, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center cursor-pointer">
      <button
        onClick={onClick}
        className="flex flex-col items-center justify-center bg-gradient-to-r from-[#3733CA] to-[#5D5ADB] rounded-2xl p-4 w-20 h-20 hover:opacity-90 transition shadow-[5px_15px_45px_#00000029]"
      >
        <Image src={icon} alt={title} className="w-[60px] h-[60px] mb-2" />
      </button>
      <p className="text-[#383838] text-[9px] font-semibold text-center mt-2">
        {title}
      </p>
    </div>
  );
};

export default FeatureCard;
