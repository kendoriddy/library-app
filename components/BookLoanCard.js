import Image from "next/image";
import React from "react";

const BookLoanCard = ({
  image,
  title,
  author,
  genre,
  borrowedDate,
  returnedDate,
  onBorrowAgain,
  onReviewBook,
  daysRemain,
}) => {
  return (
    <div className="flex flex-col justify-start space-x-4 border-b border-b-[#1D1D1D] pb-4 mb-4">
      <div className=" w-full flex items-center justify-start space-x-4">
        <div className="relative">
          {/* Book Cover */}
          <Image
            src={image}
            alt={title}
            width={45}
            height={100}
            className="w-[45px] h-[72px] object-cover rounded-md"
          />
          {daysRemain && (
            <div
              className={`absolute top-0 left-[-10px]  ${
                daysRemain < 1 ? "bg-[#FF0000]" : "bg-[#3733CA]"
              }  text-[#fff] rounded-[6px] px-[2px] py-1 text-center`}
            >
              <p className={`text-[16px] font-bold`}>{daysRemain}</p>
              <p
                className={`text-[4px] font-normal`}
                style={{
                  marginTop: -2,
                  lineHeight: "normal",
                  width: "20px",
                }}
              >
                {daysRemain < 1
                  ? "This book Is overdue"
                  : `Due in ${daysRemain} days`}
              </p>
            </div>
          )}
        </div>

        {/* Book Details */}
        <div className="flex-1">
          <h2 className="text-[14px] font-semibold text-[#5D5ADB]">{title}</h2>
          <p className="text-[12px] font-medium text-[#404040]">
            {author} | {genre}
          </p>
          <p className="text-[9px] text-[#383838]">
            Borrowed: {borrowedDate}
            <br />
            Returned: {returnedDate}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-2 !space-x-0 flex gap-2 justify-start">
        <button
          className="text-white px-4 py-1 rounded-md text-[9px] font-medium bg-gradient-to-r from-[#3733CA] to-[#5D5ADB]"
          onClick={onBorrowAgain}
        >
          Borrow Again
        </button>
        <button
          className=" text-white px-4 py-1 rounded-md text-[9px] font-medium bg-gradient-to-r from-[#101010] to-[#2f2f2f]"
          onClick={onReviewBook}
        >
          Review Book
        </button>
      </div>
    </div>
  );
};

export default BookLoanCard;
