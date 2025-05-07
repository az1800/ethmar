"use client";
import React, { useState } from "react";
import { Plus, Edit, Trash } from "lucide-react";
import MemberForm, { Member } from "./MemberForm";
import WomenPlaceHolder from "../../Assets/woman-placeholder.svg";
import menPlaceHolder from "../../Assets/man-placeholder.svg";
import {
  addMember,
  updateMember,
  deleteMember,
} from "../../Services/dashboard";
interface MemberManagementProps {
  members: Member[];
  onRefresh: () => Promise<void>;
}

export default function MemberManagement({
  members,
  onRefresh,
}: MemberManagementProps) {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddMember = () => {
    setEditingMember(null);
    setShowForm(true);
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setShowForm(true);
  };

  const handleDeleteMember = async (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذا العضو؟")) {
      try {
        setLoading(true);
        deleteMember(id);
        await onRefresh();
        setLoading(false);
      } catch (error) {
        console.error("Error deleting member:", error);
        setLoading(false);
      }
    }
  };

  const handleSubmitMember = async (
    data: Member,
    files: { image?: File | null }
  ) => {
    try {
      setLoading(true);

      if (editingMember?.id) {
        // Handle updating existing member
        await updateMember(
          editingMember.id,
          data.full_Name,
          data.Position,
          data.Gender,
          data.Committee || ""
        );
      } else {
        // Handle adding new member
        await addMember(
          data.full_Name,
          data.Position,
          data.Gender,
          data.Committee || ""
        );
      }

      await onRefresh();
      setShowForm(false);
      setEditingMember(null);
      setLoading(false);
    } catch (error) {
      console.error("Error submitting member:", error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {showForm ? (
        <MemberForm
          editingMember={editingMember}
          onSubmit={handleSubmitMember}
          onCancel={() => setShowForm(false)}
          loading={loading}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-6" dir="rtl">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              إدارة الأعضاء
            </h2>
            <button
              onClick={handleAddMember}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus size={18} className="ml-2" />
              <span className="font-arabic">إضافة عضو جديد</span>
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      الصورة
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      الاسم الكامل
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      المنصب
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      اللجنة
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      الجنس
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                    >
                      الإجراءات
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                  {members.length > 0 ? (
                    members.map((member) => (
                      <tr
                        key={member.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {/* {member.image ? ( */}
                          <img
                            src={
                              member.Gender === "Female"
                                ? WomenPlaceHolder.src
                                : menPlaceHolder.src
                            }
                            alt={member.full_Name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          {/* ) : (
                            <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                              <span className="text-gray-500 dark:text-gray-400">
                                {member.full_Name.charAt(0)}
                              </span>
                            </div>
                          )} */}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {member.full_Name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {member.Position}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {member.Committee || "قادة النادي"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="text-sm text-gray-500 dark:text-gray-300">
                            {member.Gender === "Female" ? "أنثى" : "ذكر"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex space-x-2 space-x-reverse justify-end">
                            <button
                              onClick={() => handleEditMember(member)}
                              className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() =>
                                member.id && handleDeleteMember(member.id)
                              }
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        لا يوجد أعضاء لعرضهم
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
