"use client";
import React, { useEffect, useState, useRef } from "react";
import getMembers from "../Services/membersAPI";
import Card from "./Card";
import { Plus } from "lucide-react";

interface Member {
  id: number;
  full_Name: string;
  Position: string;
  Committee: string;
  Gender: string;
  // Add these properties that are used in the dashboard view
  imageUrl?: string;
  name?: string;
  role?: string;
  email?: string;
  phone?: string;
}

interface MembersProps {
  type?: "dashboard" | "regular";
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

const Members: React.FC<MembersProps> = ({ type = "regular" }) => {
  const [cards, setCards] = useState<Member[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getMembers();

        if (Array.isArray(data)) {
          // Map the data to ensure consistent naming across both views
          const mappedData = data.map((member) => ({
            ...member,
            // Add these properties for dashboard view if they don't exist
            name: member.full_Name,
            role: member.Position,
          }));
          setCards(mappedData as Member[]);
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

  if (type === "dashboard") {
    return (
      <>
        <div className="flex justify-between items-center mb-6" dir="rtl">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            إدارة آلأعضاء
          </h1>
          <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus size={18} className="ml-2" />
            <span className="font-arabic">إضافة عضو جديد</span>
          </button>
        </div>
        {/* 🔹 Render each committee with its members */}
        <div className="flex flex-col gap-16" dir="rtl">
          {Object.entries(committees).map(
            ([committeeName, members], committeeIndex) => (
              <div
                key={committeeName}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700"
              >
                {/* Committee Header - Subtle and Clean */}
                <div className="mb-8 border-b border-gray-200 dark:border-gray-700 pb-3">
                  <h2
                    className="text-xl font-bold text-gray-800 dark:text-white mr-3"
                    dir="rtl"
                  >
                    {committeeName ? committeeName : "لجنة القادة"}
                  </h2>
                </div>

                {/* Members Grid - Consistent Sizing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {members.map((member, index) => (
                    <div
                      key={member.id}
                      className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-center mb-4" dir="rtl">
                        <div className="h-14 w-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mr-3">
                          {member.imageUrl ? (
                            <img
                              src={member.imageUrl}
                              alt={member.full_Name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                                {member.full_Name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                            {member.full_Name}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            {member.Position || "عضو"}
                          </p>
                        </div>
                      </div>

                      {member.email && (
                        <div
                          className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-2"
                          dir="rtl"
                        >
                          <span className="ml-2">✉️</span>
                          {member.email}
                        </div>
                      )}

                      {member.phone && (
                        <div
                          className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1"
                          dir="rtl"
                        >
                          <span className="ml-2">📱</span>
                          {member.phone}
                        </div>
                      )}

                      <div
                        className="flex justify-end mt-4 space-x-2"
                        dir="ltr"
                      >
                        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                          <span className="text-gray-500 dark:text-gray-400">
                            ✏️
                          </span>
                        </button>
                        <button className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
                          <span className="text-red-500">🗑️</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}
        </div>

        {/* Add Member Button */}
        <div className="flex justify-center mt-10 mb-16">
          <button
            className="px-6 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            style={{ backgroundColor: "#164B20" }}
            dir="rtl"
          >
            <span className="font-bold">إضافة عضو جديد</span>
          </button>
        </div>
      </>
    );
  }

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
                    ? "md:grid-cols-1"
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
