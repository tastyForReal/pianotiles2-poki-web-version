!(function (n) {
    function o(e) {
        if (i[e]) return i[e].exports;
        var t = (i[e] = {
            i: e,
            l: !1,
            exports: {},
        });
        return n[e].call(t.exports, t, t.exports, o), (t.l = !0), t.exports;
    }
    var i = {};
    (o.m = n),
        (o.c = i),
        (o.i = function (e) {
            return e;
        }),
        (o.d = function (e, t, n) {
            o.o(e, t) ||
                Object.defineProperty(e, t, {
                    configurable: !1,
                    enumerable: !0,
                    get: n,
                });
        }),
        (o.n = function (e) {
            var t =
                e && e.__esModule
                    ? function () {
                          return e.default;
                      }
                    : function () {
                          return e;
                      };
            return o.d(t, 'a', t), t;
        }),
        (o.o = function (e, t) {
            return Object.prototype.hasOwnProperty.call(e, t);
        }),
        (o.p = ''),
        o((o.s = 11));
})([
    function (e, t, n) {
        'use strict';
        var o,
            i =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e;
                      }
                    : function (e) {
                          return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e;
                      },
            r = n(1),
            a =
                (o = r) && o.__esModule
                    ? o
                    : {
                          default: o,
                      };
        e.exports = {
            getSystemInfoSync: function () {
                return wx.getSystemInfoSync();
            },
            getNetworkType: function () {
                wx.getNetworkType({
                    success: function (e) {
                        a.default.networkType = e.networkType;
                    },
                });
            },
            getLaunchOptionsSync: function () {
                return wx.getLaunchOptionsSync();
            },
            getSystem: function () {
                var e = this.getSystemInfoSync().system;
                return -1 < e.indexOf('Android') ? 'android' : -1 < e.indexOf('iOS') ? 'ios' : 'pc';
            },
            getWXsdkVersion: function () {
                var e = this.getSystemInfoSync().SDKVersion;
                return (e = e.replace(/\./g, '')).substring(0, 3);
            },
            checkSession: function () {
                return new Promise(function (t, n) {
                    wx.checkSession({
                        success: function (e) {
                            t(e);
                        },
                        fail: function (e) {
                            n(e);
                        },
                    });
                });
            },
            serialize: function (e) {
                var t = null;
                if (
                    ((void 0 !== e && 'function' != typeof e) || (t = ''),
                    'number' == typeof e && (t = e.toString()),
                    'boolean' == typeof e && (t = e ? '1' : '0'),
                    'object' == (void 0 === e ? 'undefined' : i(e)) &&
                        (e || (t = ''), e instanceof RegExp && (t = e.toString())),
                    'string' == typeof e && (t = e),
                    'string' == typeof t)
                )
                    return encodeURIComponent(t);
                var n = [];
                if (e instanceof Array) {
                    for (var o = 0; o < e.length; o++)
                        void 0 !== e[o] && n.push('object' == i(e[o]) ? '' : this.serialize(e[o]));
                    return n.join('|');
                }
                for (var o in e)
                    void 0 !== e[o] &&
                        ((t = null),
                        'object' == i(e[o])
                            ? e[o] instanceof Array
                                ? ((t = e[o]), n.push(o + '=' + this.serialize(t)))
                                : n.push(o + '=')
                            : ((t = e[o]), n.push(o + '=' + this.serialize(t))));
                return n.join('&');
            },
        };
    },
    function (e, t, n) {
        'use strict';
        e.exports = {
            api: 'https://h5sdk.game.qq.com/api2/H5SDKApi.php',
            report: '',
            apptype: 4,
            wxappid: '',
            networkType: '',
            h5channel: 10030414,
            h5sdkVersion: '20180525',
            gameVersion: '',
            reportCount: 9,
            requestCount: 0,
            maxRequestCount: 1,
            tempUserLoginInfo: {},
            tempReportData: [],
        };
    },
    function (e, t, n) {
        'use strict';
        var o,
            i = n(1),
            r =
                (o = i) && o.__esModule
                    ? o
                    : {
                          default: o,
                      };
        e.exports = {
            setStorage: function (e, t, n) {
                n = null == n ? 86400 : Math.abs(n);
                var o = Date.now() + 1e3 * n;
                try {
                    wx.setStorageSync(e, t), wx.setStorageSync(e + '_expiresIn', o);
                } catch (n) {
                    return (
                        (r.default.tempUserLoginInfo[e] = t), (r.default.tempUserLoginInfo[e + '_expiresIn'] = o), !1
                    );
                }
                return !0;
            },
            getStorage: function (e) {
                var t = Date.now(),
                    n = wx.getStorageSync(e + '_expiresIn');
                if (
                    ('' == n &&
                        (n =
                            null != r.default.tempUserLoginInfo[e + '_expiresIn'] ||
                            0 !== r.default.tempUserLoginInfo[e + '_expiresIn']
                                ? r.default.tempUserLoginInfo[e + '_expiresIn']
                                : 0),
                    n < t)
                )
                    return this.removeStorage(e), null;
                try {
                    var o = wx.getStorageSync(e);
                    return '' == o && (o = r.default.tempUserLoginInfo[e]), o;
                } catch (e) {
                    return null;
                }
            },
            removeStorage: function (t) {
                try {
                    wx.removeStorageSync(t),
                        wx.removeStorageSync(t + '_expiresIn'),
                        (r.default.tempUserLoginInfo[t] = null),
                        (r.default.tempUserLoginInfo[t + '_expiresIn'] = 0);
                } catch (e) {
                    return (
                        (r.default.tempUserLoginInfo[t] = null), (r.default.tempUserLoginInfo[t + '_expiresIn'] = 0), !1
                    );
                }
                return !0;
            },
        };
    },
    function (e, t, n) {
        'use strict';
        Object.defineProperty(t, '__esModule', {
            value: !0,
        });
        var o = function () {
            var r = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 'GET';
            return function (o, i) {
                return new Promise(function (t, n) {
                    var e = {
                        url: o,
                        data: i,
                        method: r,
                        success: function (e) {
                            t(e);
                        },
                        fail: function (e) {
                            n(e);
                        },
                    };
                    'POST' == r &&
                        ((e.header = {
                            'Content-Type': 'GET' == r ? 'application/json;' : 'application/x-www-form-urlencoded;',
                        }),
                        (e.data = 'reportData=' + JSON.stringify(i))),
                        wx.request(e);
                });
            };
        };
        (t.get = o('GET')), (t.post = o('POST'));
    },
    function (t, n, o) {
        'use strict';

        function i(e) {
            return e && e.__esModule
                ? e
                : {
                      default: e,
                  };
        }
        Object.defineProperty(n, '__esModule', {
            value: !0,
        });
        var h =
            'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                ? function (e) {
                      return typeof e;
                  }
                : function (e) {
                      return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                          ? 'symbol'
                          : typeof e;
                  };
        (n.Report = function (t, n, o) {
            var i,
                r,
                a,
                s,
                u,
                f,
                c,
                d,
                l,
                p,
                g,
                y = {};
            if ('SceneFlow' == t) {
                if (
                    ((l = y),
                    (g = o),
                    null == (p = n).isubZoneAreaID || '' == p.isubZoneAreaID
                        ? (l.isubZoneAreaID = -1)
                        : (l.isubZoneAreaID = p.isubZoneAreaID),
                    null == p.vRoleID && '' == p.vRoleID ? (l.vRoleID = -1) : (l.vRoleID = p.vRoleID),
                    !(null == p.cardID && '' == p.cardID
                        ? ('object' == (void 0 === g ? 'undefined' : h(g)) &&
                              'function' == typeof g.fail &&
                              g.fail({
                                  data: {
                                      iRet: '-9999',
                                      sMsg: 'param error, cardID is not empty',
                                  },
                              }),
                          0)
                        : ((l.CardID = p.cardID),
                          null == p.slotID && '' == p.slotID
                              ? ('object' == (void 0 === g ? 'undefined' : h(g)) &&
                                    'function' == typeof g.fail &&
                                    g.fail({
                                        data: {
                                            iRet: '-9999',
                                            sMsg: 'param error, slotID is not empty',
                                        },
                                    }),
                                0)
                              : ((l.SlotID = p.slotID),
                                null == p.orderID && '' == p.orderID
                                    ? ('object' == (void 0 === g ? 'undefined' : h(g)) &&
                                          'function' == typeof g.fail &&
                                          g.fail({
                                              data: {
                                                  iRet: '-9999',
                                                  sMsg: 'param error, orderID is not empty',
                                              },
                                          }),
                                      0)
                                    : ((l.OrderID = p.orderID),
                                      null == p.iActionId && '' == p.iActionId
                                          ? ('object' == (void 0 === g ? 'undefined' : h(g)) &&
                                                'function' == typeof g.fail &&
                                                g.fail({
                                                    data: {
                                                        iRet: '-9999',
                                                        sMsg: 'param error, iActionId is not empty',
                                                    },
                                                }),
                                            0)
                                          : ((l.iActionId = p.iActionId),
                                            'object' == h(p.extend) && (l.extend = p.extend),
                                            1))))))
                )
                    return !1;
            } else if ('ActionFlow' == t)
                (c = y),
                    null == (d = n).isubZoneAreaID || '' == d.isubZoneAreaID
                        ? (c.isubZoneAreaID = -1)
                        : (c.isubZoneAreaID = d.isubZoneAreaID),
                    d.vActionType && (c.vactiontype = d.vActionType),
                    d.vactiontype && (c.vactiontype = d.vactiontype),
                    d.c1 && (c.c1 = d.c1),
                    d.c2 && (c.c2 = d.c2),
                    d.c3 && (c.c3 = d.c3),
                    d.c4 && (c.c4 = d.c4),
                    d.c5 && (c.c5 = d.c5),
                    d.c6 && (c.c6 = d.c6),
                    d.c7 && (c.c7 = d.c7),
                    d.c8 && (c.c8 = d.c8),
                    d.c9 && (c.c9 = d.c9),
                    'object' == h(d.extend) && (c.extend = d.extend);
            else if ('GuideFlow' == t) {
                if (
                    ((s = y),
                    (f = o),
                    null == (u = n).isubZoneAreaID || '' == u.isubZoneAreaID
                        ? (s.isubZoneAreaID = -1)
                        : (s.isubZoneAreaID = u.isubZoneAreaID),
                    null == u.vRoleID && '' == u.vRoleID ? (s.vRoleID = -1) : (s.vRoleID = u.vRoleID),
                    u.combatEffectiveness && (s.CombatEffectiveness = u.combatEffectiveness),
                    u.playerFriendsNum && (s.PlayerFriendsNum = u.playerFriendsNum),
                    u.mapID && (s.MapID = u.mapID),
                    !(null == u.iGuideType && '' == u.iGuideType
                        ? (f.fail({
                              data: {
                                  iRet: '-9999',
                                  sMsg: 'param error, iGuideType is not empty',
                              },
                          }),
                          0)
                        : ((s.iGuideType = u.iGuideType),
                          null == u.iGuideID && '' == u.iGuideID
                              ? ('object' == (void 0 === f ? 'undefined' : h(f)) &&
                                    'function' == typeof f.fail &&
                                    f.fail({
                                        data: {
                                            iRet: '-9999',
                                            sMsg: 'param error, iGuideID is not empty',
                                        },
                                    }),
                                0)
                              : ((s.iGuideID = u.iGuideID),
                                (s.ClientVersion = S.default.gameVersion),
                                u.result && (s.Result = 0 == u.result ? 0 : 1),
                                'object' == h(u.extend) && (s.extend = u.extend),
                                1))))
                )
                    return !1;
            } else {
                if ('SnsFlow' != t) return !1;
                if (
                    ((i = y),
                    (a = o),
                    null == (r = n).isubZoneAreaID || '' == r.isubZoneAreaID
                        ? (i.isubZoneAreaID = -1)
                        : (i.isubZoneAreaID = r.isubZoneAreaID),
                    !(null == r.iCount || '' == r.iCount
                        ? ('object' == (void 0 === a ? 'undefined' : h(a)) &&
                              'function' == typeof a.fail &&
                              a.fail({
                                  data: {
                                      iRet: '-9999',
                                      sMsg: 'param error, iCount illegal',
                                  },
                              }),
                          0)
                        : ((i.icount = r.iCount),
                          null == r.iSNSType || '' == r.iSNSType
                              ? ('object' == (void 0 === a ? 'undefined' : h(a)) &&
                                    'function' == typeof a.fail &&
                                    a.fail({
                                        data: {
                                            iRet: '-9999',
                                            sMsg: 'param error, iSNSType is not empty',
                                        },
                                    }),
                                0)
                              : ((i.vsnstype = r.iSNSType),
                                r.toFriendsOpenid && (i.vtoopenids = r.toFriendsOpenid),
                                r.toNumberOfFriends && (i.irecnum = r.toNumberOfFriends),
                                r.iSNSChildType && (i.vsnssubtype = r.iSNSChildType),
                                'object' == h(r.extend) && (i.extend = r.extend),
                                1))))
                )
                    return !1;
            }
            var m = wx.getStorageSync('HSDK_report_data');
            if (('' == m && (m = []), (y.reportType = t), m.push(y), m.length > S.default.reportCount))
                return (
                    (0, I.reportIdata)(m)
                        .then(function (t) {
                            -9999 == t.iRet
                                ? 'object' == (void 0 === o ? 'undefined' : h(o)) &&
                                  'function' == typeof o.fail &&
                                  o.fail(e)
                                : 'object' == (void 0 === o ? 'undefined' : h(o)) &&
                                  'function' == typeof o.success &&
                                  o.success(t);
                        })
                        .catch(function (e) {
                            'object' == (void 0 === o ? 'undefined' : h(o)) && 'function' == typeof o.fail && o.fail(e);
                        }),
                    wx.removeStorageSync('HSDK_report_data'),
                    !1
                );
            try {
                wx.setStorageSync('HSDK_report_data', m);
            } catch (e) {}
        }),
            (n.onhideReport = function () {
                wx.onHide(function () {
                    var e = wx.getStorageSync('HSDK_report_data');
                    'object' == (void 0 === e ? 'undefined' : h(e)) &&
                        0 < e.length &&
                        ((0, I.reportIdata)(e), wx.removeStorageSync('HSDK_report_data'));
                });
            });
        var S = i(o(1)),
            I = o(5);
        i(o(2));
    },
    function (e, t, n) {
        'use strict';

        function o(e) {
            return e && e.__esModule
                ? e
                : {
                      default: e,
                  };
        }
        Object.defineProperty(t, '__esModule', {
            value: !0,
        }),
            (t.reportIdata = function (e) {
                var t = a.default.getSystemInfoSync(),
                    n = a.default.getLaunchOptionsSync(),
                    o =
                        r.default.api +
                        '?' +
                        a.default.serialize({
                            methodCmd: 1042,
                            apptype: r.default.apptype,
                            h5game_openid: s.default.getStorage('openid'),
                            h5sdk_sessionid: s.default.getStorage('sdkKey'),
                            h5game_os: a.default.getSystem(),
                            appid: r.default.wxappid,
                            h5channel: null == n.query.scene ? n.scene : n.query.scene,
                            h5sdkVersion: r.default.h5sdkVersion,
                            user_agent: {
                                channelversion: t.version,
                                system: t.system,
                                model: t.model,
                                networkType: r.default.networkType,
                            },
                        });
                return new Promise(function (t, n) {
                    r.default.wxappid.length < 3
                        ? n({
                              data: {
                                  iRet: '-9999',
                                  sMsg: 'param error, appid illegal',
                              },
                          })
                        : null == s.default.getStorage('openid') ||
                          null == s.default.getStorage('openid') ||
                          '' == s.default.getStorage('openid')
                        ? n({
                              data: {
                                  iRet: '-9999',
                                  sMsg: 'h5game_openid is not empty',
                              },
                          })
                        : null == s.default.getStorage('sdkKey') ||
                          null == s.default.getStorage('sdkKey') ||
                          '' == s.default.getStorage('sdkKey')
                        ? n({
                              data: {
                                  iRet: '-9999',
                                  sMsg: 'h5sdk_sessionid is not empty',
                              },
                          })
                        : (0, u.post)(o, e)
                              .then(function (e) {
                                  t(e.data);
                              })
                              .catch(function (e) {
                                  n(e);
                              });
                });
            }),
            (t.reportATM = function (e) {
                var t = a.default.getSystemInfoSync(),
                    o =
                        (a.default.getLaunchOptionsSync(),
                        r.default.api +
                            '?' +
                            a.default.serialize({
                                methodCmd: 1046,
                                apptype: r.default.apptype,
                                h5game_openid: s.default.getStorage('openid'),
                                appid: r.default.wxappid,
                                h5sdkVersion: r.default.h5sdkVersion,
                            })),
                    i = {
                        h5game_os: a.default.getSystem(),
                        version: null == r.default.gameVersion ? '' : r.default.gameVersion,
                        h5sdkVersion: r.default.h5sdkVersion,
                        dateTime: new Date().getTime(),
                        sMsg: e,
                        user_agent: {
                            channelversion: t.version,
                            system: t.system,
                            model: t.model,
                            networkType: r.default.networkType,
                        },
                    };
                return new Promise(function (t, n) {
                    r.default.wxappid.length < 3
                        ? n({
                              data: {
                                  iRet: '-9999',
                                  sMsg: 'param error, appid illegal',
                              },
                          })
                        : null == s.default.getStorage('openid') ||
                          null == s.default.getStorage('openid') ||
                          '' == s.default.getStorage('openid')
                        ? n({
                              data: {
                                  iRet: '-9999',
                                  sMsg: 'param error, h5game_openid is not empty',
                              },
                          })
                        : null == s.default.getStorage('sdkKey') ||
                          null == s.default.getStorage('sdkKey') ||
                          '' == s.default.getStorage('sdkKey')
                        ? n({
                              data: {
                                  iRet: '-9999',
                                  sMsg: 'param error, h5sdk_sessionid is not empty',
                              },
                          })
                        : (0, u.post)(o, i)
                              .then(function (e) {
                                  t(e.data);
                              })
                              .catch(function (e) {
                                  n(e);
                              });
                });
            });
        var r = o(n(1)),
            a = o(n(0)),
            s = o(n(2)),
            u = n(3);
    },
    function (e, t, n) {
        'use strict';

        function o(e) {
            return e && e.__esModule
                ? e
                : {
                      default: e,
                  };
        }
        Object.defineProperty(t, '__esModule', {
            value: !0,
        }),
            (t.Init = function (e) {
                (i.default.wxappid = e.wxappid),
                    (i.default.gameVersion = e.gameVersion),
                    r.default.getNetworkType(),
                    (0, a.onhideReport)();
            });
        var i = o(n(1)),
            r = o(n(0)),
            a = n(4);
    },
    function (e, t, n) {
        'use strict';

        function o(e) {
            return e && e.__esModule
                ? e
                : {
                      default: e,
                  };
        }
        var a =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e;
                      }
                    : function (e) {
                          return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e;
                      },
            r = o(n(0)),
            s = o(n(12)),
            u = o(n(2)),
            f = o(n(1)),
            c = n(5);
        e.exports = {
            login: function (n) {
                var o = this;
                void 0 === n || a(n),
                    o
                        .getLogin()
                        .then(function (t) {
                            t.code
                                ? wx.getSetting({
                                      success: function (e) {
                                          e.authSetting['scope.userInfo'] || r.default.getWXsdkVersion() < 201
                                              ? o.getUserinfoLowVersion(n, t)
                                              : o.getLoginState(t, n);
                                      },
                                  })
                                : 'function' == typeof n.fail && n.fail(t);
                        })
                        .catch(function (e) {
                            'function' == typeof n.fail && n.fail(e);
                        });
            },
            getLoginState: function (e, t) {
                this.getLoginKey(e.code, {})
                    .then(function () {
                        var e = {
                            userInfo: {
                                h5game_openid: u.default.getStorage('openid'),
                                h5sdk_sessionid: u.default.getStorage('sdkKey'),
                            },
                        };
                        null != u.default.getStorage('unionid') &&
                            (e.userInfo.unionid = u.default.getStorage('unionid')),
                            (e.needCreateUserInfoBtn = !0),
                            'function' == typeof t.success && t.success(e);
                    })
                    .catch(function (e) {
                        (0, c.reportATM)(e), 'function' == typeof t.fail && t.fail(e);
                    });
            },
            getUserinfoLowVersion: function (n, o) {
                var i = this;
                s.default
                    .getUserInfo(n)
                    .then(function (t) {
                        i.getLoginKey(o.code, t.userInfo)
                            .then(function () {
                                var e = {
                                    encryptedData: t.encryptedData,
                                    errMsg: t.errMsg,
                                    iv: t.iv,
                                    rawData: t.rawData,
                                    signature: t.signature,
                                    userInfo: {
                                        avatarUrl: t.userInfo.avatarUrl,
                                        city: t.userInfo.city,
                                        country: t.userInfo.country,
                                        gender: t.userInfo.gender,
                                        h5game_openid: u.default.getStorage('openid'),
                                        h5sdk_sessionid: u.default.getStorage('sdkKey'),
                                        language: t.userInfo.language,
                                        nickName: t.userInfo.nickName,
                                        province: t.userInfo.province,
                                    },
                                };
                                null != u.default.getStorage('unionid') &&
                                    (e.userInfo.unionid = u.default.getStorage('unionid')),
                                    'function' == typeof n.success && n.success(e);
                            })
                            .catch(function (e) {
                                (0, c.reportATM)(e), 'function' == typeof n.fail && n.fail(e);
                            });
                    })
                    .catch(function (e) {
                        !0 === n.canUserInfoPlay
                            ? (i.reportLoginFail(2, e.errMsg), 'function' == typeof n.fail && n.fail(e))
                            : /auth\sdeny/.test(e.errMsg)
                            ? i
                                  .getLoginKey(o.code, {})
                                  .then(function () {
                                      var e = {
                                          userInfo: {
                                              h5game_openid: u.default.getStorage('openid'),
                                              h5sdk_sessionid: u.default.getStorage('sdkKey'),
                                          },
                                      };
                                      null != u.default.getStorage('unionid') &&
                                          (e.userInfo.unionid = u.default.getStorage('unionid')),
                                          'function' == typeof n.success && n.success(e);
                                  })
                                  .catch(function (e) {
                                      'function' == typeof n.fail && n.fail(e);
                                  })
                            : (i.reportLoginFail(1, e.errMsg), 'function' == typeof n.fail && n.fail(e));
                    });
            },
            getLogin: function () {
                var i = this;
                return new Promise(function (n, o) {
                    (function t() {
                        wx.login({
                            success: function (e) {
                                (f.default.requestCount = 0), n(e);
                            },
                            fail: function (e) {
                                i.reportLoginFail(1, e.errMsg),
                                    /timed\sout/.test(e.errMsg) || /failed\sto\sconnect\sto/.test(e.errMsg)
                                        ? f.default.requestCount >= f.default.maxRequestCount
                                            ? ('object' == (void 0 === e ? 'undefined' : a(e)) &&
                                                  ((e.errfrom = 'wx login'), (e.requestCount = f.default.requestCount)),
                                              o(e))
                                            : (t(), f.default.requestCount++)
                                        : ('object' == (void 0 === e ? 'undefined' : a(e)) && (e.errfrom = 'wx login'),
                                          o(e));
                            },
                        });
                    })();
                });
            },
            getLoginKey: function (t, i) {
                var r = this;
                return new Promise(function (e, o) {
                    (function n() {
                        s.default
                            .getLoginKey(t, i)
                            .then(function () {
                                (f.default.requestCount = 0), e();
                            })
                            .catch(function (e) {
                                var t = null == e.errMsg ? e.sMsg : e.errMsg;
                                r.reportLoginFail(1, t),
                                    /timed\sout/.test(t) || /failed\sto\sconnect\sto/.test(t)
                                        ? f.default.requestCount >= f.default.maxRequestCount
                                            ? ('object' == (void 0 === e ? 'undefined' : a(e)) &&
                                                  ((e.errfrom = 'h5sdk getLoginKey'),
                                                  (e.requestCount = f.default.requestCount)),
                                              o(e))
                                            : (n(), f.default.requestCount++)
                                        : ('object' == (void 0 === e ? 'undefined' : a(e)) &&
                                              (e.errfrom = 'h5sdk getLoginKey'),
                                          o(e));
                            });
                    })();
                });
            },
            reportUserInfo: function (e, t) {
                var n = r.default.getSystemInfoSync(),
                    o = [
                        {
                            reportType: 'userprofile',
                            isubZoneAreaID: -1,
                            gender: e.gender,
                            country: null == e.country ? '' : e.country,
                            province: null == e.province ? '' : e.province,
                            city: null == e.city ? '' : e.city,
                            model: n.model,
                            vflag: t,
                        },
                    ];
                (0, c.reportIdata)(o)
                    .then(function (e) {})
                    .catch(function (e) {
                        console.log('report fail', e);
                    });
            },
            reportLoginFail: function (e, t) {
                var n = r.default.getLaunchOptionsSync(),
                    o = {
                        icmd: e,
                        iresult: t,
                    };
                null == n.query.openid ||
                    '' == n.query.openid ||
                    (1007 != n.query.scene && 1008 != n.query.scene) ||
                    ((o.shareOpenid = n.query.openid), (o.shareStatus = 13 == n.query.shareStatus ? 13 : -1));
                var i = [o];
                (0, c.reportIdata)(i)
                    .then(function (e) {})
                    .catch(function (e) {
                        console.log('report fail', e);
                    });
            },
            createUserInfoButton: function (e) {
                if (200 < r.default.getWXsdkVersion()) {
                    e.lang = null == e.lang ? 'zh_CN' : e.lang;
                    var t = wx.createUserInfoButton(e),
                        n = this;
                    return (
                        t.onTap(function (e) {
                            /auth\sdeny/.test(e.errMsg) ? n.reportUserInfo({}, 0) : n.reportUserInfo(e.userInfo, 1);
                        }),
                        t
                    );
                }
            },
            getLoginUserInfo: function (t) {
                var i = this;
                return new Promise(function (e, o) {
                    (function n() {
                        s.default
                            .getLoginUserInfo(t)
                            .then(function () {
                                (f.default.requestCount = 0), e();
                            })
                            .catch(function (e) {
                                var t = null == e.errMsg ? e.sMsg : e.errMsg;
                                i.reportLoginFail(1, t),
                                    /timed\sout/.test(t) || /failed\sto\sconnect\sto/.test(t)
                                        ? f.default.requestCount >= f.default.maxRequestCount
                                            ? ('object' == (void 0 === e ? 'undefined' : a(e)) &&
                                                  ((e.errfrom = 'h5sdk getLoginUserInfo'),
                                                  (e.requestCount = f.default.requestCount)),
                                              o(e))
                                            : (n(), f.default.requestCount++)
                                        : ('object' == (void 0 === e ? 'undefined' : a(e)) &&
                                              (e.errfrom = 'h5sdk getLoginUserInfo'),
                                          o(e));
                            });
                    })();
                });
            },
            checkLogin: function (t) {
                var n = this;
                wx.checkSession({
                    success: function (e) {
                        null == u.default.getStorage('openid') ||
                        null == u.default.getStorage('sdkKey') ||
                        u.default.getStorage('openid').length < 8 ||
                        u.default.getStorage('sdkKey').length < 8
                            ? n.login(t)
                            : wx.getSetting({
                                  success: function (e) {
                                      e.authSetting['scope.userInfo'] || r.default.getWXsdkVersion() < 201
                                          ? n.getUserinfoLowVersionByStorage(t)
                                          : n.checkUserLoginStatus(t);
                                  },
                              });
                    },
                    fail: function (e) {
                        n.login(t);
                    },
                });
            },
            checkUserLoginStatus: function (t) {
                var n = this;
                n.getLoginUserInfo({})
                    .then(function () {
                        var e = {
                            userInfo: {
                                h5game_openid: u.default.getStorage('openid'),
                                h5sdk_sessionid: u.default.getStorage('sdkKey'),
                            },
                        };
                        null != u.default.getStorage('unionid') &&
                            (e.userInfo.unionid = u.default.getStorage('unionid')),
                            (e.needCreateUserInfoBtn = !0),
                            'function' == typeof t.success && t.success(e);
                    })
                    .catch(function (e) {
                        'object' == (void 0 === e ? 'undefined' : a(e)) &&
                        'object' == a(e.data) &&
                        '-9201' == e.data.iRet
                            ? n.login(t)
                            : 'function' == typeof t.fail && t.fail(e);
                    });
            },
            getUserinfoLowVersionByStorage: function (n) {
                var o = this;
                s.default
                    .getUserInfo(n)
                    .then(function (t) {
                        o.getLoginUserInfo(t.userInfo)
                            .then(function () {
                                var e = {
                                    encryptedData: t.encryptedData,
                                    errMsg: t.errMsg,
                                    iv: t.iv,
                                    rawData: t.rawData,
                                    signature: t.signature,
                                    userInfo: {
                                        avatarUrl: t.userInfo.avatarUrl,
                                        city: t.userInfo.city,
                                        country: t.userInfo.country,
                                        gender: t.userInfo.gender,
                                        h5game_openid: u.default.getStorage('openid'),
                                        h5sdk_sessionid: u.default.getStorage('sdkKey'),
                                        language: t.userInfo.language,
                                        nickName: t.userInfo.nickName,
                                        province: t.userInfo.province,
                                    },
                                };
                                null != u.default.getStorage('unionid') &&
                                    (e.userInfo.unionid = u.default.getStorage('unionid')),
                                    'function' == typeof n.success && n.success(e);
                            })
                            .catch(function (e) {
                                'object' == (void 0 === e ? 'undefined' : a(e)) &&
                                'object' == a(e.data) &&
                                '-9201' == e.data.iRet
                                    ? o.login(n)
                                    : 'function' == typeof n.fail && n.fail(e);
                            });
                    })
                    .catch(function (e) {
                        !0 === n.canUserInfoPlay
                            ? (o.reportLoginFail(2, e.errMsg), 'function' == typeof n.fail && n.fail(e))
                            : /auth\sdeny/.test(e.errMsg)
                            ? o
                                  .getLoginUserInfo({})
                                  .then(function () {
                                      var e = {
                                          userInfo: {
                                              h5game_openid: u.default.getStorage('openid'),
                                              h5sdk_sessionid: u.default.getStorage('sdkKey'),
                                          },
                                      };
                                      null != u.default.getStorage('unionid') &&
                                          (e.userInfo.unionid = u.default.getStorage('unionid')),
                                          'function' == typeof n.success && n.success(e);
                                  })
                                  .catch(function (e) {
                                      'object' == (void 0 === e ? 'undefined' : a(e)) &&
                                      'object' == a(e.data) &&
                                      '-9201' == e.data.iRet
                                          ? o.login(n)
                                          : 'function' == typeof n.fail && n.fail(e);
                                  })
                            : (o.reportLoginFail(1, e.errMsg), 'function' == typeof n.fail && n.fail(e));
                    });
            },
        };
    },
    function (e, t, n) {
        'use strict';

        function o(e) {
            return e && e.__esModule
                ? e
                : {
                      default: e,
                  };
        }
        var i =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e;
                      }
                    : function (e) {
                          return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e;
                      },
            r = o(n(10)),
            a = o(n(0)),
            s = o(n(2));
        e.exports = {
            setUserSnsData: function (n) {
                if ('option' != typeof n && null != i(n.rankVal)) {
                    var e = a.default.getSystemInfoSync();
                    return (
                        a.default.getLaunchOptionsSync(),
                        r.default.apptype,
                        s.default.getStorage('openid'),
                        s.default.getStorage('sdkKey'),
                        a.default.getSystem(),
                        r.default.wxappid,
                        r.default.h5channel,
                        n.rankVal,
                        e.version,
                        e.system,
                        e.model,
                        r.default.networkType,
                        new Promise(function (e, t) {
                            get(r.default.api, sendData)
                                .then(function (e) {
                                    'function' == typeof n.success && n.success(e);
                                })
                                .catch(function (e) {
                                    'function' == typeof n.fail && n.fail(res);
                                });
                        })
                    );
                }
            },
            exitMiniProgram: function (t) {
                wx.exitMiniProgram({
                    success: function (e) {
                        'function' == typeof t.success && t.success(e);
                    },
                    fail: function (e) {
                        'function' == typeof t.fail && t.fail(e);
                    },
                    complete: function (e) {
                        'function' == typeof t.complete && t.complete(e);
                    },
                });
            },
            getSessionInfo: function () {
                return {
                    h5game_openid: s.default.getStorage('openid'),
                    h5sdk_sessionid: s.default.getStorage('sdkKey'),
                };
            },
            openTencentGameContract: function () {
                'function' == typeof wx.openTencentGameContract && wx.openTencentGameContract();
            },
            openTencentPrivacyContract: function () {
                'function' == typeof wx.openTencentPrivacyContract && wx.openTencentPrivacyContract();
            },
        };
    },
    function (e, t, n) {
        'use strict';

        function o(e) {
            return e && e.__esModule
                ? e
                : {
                      default: e,
                  };
        }
        var i =
                'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
                    ? function (e) {
                          return typeof e;
                      }
                    : function (e) {
                          return e && 'function' == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype
                              ? 'symbol'
                              : typeof e;
                      },
            r = n(13),
            a = o(n(2)),
            s = o(n(0));
        e.exports = {
            share: function (o) {
                wx.showShareMenu({
                    withShareTicket: !0,
                }),
                    wx.onShareAppMessage(function (e) {
                        var t = {},
                            n = o;
                        if (('function' == typeof o && (n = o()), 'object' == i(n.shareInfo)))
                            return (
                                (t.title = n.shareInfo.title),
                                null != n.shareInfo.imageUrl &&
                                    '' != n.shareInfo.imageUrl &&
                                    (t.imageUrl = n.shareInfo.imageUrl),
                                null != n.shareInfo.query && '' != n.shareInfo.query
                                    ? (t.query = n.shareInfo.query + '&openid=' + a.default.getStorage('openid'))
                                    : (t.query = 'openid=' + a.default.getStorage('openid')),
                                null != n.shareInfo.canvas &&
                                    '' != n.shareInfo.canvas &&
                                    (t.canvas = n.shareInfo.canvas),
                                207 < s.default.getWXsdkVersion()
                                    ? (0, r.shareReport)({
                                          shareResult: 0,
                                          iActionId: 1,
                                      })
                                    : ((t.success = function (e) {
                                          (0, r.shareReport)({
                                              shareResult: 0,
                                              iActionId: 1,
                                          }),
                                              'function' == typeof n.success && n.success(e);
                                      }),
                                      (t.fail = function (e) {
                                          (0, r.shareReport)({
                                              shareResult: 1,
                                              iActionId: 1,
                                          }),
                                              'function' == typeof n.fail && n.fail(e);
                                      })),
                                t
                            );
                    });
            },
            shareMessage: function (t) {
                var e = {};
                (e.title = t.shareInfo.title),
                    null != t.shareInfo.imageUrl && '' != t.shareInfo.imageUrl && (e.imageUrl = t.shareInfo.imageUrl),
                    null != t.shareInfo.query && '' != t.shareInfo.query
                        ? (e.query = t.shareInfo.query + '&openid=' + a.default.getStorage('openid'))
                        : (e.query = 'openid=' + a.default.getStorage('openid')),
                    null != t.shareInfo.canvas && '' != t.shareInfo.canvas && (e.canvas = t.shareInfo.canvas),
                    207 < s.default.getWXsdkVersion()
                        ? (0, r.shareReport)({
                              shareResult: 0,
                              iActionId: 2,
                              gameScene: t.shareInfo.gameScene,
                          })
                        : ((e.success = function (e) {
                              (0, r.shareReport)({
                                  shareResult: 0,
                                  iActionId: 2,
                                  gameScene: t.shareInfo.gameScene,
                              }),
                                  'function' == typeof t.success && t.success(e);
                          }),
                          (e.fail = function (e) {
                              (0, r.shareReport)({
                                  shareResult: 1,
                                  iActionId: 2,
                                  gameScene: t.shareInfo.gameScene,
                              }),
                                  'function' == typeof t.fail && t.fail(e);
                          }),
                          (e.complete = function (e) {
                              'function' == typeof t.complete && t.complete(e);
                          })),
                    wx.shareAppMessage(e);
            },
        };
    },
    function (e, t, n) {
        'use strict';
        var o = {
            wegameUrl: location.protocol + '//wximg.gtimg.com/wxgame/wegame-v2.js',
            qqapi: location.protocol + '//open.mobile.qq.com/sdk/qqapi.js?_bid=152',
            wxappid: '',
            qqappid: '',
            shareInfo: {
                image_url: '',
                title: '',
                desc: '',
            },
            h5sdkApi: {
                default: 'h5sdk.game.qq.com',
                snake: 'snake.h5sdk.game.qq.com',
                h5game: 'peng.h5sdk.game.qq.com',
            },
            enbaleRightDragToGoBackParams: !1,
            isNeedPayToken: !0,
            isNeeduserInfo: !0,
            isDebug: !1,
            startTime: 0,
            log: '',
            countwxloginapi: 0,
            beaconHttpUrl:
                'https:' == location.protocol
                    ? 'https://3gimg.qq.com/mig_op/beacon/js/beacon_release_s.js?'
                    : 'http://3gimg.qq.com/mig_op/beacon/js/beacon_release.js?',
            version: 'v1.0.0',
        };
        e.exports = o;
    },
    function (e, t, n) {
        'use strict';

        function o(e) {
            return e && e.__esModule
                ? e
                : {
                      default: e,
                  };
        }
        var i = o(n(0)),
            r = n(6),
            a = o(n(7)),
            s = o(n(9)),
            u = o(n(8)),
            f = n(4);
        (window.H5SDK = {}),
            (window.H5SDK.init = function (e) {
                (0, r.Init)(e);
            }),
            (window.H5SDK.checkLogin = function (e) {
                a.default.checkLogin(e);
            }),
            (window.H5SDK.createUserInfoButton = function (e, t) {
                return a.default.createUserInfoButton(e, t);
            }),
            (window.H5SDK.getWXSDKVersion = function () {
                return i.default.getWXsdkVersion();
            }),
            (window.H5SDK.share = function (e) {
                s.default.share(e);
            }),
            (window.H5SDK.shareMessage = function (e) {
                s.default.shareMessage(e);
            }),
            (window.H5SDK.getSessionInfo = function (e) {
                return u.default.getSessionInfo();
            }),
            (window.H5SDK.setUserSnsData = function (e) {
                u.default.setUserSnsData();
            }),
            (window.H5SDK.report = function (e, t, n) {
                (0, f.Report)(e, t, n);
            }),
            (window.H5SDK.exitMiniProgram = function (e) {
                u.default.exitMiniProgram(e);
            }),
            (window.H5SDK.openTencentGameContract = function (e) {
                u.default.openTencentGameContract(e);
            }),
            (window.H5SDK.openTencentPrivacyContract = function (e) {
                u.default.openTencentPrivacyContract(e);
            });
    },
    function (e, t, n) {
        'use strict';

        function o(e) {
            return e && e.__esModule
                ? e
                : {
                      default: e,
                  };
        }
        var r = o(n(1)),
            a = o(n(0)),
            s = o(n(2)),
            u = n(3);
        e.exports = {
            getLoginKey: function (e, t) {
                var n = a.default.getSystemInfoSync(),
                    o = a.default.getLaunchOptionsSync(),
                    i = {
                        h5game_code: e,
                        methodCmd: 1034,
                        apptype: r.default.apptype,
                        h5game_os: a.default.getSystem(),
                        appid: r.default.wxappid,
                        h5channel: null == o.query.scene ? o.scene : o.query.scene,
                        gender: null == t.gender ? -1 : t.gender,
                        country: null == t.country ? -1 : t.country,
                        province: null == t.province ? -1 : t.province,
                        city: null == t.city ? -1 : t.city,
                        regChannel: r.default.h5channel,
                        version: null == r.default.gameVersion ? '' : r.default.gameVersion,
                        h5sdkVersion: r.default.h5sdkVersion,
                        user_agent: {
                            channelversion: n.version,
                            system: n.system,
                            model: n.model,
                            networkType: r.default.networkType,
                        },
                    };
                return (
                    null == o.query.openid ||
                        '' == o.query.openid ||
                        (1007 != o.query.scene && 1008 != o.query.scene) ||
                        ((i.shareOpenid = o.query.openid), (i.shareStatus = 13 == o.query.shareStatus ? 13 : -1)),
                    new Promise(function (n, o) {
                        i.appid.length < 3
                            ? o({
                                  data: {
                                      iRet: '-9999',
                                      sMsg: 'param error, appid illegal',
                                  },
                              })
                            : (0, u.get)(r.default.api, i)
                                  .then(function (e) {
                                      if ('-9201' == e.data.iRet || '40029' == e.data.iRet || '-9999' == e.data.iRet)
                                          o(e);
                                      else {
                                          var t = e.data;
                                          s.default.setStorage('sdkKey', t.list.h5sdk_sessionid, 86400),
                                              s.default.setStorage('openid', t.list.openid, 86400),
                                              t.list.unionid && s.default.setStorage('unionid', t.list.unionid, 86400),
                                              n(t);
                                      }
                                  })
                                  .catch(function (e) {
                                      o(e);
                                  });
                    })
                );
            },
            getUserInfo: function (e) {
                return new Promise(function (t, n) {
                    wx.getUserInfo({
                        lang: null == e.lang ? 'zh_CN' : e.lang,
                        success: function (e) {
                            t(e);
                        },
                        fail: function (e) {
                            n(e);
                        },
                    });
                });
            },
            getLoginUserInfo: function (e) {
                var t = a.default.getSystemInfoSync(),
                    n = a.default.getLaunchOptionsSync(),
                    o = {
                        methodCmd: 1039,
                        apptype: r.default.apptype,
                        h5game_openid: s.default.getStorage('openid'),
                        h5sdk_sessionid: s.default.getStorage('sdkKey'),
                        no_strong_check: 0,
                        h5game_os: a.default.getSystem(),
                        appid: r.default.wxappid,
                        h5channel: null == n.query.scene ? n.scene : n.query.scene,
                        gender: null == e.gender ? -1 : e.gender,
                        country: null == e.country ? -1 : e.country,
                        province: null == e.province ? -1 : e.province,
                        city: null == e.city ? -1 : e.city,
                        regChannel: r.default.h5channel,
                        version: null == r.default.gameVersion ? '' : r.default.gameVersion,
                        h5sdkVersion: r.default.h5sdkVersion,
                        user_agent: {
                            channelversion: t.version,
                            system: t.system,
                            model: t.model,
                            networkType: r.default.networkType,
                        },
                    };
                return (
                    null == n.query.openid ||
                        '' == n.query.openid ||
                        (1007 != n.query.scene && 1008 != n.query.scene) ||
                        ((o.shareOpenid = n.query.openid), (o.shareStatus = 13 == n.query.shareStatus ? 13 : -1)),
                    new Promise(function (t, n) {
                        o.appid.length < 3
                            ? n({
                                  data: {
                                      iRet: '-9999',
                                      sMsg: 'param error, appid illegal',
                                  },
                              })
                            : null == o.h5game_openid || null == o.h5game_openid || '' == o.h5game_openid
                            ? n({
                                  data: {
                                      iRet: '-9999',
                                      sMsg: 'h5game_openid is not empty',
                                  },
                              })
                            : null == o.h5sdk_sessionid || null == o.h5sdk_sessionid || '' == o.h5sdk_sessionid
                            ? n({
                                  data: {
                                      iRet: '-9999',
                                      sMsg: 'h5sdk_sessionid is not empty',
                                  },
                              })
                            : (0, u.get)(r.default.api, o)
                                  .then(function (e) {
                                      '-9201' == e.data.iRet || '40029' == e.data.iRet || '-9999' == e.data.iRet
                                          ? n(e)
                                          : t(e);
                                  })
                                  .catch(function (e) {
                                      n(e);
                                  });
                    })
                );
            },
        };
    },
    function (e, t, n) {
        'use strict';

        function o(e) {
            return e && e.__esModule
                ? e
                : {
                      default: e,
                  };
        }
        Object.defineProperty(t, '__esModule', {
            value: !0,
        }),
            (t.shareReport = function (e) {
                var t = r.default.getSystemInfoSync(),
                    n = r.default.getLaunchOptionsSync(),
                    o = {
                        methodCmd: 1014,
                        apptype: i.default.apptype,
                        logtype: 'share',
                        h5game_openid: a.default.getStorage('openid'),
                        h5sdk_sessionid: a.default.getStorage('sdkKey'),
                        result: e.shareResult,
                        h5game_os: r.default.getSystem(),
                        appid: i.default.wxappid,
                        h5channel: null == n.query.scene ? n.scene : n.query.scene,
                        version: null == i.default.gameVersion ? '' : i.default.gameVersion,
                        shareMode: e.iActionId,
                        shareOpenid: a.default.getStorage('openid'),
                        shareStatus: 13,
                        user_agent: {
                            channelversion: t.version,
                            system: t.system,
                            model: t.model,
                            networkType: i.default.networkType,
                        },
                    };
                return (
                    2 == e.shareMode && (o.scene = null == e.gameScene ? -1 : e.gameScene),
                    new Promise(function (t, n) {
                        o.appid.length < 3
                            ? n({
                                  data: {
                                      iRet: '-9999',
                                      sMsg: 'param error, appid illegal',
                                  },
                              })
                            : null == o.h5game_openid || null == o.h5game_openid || '' == o.h5game_openid
                            ? n({
                                  data: {
                                      iRet: '-9999',
                                      sMsg: 'h5game_openid is not empty',
                                  },
                              })
                            : null == o.h5sdk_sessionid || null == o.h5sdk_sessionid || '' == o.h5sdk_sessionid
                            ? n({
                                  data: {
                                      iRet: '-9999',
                                      sMsg: 'h5sdk_sessionid is not empty',
                                  },
                              })
                            : (0, s.get)(i.default.api, o)
                                  .then(function (e) {
                                      t(e.data);
                                  })
                                  .catch(function (e) {
                                      n(e);
                                  });
                    })
                );
            });
        var i = o(n(1)),
            r = o(n(0)),
            a = o(n(2)),
            s = n(3);
    },
]);
