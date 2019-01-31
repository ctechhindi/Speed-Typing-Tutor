<template>
  <div class="home">
    <section class="hero is-dark is-bold">
      <div class="hero-body">
        <div class="container has-text-centered">
          <h1 class="title is-1 is-spaced">
            <img src="../assets/logo/logo-64.png">
            {{ this.$store.state.app.productName }}
            <b-tag type="is-primary">{{ this.$store.state.app.version }}</b-tag>
          </h1>
          <h2
            class="subtitle is-3"
          >Hindi(Inscript, Kruti Dev) and English Typing Tutor, Free for Windows</h2>
        </div>
        <div class="container">
          <br>
          <div v-show="isAvailableUpdate" class="notification is-warning">
            <strong style="cursor: pointer;">A new version available,</strong> download the latest version and your new version will be automatically installed.
          </div>
        </div>
        <section class="section container is-fullhd">
          <div class="columns">
            <div class="column is-6">
              <b-collapse class="card">
                <div class="card-header has-background-light">
                  <p class="card-header-title">
                    <b-icon icon="file-tree"></b-icon>&nbsp; Typing Lessons
                  </p>
                </div>
                <div class="card-content">
                  <article class="media">
                    <div class="media-content">
                      <div class="content">
                        <router-link to="/learn/english">Learn English Typing</router-link>
                      </div>
                    </div>
                  </article>
                  <article class="media">
                    <div class="media-content">
                      <div class="content">
                        <router-link to="/learn/hindi/krutidev">Learn KrutiDev Hindi Typing</router-link>
                      </div>
                    </div>
                  </article>
                  <article class="media">
                    <div class="media-content">
                      <div class="content">
                        <router-link to="/learn/hindi/inscript">Learn Inscript Hindi Typing</router-link>
                      </div>
                    </div>
                  </article>
                </div>
              </b-collapse>
            </div>
            <div class="column is-6">
              <b-collapse class="card">
                <div class="card-header has-background-light">
                  <p class="card-header-title">
                    <b-icon icon="keyboard"></b-icon>&nbsp; Typing Test
                  </p>
                </div>
                <div class="card-content">
                  <article class="media">
                    <div class="media-content">
                      <div class="content">
                        <router-link to="/typing-test/english">English Typing Test</router-link>
                      </div>
                    </div>
                  </article>
                  <article class="media">
                    <div class="media-content">
                      <div class="content">
                        <router-link to="/typing-test/hindi/krutidev">KrutiDev Hindi Typing Test</router-link>
                      </div>
                    </div>
                  </article>
                  <article class="media">
                    <div class="media-content">
                      <div class="content">
                        <router-link to="/typing-test/hindi/inscript">Inscript Hindi Typing Test</router-link>
                      </div>
                    </div>
                  </article>
                </div>
              </b-collapse>
            </div>
          </div>
        </section>
      </div>
    </section>
    <section class="section">
      <div class="container has-text-centered">
        <div class="content">
          <h3>
            <strong>Support</strong> Speed Typing Tutor
          </h3>
          <p>Please help keep Speed Typing Tutor free, for anyone, anywhere forever.</p>
          <a
            @click="openLink('https://www.instamojo.com/@speedtypingtutor')"
            class="button is-warning is-large"
          >
            <b-icon icon="currency-inr"></b-icon>
            <span>Donation</span>
          </a>
        </div>
      </div>
    </section>
    <app-footer></app-footer>
  </div>
</template>

<script>
const APPP = require("../../package.json"); // Load Package JSON File

import axios from "axios";
import Footer from "@/components/Footer.vue";

export default {
  name: "home",
  components: {
    "app-footer": Footer
  },
  data() {
    return {
      // Check Available Update
      isAvailableUpdate: false
    };
  },
  methods: {
    /**
     * Open Link for Electron
     * @param: {url} Link
     */
    openLink(link) {
      require("electron").shell.openExternal(link);
    },

    /**
     * Compare Versions
     * @param {new version} v1
     * @param {old version} v2
     */
    compareVersions(v1, v2) {
      v1 = v1.split(".");
      v2 = v2.split(".");
      var longestLength = v1.length > v2.length ? v1.length : v2.length;
      for (var i = 0; i < longestLength; i++) {
        if (v1[i] != v2[i]) {
          return v1 > v2 ? 1 : -1;
        }
      }
      return 0;
    },

    /**
     * REQUEST[GET]
     * Check Application Update is Available
     */
    checkUpdate() {
      var that = this;
      axios
        .get(
          "https://raw.githubusercontent.com/ctechhindi/Speed-Typing-Tutor/master/package.json"
        )
        .then(function(resp) {
          if (resp.data.version !== undefined) {
            if (that.compareVersions(resp.data.version, APPP.version)) {
              that.isAvailableUpdate = true;
            }
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.$Progress.finish();
  },
  created() {
    this.checkUpdate();
  }
};
</script>
