export default function generateRandomId(existingIds?: string) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const idLength = 8;
  let randomId = "";

  do {
    for (let i = 0; i < idLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters[randomIndex];
    }
  } while (existingIds?.includes(randomId));

  return randomId;
}
