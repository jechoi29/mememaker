import React, { useState } from "react";
import "./App.css";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./media.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Search } from "@material-ui/icons";

// every component is a function
function App() {
  const [text, setText] = useState("");
  const [memes, setMemes] = useState([]); // memes will come into a list of memes
  const [loading, setLoading] = useState(false);

  // gets the data from GIPHY api call
  async function getMemes() {
    setLoading(true);
    setMemes([]);
    // console.log("GET MEMES"); to check in network if call was sent
    const key = "5YIxMmUm43JG566kbQb0wNwUkygw7qoi";
    let url = "https://api.giphy.com/v1/gifs/search?"; // let is a bit more scoped than var
    url += "api_key=" + key;
    url += "&q=" + text; // text is our query
    const r = await fetch(url, {
      method: "GET"
      // or you can also upload your own files
      // method: "POST",
      // data: file
    }); // fetch is built into the browser
    const body = await r.json(); // parse the json from the response
    setMemes(body.data); // use that body of that response and get the data, then set the list of memes
    setText(""); // set text back to empty to restart the response
    setLoading(false);
  }

  // console.log(memes); // check out the memes in browser console

  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrap">
          <TextField
            fullWidth
            id="outlined-basic"
            label="search for MemEs! ✌︎☻✌︎"
            variant="outlined"
            value={text}
            // update that text value with onChange input
            onChange={e => setText(e.target.value)}
            onKeyPress={e => {
              if (e.key === "Enter") getMemes(); // want to do the meme search
            }}
          />
          <Button variant="contained" color="primary" onClick={getMemes}>
            <Search />
          </Button>
        </div>

        {/* only if loading */}
        <div className="loading">{loading && <CircularProgress />}</div>
      </header>
      <div className="memes">
        {/* render a list! And adds all of the outputs of memes into props */}
        {memes && memes.map((meme, i) => <Meme key={i} {...meme} />)}
      </div>
    </div>
  );
}

// get one meme
function Meme({ images, title }) {
  const url = images.fixed_height.url;
  return (
    <div className="meme" onClick={() => window.open(url, "_blank")}>
      <div className="meme-title">{title}</div>
      <img height="200" alt="meme" src={url} />
    </div>
  );
}

export default App;
