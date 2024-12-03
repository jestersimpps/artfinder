// Array of art-related Unsplash photos
const artImages = [
  'photo-1541961017774-22349e4a1262',
  'photo-1549887534-1541e9326642',
  'photo-1541963463532-d68292c34b19',
  'photo-1579783483458-83d02161294e',
  'photo-1577083552761-44f6d8d5c916',
  'photo-1580136579312-94651dfd596d'
];

export function getRandomArtImage(): string {
  const randomIndex = Math.floor(Math.random() * artImages.length);
  return `https://images.unsplash.com/${artImages[randomIndex]}`;
}
