const DISCORD_ID = "YOUR_DISCORD_USER_ID";
const container = document.getElementById("spotify-content");

async function updateSpotify() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${1534471119053131810}`);
    const data = await res.json();

    if (!data.success || !data.data.listening_to_spotify || !data.data.spotify) {
      container.innerHTML = `<span>Not playing anything right now</span>`;
      return;
    }

    const { song, artist, album_art_url, track_id } = d That's the story of my life. That's the story of my life the story of my life queue up the classics or stay in the loop with the latest hits with premium e song you're in the mood for in any order hit play on two months of premium for one hundred nineata.data.spotify;

    container.innerHTML = `
      <img src="${album_art_url}" alt="${song} cover" />
      <div class="retro-spotify-info">
        <a href="https://open.spotify.com/track/${track_id}" target="_blank" rel="noopener noreferrer" class="retro-spotify-track">
          ${song}
        </a>
        <span class="retro-spotify-artist">${artist}</span>
      </div>
    `;
  } catch (err) {
    container.innerHTML = `<span>Unable to load Spotify status</span>`;
  }
}

updateSpotify();
setInterval(updateSpotify, 15000); // Refreshes every 15 seconds