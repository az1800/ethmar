// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import ethmarlogoP from "../Assets/ethmarlogoP.svg";
// import getPartners from "../Services/partnersAPI";
// import Card from "./Card";
// import { Pencil, Trash2, Plus } from "lucide-react"; // Importing icons for edit, delete, and add

// type Company = {
//   id: number;
//   Company_name: string;
//   Company_Logo: string;
// };

// interface AnimatedCardProps {
//   company: Company;
//   index: number;
//   totalCards: number;
//   onEdit: (company: Company) => void;
//   onDelete: (id: number) => void;
// }

// interface CompaniesProps {
//   type?: string;
// }

// // New animated card wrapper component
// const AnimatedCard: React.FC<AnimatedCardProps> = ({
//   company,
//   index,
//   totalCards,
//   onEdit,
//   onDelete,
// }) => {
//   const [visible, setVisible] = useState<boolean>(false);
//   const cardRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.1 }
//     );

//     if (cardRef.current) {
//       observer.observe(cardRef.current);
//     }

//     return () => {
//       if (cardRef.current) {
//         observer.disconnect();
//       }
//     };
//   }, []);

//   // Calculate a staggered delay based on position
//   // This creates a wave-like animation pattern
//   const baseDelay = 50; // milliseconds
//   const staggerDelay = `${baseDelay + (index % 4) * 100}ms`;

//   return (
//     <div
//       ref={cardRef}
//       className={`transform transition-all duration-500 ${
//         visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
//       }`}
//       style={{ transitionDelay: staggerDelay }}
//     >
//       <div className="relative group">
//         <Card
//           key={company.id}
//           name={company.Company_name}
//           imageLink={company.Company_Logo || ethmarlogoP}
//         />

//         {/* Action buttons that appear on hover */}
//         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
//           <div className="flex gap-2">
//             <button
//               onClick={() => onEdit(company)}
//               className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
//               title="Edit Partner"
//             >
//               <Pencil size={16} />
//             </button>
//             <button
//               onClick={() => onDelete(company.id)}
//               className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//               title="Delete Partner"
//             >
//               <Trash2 size={16} />
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Dashboard card with edit/delete options
// const DashboardCard: React.FC<{
//   company: Company;
//   onEdit: (company: Company) => void;
//   onDelete: (id: number) => void;
// }> = ({ company, onEdit, onDelete }) => {
//   return (
//     <div className="relative group">
//       <Card
//         key={company.id}
//         name={company.Company_name}
//         imageLink={company.Company_Logo || ethmarlogoP}
//       />

//       {/* Admin actions for dashboard view */}
//       <div className="absolute top-2 right-2 flex gap-1">
//         <button
//           onClick={() => onEdit(company)}
//           className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
//           title="Edit Partner"
//         >
//           <Pencil size={14} />
//         </button>
//         <button
//           onClick={() => onDelete(company.id)}
//           className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
//           title="Delete Partner"
//         >
//           <Trash2 size={14} />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Company Form Modal
// const CompanyFormModal: React.FC<{
//   isOpen: boolean;
//   onClose: () => void;
//   company: Company | null;
//   onSave: (company: Partial<Company>) => void;
// }> = ({ isOpen, onClose, company, onSave }) => {
//   const [formData, setFormData] = useState<Partial<Company>>({
//     Company_name: "",
//     Company_Logo: "",
//   });

//   useEffect(() => {
//     // If editing, populate form with company data
//     if (company) {
//       setFormData({
//         id: company.id,
//         Company_name: company.Company_name,
//         Company_Logo: company.Company_Logo,
//       });
//     } else {
//       // Reset form for new company
//       setFormData({
//         Company_name: "",
//         Company_Logo: "",
//       });
//     }
//   }, [company, isOpen]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSave(formData);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
//         <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
//           {company ? "Edit Partner" : "Add New Partner"}
//         </h2>

//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 dark:text-gray-300 mb-2">
//               Company Name
//             </label>
//             <input
//               type="text"
//               name="Company_name"
//               value={formData.Company_name}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               required
//             />
//           </div>

//           <div className="mb-6">
//             <label className="block text-gray-700 dark:text-gray-300 mb-2">
//               Logo URL
//             </label>
//             <input
//               type="text"
//               name="Company_Logo"
//               value={formData.Company_Logo}
//               onChange={handleChange}
//               className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 rounded-md text-white transition-colors"
//               style={{ backgroundColor: "#2C953F" }}
//             >
//               {company ? "Update" : "Add"} Partner
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default function Companies({ type }: CompaniesProps) {
//   // Update the state type to Company[]
//   const [companies, setCompanies] = useState<Company[]>([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Function to fetch companies
//   const fetchCompanies = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getPartners();
//       const companyData = response.data || [];
//       setCompanies(
//         Array.isArray(companyData) ? (companyData as Company[]) : []
//       );
//     } catch (error) {
//       console.error("Error fetching companies:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCompanies();
//   }, []);

//   // Handler for adding or updating a company
//   const handleSaveCompany = async (companyData: Partial<Company>) => {
//     try {
//       // Here you would send a request to your API
//       // For adding: POST to your partners endpoint
//       // For updating: PUT to your partners/{id} endpoint

//       // Mock implementation for now
//       if (companyData.id) {
//         // Update existing company
//         const updatedCompanies = companies.map((c) =>
//           c.id === companyData.id ? { ...c, ...companyData } : c
//         );
//         setCompanies(updatedCompanies);
//       } else {
//         // Add new company with temporary ID (in a real app, the API would provide the ID)
//         const newCompany = {
//           id: Math.max(0, ...companies.map((c) => c.id)) + 1,
//           Company_name: companyData.Company_name || "Unnamed Company",
//           Company_Logo: companyData.Company_Logo || ethmarlogoP,
//         };
//         setCompanies([...companies, newCompany]);
//       }

//       // Close modal after save
//       setIsModalOpen(false);
//       setSelectedCompany(null);
//     } catch (error) {
//       console.error("Error saving company:", error);
//       alert("Failed to save company. Please try again.");
//     }
//   };

//   // Handler for editing a company
//   const handleEditCompany = (company: Company) => {
//     setSelectedCompany(company);
//     setIsModalOpen(true);
//   };

//   // Handler for deleting a company
//   const handleDeleteCompany = async (id: number) => {
//     if (window.confirm("Are you sure you want to delete this partner?")) {
//       try {
//         // Here you would send a DELETE request to your API
//         // DELETE to your partners/{id} endpoint

//         // Mock implementation for now
//         setCompanies(companies.filter((company) => company.id !== id));
//       } catch (error) {
//         console.error("Error deleting company:", error);
//         alert("Failed to delete company. Please try again.");
//       }
//     }
//   };

//   // Handler for adding a new company
//   const handleAddCompany = () => {
//     setSelectedCompany(null);
//     setIsModalOpen(true);
//   };

//   // Show loading indicator
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
//       </div>
//     );
//   }

//   // Dashboard layout
//   if (type === "dashboard") {
//     return (
//       <div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//           {companies.map((company) => (
//             <DashboardCard
//               key={company.id}
//               company={company}
//               onEdit={handleEditCompany}
//               onDelete={handleDeleteCompany}
//             />
//           ))}
//         </div>

//         {/* Add empty state for when there are no companies */}
//         {companies.length === 0 && (
//           <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-16 border border-gray-100 dark:border-gray-700 text-center">
//             <div className="mx-auto mb-4 text-gray-400">
//               {/* Replace with your preferred icon */}
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="64"
//                 height="64"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               >
//                 <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
//                 <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
//               No Partners Yet
//             </h3>
//             <p className="text-gray-500 dark:text-gray-400 mb-6">
//               Add your first partner to get started.
//             </p>
//             <button
//               onClick={handleAddCompany}
//               className="px-6 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
//               style={{ backgroundColor: "#2C953F" }}
//             >
//               <span>Add New Partner</span>
//             </button>
//           </div>
//         )}

//         <CompanyFormModal
//           isOpen={isModalOpen}
//           onClose={() => setIsModalOpen(false)}
//           company={selectedCompany}
//           onSave={handleSaveCompany}
//         />
//       </div>
//     );
//   }

//   // Default layout with animations
//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
//         {companies.map((company, index) => (
//           <AnimatedCard
//             key={company.id}
//             company={company}
//             index={index}
//             totalCards={companies.length}
//             onEdit={handleEditCompany}
//             onDelete={handleDeleteCompany}
//           />
//         ))}
//       </div>

//       <CompanyFormModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         company={selectedCompany}
//         onSave={handleSaveCompany}
//       />
//     </div>
//   );
// }
"use client";

import React, { useEffect, useState, useRef } from "react";
import ethmarlogoP from "../Assets/ethmarlogoP.svg";
import getPartners from "../Services/partnersAPI";
import Card from "./Card";
import { Pencil, Trash2, Plus } from "lucide-react"; // Importing icons for edit, delete, and add

type Company = {
  id: number;
  Company_name: string;
  Company_Logo: string;
};

interface AnimatedCardProps {
  company: Company;
  index: number;
  totalCards: number;
  onEdit?: (company: Company) => void;
  onDelete?: (id: number) => void;
  isDashboard?: boolean;
}

interface CompaniesProps {
  type?: string;
}

// New animated card wrapper component
const AnimatedCard: React.FC<AnimatedCardProps> = ({
  company,
  index,
  totalCards,
  onEdit,
  onDelete,
  isDashboard = false,
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
      <div className="relative group">
        <Card
          key={company.id}
          name={company.Company_name}
          imageLink={company.Company_Logo || ethmarlogoP}
        />

        {/* Action buttons that appear on hover - only shown in dashboard mode */}
        {isDashboard && onEdit && onDelete && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(company)}
                className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                title="Edit Partner"
              >
                <Pencil size={16} />
              </button>
              <button
                onClick={() => onDelete(company.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                title="Delete Partner"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Dashboard card with edit/delete options
const DashboardCard: React.FC<{
  company: Company;
  onEdit: (company: Company) => void;
  onDelete: (id: number) => void;
}> = ({ company, onEdit, onDelete }) => {
  return (
    <div className="relative group">
      <Card
        key={company.id}
        name={company.Company_name}
        imageLink={company.Company_Logo || ethmarlogoP}
      />

      {/* Admin actions for dashboard view */}
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={() => onEdit(company)}
          className="p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          title="Edit Partner"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={() => onDelete(company.id)}
          className="p-1.5 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          title="Delete Partner"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

// Company Form Modal
const CompanyFormModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  company: Company | null;
  onSave: (company: Partial<Company>) => void;
}> = ({ isOpen, onClose, company, onSave }) => {
  const [formData, setFormData] = useState<Partial<Company>>({
    Company_name: "",
    Company_Logo: "",
  });

  useEffect(() => {
    // If editing, populate form with company data
    if (company) {
      setFormData({
        id: company.id,
        Company_name: company.Company_name,
        Company_Logo: company.Company_Logo,
      });
    } else {
      // Reset form for new company
      setFormData({
        Company_name: "",
        Company_Logo: "",
      });
    }
  }, [company, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {company ? "Edit Partner" : "Add New Partner"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Company Name
            </label>
            <input
              type="text"
              name="Company_name"
              value={formData.Company_name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
              Logo URL
            </label>
            <input
              type="text"
              name="Company_Logo"
              value={formData.Company_Logo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md text-white transition-colors"
              style={{ backgroundColor: "#2C953F" }}
            >
              {company ? "Update" : "Add"} Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function Companies({ type }: CompaniesProps) {
  // Update the state type to Company[]
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isDashboard = type === "dashboard";

  // Function to fetch companies
  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const response = await getPartners();
      const companyData = response.data || [];
      setCompanies(
        Array.isArray(companyData) ? (companyData as Company[]) : []
      );
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Handler for adding or updating a company
  const handleSaveCompany = async (companyData: Partial<Company>) => {
    try {
      // Here you would send a request to your API
      // For adding: POST to your partners endpoint
      // For updating: PUT to your partners/{id} endpoint

      // Mock implementation for now
      if (companyData.id) {
        // Update existing company
        const updatedCompanies = companies.map((c) =>
          c.id === companyData.id ? { ...c, ...companyData } : c
        );
        setCompanies(updatedCompanies);
      } else {
        // Add new company with temporary ID (in a real app, the API would provide the ID)
        const newCompany = {
          id: Math.max(0, ...companies.map((c) => c.id)) + 1,
          Company_name: companyData.Company_name || "Unnamed Company",
          Company_Logo: companyData.Company_Logo || ethmarlogoP,
        };
        setCompanies([...companies, newCompany]);
      }

      // Close modal after save
      setIsModalOpen(false);
      setSelectedCompany(null);
    } catch (error) {
      console.error("Error saving company:", error);
      alert("Failed to save company. Please try again.");
    }
  };

  // Handler for editing a company
  const handleEditCompany = (company: Company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  // Handler for deleting a company
  const handleDeleteCompany = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this partner?")) {
      try {
        // Here you would send a DELETE request to your API
        // DELETE to your partners/{id} endpoint

        // Mock implementation for now
        setCompanies(companies.filter((company) => company.id !== id));
      } catch (error) {
        console.error("Error deleting company:", error);
        alert("Failed to delete company. Please try again.");
      }
    }
  };

  // Handler for adding a new company
  const handleAddCompany = () => {
    setSelectedCompany(null);
    setIsModalOpen(true);
  };

  // Show loading indicator
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Dashboard layout
  if (isDashboard) {
    return (
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {companies.map((company) => (
            <DashboardCard
              key={company.id}
              company={company}
              onEdit={handleEditCompany}
              onDelete={handleDeleteCompany}
            />
          ))}
        </div>

        {/* Add empty state for when there are no companies */}
        {companies.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-16 border border-gray-100 dark:border-gray-700 text-center">
            <div className="mx-auto mb-4 text-gray-400">
              {/* Replace with your preferred icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              No Partners Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Add your first partner to get started.
            </p>
            <button
              onClick={handleAddCompany}
              className="px-6 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
              style={{ backgroundColor: "#2C953F" }}
            >
              <span>Add New Partner</span>
            </button>
          </div>
        )}

        <CompanyFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          company={selectedCompany}
          onSave={handleSaveCompany}
        />
      </div>
    );
  }

  // Default layout with animations - but WITHOUT the edit/delete buttons
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {companies.map((company, index) => (
          <AnimatedCard
            key={company.id}
            company={company}
            index={index}
            totalCards={companies.length}
            onEdit={handleEditCompany}
            onDelete={handleDeleteCompany}
            isDashboard={isDashboard}
          />
        ))}
      </div>

      <CompanyFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        company={selectedCompany}
        onSave={handleSaveCompany}
      />
    </div>
  );
}
