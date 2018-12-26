import $ from "jquery"

export default {
  data() {
    return {
      isShowKeyborad: true, // Show and Hide Keyborad
      isCountdownStart: false, // Countdown Start
      result: {
        totalTimeDuration: "free", // Total Typing Duration : Millisecond [60000 = 1M] and "free"
        totalRightChar: 0,
        totalWrongChar: 0, // total wrong characters
        totalChar: 0, // total characters [Include Space and Other Keys],
        totalTypeChar: 0, // total typing content characters
        totalWords: 0, // total typing content words
        // https://www.speedtypingonline.com/typing-equations
        NetWPM: 0, // Gross WPM = (All Typed Entries/5)/Time (min)
        GrossWPM: 0, // Net WPM = = Gross WPM - (Uncorrected Errors)/Time (min)
        Accuracy: 0
      },
      isSettingsModalActive: false, // show and hide settings model
      // Default Characters Style
      defaultCSSForChars: "padding: 0px 2px 0px;",
      // Active Character Style
      activeCharStyles: {
        background: "cyan",
        color: "#28463b",
        padding: "5px",
        border: "2px solid black"
      },
      // Wrong Character Style
      wrongCharStyles: {
        background: "red",
        color: "#fff",
        border: "0px solid black"
      },
      chekOldScrollValue: "", // Scroll Typing Content
      isByPassWrongKey: true, // ByPass Worng Typing Character
      countDownKey: 0, // Reload Countdown Component [if change this key]
      // Timer Settings
      timerSettings: {
        isStart: false,
        minutes: 0,
        seconds: 0,
        Output: "00:00"
      },
      typingContentLineHeight: 54
    };
  },

  methods: {
    /**
     * Generates the lessons/words
     */
    generateWords() {
      // Remove Old Content
      document.getElementById("lesson").innerText = "";
      // result section class
      document
        .getElementById("resultShow")
        .setAttribute("class", "hero is-warning");

      this.result.totalTypeChar = 0; // reset characters

      // Set Typing Time Duration
      this.setTimeDuration();

      // Generate New Typing Content
      this.genTypingContent()

      var typingText = this.typingContent.content;

      var lesson = document.getElementById("lesson");
      var newDiv = document.createElement("div");
      newDiv.setAttribute("id", "thisClass");
      newDiv.setAttribute(
        "style",
        "line-height: " + this.typingContentLineHeight + "px;"
      );
      lesson.appendChild(newDiv);

      // Total Character and Words
      // console.log(typingText)
      // console.log(typingText.length)
      // console.log("String Length Remove Space: "+ typingText.replace(/\s/g, "").length)

      this.result.totalChar = typingText.length;
      this.result.totalWords = this.countWords(typingText);

      for (var i = 0; i < typingText.length; i++) {
        var spans = document.createElement("span");
        spans.setAttribute("id", "span" + i);
        spans.innerHTML = typingText[i];
        spans.setAttribute("style", this.defaultCSSForChars);
        newDiv.appendChild(spans);
      }

      // highlight the first element
      this.highlightLetter(0);
    },

    /**
     * [Private Function]
     * Set Typing Time Duration in Minite
     */
    setTimeDuration() {
      // Total Typing Duration : Millisecond [60000 = 1 M] and "free"
      if (this.timeDuration !== undefined && this.timeDuration !== "") {
        if (typeof this.timeDuration !== "string") {
          var timeToMillisecond = this.timeDuration * 60 * 1000;
          this.result.totalTimeDuration = timeToMillisecond;
        } else {
          this.result.totalTimeDuration = "free";
        }
      } else {
        this.result.totalTimeDuration = "free";
      }
    },

    /**
     * This function is used to highlight.
     * It will give hint for which letter to type.
     */
    highlightLetter: function (index) {
      if (index < this.typingContent.content.length) {
        var get = document.getElementById("span" + index);
        get.style.background = this.activeCharStyles.background;
        get.style.color = this.activeCharStyles.color;
        get.style.padding = this.activeCharStyles.padding;
        get.style.border = this.activeCharStyles.border;
      }
    },

    /**
     * This function will check if we need the new word
     */
    checkNewWord: function () {
      if (this.result.totalTypeChar === this.typingContent.content.length) {
        // Check Time Duration is `Free`
        if (this.result.totalTimeDuration !== "free") {
          this.$refs.countdown.stop();
        } else {
          this.startTimer("stop");
        }
      }
    },

    /**
     * Count Real-Time Typing Speed
     */
    countTypingSpeed: function (totalMinutes) {
      // Gross WPM = (All Typed Entries/5)/Time (min)
      // Net WPM = Gross WPM - (Uncorrected Errors)/Time (min)
      // Accuracy = (Total Corrected Entries/Total Entries) * 100
      var gross_wpm = this.result.totalTypeChar / 5 / totalMinutes;
      var net_wpm = gross_wpm - this.result.totalWrongChar / totalMinutes;
      var accuracy =
        (this.result.totalRightChar / this.result.totalTypeChar) * 100;

      this.result.NetWPM = this.formatFloatNumber(net_wpm);
      this.result.GrossWPM = this.formatFloatNumber(gross_wpm);
      this.result.Accuracy = this.formatFloatNumber(accuracy);
    },

    // This event fires when the countdown is in progress.
    handleCountdownProgress(data) {
      this.countTypingSpeed(
        (this.result.totalTimeDuration / 1000 -
          (data.minutes * 60 + data.seconds)) /
        60
      );
    },

    // This event fires when the countdown stops.
    handleCountdownEnd() {
      var that = this;
      document.removeEventListener("keydown", this.keyDownEventFunction);
      document
        .getElementById("resultShow")
        .setAttribute("class", "hero is-success");
      this.showPreviousNextPlayBtn(true);

      // $("#thisClass > span").each(function () {
      //   var isActive = $(this).css("border") // return default value : 0px none rgb(16, 16, 16)
      //   if (isActive !== "0px none rgb(255, 255, 255)") {
      //     // console.log($(this));
      //     $(this).attr('style', that.defaultCSSForChars+'color: #d42b2b')
      //   }
      // });
    },

    /**
     * Run this function 'keydown' Event
     */
    keyDownEventFunction(e) {
      var that = this;

      // Disable scroll down when spacebar is pressed
      if ((e.keycode || e.which) == 32) {
        e.preventDefault();
      }

      var key = e.key; // keyboard key
      var keyValue = e.which; // keyboard key value

      // Scroll Down Typing Content
      if (that.result.totalTypeChar > 0) {
        var scrollTo = $(
          "#thisClass span:nth-child(" + (that.result.totalTypeChar + 1) + ")"
        );
        var scrollToValue =
          scrollTo.offset().top -
          $("#thisClass").offset().top +
          $("#thisClass").scrollTop();

        if (scrollToValue !== that.chekOldScrollValue) {
          $("#thisClass").animate({
            scrollTop: scrollToValue
          });
          that.chekOldScrollValue = scrollToValue;
        }
      }

      // Typing Keys
      if (
        (keyValue > 47 && keyValue < 58) ||
        (keyValue > 64 && keyValue < 91) ||
        (keyValue > 96 && keyValue < 123) ||
        keyValue == 32 ||
        keyValue == 222 ||
        keyValue == 190 ||
        keyValue == 192 ||
        keyValue == 187 ||
        keyValue == 219 ||
        keyValue == 221 ||
        keyValue == 220 ||
        keyValue == 186 ||
        keyValue == 222 ||
        keyValue == 188 ||
        keyValue == 191
      ) {
        // Check Time Duration is `Free`
        if (that.result.totalTimeDuration !== "free") {
          // Start Countdown Clock
          if (that.isCountdownStart === false) {
            that.$refs.countdown.start();
            that.isCountdownStart = true;
          }
        } else {
          // Start Time Clock
          if (that.timerSettings.isStart === false) {
            that.startTimer();
          }
        }

        if (that.isByPassWrongKey === false) {
          var index = that.result.totalTypeChar + 1;
          that.highlightLetter(index);

          // Decrease Number in Total Typing Character
          --that.result.totalChar;

          // var inputToNum = String.fromCharCode(keyValue).toLowerCase();
          var inputToNum = key;
          // console.log("Input Value : " + inputToNum);

          var check = that.typingContent.content.charAt(
            that.result.totalTypeChar
          );
          // console.log("Word Value : " + check);

          if (inputToNum === check) {
            // console.log("Word Matched.");
            ++that.result.totalRightChar;
            var getSpan = document.getElementById(
              "span" + that.result.totalTypeChar
            );
            getSpan.setAttribute("style", that.defaultCSSForChars);
            that.result.totalTypeChar++;
          } else {
            // console.error("Character Not Matched.");
            ++that.result.totalWrongChar;

            var getSpan = document.getElementById(
              "span" + that.result.totalTypeChar
            );
            getSpan.setAttribute(
              "style",
              that.defaultCSSForChars +
              "background :" +
              that.wrongCharStyles.background +
              "; color: " +
              that.wrongCharStyles.color +
              "; border: " +
              that.wrongCharStyles.border +
              ";"
            );
            that.result.totalTypeChar++;
          }
          that.checkNewWord();
        } else {
          var check = that.typingContent.content.charAt(
            that.result.totalTypeChar
          );

          var getSpan = document.getElementById(
            "span" + that.result.totalTypeChar
          );

          if (key === check) {
            // Character Matched
            var index = that.result.totalTypeChar + 1;
            that.highlightLetter(index);

            ++that.result.totalRightChar;

            getSpan.setAttribute("style", that.defaultCSSForChars);
            that.result.totalTypeChar++;
          } else {
            // Character Not Matched
            getSpan.setAttribute(
              "style",
              that.defaultCSSForChars +
              "padding: 5px; background :" +
              that.wrongCharStyles.background +
              "; color: " +
              that.wrongCharStyles.color +
              "; border: 2px solid black;"
            );
          }
          that.checkNewWord();
        }
      }
    },

    /**
     * [Private Function]
     * Count Total Words in String
     * @return: number
     */
    countWords: function (s) {
      s = s.replace(/(^\s*)|(\s*$)/gi, ""); //exclude  start and end white-space
      s = s.replace(/[ ]{2,}/gi, " "); //2 or more space to 1
      s = s.replace(/\n /, "\n"); // exclude newline with a start spacing
      return s.split(" ").filter(function (str) {
        return str != "";
      }).length;
    },

    /**
     * [Private Function]
     * Format Currencie and Float Character
     * @return: two char
     */
    formatFloatNumber: function (value) {
      var val = (value / 1).toFixed(2).replace(".", ".");
      return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    /**
     * Show Previous, Next, Play Button
     */
    showPreviousNextPlayBtn(active) {
      if (active === true) {
        $("#typing-content").mouseenter(function () {
          document
            .getElementById("typing-content")
            .setAttribute("style", "background-color: rgba(37, 35, 35, 0.93);");
          document.getElementById("thisClass").style.color = "#101010"
          // document.getElementById("action-new-lesson").setAttribute("style", "display: initial;");
          $("#action-new-lesson").fadeIn();
        });

        $("#typing-content").mouseleave(function () {
          document.getElementById("typing-content").setAttribute("style", null);
          document.getElementById("thisClass").style.color = null
          // document.getElementById("action-new-lesson").setAttribute("style", "display: none;");
          $("#action-new-lesson").fadeOut();
        });
      } else {
        document.getElementById("typing-content").setAttribute("style", null);
        document.getElementById("thisClass").style.color = null
        $("#action-new-lesson").fadeToggle();
      }
    },

    /**
     * Play Again Lesson
     */
    playAgainLesson() {
      this.result.totalRightChar = 0;
      this.result.totalWrongChar = 0;
      this.result.totalChar = 0;
      this.result.totalTypeChar = 0;
      this.result.totalWords = 0;
      this.result.NetWPM = 0;
      this.result.GrossWPM = 0;
      this.result.Accuracy = 0;
      this.isCountdownStart = false;

      // Check Time Duration is `Free`
      if (this.result.totalTimeDuration !== "free") {
        // this.result.totalTimeDuration = 6000
        this.countDownKey += 1;
      } else {
        this.timerSettings.Output = "00:00";
        this.timerSettings.seconds = 0;
        this.timerSettings.minutes = 0;
      }

      document.addEventListener("keydown", this.keyDownEventFunction);
      $("#typing-content").unbind("mouseenter mouseleave");
      this.showPreviousNextPlayBtn(false);
      // highlight the first element
      this.generateWords();
    },

    /**
     * Set Timer
     * @param: status [start/stop]
     */
    startTimer(status = "start") {
      var that = this;

      window.typingTimerIntervalObj;
      if (status === "start") {
        // Start Timer
        if (that.timerSettings.isStart === false) {
          // Rest Timer Settings
          that.timerSettings.minutes = 0;
          that.timerSettings.seconds = 0;
          that.timerSettings.Output = "00:00";

          // Start Timer
          that.timerSettings.isStart = true;

          window.typingTimerIntervalObj = setInterval(function () {
            var newSeconds = ++that.timerSettings.seconds;
            if (newSeconds === 60) {
              that.timerSettings.minutes += 1;
              that.timerSettings.seconds = 0;
            }
            var fullMinutes = String(that.timerSettings.minutes).padStart(2, 0);
            var fullSeconds = String(that.timerSettings.seconds).padStart(2, 0);
            // run function
            that.handleTimerProgress(
              that.timerSettings.minutes,
              that.timerSettings.seconds
            );
            // return
            that.timerSettings.Output = fullMinutes + ":" + fullSeconds;
          }, 1000);
        } else {
          console.error("Timer Already Running..");
        }
      }

      // Stop Timer
      if (status === "stop") {
        // console.warn("Stop Timer");
        clearInterval(window.typingTimerIntervalObj);
        that.timerSettings.isStart = false;
        that.handleCountdownEnd();
      }
    },

    /**
     * Run this function if Timer is Progress
     * @param: minutes
     * @param: seconds
     */
    handleTimerProgress(minutes, seconds) {
      // console.log(minutes);
      // console.log(seconds);
      this.countTypingSpeed((minutes * 60 + seconds) / 60);
    }
  },

  mounted() {
    window.$ = window.jQuery = require("jquery");
    this.generateWords();
    document.addEventListener("keydown", this.keyDownEventFunction);
  }
}