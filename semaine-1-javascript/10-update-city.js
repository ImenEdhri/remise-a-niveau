export function updateCity(user, newCity) {
  let updated = { ...user, address: { ...user.address, city: newCity } };
  return updated;
}
updateCity(
  {
    name: "Imen",  
    address: {  
        street: "Ghlissia",
        city: "Douz",
        country: "Tunisia",
    }
  },
  "New City Ghlissia"
);
