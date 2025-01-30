import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import TextInput from "../../../src/theme-files/text-input";
import LoadingSpinner from "../../../src/helper/loading-spinner";
import constants from "../../../src/helper/constant";

function renderReplyForm({
  commentId,
  values,
  setvalues,
  error,
  setShowSubmit,
  inputRef,
  setReplyIndex,
  validateAndSubmit,
  reError,
  verify,
  reCAPTCHA,
  apiLoading,
  errorText,
}) {
  return (
    <div className="mt-5">
      <div className="bg-[#fafafa] border-[#eee] p-[20px] mt-[20px]">
        <textarea
          placeholder="Add a comment..."
          rows={5}
          className={`resize p-3 w-full border border-[#eee] ${
            error?.comment ? "error-field" : ""
          }`}
          id="commentBox"
          onClick={() => setShowSubmit(true)}
          value={values?.comment || ""}
          onChange={(e) => setvalues({ ...values, comment: e.target.value })}
          ref={inputRef}
        />
        {!values?.comment && reError ? (
          <span className="text-[#e02b27] text-sm">required field</span>
        ) : null}
        <div className="block sm:flex justify-between mt-[5%] w-full">
          <div className="w-full sm:w-[48%]">
            <TextInput
              type="text"
              placeholder="Full Name"
              name="fullname"
              values={values}
              setvalues={setvalues}
              errors={error?.fullname || false}
              isRequired
              isClicked={error?.fullname || false}
              ref={inputRef}
            />
            {!values?.fullname && reError ? (
              <span className="text-[#e02b27] text-sm">required field</span>
            ) : null}
          </div>
          <div className="w-full sm:w-[48%]">
            <TextInput
              type="email"
              placeholder="Email"
              name="email"
              values={values}
              setvalues={setvalues}
              errors={error?.email || false}
              isRequired
              isClicked={error?.email || false}
              ref={inputRef}
            />
            {values?.email && errorText ? (
              <span className="text-[#e02b27] text-sm">{errorText}</span>
            ) : null}
            {!values?.email && reError ? (
              <span className="text-[#e02b27] text-sm">required field</span>
            ) : null}
          </div>
        </div>
        <div className=" mt-[5%] w-full comment-captcha">
          <div className="flex justify-start">
            <ReCAPTCHA
              sitekey={constants.RECAPTCHA_KEY}
              ref={inputRef}
              onChange={verify}
              isolated
            />
            {reError && !reCAPTCHA && (
              <small className={reError ? "text-red-500 show" : "text-red-500 hidden"}>
                ReCAPTCHA required!
              </small>
            )}
          </div>
          <div className="flex">
            <button
              type="button"
              className="mt-8 bg-skin-secondary uppercase border border-transparent py-1 mr-6 px-4 flex items-center justify-center text-sm font-medium text-skin-inverted hover:text-skin-primary hover:border-skin-secondary hover:bg-skin-inverted"
              onClick={() => setReplyIndex(null)}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={!values?.comment?.length > 0}
              className="disabled:opacity-40 disabled:pointer-events-none mt-8 bg-skin-secondary uppercase border border-transparent py-1 px-4 flex items-center justify-center text-sm font-medium text-skin-inverted hover:text-skin-primary hover:border-skin-secondary hover:bg-skin-inverted"
              onClick={() => validateAndSubmit(commentId)}
            >
              {values?.email && values?.comment && reCAPTCHA && values.fullname && apiLoading ? (
                <LoadingSpinner message="loading" />
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function renderComment({
  comment,
  index,
  handleReply,
  replyIndex,
  values,
  setvalues,
  error,
  setShowSubmit,
  inputRef,
  setReplyIndex,
  validateAndSubmit,
  reError,
  verify,
  reCAPTCHA,
  isReply,
  apiLoading,
  errorText,
}) {
  return (
    <div
      key={comment.comment_id}
      className={`${
        isReply
          ? "border-l-[1px] border-b-[1px] border-dotted border-[#bdbdbd] p-4"
          : "my-8 bg-white p-2"
      } text-sm`}
    >
      <p className=" font-semibold">
        {comment.author_nickname}{" "}
        <span className="text-xs text-gray-500 pl-1 font-[10px]">{comment.creation_time}</span>
      </p>
      <p className="mt-2 font-[14px]">{comment.text}</p>
      {replyIndex !== index && (
        <button
          className="text-[12px] font-semibold"
          onClick={() => handleReply(comment?.comment_id)}
          style={{ color: "black" }}
        >
          Reply
        </button>
      )}

      {replyIndex === index &&
        renderReplyForm({
          commentId: comment.comment_id,
          values,
          setvalues,
          error,
          setShowSubmit,
          inputRef,
          setReplyIndex,
          validateAndSubmit,
          reError,
          verify,
          reCAPTCHA,
          apiLoading,
          errorText,
        })}
      {comment?.replies?.map((reply, i) =>
        renderComment({
          comment: reply,
          index: reply?.comment_id,
          handleReply,
          replyIndex,
          values,
          setvalues,
          error,
          setShowSubmit,
          inputRef,
          setReplyIndex,
          validateAndSubmit,
          reError,
          verify,
          reCAPTCHA,
          isReply: true,
          apiLoading,
          errorText,
        })
      )}
    </div>
  );
}

function BlogComment({
  commentArray,
  handleReply,
  replyIndex,
  values,
  setvalues,
  error,
  setShowSubmit,
  inputRef,
  setReplyIndex,
  validateAndSubmit,
  reError,
  verify,
  reCAPTCHA,
  apiLoading,
  errorText,
}) {
  return (
    <>
      {commentArray?.items?.map((comment, i) =>
        renderComment({
          comment,
          index: comment.comment_id,
          handleReply,
          replyIndex,
          values,
          setvalues,
          error,
          setShowSubmit,
          inputRef,
          setReplyIndex,
          validateAndSubmit,
          reError,
          verify,
          reCAPTCHA,
          apiLoading,
          errorText,
        })
      )}
    </>
  );
}

export default BlogComment;
