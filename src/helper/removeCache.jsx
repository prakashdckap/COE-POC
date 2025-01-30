import constants from "./constant";

// this function is used to convert magneto cache image URL to visiable image URL
export const removeCache = (img) => {
  if (img?.includes("cache")) {
    const split = img?.split("/");
    split?.splice(6, 2);
    return split
      .join("/")
      .replaceAll('"', " ")
      .replaceAll(`"`, "")
      ?.replaceAll("&quot;", "")
      .replaceAll(" ", "")
      .replaceAll("www.elementvape.com", "admin.elementvape.com");
  } else if (img) {
    return img?.replaceAll("www.elementvape.com", "admin.elementvape.com");
  }
  return img;
};

export const cleanHTML = (html) => {
  try {
    return html
      ?.replaceAll(`"`, "")
      .replaceAll("&gt;", ">")
      .replaceAll("&lt;", "<")
      .replace(/(?:\\[rn]|[\r\n]+)+/g, "\n");
  } catch {
    return null;
  }
};

export const clearLandingPageHTML = (html) => {
  const htmlObj = JSON.parse(html);
  try {
    return htmlObj?.content
      ? htmlObj?.content
          ?.replaceAll(`"`, "")
          .replaceAll("&gt;", ">")
          .replaceAll("&lt;", "<")
          .replace(/(?:\\[rn]|[\r\n]+)+/g, "\n")
          .replace("{content:", "")
          .replaceAll(`\\https`, "https")
          .replaceAll(`href=${constants.magentoBaseUrl}`, "href=/")
          .replaceAll(`png\\`, "png")
          .replaceAll("\\", "")
      : htmlObj
          ?.replaceAll(`"`, "")
          .replaceAll("&gt;", ">")
          .replaceAll("&lt;", "<")
          .replace(/(?:\\[rn]|[\r\n]+)+/g, "\n")
          .replace("{content:", "")
          .replaceAll(`\\https`, "https")
          .replaceAll(`href=${constants.magentoBaseUrl}`, "href=/")
          .replaceAll(`png\\`, "png")
          .replaceAll("\\", "");
  } catch {
    return null;
  }
};
