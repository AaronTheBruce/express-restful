document.addEventListener("DOMContentLoaded", async () => {
    try {
      const userId = localStorage.getItem(TWITTER_LITE_CURRENT_USER_ID)
      const res = await fetch(`http://localhost:8081/users/${userId}/tweets`, {
        headers: {
            "ContentType": "application/json",
            Authorization: `Bearer ${localStorage.getItem(
            "TWITTER_LITE_ACCESS_TOKEN"
          )}`
        }
      });

      if (res.status === 401) {
        window.location.href = "/log-in";
        return;
      }

      const { tweets } = await res.json();
      const { message, user: { username } } = tweets;

      const tweetsContainer = document.querySelector("#tweets-container");
      const tweetsHtml = tweets.map(
        ({ message, id }) => `
        <div class="card" id="tweet-${id}">
          <div class="card-body">
            <p class="card-text">${message}</p>
          </div>
        </div>
      `
      );
      tweetsContainer.innerHTML = tweetsHtml.join("");
    } catch (e) {
      console.error(e);
    }
  });
