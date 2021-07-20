import { ref } from "vue";

const error = ref(null);
const loading = ref(false);
const data = ref(null);

const getData = () => {
  error.value = null;
  data.value = null;
  const performData = async (country) => {
    try {
      error.value = null;
      loading.value = true;
      data.value = null;
      let res = await fetch(
        `https://covid-19-data.p.rapidapi.com/country?name=${country}`,
        {
          method: "GET",
          headers: {
            "x-rapidapi-key":
              "8fbc5ab39amshfeb9ee8a0e00c19p104ca6jsnac0905cacdb1",
            "x-rapidapi-host": "covid-19-data.p.rapidapi.com",
          },
        }
      );
      let dat = await res.json()

      if (dat.length == 1) {
          data.value = dat;
          error.value = null;
      } else {
          data.value = null;
          error.value = "Error/Wrong country name"
      }

      loading.value = false;
    } catch (err) {
      error.value = err;
      loading.value = false;
      console.log(err)
    }
  };
  return { performData, error, loading, data };
};

export { getData };
