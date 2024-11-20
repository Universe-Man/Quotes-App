import { useState, useEffect } from "react";

const QuotesApp = () => {
  const [quote, setQuote] = useState({
    text: "Maybe that's enlightenment enough: to know that there is no final resting place of the mind, no moment of smug clarity. Perhaps wisdom... is realizing how small I am, and unwise, and how far I have yet to go.",
    author: "Anthony Bourdain"
  });
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const currentYear = new Date().getFullYear();

const fetchNewQuote = async () => {
  const url = import.meta.env.VITE_QUOTABLE_API_URL;
  const response = await fetch(url);
  const data = await response.json();
  setQuote({
    text: data.content,
    author: data.author,
  });
};

const toggleFavorites = () => {
  setShowFavorites(!showFavorites);
};

const addToFavorites = () => {
  const isAlreadyInFavorites = favorites.some((fav) => fav.text === quote.text && fav.author === quote.author);
  if (!isAlreadyInFavorites) {
    const updatedFavorites = [...favorites, quote];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };
};

useEffect(() => {
  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  setFavorites(storedFavorites);
}, []);

  return (
    <div className="container">
      <div className="quotes-app">
        <h1 className="app-heading">Quote</h1>
        <i className="bx bxs-heart fav-icon" onClick={toggleFavorites} />
        <div className="quote">
          <i className="bx bxs-quote-alt-left left-quote"></i>
          <p className="quote-text">{quote.text}</p>
          <p className="quote-author">{quote.author}</p>
          <i className="bx bxs-quote-alt-right right-quote" />
        </div>
        <div className="circles">
          <div className="circle-1"></div>
          <div className="circle-2"></div>
          <div className="circle-3"></div>
          <div className="circle-4"></div>
        </div>
        <div className="buttons">
          <button className="btn btn-new" onClick={fetchNewQuote}>New Quote</button>
          <button className="btn btn-fav" onClick={addToFavorites}>Add to Favorites</button>
        </div>
        {showFavorites && (
          <div className="favorites">
            <button className="btn-close" onClick={toggleFavorites}>
              <i className="bx bx-x" />
            </button>
            {favorites.map((favQuote, index) => (
              <div className="fav-quote" key={index}>
                <div className="fav-quote-delete">
                  <i className="bx bx-x-circle" onClick={() => {
                    const updatedFavorites = favorites.filter((item, i) => i !== index);
                    setFavorites(updatedFavorites);
                    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
                  }}></i>
                </div>
                <div className="fav-quote-content">
                  <div className="fav-quote-text">
                    {favQuote.text}
                  </div>
                  <div className="fav-quote-author">
                    {favQuote.author}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <footer>© {currentYear} | Built by <a href={import.meta.env.VITE_IAN_POLLACK_WEBSITE_URL} target="_blank">Ian Pollack</a></footer>
    </div>
  );
};

export default QuotesApp;