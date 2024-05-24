"use client";
import { useSearchParams } from "next/navigation";
import CardWrapper from "./CardWrapper";
import { BeatLoader } from "react-spinners";
import { useCallback, useEffect, useState } from "react";
import newVerification from "@/actions/new-verification";
import Form_error from "../Form-error";
import Form_success from "../Form_success";

const NewVerificatioForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const searchParam = useSearchParams();
  const token = searchParam.get("token");
  const OldEmail = searchParam.get("email");

  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError("Missing Toekn!");
      return;
    }
    if (!OldEmail) {
      newVerification(token)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            setError("");
          }
          if (data.error) {
            setError(data.error);
            setSuccess("");
          }
        })
        .catch(() => {
          setError("Something Went Wrong");
        });
    } else {
      newVerification(token, OldEmail)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            setError("");
          }
          if (data.error) {
            setError(data.error);
            setSuccess("");
          }
        })
        .catch(() => {
          setError("Something Went Wrong");
        });
    }
  }, [token, success, error, OldEmail]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <div>
      <CardWrapper
        headerLable="Confirming your verification"
        backbuttonHref="/auth/login"
        backbuttonLabel="Back to login">
        <div className=" flex items-start justify-center w-full">
          {" "}
          {!success && !error && <BeatLoader />}
          {!success && <Form_error message={error} />}
          <Form_success message={success} />
        </div>
      </CardWrapper>
    </div>
  );
};

export default NewVerificatioForm;
