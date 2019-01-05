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
        <div class="container" v-show="isAvailableUpdate">
          <br>
          <div class="notification is-warning">
            <strong style="cursor: pointer;" @click="openLink('https://github.com/ctechhindi/Speed-Typing-Tutor/releases')">
              A new version available,
            </strong> download the latest version and install in your pc.
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
    <footer class="footer">
      <div class="container">
        <div class="content has-text-centered has-text-dark">
          <p>
            <a style="padding-right: 0.5em" @click="openLink($store.state.app.social.youtube)">
              <b-icon size="is-large" type="is-primary" icon="youtube-tv"></b-icon>
            </a>
            <a style="padding-right: 0.5em" @click="openLink($store.state.app.social.fb)">
              <b-icon size="is-large" type="is-primary" icon="facebook"></b-icon>
            </a>
            <a
              style="padding-right: 0.5em"
              @click="openLink($store.state.app.social.instagram)"
            >
              <b-icon size="is-large" type="is-primary" icon="instagram"></b-icon>
            </a>
            <a
              style="padding-right: 0.5em"
              @click="openLink($store.state.app.social.github)"
            >
              <b-icon size="is-large" type="is-primary" icon="github-circle"></b-icon>
            </a>
            <a
              style="padding-right: 0.5em"
              @click="openLink($store.state.app.social.stackOverflow)"
            >
              <b-icon size="is-large" type="is-primary" icon="stack-overflow"></b-icon>
            </a>
            <a
              style="padding-right: 0.5em"
              @click="openLink($store.state.app.social.twitter)"
            >
              <b-icon size="is-large" type="is-primary" icon="twitter"></b-icon>
            </a>
            <a
              style="padding-right: 0.5em"
              @click="openLink($store.state.app.social.googlePlus)"
            >
              <b-icon size="is-large" type="is-primary" icon="google-plus"></b-icon>
            </a>
          </p>
          <p>
            Copyrights ©
            <a @click="openLink($store.state.app.copyrightURL)">{{ this.$store.state.app.copyright }}</a> 2018 | Made with
            <b-icon icon="heart" type="is-danger"></b-icon>in India
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
const APPP = require('../../package.json') // Load Package JSON File
import axios from "axios";

export default {
  name: "home",
  data() {
    return {
      // Check Available Update
      isAvailableUpdate: false
    }
  },
  methods: {
    /**
     * Open Link for Electron
     * @param: {url} Link
     */
    openLink(link) {
      require('electron').shell.openExternal(link)
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
      var that = this
      axios
        .get(
          "https://raw.githubusercontent.com/ctechhindi/Speed-Typing-Tutor/master/package.json"
        )
        .then(function(resp) {
          if (resp.data.version !== undefined) {
            if (that.compareVersions(resp.data.version, APPP.version)) {
              that.isAvailableUpdate = true
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
    this.checkUpdate()
  }
};
</script>
