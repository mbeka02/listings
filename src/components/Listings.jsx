import { useEffect } from "react";
import { useState } from "react";
import { nanoid } from "nanoid";
export default function Listings({
  //Destructuring
  company,
  contract,
  position,
  postedAt,
  role,
  languages,
  tools,
  featured,
  location,
  vnew,
  logo,
  level,
  handleClick,
}) {
  const [icon, setIcon] = useState("");
  let keywords = [role, level, ...languages, ...tools];
  //dynamic import
  const handleImport = () => {
    const svglogo = import(/* @vite-ignore */ logo).then((data) =>
      setIcon(data.default)
    );
  };
  //Runs function on page render.
  useEffect(() => {
    handleImport();
  }, []);

  return (
    <div className={`listing-card ${vnew && "highlight"}`}>
      <div className="flex">
        <img src={icon} alt="logo" className="logo" />
        <div className="grid card-container">
          <div className="flex card-container1">
            <p className="company-title">{company}</p>
            <div className="flex conditional">
              {vnew && <div className="new">new!</div>}
              {featured && <div className="featured">featured</div>}
            </div>
          </div>
          <p className="position">{position}</p>
          <div className="flex card-container2">
            <p>{postedAt}</p>
            <p>{contract}</p>
            <p>{location}</p>
          </div>
        </div>
      </div>
      <div className="keywords">
        {keywords?.map((keyword) => (
          <span
            key={nanoid()}
            onClick={() => handleClick(keyword)}
            className="keyword"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}
