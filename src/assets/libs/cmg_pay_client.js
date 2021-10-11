var cmgPay,
  __extends =
    (this && this.__extends) ||
    (function () {
      var a =
        Object.setPrototypeOf ||
        ({
          __proto__: [],
        } instanceof Array &&
          function (e, t) {
            e.__proto__ = t;
          }) ||
        function (e, t) {
          for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
        };
      return function (e, t) {
        function r() {
          this.constructor = e;
        }
        a(e, t),
          (e.prototype =
            null === t
              ? Object.create(t)
              : ((r.prototype = t.prototype), new r()));
      };
    })();
(function (l) {
  var n = (function () {
    function e() {}
    return (
      (e.SUCESS = 0),
      (e.NOT_INIT = -1),
      (e.PARAMETER_INVALIDATE = -2),
      (e.SERVER_NET_ERROR = -3),
      (e.SERVER_ERROR_PRE_TRADE = -4),
      (e.SERVER_ERROR_PAY = -5),
      (e.SERVER_ERROR_PERPAY = -6),
      (e.MIDAS_ERROR = -7),
      (e.SERVER_ERROR_CHECK_BALANCE = -8),
      (e.SERVER_ERROR_CHECK_BALANCE_MISMATCH = -9),
      (e.SERVER_ERROR_BUY_HONOR_NOT_EXIST = -10),
      e
    );
  })();
  l.ClientPayCode = n;
  var e = (function () {
    function e() {}
    return (
      (e.prototype.init = function (e, t, r, a, n, o) {
        void 0 === o && (o = !1),
          o &&
            ((t = l.Platform.PLATFORM_WECHAT_TEST),
            (l.Platform.isPrintLog = !0)),
          l.Platform.log('Client::init gameId(' + e + ') platform(' + t + ')'),
          (this.mDataManager = new l.PayManager(e, t, r, a)),
          this.mDataManager.init(n);
      }),
      (e.prototype.consume = function (e, t, r, a) {
        null != this.mDataManager
          ? this.mDataManager.consume(e, t, r, a)
          : a(n.NOT_INIT, null);
      }),
      (e.prototype.present = function (e, t, r, a) {
        null != this.mDataManager
          ? this.mDataManager.present(e, t, r, a)
          : a(n.NOT_INIT, null);
      }),
      (e.prototype.getBalance = function (e) {
        null != this.mDataManager
          ? this.mDataManager.getBalance(e)
          : e(n.NOT_INIT, null);
      }),
      (e.prototype.recharge = function (e, t) {
        null != this.mDataManager
          ? this.mDataManager.recharge(e, t)
          : t(l.RechargeResponse.create(l.RechargeStage.PERPAY, n.NOT_INIT));
      }),
      (e.prototype.getHistroyTrade = function (e, t, r) {
        null != this.mDataManager
          ? this.mDataManager.getHistroyTrade(e, t, r)
          : r(n.NOT_INIT, null);
      }),
      (e.prototype.buyHonor = function (e, t) {
        null != this.mDataManager
          ? this.mDataManager.buyHonor(e, t)
          : t(n.NOT_INIT, null);
      }),
      (e.prototype.destroy = function (e) {
        l.Platform.log('Client::destroy'),
          this.mDataManager && this.mDataManager.destroy(e);
      }),
      e
    );
  })();
  (l.Client = e), (l.client = new e());
})(cmgPay || (cmgPay = {})),
  (function (o) {
    var l = (function () {
      function e() {}
      return (
        (e.PERPAY = 'request_perpay'),
        (e.PAY = 'request_pay'),
        (e.CHECK_PAY = 'request_check_pay'),
        e
      );
    })();
    o.RechargeStage = l;
    var e = (function () {
      function n() {}
      return (
        (n.prototype.isUserCancel = function () {
          return (
            null != this.midasErrCode &&
            (-2 == this.midasErrCode || 1 == this.midasErrCode)
          );
        }),
        (n.create = function (e, t, r) {
          var a = new n();
          return (
            (a.stage = e),
            (a.resultCode = t),
            (a.result = t == o.ClientPayCode.SUCESS),
            (a.balancInfo = r),
            a
          );
        }),
        (n.createMidas = function (e, t, r) {
          var a = new n();
          return (
            (a.stage = l.PAY),
            (a.resultCode = e),
            (a.result = e == o.ClientPayCode.SUCESS),
            (a.midasErrMsg = t),
            (a.midasErrCode = r),
            a
          );
        }),
        n
      );
    })();
    o.RechargeResponse = e;
    var t = (function () {
      function r() {}
      return (
        (r.createSimpleBalance = function (e) {
          var t = new r();
          return (t.balance = e), t;
        }),
        (r.parseServerJson = function (e) {
          var t = new r();
          return (
            (t.balance = e.balance),
            (t.presentedBalance = e.gen_balance),
            (t.firstPay = e.first_save),
            (t.paySum = e.save_amt),
            (t.totalSum = e.save_sum),
            (t.costSum = e.cost_sum),
            (t.presentSum = e.present_sum),
            t
          );
        }),
        (r.prototype.toString = function () {
          return console.log('toString called '), '';
        }),
        r
      );
    })();
    o.BalanceInfo = t;
    var r = (function () {
      function e() {}
      return (
        (e.parseServerJson = function (e) {
          try {
            return t.parseServerJson(e);
          } catch (e) {
            o.Platform.error(e);
          }
          return null;
        }),
        e
      );
    })();
    o.BalanceInfoParser = r;
  })((window.cmgPay = cmgPay) || (cmgPay = {})),
  (function (i) {
    var e = (function () {
      function e(e, t, r, a) {
        (this.mOfferId = '1450015698'),
          (this.mPlatform = i.Platform.createInstance(e, t, r, a)),
          (this.mNetRequester = new i.PayNetRequester(this.mPlatform));
      }
      return (
        (e.prototype.init = function (e) {
          e(i.ClientPayCode.SUCESS);
        }),
        (e.prototype.destroy = function (e) {
          e(i.ClientPayCode.SUCESS);
        }),
        (e.prototype.consume = function (r, a, n, o) {
          var l = this;
          this.mNetRequester.pretrade(function (e, t) {
            e == i.ClientPayCode.SUCESS
              ? l.mNetRequester.pay(t, r, a, n, function (e, t) {
                  e == i.ClientPayCode.SUCESS
                    ? o(e, i.BalanceInfo.createSimpleBalance(t))
                    : o(i.ClientPayCode.SERVER_ERROR_PAY, null);
                })
              : o(i.ClientPayCode.SERVER_ERROR_PRE_TRADE, null);
          });
        }),
        (e.prototype.present = function (r, a, n, o) {
          var l = this;
          this.mNetRequester.pretrade(function (e, t) {
            e == i.ClientPayCode.SUCESS
              ? l.mNetRequester.present(t, r, a, n, function (e, t) {
                  e == i.ClientPayCode.SUCESS
                    ? o(e, i.BalanceInfo.createSimpleBalance(t))
                    : o(i.ClientPayCode.SERVER_ERROR_PAY, null);
                })
              : o(i.ClientPayCode.SERVER_ERROR_PRE_TRADE, null);
          });
        }),
        (e.prototype.getBalance = function (e) {
          this.mNetRequester.getBalance(e);
        }),
        (e.prototype.recharge = function (n, o) {
          var l = this,
            e = this.getLocalBillNo();
          this.mNetRequester.perpay(e, n, function (e, t, r, a) {
            e == i.ClientPayCode.SUCESS
              ? (i.Platform.log(
                  'perpay: localBillNo ' +
                    t +
                    ', serverBillNo: ' +
                    r +
                    ', balance: ' +
                    a,
                ),
                o(
                  i.RechargeResponse.create(
                    i.RechargeStage.PERPAY,
                    i.ClientPayCode.SUCESS,
                  ),
                ),
                l.requestMidasPayment(n, a, o))
              : o(
                  i.RechargeResponse.create(
                    i.RechargeStage.PERPAY,
                    i.ClientPayCode.SERVER_ERROR_PERPAY,
                  ),
                );
          });
        }),
        (e.prototype.getLocalBillNo = function () {
          return 'midas-' + new Date().getTime();
        }),
        (e.prototype.requestMidasPayment = function (e, t, a) {
          var r = this,
            n = {
              mode: 'game',
              offerId: this.mOfferId,
              buyQuantity: e,
              zoneId: '1',
              platform: 'android',
              env: 0,
              currencyType: 'CNY',
              success: function () {
                i.Platform.log('requestMidasPayment success '),
                  a(i.RechargeResponse.createMidas(i.ClientPayCode.SUCESS)),
                  r.checkBalance(t, a);
              },
              fail: function (e) {
                var t = e.errMsg,
                  r = e.errCode;
                i.Platform.log('requestMidasPayment fail'),
                  console.error(t, r),
                  a(
                    i.RechargeResponse.createMidas(
                      i.ClientPayCode.MIDAS_ERROR,
                      t,
                      r,
                    ),
                  );
              },
              complete: function () {
                i.Platform.log('requestMidasPayment complete called ');
              },
            };
          i.Platform.log('requestMidasPayment called!!!! '), i.Platform.log(n);
          try {
            wx.requestMidasPayment(n);
          } catch (e) {
            i.Platform.log('wx.requestMidasPayment catch e ');
            a(
              i.RechargeResponse.createMidas(
                i.ClientPayCode.MIDAS_ERROR,
                'requestMidasPayment catch error',
                -19800,
              ),
            ),
              i.Platform.log(e);
          }
          i.Platform.log('requestMidasPayment called end !!!! ');
        }),
        (e.prototype.checkBalance = function (r, a) {
          this.mNetRequester.getBalance(function (e, t) {
            e == i.ClientPayCode.SUCESS
              ? (i.Platform.log(
                  'checkBalance success preBlance: ' +
                    r +
                    ', current blance: ' +
                    t.balance,
                ),
                (t.preBalance = r),
                t.balance <= r
                  ? a(
                      i.RechargeResponse.create(
                        i.RechargeStage.CHECK_PAY,
                        i.ClientPayCode.SERVER_ERROR_CHECK_BALANCE_MISMATCH,
                        t,
                      ),
                    )
                  : a(
                      i.RechargeResponse.create(
                        i.RechargeStage.CHECK_PAY,
                        i.ClientPayCode.SUCESS,
                        t,
                      ),
                    ))
              : a(
                  i.RechargeResponse.create(
                    i.RechargeStage.CHECK_PAY,
                    i.ClientPayCode.SERVER_ERROR_CHECK_BALANCE,
                  ),
                );
          });
        }),
        (e.prototype.getHistroyTrade = function (e, t, r) {
          this.mNetRequester.getHistroyTrade(e, t, r);
        }),
        (e.prototype.buyHonor = function (e, t) {
          this.mNetRequester.buyHonor(e, t);
        }),
        e
      );
    })();
    i.PayManager = e;
  })(cmgPay || (cmgPay = {})),
  (function (s) {
    var e = (function () {
      function e(e) {
        (this.urlPerpay = 'payment/midas/prepay'),
          (this.urlGetBalance = 'payment/midas/balance/get'),
          (this.urlPretrade = 'payment/midas/pretrade'),
          (this.urlPay = 'payment/midas/pay'),
          (this.urlGetHistoryTrade = 'payment/midas/trade_history'),
          (this.urlPresent = 'payment/midas/present'),
          (this.urlBuyHonor = 'userinfo/honor/buy'),
          (this.mPlatform = e),
          (this.urlPerpay = this.mPlatform.getBaseServerUrl() + this.urlPerpay),
          (this.urlGetBalance =
            this.mPlatform.getBaseServerUrl() + this.urlGetBalance),
          (this.urlPretrade =
            this.mPlatform.getBaseServerUrl() + this.urlPretrade),
          (this.urlPay = this.mPlatform.getBaseServerUrl() + this.urlPay),
          (this.urlGetHistoryTrade =
            this.mPlatform.getBaseServerUrl() + this.urlGetHistoryTrade),
          (this.urlPresent =
            this.mPlatform.getBaseServerUrl() + this.urlPresent),
          (this.urlBuyHonor =
            this.mPlatform.getBaseServerUrl() + this.urlBuyHonor);
      }
      return (
        (e.prototype.perpay = function (a, e, n) {
          var t = {
            local_bill_no: a,
            amount: e,
          };
          this.mPlatform.netwrokRequest(this.urlPerpay, t, function (e, t) {
            s.Platform.log('PayNetRequester#perpay#result: ' + e),
              s.Platform.log(t);
            var r = e
              ? s.ClientPayCode.SUCESS
              : s.ClientPayCode.SERVER_NET_ERROR;
            e && null != t && t.local_bill_no == a && 0 != t.bill_no
              ? n(r, t.local_bill_no, t.bill_no, t.balance)
              : n(s.ClientPayCode.SERVER_NET_ERROR, a, '', 0);
          });
        }),
        (e.prototype.getBalance = function (n) {
          this.mPlatform.netwrokRequest(
            this.urlGetBalance,
            {},
            function (e, t) {
              s.Platform.log('PayNetRequester#getBalance#result: ' + e),
                s.Platform.log(t);
              var r = e
                ? s.ClientPayCode.SUCESS
                : s.ClientPayCode.SERVER_NET_ERROR;
              if (e && null != t) {
                var a = s.BalanceInfoParser.parseServerJson(t);
                null != a ? n(r, a) : n(s.ClientPayCode.SERVER_NET_ERROR, null);
              } else n(s.ClientPayCode.SERVER_NET_ERROR, null);
            },
          );
        }),
        (e.prototype.pretrade = function (a) {
          this.mPlatform.netwrokRequest(this.urlPretrade, {}, function (e, t) {
            s.Platform.log('PayNetRequester#pretrade#result: ' + e),
              s.Platform.log(t);
            var r = e
              ? s.ClientPayCode.SUCESS
              : s.ClientPayCode.SERVER_NET_ERROR;
            e && null != t && null != t.bill_no
              ? a(r, t.bill_no)
              : a(s.ClientPayCode.SERVER_NET_ERROR, null);
          });
        }),
        (e.prototype.pay = function (e, t, r, a, n) {
          var o = {
            amt: t,
            pay_item: r,
            AppRemark: a,
            bill_no: e,
          };
          this.mPlatform.netwrokRequest(this.urlPay, o, function (e, t) {
            s.Platform.log('PayNetRequester#pay#result: ' + e),
              s.Platform.log(t);
            var r = e
              ? s.ClientPayCode.SUCESS
              : s.ClientPayCode.SERVER_NET_ERROR;
            e && null != t && null != t.balance
              ? n(r, t.balance)
              : n(s.ClientPayCode.SERVER_NET_ERROR, null);
          });
        }),
        (e.prototype.present = function (e, t, r, a, n) {
          var o = {
            amt: t,
            pay_item: r,
            AppRemark: a,
            bill_no: e,
          };
          this.mPlatform.netwrokRequest(this.urlPresent, o, function (e, t) {
            s.Platform.log('PayNetRequester#present#result: ' + e),
              s.Platform.log(t);
            var r = e
              ? s.ClientPayCode.SUCESS
              : s.ClientPayCode.SERVER_NET_ERROR;
            e && null != t && null != t.balance
              ? n(r, t.balance)
              : n(s.ClientPayCode.SERVER_NET_ERROR, null);
          });
        }),
        (e.prototype.getHistroyTrade = function (e, t, a) {
          var r = {
            begin_time: Math.floor(e / 1e3),
            end_time: Math.floor(t / 1e3),
          };
          this.mPlatform.netwrokRequest(
            this.urlGetHistoryTrade,
            r,
            function (e, t) {
              s.Platform.log('PayNetRequester#getHistroyTrade#result: ' + e),
                s.Platform.log(t);
              var r = e
                ? s.ClientPayCode.SUCESS
                : s.ClientPayCode.SERVER_NET_ERROR;
              e && null != t
                ? a(r, 0)
                : a(s.ClientPayCode.SERVER_NET_ERROR, null);
            },
          );
        }),
        (e.prototype.buyHonor = function (i, u) {
          var e = {
            item_id: i,
          };
          this.mPlatform.netwrokRequest(this.urlBuyHonor, e, function (e, t) {
            if (
              (s.Platform.log('PayNetRequester#buyHonor#result: ' + e),
              s.Platform.log(t),
              t && t.status)
            ) {
              var r = null;
              if (t.infos)
                try {
                  r = JSON.parse(t.infos);
                } catch (e) {}
              if (!r)
                return (
                  s.Platform.log(
                    'PayNetRequester#buyHonor#dataInfo parse error',
                  ),
                  void u(t.status, null)
                );
              var a = new Map();
              for (var n in r) {
                if (r.hasOwnProperty(n)) null != (o = r[n]) && a.set(n, o);
              }
              var o,
                l = t.status;
              if (l == s.ClientPayCode.SUCESS)
                (null == (o = a.get(i)) || null == o || o <= 0) &&
                  (s.Platform.log(
                    'PayNetRequester#buyHonor#cannot find itemId',
                  ),
                  (l = s.ClientPayCode.SERVER_ERROR_BUY_HONOR_NOT_EXIST));
              u(l, a);
            } else u(s.ClientPayCode.SERVER_NET_ERROR, null);
          });
        }),
        e
      );
    })();
    s.PayNetRequester = e;
  })(cmgPay || (cmgPay = {})),
  (function (c) {
    var t = (function () {
        function e() {
          var e = window.getQueryStringRegion('region');
          this.SERVER_ADDRESS_BASE =
            'oversea' == e
              ? 'https://h5game_oversea.cmcm.com/warty/'
              : 'https://minigame.cmcm.com/warty/';
        }
        return (
          (e.prototype.networkRequest = function (e) {
            c.WXHelper.networkRequest(e);
          }),
          (e.prototype.getBaseServerUrl = function () {
            return this.SERVER_ADDRESS_BASE;
          }),
          (e.prototype.getStorageSync = function (e) {
            return c.WXHelper.getStorageSync(e);
          }),
          (e.prototype.setStorageSync = function (e, t) {
            c.WXHelper.setStorageSync(e, t);
          }),
          e
        );
      })(),
      r = (function (e) {
        function t() {
          return (null !== e && e.apply(this, arguments)) || this;
        }
        return (
          __extends(t, e),
          (t.prototype.getBaseServerUrl = function () {
            return 'https://pianotiles-minigame.cmcm.com/warty/';
          }),
          t
        );
      })(t),
      e = (function () {
        function s(e, t, r, a) {
          (this.mTimeDiffLocal = 0),
            (this.mPlatformType = t),
            (this.mGameId = e),
            (this.mPlayerId = r),
            (this.mToken = a),
            this.initPlatform(this.mPlatformType);
        }
        return (
          (s.createInstance = function (e, t, r, a) {
            return new s(e, t, r, a);
          }),
          (s.log = function (e) {
            s.isPrintLog && console.warn(e);
          }),
          (s.error = function (e) {
            console.error(e);
          }),
          (s.prototype.initPlatform = function (e) {
            switch (e) {
              case s.PLATFORM_WECHAT:
              case s.PLATFORM_H5SDK:
                this.mPlatformProxy = new t();
                break;
              case s.PLATFORM_WECHAT_TEST:
              default:
                this.mPlatformProxy = new r();
            }
          }),
          (s.prototype.getBaseServerUrl = function () {
            return this.mPlatformProxy.getBaseServerUrl();
          }),
          (s.prototype.netwrokRequest = function (r, a, n, o) {
            var l = this;
            void 0 === o && (o = s.IO_TRY_TIMES_MAX),
              s.log('#### netwrokRequest tryTime ' + o),
              (a.playerid = this.mPlayerId),
              (a.timestamp = new Date().getTime()),
              (a.gameid = this.mGameId);
            var e = 'CMCM ' + c.hex_hmac_sha1(this.mToken, JSON.stringify(a));
            this.doNetworkRequest({
              url: r,
              data: a,
              header: {
                Authorization: e,
              },
              method: s.METHOD_POST,
              dataType: 'string',
              callback: function (e, t) {
                (o -= 1),
                  0 == e && 0 < o ? l.netwrokRequest(r, a, n, o) : n(e, t);
              },
            });
          }),
          (s.prototype.getCurrentServerTime = function () {
            var e = new Date().getTime() - this.mTimeDiffLocal;
            return s.log('getServerTime:' + e), e;
          }),
          (s.prototype.refleshLocalTimeDiff = function (e) {
            this.mTimeDiffLocal = new Date().getTime() - e;
          }),
          (s.prototype.doNetworkRequest = function (i) {
            var u = this;
            this.mPlatformProxy.networkRequest({
              url: i.url,
              data: i.data,
              header: i.header,
              method: i.method,
              dataType: i.dataType,
              callback: function (e, t, r, a) {
                var n = null;
                if (e) {
                  (n = JSON.parse(t)),
                    u.refleshLocalTimeDiff(1e3 * n.timestamp);
                  var o = a.Authorization ? a.Authorization : a.authorization;
                  if (!a || !o)
                    return (
                      s.error('networkRequest, fail: Authorization is empty.'),
                      void i.callback(!1, n)
                    );
                  var l = u.mToken;
                  if (!l)
                    return (
                      s.error('networkRequest, Local token is empty'),
                      void i.callback(!1, null)
                    );
                  if ('CMCM ' + c.hex_hmac_sha1(l, t) !== o)
                    return (
                      s.error('networkRequest, fail: Invalid authorization.'),
                      void i.callback(!1, null)
                    );
                  s.log('networkRequest, The authorization is right.');
                }
                i.callback(e, n);
              },
            });
          }),
          (s.prototype.getLocalStorage = function (e) {
            for (var t = 0; t < s.IO_TRY_TIMES_MAX; t++)
              try {
                return this.mPlatformProxy.getStorageSync(e);
              } catch (e) {
                s.error(e);
              }
          }),
          (s.prototype.setLocalStorage = function (e, t) {
            for (var r = 0; r < s.IO_TRY_TIMES_MAX; r++)
              try {
                return this.mPlatformProxy.setStorageSync(e, t);
              } catch (e) {
                s.error(e);
              }
          }),
          (s.PLATFORM_WEB = 0),
          (s.PLATFORM_WECHAT = 1),
          (s.PLATFORM_FACEBOOK = 2),
          (s.PLATFORM_H5SDK = 3),
          (s.PLATFORM_QQPLAY = 4),
          (s.PLATFORM_WECHAT_TEST = 101),
          (s.isPrintLog = !0),
          (s.METHOD_POST = 'POST'),
          (s.IO_TRY_TIMES_MAX = 3),
          s
        );
      })();
    c.Platform = e;
  })(cmgPay || (cmgPay = {})),
  (function (e) {
    var o = 0,
      l = '';

    function t(e) {
      return n(r(s(e)));
    }

    function r(e) {
      return f(R(c(e), 8 * e.length));
    }

    function a(e, t) {
      var r = c(e);
      16 < r.length && (r = R(r, 8 * e.length));
      for (var a = Array(16), n = Array(16), o = 0; o < 16; o++)
        (a[o] = 909522486 ^ r[o]), (n[o] = 1549556828 ^ r[o]);
      var l = R(a.concat(c(t)), 512 + 8 * t.length);
      return f(R(n.concat(l), 672));
    }

    function n(e) {
      for (
        var t, r = o ? '0123456789ABCDEF' : '0123456789abcdef', a = '', n = 0;
        n < e.length;
        n++
      )
        (t = e.charCodeAt(n)),
          (a += r.charAt((t >>> 4) & 15) + r.charAt(15 & t));
      return a;
    }

    function i(e) {
      for (var t = '', r = e.length, a = 0; a < r; a += 3)
        for (
          var n =
              (e.charCodeAt(a) << 16) |
              (a + 1 < r ? e.charCodeAt(a + 1) << 8 : 0) |
              (a + 2 < r ? e.charCodeAt(a + 2) : 0),
            o = 0;
          o < 4;
          o++
        )
          8 * a + 6 * o > 8 * e.length
            ? (t += l)
            : (t +=
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(
                  (n >>> (6 * (3 - o))) & 63,
                ));
      return t;
    }

    function u(e, t) {
      var r,
        a,
        n,
        o,
        l = t.length,
        i = Array(),
        u = Array(Math.ceil(e.length / 2));
      for (r = 0; r < u.length; r++)
        u[r] = (e.charCodeAt(2 * r) << 8) | e.charCodeAt(2 * r + 1);
      for (; 0 < u.length; ) {
        for (o = Array(), r = n = 0; r < u.length; r++)
          (n = (n << 16) + u[r]),
            (n -= (a = Math.floor(n / l)) * l),
            (0 < o.length || 0 < a) && (o[o.length] = a);
        (i[i.length] = n), (u = o);
      }
      var s = '';
      for (r = i.length - 1; 0 <= r; r--) s += t.charAt(i[r]);
      var c = Math.ceil((8 * e.length) / (Math.log(t.length) / Math.log(2)));
      for (r = s.length; r < c; r++) s = t[0] + s;
      return s;
    }

    function s(e) {
      for (var t, r, a = '', n = -1; ++n < e.length; )
        (t = e.charCodeAt(n)),
          (r = n + 1 < e.length ? e.charCodeAt(n + 1) : 0),
          55296 <= t &&
            t <= 56319 &&
            56320 <= r &&
            r <= 57343 &&
            ((t = 65536 + ((1023 & t) << 10) + (1023 & r)), n++),
          t <= 127
            ? (a += String.fromCharCode(t))
            : t <= 2047
            ? (a += String.fromCharCode(192 | ((t >>> 6) & 31), 128 | (63 & t)))
            : t <= 65535
            ? (a += String.fromCharCode(
                224 | ((t >>> 12) & 15),
                128 | ((t >>> 6) & 63),
                128 | (63 & t),
              ))
            : t <= 2097151 &&
              (a += String.fromCharCode(
                240 | ((t >>> 18) & 7),
                128 | ((t >>> 12) & 63),
                128 | ((t >>> 6) & 63),
                128 | (63 & t),
              ));
      return a;
    }

    function c(e) {
      for (var t = Array(e.length >> 2), r = 0; r < t.length; r++) t[r] = 0;
      for (r = 0; r < 8 * e.length; r += 8)
        t[r >> 5] |= (255 & e.charCodeAt(r / 8)) << (24 - (r % 32));
      return t;
    }

    function f(e) {
      for (var t = '', r = 0; r < 32 * e.length; r += 8)
        t += String.fromCharCode((e[r >> 5] >>> (24 - (r % 32))) & 255);
      return t;
    }

    function R(e, t) {
      (e[t >> 5] |= 128 << (24 - (t % 32))),
        (e[15 + (((t + 64) >> 9) << 4)] = t);
      for (
        var r,
          a = Array(80),
          n = 1732584193,
          o = -271733879,
          l = -1732584194,
          i = 271733878,
          u = -1009589776,
          s = 0;
        s < e.length;
        s += 16
      ) {
        for (var c = n, f = o, R = l, m = i, y = u, h = 0; h < 80; h++) {
          a[h] =
            h < 16
              ? e[s + h]
              : d(a[h - 3] ^ a[h - 8] ^ a[h - 14] ^ a[h - 16], 1);
          var P = p(
            p(d(n, 5), g(h, o, l, i)),
            p(
              p(u, a[h]),
              (r = h) < 20
                ? 1518500249
                : r < 40
                ? 1859775393
                : r < 60
                ? -1894007588
                : -899497514,
            ),
          );
          (u = i), (i = l), (l = d(o, 30)), (o = n), (n = P);
        }
        (n = p(n, c)),
          (o = p(o, f)),
          (l = p(l, R)),
          (i = p(i, m)),
          (u = p(u, y));
      }
      return Array(n, o, l, i, u);
    }

    function g(e, t, r, a) {
      return e < 20
        ? (t & r) | (~t & a)
        : e < 40
        ? t ^ r ^ a
        : e < 60
        ? (t & r) | (t & a) | (r & a)
        : t ^ r ^ a;
    }

    function p(e, t) {
      var r = (65535 & e) + (65535 & t);
      return (((e >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
    }

    function d(e, t) {
      return (e << t) | (e >>> (32 - t));
    }
    (e.hex_sha1 = t),
      (e.b64_sha1 = function (e) {
        return i(r(s(e)));
      }),
      (e.any_sha1 = function (e, t) {
        return u(r(s(e)), t);
      }),
      (e.hex_hmac_sha1 = function (e, t) {
        return n(a(s(e), s(t)));
      }),
      (e.b64_hmac_sha1 = function (e, t) {
        return i(a(s(e), s(t)));
      }),
      (e.any_hmac_sha1 = function (e, t, r) {
        return u(a(s(e), s(t)), r);
      });
  })(cmgPay || (cmgPay = {})),
  (function (r) {
    var e = (function () {
      function e() {}
      return (
        (e.networkRequest = function (t) {
          r.Platform.log('WXHelper networkRequest, parameter:'),
            r.Platform.log(t),
            wx.request({
              url: t.url,
              data: t.data,
              header: t.header,
              method: t.method,
              dataType: t.dataType,
              success: function (e) {
                r.Platform.log('WXHelper networkRequest, complete:'),
                  r.Platform.log(e),
                  t.callback &&
                    (200 != e.statusCode
                      ? (r.Platform.error(
                          'WXHelper networkRequest, fail: Code:' + e.statusCode,
                        ),
                        t.callback(!1, e, e.statusCode, e.header))
                      : e.data
                      ? (r.Platform.log('WXHelper networkRequest, success.'),
                        t.callback(!0, e.data, e.statusCode, e.header))
                      : (r.Platform.error('WXHelper networkRequest, fail:'),
                        r.Platform.error(e),
                        t.callback(!1, e, e.statusCode, e.header)));
              },
              fail: function () {
                r.Platform.error('WXHelper networkRequest, fail'),
                  t.callback && t.callback(!1, null, -1, null);
              },
            });
        }),
        (e.getStorageSync = function (e) {
          return wx.getStorageSync(e);
        }),
        (e.setStorageSync = function (e, t) {
          return wx.setStorageSync(e, t);
        }),
        (e.setStorage = function (e, t, r) {
          wx.setStorage({
            key: e,
            data: t,
            success: function () {
              r && r(!0);
            },
            fail: function () {
              r && r(!1);
            },
          });
        }),
        (e.getStorage = function (e, t) {
          wx.getStorage({
            key: e,
            success: function (e) {
              t && t(e);
            },
            fail: function () {
              t && t(null);
            },
          });
        }),
        e
      );
    })();
    r.WXHelper = e;
  })(cmgPay || (cmgPay = {}));
