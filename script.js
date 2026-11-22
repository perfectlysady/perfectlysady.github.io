// Lanyard needs the Discord ID as a STRING: as a bare number it is too big for JS and gets rounded to a different ID.
const DISCORD_ID = "1534471119053131810";
const container = document.getElementById("spotify-content");
let lastKey = null;

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

// Only touch the DOM when something changed, so the cover art doesn't reload every poll.
function show(html, key) {
  if (!container || key === lastKey) return;
  lastKey = key;
  container.innerHTML = html;
}

async function updateSpotify() {
  if (!container) return;
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
    const json = await res.json();

    if (!json.success) {
      console.warn("Lanyard error:", json.error);
      show(`<span>Unable to load Spotify status</span>`, "error");
      return;
    }

    const sp = json.data.listening_to_spotify ? json.data.spotify : null;
    if (!sp) {
      show(`<span>Not playing anything right now</span>`, "idle");
      return;
    }

    const { song, artist, album_art_url, track_id } = sp;
    show(
      `
      ${album_art_url ? `<img src="${esc(album_art_url)}" alt="${esc(song)} cover" />` : ""}
      <div class="retro-spotify-info">
        <a href="https://open.spotify.com/track/${esc(track_id)}" target="_blank" rel="noopener noreferrer" class="retro-spotify-track">${esc(song)}</a>
        <span class="retro-spotify-artist">${esc(artist)}</span>
      </div>
    `,
      track_id
    );
  } catch (err) {
    console.warn("Spotify widget error:", err);
    show(`<span>Unable to load Spotify status</span>`, "error");
  }
}

updateSpotify();
setInterval(updateSpotify, 15000); // refresh every 15 seconds
