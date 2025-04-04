"use client";
import React, { useEffect, useState, useRef } from "react";
import ethmarlogoP from "../Assets/ethmarlogoP.svg";
import getPartners from "../Services/partnersAPI";
import Card from "./Card";

type Company = {
  id: number;
  Company_name: string;
  imageLink: string;
};

interface AnimatedCardProps {
  company: Company;
  index: number;
  totalCards: number;
}

// New animated card wrapper component
const AnimatedCard: React.FC<AnimatedCardProps> = ({
  company,
  index,
  totalCards,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Calculate a staggered delay based on position
  // This creates a wave-like animation pattern
  const baseDelay = 50; // milliseconds
  const staggerDelay = `${baseDelay + (index % 4) * 100}ms`;

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: staggerDelay }}
    >
      <Card
        key={company.id}
        name={company.Company_name}
        imageLink={company.imageLink || ethmarlogoP}
      />
    </div>
  );
};

export default function Companies() {
  // Update the state type to Company[]
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getPartners();

        const companyData = response.data || [];
        // Type assertion to Company[] if you're confident about the data structure
        setCompanies(
          Array.isArray(companyData) ? (companyData as Company[]) : []
        );
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {companies.map((company, index) => (
        <AnimatedCard
          key={company.id}
          company={company}
          index={index}
          totalCards={companies.length}
        />
      ))}
    </>
  );
}
