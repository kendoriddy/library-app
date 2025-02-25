"use client";

import Image from "next/image";
import React from "react";
import book1 from "@/assets/book1.png";
import logo from "@/assets/Image17.png";
import BookLoanCard from "@/components/BookLoanCard";
import { useRouter } from "next/navigation";

const borrowedBooks = [
  {
    image: book1,
    title: "Are you Afraid of the Dark",
    author: "Sidney Sheldon",
    genre: "Fiction Novels",
    borrowedDate: "10th February, 2025",
    returnedDate: "22nd February, 2025",
    daysRemain: 5,
  },
  {
    image: book1,
    title: "Introduction to the Basic Concepts of Modern Physics",
    author: "Carlo Maria Becchi",
    genre: "Science",
    borrowedDate: "10th February, 2025",
    returnedDate: "22nd February, 2025",
    daysRemain: -2,
  },
];

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-custom-blue-1 via-custom-blue-2 to-custom-blue-3 pt-4 text-white">
      <div className="w-[100%] m-auto h-[100px] bg-inherit rounded-full flex items-center justify-between p-4">
        <div>
          <h4 className="text-[20px] font-bold">
            Hello <span className="text-[#b1afff]">Akinfolarin</span>,
          </h4>
          <p className="text-[#fff] text-[9px] font-medium">
            Here are your Book Loans
          </p>
        </div>
        <div
          className="flex items-center justify-center"
          onClick={() => router.push("/profile")}
        >
          <Image alt="logo" src={logo} width={35} height={35} />
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-t-[30px] shadow-lg p-6">
        <div className="max-w-2xl mx-auto py-4">
          {borrowedBooks.map((book, index) => (
            <BookLoanCard
              key={index}
              image={book.image}
              title={book.title}
              author={book.author}
              genre={book.genre}
              borrowedDate={book.borrowedDate}
              returnedDate={book.returnedDate}
              onBorrowAgain={() => alert(`Borrowing ${book.title} again...`)}
              onReviewBook={() => alert(`Reviewing ${book.title}...`)}
              daysRemain={book.daysRemain}
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-[#3733CA] to-[#5D5ADB] text-white py-3 px-6 rounded-[15px] text-[15px] font-medium hover:bg-gray-600 transition w-full mt-4"
          onClick={() => router.push("/")}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default Page;
