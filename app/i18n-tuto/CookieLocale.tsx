"use client";

import React from "react";

import { create } from "./CreateCookie";

export default function CookieLocale() {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => create({ locale: "en" })}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        English
      </button>
      <button
        onClick={() => create({ locale: "fr" })}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Français
      </button>
    </div>
  );
}
