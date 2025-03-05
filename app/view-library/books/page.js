"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import logo from "@/assets/Image17.png";
import Image from "next/image";
import libraryimg from "@/assets/libraryimg.png";
import { useRouter } from "next/navigation";

const BooksSection =  dynamic(() => import("@/components/BooksSection"), {
  ssr: false,});

export default BooksSection;
