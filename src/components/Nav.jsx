import closeIcon from "../images/icon-remove.svg";
export default function Nav({ keywords, deleteKeyword, deleteAllKeywords }) {
  return (
    <nav className="navbar">
      {keywords.length > 0 && (
        <div className="filtered-words">
          <div className="filtered--wrapper">
            {keywords.map((keyword) => (
              <div key={keyword.id} className="filtered-word">
                {keyword.text}
                <div className="icon-section">
                  <img
                    src={closeIcon}
                    className="close-btn"
                    onClick={() => deleteKeyword(keyword.id)}
                  />
                </div>
              </div>
            ))}
          </div>
          <button onClick={deleteAllKeywords} className="clear-btn">
            Clear
          </button>
        </div>
      )}
    </nav>
  );
}
