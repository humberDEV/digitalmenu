export function saveMenu(menu) {
  return fetch("/api/menu", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(menu),
  });
}
