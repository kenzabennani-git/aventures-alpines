import videos from "../data/videos";
import Video from "../components/VideoTemp";

function Videos() {
  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      
      <h1>Bibliothèque Vidéos</h1>

      <p style={{ marginBottom: "30px" }}>
        Découvrez toutes nos vidéos d’activités en montagne.
      </p>

      {videos.map((video) => (
        <Video
          key={video.id}
          title={video.title}
          url={video.url}
        />
      ))}

    </div>
  );
}

export default Videos;
