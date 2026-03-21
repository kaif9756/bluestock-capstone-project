export async function syncActivities() {

  if (!navigator.onLine) return;

  const data = JSON.parse(localStorage.getItem("pendingSync")) || [];

  if (data.length === 0) return;

  try {

    await fetch("/sync/daily-scores", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ entries: data })
    });

    localStorage.removeItem("pendingSync");

  } catch (err) {

    console.error("Sync failed", err);

  }

}