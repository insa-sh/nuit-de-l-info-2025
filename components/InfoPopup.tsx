"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";

interface InfoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  imageSrc: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export default function InfoPopup({
  isOpen,
  onClose,
  title,
  description,
  imageSrc,
  primaryButtonText = "C'est super !",
  secondaryButtonText = "En savoir plus",
  onPrimaryClick,
  onSecondaryClick,
}: InfoPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Petit délai pour que l'animation démarre après le rendu
      setTimeout(() => setIsAnimating(true), 10);
    } else {
      setIsAnimating(false);
      // Attendre la fin de l'animation avant de masquer
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  const handlePrimaryClick = () => {
    onPrimaryClick?.();
    onClose();
  };

  const handleSecondaryClick = () => {
    onSecondaryClick?.();
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        opacity: isAnimating ? 1 : 0,
      }}
      onClick={handleOverlayClick}
    >
      <div
        className="relative flex flex-col gap-6 max-w-[900px] w-full p-8 bg-background-overlay rounded-[32px] transition-all duration-300"
        style={{
          transform: isAnimating
            ? "scale(1) translateY(0)"
            : "scale(0.9) translateY(20px)",
          opacity: isAnimating ? 1 : 0,
        }}
      >
        {/* Image */}
        <div className="relative w-full h-[300px] md:h-[400px] rounded-[24px] overflow-hidden">
          <Image src={imageSrc} alt={title} fill className="object-cover" />
        </div>

        {/* Titre */}
        <h2 className="text-white text-[28px] md:text-[40px] font-normal font-pixelify">
          {title}
        </h2>

        {/* Description */}
        <p className="text-white text-[16px] md:text-[20px] leading-6 md:leading-8 font-anonymous-pro">
          {description}
        </p>

        {/* Boutons */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <Button onClick={handlePrimaryClick} className="flex-1">
            <p className="text-white text-[20px] md:text-[24px] font-normal text-center">
              {primaryButtonText}
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}
