import { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import Paragraph from "../../theme-files/paragraph";
import Label from "../../theme-files/label";
import CUSTOMER_INFO_CSV_DOWNLOAD from "./graphql/query/customer-info-csv-download";
import CUSTOMER_INFO_ZIP_DOWNLOAD from "./graphql/query/customer-info-zip-download";
import useCSVFormat from "../../helper/hooks/customer/use-csv-format";

export default function DownloadPersonalData() {
  const [password, setpassword] = useState("");
  const [merge, setmerge] = useState(false);
  const { getZipFormat, getCsvFormat } = useCSVFormat();
  const [csvDownload, { loading: csvLoading }] = useLazyQuery(CUSTOMER_INFO_CSV_DOWNLOAD, {
    onCompleted: (data) => {
      getCsvFormat(data?.customerInfoCSVDownload);
    },
  });
  const [zipDownload, { loading: zipLoading }] = useLazyQuery(CUSTOMER_INFO_ZIP_DOWNLOAD, {
    onCompleted: (data) => {
      getZipFormat(data?.customerInfoZipDownload);
    },
  });

  const handleDownload = (e) => {
    e.preventDefault();
    if (merge) {
      csvDownload({ variables: { password } });
    } else {
      zipDownload({ variables: { password } });
    }
    setpassword("");
  };

  return (
    <div
      className={`w-[220px] border items-center justify-between p-5 mt-5 ${
        csvLoading || zipLoading ? "opacity-50" : null
      }`}
      style={{ borderBottom: "1px solid #e5e7eb" }}
    >
      <Paragraph className="mt-1 text-[#282828] text-[13px] font-normal">
        Here you can download a copy of your personal data which we store for your account in CSV
        format.
      </Paragraph>
      <form>
        <Label
          htmlFor="proceed-checkbox-input"
          className="block text-[13px] font-normal text-[#282828] py-5"
        >
          <input
            id="proceed-checkbox-input"
            name="proceed-checkbox-input"
            type="checkbox"
            onClick={() => setmerge(!merge)}
            checked={merge}
          />
          <span className="ml-2">Merge into one file</span>
        </Label>

        <Label
          htmlFor="mobile"
          className="block  text-[13px] font-semibold text-skin-base capitalize"
        >
          Current Password <span className="text-red-500">*</span>
          <input
            type="password"
            onChange={(e) => setpassword(e.target.value)}
            value={password}
            className="border-0 bg-transparent bg-white border-b-2 mt-2 py-2 focus:outline-none"
          />
        </Label>
        <button
          onClick={(e) => handleDownload(e)}
          onKeyDown={(e) => e.key === "Enter" && handleDownload(e)}
          disabled={!password}
          type="submit"
          className="inline-flex items-center mt-5 px-3 py-2 h-8 text-sm border border-[#a80f16] shadow-sm text-skin-inverted hover:text-skin-primary bg-[#a80f16] ease-in-out duration-300 hover:border-black hover:text-black hover:bg-skin-button-secondary-hover disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>Download</span>
        </button>
      </form>
    </div>
  );
}
