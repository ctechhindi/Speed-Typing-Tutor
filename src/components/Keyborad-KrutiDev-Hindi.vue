<template>
  <div id="kurtiDevkeyboard" v-show="showKeyborad">
    <ul>
      <li id="Backquote" class="krutidev">
        <p class="first_key">`</p>
        <p class="second_key">~</p>
      </li>
      <li id="Digit1" class="krutidev">
        <p class="first_key">1</p>
        <p class="second_key">!</p>
      </li>
      <li id="Digit2" class="krutidev">
        <p class="first_key">2</p>
        <p class="second_key">@</p>
      </li>
      <li id="Digit3" class="krutidev">
        <p class="first_key">3</p>
        <p class="second_key">#</p>
      </li>
      <li id="Digit4" class="krutidev">
        <p class="first_key">4</p>
        <p class="second_key">$</p>
      </li>
      <li id="Digit5" class="krutidev">
        <p class="first_key">5</p>
        <p class="second_key">%</p>
      </li>
      <li id="Digit6" class="krutidev">
        <p class="first_key">6</p>
        <p class="second_key">^</p>
      </li>
      <li id="Digit7" class="krutidev">
        <p class="first_key">7</p>
        <p class="second_key">&</p>
      </li>
      <li id="Digit8" class="krutidev">
        <p class="first_key">8</p>
        <p class="second_key">*</p>
      </li>
      <li id="Digit9" class="krutidev">
        <p class="first_key">9</p>
        <p class="second_key">(</p>
      </li>
      <li id="Digit0" class="krutidev">
        <p class="first_key">0</p>
        <p class="second_key">)</p>
      </li>
      <li id="Minus" class="krutidev">
        <p class="first_key">-</p>
        <p class="second_key">_</p>
      </li>
      <li id="Equal" class="krutidev">
        <p class="first_key">=</p>
        <p class="second_key">+</p>
      </li>
      <li id="Backspace" style="width: 88px; font-size: small;">Backspace</li>
    </ul>
    <ul>
      <li id="Tab" style="width: 87px; font-size: small;">Tab</li>
      <li class="char krutidev" id="KeyQ">
        <p class="first_key">q</p>
        <p class="second_key">Q</p>
      </li>
      <li class="char krutidev" id="KeyW">
        <p class="first_key">w</p>
        <p class="second_key">W</p>
      </li>
      <li class="char krutidev" id="KeyE">
        <p class="first_key">e</p>
        <p class="second_key">E</p>
      </li>
      <li class="char krutidev" id="KeyR">
        <p class="first_key">r</p>
        <p class="second_key">R</p>
      </li>
      <li class="char krutidev" id="KeyT">
        <p class="first_key">t</p>
        <p class="second_key">T</p>
      </li>
      <li class="char krutidev" id="KeyY">
        <p class="first_key">y</p>
        <p class="second_key">Y</p>
      </li>
      <li class="char krutidev" id="KeyU">
        <p class="first_key">u</p>
        <p class="second_key">U</p>
      </li>
      <li class="char krutidev" id="KeyI">
        <p class="first_key">i</p>
        <p class="second_key">I</p>
      </li>
      <li class="char krutidev" id="KeyO">
        <p class="first_key">o</p>
        <p class="second_key">O</p>
      </li>
      <li class="char krutidev" id="KeyP">
        <p class="first_key">p</p>
        <p class="second_key">P</p>
      </li>
      <li class="char krutidev" id="BracketLeft">
        <p class="first_key">[</p>
        <p class="second_key">{</p>
      </li>
      <li id="BracketRight" class="krutidev">
        <p class="first_key">]</p>
        <p class="second_key">}</p>
      </li>
      <li id="Backslash" class="krutidev">
        <p class="first_key">\</p>
        <p class="second_key">|</p>
      </li>
    </ul>
    <ul>
      <li id="CapsLock" style="width: 100px; font-size: small;">Caps Lock</li>
      <li class="char krutidev" id="KeyA">
        <p class="first_key">a</p>
        <p class="second_key">A</p>
      </li>
      <li class="char krutidev" id="KeyS">
        <p class="first_key">s</p>
        <p class="second_key">S</p>
      </li>
      <li class="char krutidev" id="KeyD">
        <p class="first_key">d</p>
        <p class="second_key">D</p>
      </li>
      <li class="char krutidev" id="KeyF">
        <p class="first_key">f</p>
        <p class="second_key">F</p>
      </li>
      <li class="char krutidev" id="KeyG">
        <p class="first_key">g</p>
        <p class="second_key">G</p>
      </li>
      <li class="char krutidev" id="KeyH">
        <p class="first_key">h</p>
        <p class="second_key">H</p>
      </li>
      <li class="char krutidev" id="KeyJ">
        <p class="first_key">j</p>
        <p class="second_key">J</p>
      </li>
      <li class="char krutidev" id="KeyK">
        <p class="first_key">k</p>
        <p class="second_key">K</p>
      </li>
      <li class="char krutidev" id="KeyL">
        <p class="first_key">l</p>
        <p class="second_key">L</p>
      </li>
      <li class="char krutidev" id="Semicolon">
        <p class="first_key">;</p>
        <p class="second_key">:</p>
      </li>
      <li id="Quote" class="krutidev">
        <p class="first_key">'</p>
        <p class="second_key">"</p>
      </li>
      <li id="Enter" style="width: 92px; font-size: small;">Enter</li>
    </ul>
    <ul>
      <li id="ShiftLeft" style="width: 128px; font-size: small;">Left Shift</li>
      <li class="char krutidev" id="KeyZ">
        <p class="first_key">z</p>
        <p class="second_key">Z</p>
      </li>
      <li class="char krutidev" id="KeyX">
        <p class="first_key">x</p>
        <p class="second_key">X</p>
      </li>
      <li class="char krutidev" id="KeyC">
        <p class="first_key">c</p>
        <p class="second_key">C</p>
      </li>
      <li class="char krutidev" id="KeyV">
        <p class="first_key">v</p>
        <p class="second_key">V</p>
      </li>
      <li class="char krutidev" id="KeyB">
        <p class="first_key">b</p>
        <p class="second_key">B</p>
      </li>
      <li class="char krutidev" id="KeyN">
        <p class="first_key">n</p>
        <p class="second_key">N</p>
      </li>
      <li class="char krutidev" id="KeyM">
        <p class="first_key">m</p>
        <p class="second_key">M</p>
      </li>
      <li id="Comma" class="krutidev">
        <p class="first_key">,</p>
        <p class="second_key">&#60;</p>
      </li>
      <li id="Period" class="krutidev">
        <p class="first_key">.</p>
        <p class="second_key">&#62;</p>
      </li>
      <li id="Slash" class="krutidev">
        <p class="first_key">/</p>
        <p class="second_key">?</p>
      </li>
      <li id="ShiftRight" style="width: 122px; font-size: small;">Right Shift</li>
    </ul>
    <ul>
      <li id="Space" style="width: 807px; height: 40px; font-size: small;">&nbsp; Space</li>
    </ul>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: "KeyboardInscriptHindi",

  props: ["isShow", "keyName"], // camelCase in JavaScript

  data() {
    return {
      keysData: {
        "`": { select: "#Backquote p.first_key", shift: false },
        "~": { select: "#Backquote p.second_key", shift: "#ShiftRight" },
        "1": { select: "#Digit1 p.first_key", shift: false },
        "!": { select: "#Digit1 p.second_key", shift: "#ShiftRight", },
        "2": { select: "#Digit2 p.first_key", shift: false },
        "@": { select: "#Digit2 p.second_key", shift: "#ShiftRight", },
        "3": { select: "#Digit3 p.first_key", shift: false },
        "#": { select: "#Digit3 p.second_key", shift: "#ShiftRight", },
        "4": { select: "#Digit4 p.first_key", shift: false },
        "$": { select: "#Digit4 p.second_key", shift: "#ShiftRight", },
        "5": { select: "#Digit5 p.first_key", shift: false },
        "%": { select: "#Digit5 p.second_key", shift: "#ShiftRight", },
        "6": { select: "#Digit6 p.first_key", shift: false },
        "^": { select: "#Digit6 p.second_key", shift: "#ShiftRight", },
        "7": { select: "#Digit7 p.first_key", shift: false },
        "&": { select: "#Digit7 p.second_key", shift: "#ShiftLeft", },
        "8": { select: "#Digit8 p.first_key", shift: false },
        "*": { select: "#Digit8 p.second_key", shift: "#ShiftLeft", },
        "9": { select: "#Digit9 p.first_key", shift: false },
        "(": { select: "#Digit9 p.second_key", shift: "#ShiftLeft", },
        "0": { select: "#Digit0 p.first_key", shift: false },
        ")": { select: "#Digit0 p.second_key", shift: "#ShiftLeft", },
        "-": { select: "#Minus p.first_key", shift: false },
        "_": { select: "#Minus p.second_key", shift: "#ShiftLeft", },
        "=": { select: "#Equal p.first_key", shift: false },
        "+": { select: "#Equal p.second_key", shift: "#ShiftLeft", },
        // Second Row
        "q": { select: "#KeyQ p.first_key", shift: false },
        "Q": { select: "#KeyQ p.second_key", shift: "#ShiftRight" },
        "w": { select: "#KeyW p.first_key", shift: false },
        "W": { select: "#KeyW p.second_key", shift: "#ShiftRight" },
        "e": { select: "#KeyE p.first_key", shift: false },
        "E": { select: "#KeyE p.second_key", shift: "#ShiftRight" },
        "r": { select: "#KeyR p.first_key", shift: false },
        "R": { select: "#KeyR p.second_key", shift: "#ShiftRight" },
        "t": { select: "#KeyT p.first_key", shift: false },
        "T": { select: "#KeyT p.second_key", shift: "#ShiftRight" },
        "y": { select: "#KeyY p.first_key", shift: false },
        "Y": { select: "#KeyY p.second_key", shift: "#ShiftRight" },
        "u": { select: "#KeyU p.first_key", shift: false },
        "U": { select: "#KeyU p.second_key", shift: "#ShiftLeft" },
        "i": { select: "#KeyI p.first_key", shift: false },
        "I": { select: "#KeyI p.second_key", shift: "#ShiftLeft" },
        "o": { select: "#KeyO p.first_key", shift: false },
        "O": { select: "#KeyO p.second_key", shift: "#ShiftLeft" },
        "p": { select: "#KeyP p.first_key", shift: false },
        "P": { select: "#KeyP p.second_key", shift: "#ShiftLeft" },
        "[": { select: "#BracketLeft p.first_key", shift: false },
        "{": { select: "#BracketLeft p.second_key", shift: "#ShiftLeft" },
        "]": { select: "#BracketRight p.first_key", shift: false },
        "}": { select: "#BracketRight p.second_key", shift: "#ShiftLeft" },
        "\\": { select: "#Backslash p.first_key", shift: false }, // Char: \
        "|": { select: "#Backslash p.second_key", shift: "#ShiftLeft" },
        // Third Row
        "a" : { select: "#KeyA p.first_key", shift: false },
        "A" : { select: "#KeyA p.second_key", shift: "#ShiftRight" },
        "s" : { select: "#KeyS p.first_key", shift: false },
        "S" : { select: "#KeyS p.second_key", shift: "#ShiftRight" },
        "d" : { select: "#KeyD p.first_key", shift: false },
        "D" : { select: "#KeyD p.second_key", shift: "#ShiftRight" },
        "f" : { select: "#KeyF p.first_key", shift: false },
        "F" : { select: "#KeyF p.second_key", shift: "#ShiftRight" },
        "g" : { select: "#KeyG p.first_key", shift: false },
        "G" : { select: "#KeyG p.second_key", shift: "#ShiftRight" },
        "h" : { select: "#KeyH p.first_key", shift: false },
        "H" : { select: "#KeyH p.second_key", shift: "#ShiftLeft" },
        "j" : { select: "#KeyJ p.first_key", shift: false },
        "J" : { select: "#KeyJ p.second_key", shift: "#ShiftLeft" },
        "k" : { select: "#KeyK p.first_key", shift: false },
        "K" : { select: "#KeyK p.second_key", shift: "#ShiftLeft" },
        "l" : { select: "#KeyL p.first_key", shift: false },
        "L" : { select: "#KeyL p.second_key", shift: "#ShiftLeft" },
        ";" : { select: "#Semicolon p.first_key", shift: false },
        ":" : { select: "#Semicolon p.second_key", shift: "#ShiftLeft" },
        "'" : { select: "#Quote p.first_key", shift: false },
        "\"" : { select: "#Quote p.second_key", shift: "#ShiftLeft" }, // Char: "
        // Fourth Row
        "z" : { select: "#KeyZ p.first_key", shift: false },
        "Z": { select: "#KeyZ p.second_key", shift: "#ShiftRight" },
        "x" : { select: "#KeyX p.first_key", shift: false },
        "X": { select: "#KeyX p.second_key", shift: "#ShiftRight" },
        "c" : { select: "#KeyC p.first_key", shift: false },
        "C": { select: "#KeyC p.second_key", shift: "#ShiftRight" },
        "v" : { select: "#KeyV p.first_key", shift: false },
        "V": { select: "#KeyV p.second_key", shift: "#ShiftRight" },
        "b" : { select: "#KeyB p.first_key", shift: false },
        "B": { select: "#KeyB p.second_key", shift: "#ShiftLeft" },
        "n" : { select: "#KeyN p.first_key", shift: false },
        "N": { select: "#KeyN p.second_key", shift: "#ShiftLeft" },
        "m" : { select: "#KeyM p.first_key", shift: false },
        "M": { select: "#KeyM p.second_key", shift: "#ShiftLeft" },
        "," : { select: "#Comma p.first_key", shift: false },
        "<": { select: "#Comma p.second_key", shift: "#ShiftLeft" },
        "." : { select: "#Period p.first_key", shift: false },
        ">": { select: "#Period p.second_key", shift: "#ShiftLeft" },
        "/" : { select: "#Slash p.first_key", shift: false },
        "?": { select: "#Slash p.second_key", shift: "#ShiftLeft" },
        // Space
        " ": { select: "#Space", shift: false },
      },
      oldSelectedKey: "",
      oldShiftKey: "",
    }
  },

  computed: {
    showKeyborad() {
      if (this.isShow === undefined)
        return true
      else
        return this.isShow
    }
  },

  watch: {
    keyName (n) {
      if (n !== "") {
        if (this.keysData.hasOwnProperty(n)) {
          var key = this.keysData[n]
          if (key.select !== undefined && key.select !== "") {
            if (this.oldSelectedKey !== key.select) {
              // Remove old style
              if (this.oldSelectedKey !== "") {
                if (this.oldSelectedKey === "#Space") {
                  $(this.oldSelectedKey).css("background-color", "")
                } else {
                  $(this.oldSelectedKey).parent().css("background-color", "")
                }
              }
            }
            if (this.oldShiftKey !== key.shift) {
              // Remove old style in shift key
              if (this.oldShiftKey !== "") {
                $(this.oldShiftKey).css("background-color", "")
              }
            }
            this.oldSelectedKey = key.select
            this.oldShiftKey = key.shift
            if (key.select === "#Space") {
              $(key.select).css("background-color", "#00ffee")
            } else {
              $(key.select).parent().css("background-color", "#00ffee")
              if (key.shift !== false) {
                $(key.shift).css("background-color", "#00ffee")
              }
            }
          }
        }
      }
    }
  },

  methods: {},

  mounted() {
    const that = this;
    window.onkeydown = function(event) {
      var key = event.key; // keyboard key
      var keyCode = event.code; // keyboard key code
      var isShift = event.shiftKey; // shift key active
      var isCapsLockValue = event.getModifierState("CapsLock"); // CapsLock key active

      /**
       * Active/Deactive Key
       */
      if (keyCode !== "CapsLock") {
        var id = $("#" + keyCode);

        if (id !== null) {
          // Check Shift Key Active
          if (isShift) {
            id.css("text-transform", "uppercase");
          }

          id.addClass("active");

          setTimeout(function() {
            id.removeClass("active");
          }, 150);
        }
      }
    };
  }
};
</script>

<style>
#kurtiDevkeyboard {
  width: min-content;
}

#kurtiDevkeyboard ul {
  clear: both;
  font-size: 23px;
  font-weight: 600;
}

#kurtiDevkeyboard ul li {
  float: left;
  margin: 0 5px 5px 0;
  width: 50px;
  height: 45px;
  line-height: 37px;
  text-align: center;
  background: #fee;
  color: #036;
  border: 1px solid #f9f9f9;
}

#kurtiDevkeyboard ul li span.on {
  display: none;
}

#kurtiDevkeyboard li:hover {
  position: relative;
  top: 1px;
  left: 1px;
  border-color: #e5e5e5;
  cursor: pointer;
}

#kurtiDevkeyboard ul li.active {
  background: rgb(51, 170, 250);
}

#kurtiDevkeyboard > ul > li > p.first_key {
  margin-right: 22px;
  margin-top: -6px;
}

#kurtiDevkeyboard > ul > li > p.second_key {
  margin-top: -20px;
  margin-left: 25px;
}

/* Kruti Dev Font */
@font-face {
  font-family: 'Kruti-Dev'; 
  src: url('./../assets/fonts/kruti_dev_010.ttf'); 
}

.krutidev {
  font-family: Kruti-Dev;
}
</style>