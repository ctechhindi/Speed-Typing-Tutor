<template>
  <div id="app-footer">
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
            <a style="padding-right: 0.5em" @click="openLink($store.state.app.social.instagram)">
              <b-icon size="is-large" type="is-primary" icon="instagram"></b-icon>
            </a>
            <a style="padding-right: 0.5em" @click="openLink($store.state.app.social.github)">
              <b-icon size="is-large" type="is-primary" icon="github-circle"></b-icon>
            </a>
            <a
              style="padding-right: 0.5em"
              @click="openLink($store.state.app.social.stackOverflow)"
            >
              <b-icon size="is-large" type="is-primary" icon="stack-overflow"></b-icon>
            </a>
            <a style="padding-right: 0.5em" @click="openLink($store.state.app.social.twitter)">
              <b-icon size="is-large" type="is-primary" icon="twitter"></b-icon>
            </a>
            <a style="padding-right: 0.5em" @click="openLink($store.state.app.social.googlePlus)">
              <b-icon size="is-large" type="is-primary" icon="google-plus"></b-icon>
            </a>
          </p>
          <p>For Feedback & Complaints email to
            <a href="#">speedtypingtutor@gmail.com</a>
          </p>
          <p>
            Copyrights ©
            <a
              @click="openLink($store.state.app.copyrightURL)"
            >{{ this.$store.state.app.copyright }}</a> 2018 | Made with
            <b-icon icon="heart" type="is-danger"></b-icon>in India
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: "app-footer",
  methods: {
    /**
     * Open Link for Electron
     * @param: {url} Link
     */
    openLink(link) {
      require("electron").shell.openExternal(link);
    }
  }
};
</script>
