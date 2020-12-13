"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _typeof2 = "function" == typeof Symbol && "symbol" == _typeof(Symbol.iterator) ? function (e) {
  return typeof e === "undefined" ? "undefined" : _typeof(e);
} : function (e) {
  return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e === "undefined" ? "undefined" : _typeof(e);
};!function (e) {
  "object" === ("undefined" == typeof exports ? "undefined" : _typeof2(exports)) && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : ("undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this).GitHubCalendar = e();
}(function () {
  return function r(a, o, u) {
    function s(t, e) {
      if (!o[t]) {
        if (!a[t]) {
          var n = "function" == typeof require && require;if (!e && n) return n(t, !0);if (i) return i(t, !0);throw (n = new Error("Cannot find module '" + t + "'")).code = "MODULE_NOT_FOUND", n;
        }n = o[t] = { exports: {} }, a[t][0].call(n.exports, function (e) {
          return s(a[t][1][e] || e);
        }, n, n.exports, r, a, o, u);
      }return o[t].exports;
    }for (var i = "function" == typeof require && require, e = 0; e < u.length; e++) {
      s(u[e]);
    }return s;
  }({ 1: [function (e, t, n) {
      var c = e("github-calendar-parser"),
          l = e("elly"),
          d = e("add-subtract-date"),
          f = e("formatoid"),
          p = "MMM D, YYYY",
          g = "MMMM D",
          b = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];function m(e) {
        return e + " " + (1 === e ? "day" : "days");
      }t.exports = function (s, e, i) {
        s = l(s), (i = i || {}).summary_text = i.summary_text || 'Summary of pull requests, issues opened, and commits made by <a href="https://github.com/' + e + '" target="blank">@' + e + "</a>", i.cache = 1e3 * (i.cache || 86400), !1 === i.global_stats && (s.style.minHeight = "175px");var n = { content: "gh_calendar_content." + e, expire_at: "gh_calendar_expire." + e };return i.proxy = i.proxy || function (e) {
          return fetch("https://api.bloggify.net/gh-calendar/?username=" + e).then(function (e) {
            return e.text();
          });
        }, i.getCalendar = i.getCalendar || function (e) {
          if (i.cache && Date.now() < +localStorage.getItem(n.expire_at)) {
            var t = localStorage.getItem(n.content);if (t) return Promise.resolve(t);
          }return i.proxy(e).then(function (e) {
            return i.cache && (localStorage.setItem(n.content, e), localStorage.setItem(n.expire_at, Date.now() + i.cache)), e;
          });
        }, function u() {
          return i.getCalendar(e).then(function (e) {
            var t = document.createElement("div");t.innerHTML = e;var n,
                r,
                a,
                o,
                e = t.querySelector(".js-yearly-contributions");l(".position-relative h2", e).remove(), e.querySelector(".float-left.text-gray").innerHTML = i.summary_text, e.querySelector("include-fragment") ? setTimeout(u, 500) : (!0 === i.responsive && (r = (a = e.querySelector("svg.js-calendar-graph-svg")).getAttribute("width"), n = a.getAttribute("height"), a.removeAttribute("height"), a.setAttribute("width", "100%"), a.setAttribute("viewBox", "0 0 " + r + " " + n)), !1 !== i.global_stats && (a = (t = c(l("svg", e).outerHTML)).current_streak ? f(t.current_streak_range[0], g) + " &ndash; " + f(t.current_streak_range[1], g) : t.last_contributed ? "Last contributed in " + f(t.last_contributed, g) + "." : "Rock - Hard Place", r = t.longest_streak ? f(t.longest_streak_range[0], g) + " &ndash; " + f(t.longest_streak_range[1], g) : t.last_contributed ? "Last contributed in " + f(t.last_contributed, g) + "." : "Rock - Hard Place", n = l("<div>", { class: "contrib-column contrib-column-first table-column", html: '<span class="text-muted">Contributions in the last year</span>\n                               <span class="contrib-number">' + t.last_year + ' total</span>\n                               <span class="text-muted">' + f(d.add(d.subtract(new Date(), 1, "year"), 1, "day"), p) + " &ndash; " + f(new Date(), p) + "</span>" }), r = l("<div>", { class: "contrib-column table-column", html: '<span class="text-muted">Longest streak</span>\n                               <span class="contrib-number">' + m(t.longest_streak) + '</span>\n                               <span class="text-muted">' + r + "</span>" }), a = l("<div>", { class: "contrib-column table-column", html: '<span class="text-muted">Current streak</span>\n                               <span class="contrib-number">' + m(t.current_streak) + '</span>\n                               <span class="text-muted">' + a + "</span>" }), e.appendChild(n), e.appendChild(r), e.appendChild(a)), s.innerHTML = e.innerHTML, !0 === i.tooltips && (e = s, (o = document.createElement("div")).classList.add("day-tooltip"), e.appendChild(o), e.querySelectorAll("rect.day").forEach(function (e) {
              e.addEventListener("mouseenter", function (e) {
                var t = e.target.getAttribute("data-count");"0" === t ? t = "No contributions" : "1" === t ? t = "1 contribution" : t += " contributions";var n = new Date(e.target.getAttribute("data-date")),
                    n = b[n.getUTCMonth()] + " " + n.getUTCDate() + ", " + n.getUTCFullYear();o.innerHTML = "<strong>" + t + "</strong> on " + n, o.classList.add("is-visible");n = e.target.getBoundingClientRect(), e = n.left + window.pageXOffset - o.offsetWidth / 2 + n.width / 2, n = n.bottom + window.pageYOffset - o.offsetHeight - 2 * n.height;o.style.top = n + "px", o.style.left = e + "px";
              }), e.addEventListener("mouseleave", function () {
                o.classList.remove("is-visible");
              });
            })));
          }).catch(function (e) {
            return console.error(e);
          });
        }();
      };
    }, { "add-subtract-date": 2, elly: 4, formatoid: 6, "github-calendar-parser": 8 }], 2: [function (e, t, n) {
      function r(a) {
        return function e(t, n, r) {
          switch (n *= a, r) {case "years":case "year":
              t.setFullYear(t.getFullYear() + n);break;case "months":case "month":
              t.setMonth(t.getMonth() + n);break;case "weeks":case "week":
              return e(t, 7 * n, "days");case "days":case "day":
              t.setDate(t.getDate() + n);break;case "hours":case "hour":
              t.setHours(t.getHours() + n);break;case "minutes":case "minute":
              t.setMinutes(t.getMinutes() + n);break;case "seconds":case "second":
              t.setSeconds(t.getSeconds() + n);break;case "milliseconds":case "millisecond":
              t.setMilliseconds(t.getMilliseconds() + n);break;default:
              throw new Error("Invalid range: " + r);}return t;
        };
      }t.exports = { add: r(1), subtract: r(-1) };
    }, {}], 3: [function (e, t, n) {
      t.exports.en = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], t.exports.en.abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], t.exports.en.short = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"], t.exports.fr = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"], t.exports.fr.abbr = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"], t.exports.fr.short = ["di", "lu", "ma", "me", "je", "ve", "sa"], t.exports.es = ["domingo", "lunes", "martes", "miercoles", "jueves", "viernes", "sabado"], t.exports.es.abbr = ["dom", "lun", "mar", "mir", "jue", "vie", "sab"], t.exports.es.short = ["do", "lu", "ma", "mi", "ju", "vi", "sa"], t.exports.it = ["Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"], t.exports.it.abbr = ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab"], t.exports.it.short = ["D", "L", "Ma", "Me", "G", "V", "S"], t.exports = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], t.exports.abbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], t.exports.short = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
    }, {}], 4: [function (e, t, n) {
      var r = e("iterate-object"),
          a = e("sliced");function o(n, e) {
        return "string" == typeof n ? "<" === n.charAt(0) ? (n = document.createElement(n.slice(1, -1)), r(e || {}, function (e, t) {
          switch (t) {case "text":
              return void (n.textContent = e);case "html":
              return void (n.innerHTML = e);}n.setAttribute(t, e);
        }), n) : (e = e || document).querySelector(n) : n;
      }o.$$ = function (e, t) {
        return "string" == typeof e ? (t = t || document, a(t.querySelectorAll(e))) : [e];
      }, t.exports = o;
    }, { "iterate-object": 9, sliced: 13 }], 5: [function (e, t, n) {
      t.exports = function (e, t, n) {
        n = n || "0";t = (t = t || 2) - (e = e.toString()).length;return (t <= 0 ? "" : n.repeat(t)) + e;
      };
    }, {}], 6: [function (e, t, n) {
      var r = e("months"),
          a = e("days"),
          o = e("fillo"),
          e = e("parse-it").Parser,
          u = { YYYY: function YYYY(e, t) {
          return t ? e.getUTCFullYear() : e.getFullYear();
        }, YY: function YY(e, t) {
          return u.YYYY(e, t) % 100;
        }, MMMM: function MMMM(e, t) {
          return t ? r[e.getUTCMonth()] : r[e.getMonth()];
        }, MMM: function MMM(e, t) {
          return t ? r.abbr[e.getUTCMonth()] : r.abbr[e.getMonth()];
        }, MM: function MM(e, t) {
          return o(t ? e.getUTCMonth() + 1 : e.getMonth() + 1);
        }, M: function M(e, t) {
          return t ? e.getUTCMonth() + 1 : e.getMonth() + 1;
        }, dddd: function dddd(e, t) {
          return a[u.d(e, t)];
        }, ddd: function ddd(e, t) {
          return a.abbr[u.d(e, t)];
        }, dd: function dd(e, t) {
          return a.short[u.d(e, t)];
        }, d: function d(e, t) {
          return t ? e.getUTCDay() : e.getDay();
        }, DD: function DD(e, t) {
          return o(u.D(e, t));
        }, D: function D(e, t) {
          return t ? e.getUTCDate() : e.getDate();
        }, A: function A(e, t) {
          return u.a(e, t).toUpperCase();
        }, a: function a(e, t) {
          return 12 <= u.H(e, t) ? "pm" : "am";
        }, hh: function hh(e, t) {
          return o(u.h(e, t));
        }, h: function h(e, t) {
          return u.H(e, t) % 12 || 12;
        }, HH: function HH(e, t) {
          return o(u.H(e, t));
        }, H: function H(e, t) {
          return t ? e.getUTCHours() : e.getHours();
        }, mm: function mm(e, t) {
          return o(u.m(e, t));
        }, m: function m(e, t) {
          return t ? e.getUTCMinutes() : e.getMinutes();
        }, ss: function ss(e, t) {
          return o(u.s(e, t));
        }, s: function s(e, t) {
          return t ? e.getUTCSeconds() : e.getSeconds();
        }, S: function S(e, t) {
          return Math.round(u.s(e, t) / 60 * 10);
        }, SS: function SS(e, t) {
          return o(u.s(e, t) / 60 * 100);
        }, SSS: function SSS(e, t) {
          return o(u.s(e, t) / 60 * 1e3, 3);
        }, Z: function Z(e) {
          e = -e.getTimezoneOffset();return (0 <= e ? "+" : "-") + o(parseInt(e / 60)) + ":" + o(e % 60);
        }, ZZ: function ZZ(e) {
          e = -e.getTimezoneOffset();return (0 <= e ? "+" : "-") + o(parseInt(e / 60)) + o(e % 60);
        } },
          s = new e(u);t.exports = function (e, t) {
        return s.run(t, [e, e._useUTC]);
      };
    }, { days: 3, fillo: 5, months: 10, "parse-it": 11 }], 7: [function (e, t, n) {
      t.exports = ["#eee", "#d6e685", "#8cc665", "#44a340", "#1e6823"];
    }, {}], 8: [function (e, t, n) {
      var u = e("github-calendar-legend"),
          s = e("github-calendar-legend"),
          i = ["day", "day-L1", "day-L4", "day-L3", "day-L2"];t.exports = function (e) {
        function r() {
          a.current_streak > a.longest_streak && (a.longest_streak = a.current_streak, a.longest_streak_range[0] = a.current_streak_range[0], a.longest_streak_range[1] = a.current_streak_range[1]);
        }var a = { last_year: 0, longest_streak: -1, longest_streak_range: [], current_streak: 0, current_streak_range: [], weeks: [], days: [], last_contributed: null },
            o = [];return e.split("\n").slice(2).map(function (e) {
          return e.trim();
        }).forEach(function (e) {
          if (e.startsWith("<g transform")) return o.length && a.weeks.push(o) && (o = []);var t = e.match(/fill="var\(\-\-color\-calendar\-graph\-([a-z0-9-]+)\-bg\)"/i),
              n = e.match(/data-date="([0-9\-]+)"/),
              e = e.match(/data-count="([0-9]+)"/),
              t = t && t[1],
              n = n && n[1],
              e = e && +e[1];t && (t = { fill: t = s[i.indexOf(t)], date: new Date(n), count: e, level: u.indexOf(t) }, 0 === a.current_streak && (a.current_streak_range[0] = t.date), t.count ? (++a.current_streak, a.last_year += t.count, a.last_contributed = t.date, a.current_streak_range[1] = t.date) : (r(), a.current_streak = 0), o.push(t), a.days.push(t));
        }), r(), a;
      };
    }, { "github-calendar-legend": 7 }], 9: [function (e, t, n) {
      var a = "function" == typeof Symbol && "symbol" === _typeof2(Symbol.iterator) ? function (e) {
        return void 0 === e ? "undefined" : _typeof2(e);
      } : function (e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : _typeof2(e);
      };t.exports = function (e, t) {
        var n,
            r = 0;if (Array.isArray(e)) for (; r < e.length && !1 !== t(e[r], r, e); ++r) {} else if ("object" === (void 0 === e ? "undefined" : a(e)) && null !== e) for (n = Object.keys(e); r < n.length && !1 !== t(e[n[r]], n[r], e); ++r) {}
      };
    }, {}], 10: [function (e, t, n) {
      t.exports = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], t.exports.abbr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], t.exports.it = ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"], t.exports.abbr.it = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"], t.exports.de = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"], t.exports.abbr.de = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
    }, {}], 11: [function (e, t, n) {
      var r = function r(e, t, n) {
        return t && a(e.prototype, t), n && a(e, n), e;
      };function a(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(e, r.key, r);
        }
      }var o = e("regex-escape"),
          u = (r(s, [{ key: "run", value: function value(e, t) {
          var n = "";t = t || [];do {
            var r = e.match(this.re),
                a = r && r[1],
                r = a || e.charAt(0);
          } while ((a ? ("function" == typeof (a = this.obj[a]) && (a = a.apply(this, t)), n += a) : n += r, e = e.substring(r.length)));return n;
        } }]), s);function s(e) {
        !function (e, t) {
          if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
        }(this, s), this.obj = e || {}, this.re = new RegExp("^(" + Object.keys(e).map(o).join("|") + ")");
      }function i(e, t, n) {
        return new u(t).run(e, n);
      }i.Parser = u, t.exports = i;
    }, { "regex-escape": 12 }], 12: [function (e, t, n) {
      function r(e) {
        return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
      }r.proto = function () {
        return RegExp.escape = r;
      }, t.exports = r;
    }, {}], 13: [function (e, t, n) {
      t.exports = function (e, t, n) {
        var r = [],
            a = e.length;if (0 === a) return r;var o = t < 0 ? Math.max(0, t + a) : t || 0;for (void 0 !== n && (a = n < 0 ? n + a : n); a-- > o;) {
          r[a - o] = e[a];
        }return r;
      };
    }, {}] }, {}, [1])(1);
});
