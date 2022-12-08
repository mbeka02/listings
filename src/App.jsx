import { useEffect, useState } from "react";
import Listings from "./components/Listings";
import Nav from "./components/Nav";
import listdata from "./data.json";
import { nanoid } from "nanoid";
import "./App.css";

function App() {
  //STATE
  const [list, setList] = useState([]);
  const [keys, setKeys] = useState([]);
  /*const fetchData = () => {
    fetch("data.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setList(data));
  };*/
  const handleClick = (keyword) => {
    //checks for existing word.
    const found = keys.some((key) => key.text === keyword);
    //if word is not found add new obj to state variable
    if (!found) {
      setKeys((prev) => {
        return [{ text: keyword, id: nanoid() }, ...prev];
      });
    }
  };
  //filtering function for listings
  const filterData = () => {
    if (keys) {
      const newList = listdata.filter((data) => {
        return keys.every((key) => {
          return (
            data.role === key.text ||
            data.level === key.text ||
            data.languages.includes(key.text) ||
            data.tools.includes(key.text)
          );
        });
      });
      setList(newList);
    } else {
      //causes re-render with new filtered listings
      setList(listdata);
    }
  };
  const deleteKeyword = (id) => {
    setKeys((keywords) => keywords.filter((keyword) => keyword.id !== id));
    //console.log(id);
  };
  //Deletes all selected words
  const deleteAllKeywords = () => {
    setKeys([]);
  };

  const renderList = list
    //.filter((item) => !item.languages.includes(keys))
    .map((item) => {
      return (
        <Listings
          logo={item.logo}
          key={item.id}
          company={item.company}
          contract={item.contract}
          position={item.position}
          postedAt={item.postedAt}
          role={item.role}
          vnew={item.new}
          featured={item.featured}
          location={item.location}
          languages={item.languages}
          tools={item.tools}
          level={item.level}
          handleClick={handleClick}
        />
      );
    });

  /*useEffect(() => {
    fetchData();
  }, []);*/
  useEffect(() => {
    filterData();
  }, [keys]);

  return (
    <div className="App">
      <Nav
        keywords={keys}
        deleteKeyword={deleteKeyword}
        deleteAllKeywords={deleteAllKeywords}
      />
      <div className="listings">{renderList}</div>
    </div>
  );
}

export default App;
