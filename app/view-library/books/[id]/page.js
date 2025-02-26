"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/navigation";

const BookDetails = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const author = searchParams.get("author");
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black">
      <h2 className="text-2xl font-bold">Book Details</h2>
      <p className="text-lg">Title: {title}</p>
      <p className="text-lg">Author: {author}</p>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => router.back()}
      >
        Back
      </button>
    </div>
  );
};

export default BookDetails;
