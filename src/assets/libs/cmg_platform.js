var cmg,
  __extends =
    (this && this.__extends) ||
    (function () {
      var a = function (e, t) {
        return (a =
          Object.setPrototypeOf ||
          ({
            __proto__: [],
          } instanceof Array &&
            function (e, t) {
              e.__proto__ = t;
            }) ||
          function (e, t) {
            for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
          })(e, t);
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
    })(),
  __awaiter =
    (this && this.__awaiter) ||
    function (n, i, l, s) {
      return new (l || (l = Promise))(function (e, t) {
        function r(e) {
          try {
            o(s.next(e));
          } catch (e) {
            t(e);
          }
        }

        function a(e) {
          try {
            o(s.throw(e));
          } catch (e) {
            t(e);
          }
        }

        function o(t) {
          t.done
            ? e(t.value)
            : new l(function (e) {
                e(t.value);
              }).then(r, a);
        }
        o((s = s.apply(n, i || [])).next());
      });
    },
  __generator =
    (this && this.__generator) ||
    function (r, a) {
      var o,
        n,
        i,
        e,
        l = {
          label: 0,
          sent: function () {
            if (1 & i[0]) throw i[1];
            return i[1];
          },
          trys: [],
          ops: [],
        };
      return (
        (e = {
          next: t(0),
          throw: t(1),
          return: t(2),
        }),
        'function' == typeof Symbol &&
          (e[Symbol.iterator] = function () {
            return this;
          }),
        e
      );

      function t(t) {
        return function (e) {
          return (function (t) {
            if (o) throw new TypeError('Generator is already executing.');
            for (; l; )
              try {
                if (
                  ((o = 1),
                  n &&
                    (i =
                      2 & t[0]
                        ? n.return
                        : t[0]
                        ? n.throw || ((i = n.return) && i.call(n), 0)
                        : n.next) &&
                    !(i = i.call(n, t[1])).done)
                )
                  return i;
                switch (((n = 0), i && (t = [2 & t[0], i.value]), t[0])) {
                  case 0:
                  case 1:
                    i = t;
                    break;
                  case 4:
                    return (
                      l.label++,
                      {
                        value: t[1],
                        done: !1,
                      }
                    );
                  case 5:
                    l.label++, (n = t[1]), (t = [0]);
                    continue;
                  case 7:
                    (t = l.ops.pop()), l.trys.pop();
                    continue;
                  default:
                    if (
                      !(i = 0 < (i = l.trys).length && i[i.length - 1]) &&
                      (6 === t[0] || 2 === t[0])
                    ) {
                      l = 0;
                      continue;
                    }
                    if (3 === t[0] && (!i || (t[1] > i[0] && t[1] < i[3]))) {
                      l.label = t[1];
                      break;
                    }
                    if (6 === t[0] && l.label < i[1]) {
                      (l.label = i[1]), (i = t);
                      break;
                    }
                    if (i && l.label < i[2]) {
                      (l.label = i[2]), l.ops.push(t);
                      break;
                    }
                    i[2] && l.ops.pop(), l.trys.pop();
                    continue;
                }
                t = a.call(r, l);
              } catch (e) {
                (t = [6, e]), (n = 0);
              } finally {
                o = i = 0;
              }
            if (5 & t[0]) throw t[1];
            return {
              value: t[0] ? t[1] : void 0,
              done: !0,
            };
          })([t, e]);
        };
      }
    };
(function (e) {
  var t = function () {};
  (cmg || (cmg = {})).Adapter = t;
})(),
  (function (i) {
    var e = (function () {
      function e() {
        (this.isLoadingUserInfo = !1), (this.mUserCallback = []);
      }
      return (
        (e.prototype.init = function (e, t, r) {}),
        (e.prototype.exitGame = function (e) {
          e && e(!0);
        }),
        (e.prototype.networkRequest = function (n) {
          null == n.checkAuthorization && (n.checkAuthorization = !0),
            i.WXHelper.networkRequest({
              url: n.url,
              data: n.data,
              header: n.header,
              method: n.method,
              dataType: n.checkAuthorization ? 'string' : n.dataType,
              callback: function (t, r, e, a) {
                if (t && n.checkAuthorization) {
                  if (!a || (!a.Authorization && !a.authorization))
                    return (
                      i.Platform.error(
                        'AdapterWX networkRequest, fail: Authorization is empty.',
                      ),
                      void n.callback(!1, r)
                    );
                  var o = '';
                  if (
                    (i.CloudUtil.sPlayerInfo && i.CloudUtil.sPlayerInfo.token
                      ? (o = i.CloudUtil.sPlayerInfo.token)
                      : r &&
                        r.result &&
                        r.result.token &&
                        n.url === i.CloudUtil.REGISTER_WX &&
                        (o = r.result.token),
                    o)
                  ) {
                    if (
                      'CMCM ' + i.hex_hmac_sha1(o, r) !==
                      (a.Authorization ? a.Authorization : a.authorization)
                    )
                      return (
                        i.Platform.error(
                          'AdapterWX networkRequest, fail: Invalid authorization.',
                        ),
                        void n.callback(!1, r)
                      );
                  } else
                    i.Platform.warn(
                      'AdapterWX networkRequest, Local token is empty, this time skip verification.',
                    );
                  i.Platform.log(
                    'AdapterWX networkRequest, The authorization is right.',
                  );
                }
                if (n.checkAuthorization && 'json' == n.dataType && r)
                  try {
                    n.callback(t, JSON.parse(r));
                  } catch (e) {
                    n.callback(t, r);
                  }
                else n.callback(t, r);
              },
            });
        }),
        (e.prototype.reportScore = function (e, t, r, a, o) {
          void 0 === o && (o = !1);
          var n = {
            rankName: e,
            scoreValue: t,
            scoreData: r,
            isWeekRank: o,
            currentServerTime: i.CloudUtil.getCurrentServerTime(),
          };
          i.WXHelper.postMessageToOpenData(i.WXHelper.MSG_REPORT_SCORE, n);
        }),
        (e.prototype.queryFriendsScore = function (e, t, r) {
          void 0 === r && (r = !1);
        }),
        (e.prototype.saveWorldRank = function (e, t, r, a, o) {
          void 0 === o && (o = !1),
            (e = i.platform.getRankName(e, o)),
            i.CloudStorageWXUtil.saveWorldRank(e, t, r, a);
        }),
        (e.prototype.queryWorldRank = function (e, t, r) {
          void 0 === r && (r = !1),
            (e = i.platform.getRankName(e, r)),
            i.CloudStorageWXUtil.queryWorldRank(e, t);
        }),
        (e.prototype.queryTopWorldRank = function (e, t, r) {
          void 0 === r && (r = !1),
            (e = i.platform.getRankName(e, r)),
            i.CloudStorageWXUtil.queryTopWorldRank(e, t);
        }),
        (e.prototype.queryShare = function (e) {
          i.CloudUtil.queryShare(i.CloudUtil.SHARE_QUERY_WX, e);
        }),
        (e.prototype.reportShare = function (e, t, r, a) {
          void 0 === r && (r = 5),
            void 0 === a && (a = 5),
            i.CloudUtil.reportShare(
              i.CloudUtil.SHARE_REPORT_WX,
              e,
              t,
              !0,
              r,
              a,
            );
        }),
        (e.prototype.reportShareCompetition = function (e, t, r, a, o) {
          void 0 === r && (r = 3),
            void 0 === a && (a = 99),
            void 0 === o && (o = '2200'),
            i.CloudUtil.reportShare(
              i.CloudUtil.SHARE_REPORT_COMPETITION_WX,
              e,
              t,
              !0,
              r,
              a,
              o,
            );
        }),
        (e.prototype.queryShareCompetition = function (e, t) {
          i.CloudUtil.queryShare(
            i.CloudUtil.SHARE_QUERY_COMPETITION_WX,
            e,
            !0,
            t,
          );
        }),
        (e.prototype.reportShareSkin = function (e, t, r, a) {
          void 0 === r && (r = 5),
            void 0 === a && (a = 99),
            i.CloudUtil.reportShare(
              i.CloudUtil.SHARE_SKIN_REPORT_WX,
              e,
              t,
              !0,
              r,
              a,
            );
        }),
        (e.prototype.queryShareSkin = function (e) {
          i.CloudUtil.queryShare(i.CloudUtil.SHARE_SKIN_QUERY_WX, e);
        }),
        (e.prototype.reportShareHdReport = function (e, t, r, a, o) {
          i.CloudUtil.reportShareHdReport(
            i.CloudUtil.SHARE_HD_REPORT_WX,
            e,
            t,
            o,
            !0,
            r,
            a,
          );
        }),
        (e.prototype.shareHdQuery = function (e, t) {
          i.CloudUtil.shareHdQuery(i.CloudUtil.SHARE_HD_QUERY_WX, e, t);
        }),
        (e.prototype.shareQueryBatch = function (e, t) {
          i.CloudUtil.shareHdQueryBatch(
            i.CloudUtil.SHARE_HD_QUERY_WX_BATCH,
            e,
            t,
          );
        }),
        (e.prototype.addItems = function (e, t) {
          i.CloudUtil.addItems(i.CloudUtil.ASSET_ITEM_ADD, e, t);
        }),
        (e.prototype.queryItems = function (e) {
          i.CloudUtil.queryItems(i.CloudUtil.ASSET_ITEM_QUERY, e);
        }),
        (e.prototype.applyGive = function (e, t) {
          i.CloudUtil.applyGive(i.CloudUtil.REPACKAGE_APPLY_WX, e, t);
        }),
        (e.prototype.queryGive = function (e, t) {
          i.CloudUtil.queryGive(i.CloudUtil.REPACKAGE_QUERY_WX, e, t);
        }),
        (e.prototype.acceptGive = function (e, t) {
          i.CloudUtil.acceptGive(i.CloudUtil.REPACKAGE_ACCEPT_WX, e, t);
        }),
        (e.prototype.cancelGive = function (e, t) {
          i.CloudUtil.cancelGive(i.CloudUtil.REPACKAGE_CANCEL_WX, e, t);
        }),
        (e.prototype.applyDemand = function (e, t) {
          i.CloudUtil.applyDemand(i.CloudUtil.BILL_APPLY_WX, e, t);
        }),
        (e.prototype.queryDemand = function (e, t) {
          i.CloudUtil.queryDemand(i.CloudUtil.BILL_QUERY_WX, e, t);
        }),
        (e.prototype.satisfyDemand = function (e, t) {
          i.CloudUtil.satisfyDemand(i.CloudUtil.BILL_SATISFY_WX, e, t);
        }),
        (e.prototype.cancelDemand = function (e, t) {
          i.CloudUtil.cancelDemand(i.CloudUtil.BILL_CANCEL_WX, e, t);
        }),
        (e.prototype.queryMusicPeopleNums = function (e, t) {
          i.CloudUtil.queryMusicPeopleNums(
            i.CloudUtil.QUERY_MUSIC_PEOPLE_NUM_WX,
            e,
            t,
          );
        }),
        (e.prototype.pushCommonMessage = function (e, t, r, a) {
          i.CloudUtil.pushCommonMessage(
            e,
            {
              cancel: !1,
            },
            t,
            r,
            a,
          );
        }),
        (e.prototype.saveChallengeRank = function (e, t, r, a, o) {
          i.CloudUtil.saveChallengeRank(
            i.CloudUtil.RANK_SAVE_WX,
            e,
            t,
            r,
            a,
            o,
          );
        }),
        (e.prototype.queryChallengeSelf = function (e, t) {
          i.CloudUtil.queryChallengeSelf(i.CloudUtil.RANK_QUERY_WX, e, t);
        }),
        (e.prototype.queryChallengeTop = function (e, t, r) {
          i.CloudUtil.queryChallengeTop(i.CloudUtil.RANK_QUERY_TOP_WX, e, t, r);
        }),
        (e.prototype.queryChallengeTopSelf = function (e, t, r) {
          i.CloudUtil.queryChallengeTopSelf(
            i.CloudUtil.RANK_QUERY_TOP_SELF_WX,
            e,
            t,
            r,
          );
        }),
        (e.prototype.queryChallengeScore = function (e, t, r, a) {
          i.CloudUtil.queryChallengeScore(
            i.CloudUtil.RANK_QUERY_SCORE_WX,
            e,
            t,
            r,
            a,
          );
        }),
        (e.prototype.queryChallengeInfo = function (e, t) {
          i.CloudUtil.queryChallengeInfo(i.CloudUtil.RANK_QUERY_INFO_WX, e, t);
        }),
        (e.prototype.checkInBlackList = function (e) {
          i.CloudUtil.checkInBlackList(
            i.CloudUtil.CHALLENGE_COMPETITION_BLACK_LIST,
            e,
            !0,
          );
        }),
        (e.prototype.queryChallengeSelfRecord = function (e, t, r, a, o) {
          i.CloudUtil.queryChallengeSelfRecord(
            i.CloudUtil.RANK_QUERY_SELF_RECORD,
            e,
            t,
            r,
            a,
            o,
          );
        }),
        (e.prototype.queryChallengeOtherRecord = function (e, t, r, a, o, n) {
          i.CloudUtil.queryChallengeOtherRecord(
            i.CloudUtil.RANK_QUERY_OTHER_RECORD,
            e,
            t,
            r,
            a,
            o,
            n,
          );
        }),
        (e.prototype.queryCooperationScore = function (e, t) {
          i.CloudUtil.queryCooperationScore(
            i.CloudUtil.COOPERATION_QUERY_SCORE,
            e,
            t,
          );
        }),
        (e.prototype.queryInvitationCode = function (e, t) {
          i.CloudUtil.queryInvitationCode(i.CloudUtil.INVITATION_CODE, e, t);
        }),
        (e.prototype.getServerUserInfo = function (e) {
          i.CloudUtil.getServerUserInfo(i.CloudUtil.USER_INFO_GET_WX, e);
        }),
        (e.prototype.uploadFile = function (e, t) {
          t(-1, '');
        }),
        (e.prototype.queryUserInfoLevel = function (e, t) {
          i.CloudUtil.queryUserInfoLevel(
            i.CloudUtil.QUERY_USER_INFO_LEVEL,
            e,
            t,
          );
        }),
        (e.prototype.uploadPlayerFriends = function (e, t) {}),
        e
      );
    })();
    i.AdapterWX = e;
  })(cmg || (cmg = {})),
  (function (a) {
    var e = (function (t) {
      function e() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.APPID = ''), (e.DebugMode = !1), e;
      }
      return (
        __extends(e, t),
        (e.prototype.init = function (e, t, r) {
          (this.APPID = e),
            (this.DebugMode = r),
            this.DebugMode || a.CloudUtil.useFBServer();
        }),
        (e.prototype.networkRequest = function (t) {
          a.Platform.log(
            'NetworkUtils requestFB(platform), parameter:' + t.url,
          );
          var r = new XMLHttpRequest();
          for (var e in (r.open(t.method, t.url), t.header))
            r.setRequestHeader(e, t.header[e]);
          (r.onreadystatechange = function () {
            if (4 == r.readyState)
              if (200 == r.status)
                if (
                  (a.Platform.log(
                    'NetworkUtils requestFB(platform), success:' +
                      r.responseText,
                  ),
                  'json' == t.dataType)
                )
                  try {
                    t.callback(!0, JSON.parse(r.responseText));
                  } catch (e) {
                    t.callback(!0, r.responseText);
                  }
                else t.callback(!0, r.responseText);
              else
                a.Platform.log(
                  'NetworkUtils requestFB(platform), fail:' + r.responseText,
                ),
                  t.callback(!1, r.responseText);
          }),
            r.send(JSON.stringify(t.data));
        }),
        (e.prototype.uploadPlayerFriends = function (e, t) {
          a.CloudUtil.uploadPlayerFriends(
            a.CloudUtil.UPLOAD_PLAYER_FRINEDS_FB,
            e,
            t,
          );
        }),
        e
      );
    })(a.AdapterWX);
    a.AdapterFB = e;
  })(cmg || (cmg = {})),
  (function (n) {
    var e = (function (t) {
      function e() {
        var e = t.call(this) || this;
        return (
          (n.CloudUtil.SERVER_ADDRESS_FB = 'http://10.12.32.113:8080/warty/'), e
        );
      }
      return (
        __extends(e, t),
        (e.prototype.queryFriendsScore = function (e, t) {
          n.Platform.log('queryFriendsScore  rankName:   ' + e);
          var r = new Array();
          if (
            (r.push('4214be78-5713-5f63-9a7e-test111111'),
            r.push('4214be78-5713-5f63-9a7e-test22222222'),
            r.push('4214be78-5713-5f63-9a7e-test33333333'),
            r && 0 != r.length)
          ) {
            for (var a = [], o = 0; o < r.length; o++) a.push(r[o]);
            n.CloudStorageFBUtil.queryFriendsScore(e, a, t);
          }
        }),
        e
      );
    })(n.AdapterFB);
    n.AdapterWeb = e;
  })(cmg || (cmg = {})),
  (function (r) {
    var e = (function (t) {
      function e() {
        var e = t.call(this) || this;
        return e.DebugMode || r.CloudUtil.useTestServer(), e;
      }
      return __extends(e, t), e;
    })(r.AdapterWeb);
    r.AdapterCMPlay = e;
  })(cmg || (cmg = {})),
  (function (e) {
    var t = (function (a) {
      function e() {
        return (null !== a && a.apply(this, arguments)) || this;
      }
      return (
        __extends(e, a),
        (e.prototype.init = function (e, t, r) {
          console.warn(
            'AdapterH5SDK::init => appId(' + e + ') version(' + t + ')',
          ),
            window.H5SDK.init({
              wxappid: e,
              gameVersion: t,
            }),
            a.prototype.init.call(this, e, t, r);
        }),
        (e.prototype.exitGame = function (e) {
          window.H5SDK.exitMiniProgram({
            success: function () {
              e(!0);
            },
            fail: function () {
              e(!1);
            },
          });
        }),
        e
      );
    })(e.AdapterWX);
    e.AdapterH5SDK = t;
  })(cmg || (cmg = {})),
  (function (e) {
    var t = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return __extends(t, e), t;
    })(e.AdapterH5SDK);
    e.AdapterGameHall = t;
  })(cmg || (cmg = {})),
  (function (_) {
    var e = (function (t) {
      function a() {
        var e = (null !== t && t.apply(this, arguments)) || this;
        return (e.APPID = ''), (e.DebugMode = !1), e;
      }
      return (
        __extends(a, t),
        (a.prototype.getCloudApi = function (e) {
          return 'oversea' == window.getQueryStringRegion('region')
            ? a.SERVER_ADDRESS_QQ_OVERSEA + e
            : this.DebugMode
            ? a.TEST_SERVER_ADDRESS_QQ + e
            : a.SERVER_ADDRESS_QQ + e;
        }),
        (a.prototype.init = function (e, t, r) {
          _.Platform.log(
            '[AdapterQQ] GameStatusInfo ' + JSON.stringify(GameStatusInfo),
          ),
            (this.APPID = e),
            (this.DebugMode = r);
        }),
        (a.prototype.exitGame = function (e) {
          e && e(!0);
        }),
        (a.prototype.networkRequest = function (a) {
          var e = new BK.HttpUtil(a.url);
          if (
            (a.method && 0 < a.method.length
              ? e.setHttpMethod(a.method)
              : e.setHttpMethod(_.CloudUtil.METHOD_POST),
            a.header)
          )
            for (var t in a.header) e.setHttpHeader(t, a.header[t]);
          if (a.data) {
            var r = new BK.Buffer(0, !1);
            r.writeAsString(JSON.stringify(a.data), !1), e.setHttpRawBody(r);
          }
          e.requestAsync(function (e, t) {
            var r = e.readAsString(!0);
            if (200 == t) {
              if (a.callback)
                if ('json' == a.dataType)
                  try {
                    a.callback(!0, JSON.parse(r));
                  } catch (e) {
                    a.callback(!1, r);
                  }
                else a.callback(!0, r);
            } else a.callback && a.callback(!1, r);
          });
        }),
        (a.prototype.uploadFile = function (e, o) {
          if (_.CloudUtil.sPlayerInfo) {
            _.Platform.log('[AdapterQQ] uploadFile ' + e);
            var n = BK.FileUtil.readFile(e);
            if (n && 0 < n.length) {
              var t = {
                  playerid: _.CloudUtil.sPlayerInfo.playerId,
                  gameid: _.CloudUtil.GAME_ID,
                  timestamp: new Date().getTime(),
                  file_length: n.length,
                  file_md5: this.calcMd5Base64(n),
                },
                r =
                  'CMCM ' +
                  _.hex_hmac_sha1(
                    _.CloudUtil.sPlayerInfo.token,
                    JSON.stringify(t),
                  ),
                i = !1,
                l = setTimeout(function () {
                  (i = !0), o(-1, 'upload request timeout');
                }, 5e3);
              this.networkRequest({
                url: this.getCloudApi(a.UPLOAD_FILE_QQ),
                data: t,
                header: {
                  Authorization: r,
                },
                method: _.CloudUtil.METHOD_POST,
                dataType: 'json',
                callback: function (e, r) {
                  if (
                    (_.Platform.log(
                      '[AdapterQQ] uploadFile ' + e + ', ' + JSON.stringify(r),
                    ),
                    e && r && 0 == r.status)
                  ) {
                    var t = new BK.HttpUtil(r.upload_url);
                    for (var a in (t.setHttpMethod('put'), r.header_elements))
                      t.setHttpHeader(a, r.header_elements[a]),
                        _.Platform.log(
                          '[AdapterQQ] networkRequest head: ' +
                            a +
                            ':' +
                            r.header_elements[a],
                        );
                    t.setBodyCompatible(!1),
                      t.setHttpRawBody(n),
                      t.requestAsync(function (e, t) {
                        _.Platform.log(
                          '[AdapterQQ] uploadFile ' +
                            t +
                            ', ' +
                            e.readAsString(!0),
                        ),
                          i ||
                            (clearTimeout(l),
                            200 == t
                              ? o(0, r.download_url)
                              : o(t, 'COS server error'));
                      });
                  } else i || (clearTimeout(l), o(r.status, 'CM server error'));
                },
              });
            } else o(-18002, 'Local file read error');
          } else o(-18002, 'Local file read error');
        }),
        (a.prototype.calcMd5Base64 = function (e) {
          for (var t = new Uint8Array(e.length), r = 0; r < t.length; ++r)
            t[r] = e.readUint8Buffer();
          var a = new _.Md5();
          a.appendByteArray(t);
          var o = a.end(!0);
          _.Platform.log('[AdapterQQ] md5_hex=' + _.Md5._hex(o)),
            (t = new Uint8Array(16));
          for (r = 0; r < 4; r++)
            (t[4 * r + 0] = 255 & Number(o[r])),
              (t[4 * r + 1] = (Number(o[r]) >> 8) & 255),
              (t[4 * r + 2] = (Number(o[r]) >> 16) & 255),
              (t[4 * r + 3] = (Number(o[r]) >> 24) & 255);
          var n = '',
            i = t.length;
          for (r = 0; r < i; r += 3)
            for (
              var l =
                  (t[r] << 16) |
                  (r + 1 < i ? t[r + 1] << 8 : 0) |
                  (r + 2 < i ? t[r + 2] : 0),
                s = 0;
              s < 4;
              s++
            )
              8 * r + 6 * s > 8 * t.length
                ? (n += '=')
                : (n +=
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(
                      (l >>> (6 * (3 - s))) & 63,
                    ));
          return _.Platform.log('[AdapterQQ] md5_b64=' + n), n;
        }),
        (a.SERVER_ADDRESS_QQ_OVERSEA = 'https://h5game_oversea.cmcm.com/'),
        (a.SERVER_ADDRESS_QQ = 'https://minigame.cmcm.com/'),
        (a.TEST_SERVER_ADDRESS_QQ = 'https://pianotiles-minigame.cmcm.com/'),
        (a.REGISTER_QQ = 'warty/auth/register/mqq'),
        (a.UPLOAD_USERR_INFO_QQ = 'warty/auth/userinfo/mqq'),
        (a.SET_STORAGE_QQ = 'warty/storage/set'),
        (a.GET_STORAGE_QQ = 'warty/storage/get'),
        (a.GET_STORAGE_BATCH_QQ = 'warty/storage/batch_get'),
        (a.DEL_STORAGE_QQ = 'warty/storage/del'),
        (a.SHARE_REPORT_QQ = 'warty/share/report'),
        (a.SHARE_QUERY_QQ = 'warty/share/query'),
        (a.SHARE_SKIN_REPORT_QQ = 'warty/share/report/skin'),
        (a.SHARE_SKIN_QUERY_QQ = 'warty/share/query/skin'),
        (a.GET_SERVER_TIMESTAMP_QQ = 'common/time'),
        (a.UPLOAD_FILE_QQ = 'warty/storage/request_img_upload_auth'),
        (a.SAVE_WORLD_RANK_QQ = 'warty/rank/save'),
        (a.QUERY_WORLD_RANK_QQ = 'warty/rank/query'),
        (a.QUERY_TOP_WORLD_RANK_QQ = 'warty/rank/query_top'),
        (a.ASSET_ITEM_ADD_QQ = 'warty/item/scenes_call'),
        (a.ASSET_ITEM_QUERY_QQ = 'warty/item/get'),
        (a.REPACKAGE_APPLY_QQ = 'warty/item/redpackage_apply'),
        (a.REPACKAGE_QUERY_QQ = 'warty/item/redpackage_query'),
        (a.REPACKAGE_ACCEPT_QQ = 'warty/item/redpackage_get'),
        (a.REPACKAGE_CANCEL_QQ = 'warty/item/redpackage_cancel'),
        (a.BILL_APPLY_QQ = 'warty/item/splitbill_apply'),
        (a.BILL_QUERY_QQ = 'warty/item/splitbill_query'),
        (a.BILL_SATISFY_QQ = 'warty/item/splitbill_put'),
        (a.BILL_CANCEL_QQ = 'warty/item/splitbill_cancel'),
        a
      );
    })(_.AdapterWX);
    _.AdapterQQ = e;
  })(cmg || (cmg = {})),
  (function (a) {
    var e = (function (e) {
      function t() {
        return (null !== e && e.apply(this, arguments)) || this;
      }
      return (
        __extends(t, e),
        (t.prototype.networkRequest = function (t) {
          a.Platform.log(
            'NetworkUtils AdapterQQH5 requestQQH5(platform), parameter:' +
              t.url,
          );
          var r = new XMLHttpRequest();
          for (var e in (r.open(t.method, t.url), t.header))
            r.setRequestHeader(e, t.header[e]);
          (r.onreadystatechange = function () {
            if (4 == r.readyState)
              if (200 == r.status)
                if (
                  (a.Platform.log(
                    'NetworkUtils AdapterQQH5 requestQQH5(platform), success:' +
                      r.responseText,
                  ),
                  'json' == t.dataType)
                )
                  try {
                    t.callback(!0, JSON.parse(r.responseText));
                  } catch (e) {
                    t.callback(!0, r.responseText);
                  }
                else t.callback(!0, r.responseText);
              else
                a.Platform.log(
                  'NetworkUtils AdapterQQH5 requestQQH5(platform), fail:' +
                    r.responseText,
                ),
                  t.callback(!1, r.responseText);
          }),
            r.send(JSON.stringify(t.data));
        }),
        t
      );
    })(a.AdapterQQ);
    a.AdapterQQH5 = e;
  })(cmg || (cmg = {})),
  (function (e) {
    var t = function () {
      (this.type = ''), (this.count = 0);
    };
    (cmg || (cmg = {})).AssetItem = t;
  })(),
  (function (s) {
    var e = (function () {
      function l() {}
      return (
        (l.reportScore = function (r, a, o, n, i) {
          if ((void 0 === i && (i = !0), s.CloudUtil.sPlayerInfo)) {
            var e = {
                playerid: s.CloudUtil.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: s.CloudUtil.GAME_ID,
                score_value: a,
                rank_name: r,
                score_data: o,
              },
              t =
                'CMCM ' +
                s.hex_hmac_sha1(
                  s.CloudUtil.sPlayerInfo.token,
                  JSON.stringify(e),
                );
            s.platform.networkRequest({
              url: s.CloudUtil.SCORE_REPORT_FB,
              data: e,
              header: {
                Authorization: t,
              },
              method: s.CloudUtil.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                s.Platform.log('reportScore ' + e + ', data: ' + t),
                  e && t
                    ? n(0 == t.status)
                    : i && t && (403 == t.statuscode || 1001 == t.status)
                    ? (s.CloudUtil.sPlayerInfo &&
                        ((s.CloudUtil.sPlayerInfo.playerId = void 0),
                        (s.CloudUtil.sPlayerInfo.token = void 0)),
                      l.reportScore(r, a, o, n, !1))
                    : n(!1);
              },
            });
          } else n(!1);
        }),
        (l.queryFriendsScore = function (r, a, o, n) {
          if ((void 0 === n && (n = !0), s.CloudUtil.sPlayerInfo)) {
            s.Platform.log(
              'queryFriendsScore == ' + s.CloudUtil.sPlayerInfo.playerId,
            );
            var e = {
                playerid: s.CloudUtil.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: s.CloudUtil.GAME_ID,
                rank_name: r,
                query_ids: a,
              },
              t =
                'CMCM ' +
                s.hex_hmac_sha1(
                  s.CloudUtil.sPlayerInfo.token,
                  JSON.stringify(e),
                );
            s.platform.networkRequest({
              url: s.CloudUtil.SCORE_QUERY_FB,
              data: e,
              header: {
                Authorization: t,
              },
              method: s.CloudUtil.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t && t.rank_name && t.result
                  ? o(0 == t.status, t.rank_name, t.result)
                  : n && t && (403 == t.statuscode || 1001 == t.status)
                  ? (s.CloudUtil.sPlayerInfo &&
                      ((s.CloudUtil.sPlayerInfo.playerId = void 0),
                      (s.CloudUtil.sPlayerInfo.token = void 0)),
                    l.queryFriendsScore(r, a, o, !1))
                  : o(!1, r, null);
              },
            });
          } else o(!1, r, null);
        }),
        (l.saveWorldRank = function (e, t, r, a, o) {
          void 0 === o && (o = !0),
            s.CloudUtil.saveWorldRank(
              s.CloudUtil.SAVE_WORLD_RANK_FB,
              e,
              t,
              r,
              a,
              o,
            );
        }),
        (l.queryWorldRank = function (e, t, r) {
          void 0 === r && (r = !0),
            s.CloudUtil.queryWorldRank(
              s.CloudUtil.QUERY_WORLD_RANK_FB,
              e,
              t,
              r,
            );
        }),
        (l.queryTopWorldRank = function (e, t, r) {
          void 0 === r && (r = !0),
            s.CloudUtil.queryTopWorldRank(
              s.CloudUtil.QUERY_WORLD_RANK_FB,
              e,
              t,
              r,
            );
        }),
        l
      );
    })();
    s.CloudStorageFBUtil = e;
  })(cmg || (cmg = {})),
  (function (n) {
    var e = (function () {
      function e() {}
      return (
        (e.saveWorldRank = function (e, t, r, a, o) {
          void 0 === o && (o = !0),
            n.CloudUtil.saveWorldRank(
              n.CloudUtil.SAVE_WORLD_RANK_WX,
              e,
              t,
              r,
              a,
              o,
            );
        }),
        (e.queryWorldRank = function (e, t, r) {
          void 0 === r && (r = !0),
            n.CloudUtil.queryWorldRank(
              n.CloudUtil.QUERY_WORLD_RANK_WX,
              e,
              t,
              r,
            );
        }),
        (e.queryTopWorldRank = function (e, t, r) {
          void 0 === r && (r = !0),
            n.CloudUtil.queryTopWorldRank(
              n.CloudUtil.QUERY_TOP_WORLD_RANK_WX,
              e,
              t,
              r,
            );
        }),
        (e.checkInBlackList = function (e) {
          n.CloudUtil.checkInBlackList(
            n.CloudUtil.CHALLENGE_COMPETITION_BLACK_LIST,
            e,
            !0,
          );
        }),
        e
      );
    })();
    n.CloudStorageWXUtil = e;
  })(cmg || (cmg = {})),
  (function (u) {
    var e = (function () {
      function _() {}
      return (
        (_.useTestServer = function () {
          (_.REGISTER_WX =
            (_.SERVER_ADDRESS_WX =
              (_.SERVER_ADDRESS_BASE_WX =
                'https://pianotiles-minigame.cmcm.com/') + 'warty/') +
            'auth/register/wx'),
            (_.REGISTER_H5SDK = _.SERVER_ADDRESS_WX + 'auth/register/h5sdk'),
            (_.REGISTER_QQHALL =
              _.SERVER_ADDRESS_WX + 'auth/register/gamehall'),
            (_.UPLOAD_USERR_INFO_WX = _.SERVER_ADDRESS_WX + 'auth/userinfo/wx'),
            (_.SET_STORAGE_WX = _.SERVER_ADDRESS_WX + 'storage/set'),
            (_.GET_STORAGE_WX = _.SERVER_ADDRESS_WX + 'storage/get'),
            (_.DEL_STORAGE_WX = _.SERVER_ADDRESS_WX + 'storage/del'),
            (_.SHARE_REPORT_WX = _.SERVER_ADDRESS_WX + 'share/report'),
            (_.SHARE_QUERY_WX = _.SERVER_ADDRESS_WX + 'share/query'),
            (_.SHARE_REPORT_COMPETITION_WX =
              _.SHARE_REPORT_WX + '/competition'),
            (_.SHARE_QUERY_COMPETITION_WX = _.SHARE_QUERY_WX + '/competition'),
            (_.SHARE_SKIN_REPORT_WX =
              _.SERVER_ADDRESS_WX + 'share/report/skin'),
            (_.SHARE_SKIN_QUERY_WX = _.SERVER_ADDRESS_WX + 'share/query/skin'),
            (_.SAVE_WORLD_RANK_WX = _.SERVER_ADDRESS_WX + 'rank/save'),
            (_.QUERY_WORLD_RANK_WX = _.SERVER_ADDRESS_WX + 'rank/query'),
            (_.QUERY_TOP_WORLD_RANK_WX =
              _.SERVER_ADDRESS_WX + 'rank/query_top'),
            (_.GET_SERVER_TIMESTAMP_WX =
              _.SERVER_ADDRESS_BASE_WX + 'common/time'),
            (_.SHARE_HD_QUERY_WX = _.SERVER_ADDRESS_WX + 'share/hd_query'),
            (_.SHARE_HD_QUERY_WX_BATCH =
              _.SERVER_ADDRESS_WX + 'share/hd_query_batch'),
            (_.SHARE_HD_REPORT_WX = _.SERVER_ADDRESS_WX + 'share/hd_report'),
            (_.QUERY_MUSIC_PEOPLE_NUM_WX =
              _.SERVER_ADDRESS_WX + 'activity/query_info'),
            (_.RANK_SAVE_WX = _.SERVER_ADDRESS_WX + 'rank/save'),
            (_.RANK_QUERY_WX = _.SERVER_ADDRESS_WX + 'rank/query'),
            (_.RANK_QUERY_TOP_WX = _.SERVER_ADDRESS_WX + 'rank/query_top'),
            (_.RANK_QUERY_TOP_SELF_WX =
              _.SERVER_ADDRESS_WX + 'rank/query_top_self'),
            (_.RANK_QUERY_SCORE_WX = _.SERVER_ADDRESS_WX + 'rank/query_score'),
            (_.RANK_QUERY_INFO_WX = _.SERVER_ADDRESS_WX + 'rank/info'),
            (_.RANK_QUERY_SELF_RECORD =
              _.SERVER_ADDRESS_WX + 'score/personal_record'),
            (_.RANK_QUERY_OTHER_RECORD =
              _.SERVER_ADDRESS_WX + 'score/personal_record_query'),
            (_.COOPERATION_QUERY_SCORE =
              _.SERVER_ADDRESS_WX + 'score/cooperation'),
            (_.CHALLENGE_COMPETITION_BLACK_LIST =
              _.SERVER_ADDRESS_WX + 'blacklist/query'),
            (_.INVITATION_CODE =
              _.SERVER_ADDRESS_WX + 'cooperation/invitation_code'),
            (_.USER_INFO_GET_WX = _.SERVER_ADDRESS_WX + 'userinfo/get'),
            (_.QUERY_USER_INFO_LEVEL =
              _.SERVER_ADDRESS_WX + 'userinfo/get_paino'),
            (_.UPLOAD_PLAYER_FRINEDS_FB =
              _.SERVER_ADDRESS_WX + 'friend/report_relation');
        }),
        (_.useFBServer = function () {
          (_.REGISTER_WX =
            (_.SERVER_ADDRESS_WX =
              (_.SERVER_ADDRESS_BASE_WX =
                'https://pianotiles-fbgame.cmcm.com/') + 'warty/') +
            'auth/register/wx'),
            (_.REGISTER_H5SDK = _.SERVER_ADDRESS_WX + 'auth/register/h5sdk'),
            (_.REGISTER_QQHALL =
              _.SERVER_ADDRESS_WX + 'auth/register/gamehall'),
            (_.UPLOAD_USERR_INFO_WX = _.SERVER_ADDRESS_WX + 'auth/userinfo/wx'),
            (_.SET_STORAGE_WX = _.SERVER_ADDRESS_WX + 'storage/set'),
            (_.GET_STORAGE_WX = _.SERVER_ADDRESS_WX + 'storage/get'),
            (_.DEL_STORAGE_WX = _.SERVER_ADDRESS_WX + 'storage/del'),
            (_.SHARE_REPORT_WX = _.SERVER_ADDRESS_WX + 'share/report'),
            (_.SHARE_QUERY_WX = _.SERVER_ADDRESS_WX + 'share/query'),
            (_.SHARE_REPORT_COMPETITION_WX =
              _.SHARE_REPORT_WX + '/competition'),
            (_.SHARE_QUERY_COMPETITION_WX = _.SHARE_QUERY_WX + '/competition'),
            (_.SHARE_SKIN_REPORT_WX =
              _.SERVER_ADDRESS_WX + 'share/report/skin'),
            (_.SHARE_SKIN_QUERY_WX = _.SERVER_ADDRESS_WX + 'share/query/skin'),
            (_.SAVE_WORLD_RANK_WX = _.SERVER_ADDRESS_WX + 'rank/save'),
            (_.QUERY_WORLD_RANK_WX = _.SERVER_ADDRESS_WX + 'rank/query'),
            (_.QUERY_TOP_WORLD_RANK_WX =
              _.SERVER_ADDRESS_WX + 'rank/query_top'),
            (_.GET_SERVER_TIMESTAMP_WX =
              _.SERVER_ADDRESS_BASE_WX + 'common/time'),
            (_.SHARE_HD_QUERY_WX = _.SERVER_ADDRESS_WX + 'share/hd_query'),
            (_.SHARE_HD_QUERY_WX_BATCH =
              _.SERVER_ADDRESS_WX + 'share/hd_query_batch'),
            (_.SHARE_HD_REPORT_WX = _.SERVER_ADDRESS_WX + 'share/hd_report'),
            (_.QUERY_MUSIC_PEOPLE_NUM_WX =
              _.SERVER_ADDRESS_WX + 'activity/query_info'),
            (_.RANK_SAVE_WX = _.SERVER_ADDRESS_WX + 'rank/save'),
            (_.RANK_QUERY_WX = _.SERVER_ADDRESS_WX + 'rank/query'),
            (_.RANK_QUERY_TOP_WX = _.SERVER_ADDRESS_WX + 'rank/query_top'),
            (_.RANK_QUERY_TOP_SELF_WX =
              _.SERVER_ADDRESS_WX + 'rank/query_top_self'),
            (_.RANK_QUERY_SCORE_WX = _.SERVER_ADDRESS_WX + 'rank/query_score'),
            (_.RANK_QUERY_INFO_WX = _.SERVER_ADDRESS_WX + 'rank/info'),
            (_.RANK_QUERY_SELF_RECORD =
              _.SERVER_ADDRESS_WX + 'score/personal_record'),
            (_.RANK_QUERY_OTHER_RECORD =
              _.SERVER_ADDRESS_WX + 'score/personal_record_query'),
            (_.COOPERATION_QUERY_SCORE =
              _.SERVER_ADDRESS_WX + 'score/cooperation'),
            (_.CHALLENGE_COMPETITION_BLACK_LIST =
              _.SERVER_ADDRESS_WX + 'blacklist/query'),
            (_.INVITATION_CODE =
              _.SERVER_ADDRESS_WX + 'cooperation/invitation_code'),
            (_.USER_INFO_GET_WX = _.SERVER_ADDRESS_WX + 'userinfo/get'),
            (_.QUERY_USER_INFO_LEVEL =
              _.SERVER_ADDRESS_WX + 'userinfo/get_paino'),
            (_.UPLOAD_PLAYER_FRINEDS_FB =
              _.SERVER_ADDRESS_WX + 'friend/report_relation');
        }),
        (_.getCurrentServerTime = function () {
          var e = new Date().getTime() - _.sTimeDifference;
          return u.Platform.log('getServerTime:' + e), e;
        }),
        (_.getYearWeekIndex = function (e) {
          var t = new Date(e),
            r = new Date(t.getFullYear(), 0, 1),
            a = r.getDay(),
            o = 1;
          0 != a && (o = 7 - a + 1), (r = new Date(t.getFullYear(), 0, 1 + o));
          var n = Math.ceil((t.valueOf() - r.valueOf()) / 864e5);
          return Math.ceil(n / 7) + 1;
        }),
        (_.saveWorldRank = function (e, t, r, a, o, n) {
          if ((void 0 === n && (n = !0), _.sPlayerInfo)) {
            var i = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                score_value: r,
                rank_name: t,
                score_data: a,
              },
              l =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(i));
            u.platform.networkRequest({
              url: e,
              data: i,
              header: {
                Authorization: l,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                o(!(!e || !t) && 0 == t.status);
              },
            });
          } else o(!1);
        }),
        (_.queryWorldRank = function (e, t, r, a) {
          if ((void 0 === a && (a = !0), _.sPlayerInfo)) {
            var o = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                rank_name: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(o));
            u.platform.networkRequest({
              url: e,
              data: o,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t
                  ? r(
                      0 == t.status,
                      t.top_rank,
                      t.whole_rank,
                      t.score_value,
                      t.score_data,
                    )
                  : r(!1, 0, 0, 0, null);
              },
            });
          } else r(!1, 0, 0, 0, null);
        }),
        (_.queryTopWorldRank = function (e, t, r, a) {
          if ((void 0 === a && (a = !0), _.sPlayerInfo)) {
            var o = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                rank_name: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(o));
            u.platform.networkRequest({
              url: e,
              data: o,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t && t.rank_list
                  ? r(0 == t.status, t.rank_list)
                  : r(!1, null);
              },
            });
          } else r(!1, null);
        }),
        (_.reportShare = function (e, t, l, r, a, o, n) {
          if (
            (void 0 === r && (r = !0),
            void 0 === a && (a = 5),
            void 0 === o && (o = 5),
            void 0 === n && (n = '0600'),
            _.sPlayerInfo)
          ) {
            var i = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                inviter_playerid: t,
                max_inviter_count: a,
                max_invitee_count: o,
                share_refresh_hour: n,
              },
              s =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(i));
            u.platform.networkRequest({
              url: e,
              data: i,
              header: {
                Authorization: s,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                if (e && t) {
                  var r = t.valid,
                    a = t.info,
                    o = t.count,
                    n = t.inviter_nickname,
                    i = t.inviter_avatar_url;
                  l(0 == t.status, r, a, o, n, i);
                } else
                  l(!1, !1, 'server status error' + t.statuscode, 0, '', '');
              },
            });
          } else l(!1, !1, 'not playerID', 0, '', '');
        }),
        (_.queryShare = function (e, r, t, a) {
          if (
            (void 0 === t && (t = !0),
            void 0 === a && (a = '0600'),
            _.sPlayerInfo)
          ) {
            var o = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                share_refresh_hour: a,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(o));
            u.platform.networkRequest({
              url: e,
              data: o,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t && t.invitee_list
                  ? r(0 == t.status, t.invitee_date, t.invitee_list)
                  : r(!1, '', null);
              },
            });
          } else r(!1, '', null);
        }),
        (_.addItems = function (e, t, r, a) {
          if ((void 0 === a && (a = !0), t && 0 != t.length))
            if (_.sPlayerInfo) {
              for (var o = {}, n = 0; n < t.length; n++) {
                var i = t[n];
                o[i.type] = i.count;
              }
              var l = {
                  playerid: _.sPlayerInfo.playerId,
                  timestamp: new Date().getTime(),
                  gameid: _.GAME_ID,
                  affect_items: o,
                },
                s =
                  'CMCM ' +
                  u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(l));
              u.platform.networkRequest({
                url: e,
                data: l,
                header: {
                  Authorization: s,
                },
                method: _.METHOD_POST,
                dataType: 'json',
                callback: function (e, t) {
                  e && t && t.invitee_list
                    ? r(0 == t.status, t.message, t.timestamp)
                    : r(!1, '', null);
                },
              });
            } else r(!1, '', null);
          else r(!1, 'affectItems is null or size=0', null);
        }),
        (_.queryItems = function (e, r, t) {
          if ((void 0 === t && (t = !0), _.sPlayerInfo)) {
            var a = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
              },
              o =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(a));
            u.platform.networkRequest({
              url: e,
              data: a,
              header: {
                Authorization: o,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t && t.invitee_list
                  ? r(0 == t.status, t.message, t.timestamp, t.items)
                  : r(!1, '', null, null);
              },
            });
          } else r(!1, '', null, null);
        }),
        (_.applyGive = function (e, t, n, r) {
          if ((void 0 === r && (r = !0), t && 0 != t.length))
            if (_.sPlayerInfo) {
              for (var a = {}, o = 0; o < t.length; o++) {
                var i = t[o];
                a[i.type] = i.count;
              }
              var l = {
                  playerid: _.sPlayerInfo.playerId,
                  timestamp: new Date().getTime(),
                  gameid: _.GAME_ID,
                  items: a,
                  category: 0,
                  number: 1,
                },
                s =
                  'CMCM ' +
                  u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(l));
              u.platform.networkRequest({
                url: e,
                data: l,
                header: {
                  Authorization: s,
                },
                method: _.METHOD_POST,
                dataType: 'json',
                callback: function (e, t) {
                  if (e && t) {
                    var r = t.message,
                      a = t.timestamp,
                      o = t.redpackage_id;
                    n(0 == t.status, r, a, o);
                  } else
                    n(
                      !1,
                      'server status error, statuscode=' + t.statuscode,
                      '0',
                      '',
                    );
                },
              });
            } else n(!1, 'no playerInfo', '0', '');
          else n(!1, 'affectItems is null or size=0', null, null);
        }),
        (_.queryGive = function (e, t, n, r) {
          if ((void 0 === r && (r = !0), _.sPlayerInfo)) {
            var a = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                redpackage_id: t,
              },
              o =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(a));
            u.platform.networkRequest({
              url: e,
              data: a,
              header: {
                Authorization: o,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                if (e && t) {
                  var r = t.message,
                    a = t.timestamp,
                    o = t.receivers;
                  n(0 == t.status, r, a, o);
                } else
                  n(
                    !1,
                    'server status error, statuscode=' + t.statuscode,
                    '0',
                    [],
                  );
              },
            });
          } else n(!1, 'no playerInfo', '0', []);
        }),
        (_.acceptGive = function (e, t, o, r) {
          if ((void 0 === r && (r = !0), _.sPlayerInfo)) {
            var a = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                redpackage_id: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(a));
            u.platform.networkRequest({
              url: e,
              data: a,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                if (e && t) {
                  var r = t.message,
                    a = t.timestamp;
                  o(0 == t.status, r, a, t.receive_items);
                } else
                  o(
                    !1,
                    'server status error, statuscode=' + t.statuscode,
                    '0',
                    null,
                  );
              },
            });
          } else o(!1, 'no playerInfo', '0', null);
        }),
        (_.cancelGive = function (e, t, o, r) {
          if ((void 0 === r && (r = !0), _.sPlayerInfo)) {
            var a = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                redpackage_id: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(a));
            u.platform.networkRequest({
              url: e,
              data: a,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                if (e && t) {
                  var r = t.message,
                    a = t.timestamp;
                  o(0 == t.status, r, a);
                } else
                  o(!1, 'server status error, statuscode=' + t.statuscode, '0');
              },
            });
          } else o(!1, 'no playerInfo', '0');
        }),
        (_.applyDemand = function (e, t, o, r) {
          if ((void 0 === r && (r = !0), _.sPlayerInfo)) {
            for (var a = {}, n = 0; n < t.length; n++) {
              var i = t[n];
              a[i.type] = i.count;
            }
            var l = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                items: a,
                number: 1,
              },
              s =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(l));
            u.platform.networkRequest({
              url: e,
              data: l,
              header: {
                Authorization: s,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                if (e && t) {
                  var r = t.message,
                    a = t.timestamp;
                  o(0 == t.status, r, a, t.splitbill_id);
                } else
                  o(
                    !1,
                    'server status error, statuscode=' + t.statuscode,
                    '0',
                    null,
                  );
              },
            });
          } else o(!1, 'no playerInfo', '0', null);
        }),
        (_.queryDemand = function (e, t, n, r) {
          if ((void 0 === r && (r = !0), _.sPlayerInfo)) {
            var a = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                splitbill_id: t,
              },
              o =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(a));
            u.platform.networkRequest({
              url: e,
              data: a,
              header: {
                Authorization: o,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                if (e && t) {
                  var r = t.message,
                    a = t.timestamp,
                    o = t.presenters;
                  n(0 == t.status, r, a, o);
                } else
                  n(
                    !1,
                    'server status error, statuscode=' + t.statuscode,
                    '0',
                    [],
                  );
              },
            });
          } else n(!1, 'no playerInfo', '0', []);
        }),
        (_.satisfyDemand = function (e, t, o, r) {
          if ((void 0 === r && (r = !0), _.sPlayerInfo)) {
            var a = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                splitbill_id: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(a));
            u.platform.networkRequest({
              url: e,
              data: a,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                if (e && t) {
                  var r = t.message,
                    a = t.timestamp;
                  o(0 == t.status, r, a);
                } else
                  o(!1, 'server status error, statuscode=' + t.statuscode, '0');
              },
            });
          } else o(!1, 'no playerInfo', '0');
        }),
        (_.cancelDemand = function (e, t, o, r) {
          if ((void 0 === r && (r = !0), _.sPlayerInfo)) {
            var a = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                splitbill_id: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(a));
            u.platform.networkRequest({
              url: e,
              data: a,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                if (e && t) {
                  var r = t.message,
                    a = t.timestamp;
                  o(0 == t.status, r, a);
                } else
                  o(!1, 'server status error, statuscode=' + t.statuscode, '0');
              },
            });
          } else o(!1, 'no playerInfo', '0');
        }),
        (_.reportShareHdReport = function (e, t, r, a, o, n, i) {
          if (
            (void 0 === o && (o = !0),
            void 0 === n && (n = 5),
            void 0 === i && (i = 5),
            _.sPlayerInfo)
          ) {
            var l = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                hdid: t,
                inviter_playerid: r,
                max_inviter_count: n,
                max_invitee_count: i,
              },
              s =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(l));
            u.platform.networkRequest({
              url: e,
              data: l,
              header: {
                Authorization: s,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t
                  ? a(
                      0 == t.status,
                      t.valid,
                      t.info,
                      t.count,
                      t.inviter_nickname,
                      t.inviter_avatar_url,
                    )
                  : a(!1, !1, '', 0, '', '');
              },
            });
          } else a(!1, !1, 'not playerID', 0, '', '');
        }),
        (_.shareHdQuery = function (e, t, r, a) {
          if ((void 0 === a && (a = !0), _.sPlayerInfo)) {
            var o = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                hdid: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(o));
            u.platform.networkRequest({
              url: e,
              data: o,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t && t.invitee_list
                  ? r(0 == t.status, t.invitee_list)
                  : r(!1, null);
              },
            });
          } else r(!1, null);
        }),
        (_.shareHdQueryBatch = function (r, a, o, n) {
          if ((void 0 === n && (n = !0), _.sPlayerInfo)) {
            var e = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                hdids: a,
              },
              t =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(e));
            u.platform.networkRequest({
              url: r,
              data: e,
              header: {
                Authorization: t,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t && t.hd_invitee_map
                  ? o(0 == t.status, t.hd_invitee_map)
                  : n && t && (403 == t.statuscode || 1001 == t.status)
                  ? (_.sPlayerInfo &&
                      ((_.sPlayerInfo.playerId = void 0),
                      (_.sPlayerInfo.token = void 0)),
                    _.shareHdQueryBatch(r, a, o, !1))
                  : o(!1, null);
              },
            });
          } else o(!1, !1);
        }),
        (_.queryMusicPeopleNums = function (e, t, r, a) {
          if ((void 0 === a && (a = !0), _.sPlayerInfo)) {
            var o = [];
            t.forEach(function (e) {
              o.push(e + '');
            });
            var n = {
                playerid: _.sPlayerInfo.playerId,
                timestamp: new Date().getTime(),
                gameid: _.GAME_ID,
                activity_type: 'hot_tune_challenge',
                activity_id: o,
              },
              i =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(n));
            u.platform.networkRequest({
              url: e,
              data: n,
              header: {
                Authorization: i,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t
                  ? ((e = 0 == t.status && t.info && t.info.hot_tune_challenge),
                    r(!!e, e ? t.info.hot_tune_challenge : null))
                  : r(!1, null);
              },
            });
          } else r(!1, null);
        }),
        (_.pushCommonMessage = function (e, t, r, a, o) {
          if (_.sPlayerInfo) {
            (r.playerid = _.sPlayerInfo.playerId),
              (r.timestamp = new Date().getTime()),
              (r.gameid = _.GAME_ID);
            var n = r,
              i =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(n));
            u.platform.networkRequest({
              url: e,
              data: n,
              header: {
                Authorization: i,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t ? o(!0, t) : o(!1, null);
              },
            });
          } else o(!1, null);
        }),
        (_.saveChallengeRank = function (e, t, r, a, o, n, i) {
          if ((void 0 === i && (i = !0), _.sPlayerInfo)) {
            var l = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                rank_name: t,
                score_value: r,
                score_data: a,
                sort_type: o,
              },
              s =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(l));
            u.platform.networkRequest({
              url: e,
              data: l,
              header: {
                Authorization: s,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                n(!(!e || !t) && 0 == t.status, t);
              },
            });
          } else n(!1, null);
        }),
        (_.queryChallengeSelf = function (e, t, r, a) {
          if ((void 0 === a && (a = !0), _.sPlayerInfo)) {
            var o = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                rank_name: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(o));
            u.platform.networkRequest({
              url: e,
              data: o,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                r(!(!e || !t) && 0 == t.status, t);
              },
            });
          } else r(!1, null);
        }),
        (_.queryChallengeTop = function (e, t, r, a, o) {
          if ((void 0 === o && (o = !0), _.sPlayerInfo)) {
            var n = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                rank_name: t,
                top_count: r,
              },
              i =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(n));
            u.platform.networkRequest({
              url: e,
              data: n,
              header: {
                Authorization: i,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t ? a(0 == t.status, t) : a(!1, null);
              },
            });
          } else a(!1, null);
        }),
        (_.queryChallengeTopSelf = function (e, t, r, a, o) {
          if ((void 0 === o && (o = !0), _.sPlayerInfo)) {
            var n = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                rank_name: t,
                top_count: r,
              },
              i =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(n));
            u.platform.networkRequest({
              url: e,
              data: n,
              header: {
                Authorization: i,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t ? a(0 == t.status, t) : a(!1, null);
              },
            });
          } else a(!1, null);
        }),
        (_.queryChallengeScore = function (e, t, r, a, o, n) {
          if ((void 0 === n && (n = !0), _.sPlayerInfo)) {
            var i = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                rank_name: t,
                top_rank_list: r,
                whole_percent_list: a,
              },
              l =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(i));
            u.platform.networkRequest({
              url: e,
              data: i,
              header: {
                Authorization: l,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t ? o(0 == t.status, t) : o(!1, null);
              },
            });
          } else o(!1, null);
        }),
        (_.queryChallengeInfo = function (e, t, r, a) {
          if ((void 0 === a && (a = !0), _.sPlayerInfo)) {
            var o = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                rank_name: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(o));
            u.platform.networkRequest({
              url: e,
              data: o,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t ? r(0 == t.status, t) : r(!1, null);
              },
            });
          } else r(!1, null);
        }),
        (_.checkInBlackList = function (e, r, t) {
          if (_.sPlayerInfo) {
            var a = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: this.getCurrentServerTime(),
              },
              o =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(a));
            u.platform.networkRequest({
              url: e,
              data: a,
              header: {
                Authorization: o,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t && t.data
                  ? r(0 == t.status, t.data.is_black)
                  : r(!1, null);
              },
            });
          } else r(!1, !1);
        }),
        (_.queryChallengeSelfRecord = function (e, t, r, a, o, n, i) {
          if ((void 0 === i && (i = !0), _.sPlayerInfo)) {
            var l = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                rank_counts: t,
                rank_percent_counts: r,
                begin_time: a,
                end_time: o,
              },
              s =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(l));
            u.platform.networkRequest({
              url: e,
              data: l,
              header: {
                Authorization: s,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t ? n(0 == t.status, t) : n(!1, null);
              },
            });
          } else n(!1, null);
        }),
        (_.queryChallengeOtherRecord = function (e, t, r, a, o, n, i) {
          if (_.sPlayerInfo) {
            var l = {
                playerid: _.sPlayerInfo.playerId,
                query_playerid: t,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                rank_counts: r,
                rank_percent_counts: a,
                begin_time: o,
                end_time: n,
              },
              s =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(l));
            u.platform.networkRequest({
              url: e,
              data: l,
              header: {
                Authorization: s,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t ? i(0 == t.status, t) : i(!1, null);
              },
            });
          } else i(!1, null);
        }),
        (_.queryCooperationScore = function (e, t, r, a) {
          if ((void 0 === a && (a = !0), _.sPlayerInfo)) {
            var o = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                function_name: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(o));
            u.platform.networkRequest({
              url: e,
              data: o,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t ? r(0 == t.status, t) : r(!1, null);
              },
            });
          } else r(!1, null);
        }),
        (_.queryInvitationCode = function (e, t, r, a) {
          if ((void 0 === a && (a = !0), _.sPlayerInfo)) {
            var o = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                invitation_code: t,
              },
              n =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(o));
            u.platform.networkRequest({
              url: e,
              data: o,
              header: {
                Authorization: n,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                t ? r(e, t) : r(!1, null);
              },
            });
          } else r(!1, null);
        }),
        (_.getServerUserInfo = function (e, r, t) {
          if ((void 0 === t && (t = !0), _.sPlayerInfo)) {
            var a = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: this.getCurrentServerTime(),
              },
              o =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(a));
            u.platform.networkRequest({
              url: e,
              data: a,
              header: {
                Authorization: o,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t ? r(0 == t.status, t) : r(!1, null);
              },
            });
          } else r(!1, !1);
        }),
        (_.queryUserInfoLevel = function (e, t, r) {
          if (_.sPlayerInfo) {
            var a = {
                playerid: _.sPlayerInfo.playerId,
                gameid: _.GAME_ID,
                timestamp: new Date().getTime(),
                query_playerid: t,
              },
              o =
                'CMCM ' +
                u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(a));
            u.platform.networkRequest({
              url: e,
              data: a,
              header: {
                Authorization: o,
              },
              method: _.METHOD_POST,
              dataType: 'json',
              callback: function (e, t) {
                e && t ? r(0 == t.status, t) : r(!1, null);
              },
            });
          } else r(!1, null);
        }),
        (_.uploadPlayerFriends = function (e, t, r, a) {
          void 0 === a && (a = !0);
          var o = {
              playerid: _.sPlayerInfo.playerId,
              gameid: _.GAME_ID,
              timestamp: this.getCurrentServerTime(),
              friend_ids: t,
            },
            n =
              'CMCM ' + u.hex_hmac_sha1(_.sPlayerInfo.token, JSON.stringify(o));
          u.platform.networkRequest({
            url: e,
            data: o,
            header: {
              Authorization: n,
            },
            method: _.METHOD_POST,
            dataType: 'json',
            callback: function (e, t) {
              e && t ? r(0 == t.status, t) : r(!1, null);
            },
          });
        }),
        (_.SERVER_ADDRESS_BASE_WX = 'https://minigame.cmcm.com/'),
        (_.SERVER_ADDRESS_BASE_OVERSEA = 'https://h5game_oversea.cmcm.com/'),
        'oversea' == window.getQueryStringRegion('region') &&
          (_.SERVER_ADDRESS_BASE_WX = _.SERVER_ADDRESS_BASE_OVERSEA),
        (_.REGISTER_WX =
          (_.SERVER_ADDRESS_WX = _.SERVER_ADDRESS_BASE_WX + 'warty/') +
          'auth/register/wx'),
        (_.REGISTER_H5SDK = _.SERVER_ADDRESS_WX + 'auth/register/h5sdk'),
        (_.REGISTER_QQHALL = _.SERVER_ADDRESS_WX + 'auth/register/gamehall'),
        (_.UPLOAD_USERR_INFO_WX = _.SERVER_ADDRESS_WX + 'auth/userinfo/wx'),
        (_.SET_STORAGE_WX = _.SERVER_ADDRESS_WX + 'storage/set'),
        (_.GET_STORAGE_WX = _.SERVER_ADDRESS_WX + 'storage/get'),
        (_.DEL_STORAGE_WX = _.SERVER_ADDRESS_WX + 'storage/del'),
        (_.SHARE_REPORT_WX = _.SERVER_ADDRESS_WX + 'share/report'),
        (_.SHARE_QUERY_WX = _.SERVER_ADDRESS_WX + 'share/query'),
        (_.SHARE_REPORT_COMPETITION_WX = _.SHARE_REPORT_WX + '/competition'),
        (_.SHARE_QUERY_COMPETITION_WX = _.SHARE_QUERY_WX + '/competition'),
        (_.SHARE_SKIN_REPORT_WX = _.SERVER_ADDRESS_WX + 'share/report/skin'),
        (_.SHARE_SKIN_QUERY_WX = _.SERVER_ADDRESS_WX + 'share/query/skin'),
        (_.SAVE_WORLD_RANK_WX = _.SERVER_ADDRESS_WX + 'rank/save'),
        (_.QUERY_WORLD_RANK_WX = _.SERVER_ADDRESS_WX + 'rank/query'),
        (_.QUERY_TOP_WORLD_RANK_WX = _.SERVER_ADDRESS_WX + 'rank/query_top'),
        (_.GET_SERVER_TIMESTAMP_WX = _.SERVER_ADDRESS_BASE_WX + 'common/time'),
        (_.SHARE_HD_REPORT_WX = _.SERVER_ADDRESS_WX + 'share/hd_report'),
        (_.SHARE_HD_QUERY_WX = _.SERVER_ADDRESS_WX + 'share/hd_query'),
        (_.SHARE_HD_QUERY_WX_BATCH =
          _.SERVER_ADDRESS_WX + 'share/hd_query_batch'),
        (_.QUERY_MUSIC_PEOPLE_NUM_WX =
          _.SERVER_ADDRESS_WX + 'activity/query_info'),
        (_.QUERY_USER_INFO_LEVEL = _.SERVER_ADDRESS_WX + 'userinfo/get_paino'),
        (_.ASSET_ITEM_ADD = _.SERVER_ADDRESS_WX + 'item/scenes_call'),
        (_.ASSET_ITEM_QUERY = _.SERVER_ADDRESS_WX + 'item/get'),
        (_.REPACKAGE_APPLY_WX = _.SERVER_ADDRESS_WX + 'item/redpackage_apply'),
        (_.REPACKAGE_QUERY_WX = _.SERVER_ADDRESS_WX + 'item/redpackage_query'),
        (_.REPACKAGE_ACCEPT_WX = _.SERVER_ADDRESS_WX + 'item/redpackage_get'),
        (_.REPACKAGE_CANCEL_WX =
          _.SERVER_ADDRESS_WX + 'item/redpackage_cancel'),
        (_.BILL_APPLY_WX = _.SERVER_ADDRESS_WX + 'item/splitbill_apply'),
        (_.BILL_QUERY_WX = _.SERVER_ADDRESS_WX + 'item/splitbill_query'),
        (_.BILL_SATISFY_WX = _.SERVER_ADDRESS_WX + 'item/splitbill_put'),
        (_.BILL_CANCEL_WX = _.SERVER_ADDRESS_WX + 'item/splitbill_cancel'),
        (_.RANK_SAVE_WX = _.SERVER_ADDRESS_WX + 'rank/save'),
        (_.RANK_QUERY_WX = _.SERVER_ADDRESS_WX + 'rank/query'),
        (_.RANK_QUERY_TOP_WX = _.SERVER_ADDRESS_WX + 'rank/query_top'),
        (_.RANK_QUERY_TOP_SELF_WX =
          _.SERVER_ADDRESS_WX + 'rank/query_top_self'),
        (_.RANK_QUERY_SCORE_WX = _.SERVER_ADDRESS_WX + 'rank/query_score'),
        (_.RANK_QUERY_INFO_WX = _.SERVER_ADDRESS_WX + 'rank/info'),
        (_.RANK_QUERY_SELF_RECORD =
          _.SERVER_ADDRESS_WX + 'score/personal_record'),
        (_.RANK_QUERY_OTHER_RECORD =
          _.SERVER_ADDRESS_WX + 'score/personal_record_query'),
        (_.COOPERATION_QUERY_SCORE = _.SERVER_ADDRESS_WX + 'score/cooperation'),
        (_.CHALLENGE_COMPETITION_BLACK_LIST =
          _.SERVER_ADDRESS_WX + 'blacklist/query'),
        (_.INVITATION_CODE =
          _.SERVER_ADDRESS_WX + 'cooperation/invitation_code'),
        (_.USER_INFO_GET_WX = _.SERVER_ADDRESS_WX + 'userinfo/get'),
        (_.SERVER_ADDRESS_BASE_FB = 'https://instantgame.cmcm.com/'),
        (_.REGISTER_FB =
          (_.SERVER_ADDRESS_FB = 'https://instantgame.cmcm.com/warty/') +
          'auth/register/fb'),
        (_.SET_STORAGE_FB = _.SERVER_ADDRESS_FB + 'storage/dy/set'),
        (_.GET_STORAGE_FB = _.SERVER_ADDRESS_FB + 'storage/dy/get'),
        (_.DEL_STORAGE_FB = _.SERVER_ADDRESS_FB + 'storage/dy/del'),
        (_.SCORE_REPORT_FB = _.SERVER_ADDRESS_FB + 'score/dy/report'),
        (_.SCORE_QUERY_FB = _.SERVER_ADDRESS_FB + 'score/dy/query'),
        (_.GET_SERVER_TIMESTAMP_FB = _.SERVER_ADDRESS_BASE_FB + 'common/time'),
        (_.UPLOAD_PLAYER_FRINEDS_FB =
          _.SERVER_ADDRESS_WX + 'friend/report_relation'),
        (_.SAVE_WORLD_RANK_FB =
          (_.SERVER_ADDRESS_WORLD_RANK_FB = 'http://10.12.32.113:80/warty/') +
          'rank/save'),
        (_.QUERY_WORLD_RANK_FB = _.SERVER_ADDRESS_WORLD_RANK_FB + 'rank/query'),
        (_.QUERY_TOP_WORLD_RANK_FB =
          _.SERVER_ADDRESS_WORLD_RANK_FB + 'rank/query_top'),
        (_.METHOD_GET = 'GET'),
        (_.METHOD_HEAD = 'HEAD'),
        (_.METHOD_POST = 'POST'),
        (_.METHOD_PUT = 'PUT'),
        (_.METHOD_DELETE = 'DELETE'),
        (_.METHOD_TRACE = 'TRACE'),
        (_.METHOD_CONNECT = 'CONNECT'),
        (_.sTimeDifference = 0),
        _
      );
    })();
    u.CloudUtil = e;
  })(cmg || (cmg = {})),
  (function (r) {
    var e = (function () {
      function e() {}
      return (
        (e.initializeAsync = function (t) {
          FBInstant.initializeAsync().then(
            function () {
              (e.sPlayerId = FBInstant.player.getID()), t && t(!0);
            },
            function (e) {
              t && t(null);
            },
          );
        }),
        (e.shareAsync = function (e, t, r, a, o) {
          FBInstant.shareAsync({
            intent: e,
            image: t,
            text: r,
            data: a,
          }).then(
            function () {
              o && o(!0);
            },
            function (e) {
              o(!1);
            },
          );
        }),
        (e.getFriendsPlayerInfo = function (t) {
          if (t) {
            r.Platform.log('FBHelper: getFriendsPlayerInfo called');
            FBInstant.player
              .getConnectedPlayersAsync()
              .then(function (e) {
                r.Platform.log('FBHelper: getConnectedPlayersAsync then ' + e),
                  t(e);
              })
              .catch(function (e) {
                r.Platform.log(
                  'FBHelper: getConnectedPlayersAsync error: ' + e,
                ),
                  r.Platform.logObject(e);
              });
          }
        }),
        e
      );
    })();
    r.FBHelper = e;
  })(cmg || (cmg = {})),
  (function (e) {
    var t = (function () {
      function _() {
        (this._state = new Int32Array(4)),
          (this._buffer = new ArrayBuffer(68)),
          (this._buffer8 = new Uint8Array(this._buffer, 0, 68)),
          (this._buffer32 = new Uint32Array(this._buffer, 0, 17)),
          this.start();
      }
      return (
        (_.hashStr = function (e, t) {
          return (
            void 0 === t && (t = !1),
            this.onePassHasher.start().appendStr(e).end(t)
          );
        }),
        (_.hashAsciiStr = function (e, t) {
          return (
            void 0 === t && (t = !1),
            this.onePassHasher.start().appendAsciiStr(e).end(t)
          );
        }),
        (_._hex = function (e) {
          var t,
            r,
            a,
            o,
            n = _.hexChars,
            i = _.hexOut;
          for (o = 0; o < 4; o += 1)
            for (r = 8 * o, t = e[o], a = 0; a < 8; a += 2)
              (i[r + 1 + a] = n.charAt(15 & t)),
                (t >>>= 4),
                (i[r + 0 + a] = n.charAt(15 & t)),
                (t >>>= 4);
          return i.join('');
        }),
        (_._md5cycle = function (e, t) {
          var r = e[0],
            a = e[1],
            o = e[2],
            n = e[3];
          (a =
            ((((a +=
              ((((o =
                ((((o +=
                  ((((n =
                    ((((n +=
                      ((((r =
                        ((((r +=
                          (((a & o) | (~a & n)) + t[0] - 680876936) | 0) <<
                          7) |
                          (r >>> 25)) +
                          a) |
                        0) &
                        a) |
                        (~r & o)) +
                        t[1] -
                        389564586) |
                      0) <<
                      12) |
                      (n >>> 20)) +
                      r) |
                    0) &
                    r) |
                    (~n & a)) +
                    t[2] +
                    606105819) |
                  0) <<
                  17) |
                  (o >>> 15)) +
                  n) |
                0) &
                n) |
                (~o & r)) +
                t[3] -
                1044525330) |
              0) <<
              22) |
              (a >>> 10)) +
              o) |
            0),
            (a =
              ((((a +=
                ((((o =
                  ((((o +=
                    ((((n =
                      ((((n +=
                        ((((r =
                          ((((r +=
                            (((a & o) | (~a & n)) + t[4] - 176418897) | 0) <<
                            7) |
                            (r >>> 25)) +
                            a) |
                          0) &
                          a) |
                          (~r & o)) +
                          t[5] +
                          1200080426) |
                        0) <<
                        12) |
                        (n >>> 20)) +
                        r) |
                      0) &
                      r) |
                      (~n & a)) +
                      t[6] -
                      1473231341) |
                    0) <<
                    17) |
                    (o >>> 15)) +
                    n) |
                  0) &
                  n) |
                  (~o & r)) +
                  t[7] -
                  45705983) |
                0) <<
                22) |
                (a >>> 10)) +
                o) |
              0),
            (a =
              ((((a +=
                ((((o =
                  ((((o +=
                    ((((n =
                      ((((n +=
                        ((((r =
                          ((((r +=
                            (((a & o) | (~a & n)) + t[8] + 1770035416) | 0) <<
                            7) |
                            (r >>> 25)) +
                            a) |
                          0) &
                          a) |
                          (~r & o)) +
                          t[9] -
                          1958414417) |
                        0) <<
                        12) |
                        (n >>> 20)) +
                        r) |
                      0) &
                      r) |
                      (~n & a)) +
                      t[10] -
                      42063) |
                    0) <<
                    17) |
                    (o >>> 15)) +
                    n) |
                  0) &
                  n) |
                  (~o & r)) +
                  t[11] -
                  1990404162) |
                0) <<
                22) |
                (a >>> 10)) +
                o) |
              0),
            (a =
              ((((a +=
                ((((o =
                  ((((o +=
                    ((((n =
                      ((((n +=
                        ((((r =
                          ((((r +=
                            (((a & o) | (~a & n)) + t[12] + 1804603682) | 0) <<
                            7) |
                            (r >>> 25)) +
                            a) |
                          0) &
                          a) |
                          (~r & o)) +
                          t[13] -
                          40341101) |
                        0) <<
                        12) |
                        (n >>> 20)) +
                        r) |
                      0) &
                      r) |
                      (~n & a)) +
                      t[14] -
                      1502002290) |
                    0) <<
                    17) |
                    (o >>> 15)) +
                    n) |
                  0) &
                  n) |
                  (~o & r)) +
                  t[15] +
                  1236535329) |
                0) <<
                22) |
                (a >>> 10)) +
                o) |
              0),
            (a =
              ((((a +=
                ((((o =
                  ((((o +=
                    ((((n =
                      ((((n +=
                        ((((r =
                          ((((r +=
                            (((a & n) | (o & ~n)) + t[1] - 165796510) | 0) <<
                            5) |
                            (r >>> 27)) +
                            a) |
                          0) &
                          o) |
                          (a & ~o)) +
                          t[6] -
                          1069501632) |
                        0) <<
                        9) |
                        (n >>> 23)) +
                        r) |
                      0) &
                      a) |
                      (r & ~a)) +
                      t[11] +
                      643717713) |
                    0) <<
                    14) |
                    (o >>> 18)) +
                    n) |
                  0) &
                  r) |
                  (n & ~r)) +
                  t[0] -
                  373897302) |
                0) <<
                20) |
                (a >>> 12)) +
                o) |
              0),
            (a =
              ((((a +=
                ((((o =
                  ((((o +=
                    ((((n =
                      ((((n +=
                        ((((r =
                          ((((r +=
                            (((a & n) | (o & ~n)) + t[5] - 701558691) | 0) <<
                            5) |
                            (r >>> 27)) +
                            a) |
                          0) &
                          o) |
                          (a & ~o)) +
                          t[10] +
                          38016083) |
                        0) <<
                        9) |
                        (n >>> 23)) +
                        r) |
                      0) &
                      a) |
                      (r & ~a)) +
                      t[15] -
                      660478335) |
                    0) <<
                    14) |
                    (o >>> 18)) +
                    n) |
                  0) &
                  r) |
                  (n & ~r)) +
                  t[4] -
                  405537848) |
                0) <<
                20) |
                (a >>> 12)) +
                o) |
              0),
            (a =
              ((((a +=
                ((((o =
                  ((((o +=
                    ((((n =
                      ((((n +=
                        ((((r =
                          ((((r +=
                            (((a & n) | (o & ~n)) + t[9] + 568446438) | 0) <<
                            5) |
                            (r >>> 27)) +
                            a) |
                          0) &
                          o) |
                          (a & ~o)) +
                          t[14] -
                          1019803690) |
                        0) <<
                        9) |
                        (n >>> 23)) +
                        r) |
                      0) &
                      a) |
                      (r & ~a)) +
                      t[3] -
                      187363961) |
                    0) <<
                    14) |
                    (o >>> 18)) +
                    n) |
                  0) &
                  r) |
                  (n & ~r)) +
                  t[8] +
                  1163531501) |
                0) <<
                20) |
                (a >>> 12)) +
                o) |
              0),
            (a =
              ((((a +=
                ((((o =
                  ((((o +=
                    ((((n =
                      ((((n +=
                        ((((r =
                          ((((r +=
                            (((a & n) | (o & ~n)) + t[13] - 1444681467) | 0) <<
                            5) |
                            (r >>> 27)) +
                            a) |
                          0) &
                          o) |
                          (a & ~o)) +
                          t[2] -
                          51403784) |
                        0) <<
                        9) |
                        (n >>> 23)) +
                        r) |
                      0) &
                      a) |
                      (r & ~a)) +
                      t[7] +
                      1735328473) |
                    0) <<
                    14) |
                    (o >>> 18)) +
                    n) |
                  0) &
                  r) |
                  (n & ~r)) +
                  t[12] -
                  1926607734) |
                0) <<
                20) |
                (a >>> 12)) +
                o) |
              0),
            (a =
              ((((a +=
                (((o =
                  ((((o +=
                    (((n =
                      ((((n +=
                        (((r =
                          ((((r += ((a ^ o ^ n) + t[5] - 378558) | 0) << 4) |
                            (r >>> 28)) +
                            a) |
                          0) ^
                          a ^
                          o) +
                          t[8] -
                          2022574463) |
                        0) <<
                        11) |
                        (n >>> 21)) +
                        r) |
                      0) ^
                      r ^
                      a) +
                      t[11] +
                      1839030562) |
                    0) <<
                    16) |
                    (o >>> 16)) +
                    n) |
                  0) ^
                  n ^
                  r) +
                  t[14] -
                  35309556) |
                0) <<
                23) |
                (a >>> 9)) +
                o) |
              0),
            (a =
              ((((a +=
                (((o =
                  ((((o +=
                    (((n =
                      ((((n +=
                        (((r =
                          ((((r += ((a ^ o ^ n) + t[1] - 1530992060) | 0) <<
                            4) |
                            (r >>> 28)) +
                            a) |
                          0) ^
                          a ^
                          o) +
                          t[4] +
                          1272893353) |
                        0) <<
                        11) |
                        (n >>> 21)) +
                        r) |
                      0) ^
                      r ^
                      a) +
                      t[7] -
                      155497632) |
                    0) <<
                    16) |
                    (o >>> 16)) +
                    n) |
                  0) ^
                  n ^
                  r) +
                  t[10] -
                  1094730640) |
                0) <<
                23) |
                (a >>> 9)) +
                o) |
              0),
            (a =
              ((((a +=
                (((o =
                  ((((o +=
                    (((n =
                      ((((n +=
                        (((r =
                          ((((r += ((a ^ o ^ n) + t[13] + 681279174) | 0) <<
                            4) |
                            (r >>> 28)) +
                            a) |
                          0) ^
                          a ^
                          o) +
                          t[0] -
                          358537222) |
                        0) <<
                        11) |
                        (n >>> 21)) +
                        r) |
                      0) ^
                      r ^
                      a) +
                      t[3] -
                      722521979) |
                    0) <<
                    16) |
                    (o >>> 16)) +
                    n) |
                  0) ^
                  n ^
                  r) +
                  t[6] +
                  76029189) |
                0) <<
                23) |
                (a >>> 9)) +
                o) |
              0),
            (a =
              ((((a +=
                (((o =
                  ((((o +=
                    (((n =
                      ((((n +=
                        (((r =
                          ((((r += ((a ^ o ^ n) + t[9] - 640364487) | 0) << 4) |
                            (r >>> 28)) +
                            a) |
                          0) ^
                          a ^
                          o) +
                          t[12] -
                          421815835) |
                        0) <<
                        11) |
                        (n >>> 21)) +
                        r) |
                      0) ^
                      r ^
                      a) +
                      t[15] +
                      530742520) |
                    0) <<
                    16) |
                    (o >>> 16)) +
                    n) |
                  0) ^
                  n ^
                  r) +
                  t[2] -
                  995338651) |
                0) <<
                23) |
                (a >>> 9)) +
                o) |
              0),
            (a =
              ((((a +=
                (((n =
                  ((((n +=
                    ((a ^
                      ((r =
                        ((((r += ((o ^ (a | ~n)) + t[0] - 198630844) | 0) <<
                          6) |
                          (r >>> 26)) +
                          a) |
                        0) |
                        ~o)) +
                      t[7] +
                      1126891415) |
                    0) <<
                    10) |
                    (n >>> 22)) +
                    r) |
                  0) ^
                  ((o =
                    ((((o += ((r ^ (n | ~a)) + t[14] - 1416354905) | 0) << 15) |
                      (o >>> 17)) +
                      n) |
                    0) |
                    ~r)) +
                  t[5] -
                  57434055) |
                0) <<
                21) |
                (a >>> 11)) +
                o) |
              0),
            (a =
              ((((a +=
                (((n =
                  ((((n +=
                    ((a ^
                      ((r =
                        ((((r += ((o ^ (a | ~n)) + t[12] + 1700485571) | 0) <<
                          6) |
                          (r >>> 26)) +
                          a) |
                        0) |
                        ~o)) +
                      t[3] -
                      1894986606) |
                    0) <<
                    10) |
                    (n >>> 22)) +
                    r) |
                  0) ^
                  ((o =
                    ((((o += ((r ^ (n | ~a)) + t[10] - 1051523) | 0) << 15) |
                      (o >>> 17)) +
                      n) |
                    0) |
                    ~r)) +
                  t[1] -
                  2054922799) |
                0) <<
                21) |
                (a >>> 11)) +
                o) |
              0),
            (a =
              ((((a +=
                (((n =
                  ((((n +=
                    ((a ^
                      ((r =
                        ((((r += ((o ^ (a | ~n)) + t[8] + 1873313359) | 0) <<
                          6) |
                          (r >>> 26)) +
                          a) |
                        0) |
                        ~o)) +
                      t[15] -
                      30611744) |
                    0) <<
                    10) |
                    (n >>> 22)) +
                    r) |
                  0) ^
                  ((o =
                    ((((o += ((r ^ (n | ~a)) + t[6] - 1560198380) | 0) << 15) |
                      (o >>> 17)) +
                      n) |
                    0) |
                    ~r)) +
                  t[13] +
                  1309151649) |
                0) <<
                21) |
                (a >>> 11)) +
                o) |
              0),
            (a =
              ((((a +=
                (((n =
                  ((((n +=
                    ((a ^
                      ((r =
                        ((((r += ((o ^ (a | ~n)) + t[4] - 145523070) | 0) <<
                          6) |
                          (r >>> 26)) +
                          a) |
                        0) |
                        ~o)) +
                      t[11] -
                      1120210379) |
                    0) <<
                    10) |
                    (n >>> 22)) +
                    r) |
                  0) ^
                  ((o =
                    ((((o += ((r ^ (n | ~a)) + t[2] + 718787259) | 0) << 15) |
                      (o >>> 17)) +
                      n) |
                    0) |
                    ~r)) +
                  t[9] -
                  343485551) |
                0) <<
                21) |
                (a >>> 11)) +
                o) |
              0),
            (e[0] = (r + e[0]) | 0),
            (e[1] = (a + e[1]) | 0),
            (e[2] = (o + e[2]) | 0),
            (e[3] = (n + e[3]) | 0);
        }),
        (_.prototype.start = function () {
          return (
            (this._dataLength = 0),
            (this._bufferLength = 0),
            this._state.set(_.stateIdentity),
            this
          );
        }),
        (_.prototype.appendStr = function (e) {
          var t,
            r,
            a = this._buffer8,
            o = this._buffer32,
            n = this._bufferLength;
          for (r = 0; r < e.length; r += 1) {
            if ((t = e.charCodeAt(r)) < 128) a[n++] = t;
            else if (t < 2048)
              (a[n++] = 192 + (t >>> 6)), (a[n++] = (63 & t) | 128);
            else if (t < 55296 || 56319 < t)
              (a[n++] = 224 + (t >>> 12)),
                (a[n++] = ((t >>> 6) & 63) | 128),
                (a[n++] = (63 & t) | 128);
            else {
              if (
                1114111 <
                (t = 1024 * (t - 55296) + (e.charCodeAt(++r) - 56320) + 65536)
              )
                throw new Error(
                  'Unicode standard supports code points up to U+10FFFF',
                );
              (a[n++] = 240 + (t >>> 18)),
                (a[n++] = ((t >>> 12) & 63) | 128),
                (a[n++] = ((t >>> 6) & 63) | 128),
                (a[n++] = (63 & t) | 128);
            }
            64 <= n &&
              ((this._dataLength += 64),
              _._md5cycle(this._state, o),
              (n -= 64),
              (o[0] = o[16]));
          }
          return (this._bufferLength = n), this;
        }),
        (_.prototype.appendAsciiStr = function (e) {
          for (
            var t,
              r = this._buffer8,
              a = this._buffer32,
              o = this._bufferLength,
              n = 0;
            ;

          ) {
            for (t = Math.min(e.length - n, 64 - o); t--; )
              r[o++] = e.charCodeAt(n++);
            if (o < 64) break;
            (this._dataLength += 64), _._md5cycle(this._state, a), (o = 0);
          }
          return (this._bufferLength = o), this;
        }),
        (_.prototype.appendByteArray = function (e) {
          for (
            var t,
              r = this._buffer8,
              a = this._buffer32,
              o = this._bufferLength,
              n = 0;
            ;

          ) {
            for (t = Math.min(e.length - n, 64 - o); t--; ) r[o++] = e[n++];
            if (o < 64) break;
            (this._dataLength += 64), _._md5cycle(this._state, a), (o = 0);
          }
          return (this._bufferLength = o), this;
        }),
        (_.prototype.getState = function () {
          var e = this._state;
          return {
            buffer: String.fromCharCode.apply(null, this._buffer8),
            buflen: this._bufferLength,
            length: this._dataLength,
            state: [e[0], e[1], e[2], e[3]],
          };
        }),
        (_.prototype.setState = function (e) {
          var t,
            r = e.buffer,
            a = e.state,
            o = this._state;
          for (
            this._dataLength = e.length,
              this._bufferLength = e.buflen,
              o[0] = a[0],
              o[1] = a[1],
              o[2] = a[2],
              o[3] = a[3],
              t = 0;
            t < r.length;
            t += 1
          )
            this._buffer8[t] = r.charCodeAt(t);
        }),
        (_.prototype.end = function (e) {
          void 0 === e && (e = !1);
          var t,
            r = this._bufferLength,
            a = this._buffer8,
            o = this._buffer32,
            n = 1 + (r >> 2);
          if (
            ((this._dataLength += r),
            (a[r] = 128),
            (a[r + 1] = a[r + 2] = a[r + 3] = 0),
            o.set(_.buffer32Identity.subarray(n), n),
            55 < r && (_._md5cycle(this._state, o), o.set(_.buffer32Identity)),
            (t = 8 * this._dataLength) <= 4294967295)
          )
            o[14] = t;
          else {
            var i = t.toString(16).match(/(.*?)(.{0,8})$/);
            if (null === i) return;
            var l = parseInt(i[2], 16),
              s = parseInt(i[1], 16) || 0;
            (o[14] = l), (o[15] = s);
          }
          return (
            _._md5cycle(this._state, o), e ? this._state : _._hex(this._state)
          );
        }),
        (_.stateIdentity = new Int32Array([
          1732584193, -271733879, -1732584194, 271733878,
        ])),
        (_.buffer32Identity = new Int32Array([
          0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ])),
        (_.hexChars = '0123456789abcdef'),
        (_.hexOut = []),
        (_.onePassHasher = new _()),
        _
      );
    })();
    '5d41402abc4b2a76b9719d911017c592' !== (e.Md5 = t).hashStr('hello') &&
      console.error('Md5 self test failed.');
  })(cmg || (cmg = {})),
  (function (s) {
    var e = (function () {
      function l() {
        this.isUseLocalTime = !1;
      }
      return (
        (l.toJsonString = function (e) {
          if (null == e || null == e) return '';
          try {
            return JSON.stringify(e);
          } catch (e) {
            return '';
          }
        }),
        (l.log = function (e) {
          for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r];
          l.isPrintLog &&
            (cc.sys.platform === cc.sys.QQ_PLAY
              ? BK.Script.log(
                  1,
                  1,
                  '[qqplay_release_log]  msg: ' +
                    e +
                    ' subst: ' +
                    this.toJsonString(t),
                )
              : console.log(e, t));
        }),
        (l.warn = function (e) {
          for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r];
          l.isPrintLog &&
            (cc.sys.platform === cc.sys.QQ_PLAY
              ? BK.Script.log(
                  1,
                  1,
                  '[qqplay_release_log]  msg: ' +
                    e +
                    ' subst: ' +
                    this.toJsonString(t),
                )
              : console.warn(e, t));
        }),
        (l.error = function (e) {
          for (var t = [], r = 1; r < arguments.length; r++)
            t[r - 1] = arguments[r];
          l.isPrintLog &&
            (cc.sys.platform === cc.sys.QQ_PLAY
              ? BK.Script.log(
                  1,
                  1,
                  '[qqplay_release_log]  msg: ' +
                    e +
                    ' subst: ' +
                    this.toJsonString(t),
                )
              : console.error(e, t));
        }),
        (l.printCallStack = function () {
          for (
            var e = 0, t = arguments.callee;
            (t = t.arguments.callee.caller), console.log(++e + ': ' + t), t;

          );
        }),
        (l.logObject = function (e) {
          var t = '';
          for (var r in e) t += r + ':' + e[r] + ';   ';
          l.log(t);
        }),
        (l.doWait = function (r) {
          return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (e) {
              return [
                2,
                new Promise(function (e, t) {
                  setTimeout(function () {
                    e();
                  }, r);
                }),
              ];
            });
          });
        }),
        (l.prototype.init = function (e, t, r, a, o, n, i) {
          i && (s.CloudUtil.useTestServer(), (l.isPrintLog = !0)),
            l.log(
              'Platform::init appId(' +
                e +
                ') version(' +
                t +
                ') gameId(' +
                r +
                ') platform(' +
                s.platform +
                ')',
            ),
            (s.CloudUtil.GAME_ID = r),
            (s.CloudUtil.sPlayerInfo = new s.PlayerInfo()),
            (s.CloudUtil.sPlayerInfo.playerId = o),
            (s.CloudUtil.sPlayerInfo.token = n),
            (l.mPlatformType = a),
            (this.mAdapter = l.createAdapter(a)),
            this.mAdapter.init(e, t, i);
        }),
        (l.prototype.exitGame = function (e) {
          l.log('Platform::exitGame'),
            this.mAdapter && this.mAdapter.exitGame(e);
        }),
        (l.prototype.networkRequest = function (e) {
          if (this.mAdapter) return this.mAdapter.networkRequest(e);
          e.callback && e.callback(!1, null);
        }),
        (l.prototype.reportScore = function (e, t, r, a, o) {
          void 0 === o && (o = !1),
            this.mAdapter
              ? this.mAdapter.reportScore(e, t, r, a, o)
              : a && a(!1);
        }),
        (l.prototype.queryFriendsScore = function (e, t, r) {
          void 0 === r && (r = !1),
            this.mAdapter
              ? this.mAdapter.queryFriendsScore(e, t, r)
              : t && t(!1, e, null);
        }),
        (l.prototype.saveWorldRank = function (e, t, r, a, o) {
          void 0 === o && (o = !1),
            this.mAdapter
              ? this.mAdapter.saveWorldRank(e, t, r, a, o)
              : a && a(!1);
        }),
        (l.prototype.queryWorldRank = function (e, t, r) {
          void 0 === r && (r = !1),
            this.mAdapter
              ? this.mAdapter.queryWorldRank(e, t, r)
              : t && t(!1, 0, 0, 0, null);
        }),
        (l.prototype.queryTopWorldRank = function (e, t, r) {
          void 0 === r && (r = !1),
            this.mAdapter
              ? this.mAdapter.queryTopWorldRank(e, t, r)
              : t && t(!1, null);
        }),
        (l.prototype.getRankName = function (e, t) {
          if (t) {
            var r = s.CloudUtil.getCurrentServerTime();
            l.log('[cmg]getRankName, currentServerTime：' + r);
            var a = new Date(r).getFullYear().toString(),
              o = s.CloudUtil.getYearWeekIndex(r);
            4 == a.length && (a = a.substr(2, 2)),
              (e = 'weekly_' + e + '_' + a + '_' + o.toString());
          } else e = 'ever_' + e;
          return l.log('[cmg]getRankName,rankName:' + e), e.toLocaleLowerCase();
        }),
        (l.prototype.reportShare = function (e, t, r, a) {
          void 0 === r && (r = 5),
            void 0 === a && (a = 99),
            this.mAdapter
              ? this.mAdapter.reportShare(e, t, r, a)
              : t && t(!1, !1, 'adapter is null', 0, '', '');
        }),
        (l.prototype.queryShare = function (e) {
          this.mAdapter ? this.mAdapter.queryShare(e) : e && e(!1, '', null);
        }),
        (l.prototype.reportShareCompetition = function (e, t, r, a, o) {
          void 0 === r && (r = 3),
            void 0 === a && (a = 99),
            void 0 === o && (o = '2200'),
            this.mAdapter
              ? this.mAdapter.reportShareCompetition(e, t, r, a, o)
              : t && t(!1, !1, 'adapter is null', 0, '', '');
        }),
        (l.prototype.queryShareCompetition = function (e, t) {
          void 0 === t && (t = '2200'),
            this.mAdapter
              ? this.mAdapter.queryShareCompetition(e, t)
              : e && e(!1, '', null);
        }),
        (l.prototype.reportShareSkin = function (e, t, r, a) {
          this.mAdapter
            ? this.mAdapter.reportShareSkin(e, t, r, a)
            : t && t(!1, !1, 'adapter is null', 0, '', '');
        }),
        (l.prototype.queryShareSkin = function (e) {
          this.mAdapter
            ? this.mAdapter.queryShareSkin(e)
            : e && e(!1, '', null);
        }),
        (l.prototype.reportShareHdReport = function (e, t, r, a, o) {
          this.mAdapter
            ? this.mAdapter.reportShareHdReport(e, t, r, a, o)
            : o && o(!1, !1, 'adapter is null', 0, '', '');
        }),
        (l.prototype.shareHdQuery = function (e, t) {
          this.mAdapter ? this.mAdapter.shareHdQuery(e, t) : t && t(!1, null);
        }),
        (l.prototype.shareQueryBatch = function (e, t) {
          this.mAdapter
            ? this.mAdapter.shareQueryBatch(e, t)
            : t && t(!1, null);
        }),
        (l.prototype.queryMusicPeopleNums = function (e, t) {
          this.mAdapter
            ? this.mAdapter.queryMusicPeopleNums(e, t)
            : t && t(!1, null);
        }),
        (l.prototype.addItems = function (e, t) {
          this.mAdapter.addItems(e, t);
        }),
        (l.prototype.queryItems = function (e) {
          this.mAdapter.queryItems(e);
        }),
        (l.prototype.applyGive = function (e, t) {
          this.mAdapter.applyGive(e, t);
        }),
        (l.prototype.queryGive = function (e, t) {
          this.mAdapter.queryGive(e, t);
        }),
        (l.prototype.acceptGive = function (e, t) {
          this.mAdapter.acceptGive(e, t);
        }),
        (l.prototype.cancelGive = function (e, t) {
          this.mAdapter.cancelGive(e, t);
        }),
        (l.prototype.applyDemand = function (e, t) {
          this.mAdapter.applyDemand(e, t);
        }),
        (l.prototype.queryDemand = function (e, t) {
          this.mAdapter.queryDemand(e, t);
        }),
        (l.prototype.satisfyDemand = function (e, t) {
          this.mAdapter.satisfyDemand(e, t);
        }),
        (l.prototype.cancelDemand = function (e, t) {
          this.mAdapter.cancelDemand(e, t);
        }),
        (l.prototype.pushCommonMessage = function (e, t, r, a) {
          return this.mAdapter
            ? this.mAdapter.pushCommonMessage(e, t, r, a)
            : (a && a(!1, null), null);
        }),
        (l.prototype.saveChallengeRank = function (e, t, r, a, o) {
          this.mAdapter.saveChallengeRank(e, t, r, a, o);
        }),
        (l.prototype.queryChallengeSelf = function (e, t) {
          this.mAdapter.queryChallengeSelf(e, t);
        }),
        (l.prototype.queryChallengeTop = function (e, t, r) {
          this.mAdapter.queryChallengeTop(e, t, r);
        }),
        (l.prototype.queryChallengeTopSelf = function (e, t, r) {
          this.mAdapter.queryChallengeTopSelf(e, t, r);
        }),
        (l.prototype.queryChallengeScore = function (e, t, r, a) {
          this.mAdapter.queryChallengeScore(e, t, r, a);
        }),
        (l.prototype.queryChallengeInfo = function (e, t) {
          this.mAdapter.queryChallengeInfo(e, t);
        }),
        (l.prototype.checkInBlackList = function (e) {
          this.mAdapter.checkInBlackList(e);
        }),
        (l.createAdapter = function (e) {
          switch (e) {
            case l.PLATFORM_WECHAT:
              return new s.AdapterWX();
            case l.PLATFORM_FACEBOOK:
              return new s.AdapterFB();
            case l.PLATFORM_H5SDK:
              return new s.AdapterH5SDK();
            case l.PLATFORM_QQPLAY:
              return new s.AdapterQQ();
            case l.PLATFORM_QQHALL:
              return new s.AdapterGameHall();
            case l.PLATFORM_QQPLAY_H5:
              return new s.AdapterQQH5();
            case l.PLATFORM_CMPLAY:
              return new s.AdapterCMPlay();
            default:
              return new s.AdapterWeb();
          }
        }),
        (l.prototype.queryChallengeSelfRecord = function (e, t, r, a, o) {
          this.mAdapter.queryChallengeSelfRecord(e, t, r, a, o);
        }),
        (l.prototype.queryChallengeOtherRecord = function (e, t, r, a, o, n) {
          this.mAdapter.queryChallengeOtherRecord(e, t, r, a, o, n);
        }),
        (l.prototype.queryCooperationScore = function (e, t) {
          this.mAdapter.queryCooperationScore(e, t);
        }),
        (l.prototype.queryInvitationCode = function (e, t) {
          this.mAdapter.queryInvitationCode(e, t);
        }),
        (l.prototype.getServerUserInfo = function (e) {
          this.mAdapter.getServerUserInfo(e);
        }),
        (l.prototype.uploadFile = function (e, t) {
          this.mAdapter ? this.mAdapter.uploadFile(e, t) : t && t(-1, '');
        }),
        (l.prototype.queryUserInfoLevel = function (e, t) {
          this.mAdapter.queryUserInfoLevel(e, t);
        }),
        (l.prototype.uploadPlayerFriends = function (e, t) {
          this.mAdapter.uploadPlayerFriends(e, t);
        }),
        (l.PLATFORM_UNKNOWN = -1),
        (l.PLATFORM_WEB = 0),
        (l.PLATFORM_WECHAT = 1),
        (l.PLATFORM_FACEBOOK = 2),
        (l.PLATFORM_H5SDK = 3),
        (l.PLATFORM_QQPLAY = 4),
        (l.PLATFORM_QQHALL = 5),
        (l.PLATFORM_QQPLAY_H5 = 6),
        (l.PLATFORM_CMPLAY = 7),
        (l.isPrintLog = !1),
        l
      );
    })();
    (s.Platform = e), (s.platform = new e());
  })(cmg || (cmg = {})),
  (window.cmg = cmg),
  (window.platform = cmg.platform),
  (function (e) {
    var n = 0,
      i = '';

    function t(e) {
      return o(r(_(e)));
    }

    function r(e) {
      return c(d(u(e), 8 * e.length));
    }

    function a(e, t) {
      var r = u(e);
      16 < r.length && (r = d(r, 8 * e.length));
      for (var a = Array(16), o = Array(16), n = 0; n < 16; n++)
        (a[n] = 909522486 ^ r[n]), (o[n] = 1549556828 ^ r[n]);
      var i = d(a.concat(u(t)), 512 + 8 * t.length);
      return c(d(o.concat(i), 672));
    }

    function o(e) {
      for (
        var t, r = n ? '0123456789ABCDEF' : '0123456789abcdef', a = '', o = 0;
        o < e.length;
        o++
      )
        (t = e.charCodeAt(o)),
          (a += r.charAt((t >>> 4) & 15) + r.charAt(15 & t));
      return a;
    }

    function l(e) {
      for (var t = '', r = e.length, a = 0; a < r; a += 3)
        for (
          var o =
              (e.charCodeAt(a) << 16) |
              (a + 1 < r ? e.charCodeAt(a + 1) << 8 : 0) |
              (a + 2 < r ? e.charCodeAt(a + 2) : 0),
            n = 0;
          n < 4;
          n++
        )
          8 * a + 6 * n > 8 * e.length
            ? (t += i)
            : (t +=
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(
                  (o >>> (6 * (3 - n))) & 63,
                ));
      return t;
    }

    function s(e, t) {
      var r,
        a,
        o,
        n,
        i = t.length,
        l = Array(),
        s = Array(Math.ceil(e.length / 2));
      for (r = 0; r < s.length; r++)
        s[r] = (e.charCodeAt(2 * r) << 8) | e.charCodeAt(2 * r + 1);
      for (; 0 < s.length; ) {
        for (n = Array(), r = o = 0; r < s.length; r++)
          (o = (o << 16) + s[r]),
            (o -= (a = Math.floor(o / i)) * i),
            (0 < n.length || 0 < a) && (n[n.length] = a);
        (l[l.length] = o), (s = n);
      }
      var _ = '';
      for (r = l.length - 1; 0 <= r; r--) _ += t.charAt(l[r]);
      var u = Math.ceil((8 * e.length) / (Math.log(t.length) / Math.log(2)));
      for (r = _.length; r < u; r++) _ = t[0] + _;
      return _;
    }

    function _(e) {
      for (var t, r, a = '', o = -1; ++o < e.length; )
        (t = e.charCodeAt(o)),
          (r = o + 1 < e.length ? e.charCodeAt(o + 1) : 0),
          55296 <= t &&
            t <= 56319 &&
            56320 <= r &&
            r <= 57343 &&
            ((t = 65536 + ((1023 & t) << 10) + (1023 & r)), o++),
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

    function u(e) {
      for (var t = Array(e.length >> 2), r = 0; r < t.length; r++) t[r] = 0;
      for (r = 0; r < 8 * e.length; r += 8)
        t[r >> 5] |= (255 & e.charCodeAt(r / 8)) << (24 - (r % 32));
      return t;
    }

    function c(e) {
      for (var t = '', r = 0; r < 32 * e.length; r += 8)
        t += String.fromCharCode((e[r >> 5] >>> (24 - (r % 32))) & 255);
      return t;
    }

    function d(e, t) {
      (e[t >> 5] |= 128 << (24 - (t % 32))),
        (e[15 + (((t + 64) >> 9) << 4)] = t);
      for (
        var r,
          a = Array(80),
          o = 1732584193,
          n = -271733879,
          i = -1732584194,
          l = 271733878,
          s = -1009589776,
          _ = 0;
        _ < e.length;
        _ += 16
      ) {
        for (var u = o, c = n, d = i, p = l, E = s, R = 0; R < 80; R++) {
          a[R] =
            R < 16
              ? e[_ + R]
              : y(a[R - 3] ^ a[R - 8] ^ a[R - 14] ^ a[R - 16], 1);
          var f = h(
            h(y(o, 5), S(R, n, i, l)),
            h(
              h(s, a[R]),
              (r = R) < 20
                ? 1518500249
                : r < 40
                ? 1859775393
                : r < 60
                ? -1894007588
                : -899497514,
            ),
          );
          (s = l), (l = i), (i = y(n, 30)), (n = o), (o = f);
        }
        (o = h(o, u)),
          (n = h(n, c)),
          (i = h(i, d)),
          (l = h(l, p)),
          (s = h(s, E));
      }
      return Array(o, n, i, l, s);
    }

    function S(e, t, r, a) {
      return e < 20
        ? (t & r) | (~t & a)
        : e < 40
        ? t ^ r ^ a
        : e < 60
        ? (t & r) | (t & a) | (r & a)
        : t ^ r ^ a;
    }

    function h(e, t) {
      var r = (65535 & e) + (65535 & t);
      return (((e >> 16) + (t >> 16) + (r >> 16)) << 16) | (65535 & r);
    }

    function y(e, t) {
      return (e << t) | (e >>> (32 - t));
    }
    (e.hex_sha1 = t),
      (e.b64_sha1 = function (e) {
        return l(r(_(e)));
      }),
      (e.any_sha1 = function (e, t) {
        return s(r(_(e)), t);
      }),
      (e.hex_hmac_sha1 = function (e, t) {
        return o(a(_(e), _(t)));
      }),
      (e.b64_hmac_sha1 = function (e, t) {
        return l(a(_(e), _(t)));
      }),
      (e.any_hmac_sha1 = function (e, t, r) {
        return s(a(_(e), _(t)), r);
      });
  })(cmg || (cmg = {})),
  (function (e) {
    var t = function () {};
    e.PlayerInfo = t;
    var r = function () {};
    e.UserInfo = r;
    var a = function () {};
    e.KVData = a;
    var o = function () {};
    e.LaunchOption = o;
    var n = function () {};
    e.MusicScore = n;
  })(cmg || (cmg = {})),
  (function (e) {
    var t = (function () {
      function e() {}
      return (
        (e.compareVersion = function (e, t) {
          for (
            var r = e.split('.'),
              a = t.split('.'),
              o = Math.max(r.length, a.length),
              n = 0;
            n < o;
            n++
          ) {
            var i = n < r.length ? parseInt(r[n]) : 0,
              l = n < a.length ? parseInt(a[n]) : 0;
            if (i !== l) return l < i ? 1 : -1;
          }
          return 0;
        }),
        e
      );
    })();
    e.Utility = t;
  })(cmg || (cmg = {})),
  (function (r) {
    var e = (function () {
      function e() {}
      return (
        (e.postMessageToOpenData = function (e, t) {
          null == this.sWXOpenDataContext &&
            (this.sWXOpenDataContext = wx.getOpenDataContext()),
            this.sWXOpenDataContext.postMessage({
              message: e,
              parameter: t,
            });
        }),
        (e.networkRequest = function (t) {
          r.Platform.log('WXHelper networkRequest, parameter:', t),
            wx.request({
              url: t.url,
              data: t.data,
              header: t.header,
              method: t.method,
              dataType: t.dataType,
              success: function (e) {
                r.Platform.log('WXHelper networkRequest, complete:', e),
                  t.callback &&
                    (200 != e.statusCode
                      ? t.callback(!1, e, e.statusCode, e.header)
                      : e.data
                      ? t.callback(!0, e.data, e.statusCode, e.header)
                      : (r.Platform.error(e),
                        t.callback(!1, e, e.statusCode, e.header)));
              },
              fail: function () {
                r.Platform.error('WXHelper networkRequest, fail'),
                  t.callback && t.callback(!1, null, -1, null);
              },
            });
        }),
        (e.MSG_REPORT_SCORE = 'msg_report_score'),
        (e.KEY_USER_INFO_AUTHORIZATION_STATE =
          'key_user_info_authorization_state'),
        e
      );
    })();
    r.WXHelper = e;
  })(cmg || (cmg = {}));
