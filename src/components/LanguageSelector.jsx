import { useState } from "react";

export default function LanguageSelector() {
  const [selected, setSelected] = useState(
    localStorage.getItem("lang") || "en"
  );

  function handleChange(e) {
    const lang = e.target.value;

    setSelected(lang);
    localStorage.setItem("lang", lang);
    window.location.reload();
  }

  return (
    <div className="w-35 my-2">
      <select
        id="lang"
        value={selected}
        onChange={handleChange}
        className="select bg-white text-black"
      >
        <option disabled={true}>Choose Language</option>
        <option value={"en"}>English</option>
        <option value={"ja"}>日本語</option>
      </select>
    </div>
  );
}
