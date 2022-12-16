import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddPhoto = () => {
  const domain = "https://gallery-app-server.vercel.app";

  const [imageUrl, setImageUrl] = useState("");
  const [captions, setCaptions] = useState("");
  const [secret, setSecret] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const addPhoto = async (e) => {
    e.preventDefault();
    const data = {
      imageUrl: imageUrl,
      captions: captions,
      createdAt: new Date(),
      updatedAt: new Date(),
      secret: secret,
    };

    switch (secret) {
      default:
        setError("You are not authorized");
        break;
      case "password":
        await fetch(`${domain}/photos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => {
          console.log(res.json());
        });
        navigate("/photos");
        break;
    }
  };

  return (
    <>
      <div className="container">
        {/* render error message if exist */}
        {error && <div className="error-msg">{error}</div>}
        <form
          className="add-form"
          onSubmit={addPhoto}
        >
          <label>
            Image Url:
            <input
              className="add-input"
              type="text"
              data-testid="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </label>
          <label>
            Captions:
            <input
              className="add-input"
              type="text"
              data-testid="captions"
              value={captions}
              onChange={(e) => setCaptions(e.target.value)}
            />
          </label>
          <label>
            Secret:
            <input
              className="add-input"
              type="text"
              value={secret}
              data-testid="secret"
              onChange={(e) => setSecret(e.target.value)}
            />
          </label>

          <input
            className="submit-btn"
            type="submit"
            value="Submit"
            data-testid="submit"
          />
        </form>
      </div>
    </>
  );
};

export default AddPhoto;
