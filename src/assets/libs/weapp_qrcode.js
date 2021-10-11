var WeAppQRCode;
(function (t) {
  var r = (function () {
      function t(t) {
        (this.mode = 4), (this.data = t);
      }
      return (
        (t.prototype.getLength = function () {
          return this.data.length;
        }),
        (t.prototype.write = function (t) {
          for (var e = 0; e < this.data.length; e++)
            t.put(this.data.charCodeAt(e), 8);
        }),
        t
      );
    })(),
    f = (function () {
      function s(t, e) {
        (this.typeNumber = t),
          (this.errorCorrectLevel = e),
          (this.modules = null),
          (this.moduleCount = 0),
          (this.dataCache = null),
          (this.dataList = new Array());
      }
      return (
        (s.prototype.addData = function (t) {
          var e = new r(t);
          this.dataList.push(e), (this.dataCache = null);
        }),
        (s.prototype.isDark = function (t, e) {
          if (t < 0 || this.moduleCount <= t || e < 0 || this.moduleCount <= e)
            throw new Error(t + ',' + e);
          return this.modules[t][e];
        }),
        (s.prototype.getModuleCount = function () {
          return this.moduleCount;
        }),
        (s.prototype.make = function () {
          if (this.typeNumber < 1) {
            var t = 1;
            for (t = 1; t < 40; t++) {
              for (
                var e = h.getRSBlocks(t, this.errorCorrectLevel),
                  r = new l(),
                  o = 0,
                  n = 0;
                n < e.length;
                n++
              )
                o += e[n].dataCount;
              for (n = 0; n < this.dataList.length; n++) {
                var i = this.dataList[n];
                r.put(i.mode, 4),
                  r.put(i.getLength(), C.getLengthInBits(i.mode, t)),
                  i.write(r);
              }
              if (r.getLengthInBits() <= 8 * o) break;
            }
            this.typeNumber = t;
          }
          this.makeImpl(!1, this.getBestMaskPattern());
        }),
        (s.prototype.makeImpl = function (t, e) {
          (this.moduleCount = 4 * this.typeNumber + 17),
            (this.modules = new Array(this.moduleCount));
          for (var r = 0; r < this.moduleCount; r++) {
            this.modules[r] = new Array(this.moduleCount);
            for (var o = 0; o < this.moduleCount; o++)
              this.modules[r][o] = null;
          }
          this.setupPositionProbePattern(0, 0),
            this.setupPositionProbePattern(this.moduleCount - 7, 0),
            this.setupPositionProbePattern(0, this.moduleCount - 7),
            this.setupPositionAdjustPattern(),
            this.setupTimingPattern(),
            this.setupTypeInfo(t, e),
            7 <= this.typeNumber && this.setupTypeNumber(t),
            null == this.dataCache &&
              (this.dataCache = s.createData(
                this.typeNumber,
                this.errorCorrectLevel,
                this.dataList,
              )),
            this.mapData(this.dataCache, e);
        }),
        (s.prototype.setupPositionProbePattern = function (t, e) {
          for (var r = -1; r <= 7; r++)
            if (!(t + r <= -1 || this.moduleCount <= t + r))
              for (var o = -1; o <= 7; o++)
                e + o <= -1 ||
                  this.moduleCount <= e + o ||
                  (this.modules[t + r][e + o] =
                    (0 <= r && r <= 6 && (0 == o || 6 == o)) ||
                    (0 <= o && o <= 6 && (0 == r || 6 == r)) ||
                    (2 <= r && r <= 4 && 2 <= o && o <= 4));
        }),
        (s.prototype.getBestMaskPattern = function () {
          for (var t = 0, e = 0, r = 0; r < 8; r++) {
            this.makeImpl(!0, r);
            var o = C.getLostPoint(this);
            (0 == r || o < t) && ((t = o), (e = r));
          }
          return e;
        }),
        (s.prototype.createMovieClip = function (t, e, r) {
          var o = t.createEmptyMovieClip(e, r);
          this.make();
          for (var n = 0; n < this.modules.length; n++)
            for (var i = 1 * n, u = 0; u < this.modules[n].length; u++) {
              var a = 1 * u;
              this.modules[n][u] &&
                (o.beginFill(0, 100),
                o.moveTo(a, i),
                o.lineTo(a + 1, i),
                o.lineTo(a + 1, i + 1),
                o.lineTo(a, i + 1),
                o.endFill());
            }
          return o;
        }),
        (s.prototype.setupTimingPattern = function () {
          for (var t = 8; t < this.moduleCount - 8; t++)
            null == this.modules[t][6] && (this.modules[t][6] = t % 2 == 0);
          for (var e = 8; e < this.moduleCount - 8; e++)
            null == this.modules[6][e] && (this.modules[6][e] = e % 2 == 0);
        }),
        (s.prototype.setupPositionAdjustPattern = function () {
          for (
            var t = C.getPatternPosition(this.typeNumber), e = 0;
            e < t.length;
            e++
          )
            for (var r = 0; r < t.length; r++) {
              var o = t[e],
                n = t[r];
              if (null == this.modules[o][n])
                for (var i = -2; i <= 2; i++)
                  for (var u = -2; u <= 2; u++)
                    this.modules[o + i][n + u] =
                      -2 == i ||
                      2 == i ||
                      -2 == u ||
                      2 == u ||
                      (0 == i && 0 == u);
            }
        }),
        (s.prototype.setupTypeNumber = function (t) {
          for (
            var e = C.getBCHTypeNumber(this.typeNumber), r = 0;
            r < 18;
            r++
          ) {
            var o = !t && 1 == ((e >> r) & 1);
            this.modules[Math.floor(r / 3)][
              (r % 3) + this.moduleCount - 8 - 3
            ] = o;
          }
          for (r = 0; r < 18; r++) {
            o = !t && 1 == ((e >> r) & 1);
            this.modules[(r % 3) + this.moduleCount - 8 - 3][
              Math.floor(r / 3)
            ] = o;
          }
        }),
        (s.prototype.setupTypeInfo = function (t, e) {
          for (
            var r = (this.errorCorrectLevel << 3) | e,
              o = C.getBCHTypeInfo(r),
              n = 0;
            n < 15;
            n++
          ) {
            var i = !t && 1 == ((o >> n) & 1);
            n < 6
              ? (this.modules[n][8] = i)
              : n < 8
              ? (this.modules[n + 1][8] = i)
              : (this.modules[this.moduleCount - 15 + n][8] = i);
          }
          for (n = 0; n < 15; n++) {
            i = !t && 1 == ((o >> n) & 1);
            n < 8
              ? (this.modules[8][this.moduleCount - n - 1] = i)
              : n < 9
              ? (this.modules[8][15 - n - 1 + 1] = i)
              : (this.modules[8][15 - n - 1] = i);
          }
          this.modules[this.moduleCount - 8][8] = !t;
        }),
        (s.prototype.mapData = function (t, e) {
          for (
            var r = -1,
              o = this.moduleCount - 1,
              n = 7,
              i = 0,
              u = this.moduleCount - 1;
            0 < u;
            u -= 2
          )
            for (6 == u && u--; ; ) {
              for (var a = 0; a < 2; a++)
                if (null == this.modules[o][u - a]) {
                  var s = !1;
                  i < t.length && (s = 1 == ((t[i] >>> n) & 1)),
                    C.getMask(e, o, u - a) && (s = !s),
                    (this.modules[o][u - a] = s),
                    -1 == --n && (i++, (n = 7));
                }
              if ((o += r) < 0 || this.moduleCount <= o) {
                (o -= r), (r = -r);
                break;
              }
            }
        }),
        (s.createData = function (t, e, r) {
          for (
            var o = h.getRSBlocks(t, e), n = new l(), i = 0;
            i < r.length;
            i++
          ) {
            var u = r[i];
            n.put(u.mode, 4),
              n.put(u.getLength(), C.getLengthInBits(u.mode, t)),
              u.write(n);
          }
          var a = 0;
          for (i = 0; i < o.length; i++) a += o[i].dataCount;
          if (n.getLengthInBits() > 8 * a)
            throw new Error(
              'code length overflow. (' +
                n.getLengthInBits() +
                '>' +
                8 * a +
                ')',
            );
          for (
            n.getLengthInBits() + 4 <= 8 * a && n.put(0, 4);
            n.getLengthInBits() % 8 != 0;

          )
            n.putBit(!1);
          for (
            ;
            !(
              n.getLengthInBits() >= 8 * a ||
              (n.put(s.PAD0, 8), n.getLengthInBits() >= 8 * a)
            );

          )
            n.put(s.PAD1, 8);
          return s.createBytes(n, o);
        }),
        (s.createBytes = function (t, e) {
          for (
            var r = 0,
              o = 0,
              n = 0,
              i = new Array(e.length),
              u = new Array(e.length),
              a = 0;
            a < e.length;
            a++
          ) {
            var s = e[a].dataCount,
              h = e[a].totalCount - s;
            (o = Math.max(o, s)), (n = Math.max(n, h)), (i[a] = new Array(s));
            for (var f = 0; f < i[a].length; f++)
              i[a][f] = 255 & t.buffer[f + r];
            r += s;
            var l = C.getErrorCorrectPolynomial(h),
              g = new v(i[a], l.getLength() - 1).mod(l);
            u[a] = new Array(l.getLength() - 1);
            for (f = 0; f < u[a].length; f++) {
              var c = f + g.getLength() - u[a].length;
              u[a][f] = 0 <= c ? g.get(c) : 0;
            }
          }
          var d = 0;
          for (f = 0; f < e.length; f++) d += e[f].totalCount;
          var p = new Array(d),
            m = 0;
          for (f = 0; f < o; f++)
            for (a = 0; a < e.length; a++)
              f < i[a].length && (p[m++] = i[a][f]);
          for (f = 0; f < n; f++)
            for (a = 0; a < e.length; a++)
              f < u[a].length && (p[m++] = u[a][f]);
          return p;
        }),
        (s.PAD0 = 236),
        (s.PAD1 = 17),
        s
      );
    })(),
    o = (function () {
      function t() {}
      return (t.L = 1), (t.M = 0), (t.Q = 3), (t.H = 2), t;
    })();
  t.QRErrorCorrectLevel = o;
  var C = (function () {
      function r() {}
      return (
        (r.getBCHTypeInfo = function (t) {
          for (var e = t << 10; 0 <= r.getBCHDigit(e) - r.getBCHDigit(r.G15); )
            e ^= r.G15 << (r.getBCHDigit(e) - r.getBCHDigit(r.G15));
          return ((t << 10) | e) ^ r.G15_MASK;
        }),
        (r.getBCHTypeNumber = function (t) {
          for (var e = t << 12; 0 <= r.getBCHDigit(e) - r.getBCHDigit(r.G18); )
            e ^= r.G18 << (r.getBCHDigit(e) - r.getBCHDigit(r.G18));
          return (t << 12) | e;
        }),
        (r.getBCHDigit = function (t) {
          for (var e = 0; 0 != t; ) e++, (t >>>= 1);
          return e;
        }),
        (r.getPatternPosition = function (t) {
          return r.PATTERN_POSITION_TABLE[t - 1];
        }),
        (r.getMask = function (t, e, r) {
          switch (t) {
            case 0:
              return (e + r) % 2 == 0;
            case 1:
              return e % 2 == 0;
            case 2:
              return r % 3 == 0;
            case 3:
              return (e + r) % 3 == 0;
            case 4:
              return (Math.floor(e / 2) + Math.floor(r / 3)) % 2 == 0;
            case 5:
              return ((e * r) % 2) + ((e * r) % 3) == 0;
            case 6:
              return (((e * r) % 2) + ((e * r) % 3)) % 2 == 0;
            case 7:
              return (((e * r) % 3) + ((e + r) % 2)) % 2 == 0;
            default:
              throw new Error('bad maskPattern:' + t);
          }
        }),
        (r.getErrorCorrectPolynomial = function (t) {
          for (var e = new v([1], 0), r = 0; r < t; r++)
            e = e.multiply(new v([1, i.gexp(r)], 0));
          return e;
        }),
        (r.getLengthInBits = function (t, e) {
          if (1 <= e && e < 10)
            switch (t) {
              case 1:
                return 10;
              case 2:
                return 9;
              case 4:
              case 8:
                return 8;
              default:
                throw new Error('mode:' + t);
            }
          else if (e < 27)
            switch (t) {
              case 1:
                return 12;
              case 2:
                return 11;
              case 4:
                return 16;
              case 8:
                return 10;
              default:
                throw new Error('mode:' + t);
            }
          else {
            if (!(e < 41)) throw new Error('type:' + e);
            switch (t) {
              case 1:
                return 14;
              case 2:
                return 13;
              case 4:
                return 16;
              case 8:
                return 12;
              default:
                throw new Error('mode:' + t);
            }
          }
        }),
        (r.getLostPoint = function (t) {
          for (var e = t.getModuleCount(), r = 0, o = 0; o < e; o++)
            for (var n = 0; n < e; n++) {
              for (var i = 0, u = t.isDark(o, n), a = -1; a <= 1; a++)
                if (!(o + a < 0 || e <= o + a))
                  for (var s = -1; s <= 1; s++)
                    n + s < 0 ||
                      e <= n + s ||
                      (0 == a && 0 == s) ||
                      (u == t.isDark(o + a, n + s) && i++);
              5 < i && (r += 3 + i - 5);
            }
          for (o = 0; o < e - 1; o++)
            for (n = 0; n < e - 1; n++) {
              var h = 0;
              t.isDark(o, n) && h++,
                t.isDark(o + 1, n) && h++,
                t.isDark(o, n + 1) && h++,
                t.isDark(o + 1, n + 1) && h++,
                (0 != h && 4 != h) || (r += 3);
            }
          for (o = 0; o < e; o++)
            for (n = 0; n < e - 6; n++)
              t.isDark(o, n) &&
                !t.isDark(o, n + 1) &&
                t.isDark(o, n + 2) &&
                t.isDark(o, n + 3) &&
                t.isDark(o, n + 4) &&
                !t.isDark(o, n + 5) &&
                t.isDark(o, n + 6) &&
                (r += 40);
          for (n = 0; n < e; n++)
            for (o = 0; o < e - 6; o++)
              t.isDark(o, n) &&
                !t.isDark(o + 1, n) &&
                t.isDark(o + 2, n) &&
                t.isDark(o + 3, n) &&
                t.isDark(o + 4, n) &&
                !t.isDark(o + 5, n) &&
                t.isDark(o + 6, n) &&
                (r += 40);
          var f = 0;
          for (n = 0; n < e; n++) for (o = 0; o < e; o++) t.isDark(o, n) && f++;
          return (r += 10 * (Math.abs((100 * f) / e / e - 50) / 5));
        }),
        (r.PATTERN_POSITION_TABLE = [
          [],
          [6, 18],
          [6, 22],
          [6, 26],
          [6, 30],
          [6, 34],
          [6, 22, 38],
          [6, 24, 42],
          [6, 26, 46],
          [6, 28, 50],
          [6, 30, 54],
          [6, 32, 58],
          [6, 34, 62],
          [6, 26, 46, 66],
          [6, 26, 48, 70],
          [6, 26, 50, 74],
          [6, 30, 54, 78],
          [6, 30, 56, 82],
          [6, 30, 58, 86],
          [6, 34, 62, 90],
          [6, 28, 50, 72, 94],
          [6, 26, 50, 74, 98],
          [6, 30, 54, 78, 102],
          [6, 28, 54, 80, 106],
          [6, 32, 58, 84, 110],
          [6, 30, 58, 86, 114],
          [6, 34, 62, 90, 118],
          [6, 26, 50, 74, 98, 122],
          [6, 30, 54, 78, 102, 126],
          [6, 26, 52, 78, 104, 130],
          [6, 30, 56, 82, 108, 134],
          [6, 34, 60, 86, 112, 138],
          [6, 30, 58, 86, 114, 142],
          [6, 34, 62, 90, 118, 146],
          [6, 30, 54, 78, 102, 126, 150],
          [6, 24, 50, 76, 102, 128, 154],
          [6, 28, 54, 80, 106, 132, 158],
          [6, 32, 58, 84, 110, 136, 162],
          [6, 26, 54, 82, 110, 138, 166],
          [6, 30, 58, 86, 114, 142, 170],
        ]),
        (r.G15 = 1335),
        (r.G18 = 7973),
        (r.G15_MASK = 21522),
        r
      );
    })(),
    i = (function () {
      function e() {}
      return (
        (e.glog = function (t) {
          if ((e.initTable(), t < 1)) throw new Error('glog(' + t + ')');
          return e.LOG_TABLE[t];
        }),
        (e.gexp = function (t) {
          for (e.initTable(); t < 0; ) t += 255;
          for (; 256 <= t; ) t -= 255;
          return e.EXP_TABLE[t];
        }),
        (e.initTable = function () {
          if (!e.inited) {
            e.inited = !0;
            for (var t = 0; t < 8; t++) e.EXP_TABLE[t] = 1 << t;
            for (t = 8; t < 256; t++)
              e.EXP_TABLE[t] =
                e.EXP_TABLE[t - 4] ^
                e.EXP_TABLE[t - 5] ^
                e.EXP_TABLE[t - 6] ^
                e.EXP_TABLE[t - 8];
            for (t = 0; t < 255; t++) e.LOG_TABLE[e.EXP_TABLE[t]] = t;
          }
        }),
        (e.inited = !1),
        (e.EXP_TABLE = new Array(256)),
        (e.LOG_TABLE = new Array(256)),
        e
      );
    })(),
    v = (function () {
      function n(t, e) {
        if (null == t.length) throw new Error(t.length + '/' + e);
        for (var r = 0; r < t.length && 0 == t[r]; ) r++;
        this.num = new Array(t.length - r + e);
        for (var o = 0; o < t.length - r; o++) this.num[o] = t[o + r];
      }
      return (
        (n.prototype.get = function (t) {
          return this.num[t];
        }),
        (n.prototype.getLength = function () {
          return this.num.length;
        }),
        (n.prototype.multiply = function (t) {
          for (
            var e = new Array(this.getLength() + t.getLength() - 1), r = 0;
            r < this.getLength();
            r++
          )
            for (var o = 0; o < t.getLength(); o++)
              e[r + o] ^= i.gexp(i.glog(this.get(r)) + i.glog(t.get(o)));
          return new n(e, 0);
        }),
        (n.prototype.mod = function (t) {
          if (this.getLength() - t.getLength() < 0) return this;
          for (
            var e = i.glog(this.get(0)) - i.glog(t.get(0)),
              r = new Array(this.getLength()),
              o = 0;
            o < this.getLength();
            o++
          )
            r[o] = this.get(o);
          for (o = 0; o < t.getLength(); o++)
            r[o] ^= i.gexp(i.glog(t.get(o)) + e);
          return new n(r, 0).mod(t);
        }),
        n
      );
    })(),
    h = (function () {
      function f(t, e) {
        (this.totalCount = t), (this.dataCount = e);
      }
      return (
        (f.getRSBlocks = function (t, e) {
          var r = f.getRsBlockTable(t, e);
          if (null == r)
            throw new Error(
              'bad rs block @ typeNumber:' + t + '/errorCorrectLevel:' + e,
            );
          for (var o = r.length / 3, n = new Array(), i = 0; i < o; i++)
            for (
              var u = r[3 * i + 0], a = r[3 * i + 1], s = r[3 * i + 2], h = 0;
              h < u;
              h++
            )
              n.push(new f(a, s));
          return n;
        }),
        (f.getRsBlockTable = function (t, e) {
          switch (e) {
            case o.L:
              return f.RS_BLOCK_TABLE[4 * (t - 1) + 0];
            case o.M:
              return f.RS_BLOCK_TABLE[4 * (t - 1) + 1];
            case o.Q:
              return f.RS_BLOCK_TABLE[4 * (t - 1) + 2];
            case o.H:
              return f.RS_BLOCK_TABLE[4 * (t - 1) + 3];
            default:
              return;
          }
        }),
        (f.RS_BLOCK_TABLE = [
          [1, 26, 19],
          [1, 26, 16],
          [1, 26, 13],
          [1, 26, 9],
          [1, 44, 34],
          [1, 44, 28],
          [1, 44, 22],
          [1, 44, 16],
          [1, 70, 55],
          [1, 70, 44],
          [2, 35, 17],
          [2, 35, 13],
          [1, 100, 80],
          [2, 50, 32],
          [2, 50, 24],
          [4, 25, 9],
          [1, 134, 108],
          [2, 67, 43],
          [2, 33, 15, 2, 34, 16],
          [2, 33, 11, 2, 34, 12],
          [2, 86, 68],
          [4, 43, 27],
          [4, 43, 19],
          [4, 43, 15],
          [2, 98, 78],
          [4, 49, 31],
          [2, 32, 14, 4, 33, 15],
          [4, 39, 13, 1, 40, 14],
          [2, 121, 97],
          [2, 60, 38, 2, 61, 39],
          [4, 40, 18, 2, 41, 19],
          [4, 40, 14, 2, 41, 15],
          [2, 146, 116],
          [3, 58, 36, 2, 59, 37],
          [4, 36, 16, 4, 37, 17],
          [4, 36, 12, 4, 37, 13],
          [2, 86, 68, 2, 87, 69],
          [4, 69, 43, 1, 70, 44],
          [6, 43, 19, 2, 44, 20],
          [6, 43, 15, 2, 44, 16],
          [4, 101, 81],
          [1, 80, 50, 4, 81, 51],
          [4, 50, 22, 4, 51, 23],
          [3, 36, 12, 8, 37, 13],
          [2, 116, 92, 2, 117, 93],
          [6, 58, 36, 2, 59, 37],
          [4, 46, 20, 6, 47, 21],
          [7, 42, 14, 4, 43, 15],
          [4, 133, 107],
          [8, 59, 37, 1, 60, 38],
          [8, 44, 20, 4, 45, 21],
          [12, 33, 11, 4, 34, 12],
          [3, 145, 115, 1, 146, 116],
          [4, 64, 40, 5, 65, 41],
          [11, 36, 16, 5, 37, 17],
          [11, 36, 12, 5, 37, 13],
          [5, 109, 87, 1, 110, 88],
          [5, 65, 41, 5, 66, 42],
          [5, 54, 24, 7, 55, 25],
          [11, 36, 12],
          [5, 122, 98, 1, 123, 99],
          [7, 73, 45, 3, 74, 46],
          [15, 43, 19, 2, 44, 20],
          [3, 45, 15, 13, 46, 16],
          [1, 135, 107, 5, 136, 108],
          [10, 74, 46, 1, 75, 47],
          [1, 50, 22, 15, 51, 23],
          [2, 42, 14, 17, 43, 15],
          [5, 150, 120, 1, 151, 121],
          [9, 69, 43, 4, 70, 44],
          [17, 50, 22, 1, 51, 23],
          [2, 42, 14, 19, 43, 15],
          [3, 141, 113, 4, 142, 114],
          [3, 70, 44, 11, 71, 45],
          [17, 47, 21, 4, 48, 22],
          [9, 39, 13, 16, 40, 14],
          [3, 135, 107, 5, 136, 108],
          [3, 67, 41, 13, 68, 42],
          [15, 54, 24, 5, 55, 25],
          [15, 43, 15, 10, 44, 16],
          [4, 144, 116, 4, 145, 117],
          [17, 68, 42],
          [17, 50, 22, 6, 51, 23],
          [19, 46, 16, 6, 47, 17],
          [2, 139, 111, 7, 140, 112],
          [17, 74, 46],
          [7, 54, 24, 16, 55, 25],
          [34, 37, 13],
          [4, 151, 121, 5, 152, 122],
          [4, 75, 47, 14, 76, 48],
          [11, 54, 24, 14, 55, 25],
          [16, 45, 15, 14, 46, 16],
          [6, 147, 117, 4, 148, 118],
          [6, 73, 45, 14, 74, 46],
          [11, 54, 24, 16, 55, 25],
          [30, 46, 16, 2, 47, 17],
          [8, 132, 106, 4, 133, 107],
          [8, 75, 47, 13, 76, 48],
          [7, 54, 24, 22, 55, 25],
          [22, 45, 15, 13, 46, 16],
          [10, 142, 114, 2, 143, 115],
          [19, 74, 46, 4, 75, 47],
          [28, 50, 22, 6, 51, 23],
          [33, 46, 16, 4, 47, 17],
          [8, 152, 122, 4, 153, 123],
          [22, 73, 45, 3, 74, 46],
          [8, 53, 23, 26, 54, 24],
          [12, 45, 15, 28, 46, 16],
          [3, 147, 117, 10, 148, 118],
          [3, 73, 45, 23, 74, 46],
          [4, 54, 24, 31, 55, 25],
          [11, 45, 15, 31, 46, 16],
          [7, 146, 116, 7, 147, 117],
          [21, 73, 45, 7, 74, 46],
          [1, 53, 23, 37, 54, 24],
          [19, 45, 15, 26, 46, 16],
          [5, 145, 115, 10, 146, 116],
          [19, 75, 47, 10, 76, 48],
          [15, 54, 24, 25, 55, 25],
          [23, 45, 15, 25, 46, 16],
          [13, 145, 115, 3, 146, 116],
          [2, 74, 46, 29, 75, 47],
          [42, 54, 24, 1, 55, 25],
          [23, 45, 15, 28, 46, 16],
          [17, 145, 115],
          [10, 74, 46, 23, 75, 47],
          [10, 54, 24, 35, 55, 25],
          [19, 45, 15, 35, 46, 16],
          [17, 145, 115, 1, 146, 116],
          [14, 74, 46, 21, 75, 47],
          [29, 54, 24, 19, 55, 25],
          [11, 45, 15, 46, 46, 16],
          [13, 145, 115, 6, 146, 116],
          [14, 74, 46, 23, 75, 47],
          [44, 54, 24, 7, 55, 25],
          [59, 46, 16, 1, 47, 17],
          [12, 151, 121, 7, 152, 122],
          [12, 75, 47, 26, 76, 48],
          [39, 54, 24, 14, 55, 25],
          [22, 45, 15, 41, 46, 16],
          [6, 151, 121, 14, 152, 122],
          [6, 75, 47, 34, 76, 48],
          [46, 54, 24, 10, 55, 25],
          [2, 45, 15, 64, 46, 16],
          [17, 152, 122, 4, 153, 123],
          [29, 74, 46, 14, 75, 47],
          [49, 54, 24, 10, 55, 25],
          [24, 45, 15, 46, 46, 16],
          [4, 152, 122, 18, 153, 123],
          [13, 74, 46, 32, 75, 47],
          [48, 54, 24, 14, 55, 25],
          [42, 45, 15, 32, 46, 16],
          [20, 147, 117, 4, 148, 118],
          [40, 75, 47, 7, 76, 48],
          [43, 54, 24, 22, 55, 25],
          [10, 45, 15, 67, 46, 16],
          [19, 148, 118, 6, 149, 119],
          [18, 75, 47, 31, 76, 48],
          [34, 54, 24, 34, 55, 25],
          [20, 45, 15, 61, 46, 16],
        ]),
        f
      );
    })(),
    l = (function () {
      function t() {
        (this.buffer = new Array()), (this.length = 0);
      }
      return (
        (t.prototype.get = function (t) {
          var e = Math.floor(t / 8);
          return 1 == ((this.buffer[e] >>> (7 - (t % 8))) & 1);
        }),
        (t.prototype.put = function (t, e) {
          for (var r = 0; r < e; r++)
            this.putBit(1 == ((t >>> (e - r - 1)) & 1));
        }),
        (t.prototype.getLengthInBits = function () {
          return this.length;
        }),
        (t.prototype.putBit = function (t) {
          var e = Math.floor(this.length / 8);
          this.buffer.length <= e && this.buffer.push(0),
            t && (this.buffer[e] |= 128 >>> this.length % 8),
            this.length++;
        }),
        t
      );
    })();
  var e = function () {
    (this.width = 256),
      (this.height = 256),
      (this.typeNumber = -1),
      (this.correctLevel = o.H),
      (this.background = '#ffffff'),
      (this.foreground = '#000000'),
      (this.text = ''),
      (this.ctx = null);
  };
  (t.QRCodeOption = e),
    (t.drawQRCode = function (t) {
      if (t && t.ctx) {
        var e = new f(t.typeNumber, t.correctLevel);
        e.addData(
          (function (t) {
            var e, r, o, n;
            for (e = '', o = t.length, r = 0; r < o; r++)
              1 <= (n = t.charCodeAt(r)) && n <= 127
                ? (e += t.charAt(r))
                : (2047 < n
                    ? ((e += String.fromCharCode(224 | ((n >> 12) & 15))),
                      (e += String.fromCharCode(128 | ((n >> 6) & 63))))
                    : (e += String.fromCharCode(192 | ((n >> 6) & 31))),
                  (e += String.fromCharCode(128 | ((n >> 0) & 63))));
            return e;
          })(t.text),
        ),
          e.make();
        for (
          var r = t.ctx,
            o = t.width / e.getModuleCount(),
            n = t.height / e.getModuleCount(),
            i = 0;
          i < e.getModuleCount();
          i++
        )
          for (var u = 0; u < e.getModuleCount(); u++) {
            var a = e.isDark(i, u) ? t.foreground : t.background;
            r.fillStyle = a;
            var s = Math.ceil((u + 1) * o) - Math.floor(u * o),
              h = Math.ceil((i + 1) * o) - Math.floor(i * o);
            r.fillRect(Math.round(u * o), Math.round(i * n), s, h);
          }
      }
    });
})(WeAppQRCode || (WeAppQRCode = {})),
  (window.WeAppQRCode = WeAppQRCode);
