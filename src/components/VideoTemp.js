function Video({ title, url }) {
  return (
    <div style={{ marginBottom: "30px" }}>
      <h3>{title}</h3>

      <iframe
        width="100%"
        height="315"
        src={url}
        title={title}
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Video;

