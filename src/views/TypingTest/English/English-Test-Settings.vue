<template>
  <div class="english-test-settings">
    <section class="hero is-bold is-success">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Choice English Typing Content</h1>
          <h2
            class="subtitle"
          >Take typing speed test, practice your touch typing skills, learn to type faster and with fewer errors with this free online typing tutor.</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <b-field horizontal label="Passage">
          <b-select
            placeholder="Select Typing Passage"
            v-model="selectedTypingPassage"
            icon="file-document"
            expanded
            required
          >
            <option value="random">Random Typing Passage</option>
            <option
              v-for="option in listEnglishTypingPassages"
              :key="option.id"
              :value="encodeBase64(option.id)"
            >{{ option.name }}</option>
          </b-select>
        </b-field>
        <b-field horizontal label="Time Duration">
          <b-select
            v-model="selectTimeDuration"
            icon="clock"
            placeholder="Select Time for Test"
            required
          >
            <option
              v-for="option in allTimeDuration"
              :value="option.id"
              :key="option.id"
            >{{ option.name }}</option>
          </b-select>
        </b-field>
        <b-field horizontal label="Words Length">
          <b-select
            v-model="selectTypingWordsLength"
            icon="file-word-box"
            placeholder="Select Words Length"
            required
          >
            <option
              v-for="option in allTypingWordsLength"
              :value="option.id"
              :key="option.id"
            >{{ option.name }}</option>
          </b-select>
        </b-field>
        <b-field horizontal label="Disable Backspace Key">
          <b-switch v-model="isDisableBackSpace">Disable Backspace Key</b-switch>
        </b-field>
        <b-field horizontal>
          <p class="control">
            <button @click="startTypingTest" class="button is-primary">Start Typing</button>
          </p>
        </b-field>
      </div>
    </section>
  </div>
</template>

<script>
import { Base64 } from "js-base64";

export default {
  name: "english-test-settings",
  data() {
    return {
      selectedTypingPassage: "random"
    };
  },

  computed: {
    listEnglishTypingPassages() {
      return this.$store.state.et.listEnglishTypingPassages;
    },
    allTimeDuration() {
      return this.$store.state.et.allTimeDuration;
    },
    selectTimeDuration: {
      get() {
        return this.$store.state.et.selectedTimeDuration;
      },
      set(val) {
        this.$store.commit("et/UP_TIME_DURATION", val);
      }
    },
    allTypingWordsLength() {
      return this.$store.state.et.allTypingWordsLength;
    },
    selectTypingWordsLength: {
      get() {
        return this.$store.state.et.selectedTypingWordsLength;
      },
      set(val) {
        this.$store.commit("et/UP_TYPING_WORDS_LENGTH", val);
      }
    },
    isDisableBackSpace: {
      get() {
        return this.$store.state.et.isDisableBackSpace;
      },
      set(val) {
        this.$store.commit("et/UP_DISABLE_BACKSPACE", val);
      }
    }
  },

  methods: {
    // Encode String in Base64
    encodeBase64(str) {
      return Base64.encode(str);
    },

    startTypingTest() {
      if (
        this.selectedTypingPassage === "" ||
        this.selectTimeDuration === "" ||
        this.selectTypingWordsLength === ""
      ) {
        return false;
      }

      if (this.selectedTypingPassage === "random") {
        var genRandomNum =
          Math.floor(
            Math.random() * (this.listEnglishTypingPassages.length - 1 + 1)
          ) + 0;
        var lessonID = this.listEnglishTypingPassages[genRandomNum].id;
        this.$router.push({
          name: "typing-test-english",
          params: { id: Base64.encode(lessonID) }
        });
      } else {
        this.$router.push({
          name: "typing-test-english",
          params: { id: this.selectedTypingPassage }
        });
      }
    }
  },

  mounted() {
    this.$Progress.finish();
  }
};
</script>