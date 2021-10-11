var CMPlayAd, CMPlay;
!(function (a) {
  console.log('Hello CMPlaySDK 2e834.072403 - POKI');
  var e = (function () {
    function t() {}
    return (
      (t.LOADING_BEGIN = 'loading_begin'), (t.LOADING_END = 'loading_end'), t
    );
  })();
  a.STATE = e;
  var r = (function () {
    function t() {}
    return (
      (t.GAME_ACTIVE = 220),
      (t.LOADING_PAGE = 221),
      (t.MAIN_PAGE = 222),
      (t.GUIDE_PAGE = 223),
      (t.LOGIN_SUCCESS = 228),
      (t.LOGIN_FAILED = 229),
      (t.STAGE_START = 231),
      (t.STAGE_PASS = 232),
      (t.STAGE_FAIL = 233),
      (t.BANNER_SHOW = 241),
      (t.REWARDED_VIDEO_SHOW = 242),
      (t.REWARDED_VIDEO_SUCCESS = 243),
      (t.REWARDED_VIDEO_FAILED = 248),
      (t.OPEN_GAME_AD_SHOW = 245),
      (t.SHARE_DIALOG = 246),
      (t.SHARE_DIALOG_SUCCESS = 247),
      (t.INTERSTITIAL_AD_SHOW = 244),
      (t.INTERSTITIAL_AD_REQUEST = 255),
      (t.INTERSTITIAL_AD_ERROR = 253),
      (t.INTERSTITIAL_AD_DONE = 250),
      (t.GAME_LEVEL_PASS = 249),
      (t.UNUSED_251 = 251),
      (t.UNUSED_252 = 252),
      t
    );
  })();
  (a.ACTION = r), (a.SDK_VER = 1);
  var n = !(a.Global = {
      debugInfoc: !1,
      debugService: !1,
      initTime: 0,
      public: {
        game_page: 0,
        game_ver: '0',
        game_id: 0,
        game_name: '',
        xaid: '0',
        accountid: '0',
        cn: 'default',
        brand: '',
        model: '',
        app_id: void 0,
      },
      data: {
        mCMPlayerId: void 0,
        mCMToken: void 0,
        mRewardVideoCallback: void 0,
        mShareCallback: void 0,
        mOnShowCBList: [],
        mOnHideCBList: [],
        mSystemInfo: void 0,
      },
      isOversea: !1,
      isOutputDebug: !1,
    }),
    i = !1,
    s = void 0,
    o = void 0,
    d = void 0;

  function l() {
    if (null != a.Global.data.mSystemInfo) return a.Global.data.mSystemInfo;
    var t = function () {
        try {
          if (window.GameJs && window.GameJs.getDisplayWidth)
            return window.GameJs.getDisplayWidth();
        } catch (t) {
          a.Log.error('CMPlay::getDisplayWidth ERROR => ' + t.message);
        }
        return 0;
      },
      e = function () {
        try {
          if (window.GameJs && window.GameJs.getDisplayHeight)
            return window.GameJs.getDisplayHeight();
        } catch (t) {
          a.Log.error('CMPlay::getDisplayHeight ERROR => ' + t.message);
        }
        return 0;
      };
    return (
      (a.Global.data.mSystemInfo = {
        brand: 'Unknow',
        model: 'Unknow',
        pixelRatio: 1,
        screenWidth: t(),
        screenHeight: e(),
        windowWidth: t(),
        windowHeight: e(),
        statusBarHeight: 0,
        language: g('lang', 'en'),
        version: '',
        system: '',
        platform: '',
        fontSizeSetting: 1,
        SDKVersion: '1.0',
        benchmarkLevel: -1,
        gameId: a.Global.public.game_id,
        packageName: (function () {
          try {
            if (window.GameJs && window.GameJs.getAppPackageName)
              return window.GameJs.getAppPackageName();
          } catch (t) {
            a.Log.error('CMPlay::getAppPackageName ERROR => ' + t.message);
          }
          return '';
        })(),
        packageVersion: (function () {
          try {
            if (window.GameJs && window.GameJs.getAppVersion)
              return window.GameJs.getAppVersion();
          } catch (t) {
            a.Log.error('CMPlay::getAppVersion ERROR => ' + t.message);
          }
          return '0';
        })(),
        gameToken: (function () {
          try {
            return o.getGameToken();
          } catch (t) {
            a.Log.error('CMPlay::getGameToken ERROR => ' + t.message);
          }
          return '';
        })(),
        appId: (function () {
          try {
            return o.getAppID();
          } catch (t) {
            a.Log.error('CMPlay::getAppID ERROR => ' + t.message);
          }
        })(),
        userId: (function () {
          try {
            return o.getUID();
          } catch (t) {
            a.Log.error('CMPlay::getUID ERROR => ' + t.message);
          }
        })(),
        isTestMode: (function () {
          try {
            if (window.GameJs && window.GameJs.isTestMode)
              return window.GameJs.isTestMode();
          } catch (t) {
            a.Log.error('CMPlay::isTestMode ERROR => ' + t.message),
              a.Log.error(JSON.stringify(t.stack));
          }
          return !1;
        })(),
        channelId: (function () {
          try {
            if (window.GameJs && window.GameJs.getChannelId)
              return window.GameJs.getChannelId();
          } catch (t) {
            a.Log.error('CMPlay::getChannelId ERROR => ' + t.message);
          }
          return '0';
        })(),
      }),
      a.Global.data.mSystemInfo
    );
  }
  (a.init = function (t) {
    if ((a.Log.warn('init => '), t.pageId <= 0 || 999 < t.pageId))
      throw new Error('init => ERROR: Invalid pageId ' + t.pageId);
    if (t.gameId <= 6e3 || 99999 < t.gameId)
      throw new Error('init => ERROR: Invalid gameId ' + t.gameId);
    if (!t.gameName || t.gameName.length < 1)
      throw new Error('init => ERROR: Invalid gameName ' + t.gameName);
    a.Log.log(
      'init => pageId:' +
        t.pageId +
        ' gameId:' +
        t.gameId +
        ' gameName:' +
        t.gameName,
    );
    var e = 'oversea';
    if (
      ((a.Global.isOversea = !0),
      a.Log.warn('init => region: ' + e),
      window.GameJs && null == window.GameJs.getGameToken)
    )
      throw new Error('init => ERROR: Please support GameJs.getGameToken API');
    (a.Global.public.game_page = t.pageId),
      '1' == a.getQueryString('_svr_debug_', '0')
        ? ((a.Global.isOutputDebug = !0),
          (a.Global.debugService = !0),
          a.Log.warn('>>>>> CMPLAYSDK DEBUG MODE <<<<<'))
        : ((a.Global.isOutputDebug = !0), (a.Global.debugService = !1));
    try {
      console.warn('init POKI'), (o = new a.POKI()).init(t);
    } catch (t) {
      a.Log.error('CMPlay::init ERROR => ' + t.message),
        a.Log.error(JSON.stringify(t.stack));
    }
    (s = new a.AudioImpl()),
      (i = n = !1),
      (a.Global.debugInfoc = !1),
      (a.Global.initTime = a.SysUtil.getTimeSeconds()),
      (a.Global.public.brand = ''),
      (a.Global.public.model = ''),
      (a.Global.public.game_ver = u()),
      (a.Global.public.game_id = t.gameId),
      (a.Global.public.game_name = t.gameName),
      (a.Global.data.mCMPlayerId = void 0),
      (a.Global.data.mCMToken = void 0),
      (a.Global.public.cn = l().appId),
      (a.Global.public.xaid = l().userId),
      (a.Global.isOutputDebug = !0),
      c.reportAction(r.GAME_ACTIVE);
  }),
    (a.setInfocDebug = function (t) {
      a.Global.debugInfoc = t;
    }),
    (a.setServiceDebug = function (t) {
      a.Global.debugService = t;
    }),
    (a.isCMPlay = function () {
      return !0;
    }),
    (window.onAdShowFailed = function () {
      try {
        null != a.Global.data.mRewardVideoCallback &&
          (a.Global.data.mRewardVideoCallback(!1),
          (a.Global.data.mRewardVideoCallback = void 0));
      } catch (t) {
        a.Log.error('CMPlay::onAdShowSuccess ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (window.onAdShowSuccess = function () {
      try {
        null != a.Global.data.mRewardVideoCallback &&
          (a.Global.data.mRewardVideoCallback(!0),
          (a.Global.data.mRewardVideoCallback = void 0));
      } catch (t) {
        a.Log.error('CMPlay::onAdShowSuccess ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (window.onShareSuccess = function () {
      try {
        null != a.Global.data.mShareCallback &&
          (a.Global.data.mShareCallback(),
          (a.Global.data.mShareCallback = void 0),
          c.reportAction(r.SHARE_DIALOG_SUCCESS));
      } catch (t) {
        a.Log.error('CMPlay::onShareSuccess ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (window.mute = function () {
      a.Audio.mute();
    }),
    (window.unmute = function () {
      a.Audio.unmute();
    }),
    (window.onActivityShow = function () {
      a.Log.warn('onActivityShow => ');
      for (var t = 0; t < a.Global.data.mOnShowCBList.length; t++)
        try {
          a.Global.data.mOnShowCBList[t]();
        } catch (t) {
          a.Log.error('CMPlay::onActivityShow ERROR => ' + t.message),
            a.Log.error(JSON.stringify(t.stack));
        }
      (n = !1), i || s.resumeBGM();
    }),
    (window.onActivityHide = function () {
      a.Log.warn('onActivityHide => ');
      for (var t = 0; t < a.Global.data.mOnHideCBList.length; t++)
        try {
          a.Global.data.mOnHideCBList[t]();
        } catch (t) {
          a.Log.error('CMPlay::onActivityHide ERROR => ' + t.message),
            a.Log.error(JSON.stringify(t.stack));
        }
      (n = !0), i || s.pauseBGM();
    }),
    (window.adShowCallback = function (t) {
      try {
        var e = JSON.parse(t);
        if (
          (a.Log.log('adShowCallback => result_message::' + e.result_message),
          e && 'onAdClosed' == e.adAction)
        ) {
          if ('gti' == e.unitId) d.mShareItAd.loadInerstitialAd();
          else if (
            'bqr' == e.unitId &&
            (d.mShareItAd.loadRewardAd(), !e.hasRewarded)
          )
            return;
          null != a.Global.data.mRewardVideoCallback &&
            (a.Global.data.mRewardVideoCallback(!0),
            (a.Global.data.mRewardVideoCallback = void 0));
        }
      } catch (t) {
        a.Log.error('adShowCallback ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (window.adLoadCallback = function (t) {
      try {
        var e = JSON.parse(t);
        a.Log.log(
          'adLoadCallback => result_message::' +
            e.result_message +
            'responseCode = ' +
            e.responseCode,
        );
      } catch (t) {
        a.Log.error('adLoadCallback ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (a.hasNeededPermissions = function () {
      return (
        window.RewardVideo &&
        window.RewardVideo.hasNeededPermissions &&
        window.RewardVideo.hasNeededPermissions()
      );
    }),
    (a.hasTTAd = function () {
      return (
        window.RewardVideo &&
        window.RewardVideo.hasTTAd &&
        window.RewardVideo.hasTTAd()
      );
    }),
    (a.isSupportShareDialog = function () {
      return window.GameJs && window.GameJs.onShareDialog;
    }),
    (a.shareDialog = function (t) {
      if (window.GameJs && window.GameJs.onShareDialog) {
        try {
          a.Global.data.mShareCallback = t;
          var e = window.GameJs.onShareDialog();
          return c.reportAction(r.SHARE_DIALOG), e;
        } catch (t) {
          a.Log.error('CMPlay::shareDialog ERROR => ' + t.message),
            a.Log.error(JSON.stringify(t.stack));
        }
        return !1;
      }
    }),
    (a.startRewardVideo = function (e) {
      try {
        o.startRewardVideo(function (t) {
          c.reportAction(
            t ? r.REWARDED_VIDEO_SUCCESS : r.REWARDED_VIDEO_FAILED,
          ),
            e && e(t);
        }) && c.reportAction(r.REWARDED_VIDEO_SHOW);
      } catch (t) {
        a.Log.error('CMPlay::startRewardVideo ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack)),
          e && e(!1);
      }
    }),
    (a.showInterstitialAd = function (t) {
      try {
        o.showInterstitialAd(t) && c.reportAction(r.INTERSTITIAL_AD_SHOW);
      } catch (t) {
        a.Log.error('CMPlay::showInterstitialAd ERROR =>' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (a.refreshBanner = function () {
      a.hideBanner(), a.showBanner();
    }),
    (a.showBanner = function () {
      try {
        o.showBanner() && c.reportAction(r.BANNER_SHOW);
      } catch (t) {
        a.Log.error('CMPlay::showBanner ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (a.hideBanner = function () {
      try {
        o.hideBanner();
      } catch (t) {
        a.Log.error('CMPlay::hideBanner ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (a.showToast = function (t, e) {
      try {
        window.GameJs &&
          window.GameJs.showToast &&
          window.GameJs.showToast(t, e);
      } catch (t) {
        a.Log.error('CMPlay::showToast ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (a.onShow = function (t) {
      for (var e = 0; e < a.Global.data.mOnShowCBList.length; e++)
        if (a.Global.data.mOnShowCBList[e] == t) return;
      a.Global.data.mOnShowCBList.push(t);
    }),
    (a.offShow = function (t) {
      for (var e = 0; e < a.Global.data.mOnShowCBList.length; e++)
        a.Global.data.mOnShowCBList[e] == t &&
          delete a.Global.data.mOnShowCBList[e];
    }),
    (a.onHide = function (t) {
      for (var e = 0; e < a.Global.data.mOnHideCBList.length; e++)
        if (a.Global.data.mOnHideCBList[e] == t) return;
      a.Global.data.mOnHideCBList.push(t);
    }),
    (a.offHide = function (t) {
      for (var e = 0; e < a.Global.data.mOnHideCBList.length; e++)
        a.Global.data.mOnHideCBList[e] == t &&
          delete a.Global.data.mOnHideCBList[e];
    }),
    (a.getStorageSync = function (t, e) {
      try {
        if (window.GameJs && window.GameJs.getLocalStringValue)
          return window.GameJs.getLocalStringValue(t, e);
      } catch (t) {
        a.Log.error('CMPlay::getStorageSync ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (a.setStorageSync = function (t, e) {
      try {
        if (window.GameJs && window.GameJs.setLocalStringValue)
          return window.GameJs.setLocalStringValue(t, e);
      } catch (t) {
        a.Log.error('CMPlay::setStorageSync ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack));
      }
    }),
    (a.getSystemInfo = function (t) {
      var e = a.getSystemInfoSync();
      t.success && t.success(e), t.complete && t.complete();
    }),
    (a.getSystemInfoSync = l);
  var c = (function () {
    function n() {}
    return (
      (n.report = function (t, e) {
        try {
          window.RewardVideo &&
            window.RewardVideo.reportData &&
            window.RewardVideo.reportData(t, e);
        } catch (t) {
          a.Log.error('CMPlay::report ERROR => ' + t.message),
            a.Log.error(JSON.stringify(t.stack));
        }
      }),
      (n.reportAction = function (t) {
        if (
          t == r.GAME_ACTIVE ||
          t == r.LOADING_PAGE ||
          t == r.MAIN_PAGE ||
          t == r.GUIDE_PAGE ||
          t == r.LOGIN_SUCCESS ||
          t == r.LOGIN_FAILED
        ) {
          if (0 <= n.UNIQE_EVENT_LIST.indexOf(t))
            return void a.Log.log(
              'reportAction => skip action[' + t + '] for duplicate',
            );
          n.UNIQE_EVENT_LIST.unshift(t);
        }
        if (
          (a.Log.log('reportAction => ' + t),
          window.RewardVideo && window.RewardVideo.reportData)
        ) {
          var e =
            'page=' +
            a.Global.public.game_page +
            '&game_ver=' +
            a.Global.public.game_ver +
            '&action=' +
            t;
          n.report('gamemaster_game_h5_wujin', e);
        } else a.cmplay_action.report(t);
        t == r.MAIN_PAGE && n.showOpenGameAd();
      }),
      (n.reportErrMsg = function (t, e, o) {
        window.RewardVideo && window.RewardVideo.reportData
          ? n.report(
              'gamemaster_business_h5game_errmsg',
              'url=' + t + '&errcode=' + e + '&errmsg=' + o,
            )
          : a.cmplay_error.report(t, e, o);
      }),
      (n.showOpenGameAd = function () {
        setTimeout(function () {
          var t = o.showOpenGameAd();
          a.Log.log('CMPlay::showOpenGameAd => ' + (t ? 'TRUE' : 'FALSE')),
            t && n.reportAction(r.OPEN_GAME_AD_SHOW);
        }, 0);
      }),
      (n.UNIQE_EVENT_LIST = []),
      n
    );
  })();

  function u() {
    return window.getPathVersion();
  }

  function g(t, e) {
    return window.getQueryString(t, e);
  }
  (a.Infoc = c),
    (a.login = function (i) {
      try {
        o.login(function (t, e, o, n, a) {
          c.reportAction(t ? r.LOGIN_SUCCESS : r.LOGIN_FAILED),
            i && i(t, e, o, n, a);
        });
      } catch (t) {
        a.Log.error('CMPlay::login ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack)),
          c.reportAction(r.LOGIN_FAILED),
          i && i(!1, void 0, void 0, 0, 0);
      }
    }),
    (a.setStorageList = function (t, e) {
      try {
        o.setStorageList(t, e);
      } catch (t) {
        a.Log.error('CMPlay::setStorageList ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack)),
          e && e(!1);
      }
    }),
    (a.getStroageList = function (t, e) {
      try {
        o.getStroageList(t, e);
      } catch (t) {
        a.Log.error('CMPlay::getStroageList ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack)),
          e && e(void 0);
      }
    }),
    (a.delStroageList = function (t, e) {
      try {
        o.delStroageList(t, e);
      } catch (t) {
        a.Log.error('CMPlay::delStroageList ERROR => ' + t.message),
          a.Log.error(JSON.stringify(t.stack)),
          e && e(!1);
      }
    }),
    (a.getServerTime = function (e) {
      a.CMService.getServerTime({
        success: function (t) {
          e && e(t);
        },
        fail: function (t) {
          e && e(void 0);
        },
      });
    }),
    (a.getPayload = function () {
      if (o) return o.getPayload();
    }),
    (a.getPathVersion = u),
    (a.getQueryString = g),
    (a.setState = function (t) {
      if (
        (a.Log.log('setState => ' + t), window.GameJs && window.GameJs.setState)
      )
        try {
          window.GameJs.setState(t);
        } catch (t) {
          a.Log.error('CMPlay::setState ERROR => ' + t.message),
            a.Log.error(JSON.stringify(t.stack));
        }
    });
  var t = (function () {
    function t() {}
    return (
      (t.onGameLoadStart = function () {
        a.Log.warn('===> onGameLoadStart'),
          a.setState(e.LOADING_BEGIN),
          a.Infoc.reportAction(r.LOADING_PAGE),
          o && o.onGameLoadStart();
      }),
      (t.onGameLoadFinished = function () {
        a.Log.warn('===> onGameLoadFinished'),
          a.setState(e.LOADING_END),
          o && o.onGameLoadFinished();
      }),
      (t.onGameMainStart = function () {
        a.Log.warn('===> onGameMainStart'),
          a.Infoc.reportAction(r.MAIN_PAGE),
          o && o.onGameMainStart();
      }),
      (t.onGameStart = function () {
        a.Log.warn('===> onGameStart'), o && o.onGameStart();
      }),
      (t.onGameStop = function () {
        a.Log.warn('===> onGameStop'), o && o.onGameStop();
      }),
      (t.onGameLevelPass = function (t) {
        a.Log.warn('===> onGameLevelPass: level=' + t),
          c.reportAction(r.GAME_LEVEL_PASS),
          o && o.onGameLevelPass(t);
      }),
      t
    );
  })();
  a.GameState = t;
  var p = (function () {
    function t() {}
    return (
      (t.playBGM = function (t, e, o) {
        if ((void 0 === e && (e = !0), void 0 === o && (o = 1), i))
          a.Log.warn('===> playBGM[mute]: ' + t);
        else {
          if (!n) return a.Log.warn('===> playBGM: ' + t), s.playBGM(t, e, o);
          a.Log.warn('===> playBGM[hide]: ' + t);
        }
      }),
      (t.stopBGM = function () {
        a.Log.warn('===> stopBGM'), s.stopBGM();
      }),
      (t.playEffect = function (t, e) {
        if ((void 0 === e && (e = 1), i))
          a.Log.warn('===> playEffect[mute]: ' + t);
        else {
          if (!n)
            return a.Log.warn('===> playEffect: ' + t), s.playEffect(t, e);
          a.Log.warn('===> playEffect[hide]: ' + t);
        }
      }),
      (t.mute = function () {
        i || (a.Log.warn('===> mute'), (i = !0), s.pauseBGM());
      }),
      (t.unmute = function () {
        i && (a.Log.warn('===> unmute'), (i = !1), s.resumeBGM());
      }),
      t
    );
  })();
  a.Audio = p;
})(CMPlay || (CMPlay = {})),
  (window.CMPlay = CMPlay),
  (function (t) {
    var e = void 0;
    (t.showBanner = function () {
      null == e &&
        ((e = setTimeout(this._refreshBanner, 3e4)), CMPlay.showBanner());
    }),
      (t.hideBanner = function () {
        t._clearTimeHandler(), CMPlay.hideBanner();
      }),
      (t.startRewardVideo = function (t) {
        CMPlay.startRewardVideo(t);
      }),
      (t.showInterstitialAd = function () {
        CMPlay.showInterstitialAd();
      }),
      (t._clearTimeHandler = function () {
        null != e && (clearTimeout(e), (e = void 0));
      }),
      (t._refreshBanner = function () {
        t._clearTimeHandler(),
          (e = setTimeout(this._refreshBanner, 3e4)),
          CMPlay.hideBanner(),
          CMPlay.showBanner();
      });
  })(CMPlayAd || (CMPlayAd = {})),
  (window.CMPlayAd = CMPlayAd),
  (function (c) {
    var t = (function () {
      function l() {}
      return (
        (l.getServerURL = function () {
          return c.Global.isOversea
            ? 'https://h5game_oversea.cmcm.com/'
            : c.Global.debugService
            ? 'https://pianotiles-minigame.cmcm.com/'
            : 'https://minigame.cmcm.com/';
        }),
        (l.loginCMPlay = function (s) {
          var d,
            t = c.getSystemInfoSync(),
            e = l.getServerURL();
          c.Log.warn('loginCMPlay =>'),
            (e += 'warty/auth/h5_login'),
            (d = {
              gameid: t.gameId,
              cm_token: t.gameToken,
            }),
            c.Log.warn('url => ' + e),
            c.NetworkUtil.request({
              url: e,
              data: d,
              header: {
                'content-type': 'application/json',
              },
              method: 'POST',
              dataType: 'json',
              checkAuthorization: !1,
              success: function (t) {
                var e;
                if (
                  (e = 'string' == typeof t ? JSON.parse(t) : t) &&
                  0 == e.status &&
                  e.result
                ) {
                  var o = e.result.playerid,
                    n = e.result.token,
                    a = e.result.is_new_user,
                    i = e.timestamp,
                    r = 0;
                  null != a &&
                    null != a &&
                    0 < ('' + a).length &&
                    (isNaN(Number('' + a)) || (r = Number('' + a))),
                    c.Global.isOutputDebug &&
                      (c.Log.warn('req => ' + JSON.stringify(d)),
                      c.Log.warn('resp => ' + JSON.stringify(e))),
                    c.Log.log('loginCMPlay => SUCCESS'),
                    c.Log.log('playerId: ' + o),
                    c.Log.log('token: ' + n),
                    c.Log.log('isNewUser: ' + r),
                    c.Log.log('timestamp: ' + i),
                    s.callback && s.callback(!0, o, n, r, i);
                } else
                  c.Log.error('loginCMPlay => FAILED A'),
                    c.Log.error('req => ' + JSON.stringify(d)),
                    c.Log.error('resp => ' + JSON.stringify(e)),
                    s.callback && s.callback(!1);
              },
              fail: function (t) {
                c.Log.error('loginCMPlay => FAILED B'),
                  c.Log.error('req => ' + JSON.stringify(d)),
                  c.Log.error(t),
                  s.callback && s.callback(!1);
              },
            });
        }),
        (l.setStorage = function (t) {
          if (!c.Global.data.mCMPlayerId || !c.Global.data.mCMToken)
            return (
              c.Log.error('setStorage:: Missing playerId/token'),
              void (t.fail && t.fail(null))
            );
          var e = l.getServerURL() + 'warty/storage/set';
          l.postRequest(e, t.kvDatas, t.success, t.fail);
        }),
        (l.getStorage = function (t) {
          if (!c.Global.data.mCMPlayerId || !c.Global.data.mCMToken)
            return (
              c.Log.error('getStorage:: Missing playerId/token'),
              void (t.fail && t.fail(null))
            );
          var e = l.getServerURL() + 'warty/storage/get';
          l.postRequest(e, t.keys, t.success, t.fail);
        }),
        (l.delStorage = function (t) {
          if (!c.Global.data.mCMPlayerId || !c.Global.data.mCMToken)
            return (
              c.Log.error('delStorage:: Missing playerId/token'),
              void (t.fail && t.fail(null))
            );
          var e = l.getServerURL() + 'warty/storage/del';
          l.postRequest(e, t.keys, t.success, t.fail);
        }),
        (l.getServerTime = function (e) {
          if (!c.Global.data.mCMPlayerId || !c.Global.data.mCMToken)
            return (
              c.Log.error('delStorage:: Missing playerId/token'),
              void (e.fail && e.fail(null))
            );
          var t = l.getServerURL() + 'warty/storage/get';
          l.postRequest(
            t,
            ['_timestamp_'],
            function (t) {
              t && void 0 !== t.timestamp
                ? e.success && e.success(t.timestamp)
                : e.fail && e.fail(null);
            },
            e.fail,
          );
        }),
        (l.createAuthorization = function (t, e) {
          return 'CMCM ' + c.hex_hmac_sha1(e, JSON.stringify(t));
        }),
        (l.getBody = function (t, e) {
          var o;
          return (
            e ? (o = t) : ((o = {}).data = t),
            (o.gameid = c.Global.public.game_id),
            (o.playerid = c.Global.data.mCMPlayerId),
            (o.timestamp = c.SysUtil.getTimeSeconds()),
            o
          );
        }),
        (l.postRequest = function (t, e, o, n, a, i) {
          void 0 === a && (a = !1), void 0 === i && (i = !0);
          var r = l.getBody(e, a),
            s = l.createAuthorization(r, c.Global.data.mCMToken);
          c.NetworkUtil.request({
            url: t,
            data: r,
            header: {
              Authorization: s,
            },
            method: 'POST',
            dataType: 'string',
            token: c.Global.data.mCMToken,
            checkAuthorization: i,
            success: function (t) {
              var e = JSON.parse(t);
              e && 0 == e.status ? o && o(e) : n && n(e);
            },
            fail: function (t) {
              n && n(t);
            },
          });
        }),
        l
      );
    })();
    c.CMService = t;
  })(CMPlay || (CMPlay = {})),
  (function (e) {
    var t = (function () {
      function t() {}
      return (
        (t.prototype.init = function (t) {
          t.bannerAdId || (t.bannerAdId = '908427599'),
            t.videoAdId || (t.videoAdId = '908427310'),
            t.gdtVideoAdId || (t.gdtVideoAdId = '3060856285839507'),
            window.RewardVideo &&
              (null != t.bannerAdId &&
                window.RewardVideo.setBannerAdId &&
                (e.Log.warn('init setBannerAdId => ' + t.bannerAdId),
                window.RewardVideo.setBannerAdId(t.bannerAdId)),
              null != t.videoAdId &&
                window.RewardVideo.setRewardVideoADId &&
                (e.Log.warn('init setRewardVideoADId => ' + t.videoAdId),
                window.RewardVideo.setRewardVideoADId(t.videoAdId)),
              null != t.interstitalAdId &&
                window.RewardVideo.setInteractionPosId &&
                (e.Log.warn('init setInteractionPosId => ' + t.interstitalAdId),
                window.RewardVideo.setInteractionPosId(t.interstitalAdId)),
              null != t.gdtVideoAdId &&
                window.RewardVideo.setGDTRewardVideoAdId &&
                (e.Log.warn('init setGDTRewardVideoAdId => ' + t.gdtVideoAdId),
                window.RewardVideo.setGDTRewardVideoAdId(t.gdtVideoAdId)));
        }),
        (t.prototype.startRewardVideo = function (t) {
          return window.RewardVideo && window.RewardVideo.startRewardVideo
            ? ((e.Global.data.mRewardVideoCallback = t),
              window.RewardVideo.startRewardVideo(),
              !0)
            : (t && t(!1), !1);
        }),
        (t.prototype.showBanner = function () {
          return !(
            !window.RewardVideo ||
            !window.RewardVideo.showBanner ||
            (window.RewardVideo.showBanner(), 0)
          );
        }),
        (t.prototype.hideBanner = function () {
          return !(
            !window.RewardVideo ||
            !window.RewardVideo.hideBanner ||
            (window.RewardVideo.hideBanner(), 0)
          );
        }),
        (t.prototype.showInterstitialAd = function (t) {
          return window.RewardVideo && window.RewardVideo.showInteractionAd
            ? (window.RewardVideo.showInteractionAd(), t && t(!0), !0)
            : (t && t(!1), !1);
        }),
        (t.prototype.showOpenGameAd = function () {
          return !(
            !window.RewardVideo ||
            !window.RewardVideo.showOpenGameAd ||
            (window.RewardVideo.showOpenGameAd(), 0)
          );
        }),
        t
      );
    })();
    e.CMAd = t;
  })(CMPlay || (CMPlay = {})),
  (function (t) {
    var e = (function () {
      function t() {
        (this.mVideoNative = void 0),
          (this.mVideoCallback = void 0),
          (this.mIsOnReward = !1);
      }
      return (
        (t.prototype.init = function (t) {
          var e,
            o,
            n = this,
            a = window.TencentGDT || [];
          (window.TencentGDT = a).push({
            placement_id: '5040452748174201',
            app_id: '40307385928989',
            type: 'rewardVideo',
            onComplete: function (t) {
              if (0 == t.code) {
                var o = new a.NATIVE.rewardVideoAd(function (t) {
                  var e = 'string' == typeof t ? JSON.parse(t) : t;
                  e &&
                    e.data &&
                    ('onADClose' === e.data.action
                      ? (n.mVideoCallback && n.mVideoCallback(n.mIsOnReward),
                        o.loadAd())
                      : 'onReward' === e.data.action && (n.mIsOnReward = !0));
                });
                o.loadAd(), (n.mVideoNative = o);
              }
            },
          }),
            (e = document.getElementsByTagName('head')[0]),
            ((o = document.createElement('script')).async = !0),
            (o.src = 'https://qzs.qq.com/qzone/biz/res/i.js'),
            e && e.insertBefore(o, e.firstChild);
        }),
        (t.prototype.startRewardVideo = function (t) {
          return this.mVideoNative
            ? ((this.mIsOnReward = !1),
              (this.mVideoCallback = t),
              this.mVideoNative.showAd(),
              !0)
            : (t && t(!1), !1);
        }),
        (t.prototype.showBanner = function () {
          return !1;
        }),
        (t.prototype.hideBanner = function () {
          return !1;
        }),
        (t.prototype.showInterstitialAd = function (t) {
          return t && t(!1), !1;
        }),
        (t.prototype.showOpenGameAd = function () {
          return !1;
        }),
        t
      );
    })();
    t.GDTAd = e;
  })(CMPlay || (CMPlay = {})),
  (function (n) {
    var t = (function () {
      function t() {
        this.isRewardVideoComplete = !1;
      }
      return (
        (t.prototype.init = function () {
          window.addEventListener(
            'message',
            function (t) {
              if (t && t.source == window.parent)
                try {
                  var e = JSON.parse(t.data);
                  if (e && e.back_adpos) {
                    var o = e.back_adpos;
                    'onRewardADShow' == o
                      ? (this.isRewardVideoComplete = !1)
                      : 'onRewardVideoComplete' == o
                      ? (this.isRewardVideoComplete = !0)
                      : 'onRewardADClose' == o &&
                        n.Global.data.mRewardVideoCallback &&
                        (n.Global.data.mRewardVideoCallback(
                          this.isRewardVideoComplete,
                        ),
                        (n.Global.data.mRewardVideoCallback = void 0));
                  }
                } catch (t) {}
            }.bind(this),
            !1,
          );
        }),
        (t.prototype.startRewardVideo = function (t) {
          return (
            (n.Global.data.mRewardVideoCallback = t),
            window.parent.postMessage(
              JSON.stringify({
                adpos: 'apiVideoAd',
              }),
              '*',
            ),
            !0
          );
        }),
        (t.prototype.showBanner = function () {
          return (
            window.parent.postMessage(
              JSON.stringify({
                adpos: 'apiBannerAd',
                bAdType: 'show',
              }),
              '*',
            ),
            !1
          );
        }),
        (t.prototype.hideBanner = function () {
          return (
            window.parent.postMessage(
              JSON.stringify({
                adpos: 'apiBannerAd',
                bAdType: 'dismiss',
              }),
              '*',
            ),
            !1
          );
        }),
        (t.prototype.showInterstitialAd = function (t) {
          return t && t(!1), !1;
        }),
        (t.prototype.showOpenGameAd = function () {
          return !1;
        }),
        t
      );
    })();
    n.IQIYIAd = t;
  })(CMPlay || (CMPlay = {})),
  (function (n) {
    var t = (function () {
      function t() {
        (this.mEventList = void 0), (this.mEventList = new Array());
      }
      return (
        (t.prototype.init = function (t) {
          var e = this;
          n.SysUtil.loadSDKScript(
            'https://game-cdn.poki.com/scripts/v2/poki-sdk.js',
            !1,
            function () {
              n.Log.warn('POKIAd::loadSDKScript => PokiSDK is Ready'),
                PokiSDK.init()
                  .then(function () {
                    n.Log.log('POKI initialized'), e.processEventList();
                  })
                  .catch(function () {
                    n.Log.log('Adblock enabled'), e.processEventList();
                  });
            },
          );
        }),
        (t.prototype.startRewardVideo = function (e) {
          var o = this;
          return window.PokiSDK
            ? (n.Log.warn('POKIAd::startRewardVideo => invoke'),
              this.onActivityHide(),
              PokiSDK.rewardedBreak().then(function (t) {
                t
                  ? (n.Log.log('POKIAd::startRewardVideo => reward'),
                    e && e(!0))
                  : (n.Log.log('POKIAd::startRewardVideo => unrewarded'),
                    e && e(!1)),
                  o.onActivityShow();
              }),
              !0)
            : (n.Log.error('POKIAd::startRewardVideo => Missing PokiSDK env'),
              e && e(!1),
              !1);
        }),
        (t.prototype.showBanner = function () {
          return window.PokiSDK
            ? (n.Log.warn('POKIAd::showBanner => invoke'), !0)
            : (n.Log.error('POKIAd::showBanner => Missing PokiSDK env'), !1);
        }),
        (t.prototype.hideBanner = function () {
          return window.PokiSDK
            ? (n.Log.warn('POKIAd::hideBanner => invoke'), !0)
            : (n.Log.error('POKIAd::hideBanner => Missing PokiSDK env'), !1);
        }),
        (t.prototype.showInterstitialAd = function (t) {
          var e = this;
          return (
            window.PokiSDK
              ? (this.onActivityHide(),
                PokiSDK.commercialBreak()
                  .then(function () {
                    n.Log.log(
                      'POKIAd::showInterstitialAd => commercialBreak finish',
                    ),
                      t && t(!0),
                      e.onActivityShow();
                  })
                  .catch(function () {
                    n.Log.log(
                      'POKIAd::showInterstitialAd => commercialBreak catch',
                    ),
                      t && t(!1),
                      e.onActivityShow();
                  }))
              : (n.Log.error(
                  'POKIAd::showInterstitialAd => Missing PokiSDK env',
                ),
                t && t(!1)),
            !1
          );
        }),
        (t.prototype.gameLoadingStart = function () {
          this.mEventList.unshift('loading_start'), this.processEventList();
        }),
        (t.prototype.gameLoadingFinished = function () {
          this.mEventList.unshift('loading_finished'), this.processEventList();
        }),
        (t.prototype.gamePlayStart = function () {
          window.PokiSDK && PokiSDK.gameplayStart();
        }),
        (t.prototype.gamePlayStop = function () {
          window.PokiSDK && PokiSDK.gameplayStop();
        }),
        (t.prototype.happyTime = function (t) {
          window.PokiSDK &&
            (t <= 0 || (1 < t && (t = 1), PokiSDK.happyTime(t)));
        }),
        (t.prototype.processEventList = function () {
          if (window.PokiSDK)
            for (; 0 < this.mEventList.length; ) {
              var t = this.mEventList.pop();
              'loading_start' == t
                ? PokiSDK.gameLoadingStart()
                : 'loading_finished' == t && PokiSDK.gameLoadingFinished();
            }
        }),
        (t.prototype.onActivityHide = function () {
          window.onActivityHide && window.onActivityHide();
        }),
        (t.prototype.onActivityShow = function () {
          window.onActivityShow && window.onActivityShow();
        }),
        (t.prototype.showOpenGameAd = function () {
          return !1;
        }),
        t
      );
    })();
    n.POKIAd = t;
  })(CMPlay || (CMPlay = {})),
  (function (o) {
    var t = (function () {
      function t() {}
      return (
        (t.prototype.init = function (t) {
          o.SysUtil.loadSDKScript(
            'https://newidea4-gamecenter-frontend.1sapp.com/game/gamesdk/prod/qtt_help.js',
            !1,
            function () {
              o.Log.warn('QTT::loadSDKScript => qtt_help is Ready');
            },
          ),
            this.createContainer();
        }),
        (t.prototype.createContainer = function () {
          var t = document.createElement('style');
          t.setAttribute('type', 'text/css'),
            (t.innerText = '.titleBox{ display:none !important; };'),
            document.body.appendChild(t);
        }),
        (t.prototype.startRewardVideo = function (e) {
          return window.qtt_help
            ? (o.Log.warn('QTTAd::startRewardVideo => invoke'),
              window.onActivityHide && window.onActivityHide(),
              window.qtt_help.ad.showVideo(
                function (t) {
                  1 == t
                    ? (o.Log.log(
                        'QTTAd::startRewardVideo => endedCallback rewarded',
                      ),
                      e && e(!0))
                    : (o.Log.log(
                        'QTTAd::startRewardVideo => endedCallback unrewarded for ' +
                          t,
                      ),
                      e && e(!1)),
                    window.onActivityShow && window.onActivityShow();
                },
                {
                  gametype: 1,
                  rewardtype: 1,
                  data: {
                    title: '道具',
                    url: '//h5game.zhhainiao.com/cmplaysdk/qtt/gift.png',
                  },
                },
              ),
              !0)
            : (o.Log.error('QTTAd::startRewardVideo => Missing qtt_help env'),
              e && e(!1),
              !1);
        }),
        (t.prototype.showBanner = function () {
          return window.qtt_help
            ? (o.Log.warn('QTTAd::showBanner => invoke'),
              window.qtt_help.ad.showBanner(),
              !0)
            : (o.Log.error('QTTAd::showBanner => Missing qtt_help env'), !1);
        }),
        (t.prototype.hideBanner = function () {
          return window.qtt_help
            ? (o.Log.warn('QTTAd::hideBanner => invoke'),
              window.qtt_help.ad.hideBanner(),
              !0)
            : (o.Log.error('QTTAd::hideBanner => Missing qtt_help env'), !1);
        }),
        (t.prototype.showInterstitialAd = function (t) {
          return this.showInteractAd(t);
        }),
        (t.prototype.showInteractAd = function (t) {
          return window.qtt_help
            ? (o.Log.warn('QTTAd::showInteractAd => invoke'),
              window.qtt_help.ad.showHDReward({
                gametype: 1,
                rewardtype: 1,
                data: {
                  title: '道具',
                  url: '//h5game.zhhainiao.com/cmplaysdk/qtt/gift.png',
                },
              }),
              t && t(!0),
              !0)
            : (o.Log.error('QTTAd::showInteractAd => Missing qtt_help env'),
              t && t(!1),
              !1);
        }),
        (t.prototype.showOpenGameAd = function () {
          return !1;
        }),
        t
      );
    })();
    o.QTTAd = t;
  })(CMPlay || (CMPlay = {})),
  (function (o) {
    var t = (function () {
      function t() {}
      return (
        (t.prototype.init = function (t) {
          o.SysUtil.loadSDKScript(
            'https://newidea4-gamecenter-frontend.1sapp.com/sdk/prod/h5.v1.0.0.js?spread=required',
            !1,
            function () {
              o.Log.warn('QTT::loadSDKScript => qttGame is Ready');
            },
          ),
            this.createContainer();
        }),
        (t.prototype.createContainer = function () {
          var t = document.createElement('style');
          t.setAttribute('type', 'text/css'),
            (t.innerText = '.titleBox{ display:none !important; };'),
            document.body.appendChild(t);
        }),
        (t.prototype.startRewardVideo = function (e) {
          return window.qttGame
            ? (o.Log.warn('QTTAd::startRewardVideo => invoke'),
              window.onActivityHide && window.onActivityHide(),
              window.qttGame.showVideo(
                function (t) {
                  1 == t
                    ? (o.Log.log(
                        'QTTAd::startRewardVideo => endedCallback rewarded',
                      ),
                      e && e(!0))
                    : (o.Log.log(
                        'QTTAd::startRewardVideo => endedCallback unrewarded for ' +
                          t,
                      ),
                      e && e(!1)),
                    window.onActivityShow && window.onActivityShow();
                },
                {
                  gametype: 1,
                  rewardtype: 1,
                  data: {
                    title: '道具',
                    url: 'https://h5game.zhhainiao.com/cmplaysdk/qtt/gift.png',
                  },
                },
              ),
              !0)
            : (o.Log.error('QTTAd::startRewardVideo => Missing qttGame env'),
              e && e(!1),
              !1);
        }),
        (t.prototype.showBanner = function () {
          return window.qttGame
            ? (o.Log.warn('QTTAd::showBanner => invoke'),
              window.qttGame.showBanner(),
              !0)
            : (o.Log.error('QTTAd::showBanner => Missing qttGame env'), !1);
        }),
        (t.prototype.hideBanner = function () {
          return window.qttGame
            ? (o.Log.warn('QTTAd::hideBanner => invoke'),
              window.qttGame.hideBanner(),
              !0)
            : (o.Log.error('QTTAd::hideBanner => Missing qttGame env'), !1);
        }),
        (t.prototype.showInterstitialAd = function (t) {
          return this.showInteractAd(t);
        }),
        (t.prototype.showInteractAd = function (t) {
          return window.qttGame
            ? (o.Log.warn('QTTAd::showInteractAd => invoke'),
              window.qttGame.showHDReward({
                gametype: 1,
                rewardtype: 1,
                data: {
                  title: '道具',
                  url: 'https://h5game.zhhainiao.com/cmplaysdk/qtt/gift.png',
                },
              }),
              t && t(!0),
              !0)
            : (o.Log.error('QTTAd::showInteractAd => Missing qttGame env'),
              t && t(!1),
              !1);
        }),
        (t.prototype.showOpenGameAd = function () {
          return !1;
        }),
        t
      );
    })();
    o.QTTV2Ad = t;
  })(CMPlay || (CMPlay = {})),
  (function (e) {
    var t = (function () {
      function t() {
        this.mSIAOld = void 0;
      }
      return (
        (t.prototype.init = function (t) {
          (this.mSIAOld = this.createSIAOld()), this.mSIAOld.init(t);
        }),
        (t.prototype.createSIAOld = function () {
          return e.Global.public.game_page == e.PAGE.BRICK_BALL
            ? new e.SIAdOld()
            : new e.SIAdOld_ima();
        }),
        (t.prototype.loadInerstitialAd = function () {}),
        (t.prototype.loadRewardAd = function () {}),
        (t.prototype.startRewardVideo = function (t) {
          return this.mSIAOld && this.mSIAOld.startRewardVideo(t);
        }),
        (t.prototype.showBanner = function () {
          return this.mSIAOld && this.mSIAOld.showBanner();
        }),
        (t.prototype.hideBanner = function () {
          return this.mSIAOld && this.mSIAOld.hideBanner();
        }),
        (t.prototype.showOpenGameAd = function () {
          return this.mSIAOld && this.mSIAOld.showOpenGameAd();
        }),
        (t.prototype.showInterstitialAd = function (t) {
          return this.mSIAOld && this.mSIAOld.showInterstitialAd(t);
        }),
        (t.prototype.isSIVerNew = function () {
          var t = window.shareitBridge.syncInvoke(
            'PayPhoneFare',
            'getDeviceInfo',
            '',
          );
          return 4040797 < JSON.parse(t).app_ver;
        }),
        t
      );
    })();
    e.SIAd = t;
  })(CMPlay || (CMPlay = {})),
  (function (o) {
    var t = (function () {
      function t() {
        (this.inerstitialJson = {}), (this.rewardJson = {});
      }
      return (
        (t.prototype.showOpenGameAd = function () {
          return !1;
        }),
        (t.prototype.init = function (t) {
          (this.inerstitialJson = {
            gameId: t.gameName,
            unitId: 'gti',
          }),
            (this.rewardJson = {
              gameId: t.gameName,
              unitId: 'bqr',
            }),
            this.loadRewardAd();
        }),
        (t.prototype.loadInerstitialAd = function () {}),
        (t.prototype.loadRewardAd = function () {
          try {
            if (this.canShowAd(this.rewardJson)) return;
            window.shareitBridge.asyncInvoke(
              'GameAd',
              'loadRewardAd',
              'adLoadCallback',
              JSON.stringify(this.rewardJson),
            ),
              console.log('GameAd::loadRewardAd => ');
          } catch (t) {
            console.error('loadRewardAd error');
          }
        }),
        (t.prototype.startRewardVideo = function (t) {
          if (!window.shareitBridge || !this.canShowAd(this.rewardJson))
            return (
              o.Log.error('ShareIt::startRewardVideo => show Reward error'),
              t && t(!1),
              window.alert('激励视频广告展示失败'),
              this.loadRewardAd(),
              !1
            );
          o.Log.warn('ShareIt::startRewardVideo => invoke'),
            this.onActivityHide(),
            (o.Global.data.mRewardVideoCallback = t);
          var e = window.shareitBridge.asyncInvoke(
            'GameAd',
            'showRewardAd',
            'adShowCallback',
            JSON.stringify(this.rewardJson),
          );
          return (
            console.log('GameAd::startRewardVideo => ' + e),
            this.onActivityShow(),
            !0
          );
        }),
        (t.prototype.showInterstitialAd = function (t) {
          if (!window.shareitBridge || !this.canShowAd(this.inerstitialJson))
            return (
              o.Log.error(
                'ShareIt::showInterstitialAd => show Interstitial error',
              ),
              t && t(!1),
              window.alert('插屏广告展示失败'),
              this.loadInerstitialAd(),
              !1
            );
          this.onActivityHide(), (o.Global.data.mRewardVideoCallback = t);
          var e = window.shareitBridge.asyncInvoke(
            'GameAd',
            'showInterstitialAd',
            'adShowCallback',
            JSON.stringify(this.inerstitialJson),
          );
          return (
            console.log('GameAd::showInterstitialAd => ' + e),
            this.onActivityShow(),
            !1
          );
        }),
        (t.prototype.canShowAd = function (t) {
          var e = window.shareitBridge.syncInvoke(
            'GameAd',
            'canShowAd',
            JSON.stringify(t),
          );
          return console.log('GameAd::canShowAd => ' + e), 'true' == e;
        }),
        (t.prototype.onActivityHide = function () {
          window.onActivityHide && window.onActivityHide();
        }),
        (t.prototype.onActivityShow = function () {
          window.onActivityShow && window.onActivityShow();
        }),
        (t.prototype.showBanner = function () {
          return !1;
        }),
        (t.prototype.hideBanner = function () {
          return !1;
        }),
        t
      );
    })();
    o.SIAdNew = t;
  })(CMPlay || (CMPlay = {})),
  (function (a) {
    var t = (function () {
      function n() {
        (this.BigadContainer = void 0),
          (this.adTagUrl = void 0),
          (this.googleVideoAd = void 0),
          (this.adCallback = void 0),
          (this.current = void 0);
      }
      return (
        (n.prototype.init = function (t) {
          a.SysUtil.loadSDKScript(
            'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
            !1,
            function () {
              a.Log.error('SIAdOld_ima::loadSDKScript => ima3 is Ready');
            },
          ),
            this.createContainer();
        }),
        (n.prototype.createContainer = function () {
          var t = document.createElement('script');
          (t.src = 'https://imasdk.googleapis.com/js/sdkloader/outstream.js'),
            document.getElementsByTagName('html')[0].appendChild(t);
          var e = window.innerHeight,
            o = window.innerWidth;
          (this.BigadContainer = document.createElement('DIV')),
            (this.BigadContainer.id = 'BigadContainer'),
            (this.BigadContainer.style.width = o + 'px'),
            (this.BigadContainer.style.height = e + 'px'),
            (this.BigadContainer.style.position = 'absolute'),
            (this.BigadContainer.style.top = '0'),
            (this.BigadContainer.style.left = '100%'),
            (this.BigadContainer.style.zIndex = '99999999999'),
            (this.BigadContainer.style.backgroundColor = '#000'),
            document
              .getElementsByTagName('body')[0]
              .appendChild(this.BigadContainer);
          var n = document.createElement('DIV');
          (n.style.width = o + 'px'),
            (n.style.height = e + 'px'),
            (n.id = 'adContainer'),
            this.BigadContainer.appendChild(n),
            (n.style.position = 'absolute'),
            (n.style.top = '0'),
            (n.style.left = '0'),
            (n.style.zIndex = '9999999999');
        }),
        (n.prototype.startRewardVideo = function (t) {
          var e = this;
          console.log('SIAdOld::onload => ' + a.Global.public.game_page),
            (this.adTagUrl = n.getAdTagUrlByPage());
          var o = document.getElementById('adContainer');
          return (
            o || ((o = document.createElement('DIV')).id = 'adContainer'),
            (this.adCallback = t),
            (this.googleVideoAd = new google.outstream.AdsController(
              o,
              this.onAdLoaded.bind(this),
              this.onDone.bind(this),
            )),
            setTimeout(function () {
              e.dp_share();
            }, 1e3),
            a.Infoc.reportAction(a.ACTION.INTERSTITIAL_AD_REQUEST),
            !1
          );
        }),
        (n.prototype.requestAds = function () {
          (this.current = Date.now()),
            this.googleVideoAd.initialize(),
            console.log('SIAdOld::requestAds => '),
            this.googleVideoAd.requestAds(this.adTagUrl);
        }),
        (n.prototype.onAdLoaded = function () {
          console.log('SIAdOld::onAdLoaded => '), this.googleVideoAd.showAd();
        }),
        (n.prototype.onDone = function () {
          (this.BigadContainer.style.left = '100%'),
            (this.BigadContainer.style.transition = 'left 0.8s'),
            (this.BigadContainer.style.webkitTransition = 'left 0.8s'),
            this.adCallback && this.adCallback(!0),
            Date.now() - this.current <= 3e3
              ? a.Infoc.reportAction(a.ACTION.INTERSTITIAL_AD_ERROR)
              : a.Infoc.reportAction(a.ACTION.INTERSTITIAL_AD_SHOW),
            console.log('SIAdOld::onDone => ');
        }),
        (n.prototype.dp_share = function () {
          this.requestAds(),
            (this.BigadContainer.style.display = 'block'),
            (this.BigadContainer.style.left = '0'),
            (this.BigadContainer.style.transition = 'left 0.8s'),
            (this.BigadContainer.style.webkitTransition = 'left 0.8s');
        }),
        (n.prototype.showOpenGameAd = function () {
          return this.startRewardVideo(void 0);
        }),
        (n.prototype.showBanner = function () {
          return !1;
        }),
        (n.prototype.hideBanner = function () {
          return !1;
        }),
        (n.prototype.showInterstitialAd = function (t) {
          return this.startRewardVideo(t);
        }),
        (n.getAdTagUrlByPage = function () {
          var t = void 0;
          switch (a.Global.public.game_page) {
            case a.PAGE.ROLL_SKY:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Frolling+sky&channel=2600299995&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.BRICK_BALL:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fcmcm.com&channel=6320167124&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.DANC_LINE:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fh5game.zhhainiao.com&channel=9743706114&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.PIANO_TILES:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fh5game.zhhainiao.com&channel=8789663194&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.FARM:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fh5game.zhhainiao.com&channel=6466752186&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.GAME_2048:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fh5game.zhhainiao.com&channel=5973241248&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.DEEP_FISH:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fh5game.zhhainiao.com&channel=8214948128&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.FRUIT_NINJA:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fh5game.zhhainiao.com&channel=6348645762&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.FOOTBALL:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fh5game.zhhainiao.com&channel=3912794931&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.SAIL_LEGEND:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fh5game.zhhainiao.com&channel=3074302084&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.STARS_2:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fh5game.zhhainiao.com&channel=9552134428&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            case a.PAGE.SNAKE_BLOCK:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fh5game.zhhainiao.com&channel=7432349494&videoad_start_delay=0&hl=en&max_ad_duration=30000';
              break;
            default:
              t =
                'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-8908317842209223&description_url=http%3A%2F%2Fcmcm.com&channel=6320167124&videoad_start_delay=0&hl=en&max_ad_duration=30000';
          }
          return t;
        }),
        n
      );
    })();
    a.SIAdOld = t;
  })(CMPlay || (CMPlay = {})),
  (function (n) {
    var t = (function () {
      function t() {
        (this.BigadContainer = void 0),
          (this.adContainer = void 0),
          (this.adHeight = document.body.clientHeight || 640),
          (this.adWidth = document.body.clientWidth || 360);
      }
      return (
        (t.prototype.init = function (t) {
          n.SysUtil.loadSDKScript(
            'https://imasdk.googleapis.com/js/sdkloader/ima3.js',
            !1,
            function () {
              n.Log.error('SIAdOld_ima::loadSDKScript => ima3 is Ready');
            },
          ),
            this.createContainer();
        }),
        (t.prototype.createContainer = function () {
          (this.BigadContainer = document.createElement('DIV')),
            (this.BigadContainer.id = 'mainContainer'),
            (this.BigadContainer.style.display = 'none'),
            (this.BigadContainer.style.position = 'relative'),
            (this.BigadContainer.style.width = '1px'),
            (this.BigadContainer.style.height = '1px'),
            document
              .getElementsByTagName('body')[0]
              .appendChild(this.BigadContainer);
          var t = document.createElement('DIV');
          (t.id = 'content'),
            (t.style.position = 'absolute'),
            (t.style.top = '0'),
            (t.style.left = '0'),
            (t.style.width = '100%'),
            (t.style.height = '100%'),
            (this.videoContent = document.createElement('video')),
            (this.videoContent.id = 'contentElement'),
            (this.videoContent.style.width = '100%'),
            (this.videoContent.style.height = '100%'),
            (this.videoContent.style.overflow = 'hidden'),
            t.appendChild(this.videoContent),
            this.BigadContainer.appendChild(t),
            (this.adContainer = document.createElement('DIV')),
            (this.adContainer.id = 'adContainer'),
            (this.adContainer.style.position = 'absolute'),
            (this.adContainer.style.top = '0'),
            (this.adContainer.style.left = '0'),
            (this.adContainer.style.width = '100%'),
            (this.adContainer.style.height = '100%'),
            (this.adContainer.style.zIndex = '9999999999'),
            (this.adContainer.style.background = '#000'),
            this.BigadContainer.appendChild(this.adContainer);
        }),
        (t.prototype.createGoogle = function () {
          (this.adDisplayContainer = new google.ima.AdDisplayContainer(
            document.getElementById('adContainer'),
            this.videoContent,
          )),
            (this.adsLoader = new google.ima.AdsLoader(
              this.adDisplayContainer,
            )),
            this.adsLoader
              .getSettings()
              .setDisableCustomPlaybackForIOS10Plus(!0),
            this.adsLoader.addEventListener(
              google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
              this.onAdsManagerLoaded.bind(this),
              !1,
            ),
            this.adsLoader.addEventListener(
              google.ima.AdErrorEvent.Type.AD_ERROR,
              this.onAdError.bind(this),
              !1,
            ),
            (this.videoContent.onended = function () {
              this.adsLoader.contentComplete();
            });
          var t = new google.ima.AdsRequest();
          (t.adTagUrl = n.SIAdOld.getAdTagUrlByPage()),
            (t.linearAdSlotWidth = this.adWidth),
            (t.linearAdSlotHeight = this.adHeight),
            (t.nonLinearAdSlotWidth = this.adWidth),
            (t.nonLinearAdSlotHeight = this.adHeight),
            this.adsLoader.requestAds(t),
            n.Log.error('SIAdOld_ima::createGoogle =>');
        }),
        (t.prototype.startRewardVideo = function (t) {
          return (
            n.Log.error('SIAdOld_ima::startRewardVideo 1=> '),
            this.createGoogle(),
            (this.mADCallback = t),
            !1
          );
        }),
        (t.prototype.playAds = function () {
          if (this.adsManager) {
            this.videoContent.load(),
              this.adDisplayContainer.initialize(),
              n.Infoc.reportAction(n.ACTION.INTERSTITIAL_AD_REQUEST);
            try {
              var t = document.body.clientWidth || 360,
                e = document.body.clientHeight || 640;
              this.adsManager.init(t, e, google.ima.ViewMode.NORMAL),
                this.adsManager.start();
            } catch (t) {
              n.Log.error('SIAdOld_ima::startRewardVideo 2=> ' + t),
                n.Infoc.reportAction(n.ACTION.INTERSTITIAL_AD_ERROR),
                this.videoContent.play();
            }
          } else n.Log.error('SIAdOld_ima::startRewardVideo 3=> ');
        }),
        (t.prototype.onAdsManagerLoaded = function (t) {
          n.Log.error('SIAdOld_ima::onAdsManagerLoaded 1=> ');
          var e = new google.ima.AdsRenderingSettings();
          (e.restoreCustomPlaybackStateOnAdBreakComplete = !0),
            (this.adsManager = t.getAdsManager(this.videoContent, e)),
            n.Log.error('SIAdOld_ima::onAdsManagerLoaded 2=> '),
            this.adsManager.addEventListener(
              google.ima.AdErrorEvent.Type.AD_ERROR,
              this.onAdError.bind(this),
            ),
            this.adsManager.addEventListener(
              google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
              this.onContentPauseRequested.bind(this),
            ),
            this.adsManager.addEventListener(
              google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
              this.onContentResumeRequested.bind(this),
            ),
            this.adsManager.addEventListener(
              google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
              this.onAdEvent.bind(this),
            ),
            this.adsManager.addEventListener(
              google.ima.AdEvent.Type.LOADED,
              this.onAdEvent.bind(this),
            ),
            this.adsManager.addEventListener(
              google.ima.AdEvent.Type.STARTED,
              this.onAdEvent.bind(this),
            ),
            this.adsManager.addEventListener(
              google.ima.AdEvent.Type.COMPLETE,
              this.onAdEvent.bind(this),
            ),
            this.adsManager.addEventListener(
              google.ima.AdEvent.Type.SKIPPED,
              this.onAdEvent.bind(this),
            ),
            this.adsManager.addEventListener(
              google.ima.AdEvent.Type.USER_CLOSE,
              this.onAdEvent.bind(this),
            ),
            this.playAds();
        }),
        (t.prototype.onAdEvent = function (t) {
          n.Log.error('SIAdOld_ima::onAdEvent 1=> ' + t.type);
          var e = t.getAd(),
            o = this;
          switch (t.type) {
            case google.ima.AdEvent.Type.LOADED:
              e.isLinear() || o.videoContent.play();
              break;
            case google.ima.AdEvent.Type.STARTED:
              e.isLinear() &&
                (o.intervalTimer = setInterval(function () {
                  var t = o.adsManager.getRemainingTime();
                  console.log('remainingTime', t),
                    t <= 0 &&
                      (clearInterval(o.intervalTimer),
                      (o.intervalTimer = null),
                      (o.BigadContainer.style.display = 'none'));
                }, 300)),
                (o.BigadContainer.style.display = 'block'),
                n.Infoc.reportAction(n.ACTION.INTERSTITIAL_AD_SHOW);
              break;
            case google.ima.AdEvent.Type.COMPLETE:
            case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
              (o.BigadContainer.style.display = 'none'),
                n.Infoc.reportAction(n.ACTION.INTERSTITIAL_AD_DONE),
                o.mADCallback && o.mADCallback(!0);
              break;
            case google.ima.AdEvent.Type.SKIPPED:
            case google.ima.AdEvent.Type.USER_CLOSE:
              o.intervalTimer &&
                (clearInterval(o.intervalTimer), (o.intervalTimer = null)),
                (o.BigadContainer.style.display = 'none');
          }
        }),
        (t.prototype.onAdError = function (t) {
          var e = t.getError();
          n.Infoc.reportErrMsg('', e.getErrorCode(), ''),
            n.Log.error('SIAdOld_ima::onAdError => ' + t.getError()),
            this.adsManager && this.adsManager.destroy();
        }),
        (t.prototype.onContentPauseRequested = function () {
          this.videoContent.pause(),
            n.Log.error('SIAdOld_ima::onContentPauseRequested=> ');
        }),
        (t.prototype.onContentResumeRequested = function () {
          this.videoContent.play(),
            n.Log.error('SIAdOld_ima::onContentResumeRequested=> ');
        }),
        (t.prototype.showBanner = function () {
          return !1;
        }),
        (t.prototype.hideBanner = function () {
          return !1;
        }),
        (t.prototype.showOpenGameAd = function () {
          return this.startRewardVideo(void 0);
        }),
        (t.prototype.showInterstitialAd = function (t) {
          return this.startRewardVideo(t);
        }),
        t
      );
    })();
    n.SIAdOld_ima = t;
  })(CMPlay || (CMPlay = {})),
  (function (t) {
    var e;
    ((e = t.LoginType || (t.LoginType = {}))[(e.LIEBAO = 1)] = 'LIEBAO'),
      (e[(e.QQ = 2)] = 'QQ'),
      (e[(e.WEIXIN = 3)] = 'WEIXIN'),
      (e[(e.PHONE_NUM = 4)] = 'PHONE_NUM'),
      (e[(e.QTT = 5)] = 'QTT');
  })(CMPlay || (CMPlay = {})),
  (function (o) {
    var t = (function () {
      function e() {}
      return (
        (e.getPlatform = function () {
          return e.POKI;
        }),
        (e.detect = function () {
          var t = o.getQueryString('platform', 'default');
          return 'qtt' != t ||
            ('default' == o.getQueryString('ticket', 'default') &&
              !/qukan/i.test(navigator.userAgent))
            ? 'pps' == o.getQueryString('agent', 'default') &&
              'default' != o.getQueryString('user_id', 'default')
              ? e.IQIYI
              : 'gdt' == t
              ? e.GDT
              : 'poki' == t
              ? e.POKI
              : 'shareit' == t
              ? e.SHAREIT
              : e.CMPLAY
            : e.QTT;
        }),
        (e.getXAID = function () {
          var t = window.localStorage.getItem('cmplay_xaid');
          return (
            t ||
              ((t = o.SysUtil.generateXAID()),
              o.Log.warn('Generate XAID => ' + t),
              window.localStorage.setItem('cmplay_xaid', t + '')),
            t
          );
        }),
        (e.CMPLAY = 0),
        (e.QTT = 1),
        (e.GDT = 2),
        (e.POKI = 3),
        (e.IQIYI = 4),
        (e.SHAREIT = 5),
        (e.mPlatform = void 0),
        e
      );
    })();
    o.Platform = t;
  })(CMPlay || (CMPlay = {})),
  (function (l) {
    var t = void 0,
      n = (function () {
        function d() {}
        return (
          (d.getHost = function () {
            return null != t
              ? t
              : (t = l.Global.debugInfoc
                  ? 'http://111.230.84.242/g/v1'
                  : l.Global.isOversea
                  ? 'https://helpgamemoneysdkov1.cheetahfun.net/g/v1'
                  : 'https://helpgamemoneysdk1.ksmobile.com/g/v1');
          }),
          (d.parseData = function (t) {
            if (!t) return -1;
            var e = t.indexOf('result=');
            if (e < 0) return -2;
            if (e + 7 >= t.length) return -3;
            var o = t.charAt(e + 7);
            return parseInt(o);
          }),
          (d.getCommonData = function () {
            return l.Global.isOversea
              ? 'product_no=416&public_index=1&gm_id=' +
                  l.Global.public.xaid +
                  '&ver=0&cn=' +
                  l.Global.public.cn +
                  '&brand=' +
                  l.Global.public.brand +
                  '&model=' +
                  l.Global.public.model +
                  '&api_level=0&rom=0&rom_ver=0&cube_ver=0&uptime=' +
                  l.SysUtil.getTimeSeconds() +
                  '&build_time=0'
              : 'product_no=394&public_index=1&xaid=' +
                  l.Global.public.xaid +
                  '&ver=0&cn=' +
                  l.Global.public.cn +
                  '&mcc=0&mnc=0&brand=' +
                  l.Global.public.brand +
                  '&model=' +
                  l.Global.public.model +
                  '&api_level=0&rom=0&rom_ver=0&uptime=' +
                  l.SysUtil.getTimeSeconds() +
                  '&accountid=' +
                  l.Global.public.accountid +
                  '&cube_ver=0&iid=0&imei=0&mac=0';
          }),
          (d.report = function (n, a, i) {
            var t = d.getCommonData(),
              e = d.getHost() + '/?' + t + '&' + a,
              o = encodeURI(e),
              r = Date.now(),
              s = l.Global.debugInfoc ? a : '';
            d.httpRequest({
              url: o,
              method: 'GET',
              success: function (t, e) {
                var o = Date.now();
                e
                  ? 1 == d.parseData(e)
                    ? (l.Log.log(
                        'InfocImpl::[' +
                          n +
                          '] ' +
                          s +
                          ' ' +
                          (o - r) +
                          'ms => SUCCESS',
                      ),
                      setTimeout(function () {
                        var t = l.CMInfocCache.pop();
                        t && 0 < t.retry && d.report(t.id, t.info, t.retry - 1);
                      }, 0))
                    : (l.Log.warn(e),
                      0 < i
                        ? (l.Log.log(
                            'InfocImpl::[' +
                              n +
                              '] ' +
                              s +
                              ' ' +
                              (o - r) +
                              'ms ' +
                              i +
                              ' => FAILED1',
                          ),
                          l.CMInfocCache.push(n, a, i - 1))
                        : l.Log.log(
                            'InfocImpl::[' +
                              n +
                              '] ' +
                              s +
                              ' ' +
                              (o - r) +
                              'ms ' +
                              i +
                              ' => FAILED1 DROP',
                          ))
                  : 0 < i
                  ? (l.Log.log(
                      'InfocImpl::[' +
                        n +
                        '] ' +
                        s +
                        ' ' +
                        (o - r) +
                        'ms ' +
                        i +
                        ' => FAILED2',
                    ),
                    l.CMInfocCache.push(n, a, i - 1))
                  : l.Log.log(
                      'InfocImpl::[' +
                        n +
                        '] ' +
                        s +
                        ' ' +
                        (o - r) +
                        'ms ' +
                        i +
                        ' => FAILED2 DROP',
                    );
              },
              fail: function (t, e) {
                0 < i
                  ? (l.Log.error(
                      'InfocImpl::table:' + n + ' code:' + t + ' => FAILED3',
                    ),
                    l.CMInfocCache.push(n, a, i - 1))
                  : l.Log.error(
                      'InfocImpl::table:' +
                        n +
                        ' code:' +
                        t +
                        ' => FAILED3 DROP',
                    );
              },
            });
          }),
          (d.httpRequest = function (e, t) {
            void 0 === t && (t = 3);
            var o = new XMLHttpRequest();
            for (var n in (o.open(e.method, e.url), e.header))
              o.setRequestHeader(n, e.header[n]);
            (o.onreadystatechange = function () {
              if (4 == o.readyState)
                if (200 == o.status) {
                  if (e.success)
                    if ('json' == e.dataType)
                      try {
                        e.success(
                          o.status,
                          JSON.parse(o.responseText),
                          o.getAllResponseHeaders(),
                        );
                      } catch (t) {
                        e.success(
                          o.status,
                          o.responseText,
                          o.getAllResponseHeaders(),
                        );
                      }
                    else
                      e.success(
                        o.status,
                        o.responseText,
                        o.getAllResponseHeaders(),
                      );
                } else
                  1 < t
                    ? d.httpRequest(e, t - 1)
                    : e.fail && e.fail(o.status, o.responseText);
            }),
              o.send(JSON.stringify(e.data));
          }),
          d
        );
      })();
    l.CMInfocImpl = n;
    var e = (function () {
      function t() {
        this.mMap = new l.Dictionary();
      }
      return (
        (t.prototype.set = function (t, e) {
          if (null == t || null == t)
            throw new Error('ERROR: key cannot be null or undefined!');
          if (null == e || null == e)
            throw new Error('ERROR: value cannot be null or undefined!');
          return this.mMap.put(t, e), this;
        }),
        (t.prototype.buildDataString = function (t) {
          for (
            var e = 'business_index=' + t + '&',
              o = this.mMap.size(),
              n = this.mMap.getPairs(),
              a = 0;
            a < o;
            a++
          ) {
            var i = n[a];
            e += i.key + '=' + i.value + '&';
          }
          return 1 < e.length && (e = e.slice(0, e.length - 1)), e;
        }),
        (t.prototype.report = function (t) {
          var e = this.buildDataString(t),
            o = l.SysUtil.getTimeSeconds();
          Math.abs(o - l.Global.initTime) < 3
            ? l.CMInfocCache.push(t, e, 10)
            : setTimeout(function () {
                n.report(t, e, 10);
              }, 0);
        }),
        t
      );
    })();
    l.CMInfoc = e;
  })(CMPlay || (CMPlay = {})),
  (function (e) {
    var i = [],
      t = void 0,
      o = (function () {
        function a() {}
        return (
          (a.push = function (t, e, o) {
            a.resetWakeupTimer();
            var n = {
              id: t,
              info: e,
              retry: o,
            };
            i.push(n), 1e3 < i.length && i.pop();
          }),
          (a.pop = function () {
            return i.shift();
          }),
          (a.resetWakeupTimer = function () {
            t && (clearTimeout(t), (t = void 0)),
              (t = setTimeout(function () {
                var t = a.pop();
                t && e.CMInfocImpl.report(t.id, t.info, t.retry);
              }, 5e3));
          }),
          a
        );
      })();
    e.CMInfocCache = o;
  })(CMPlay || (CMPlay = {})),
  (function (o) {
    var t = (function () {
      function t() {}
      return (
        (t.report = function (t) {
          o.Global.public.game_page < 1 &&
            o.Log.error(
              '###### ERROR: Invoke CMPlay.init before reportAction !!! ######',
            );
          var e = new o.CMInfoc();
          e.set('uptime2', o.SysUtil.getTimeSeconds()),
            e.set('page', o.Global.public.game_page),
            e.set('action', t),
            e.set('x5', 0),
            e.set('game_ver', o.Global.public.game_ver),
            e.set('sdk_ver', o.SDK_VER),
            e.set('game_type', ''),
            e.set('network', '0'),
            o.Global.isOversea
              ? e.report(104)
              : (e.set('gamename', o.Global.public.game_name), e.report(121));
        }),
        t
      );
    })();
    o.cmplay_action = t;
  })(CMPlay || (CMPlay = {})),
  (function (a) {
    var t = (function () {
      function t() {}
      return (
        (t.report = function (t, e, o) {
          a.Global.public.game_page < 1 &&
            a.Log.error(
              '###### ERROR: Invoke CMPlay.init before reportAction !!! ######',
            );
          var n = new a.CMInfoc();
          n.set('uptime2', a.SysUtil.getTimeSeconds()),
            n.set('url', t),
            n.set('errcode', e),
            n.set('errmsg', o),
            n.set('network', '0'),
            a.Global.isOversea,
            n.report(103);
        }),
        t
      );
    })();
    a.cmplay_error = t;
  })(CMPlay || (CMPlay = {})),
  (function (r) {
    var t = (function () {
      function t() {
        this.mAd = void 0;
      }
      return (
        (t.prototype.init = function (t) {
          (this.mAd = new r.CMAd()),
            this.mAd.init(t),
            window.RewardVideo &&
              window.RewardVideo.setGameName &&
              (r.Log.warn('init setGameName => ' + t.gameName),
              window.RewardVideo.setGameName(t.gameName));
        }),
        (t.prototype.login = function (i) {
          var t = r.getSystemInfoSync();
          !t.gameToken || t.gameToken.length < 10
            ? (r.Log.error('CMPlay::Missing gameToken!!!'),
              i && i(!1, void 0, void 0, 0, 0))
            : r.CMService.loginCMPlay({
                callback: function (t, e, o, n, a) {
                  e && (r.Global.data.mCMPlayerId = e),
                    o && (r.Global.data.mCMToken = o),
                    i && i(t, e, o, n, a);
                },
              });
        }),
        (t.prototype.startRewardVideo = function (t) {
          return this.mAd.startRewardVideo(t);
        }),
        (t.prototype.showOpenGameAd = function () {
          return this.mAd.showOpenGameAd();
        }),
        (t.prototype.showBanner = function () {
          return this.mAd.showBanner();
        }),
        (t.prototype.hideBanner = function () {
          return this.mAd.hideBanner();
        }),
        (t.prototype.showInterstitialAd = function (t) {
          return this.mAd.showInterstitialAd();
        }),
        (t.prototype.getAppID = function () {
          if (window.GameJs && window.GameJs.getAppID)
            return window.GameJs.getAppID();
        }),
        (t.prototype.getUID = function () {
          return window.GameJs && window.GameJs.getUID
            ? window.GameJs.getUID()
            : r.Platform.getXAID();
        }),
        (t.prototype.getGameToken = function () {
          return window.GameJs && window.GameJs.getGameToken
            ? window.GameJs.getGameToken()
            : '';
        }),
        (t.prototype.getPayload = function () {
          return '';
        }),
        (t.prototype.setStorageList = function (t, e) {
          r.CMService.setStorage({
            kvDatas: t,
            success: function (t) {
              e && e(!0);
            },
            fail: function (t) {
              r.Log.error('setStorageList => failed'), e && e(!1);
            },
          });
        }),
        (t.prototype.getStroageList = function (t, e) {
          r.CMService.getStorage({
            keys: t,
            success: function (t) {
              t && t.result && t.result.data
                ? e && e(t.result.data)
                : e && e(void 0);
            },
            fail: function (t) {
              r.Log.error('getStroageList => failed'), e && e(void 0);
            },
          });
        }),
        (t.prototype.delStroageList = function (t, e) {
          r.CMService.delStorage({
            keys: t,
            success: function (t) {
              e && e(!0);
            },
            fail: function (t) {
              r.Log.error('delStroageList => failed'), e && e(!1);
            },
          });
        }),
        (t.prototype.onGameLoadStart = function () {}),
        (t.prototype.onGameLoadFinished = function () {}),
        (t.prototype.onGameMainStart = function () {}),
        (t.prototype.onGameStart = function () {}),
        (t.prototype.onGameStop = function () {}),
        (t.prototype.onGameLevelPass = function (t) {}),
        t
      );
    })();
    r.CM = t;
  })(CMPlay || (CMPlay = {})),
  (function (r) {
    var t = (function () {
      function t() {
        (this.mCMAPI = void 0), (this.mAd = void 0), (this.mGameToken = void 0);
      }
      return (
        (t.prototype.init = function () {
          var e = this,
            t = this.getUID();
          (this.mAd = new r.GDTAd()),
            this.mAd.init(),
            (this.mCMAPI = new r.CMAPI({
              vmframe: 'https://superman.cmcm.com/cmplaysdk/gdt/gdt.js',
              appid: 'guangdiantong_gamecenter',
              appkey: '201903046679381196927',
              host: 'gdt-gc-gateway-svc.beike.cn',
              uuid: t,
            })),
            this.mCMAPI.getGameToken(function (t) {
              r.Log.warn('GDT::init => gameToken: ' + t), (e.mGameToken = t);
            });
        }),
        (t.prototype.login = function (i) {
          var t = this,
            e = this.mCMAPI.getTokenState();
          e == r.TokenState.TOKEN_READY
            ? ((r.Global.data.mSystemInfo.gameToken = this.getGameToken()),
              r.Log.log(
                'GDT::login => gameToken:' +
                  r.Global.data.mSystemInfo.gameToken,
              ),
              r.CMService.loginCMPlay({
                callback: function (t, e, o, n, a) {
                  e && (r.Global.data.mCMPlayerId = e),
                    o && (r.Global.data.mCMToken = o),
                    i && i(t, e, o, n, a);
                },
              }))
            : e == r.TokenState.TOKEN_FAILD
            ? (r.Log.error('GDT::login => failed'),
              i && i(!1, void 0, void 0, 0, 0))
            : (r.Log.warn('GDT::login => delay, tokenState:' + e),
              setTimeout(function () {
                t.login(i);
              }, 100));
        }),
        (t.prototype.startRewardVideo = function (t) {
          return this.mAd.startRewardVideo(t);
        }),
        (t.prototype.showOpenGameAd = function () {
          return this.mAd.showOpenGameAd();
        }),
        (t.prototype.showBanner = function () {
          return this.mAd.showBanner();
        }),
        (t.prototype.hideBanner = function () {
          return this.mAd.hideBanner();
        }),
        (t.prototype.showInterstitialAd = function (t) {
          var e = this.getInterstitalAdCount();
          return (
            this.plusInterstitalAdCount(),
            r.Log.warn('GDT::showInterstitialAd refCount=' + e),
            e % 3 == 2 ? this.mAd.showInterstitialAd(t) : (t && t(!1), !1)
          );
        }),
        (t.prototype.getAppID = function () {
          return 'gdt';
        }),
        (t.prototype.getUID = function () {
          var t = r.getQueryString('uuid', '');
          return '' != t && 10 < t.length ? t : r.Platform.getXAID();
        }),
        (t.prototype.getGameToken = function () {
          return this.mGameToken;
        }),
        (t.prototype.getPayload = function () {
          return this.mCMAPI.getPayload();
        }),
        (t.prototype.setStorageList = function (t, e) {
          r.CMService.setStorage({
            kvDatas: t,
            success: function (t) {
              e && e(!0);
            },
            fail: function (t) {
              r.Log.error('GDT::setStorageList => failed'), e && e(!1);
            },
          });
        }),
        (t.prototype.getStroageList = function (t, e) {
          r.CMService.getStorage({
            keys: t,
            success: function (t) {
              t && t.result && t.result.data
                ? e && e(t.result.data)
                : e && e(void 0);
            },
            fail: function (t) {
              r.Log.error('GDT::getStroageList => failed'), e && e(void 0);
            },
          });
        }),
        (t.prototype.delStroageList = function (t, e) {
          r.CMService.delStorage({
            keys: t,
            success: function (t) {
              e && e(!0);
            },
            fail: function (t) {
              r.Log.error('GDT::delStroageList => failed'), e && e(!1);
            },
          });
        }),
        (t.prototype.getInterstitalAdCount = function () {
          return Number(
            window.localStorage.getItem('gdt_interstital_ad_pref') || '0',
          );
        }),
        (t.prototype.plusInterstitalAdCount = function () {
          var t = this.getInterstitalAdCount() + 1;
          window.localStorage.setItem('gdt_interstital_ad_pref', t + '');
        }),
        (t.prototype.onGameLoadStart = function () {}),
        (t.prototype.onGameLoadFinished = function () {}),
        (t.prototype.onGameMainStart = function () {}),
        (t.prototype.onGameStart = function () {}),
        (t.prototype.onGameStop = function () {}),
        (t.prototype.onGameLevelPass = function (t) {}),
        t
      );
    })();
    r.GDT = t;
  })(CMPlay || (CMPlay = {})),
  (function (r) {
    var e = function () {
        return 'iqiyi_gamecenter_create_role_' + r.Global.public.game_page;
      },
      t = (function () {
        function t() {
          (this.mCMAPI = void 0),
            (this.mAd = void 0),
            (this.mGameToken = void 0);
        }
        return (
          (t.prototype.init = function () {
            var e = this,
              t = this.getUID();
            (this.mAd = new r.IQIYIAd()),
              this.mAd.init(),
              (this.mCMAPI = new r.CMAPI({
                vmframe: 'https://superman.cmcm.com/cmplaysdk/api/iqiyi.js',
                appid: 'iqiyi_gamecenter',
                appkey: '201903046679381196927',
                host: 'iqiyigame-gateway-svc.beike.cn',
                uuid: t,
              })),
              this.mCMAPI.getGameToken(function (t) {
                r.Log.warn('IQIYI::init => gameToken: ' + t),
                  (e.mGameToken = t);
              });
          }),
          (t.prototype.login = function (i) {
            var t = this,
              e = this.mCMAPI.getTokenState();
            e == r.TokenState.TOKEN_READY
              ? ((r.Global.data.mSystemInfo.gameToken = this.getGameToken()),
                r.Log.log(
                  'IQIYI::login => gameToken:' +
                    r.Global.data.mSystemInfo.gameToken,
                ),
                r.CMService.loginCMPlay({
                  callback: function (t, e, o, n, a) {
                    e && (r.Global.data.mCMPlayerId = e),
                      o && (r.Global.data.mCMToken = o),
                      i && i(t, e, o, n, a);
                  },
                }))
              : e == r.TokenState.TOKEN_FAILD
              ? (r.Log.error('IQIYI::login => failed'),
                i && i(!1, void 0, void 0, 0, 0))
              : (r.Log.warn('IQIYI::login => delay'),
                setTimeout(function () {
                  t.login(i);
                }, 100));
          }),
          (t.prototype.startRewardVideo = function (t) {
            return this.mAd.startRewardVideo(t);
          }),
          (t.prototype.showOpenGameAd = function () {
            return this.mAd.showOpenGameAd();
          }),
          (t.prototype.showBanner = function () {
            return this.mAd.showBanner();
          }),
          (t.prototype.hideBanner = function () {
            return this.mAd.hideBanner();
          }),
          (t.prototype.showInterstitialAd = function (t) {
            var e = this.getInterstitalAdCount();
            return (
              this.plusInterstitalAdCount(),
              r.Log.warn('IQIYI::showInterstitialAd refCount=' + e),
              e % 3 == 2 ? this.mAd.showInterstitialAd(t) : (t && t(!1), !1)
            );
          }),
          (t.prototype.getAppID = function () {
            return 'iqiyi';
          }),
          (t.prototype.getUID = function () {
            var t = r.getQueryString('user_id', '');
            return '' != t && 10 < t.length ? t : r.Platform.getXAID();
          }),
          (t.prototype.getGameToken = function () {
            return this.mGameToken;
          }),
          (t.prototype.getPayload = function () {
            return this.mCMAPI.getPayload();
          }),
          (t.prototype.setStorageList = function (t, e) {
            r.CMService.setStorage({
              kvDatas: t,
              success: function (t) {
                e && e(!0);
              },
              fail: function (t) {
                r.Log.error('IQIYI::setStorageList => failed'), e && e(!1);
              },
            });
          }),
          (t.prototype.getStroageList = function (t, e) {
            r.CMService.getStorage({
              keys: t,
              success: function (t) {
                t && t.result && t.result.data
                  ? e && e(t.result.data)
                  : e && e(void 0);
              },
              fail: function (t) {
                r.Log.error('IQIYI::getStroageList => failed'), e && e(void 0);
              },
            });
          }),
          (t.prototype.delStroageList = function (t, e) {
            r.CMService.delStorage({
              keys: t,
              success: function (t) {
                e && e(!0);
              },
              fail: function (t) {
                r.Log.error('IQIYI::delStroageList => failed'), e && e(!1);
              },
            });
          }),
          (t.prototype.getInterstitalAdCount = function () {
            return Number(
              window.localStorage.getItem('iqiyi_interstital_ad_pref') || '0',
            );
          }),
          (t.prototype.plusInterstitalAdCount = function () {
            var t = this.getInterstitalAdCount() + 1;
            window.localStorage.setItem('iqiyi_interstital_ad_pref', t + '');
          }),
          (t.prototype.onGameLoadStart = function () {}),
          (t.prototype.onGameLoadFinished = function () {}),
          (t.prototype.onGameMainStart = function () {
            try {
              window.top.postMessage(
                {
                  type: 'dataCount',
                  msg: 'server',
                },
                '*',
              ),
                console.warn("IQIYI::onGameMainStart => post msg['server']");
            } catch (t) {}
            if (this.isRoleCreated())
              console.warn(
                "IQIYI::onGameMainStart => skip post msg['role'] for created before",
              );
            else
              try {
                window.top.postMessage(
                  {
                    type: 'dataCount',
                    msg: 'role',
                  },
                  '*',
                ),
                  this.setRoleCreated(),
                  console.warn("IQIYI::onGameMainStart => post msg['role']");
              } catch (t) {}
          }),
          (t.prototype.onGameStart = function () {
            try {
              window.top.postMessage(
                {
                  type: 'dataCount',
                  msg: 'start',
                },
                '*',
              ),
                console.warn("IQIYI::onGameStart => post msg['start']");
            } catch (t) {
              console.error(
                'IQIYI::onGameMainStart => ERROR:' + JSON.stringify(t.stack),
              );
            }
          }),
          (t.prototype.onGameStop = function () {}),
          (t.prototype.onGameLevelPass = function (t) {}),
          (t.prototype.isRoleCreated = function () {
            return '0' != (window.localStorage.getItem(e()) || '0');
          }),
          (t.prototype.setRoleCreated = function () {
            window.localStorage.setItem(e(), '1');
          }),
          t
        );
      })();
    r.IQIYI = t;
  })(CMPlay || (CMPlay = {})),
  (function (r) {
    var t = (function () {
      function t() {
        (this.mCMAPI = void 0),
          (this.mAd = void 0),
          (this.mPokiAd = void 0),
          (this.mGameToken = void 0);
      }
      return (
        (t.prototype.init = function () {
          var e = this,
            t = this.getUID();
          (this.mAd = this.mPokiAd = new r.POKIAd()),
            this.mAd.init(),
            (this.mCMAPI = new r.CMAPI({
              vmframe: 'https://h5game.zhhainiao.com/cmplaysdk/poki/poki.js',
              appid: 'poki_game_center',
              appkey: '201903046679381196927',
              host: 'poki-gateway.xyx-svc.zhhainiao.com',
              uuid: t,
            })),
            this.mCMAPI.getGameToken(function (t) {
              r.Log.warn('POKI::init => gameToken: ' + t), (e.mGameToken = t);
            });
        }),
        (t.prototype.login = function (i) {
          var t = this,
            e = this.mCMAPI.getTokenState();
          e == r.TokenState.TOKEN_READY
            ? ((r.Global.data.mSystemInfo.gameToken = this.getGameToken()),
              r.Log.log(
                'POKI::login => gameToken:' +
                  r.Global.data.mSystemInfo.gameToken,
              ),
              r.CMService.loginCMPlay({
                callback: function (t, e, o, n, a) {
                  e && (r.Global.data.mCMPlayerId = e),
                    o && (r.Global.data.mCMToken = o),
                    i && i(t, e, o, n, a);
                },
              }))
            : e == r.TokenState.TOKEN_FAILD
            ? (r.Log.error('POKI::login => failed'),
              i && i(!1, void 0, void 0, 0, 0))
            : (r.Log.warn('POKI::login => delay'),
              setTimeout(function () {
                t.login(i);
              }, 100));
        }),
        (t.prototype.startRewardVideo = function (t) {
          return this.mAd.startRewardVideo(t);
        }),
        (t.prototype.showOpenGameAd = function () {
          return this.mAd.showOpenGameAd();
        }),
        (t.prototype.showBanner = function () {
          return this.mAd.showBanner();
        }),
        (t.prototype.hideBanner = function () {
          return this.mAd.hideBanner();
        }),
        (t.prototype.showInterstitialAd = function (t) {
          var e = this.getInterstitalAdCount();
          return (
            this.plusInterstitalAdCount(),
            r.Log.warn('POKI::showInterstitialAd refCount=' + e),
            e % 2 == 2 ? this.mAd.showInterstitialAd(t) : (t && t(!1), !1)
          );
        }),
        (t.prototype.getAppID = function () {
          return 'poki';
        }),
        (t.prototype.getUID = function () {
          return r.Platform.getXAID();
        }),
        (t.prototype.getGameToken = function () {
          return this.mGameToken;
        }),
        (t.prototype.getPayload = function () {
          return this.mCMAPI.getPayload();
        }),
        (t.prototype.setStorageList = function (t, e) {
          r.CMService.setStorage({
            kvDatas: t,
            success: function (t) {
              e && e(!0);
            },
            fail: function (t) {
              r.Log.error('POKI::setStorageList => failed'), e && e(!1);
            },
          });
        }),
        (t.prototype.getStroageList = function (t, e) {
          r.CMService.getStorage({
            keys: t,
            success: function (t) {
              t && t.result && t.result.data
                ? e && e(t.result.data)
                : e && e(void 0);
            },
            fail: function (t) {
              r.Log.error('POKI::getStroageList => failed'), e && e(void 0);
            },
          });
        }),
        (t.prototype.delStroageList = function (t, e) {
          r.CMService.delStorage({
            keys: t,
            success: function (t) {
              e && e(!0);
            },
            fail: function (t) {
              r.Log.error('POKI::delStroageList => failed'), e && e(!1);
            },
          });
        }),
        (t.prototype.getInterstitalAdCount = function () {
          return Number(
            window.localStorage.getItem('poki_interstital_ad_pref') || '0',
          );
        }),
        (t.prototype.plusInterstitalAdCount = function () {
          var t = this.getInterstitalAdCount() + 1;
          window.localStorage.setItem('poki_interstital_ad_pref', t + '');
        }),
        (t.prototype.onGameLoadStart = function () {
          this.mPokiAd.gameLoadingStart();
        }),
        (t.prototype.onGameLoadFinished = function () {
          this.mPokiAd.gameLoadingFinished();
        }),
        (t.prototype.onGameMainStart = function () {}),
        (t.prototype.onGameStart = function () {
          this.mPokiAd.gamePlayStart();
        }),
        (t.prototype.onGameStop = function () {
          this.mPokiAd.gamePlayStop();
        }),
        (t.prototype.onGameLevelPass = function (t) {
          var e = this.getHappyIntensity(t);
          r.Log.warn('POKI::onGameLevelPass => happyIntensity:' + e),
            0 < e && this.mPokiAd.happyTime(e);
        }),
        (t.prototype.getHappyIntensity = function (t) {
          var e = '_' + t,
            o = window.localStorage.getItem('poki_level_pass') || '';
          if (o.indexOf(e) < 0) {
            var n = e + ',' + o;
            window.localStorage.setItem('poki_level_pass', n);
            var a = 0.1 + 0.1 * t;
            return 0.6 < a && (a = 0.6), a;
          }
          return 0;
        }),
        t
      );
    })();
    r.POKI = t;
  })(CMPlay || (CMPlay = {})),
  (function (r) {
    var a = [
        'a3BWxTMAGrA9',
        'a3BWxSuGte5d',
        'a3BWxX98eGXS',
        'a3BWxY9DwmEm',
        'a3CScC7gcqEu',
      ],
      t = (function () {
        function t() {
          (this.mCMAPI = void 0),
            (this.mAd = void 0),
            (this.mGameToken = void 0),
            (this.mOpenID = '0'),
            (this.mAppID = ''),
            (this.mGameName = ''),
            (this.loadComplete = !1),
            (this.loadingFinished = !1);
        }
        return (
          (t.prototype.init = function () {
            var n = this,
              t = this.getUID();
            (this.mAppID = r.getQueryString('appid', '')),
              (this.mGameName = r.getQueryString('app_name', ''));
            var e = r.getQueryString('ticket', '');
            -1 != a.indexOf(this.mAppID)
              ? (this.mAd = new r.QTTV2Ad())
              : (this.mAd = new r.QTTAd()),
              this.mAd.init();
            var o = {
              platform: 'qtt',
              ticket: e,
              appid: this.mAppID,
            };
            (this.mCMAPI = new r.CMAPI({
              vmframe: 'https://superman.cmcm.com/cmplaysdk/qtt/qutoutiao.js',
              appid: 'qutoutiao',
              appkey: '201903046679381196927',
              host: 'qtt-xyx-sdk-gateway-svc.beike.cn',
              uuid: t,
              loginType: r.LoginType.QTT,
              loginParams: o,
            })),
              this.mCMAPI.getGameToken(function (t) {
                r.Log.warn('QTT::init => gameToken: ' + t), (n.mGameToken = t);
                try {
                  var e = n.getPayload();
                  if (e) {
                    var o = JSON.parse(e);
                    o && o.union_id && (r.Global.public.accountid = o.union_id),
                      o && o.open_id && (n.mOpenID = o.open_id);
                  }
                } catch (t) {}
              }),
              r.Log.warn('appid => ' + this.mAppID),
              r.Log.warn('ticket => ' + e);
          }),
          (t.prototype.login = function (i) {
            var t = this,
              e = this.mCMAPI.getTokenState();
            e == r.TokenState.TOKEN_READY
              ? ((r.Global.data.mSystemInfo.gameToken = this.getGameToken()),
                r.Log.log(
                  'QTT::login => gameToken:' +
                    r.Global.data.mSystemInfo.gameToken,
                ),
                r.CMService.loginCMPlay({
                  callback: function (t, e, o, n, a) {
                    e && (r.Global.data.mCMPlayerId = e),
                      o && (r.Global.data.mCMToken = o),
                      i && i(t, e, o, n, a);
                  },
                }))
              : e == r.TokenState.TOKEN_FAILD
              ? (r.Log.error('QTT::login => failed'),
                i && i(!1, void 0, void 0, 0, 0))
              : (r.Log.warn('QTT::login => delay'),
                setTimeout(function () {
                  t.login(i);
                }, 100));
          }),
          (t.prototype.startRewardVideo = function (t) {
            return this.mAd.startRewardVideo(t);
          }),
          (t.prototype.showOpenGameAd = function () {
            return this.mAd.showOpenGameAd();
          }),
          (t.prototype.showBanner = function () {
            return this.mAd.showBanner();
          }),
          (t.prototype.hideBanner = function () {
            return this.mAd.hideBanner();
          }),
          (t.prototype.showInterstitialAd = function (t) {
            var e = this.getInterstitalAdCount();
            return (
              this.plusInterstitalAdCount(),
              r.Log.warn('QTT::showInterstitialAd refCount=' + e),
              e % 3 == 2 ? this.mAd.showInterstitialAd(t) : (t && t(!1), !1)
            );
          }),
          (t.prototype.getAppID = function () {
            return 'qtt';
          }),
          (t.prototype.getUID = function () {
            var t = r.getQueryString('uuid', '');
            return '' != t && 10 < t.length ? t : r.Platform.getXAID();
          }),
          (t.prototype.getGameToken = function () {
            return this.mGameToken;
          }),
          (t.prototype.getPayload = function () {
            return this.mCMAPI.getPayload();
          }),
          (t.prototype.setStorageList = function (t, e) {
            r.CMService.setStorage({
              kvDatas: t,
              success: function (t) {
                e && e(!0);
              },
              fail: function (t) {
                r.Log.error('QTT::setStorageList => failed'), e && e(!1);
              },
            });
          }),
          (t.prototype.getStroageList = function (t, e) {
            r.CMService.getStorage({
              keys: t,
              success: function (t) {
                t && t.result && t.result.data
                  ? e && e(t.result.data)
                  : e && e(void 0);
              },
              fail: function (t) {
                r.Log.error('QTT::getStroageList => failed'), e && e(void 0);
              },
            });
          }),
          (t.prototype.delStroageList = function (t, e) {
            r.CMService.delStorage({
              keys: t,
              success: function (t) {
                e && e(!0);
              },
              fail: function (t) {
                r.Log.error('QTT::delStroageList => failed'), e && e(!1);
              },
            });
          }),
          (t.prototype.getInterstitalAdCount = function () {
            return Number(
              window.localStorage.getItem('interstital_ad_pref') || '0',
            );
          }),
          (t.prototype.plusInterstitalAdCount = function () {
            var t = this.getInterstitalAdCount() + 1;
            window.localStorage.setItem('interstital_ad_pref', t + '');
          }),
          (t.prototype.onGameLoadStart = function () {}),
          (t.prototype.onGameLoadFinished = function () {
            if (!this.loadComplete) {
              this.loadComplete = !0;
              try {
                var t = {
                  open_id: this.mOpenID,
                  app_id: this.mAppID,
                  game_name: this.mGameName,
                };
                window.qttGame && window.qttGame.loadComplete(t);
              } catch (t) {
                console.error(
                  'QTT:onGameLoadFinished => ERROR: ' + JSON.stringify(t.stack),
                );
              }
            }
          }),
          (t.prototype.onGameMainStart = function () {
            if (!this.loadingFinished) {
              this.loadingFinished = !0;
              try {
                var t = {
                  open_id: this.mOpenID,
                  app_id: this.mAppID,
                  game_name: this.mGameName,
                };
                window.qttGame && window.qttGame.loadingFinished(t);
              } catch (t) {
                console.error(
                  'QTT:onGameMainStart => ERROR: ' + JSON.stringify(t.stack),
                );
              }
            }
          }),
          (t.prototype.onGameStart = function () {
            try {
              var t = {
                open_id: this.mOpenID,
                app_id: this.mAppID,
                game_name: this.mGameName,
              };
              window.qttGame && window.qttGame.startPlayGame(t);
            } catch (t) {
              console.error('QTT:onGameStart => ' + JSON.stringify(t.stack));
            }
          }),
          (t.prototype.onGameStop = function () {}),
          (t.prototype.onGameLevelPass = function (t) {
            try {
              window.qtt_help &&
                window.qtt_help.task &&
                window.qtt_help.task.completeTask(),
                window.qttGame &&
                  window.qttGame.task &&
                  window.qttGame.task.completeTask();
            } catch (t) {
              r.Log.error('QTT:onGameLevelPass => ' + JSON.stringify(t.stack));
            }
            try {
              var e = {
                role: '',
                region: '',
                level: t + '',
                ce: '',
                round: '1',
                revenue: '',
              };
              window.qttGame && window.qttGame.userInfo(e);
            } catch (t) {
              console.error(
                'QTT:onGameLevelPass => ' + JSON.stringify(t.stack),
              );
            }
          }),
          t
        );
      })();
    r.QTT = t;
  })(CMPlay || (CMPlay = {})),
  (function (r) {
    var t = (function () {
      function t() {}
      return (
        (t.ROLL_SKY = 22),
        (t.BRICK_BALL = 30),
        (t.DANC_LINE = 29),
        (t.PIANO_TILES = 28),
        (t.FARM = 41),
        (t.GAME_2048 = 27),
        (t.DEEP_FISH = 23),
        (t.FRUIT_NINJA = 54),
        (t.FOOTBALL = 36),
        (t.SAIL_LEGEND = 31),
        (t.STARS_2 = 45),
        (t.SNAKE_BLOCK = 38),
        t
      );
    })();
    r.PAGE = t;
    var e = (function () {
      function t() {
        (this.mCMAPI = void 0),
          (this.mAd = void 0),
          (this.mShareItAd = void 0),
          (this.mGameToken = void 0);
      }
      return (
        (t.prototype.init = function (t) {
          var e = this,
            o = this.getUID();
          (this.mAd = this.mShareItAd = new r.SIAd()),
            this.mAd.init(t),
            (this.mCMAPI = new r.CMAPI({
              vmframe:
                'https://h5game.zhhainiao.com/cmplaysdk/api/qiezikuaichuan.js',
              appid: 'qiezikuaichuan_gamecenter',
              appkey: '201903046679381196927',
              host: 'qzkc-gateway.xyx-svc.zhhainiao.com',
              uuid: o,
            })),
            this.mCMAPI.getGameToken(function (t) {
              r.Log.warn('ShareIt::init => gameToken: ' + t),
                (e.mGameToken = t);
            });
        }),
        (t.prototype.login = function (i) {
          var t = this,
            e = this.mCMAPI.getTokenState();
          e == r.TokenState.TOKEN_READY
            ? ((r.Global.data.mSystemInfo.gameToken = this.getGameToken()),
              r.Log.log(
                'ShareIt::login => gameToken:' +
                  r.Global.data.mSystemInfo.gameToken,
              ),
              r.CMService.loginCMPlay({
                callback: function (t, e, o, n, a) {
                  e && (r.Global.data.mCMPlayerId = e),
                    o && (r.Global.data.mCMToken = o),
                    i && i(t, e, o, n, a);
                },
              }))
            : e == r.TokenState.TOKEN_FAILD
            ? (r.Log.error('ShareIt::login => failed'),
              i && i(!1, void 0, void 0, 0, 0))
            : (r.Log.warn('ShareIt::login => delay'),
              setTimeout(function () {
                t.login(i);
              }, 100));
        }),
        (t.prototype.startRewardVideo = function (t) {
          return this.mAd.startRewardVideo(t);
        }),
        (t.prototype.showOpenGameAd = function () {
          return this.mAd.showOpenGameAd();
        }),
        (t.prototype.showBanner = function () {
          return this.mAd.showBanner();
        }),
        (t.prototype.hideBanner = function () {
          return this.mAd.hideBanner();
        }),
        (t.prototype.showInterstitialAd = function (t) {
          var e = this.getInterstitalAdCount();
          return (
            this.plusInterstitalAdCount(),
            r.Log.warn('ShareIt::showInterstitialAd refCount=' + e),
            this.mAd.showInterstitialAd(t)
          );
        }),
        (t.prototype.getAppID = function () {
          return 'shareit';
        }),
        (t.prototype.getUID = function () {
          return r.Platform.getXAID();
        }),
        (t.prototype.getGameToken = function () {
          return this.mGameToken;
        }),
        (t.prototype.getPayload = function () {
          return this.mCMAPI.getPayload();
        }),
        (t.prototype.setStorageList = function (t, e) {
          r.CMService.setStorage({
            kvDatas: t,
            success: function (t) {
              e && e(!0);
            },
            fail: function (t) {
              r.Log.error('ShareIt::setStorageList => failed'), e && e(!1);
            },
          });
        }),
        (t.prototype.getStroageList = function (t, e) {
          r.CMService.getStorage({
            keys: t,
            success: function (t) {
              t && t.result && t.result.data
                ? e && e(t.result.data)
                : e && e(void 0);
            },
            fail: function (t) {
              r.Log.error('ShareIt::getStroageList => failed'), e && e(void 0);
            },
          });
        }),
        (t.prototype.delStroageList = function (t, e) {
          r.CMService.delStorage({
            keys: t,
            success: function (t) {
              e && e(!0);
            },
            fail: function (t) {
              r.Log.error('ShareIt::delStroageList => failed'), e && e(!1);
            },
          });
        }),
        (t.prototype.getInterstitalAdCount = function () {
          return Number(
            window.localStorage.getItem('qz_interstital_ad_pref') || '0',
          );
        }),
        (t.prototype.plusInterstitalAdCount = function () {
          var t = this.getInterstitalAdCount() + 1;
          window.localStorage.setItem('qz_interstital_ad_pref', t + '');
        }),
        (t.prototype.onGameLoadStart = function () {}),
        (t.prototype.onGameLoadFinished = function () {}),
        (t.prototype.onGameMainStart = function () {}),
        (t.prototype.onGameStart = function () {}),
        (t.prototype.onGameStop = function () {}),
        (t.prototype.onGameLevelPass = function (t) {}),
        t
      );
    })();
    r.ShareIt = e;
  })(CMPlay || (CMPlay = {})),
  (function (t) {
    var e = (function () {
      function t() {
        this.mBGM = {
          src: void 0,
          loop: !0,
          volume: 1,
          id: void 0,
          pausePos: -1,
        };
      }
      return (
        (t.prototype.playBGM = function (t, o, n) {
          var a = this;
          if (
            (void 0 === o && (o = !0),
            void 0 === n && (n = 1),
            this.stopBGM(),
            (this.mBGM.src = t),
            (this.mBGM.loop = o),
            (this.mBGM.volume = 1),
            (this.mBGM.pausePos = -1),
            window.Laya)
          ) {
            var e = Laya.SoundManager.playMusic(t, o ? 0 : 1);
            (e.volume = n), (this.mBGM.id = e);
          } else
            window.cc
              ? (this.mBGM.id = cc.audioEngine.play(t, o, n))
              : window.egret
              ? this.getEgretSound(t, function (t) {
                  if (t) {
                    var e = t.play(0, o ? 0 : 1);
                    (e.volume = n), (a.mBGM.id = e);
                  }
                })
              : console.warn('AudioImpl::playBGM => unsupported');
          return this.mBGM.id;
        }),
        (t.prototype.stopBGM = function () {
          window.Laya
            ? Laya.SoundManager.stopMusic()
            : window.cc
            ? null != this.mBGM.id &&
              (cc.audioEngine.stop(this.mBGM.id), (this.mBGM.id = void 0))
            : window.egret
            ? null != this.mBGM.id &&
              (this.mBGM.id.stop(), (this.mBGM.id = void 0))
            : console.warn('AudioImpl::stopBGM => unsupported');
        }),
        (t.prototype.pauseBGM = function () {
          if (window.Laya)
            this.mBGM.id instanceof Laya.SoundChannel &&
              (t = this.mBGM.id).pause();
          else if (window.cc)
            null != this.mBGM.id && cc.audioEngine.pause(this.mBGM.id);
          else if (window.egret) {
            if (null != this.mBGM.id) {
              var t = this.mBGM.id;
              (this.mBGM.pausePos = t.position),
                t.stop(),
                (this.mBGM.id = void 0);
            }
          } else console.warn('AudioImpl::pauseBGM => unsupported');
        }),
        (t.prototype.resumeBGM = function () {
          var o = this;
          window.Laya
            ? this.mBGM.id instanceof Laya.SoundChannel && this.mBGM.id.resume()
            : window.cc
            ? null != this.mBGM.id && cc.audioEngine.resume(this.mBGM.id)
            : window.egret
            ? this.mBGM.src &&
              -1 != this.mBGM.pausePos &&
              this.getEgretSound(this.mBGM.src, function (t) {
                if (t) {
                  var e = t.play(o.mBGM.pausePos, o.mBGM.loop ? 0 : 1);
                  (e.volume = o.mBGM.volume),
                    (o.mBGM.id = e),
                    (o.mBGM.pausePos = -1);
                }
              })
            : console.warn('AudioImpl::resumeBGM => unsupported');
        }),
        (t.prototype.playEffect = function (t, n) {
          var a = this;
          return (
            void 0 === n && (n = 1),
            window.Laya
              ? Laya.SoundManager.playSound(t, 1)
              : window.cc
              ? cc.audioEngine.play(t, !1, n)
              : void (window.egret
                  ? this.getEgretSound(t, function (t) {
                      if (t) {
                        var e = t.play(0, 1);
                        e.volume = n;
                        var o = function () {
                          e.removeEventListener(
                            egret.Event.SOUND_COMPLETE,
                            o,
                            a,
                          ),
                            e.stop(),
                            (e = void 0);
                        };
                        e.addEventListener(egret.Event.SOUND_COMPLETE, o, a);
                      }
                    })
                  : console.warn('AudioImpl::playEffect => unsupported'))
          );
        }),
        (t.prototype.getEgretSound = function (t, o) {
          var e = RES.getRes(t);
          e
            ? o && o(e)
            : RES.getResAsync(
                t,
                function (t, e) {
                  o && o(t);
                },
                this,
              );
        }),
        t
      );
    })();
    t.AudioImpl = e;
  })(CMPlay || (CMPlay = {})),
  (function (s) {
    var d, t;
    ((t = d = s.TokenState || (s.TokenState = {}))[(t.TOKEN_REQUESTING = 0)] =
      'TOKEN_REQUESTING'),
      (t[(t.TOKEN_READY = 1)] = 'TOKEN_READY'),
      (t[(t.TOKEN_FAILD = 2)] = 'TOKEN_FAILD');
    var e = (function () {
      function t(t) {
        var e = this;
        (this.isRequesting = !1),
          (this.tokenState = d.TOKEN_REQUESTING),
          (this.mAppId = void 0),
          (this.mAppKey = void 0),
          (this.mHost = void 0),
          (this.mData = void 0),
          (this.mLoginType = void 0),
          (this.mLoginParams = void 0),
          (this.mReqTokenCBList = []),
          (this.mIsAPILogin = !1),
          (this.mAppId = t.appid),
          (this.mAppKey = t.appkey),
          (this.mHost = t.host),
          (this.mLoginType = t.loginType),
          (this.mLoginParams = t.loginParams),
          (this.tokenState = d.TOKEN_REQUESTING),
          (this.mReqTokenCBList = []),
          (this.mIsAPILogin =
            null != this.mLoginType && null != this.mLoginParams),
          (this.mData = new s.CMAPIData(this.mAppId, t.uuid)),
          s.SysUtil.loadSDKScript(t.vmframe, !1, function () {
            0 < e.mReqTokenCBList.length
              ? (s.Log.warn(
                  'CMAPI::loadSDKScript => vmframe is Ready, process mReqTokenCBList',
                ),
                e._requestGameToken(void 0))
              : s.Log.warn('CMAPI::loadSDKScript => vmframe is Ready');
          });
      }
      return (
        (t.prototype.getTokenState = function () {
          return this.tokenState;
        }),
        (t.prototype.getPayload = function () {
          return this.mData.getPayload();
        }),
        (t.prototype.getGameToken = function (t) {
          this.mIsAPILogin
            ? this._getLoginGameToken(t)
            : this._getAnonymousGameToken(t);
        }),
        (t.prototype._sign = function (t) {
          try {
            return window.sign(t);
          } catch (t) {
            s.Log.error('CMAPI::sign => ERROR ' + t.message),
              s.Log.error(JSON.stringify(t.stack));
          }
        }),
        (t.prototype._getLoginGameToken = function (t) {
          s.Log.warn('CMAPI::_getLoginGameToken =>'), this._requestGameToken(t);
        }),
        (t.prototype._getAnonymousGameToken = function (t) {
          var e = this.mData.getGameToken();
          if (e && 5 < e.length) {
            var o = this.mData.getLastUpdateSec(),
              n = s.SysUtil.getTimeSeconds(),
              a = Math.abs(n - o);
            86400 < a
              ? (s.Log.warn(
                  'CMAPI::_getAnonymousGameToken => gameToken[' +
                    e +
                    '] diffSec[' +
                    a +
                    '] => OVER 24 HOURS',
                ),
                this._requestGameToken(t))
              : (s.Log.warn(
                  'CMAPI::_getAnonymousGameToken => gameToken[' +
                    e +
                    '] diffSec[' +
                    a +
                    '] => IN 24 HOURS B',
                ),
                t && t(e),
                (this.tokenState = d.TOKEN_READY));
          } else
            s.Log.warn('CMAPI::_getAnonymousGameToken => NOT FOUND gameToken'),
              this._requestGameToken(t);
        }),
        (t.prototype._requestGameToken = function (t) {
          var r = this;
          if (
            (t &&
              this.mReqTokenCBList.indexOf(t) < 0 &&
              this.mReqTokenCBList.push(t),
            window.sign)
          )
            if (this.isRequesting)
              s.Log.warn('CMAPI::_requestGameToken => wait for running');
            else {
              s.Log.warn('CMAPI::_requestGameToken => execute'),
                (this.isRequesting = !0),
                (this.tokenState = d.TOKEN_REQUESTING);
              var e = s.Global.debugService
                  ? 'http://sdkgateway.cmzhtest2.hellocwd.com'
                  : 'https://' + this.mHost,
                o = {
                  ver: 0,
                  channel_id: ['cmcp'],
                  common: {
                    uid: this.mData.getUID(),
                    token: this.mData.getToken(),
                    app_id: this.mAppId,
                  },
                };
              this.mIsAPILogin
                ? ((o.login_type = this.mLoginType),
                  (o.login_params = this.mLoginParams),
                  (e += '/xyx_sdk/gw/partner_login'))
                : (e += '/xyx_sdk/gw/get_token');
              var n = JSON.stringify(o),
                a = this._sign(n);
              this._requestToken(e, n, a, function (t, e) {
                var o = void 0;
                if (t && e.user_info && void 0 !== e.user_info.uid) {
                  o =
                    e.game_tokens &&
                    e.game_tokens.cmcp &&
                    e.game_tokens.cmcp.game_token;
                  var n = e.user_info.uid,
                    a = e.user_info.token,
                    i = e.game_payload || s.EMPTY_STRING;
                  r.mData.setData(n, a, o, i), (r.tokenState = d.TOKEN_READY);
                } else r.tokenState = d.TOKEN_FAILD;
                r.mReqTokenCBList.forEach(function (t) {
                  t && t(o);
                }),
                  (r.isRequesting = !1);
              });
            }
          else s.Log.warn('CMAPI::_requestGameToken => wait for vmframe');
        }),
        (t.prototype._requestToken = function (t, e, o, n) {
          var a = {
            'content-type': 'application/json',
            'X-CF-Secret': o,
            'X-CF-Appid': this.mAppId,
            'X-CF-Appkey': this.mAppKey,
            'X-CF-Ts': s.SysUtil.getTimeSeconds(),
          };
          s.Global.isOutputDebug &&
            (s.Log.log('url => ' + t),
            s.Log.log('header => ' + JSON.stringify(a)),
            s.Log.log('body => ' + e)),
            console.warn('requestToken => url:' + t),
            s.NetworkUtil.httpRequest(
              {
                url: t,
                data: e,
                header: a,
                method: 'POST',
                dataType: 'json',
                success: function (t, e, o) {
                  s.Global.isOutputDebug &&
                    s.Log.warn('requestToken => SUCCESS ' + JSON.stringify(e)),
                    n && n(!0, e);
                },
                fail: function (t, e) {
                  s.Log.error('requestToken => FAILED'), n && n(!1, void 0);
                },
              },
              3,
            );
        }),
        t
      );
    })();
    s.CMAPI = e;
  })(CMPlay || (CMPlay = {})),
  (function (a) {
    a.EMPTY_STRING = '';
    var o = '_cmapi_version_',
      t = (function () {
        function t(t, e) {
          switch (
            ((this.mDataAPI = void 0),
            (this.platform = void 0),
            (this.platform = t),
            this.getDataVersion())
          ) {
            case 3:
              this.mDataAPI = new r(t, e);
              break;
            case 2:
              this.mDataAPI = new i(t);
              break;
            case 1:
              this.mDataAPI = new n(t);
              break;
            default:
              this.mergeData(t, e),
                (this.mDataAPI = this.detectAndGetDataAPI(t, e));
          }
        }
        return (
          (t.prototype.detectAndGetDataAPI = function (t, e) {
            return window.localStorage.getItem(t + '_cmapi_uid_' + e)
              ? new r(t, e)
              : window.localStorage.getItem(t + '_cmapi_uid_')
              ? new i(t)
              : new r(t, e);
          }),
          (t.prototype.mergeData = function (t, e) {
            for (
              var o = [
                  {
                    newKey: t + '_cmapi_uid_',
                    oldKeys: ['_cmapi_uid_'],
                  },
                  {
                    newKey: t + '_cmapi_utoken_',
                    oldKeys: ['_cmapi_utoken_'],
                  },
                  {
                    newKey: t + '_cmapi_game_token_',
                    oldKeys: ['_cmapi_game_token_'],
                  },
                  {
                    newKey: t + '_cmapi_timestamp_',
                    oldKeys: ['_cmapi_timestamp_'],
                  },
                ],
                n = 0;
              n < o.length;
              n++
            ) {
              var a = o[n],
                i = window.localStorage.getItem(a.newKey) || void 0;
              if (null == i)
                for (
                  var r = 0;
                  a.oldKeys instanceof Array && r < a.oldKeys.length;
                  r++
                )
                  if (
                    null !=
                    (i = window.localStorage.getItem(a.oldKeys[r]) || void 0)
                  ) {
                    window.localStorage.setItem(a.newKey, i),
                      window.localStorage.removeItem(a.oldKeys[r]),
                      console.error(
                        'CMAPIData:: merge[' + a.newKey + '] => [' + i + ']',
                      );
                    break;
                  }
            }
          }),
          (t.prototype.setData = function (t, e, o, n) {
            this.mDataAPI.setItem('_cmapi_uid_', t),
              this.mDataAPI.setItem('_cmapi_utoken_', e),
              this.mDataAPI.setItem('_cmapi_game_token_', o),
              this.mDataAPI.setItem('_cmapi_payload_', n),
              this.setLastUpdateSec(a.SysUtil.getTimeSeconds()),
              a.Global.isOutputDebug &&
                (console.warn('CMAPIData::setData => uid:' + t),
                console.warn('CMAPIData::setData => token:' + e),
                console.warn('CMAPIData::setData => gameToken:' + o),
                console.warn('CMAPIData::setData => payload:' + n));
          }),
          (t.prototype.getUID = function () {
            return this.mDataAPI.getItem('_cmapi_uid_', a.EMPTY_STRING);
          }),
          (t.prototype.getToken = function () {
            return this.mDataAPI.getItem('_cmapi_utoken_', a.EMPTY_STRING);
          }),
          (t.prototype.getGameToken = function () {
            return this.mDataAPI.getItem('_cmapi_game_token_', a.EMPTY_STRING);
          }),
          (t.prototype.getPayload = function () {
            return this.mDataAPI.getItem('_cmapi_payload_', a.EMPTY_STRING);
          }),
          (t.prototype.getLastUpdateSec = function () {
            return Number(
              window.localStorage.getItem(
                this.platform + '_cmapi_timestamp_',
              ) || '0',
            );
          }),
          (t.prototype.setLastUpdateSec = function (t) {
            window.localStorage.setItem(
              this.platform + '_cmapi_timestamp_',
              t + a.EMPTY_STRING,
            );
          }),
          (t.prototype.getDataVersion = function () {
            return Number(
              window.localStorage.getItem(this.platform + o) || '0',
            );
          }),
          t
        );
      })();
    a.CMAPIData = t;
    var n = (function () {
        function t(t) {
          window.localStorage.setItem(t + o, '1'),
            a.Global.isOutputDebug && console.error('DataV1 => ');
        }
        return (
          (t.prototype.getItem = function (t, e) {
            return window.localStorage.getItem(t) || e;
          }),
          (t.prototype.setItem = function (t, e) {
            return window.localStorage.setItem(t, e);
          }),
          t
        );
      })(),
      i = (function () {
        function t(t) {
          (this.platform = void 0),
            (this.platform = t),
            window.localStorage.setItem(t + o, '2'),
            a.Global.isOutputDebug && console.error('DataV2 => ');
        }
        return (
          (t.prototype.getItem = function (t, e) {
            return window.localStorage.getItem(this.platform + t) || e;
          }),
          (t.prototype.setItem = function (t, e) {
            return window.localStorage.setItem(this.platform + t, e);
          }),
          t
        );
      })(),
      r = (function () {
        function t(t, e) {
          (this.platform = void 0),
            (this.userid = void 0),
            (this.platform = t),
            (this.userid = e),
            window.localStorage.setItem(t + o, '3'),
            a.Global.isOutputDebug && console.error('DataV3 => ');
        }
        return (
          (t.prototype.getItem = function (t, e) {
            return (
              window.localStorage.getItem(this.platform + t + this.userid) || e
            );
          }),
          (t.prototype.setItem = function (t, e) {
            return window.localStorage.setItem(
              this.platform + t + this.userid,
              e,
            );
          }),
          t
        );
      })();
  })(CMPlay || (CMPlay = {})),
  (function (t) {
    var n = function (t, e) {
      (this.key = null), (this.value = null), (this.key = t), (this.value = e);
    };
    t.Pair = n;
    var e = (function () {
      function t() {
        this.arr = [];
      }
      return (
        (t.prototype.put = function (t, e) {
          for (var o = 0; o < this.arr.length; o++)
            if (this.arr[o].key === t) return void (this.arr[o].value = e);
          this.arr.push(new n(t, e));
        }),
        (t.prototype.get = function (t) {
          for (var e = 0; e < this.arr.length; e++)
            if (this.arr[e].key === t) return this.arr[e].value;
          return null;
        }),
        (t.prototype.getPair = function (t) {
          for (var e = 0; e < this.arr.length; e++)
            if (this.arr[e].key === t) return this.arr[e];
          return null;
        }),
        (t.prototype.remove = function (t) {
          for (var e = 0; e < this.arr.length; e++)
            if (this.arr[e].key === t) return void this.arr.splice(e, 1);
        }),
        (t.prototype.clear = function () {
          this.arr = [];
        }),
        (t.prototype.size = function () {
          return this.arr.length;
        }),
        (t.prototype.getPairs = function () {
          return this.arr;
        }),
        t
      );
    })();
    t.Dictionary = e;
  })(CMPlay || (CMPlay = {})),
  (function (t) {
    function o(t) {
      for (var e, o, n = '', a = -1; ++a < t.length; )
        (e = t.charCodeAt(a)),
          (o = a + 1 < t.length ? t.charCodeAt(a + 1) : 0),
          55296 <= e &&
            e <= 56319 &&
            56320 <= o &&
            o <= 57343 &&
            ((e = 65536 + ((1023 & e) << 10) + (1023 & o)), a++),
          e <= 127
            ? (n += String.fromCharCode(e))
            : e <= 2047
            ? (n += String.fromCharCode(192 | ((e >>> 6) & 31), 128 | (63 & e)))
            : e <= 65535
            ? (n += String.fromCharCode(
                224 | ((e >>> 12) & 15),
                128 | ((e >>> 6) & 63),
                128 | (63 & e),
              ))
            : e <= 2097151 &&
              (n += String.fromCharCode(
                240 | ((e >>> 18) & 7),
                128 | ((e >>> 12) & 63),
                128 | ((e >>> 6) & 63),
                128 | (63 & e),
              ));
      return n;
    }

    function s(t) {
      for (var e = Array(t.length >> 2), o = 0; o < e.length; o++) e[o] = 0;
      for (o = 0; o < 8 * t.length; o += 8)
        e[o >> 5] |= (255 & t.charCodeAt(o / 8)) << (24 - (o % 32));
      return e;
    }

    function d(t, e) {
      (t[e >> 5] |= 128 << (24 - (e % 32))),
        (t[15 + (((e + 64) >> 9) << 4)] = e);
      for (
        var o = Array(80),
          n = 1732584193,
          a = -271733879,
          i = -1732584194,
          r = 271733878,
          s = -1009589776,
          d = 0;
        d < t.length;
        d += 16
      ) {
        for (var l = n, c = a, u = i, g = r, p = s, m = 0; m < 80; m++) {
          o[m] =
            m < 16
              ? t[d + m]
              : v(o[m - 3] ^ o[m - 8] ^ o[m - 14] ^ o[m - 16], 1);
          var h = S(
            S(
              v(n, 5),
              ((y = a),
              (A = i),
              (I = r),
              (w = m) < 20
                ? (y & A) | (~y & I)
                : w < 40
                ? y ^ A ^ I
                : w < 60
                ? (y & A) | (y & I) | (A & I)
                : y ^ A ^ I),
            ),
            S(
              S(s, o[m]),
              (f = m) < 20
                ? 1518500249
                : f < 40
                ? 1859775393
                : f < 60
                ? -1894007588
                : -899497514,
            ),
          );
          (s = r), (r = i), (i = v(a, 30)), (a = n), (n = h);
        }
        (n = S(n, l)),
          (a = S(a, c)),
          (i = S(i, u)),
          (r = S(r, g)),
          (s = S(s, p));
      }
      var f, w, y, A, I;
      return Array(n, a, i, r, s);
    }

    function S(t, e) {
      var o = (65535 & t) + (65535 & e);
      return (((t >> 16) + (e >> 16) + (o >> 16)) << 16) | (65535 & o);
    }

    function v(t, e) {
      return (t << e) | (t >>> (32 - e));
    }
    t.hex_hmac_sha1 = function (t, e) {
      return (function (t) {
        for (var e, o = '0123456789abcdef', n = '', a = 0; a < t.length; a++)
          (e = t.charCodeAt(a)),
            (n += o.charAt((e >>> 4) & 15) + o.charAt(15 & e));
        return n;
      })(
        (function (t, e) {
          var o = s(t);
          16 < o.length && (o = d(o, 8 * t.length));
          for (var n = Array(16), a = Array(16), i = 0; i < 16; i++)
            (n[i] = 909522486 ^ o[i]), (a[i] = 1549556828 ^ o[i]);
          var r = d(n.concat(s(e)), 512 + 8 * e.length);
          return (function (t) {
            for (var e = '', o = 0; o < 32 * t.length; o += 8)
              e += String.fromCharCode((t[o >> 5] >>> (24 - (o % 32))) & 255);
            return e;
          })(d(a.concat(r), 672));
        })(o(t), o(e)),
      );
    };
  })(CMPlay || (CMPlay = {})),
  (function (t) {
    var e = (function () {
      function e() {}
      return (
        (e.isEnable = function (t) {
          return t >= this.mLevel;
        }),
        (e.log = function (t) {
          e.isEnable(e.LEVEL_LOG) &&
            ('string' == typeof t
              ? console.log('[CMPlay] ' + t)
              : console.log(t));
        }),
        (e.warn = function (t) {
          e.isEnable(e.LEVEL_WARN) &&
            ('string' == typeof t
              ? console.warn('[CMPlay] ' + t)
              : console.warn(t));
        }),
        (e.error = function (t) {
          e.isEnable(e.LEVEL_ERROR) &&
            ('string' == typeof t
              ? console.error('[CMPlay] ' + t)
              : console.error(t));
        }),
        (e.LEVEL_LOG = 0),
        (e.LEVEL_WARN = 1),
        (e.LEVEL_ERROR = 2),
        (e.mLevel = e.LEVEL_LOG),
        e
      );
    })();
    t.Log = e;
  })(CMPlay || (CMPlay = {})),
  (function (i) {
    var t = (function () {
      function a() {}
      return (
        (a.request = function (n) {
          a.httpRequest(
            {
              url: n.url,
              data: n.data,
              header: n.header,
              method: n.method,
              dataType: n.dataType,
              success: function (t, e, o) {
                n.checkAuthorization
                  ? n.token && a.checkAuthorization(o, e, n.token)
                    ? n.success && n.success(e)
                    : (i.Log.error('code = ' + t),
                      i.Log.error('data = ' + e),
                      i.Log.error('header = ' + JSON.stringify(o)),
                      n.fail && n.fail(e))
                  : n.success && n.success(e);
              },
              fail: function (t, e) {
                n.fail && n.fail(e);
              },
            },
            5,
          );
        }),
        (a.checkAuthorization = function (t, e, o) {
          return !0;
        }),
        (a.httpRequest = function (t, o) {
          var n = this,
            a = new XMLHttpRequest();
          for (var e in (a.open(t.method, t.url), t.header))
            a.setRequestHeader(e, t.header[e]);
          (a.onreadystatechange = function () {
            if (4 == a.readyState)
              if (200 == a.status) {
                if (t.success)
                  if ('json' == t.dataType) {
                    var e = void 0;
                    try {
                      e = JSON.parse(a.responseText);
                    } catch (t) {
                      e = a.responseText;
                    }
                    t.success(a.status, e, a.getAllResponseHeaders());
                  } else
                    t.success(
                      a.status,
                      a.responseText,
                      a.getAllResponseHeaders(),
                    );
              } else
                1 < o
                  ? n.httpRequest(t, o - 1)
                  : t.fail && t.fail(a.status, a.responseText);
          }),
            'object' == typeof t.data
              ? a.send(JSON.stringify(t.data))
              : a.send(t.data);
        }),
        a
      );
    })();
    i.NetworkUtil = t;
  })(CMPlay || (CMPlay = {})),
  (window.getQueryString = function (t, e) {
    var o = window.location.search;
    if (
      o &&
      -1 !== o.indexOf('?') &&
      (o = o.substr(1) || window.location.hash.split('?')[1])
    ) {
      var n = new RegExp('(^|&)' + t + '=([^&]*)(&|$)'),
        a = o.match(n);
      if (null != a) return decodeURIComponent(a[2]);
    }
    return e;
  }),
  (window.getPathVersion = function () {
    var t = window.location.pathname;
    if (t) {
      var e = new RegExp('(v20[0-9]+)'),
        o = t.match(e);
      if (
        o &&
        0 < o.length &&
        o[0] &&
        11 <= o[0].length &&
        'v20' == o[0].substr(0, 3)
      ) {
        var n = o[0];
        return (
          Number(n.substr(1, 4)) -
          2018 +
          '.' +
          Number(n.substr(5, 2)) +
          '.' +
          Number(n.substr(7, 2)) +
          '.' +
          Number(n.substr(9, 2))
        );
      }
    }
    return '1.0.0.0';
  }),
  (function (t) {
    var e = (function () {
      function t() {}
      return (
        (t.getTimeSeconds = function () {
          return Math.round(Date.now() / 1e3);
        }),
        (t.generateXAID = function () {
          return 'xxxxyyyy_xxxxyyyy_xxyyxxyyxx'.replace(/[xy]/g, function (t) {
            if ('0' == t) return t;
            var e = (16 * Math.random()) | 0;
            return ('x' == t ? e : (3 & e) | 8).toString(16);
          });
        }),
        (t.loadSDKScript = function (t, e, o) {
          void 0 === o && (o = void 0);
          var n = document.getElementsByTagName('head')[0],
            a = document.createElement('script');
          (a.async = e),
            (a.src = t),
            null != o &&
              ((a.onload = function () {
                o();
              }),
              (a.onreadystatechange = function () {
                'complete' == this.readyState && o();
              })),
            n && n.appendChild(a);
        }),
        t
      );
    })();
    t.SysUtil = e;
  })(CMPlay || (CMPlay = {}));
