import { useEffect } from "react";
import { useState } from "react";
import Card from "../components/Card";

const Photos = () => {
  const domain = "https://gallery-app-server.vercel.app";

  const [photos, setPhotos] = useState([]);
  const [sort, setSort] = useState("asc");
  const [submited, setSubmited] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const deletePhoto = async (id) => {
    await fetch(`${domain}/photos/${id}`, {
      method: "DELETE",
    }).then(() => setPhotos(photos.filter((photo) => photo.id !== id)));
  };

  useEffect(() => {
    setLoading(true);
    let url;
    if (sort) {
      if (search === "") {
        url = `${domain}/photos?_sort=id&_order=${sort}`;
      } else {
        url = `${domain}/photos?q=${search}&_sort=id&_order=${sort}`;
      }
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setPhotos(data);
          setLoading(false);
        });
    }
  }, [sort, search]);

  useEffect(() => {
    setLoading(true);
    fetch(`${domain}/photos`)
      .then((response) => response.json())
      .then((data) => {
        setPhotos(data);
        console.log(data);
        setLoading(false);
      });
  }, [refresh]);

  if (error)
    return (
      <h1 style={{ width: "100%", textAlign: "center", marginTop: "20px" }}>
        Error!
      </h1>
    );

  return (
    <>
      <div className="container">
        <div className="options">
          <select
            onChange={(e) => setSort(e.target.value)}
            data-testid="sort"
            className="form-select"
            style={{}}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmited(search);
            }}
          >
            <input
              type="text"
              data-testid="search"
              onChange={(e) => setSearch(e.target.value)}
              className="form-input"
            />
            <input
              type="submit"
              value="Search"
              data-testid="submit"
              className="form-btn"
            />
          </form>
        </div>
        <div className="content">
          {loading ? (
            <h1
              style={{ width: "100%", textAlign: "center", marginTop: "20px" }}
            >
              Loading...
            </h1>
          ) : (
            photos.map((photo) => {
              return (
                <Card
                  key={photo.id}
                  photo={photo}
                  deletePhoto={deletePhoto}
                />
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Photos;
