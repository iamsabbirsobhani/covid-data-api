<template>
  <q-page class="flex flex-center">
    <q-form @submit.prevent="update(text)" class="form">
      <q-card class="my-card" style="max-width: 600px; margin: auto">
        <q-card-section>
          <div class="text-h6">Covid Data Center</div>
          <div class="text-subtitle2">by Sobhani</div>
        </q-card-section>

        <q-card-section>
          <q-input
            class="input"
            filled
            v-model="text"
            label="Country"
            style="width: 100%"
            required
          />
          <!-- <div v-if="data">{{data[0]}}</div> -->
          <div class="data" v-for="d in formatedDocs" :key="d.code">
            <div class="country">
              Country:
              <p style="display: inline">{{ d["country"] }}</p>
            </div>
            <div class="recovered">
              Recovered:
              <p style="display: inline">{{ d["recovered"] }}</p>
            </div>
            <div class="critical">
              Critical cases:
              <p style="display: inline">{{ d["critical"] }}</p>
            </div>
            <div class="confirmed">
              Confirmed cases:
              <p style="display: inline">{{ d["confirmed"] }}</p>
            </div>
            <div class="deaths">
              Deaths:
              <p style="display: inline">{{ d["deaths"] }}</p>
            </div>
            <div class="lastChange">
              Last change:
              <p style="display: inline">{{ d["lastChange"] }}</p>
            </div>
            <div class="lastUpdate">
              Last update:
              <p style="display: inline">{{ d["lastUpdate"] }}</p>
            </div>
          </div>
          <div class="error" v-if="error">{{ error }}</div>
        </q-card-section>

        <q-separator dark />

        <q-card-actions>
          <q-btn
            :loading="loading"
            color="secondary"
            type="submit"
            label="SUBMIT"
            style="width: 100%"
            class="button"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
    <div class="footer">
      <p>Copyright © 2021 made with <i class="fas fa-heart"></i> by Sobhani.</p>
      <p>This app will remain active till this <a target="_blank" href="https://rapidapi.com/Gramzivi/api/covid-19-data/">API</a> is actively maintained.</p>
    </div>
</template>

<script>
import { getData } from "src/composable/getData";
import { format } from "date-fns";
import { ref, computed } from "vue";

export default {
  name: "PageIndex",
  setup() {
    const { data, loading, error, performData } = getData();
    const text = ref(null);

    const update = async (country) => {
      await performData(country);
      text.value = null;
    };

    const formatedDocs = computed(() => {
      if (data.value) {
        return data.value.map((doc) => {
          let lastChanged = format(Date.parse(doc.lastChange), "PPp");
          let lastUpdated = format(Date.parse(doc.lastChange), "PPp");
          return {
            ...doc,
            lastChange: `${lastChanged}`,
            lastUpdate: `${lastUpdated}`,
          };
        });
      }
      return null;
    });

    return { update, text, error, loading, formatedDocs };
  },
};
</script>

<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600;1,700&display=swap");
.flex-center {
  font-family: "Open Sans", sans-serif;
}
.data {
  font-size: 18px;
  margin: 10px;
}
.form {
  width: 450px;
}

.error {
  color: red;
}

.country, .recovered, .critical, .confirmed, .lastChange, .lastUpdate {
  p{
    font-weight: 500;
  }
   font-weight: bold;
}
.deaths {
  p{
    font-weight: 700;
  }
  font-weight: bold;
  color: red;
}
.footer {
  font-weight: 500;
  color: gray;
  margin: auto;
  text-align: center;
}

.fa-heart {
  color: red;
}


@media (max-width: 425px) {
  .form {
    width: 350px;
  }
}
</style>
