function updateCity(user, newCity) {
  let updated = { ...user, address: { ...user.address, city: newCity } };
  console.log(user === updated, user.address === updated.address);
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
