<template>
  <div class="hindi-inscript-test-settings">
    <section class="hero is-bold is-success">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">Choice Inscript हिन्दी Typing Content</h1>
          <h2
            class="subtitle"
          >Take typing speed test, practice your touch typing skills, learn to type faster and with fewer errors with this free online typing tutor.</h2>
        </div>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <!-- Lessons Types -->
        <b-field horizontal label="Passage Types">
          <div class="block">
            <b-radio v-model="selectPassageType" native-value="Beginner">Beginner</b-radio>
            <b-radio v-model="selectPassageType" native-value="Normal">Normal</b-radio>
            <b-radio v-model="selectPassageType" native-value="Advanced">Advanced</b-radio>
          </div>
        </b-field>
        <!-- Beginner Passage -->
        <b-field horizontal label="Beginner Passage" v-if="selectPassageType === 'Beginner'">
          <b-select
            placeholder="Select Typing Passage"
            v-model="selectedTypingPassage"
            icon="file-document"
            expanded
            required
          >
            <option value="random">Random Typing Passage</option>
            <option
              v-for="option in listBeginnerPassages"
              :key="option.id"
              :value="encodeBase64(option.id)"
            >{{ option.name }} ({{ option.words }} words)</option>
          </b-select>
        </b-field>
        <!-- Normal Passage -->
        <b-field horizontal label="Normal Passage" v-if="selectPassageType === 'Normal'">
          <b-select
            placeholder="Select Typing Passage"
            v-model="selectedTypingPassage"
            icon="file-document"
            expanded
            required
          >
            <option value="random">Random Typing Passage</option>
            <option
              v-for="option in listNormalPassages"
              :key="option.id"
              :value="encodeBase64(option.id)"
            >{{ option.name }} ({{ option.words }} words)</option>
          </b-select>
        </b-field>
        <!-- Advanced Passage -->
        <b-field horizontal label="Advanced Passage" v-if="selectPassageType === 'Advanced'">
          <b-select
            placeholder="Select Typing Passage"
            v-model="selectedTypingPassage"
            icon="file-document"
            expanded
            required
          >
            <option value="random">Random Typing Passage</option>
            <option
              v-for="option in listAdvancedPassages"
              :key="option.id"
              :value="encodeBase64(option.id)"
            >{{ option.name }} ({{ option.words }} words)</option>
          </b-select>
        </b-field>
        <!-- Time Duration -->
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
        <!-- Words Length -->
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
        <!-- Disable Backspace Key -->
        <b-field horizontal label="Disable Backspace Key">
          <b-switch v-model="isDisableBackSpace">Disable Backspace Key</b-switch>
        </b-field>
        <!-- Show Hint Words -->
        <b-field horizontal label="Hint">
          <b-switch v-model="isShowWordHint">Word Characters Hint</b-switch>
        </b-field>
        <!-- Button -->
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
  name: "hindi-inscript-test-settings",
  data() {
    return {};
  },
  computed: {
    // Passage Type
    selectPassageType: {
      get() {
        return this.$store.state.iht.passageType;
      },
      set(val) {
        this.$store.commit("iht/UP_PASSAGE_TYPE", val);
      }
    },

    // Selected Typing Passage
    selectedTypingPassage: {
      get() {
        return this.$store.state.iht.selectTypingPassage;
      },
      set(val) {
        this.$store.commit("iht/UP_SELECTED_TYPING_PASSAGE", val);
      }
    },

    // Beginner, Normal, Advanced Passages
    listBeginnerPassages() {
      return this.$store.state.iht.listBeginnerPassages;
    },
    listNormalPassages() {
      return this.$store.state.iht.listNormalPassages;
    },
    listAdvancedPassages() {
      return this.$store.state.iht.listAdvancedPassages;
    },
    allTimeDuration() {
      return this.$store.state.iht.allTimeDuration;
    },
    selectTimeDuration: {
      get() {
        return this.$store.state.iht.selectedTimeDuration;
      },
      set(val) {
        this.$store.commit("iht/UP_TIME_DURATION", val);
      }
    },
    allTypingWordsLength() {
      return this.$store.state.iht.allTypingWordsLength;
    },
    selectTypingWordsLength: {
      get() {
        return this.$store.state.iht.selectedTypingWordsLength;
      },
      set(val) {
        this.$store.commit("iht/UP_TYPING_WORDS_LENGTH", val);
      }
    },
    isDisableBackSpace: {
      get() {
        return this.$store.state.iht.isDisableBackSpace;
      },
      set(val) {
        this.$store.commit("iht/UP_DISABLE_BACKSPACE", val);
      }
    },
    isShowWordHint: {
      get() {
        return this.$store.state.iht.isShowWordHint;
      },
      set(val) {
        this.$store.commit("iht/UP_WORD_HINT", val);
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

      // Beginner, Normal, Advanced Passages
      if (this.selectedTypingPassage === "random") {
        if (this.selectPassageType === "Beginner") {
          var genRandomNum =
            Math.floor(
              Math.random() * (this.listBeginnerPassages.length - 1 + 1)
            ) + 0;
          var lessonID = this.listBeginnerPassages[genRandomNum].id;
          this.$router.push({
            name: "typing-test-inscript-hindi",
            params: { passageType: "beginner", id: Base64.encode(lessonID) }
          });
        } else if (this.selectPassageType === "Normal") {
          var genRandomNum =
            Math.floor(
              Math.random() * (this.listNormalPassages.length - 1 + 1)
            ) + 0;
          var lessonID = this.listNormalPassages[genRandomNum].id;
          this.$router.push({
            name: "typing-test-inscript-hindi",
            params: { passageType: "normal", id: Base64.encode(lessonID) }
          });
        } else {
          // Advanced
          var genRandomNum =
            Math.floor(
              Math.random() * (this.listAdvancedPassages.length - 1 + 1)
            ) + 0;
          var lessonID = this.listAdvancedPassages[genRandomNum].id;
          this.$router.push({
            name: "typing-test-inscript-hindi",
            params: { passageType: "advanced", id: Base64.encode(lessonID) }
          });
        }
      } else {
        if (this.selectPassageType !== "") {
          this.$router.push({
            name: "typing-test-inscript-hindi",
            params: { passageType: (this.selectPassageType).toLowerCase(), id: this.selectedTypingPassage }
          });
        }
      }
    }
  },
  mounted() {
    this.$Progress.finish();
  }
};
</script>