import $ from "jquery"

export default {

  data() {
    return {
      typingContent: "",
      isCountdownStart: false, // Countdown Start
      result: {
        totalTimeDuration: "free", // Total Typing Duration : Millisecond [60000 = 1M] and "free"
        totalChar: 0, // total characters [Include Space and Other Keys],
        totalWords: 0, // total typing content words
        typingWordIndex: 0, // Count Typing Word Index
        totalWrongWords: 0, // total wrong words
        NetWPM: 0,
        GrossWPM: 0,
        Accuracy: 0
      },
      checkOldScrollValue: "", // Scroll Typing Content
      countDownKey: 0, // Reload Countdown Component [if change this key]
      // Timer Settings
      timerSettings: {
        isStart: false,
        minutes: 0,
        seconds: 0,
        Output: "00:00"
      },
      isSettingsModalActive: false, // show and hide settings model
      // Current Typing Word
      currentTypingWord: "",
      // Last Word Status [wrong, right]
      lastWordStatus: "wrong",
      // Settings
      isShowOnlyOneWord: false, // Only Show Single Word in Typing Box
      isCheckOneByOneChar: true, // Check One-by-One Character in Word
    };
  },

  methods: {
    /**
     * Generates Typing Lesson
     */
    generateWords() {
      // Remove Old Content
      document.getElementById("lesson").innerText = "";
      // result section class
      document
        .getElementById("resultShow")
        .setAttribute("class", "hero is-warning");
      // reset characters
      // this.result.totalTypeChar = 0
      this.result.typingWordIndex = 0;

      // Set Typing Time Duration
      this.setTimeDuration();

      document.getElementById("typingBox").value = ""
      document.getElementById("typingBox").focus()

      // Total Character and Words
      this.result.totalChar = this.typingContent.length;
      this.result.totalWords = this.countWords(this.typingContent);

      // here goes the core code for displaying the contents got from the array;
      var lesson = document.getElementById("lesson");
      var newDiv = document.createElement("div");
      newDiv.setAttribute("id", "englishWords");
      lesson.appendChild(newDiv);

      var splitOneWord = this.typingContent.split(" ");

      $.each(splitOneWord, function (i, v) {
        var spans = document.createElement("span");
        spans.setAttribute("id", "span" + i);
        spans.innerHTML = v;
        newDiv.appendChild(spans);
        newDiv.appendChild(document.createTextNode(" "));
      });

      // highlight the first word
      this.highlightWord(this.result.typingWordIndex);
    },

    /**
     * Play Again Typing Test
     */
    playAgainTyping() {
      this.result.totalChar = 0;
      this.result.totalWords = 0;
      this.result.typingWordIndex = 0;
      this.result.totalWrongWords = 0;
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

      $("#typing-content").unbind("mouseenter mouseleave");
      this.showPreviousNextPlayBtn(false);
      document.getElementById("typingBox").removeAttribute("disabled")
      this.generateWords();
    },

    /**
     * This function is used to highlight.
     * It will give hint for which letter to type.
     * @param: status
     */
    highlightWord: function (index, status = true) {
      if (this.result.totalWords !== this.result.typingWordIndex) {
        if (index < this.typingContent.length) {
          var get = document.getElementById("span" + index);
          get.style.background = "#2380d0";

          // Set New Typing Word in Variable
          this.currentTypingWord = get.innerHTML;
        }

        if (status === false) {
          var get = document.getElementById("span" + index);
          get.style.background = null;
        }
      }
    },

    /**
     * Wrong Word Highlight
     */
    wrongWordHighlight(index) {
      var el = document.getElementById("span" + index);
      el.style.background = "red";
    },

    /**
     * This function will check if we need the new word
     */
    checkNewWord: function () {
      if (this.result.totalWords === this.result.typingWordIndex) {
        // Check Time Duration is `Free`
        if (this.result.totalTimeDuration !== "free") {
          this.$refs.countdown.stop();
        } else {
          this.startTimer("stop");
        }
      }
    },

    /**
     * Check One-by-One Character in Active Word
     * @param: {string} Keyboard Key
     * @param: {boolean} isDelete
     */
    checkOneByOneChar(key = false, isDelete = false) {
      var that = this
      if (this.isCheckOneByOneChar === true) {
        var cWordS = this.currentTypingWord.split("")

        // Press Delete Key Like Backspace and Delete Key
        if (isDelete === false) {
          var str = document.getElementById("typingBox").value + key
        } else {
          var str = document.getElementById("typingBox").value
        }

        var strSplit = str.split(" ");
        var strLastWord = strSplit[strSplit.length - 1];

        var typingChars = strLastWord.split("")
        var BreakException = {};
        try {
          cWordS.forEach(function (elm, index) {
            if (typingChars[index] !== undefined) {
              if (typingChars[index] !== elm) {
                that.wrongWordHighlight(that.result.typingWordIndex);
                throw BreakException;
              } else {
                that.highlightWord(that.result.typingWordIndex);
              }
            }
          })
        } catch (e) {
          if (e !== BreakException) throw e;
        }
      }
    },

    /**
     * Run Function if input text in Typing Area
     */
    keyDownEventFunction(e,v) {
      var that = this;

      var key = e.key; // keyboard key
      var keyValue = e.which; // keyboard key value

      // Disable Arrow Keys
      if (e.keyCode === 37 || e.keyCode === 39 || e.keyCode === 38 || e.keyCode === 40) {
        e.preventDefault();
      }

      if (
        this.result.typingWordIndex >= 0 &&
        this.result.typingWordIndex !== this.result.totalWords
      ) {
        // Scroll Down Typing Content
        var scrollTo = $(
          "#englishWords span:nth-child(" +
          (this.result.typingWordIndex + 1) +
          ")"
        );
        var scrollToValue =
          scrollTo.offset().top -
          $("#englishWords").offset().top +
          $("#englishWords").scrollTop();

        if (scrollToValue !== this.checkOldScrollValue) {
          $("#englishWords").animate({
            scrollTop: scrollToValue
          });
          this.checkOldScrollValue = scrollToValue;
        }

        /**
         * Backspace: 8 AND Delete: 46 Keys
         */
        if (e.keyCode === 8 || e.keyCode === 46) {
          if (this.isDisableBackSpace === true) {
            e.preventDefault();
          } else {
            // Check One-by-One Character in Active Word
            setTimeout(() => {
              this.checkOneByOneChar(false, true)
            }, 100);
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
          if (this.result.totalTimeDuration !== "free") {
            // Start Countdown Clock
            if (this.isCountdownStart === false) {
              this.$refs.countdown.start();
              this.isCountdownStart = true;
            }
          } else {
            // Start Time Clock
            if (this.timerSettings.isStart === false) {
              this.startTimer();
            }
          }


          // If Press Space Button [Active Next Word]
          if ((e.keyCode || e.which) == 32) {
            // Check Last Word Status [wrong, right]
            if (this.lastWordStatus === "wrong") {
              this.wrongWordHighlight(this.result.typingWordIndex);
              this.result.totalWrongWords += 1;
            } else {
              // Remove Last Word Highlight
              this.highlightWord(this.result.typingWordIndex, false);
              this.lastWordStatus = "wrong";
            }

            if (this.isShowOnlyOneWord === true) {
              document.getElementById("typingBox").value = ""
            }

            this.result.typingWordIndex += 1; // Increase Word Index [Go to Next Word]
            this.typingWord = ""; // Clear Typing Word
            this.highlightWord(this.result.typingWordIndex);
          } else {
            var str = document.getElementById("typingBox").value + key;
            var strSplit = str.split(" ");
            var strLastWord = strSplit[strSplit.length - 1];

            // console.log("Current Word: "+ this.currentTypingWord)
            // console.log("Typing String: "+ str)
            
            // Check One-by-One Character in Active Word
            this.checkOneByOneChar(key)

            if (this.currentTypingWord === strLastWord) {
              // Word Right
              this.lastWordStatus = "right";
            } else {
              this.lastWordStatus = "wrong";
            }
          }

          this.checkNewWord();
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
     * Format Float Character
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
          document
            .getElementById("englishWords")
            .setAttribute("style", "color: #101010;");
          // document.getElementById("action-new-lesson").setAttribute("style", "display: initial;");
          $("#action-new-lesson").fadeIn();
        });

        $("#typing-content").mouseleave(function () {
          document.getElementById("typing-content").setAttribute("style", null);
          document.getElementById("englishWords").setAttribute("style", null);
          // document.getElementById("action-new-lesson").setAttribute("style", "display: none;");
          $("#action-new-lesson").fadeOut();
        });
      } else {
        document.getElementById("typing-content").setAttribute("style", null);
        document.getElementById("englishWords").setAttribute("style", null);
        $("#action-new-lesson").fadeToggle();
      }
    },

    /**
     * Count Real-Time Typing Speed
     * http://indiatyping.com/index.php/typing-tips/typing-speed-calculation-formula
     */
    countTypingSpeed: function (totalMinutes) {
      // Gross WPM = (All Typed Entries/5)/Time (min)
      // Net WPM = Gross WPM - (Uncorrected Errors)/Time (min)
      // Accuracy = (Total Corrected Entries/Total Entries) * 100
      var gross_wpm = this.result.typingWordIndex / totalMinutes;
      var net_wpm = gross_wpm - this.result.totalWrongWords / totalMinutes;
      var accuracy = (net_wpm / gross_wpm) * 100;

      this.result.NetWPM = this.formatFloatNumber(net_wpm);
      this.result.GrossWPM = this.formatFloatNumber(gross_wpm);
      this.result.Accuracy = this.formatFloatNumber(accuracy);
    },

    /**
     * [Private Function]
     * Set Typing Time Duration in Minute
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
      document
        .getElementById("resultShow")
        .setAttribute("class", "hero is-success");
      document.getElementById("typingBox").setAttribute("disabled", "disabled")
      this.showPreviousNextPlayBtn(true);
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
      this.countTypingSpeed((minutes * 60 + seconds) / 60);
    }
  },

  mounted() {
    window.$ = window.jQuery = require("jquery");
  }
}