"use client";
import React, { useEffect, useState, useRef } from "react";
import getMembers from "../Services/membersAPI";
import Card from "./Card";

interface Member {
  id: number;
  full_Name: string;
  Position: string;
  Committee: string;
  Gender: string;
}

// Add proper type definitions for component props
interface AnimatedCommitteeHeaderProps {
  committeeName: string;
  index: number;
}

interface AnimatedCardProps {
  member: Member;
  index: number;
  totalCards: number;
}

// Animated committee header component
const AnimatedCommitteeHeader: React.FC<AnimatedCommitteeHeaderProps> = ({
  committeeName,
  index,
}) => {
  const [visible, setVisible] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  const animationDelay = `${index * 100}ms`;

  return (
    <div ref={headerRef} className="w-fit mx-auto text-center my-10">
      <h1
        className={`text-black text-4xl mt-10 font-bold transition-opacity duration-700 ease-in-out ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: animationDelay }}
      >
        {committeeName}
      </h1>
      <div
        className="h-[4px] bg-[#164B20] mt-1 transition-all duration-1000 ease-out"
        style={{
          width: visible ? "100%" : "0%",
          transitionDelay: `calc(${animationDelay} + 300ms)`,
        }}
      />
    </div>
  );
};

// New animated card wrapper component
const AnimatedCard: React.FC<AnimatedCardProps> = ({
  member,
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
      className={`w-fit transform transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: staggerDelay }}
    >
      <Card
        gender={member.Gender}
        name={member.full_Name}
        position={member.Position}
        committee={member.Committee}
        className="transform transition-all duration-300 hover:translate-y-[-8px]"
      />
    </div>
  );
};

const Members: React.FC = () => {
  const [cards, setCards] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMembers();

        if (Array.isArray(data)) {
          setCards(data as Member[]);
        } else {
          setCards([]);
        }
      } catch (error) {
        console.error("Error fetching members:", error);
        setCards([]);
      }
    }

    fetchData();
  }, []);

  // Extract the first 3 members from the entire dataset
  const firstThreeMembers = cards.slice(0, 3);
  const remainingMembers = cards.slice(3);

  // Group the remaining members by committee
  const committees = remainingMembers.reduce(
    (acc, member) => {
      if (!acc[member.Committee]) {
        acc[member.Committee] = [];
      }
      acc[member.Committee].push(member);
      return acc;
    },
    {} as Record<string, Member[]>
  );

  return (
    <>
      {/* 🔹 Title Section */}
      <div className="w-fit mx-auto text-center">
        <h1 className="text-black text-4xl mt-10 font-bold">هيكلة اثمار</h1>
        <div className="h-[4px] bg-[#164B20] mt-1 w-full mx-auto" />
      </div>

      {/* 🔹 First 3 Members - Special Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-12 mx-auto">
        {firstThreeMembers.map((member, index) => (
          <AnimatedCard
            key={member.id}
            member={member}
            index={index}
            totalCards={firstThreeMembers.length}
          />
        ))}
      </div>

      {/* 🔹 Render each committee with its members */}
      <div className="flex flex-col gap-10">
        {Object.entries(committees).map(
          ([committeeName, members], committeeIndex) => (
            <div key={committeeName}>
              {/* Animated Committee Header */}

              <AnimatedCommitteeHeader
                committeeName={committeeName}
                index={committeeIndex}
              />

              {/* Members - Standard Grid with Animated Cards */}
              <div
                className={`grid grid-cols-2 gap-12 my-6 mx-auto w-fit ${
                  members.length === 1
                    ? "md:grid-cols-1 "
                    : members.length === 2
                      ? "md:grid-cols-2"
                      : members.length === 3
                        ? "md:grid-cols-3"
                        : "md:grid-cols-4"
                }`}
              >
                {members.map((member, index) => (
                  <AnimatedCard
                    key={member.id}
                    member={member}
                    index={index}
                    totalCards={members.length}
                  />
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Members;
