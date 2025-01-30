import React from "react";

export default function Certificates({ certificates, setPdf }) {
  return (
    <>
      {certificates?.map((cert) => (
        <div key={cert.product_id} className="mb-[20px]">
          <div className="attachments-wrapper relative flex flex-col md:flex-row justify-between items-center my-2.5 py-[32px] pr-[20px] md:pr-[40px] pl-[20px] md:pl-[40px] bg-[#f3f3f3]">
            <div className="text-[#282828] pl-[60px] md:pl-[70px] mb-[25px] md:mb-0">
              <h4 className="text-[15px] md:text-lg font-medium font-montserrat mb-[5px] uppercase">
                {cert.title}
              </h4>
            </div>
            <div
              role="button"
              className="py-2.5 flex items-center justify-center md:px-[50px] w-full md:w-[200px] bg-transparent transition-all duration-300 ease-in-out hover:bg-[#000] text-sm hover:text-white font-medium font-montserrat uppercase border border-solid border-[#222]"
              onClick={() => setPdf({ file: cert.file_url, title: cert.title })}
              aria-hidden="true"
            >
              View
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
