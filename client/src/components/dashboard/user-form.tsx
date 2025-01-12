"use client";
import { saveUser } from "@/utils/actions/useractions";
import { UserValidations } from "@/utils/uservalidations";
import { formatErrorMessages } from "@/utils/utils";
import React, { useActionState, useEffect, useState, startTransition } from "react";
import SubmitButton from "../shared/submit-button";


const UserForm = () => {

    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [state, formAction] = useActionState(saveUser, {
      error: false,
      success: false,
    });

    useEffect(() => {
      if (state.error) {
        if (typeof state.errorDetails === "string") {
          setErrorMessages([state.errorDetails]);
        } else {
          setErrorMessages(formatErrorMessages(state.errorDetails).split(','));
        }
        setErrorMessages(formatErrorMessages(state.errorDetails).split(','));
      } else if (state.success) {
        console.log("success");
      }
    }, [state]);

    const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const fields = Object.fromEntries(formData);
    console.log(fields);

    const validation = UserValidations.safeParse(fields);
    if (!validation.success) {
      // console.log(validation.error.flatten().fieldErrors);
      setErrorMessages(
        formatErrorMessages(validation.error.flatten().fieldErrors).split(',')
      );
    } else {
      startTransition(() => {
        formAction({ formData });
      });
    }
  };

  return (
    <div className="border border-gray-600 w-[600px] rounded-lg p-6">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstName" className="font-medium text-black">
        First Name
          </label>
          <input
        type="text"
        id="firstName"
        name="firstName"
        className="w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-pink-300"
          />
        </div>
        <div>
          <label
        htmlFor="lastName"
        className="block  font-medium text-black"
          >
        Last Name
          </label>
          <input
        type="text"
        id="lastName"
        name="lastName"
        className="w-full text-black border border-gray-300  rounded-md shadow-sm p-2 focus:border-pink-300"
          />
        </div>
        <div>
          <label htmlFor="email" className="block  font-medium text-black">
        Email
          </label>
          <input
        type="email"
        id="email"
        name="email"
        className="w-full text-black border border-gray-300  rounded-md shadow-sm p-2 focus:border-pink-300"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block  font-medium text-black">
        Phone
          </label>
          <input
        type="tel"
        id="phone"
        name="phone"
        className="w-full text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-pink-300"
          />
        </div>
        <div>
          <label htmlFor="feedback" className="block font-medium text-black">
        Feedback
          </label>
          <textarea
        id="feedback"
        name="feedback"
        className="w-full  text-black border border-gray-300 rounded-md shadow-sm p-2 focus:border-pink-300"
        rows={4}
          />
        </div>
        {state.success ? (
          <span className="text-green-500">Feedback has been Submitted!</span>
        ) : (
          errorMessages && (
        <span
          className="text-red-500"
          dangerouslySetInnerHTML={{ __html: errorMessages }}
        />
          )
        )}
        
        <SubmitButton />

      </form>
    </div>
  );
};

export default UserForm;