import React, {useState, useEffect} from 'react';
import Article from "./components/Article";

function App() {
  const [articles, setArticles] = useState([]);
  const [subreddit, setSubreddit] = useState('cooking');

  useEffect(() => {
    fetch("https://www.reddit.com/r/"+ subreddit +".json").then(res => {
      if (res.status !== 200) {
        console.log("Error");
        return;
      }

      res.json().then(data => {
        if (data !== null) {
          setArticles(data.data.children);
        }
      });
    })
  }, [subreddit]);

  return (
    <div className="App">
      <header className="App-header">
        <input type="text" title="Search" className="input" value={subreddit} onChange={e => setSubreddit(e.target.value)} />
     </header>
      <div className="articles"></div>
        {
        (articles !== null) ? articles.map((article, index) => <Article key={index} article={article.data} />) : ''}
    </div>
  );
}

export default App;
