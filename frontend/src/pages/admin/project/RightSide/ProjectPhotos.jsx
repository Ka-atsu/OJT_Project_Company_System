// ProjectPhotos.jsx
import { ProjectsService } from "../projects.services";

export default function ProjectPhotos({
  draft,
  selected,
  isCreating,
  loading,
  setDraft,
  setItems,
}) {
  return (
    <div className="ap-block">
      {/* Upload new photos */}
      <div>
        <label className="ap-field">
          <span className="ap-field__label">Project photos</span>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setDraft((d) => ({
                ...d,
                photos: [...(d.photos || []), ...files],
              }));
            }}
            disabled={loading}
          />
        </label>
      </div>

      {/* Draft (new) photos */}
      {draft.photos?.length > 0 && (
        <div className="ap-photos">
          {draft.photos.map((file, i) => (
            <div key={i} className="ap-photoWrap">
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="ap-photo"
                onLoad={(e) => URL.revokeObjectURL(e.target.src)}
              />

              <button
                type="button"
                className="ap-photoDel"
                onClick={() =>
                  setDraft((d) => ({
                    ...d,
                    photos: d.photos.filter((_, idx) => idx !== i),
                  }))
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Saved photos */}
      {!isCreating && selected?.photos?.length > 0 && (
        <div className="ap-block">
          <div className="ap-muted ap-small">Saved photos</div>

          <div className="ap-photos">
            {selected.photos.map((p) => (
              <div key={p.id} className="ap-photoWrap">
                <img src={p.url} alt="" className="ap-photo" loading="lazy" />

                <button
                  type="button"
                  className="ap-photoDel"
                  title="Delete photo"
                  onClick={async () => {
                    if (!window.confirm("Delete this photo?")) return;

                    try {
                      await ProjectsService.deletePhoto(p.id);

                      setItems((prev) =>
                        prev.map((proj) =>
                          proj.id === selected.id
                            ? {
                                ...proj,
                                photos: proj.photos.filter(
                                  (x) => x.id !== p.id,
                                ),
                              }
                            : proj,
                        ),
                      );
                    } catch (e) {
                      alert(e.message || "Failed to delete photo");
                    }
                  }}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
