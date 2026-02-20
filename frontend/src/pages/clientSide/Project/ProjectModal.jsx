import React, { useMemo, useState } from "react";

export default function ProjectModal({ project, onClose }) {
  const [activeImg, setActiveImg] = useState(0);
  const [showFull, setShowFull] = useState(false);

  const images = useMemo(() => {
    if (!Array.isArray(project?.photos)) return [];

    // Extract only the url field
    return project.photos.map((p) => p.url);
  }, [project]);

  const hasImages = images.length > 0;
  const mainSrc = hasImages
    ? images[Math.min(activeImg, images.length - 1)]
    : "";

  if (!project) return null;

  return (
    <section className="project-overlay" role="dialog" aria-modal="true">
      <button
        className="project-overlay-bg"
        type="button"
        onClick={onClose}
        aria-label="Close overlay"
      />

      <div className="project-modal">
        <div className="project-modal-top">
          <div>
            <h2 className="project-modal-title">{project.name}</h2>
            <p className="project-modal-subtitle">{project.type}</p>
          </div>

          <button
            className="project-modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className="project-modal-body">
          <div className="project-modal-grid">
            <div className="project-modal-item">
              <span className="project-modal-label">Project Address</span>
              <p className="project-modal-value">
                {project.address || "Not provided yet."}
              </p>
            </div>

            <div className="project-modal-item">
              <span className="project-modal-label">Starting Date</span>
              <p className="project-modal-value">
                {project.startDate || project.start_date || "Not provided yet."}
              </p>
            </div>

            <div className="project-modal-item">
              <span className="project-modal-label">Completed Date</span>
              <p className="project-modal-value">
                {project.completedDate ||
                  project.completed_date ||
                  "Not completed yet."}
              </p>
            </div>

            <div className="project-modal-item">
              <span className="project-modal-label">Status</span>
              <p className="project-modal-value">{project.status}</p>
            </div>
          </div>

          {/* Only show media if backend provided images */}
          {hasImages ? (
            <div className="project-modal-media">
              <div className="project-modal-media-bar">
                <span className="project-modal-count">
                  {images.length > 1 ? `Photos (${images.length})` : "Photo"}
                </span>
              </div>

              <div className="project-modal-media-main">
                <button
                  type="button"
                  className="project-modal-img-btn"
                  onClick={() => setShowFull(true)}
                  aria-label="View full image"
                >
                  <img
                    className="project-modal-img"
                    src={mainSrc}
                    alt={`${project.name} progress`}
                  />
                </button>
              </div>

              {images.length > 1 && (
                <div className="project-modal-thumbs" role="list">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`project-modal-thumb ${
                        idx === activeImg ? "is-active" : ""
                      }`}
                      onClick={() => setActiveImg(idx)}
                      aria-label={`View photo ${idx + 1}`}
                    >
                      <img
                        className="project-modal-thumb-img"
                        src={src}
                        alt={`Thumbnail ${idx + 1}`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="project-empty">No photos yet.</div>
          )}
        </div>
      </div>

      {/* Guard lightbox */}
      {showFull && hasImages && (
        <div className="image-lightbox" role="dialog" aria-modal="true">
          <button
            className="image-lightbox-bg"
            type="button"
            onClick={() => setShowFull(false)}
            aria-label="Close image preview"
          />
          <img
            className="image-lightbox-img"
            src={mainSrc}
            alt={`${project.name} full view`}
          />
          <button
            className="image-lightbox-close"
            type="button"
            onClick={() => setShowFull(false)}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </section>
  );
}
