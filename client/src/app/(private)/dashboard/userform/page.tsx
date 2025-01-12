"use client";

import UserFormComponent from "@/components/dashboard/user-form";

export default function UserForm() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="text-center">
      <h1>FeedBack Form</h1>
      <UserFormComponent />
      </div>
    </div>
  );
}