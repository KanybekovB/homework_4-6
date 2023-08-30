import React, { useState, useEffect } from "react";

export default function AddPost(props) {
  const [name, setName ] = useState("");
  const [description, setDescription] = useState("");
  const [catId, setCatId] = useState("");
  const [randomCat, setRandomCat] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addPost(name, description, catId, randomCat);
    setName("");
    setDescription("");
    setDescription('')
    setCatId('');
    getRandomImg()
  };

  const getRandomImg = async() => {
    const response = await fetch('https://api.thecatapi.com/v1/images/search?mime_types=jpg')
    const data = await response.json()
    setCatId(data[0].id)
  }
  const getCatImg = (id) => {
    return 'https://cdn2.thecatapi.com/images/' + id + '.jpg'
  };

  useEffect(() => {
    getRandomImg();
  }, []);

  useEffect(() => {
    if (catId) {
      setRandomCat(getCatImg(catId));
    }
  }, [catId]);

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new post</h2>
      <div className="input-container">
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="input-container">
        <label htmlFor="body">Body</label>
        <textarea
          name="body"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="imgBlock">
        <img src={randomCat} alt={randomCat}/>  
        <button onClick={getRandomImg} className="btn-randomImg">Random Img</button>
      </div>
      
      <button type="submit" className="btn-submit btn">Submit</button>
    </form>
  );
}
