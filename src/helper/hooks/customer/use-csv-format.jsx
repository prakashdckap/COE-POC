import { useCallback } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

export default function useCSVFormat() {
  // ZIP Format
  const getZipFormat = useCallback(async (data) => {
    const zip = new JSZip();

    Object?.keys(data)?.map((item) => {
      if (data[item]?.length && item !== "__typename") {
        let csvFile = [];
        const header = Object?.keys(data[item][0]).filter((heading) => heading !== "__typename");

        csvFile = data[item]?.map((value) => {
          return Object?.values(value)?.filter((sol) => sol !== "FileObject");
        });
        csvFile.unshift(header);
        return zip.file(`${item}.csv`, csvFile.join("\n"));
      }
      return null;
    });

    zip.generateAsync({ type: "blob" }).then((content) => {
      // see FileSaver.js
      if (content) saveAs(content, "personal-data.zip");
    });
  }, []);

  // CSV Format
  const getCsvFormat = (data) => {
    const csvFile = data?.map((item) => {
      return Object?.values(item).filter((content) => content !== "FileObject");
    });

    csvFile.unshift(Object.keys(data[0])?.filter((val) => val !== "__typename"));

    const formatedCsv = csvFile.join("\n");
    const blob = new Blob([formatedCsv], { type: "text/csv;charset=utf-8" });
    return saveAs(blob, `PersonalData.csv`);
  };
  return { getZipFormat, getCsvFormat };
}
