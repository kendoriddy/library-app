"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/Image17.png";
import card1 from "@/assets/card1.png";
import card2 from "@/assets/card2.png";
import card3 from "@/assets/card3.png";
import FeatureCard from "@/components/FeatureCard";
import book1 from "@/assets/book1.png";

const books = [
  {
    id: 1,
    image: book1,
    title: "Are you Afraid of the Dark",
    author: "Sidney Sheldon",
    genre: "Fiction Novel",
  },
  {
    id: 2,
    image: book1,
    title: "Are you Afraid of the Dark",
    author: "Sidney Sheldon",
    genre: "Fiction Novel",
  },
];

export default function Home() {
  const router = useRouter();

  const features = [
    {
      icon: card1,
      title: "My Book Loans",
      action: () => router.push("/my-loans"),
    },
    {
      icon: card2,
      title: "Pending Returns",
      action: () => router.push("/pending-returns"),
    },
    {
      icon: card3,
      title: "View Library",
      action: () => router.push("/view-library"),
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-custom-blue-1 via-custom-blue-2 to-custom-blue-3 pt-4 text-white">
      <div className="w-[100%] m-auto h-[150px] bg-inherit flex flex-col items-center justify-center p-4">
        <div className="w-[100%] m-auto h-[100px] bg-inherit rounded-full flex items-center justify-between p-4">
          <div>
            <h4 className="text-[20px] font-bold">
              Hello <span className="text-[#b1afff]">Akinfolarin</span>,
            </h4>
            <p className="text-[#fff] text-[9px] font-medium">
              Welcome to the Library, you have been missed!
            </p>
          </div>
          <div
            className="flex items-center justify-center"
            onClick={() => router.push("/profile")}
          >
            <Image alt="logo" src={logo} width={35} height={35} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-md bg-white rounded-t-[30px] shadow-lg p-6">
        {/* Search bar */}
        <form>
          <div className="bg-white border border-[#626262] rounded-[15px] px-3 py-0">
            <label className="block text-[#383838] opacity-50 text-[8px] italic font-semibold mb-[-10px] mt-2.5">
              SEARCH FOR A TITLE OR AUTHOR
            </label>
            <input
              type="text"
              name="matric"
              // value={form.matric}
              // onChange={handleChange}
              className="w-full focus:outline-none text-[#383838] rounded-[15px] p-2"
              required
            />
          </div>
        </form>

        <div className="flex justify-center space-x-4 mt-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              onClick={feature.action}
            />
          ))}
        </div>

        {/* Featured books */}
        <div className="mt-7 mb-4">
          <h4 className="text-[13px] font-semibold text-[#383838]">
            New Book Additions
          </h4>

          <div className="flex items-center justify-between">
            {books.map((book, index) => (
              <div
                key={index}
                className="flex flex-col items-start justify-center"
              >
                <Image src={book.image} alt="book" width={200} height={200} />
                <p className="text-[#383838] text-[8px] font-semibold ml-4">
                  {book.title}
                </p>
                <p className="text-[#383838] text-[8px] font-semibold ml-4">
                  {book.author}{" "}
                  <span className="text-[#3733CA]">{book.genre}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
