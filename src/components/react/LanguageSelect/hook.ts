import { langPathRegex } from "../../../languages";

export default function useLanguageSelect(){
  function handleChangeLanguage(url, language){
    const isDev = url.host === "localhost:3000";
    const actualDest = url.pathname.replace(langPathRegex, "/");

    if (isDev) {
      url.pathname =
        actualDest === "/"
          ? `/${language}introduction`
          : `/${language}${actualDest}`;
    } else {
      url.pathname =
        actualDest === "/firebolt-docs"
          ? `/firebolt-docs/${language}introduction`
          : `/firebolt-docs/${language}/${
              actualDest.split("/firebolt-docs/")[1]
            }`;
    }
  };

  return {
    handleChangeLanguage
  }
}