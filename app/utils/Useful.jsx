export const formatISOStringToDMY = (dateString) => {
  const date = new Date(dateString); // Parse the ISO string
  if (isNaN(date)) {
    console.log("Invalid date string");
  }

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  const formattedDate = `${day} ${month} ${year}`;
  return formattedDate;
};

export const fetchData = async (req, res) => {
  axios
    .post(`${API}/getprositefull`, { username: "@testaryansh" })
    .then((res) => {
      setNewData([res.data.prosite]);
    })
    .catch((E) => console.log(E));
};

