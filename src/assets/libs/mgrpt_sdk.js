var MGRPT,
  __extends =
    (this && this.__extends) ||
    (function () {
      var r =
        Object.setPrototypeOf ||
        ({
          __proto__: [],
        } instanceof Array &&
          function (t, e) {
            t.__proto__ = e;
          }) ||
        function (t, e) {
          for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
        };
      return function (t, e) {
        function n() {
          this.constructor = t;
        }
        r(t, e),
          (t.prototype =
            null === e
              ? Object.create(e)
              : ((n.prototype = e.prototype), new n()));
      };
    })();
(function (n) {
  var t = (function () {
    function e() {
      (this.mInfocEnvCfg = null),
        (this.mbInited = !1),
        (this.mPlatformInfo = null),
        (this.mShareTag = null),
        (this.mCroProTag = null),
        (this.mbEnableDebugEnv = !1);
      var t = n.PlatformChecker.getPlatformType();
      n.PlatformProxy.getInstance().init(t);
    }
    return (
      (e.getInstance = function () {
        return null != e.sInst ? e.sInst : (e.sInst = new e());
      }),
      (e.init = function (t) {
        e.getInstance(),
          e.sInst.mbInited ||
            ((e.sInst.mInfocEnvCfg = t),
            (e.sInst.mInfocEnvCfg.mAuthorization = 2),
            (e.sInst.mPlatformInfo =
              n.PlatformProxy.getInstance().getPlatformInfo()),
            n.PlatformProxy.getInstance().fillInfocEnvCfg(e.sInst.mInfocEnvCfg),
            (e.sInst.mbInited = !0));
      }),
      (e.getPlatformInfo = function () {
        return e.getInstance(), e.sInst.mbInited ? e.sInst.mPlatformInfo : null;
      }),
      (e.getInfocEnvCfg = function () {
        return e.getInstance(), e.sInst.mbInited ? e.sInst.mInfocEnvCfg : null;
      }),
      (e.setPlayerId = function (t) {
        e.getInstance(),
          e.sInst.mbInited &&
            e.sInst.mInfocEnvCfg &&
            (e.sInst.mInfocEnvCfg.mPlayerId = t);
      }),
      (e.getPlayerId = function () {
        return (
          e.getInstance(),
          e.sInst.mbInited && e.sInst.mInfocEnvCfg
            ? e.sInst.mInfocEnvCfg.mPlayerId
            : ''
        );
      }),
      (e.setAuthorizeFlag = function () {
        e.getInstance(),
          e.sInst.mbInited &&
            e.sInst.mInfocEnvCfg &&
            (e.sInst.mInfocEnvCfg.mAuthorization = 1);
      }),
      (e.getShareTag = function () {
        return (
          e.getInstance(),
          e.sInst.mbInited
            ? (e.sInst.mShareTag || (e.sInst.mShareTag = new n.MGShareTag()),
              e.sInst.mShareTag)
            : null
        );
      }),
      (e.getCroProTag = function () {
        return (
          e.getInstance(),
          e.sInst.mbInited
            ? (e.sInst.mCroProTag || (e.sInst.mCroProTag = new n.MGCroProTag()),
              e.sInst.mCroProTag)
            : null
        );
      }),
      (e.enableDebugEnv = function (t) {
        e.getInstance(), (e.sInst.mbEnableDebugEnv = t);
      }),
      (e.isEnableDebugEnv = function () {
        return e.getInstance(), e.sInst.mbEnableDebugEnv;
      }),
      (e.sInst = null),
      e
    );
  })();
  n.MGCmnRptModule = t;
})(MGRPT || (MGRPT = {})),
  (function (r) {
    var t = (function () {
      function e() {
        (this.TAG = 'MGRPT_MGCroProTag'), this.init();
      }
      return (
        (e.prototype.init = function () {
          this.fetchLocal()
            ? r.Log.i(
                this.TAG,
                'fetch cross promotion tag from cache: ' + this.mCroProTag,
              )
            : (this.parse()
                ? r.Log.i(
                    this.TAG,
                    'parse cross promotion tag from launch params: ' +
                      this.mCroProTag,
                  )
                : this.create(),
              this.saveLocal(this.mCroProTag));
        }),
        (e.prototype.parse = function () {
          return (
            (this.mCroProTag = r.PlatformProxy.getInstance().parseCroProTag()),
            this.mCroProTag && 0 < this.mCroProTag.length
          );
        }),
        (e.prototype.create = function () {
          if (!this.mCroProTag) {
            var t = r.MGCmnRptModule.getInfocEnvCfg(),
              e = t.sub_channel,
              n = t.game_id;
            (this.mCroProTag = e + ',' + n),
              r.Log.i(
                this.TAG,
                'cross promotion tag created: ' + this.mCroProTag,
              );
          }
        }),
        (e.prototype.fetchLocal = function () {
          return (
            (this.mCroProTag = r.PlatformProxy.getInstance().getStorage(
              e.KEY_CROSS_PROMOTION_TAG,
            )),
            r.Log.i(this.TAG, 'cache cropro tag: ' + this.mCroProTag),
            this.mCroProTag && 0 < this.mCroProTag.length
          );
        }),
        (e.prototype.saveLocal = function (t) {
          r.PlatformProxy.getInstance().setStorage(
            e.KEY_CROSS_PROMOTION_TAG,
            t,
          ),
            r.Log.i(
              this.TAG,
              'cross promotion tag saved to local cache: ' +
                e.KEY_CROSS_PROMOTION_TAG +
                ':' +
                t,
            );
        }),
        (e.prototype.fetch = function () {
          return this.mCroProTag;
        }),
        (e.KEY_CROSS_PROMOTION_TAG = 'mgrpt_cropro_tag'),
        e
      );
    })();
    r.MGCroProTag = t;
  })((window.MGRPT = MGRPT) || (MGRPT = {})),
  (function (e) {
    var t = (function () {
      function t() {}
      return (
        (t.prototype.getPlatformType = function () {
          return this.isPlatformTT()
            ? e.ENUMPLATFORM.PLATFORM_TT
            : this.isPlatformWX()
            ? e.ENUMPLATFORM.PLATFORM_WX
            : this.isPlatformQQ()
            ? e.ENUMPLATFORM.PLATFORM_QQ
            : this.isPlatformFB()
            ? e.ENUMPLATFORM.PLATFORM_FB
            : this.isPlatformWeb()
            ? e.ENUMPLATFORM.PLATFORM_WEB
            : 'unknown_platform';
        }),
        (t.prototype.isPlatformWX = function () {
          return cc.sys.platform == cc.sys.WECHAT_GAME;
        }),
        (t.prototype.isPlatformQQ = function () {
          return cc.sys.platform == cc.sys.QQ_PLAY;
        }),
        (t.prototype.isPlatformWeb = function () {
          return (
            cc.sys.platform == cc.sys.DESKTOP_BROWSER ||
            cc.sys.platform == cc.sys.MOBILE_BROWSER
          );
        }),
        (t.prototype.isPlatformFB = function () {
          return 'undefined' != typeof FBInstant;
        }),
        (t.prototype.isPlatformTT = function () {
          return 'undefined' != typeof tt;
        }),
        (t.prototype.setLocalItem = function (t, e) {
          cc.sys.localStorage.setItem(t, e);
        }),
        (t.prototype.getLocalItem = function (t) {
          return cc.sys.localStorage.getItem(t);
        }),
        (t.prototype.removeLocalItem = function (t) {
          cc.sys.localStorage.removeItem(t);
        }),
        (t.prototype.clear = function () {}),
        t
      );
    })();
    e.GameEngine4CC = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function () {
      function t() {}
      return (
        (t.prototype.getPlatformType = function () {
          return this.isPlatformTT()
            ? e.ENUMPLATFORM.PLATFORM_TT
            : this.isPlatformWX()
            ? e.ENUMPLATFORM.PLATFORM_WX
            : this.isPlatformQQ()
            ? e.ENUMPLATFORM.PLATFORM_QQ
            : this.isPlatformFB()
            ? e.ENUMPLATFORM.PLATFORM_FB
            : this.isPlatformWeb()
            ? e.ENUMPLATFORM.PLATFORM_WEB
            : 'unknown_platform';
        }),
        (t.prototype.isPlatformWX = function () {
          if (Laya.Browser.onMiniGame) return !0;
        }),
        (t.prototype.isPlatformQQ = function () {
          return !!(
            Laya.Browser.userAgent &&
            -1 < Laya.Browser.userAgent.indexOf('limixiu')
          );
        }),
        (t.prototype.isPlatformWeb = function () {
          return !0;
        }),
        (t.prototype.isPlatformFB = function () {
          return 'undefined' != typeof FBInstant;
        }),
        (t.prototype.isPlatformTT = function () {
          if (Laya.Browser.window.hasOwnProperty('tt')) return !0;
        }),
        (t.prototype.setLocalItem = function (t, e) {
          Laya.LocalStorage.setItem(t, e);
        }),
        (t.prototype.getLocalItem = function (t) {
          return Laya.LocalStorage.getItem(t);
        }),
        (t.prototype.removeLocalItem = function (t) {
          Laya.LocalStorage.removeItem(t);
        }),
        (t.prototype.clear = function () {
          Laya.LocalStorage.clear();
        }),
        t
      );
    })();
    e.GameEngine4LayaBox = t;
  })(MGRPT || (MGRPT = {})),
  (function (n) {
    var t = (function () {
      function t() {}
      return (
        (t.prototype.getPlatformType = function () {
          return (
            console.log(
              'MGRPT_DEBUG',
              'GameEngine4None.getPlatformType() enter.',
            ),
            this.isPlatformTT()
              ? n.ENUMPLATFORM.PLATFORM_TT
              : this.isPlatformWX()
              ? n.ENUMPLATFORM.PLATFORM_WX
              : this.isPlatformQQ()
              ? n.ENUMPLATFORM.PLATFORM_QQ
              : this.isPlatformFB()
              ? n.ENUMPLATFORM.PLATFORM_FB
              : this.isPlatformWeb()
              ? n.ENUMPLATFORM.PLATFORM_WEB
              : 'unknown_platform'
          );
        }),
        (t.prototype.isPlatformWX = function () {
          return 'undefined' != typeof wx;
        }),
        (t.prototype.isPlatformQQ = function () {
          return 'undefined' != typeof BK;
        }),
        (t.prototype.isPlatformWeb = function () {
          return !0;
        }),
        (t.prototype.isPlatformFB = function () {
          return 'undefined' != typeof FBInstant;
        }),
        (t.prototype.isPlatformTT = function () {
          return 'undefined' != typeof tt;
        }),
        (t.prototype.setLocalItem = function (t, e) {
          this.isPlatformWX() && n.PlatformProxy.getInstance().setStorage(t, e);
        }),
        (t.prototype.getLocalItem = function (t) {
          if (this.isPlatformWX())
            return n.PlatformProxy.getInstance().getStorage(t);
        }),
        (t.prototype.removeLocalItem = function (t) {
          if (this.isPlatformWX())
            return n.PlatformProxy.getInstance().delStorage(t);
        }),
        (t.prototype.clear = function () {}),
        t
      );
    })();
    n.GameEngine4None = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function () {
      function n() {}
      return (
        (n.getPlatformType = function () {
          return n.mPlatformTypeCur
            ? n.mPlatformTypeCur
            : (n.prepareGECur(),
              n.mGameEngineCur
                ? (n.mPlatformTypeCur = n.mGameEngineCur.getPlatformType())
                : '');
        }),
        (n.isPlatformWX = function () {
          return (
            n.prepareGECur(),
            !!n.mGameEngineCur && n.mGameEngineCur.isPlatformWX()
          );
        }),
        (n.isPlatformQQ = function () {
          return (
            n.prepareGECur(),
            !!n.mGameEngineCur && n.mGameEngineCur.isPlatformQQ()
          );
        }),
        (n.isPlatformWeb = function () {
          return (
            n.prepareGECur(),
            !!n.mGameEngineCur && n.mGameEngineCur.isPlatformWeb()
          );
        }),
        (n.isPlatformFB = function () {
          return (
            n.prepareGECur(),
            !!n.mGameEngineCur && n.mGameEngineCur.isPlatformFB()
          );
        }),
        (n.setLocalItem = function (t, e) {
          n.prepareGECur(),
            n.mGameEngineCur && n.mGameEngineCur.setLocalItem(t, e);
        }),
        (n.getLocalItem = function (t) {
          n.prepareGECur(),
            n.mGameEngineCur && n.mGameEngineCur.getLocalItem(t);
        }),
        (n.removeLocalItem = function (t) {
          n.prepareGECur(),
            n.mGameEngineCur && n.mGameEngineCur.removeLocalItem(t);
        }),
        (n.clear = function () {
          n.prepareGECur(), n.mGameEngineCur && n.clear();
        }),
        (n.prepareGECur = function () {
          if (!n.mGameEngineCur) {
            var t = n.getCurEngineType();
            n.setCurGameEngine(t);
          }
        }),
        (n.setCurGameEngine = function (t) {
          if (!this.mGameEngineCur)
            if (t && 0 != t.length)
              switch (t) {
                case e.Engine.ENGINE_COCOS:
                  this.mGameEngineCur = new e.GameEngine4CC();
                  break;
                case e.Engine.ENGINE_LAYA:
                  this.mGameEngineCur = new e.GameEngine4LayaBox();
                  break;
                case e.Engine.ENGINE_NONE:
                  this.mGameEngineCur = new e.GameEngine4None();
              }
            else this.mGameEngineCur = new e.GameEngine4None();
        }),
        (n.getCurEngineType = function () {
          return 'undefined' != typeof Laya && void 0 !== Laya.LocalStorage
            ? e.Engine.ENGINE_LAYA
            : 'undefined' != typeof cc && void 0 !== cc.sys
            ? e.Engine.ENGINE_COCOS
            : e.Engine.ENGINE_NONE;
        }),
        (n.mGameEngineCur = null),
        (n.mPlatformTypeCur = null),
        n
      );
    })();
    e.GameEngineProxy = t;
  })(MGRPT || (MGRPT = {})),
  (function (t) {
    var e, n;
    ((e = t.Engine || (t.Engine = {})).ENGINE_COCOS = 'cocos-creator'),
      (e.ENGINE_LAYA = 'layabox'),
      (e.ENGINE_NONE = 'ENGINE_NONE'),
      ((n = t.ENUMPLATFORM || (t.ENUMPLATFORM = {})).PLATFORM_WX = 'wechat'),
      (n.PLATFORM_QQ = 'qq'),
      (n.PLATFORM_WEB = 'web'),
      (n.PLATFORM_FB = 'facebook'),
      (n.PLATFORM_TT = 'tt');
    var r = function () {
      (this.brand = ''),
        (this.model = ''),
        (this.pixelRatio = 0),
        (this.screenWidth = 0),
        (this.screenHeight = 0),
        (this.windowWidth = 0),
        (this.windowHeight = 0),
        (this.statusBarHeight = 0),
        (this.language = ''),
        (this.version = ''),
        (this.system = ''),
        (this.platform = ''),
        (this.fontSizeSetting = 0),
        (this.SDKVersion = ''),
        (this.benchmarkLevel = 1);
    };
    t.PlatformInfo = r;
    var o = function () {};
    t.LaunchOption = o;
  })(MGRPT || (MGRPT = {})),
  (function (i) {
    var o = 'key_first_enter_time',
      t = (function () {
        function t() {}
        return (
          (t.INFOC_PRODUCT_ID = 239),
          (t.INFOC_PUBLIC_INDEX = 8),
          (t.INFOC_SERVER_URL = 'helpminigame1.ksmobile.com'),
          t
        );
      })(),
      e = (function () {
        function t() {}
        return (
          (t.INFOC_PRODUCT_ID = 312),
          (t.INFOC_PUBLIC_INDEX = 1),
          (t.INFOC_SERVER_URL = 'helpminigamehw1.ksmobile.com'),
          t
        );
      })(),
      n = (function () {
        function a() {
          (this.mMap = new i.Dictionary()),
            i.ENUMPLATFORM.PLATFORM_FB ===
              i.PlatformChecker.getPlatformType() &&
              ((a.INFOC_PRODUCT_ID = e.INFOC_PRODUCT_ID),
              (a.INFOC_PUBLIC_INDEX = e.INFOC_PUBLIC_INDEX),
              (a.INFOC_SERVER_URL = e.INFOC_SERVER_URL));
        }
        return (
          (a.getHost = function () {
            return i.MGCmnRptModule.isEnableDebugEnv()
              ? 'http://111.230.84.242/g/v1'
              : 'https://' + a.INFOC_SERVER_URL + '/g/v1';
          }),
          (a.parseData = function (t) {
            if (!t) return -1;
            var e = t.indexOf('result=');
            if (e < 0) return -2;
            if (e + 7 >= t.length) return -3;
            var n = t.charAt(e + 7);
            return parseInt(n);
          }),
          (a.reportInfocImpl = function (r, o) {
            var t = a.getCommonData(),
              e = a.getHost() + '/?' + t + '&' + o,
              n = encodeURI(e);
            i.Log.i(
              'MGB_DEBUG',
              'before call PlatformProxy.getInstance().request',
            ),
              i.PlatformProxy.getInstance().request({
                url: n,
                method: 'GET',
                success: function (t, e) {
                  if (e)
                    if (1 == a.parseData(e)) {
                      i.Log.i('Infoc::success(' + r + ') => &' + o);
                      var n = i.InfocCache.shiftRequest();
                      n && a.reportInfocImpl(n.id, n.info);
                    } else
                      i.Log.w('Infoc:: fail(' + r + ') => ' + o),
                        i.Log.w(e),
                        i.InfocCache.pushRequest(r, o, Date.now());
                  else
                    i.Log.e('Infoc:: error(' + r + ')'),
                      i.InfocCache.pushRequest(r, o, Date.now());
                },
                fail: function (t, e) {
                  i.Log.e('Infoc:: failed(' + r + ') code(' + t + ')'),
                    i.InfocCache.pushRequest(r, o, Date.now());
                },
              });
          }),
          (a.getCommonData = function () {
            var t = i.MGCmnRptModule.getPlatformInfo();
            if (!t) return i.Log.e('MGRPT_DEBUG', '!platInfo'), '';
            var e = i.MGCmnRptModule.getInfocEnvCfg();
            if (!e) return i.Log.e('MGRPT_DEBUG', '!infocEnvCfg'), '';
            var n = 0;
            'ios' == t.platform ? (n = 1) : 'android' == t.platform && (n = 2);
            var r = i.MGCmnRptModule.getShareTag();
            if (!r) return i.Log.e('MGRPT_DEBUG', '!shareTag'), '';
            var o = i.MGCmnRptModule.getCroProTag();
            return o
              ? 'product_no=' +
                  a.INFOC_PRODUCT_ID +
                  '&public_index=' +
                  a.INFOC_PUBLIC_INDEX +
                  '&brand=' +
                  t.brand +
                  '&model=' +
                  t.model +
                  '&system=' +
                  t.system +
                  '&version=' +
                  t.version +
                  '&pixelratio=' +
                  t.pixelRatio +
                  '&sdkversion=' +
                  t.SDKVersion +
                  '&wechatid=' +
                  e.mPlayerId +
                  '&newuser=' +
                  a.isNewUser() +
                  '&authorization=' +
                  e.mAuthorization +
                  '&channel_key=' +
                  e.channelKey +
                  '&game_version=' +
                  e.gameVer +
                  '&game_id=' +
                  e.game_id +
                  '&game_name=' +
                  e.game_name +
                  '&sub_channel=' +
                  e.sub_channel +
                  '&benchmarklevel=' +
                  t.benchmarkLevel +
                  '&platform=' +
                  n +
                  '&share_level=' +
                  r.getLevel() +
                  '&super_playid=' +
                  r.getSuper() +
                  '&origin_playid=' +
                  r.getOrigin() +
                  '&cropro=' +
                  o.fetch()
              : (i.Log.e('MGRPT_DEBUG', '!croproTag'), '');
          }),
          (a.prototype.set = function (t, e) {
            if (null == t || null == t)
              throw new Error('ERROR: key cannot be null or undefined!');
            if (null == e || null == e)
              throw new Error('ERROR: value cannot be null or undefined!');
            return this.mMap.put(t, e), this;
          }),
          (a.prototype.buildDataString = function (t) {
            for (
              var e = 'business_index=' + t + '&',
                n = this.mMap.size(),
                r = this.mMap.getPairs(),
                o = 0;
              o < n;
              o++
            ) {
              var a = r[o];
              e += a.key + '=' + a.value + '&';
            }
            return 1 < e.length && (e = e.slice(0, e.length - 1)), e;
          }),
          (a.prototype.report = function () {
            var t = this.getTableID(),
              e = this.buildDataString(t),
              n = Date.now(),
              r = i.MGCmnRptModule.getInfocEnvCfg();
            r && r.mPlayerId
              ? a.reportInfocImpl(t, e)
              : (i.InfocCache.pushRequest(t, e, n),
                i.Log.e(
                  a.TAG,
                  'after InfocCache.pushRequest, no playerId. info:' + e,
                ));
          }),
          (a.isNewUser = function () {
            if (null != a.isNewUserFlag) return a.isNewUserFlag;
            var t = new Date(),
              e = i.PlatformProxy.getInstance().getStorage(o);
            if (!e || e.length <= 0)
              i.PlatformProxy.getInstance().setStorage(o, t.getTime() + ''),
                (a.isNewUserFlag = 1);
            else {
              var n = i.TimeUtil.formatDate(new Date(parseInt(e))),
                r = i.TimeUtil.formatDate(t);
              a.isNewUserFlag = n == r ? 1 : 2;
            }
            return a.isNewUserFlag;
          }),
          (a.TAG = 'MGRPT.Infoc'),
          (a.INFOC_PRODUCT_ID = t.INFOC_PRODUCT_ID),
          (a.INFOC_PUBLIC_INDEX = t.INFOC_PUBLIC_INDEX),
          (a.INFOC_SERVER_URL = t.INFOC_SERVER_URL),
          (a.isNewUserFlag = void 0),
          a
        );
      })();
    i.Infoc = n;
  })(MGRPT || (MGRPT = {})),
  (function (r) {
    var o = [],
      t = (function () {
        function t() {}
        return (
          (t.pushRequest = function (t, e, n) {
            r.Log.i('InfoCache.pushRequest:: (' + t + ') => ' + e),
              o.push({
                id: t,
                info: e,
                ts: n,
              }),
              1e3 < o.length && o.shift();
          }),
          (t.shiftRequest = function () {
            var t = o.shift();
            return (
              t &&
                r.Log.i('InfoCache.shiftRequest:: (' + t.id + ') => ' + t.info),
              t
            );
          }),
          t
        );
      })();
    r.InfocCache = t;
  })(MGRPT || (MGRPT = {})),
  (function (c) {
    var t = (function () {
      function f() {}
      return (
        (f.getSubChannel = function (t, e) {
          if (this.mLocalSubChannel) return this.mLocalSubChannel;
          if (
            ((this.mLocalSubChannel = c.PlatformProxy.getInstance().getStorage(
              f.KEY_GAME_SUB_CHANNEL,
            )),
            this.mLocalSubChannel)
          )
            return this.mLocalSubChannel;
          var n,
            r = this.getChannelByWXAId(t),
            o = this.getChannelByQueryAppId(t),
            a = this.getChannelByAdsource(t),
            i = this.getChannelByAppId(t),
            s = this.getChannelByExtra(t),
            u = this.getChannelByOther(t),
            l = this.getChannelBySrc(t);
          return (
            r
              ? (n = r)
              : o
              ? (n = o)
              : a
              ? (n = a)
              : i
              ? (n = i)
              : l
              ? (n = l)
              : s
              ? (n = s)
              : u && (n = u),
            n || (n = e || 'default'),
            (this.mLocalSubChannel = n),
            c.PlatformProxy.getInstance().setStorage(f.KEY_GAME_SUB_CHANNEL, n),
            n
          );
        }),
        (f.getChannelByWXAId = function (t) {
          if (t && t.query) {
            var e = t.query,
              n = e.gdt_vid;
            c.Log.i(this.TAG, 'getChannelByWXAid traceid = ' + n);
            var r = e.weixinadinfo;
            if (r) {
              var o = r.split('.')[0];
              return c.Log.i(this.TAG, 'getChannelByWXAid aid = ' + o), o;
            }
          }
          return null;
        }),
        (f.getChannelByExtra = function (t) {
          return t && t.query && t.query.channel && t.scene
            ? t.query.channel
            : null;
        }),
        (f.getChannelByOther = function (t) {
          return t && t.path && 'index' != t.path && t.path.startsWith('6')
            ? t.path
            : null;
        }),
        (f.getChannelByAppId = function (t) {
          return t && t.referrerInfo && t.referrerInfo.appId
            ? t.referrerInfo.appId
            : null;
        }),
        (f.getChannelBySrc = function (t) {
          return t && t.query && t.query.source ? t.query.source : null;
        }),
        (f.getChannelByQueryAppId = function (t) {
          return t && t.query && t.query.appid ? t.query.appid : null;
        }),
        (f.getChannelByAdsource = function (t) {
          return t &&
            t.referrerInfo &&
            t.referrerInfo.extraData &&
            t.referrerInfo.extraData.adsource
            ? t.referrerInfo.extraData.adsource
            : null;
        }),
        (f.TAG = 'MGRPT.SubChannelHelper'),
        (f.KEY_GAME_SUB_CHANNEL = 'key_game_sub_channel'),
        (f.mLocalSubChannel = null),
        f
      );
    })();
    c.SubChannelHelper = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function () {
      function t() {}
      return (
        (t.getPlatformType = function () {
          return e.GameEngineProxy.getPlatformType();
        }),
        (t.isPlatformWX = function () {
          return e.GameEngineProxy.isPlatformWX();
        }),
        (t.isPlatformQQ = function () {
          return e.GameEngineProxy.isPlatformQQ();
        }),
        (t.isPlatformFB = function () {
          return e.GameEngineProxy.isPlatformFB();
        }),
        (t.isPlatformWeb = function () {
          return e.GameEngineProxy.isPlatformWeb();
        }),
        t
      );
    })();
    e.PlatformChecker = t;
  })(MGRPT || (MGRPT = {})),
  (function (i) {
    var t = (function () {
      function t() {
        this.TAG = 'MGRPT.PlatformImpl4FB';
      }
      return (
        (t.prototype.parseCroProTag = function () {
          return '';
        }),
        (t.prototype.fillShareTag = function (t) {}),
        (t.prototype.fillInfocEnvCfg = function (t) {
          return (
            t &&
              (t.channelKey || (t.channelKey = 3),
              t.sub_channel ||
                (t.sub_channel = i.SubChannelHelper.getSubChannel(
                  this.getLaunchParameter(),
                ))),
            t
          );
        }),
        (t.prototype.getLaunchParameter = function () {
          var t = new i.LaunchOption();
          return (
            FBInstant.getEntryPointData() ||
              i.Log.w(
                this.TAG,
                'no launch options associated with current entry point',
              ),
            t
          );
        }),
        (t.prototype.request = function (r, t) {
          var o = this;
          i.Log.i(this.TAG, 'facebook reqeust params: ' + JSON.stringify(r));
          var a = new XMLHttpRequest();
          for (var e in (a.open(r.method, r.url), r.header))
            a.setRequestHeader(e, r.header[e]);
          (a.onreadystatechange = function () {
            if (a.readyState == XMLHttpRequest.DONE)
              if (
                (i.Log.i(o.TAG, 'facebook request, response code:', a.status),
                i.Log.i(o.TAG, 'facebook request, response:', a.response),
                200 == a.status)
              ) {
                if (
                  (i.Log.i(o.TAG, 'facebook request, succeed:', a.responseText),
                  r.success)
                ) {
                  var e = a.status,
                    n = a.getAllResponseHeaders();
                  if ('json' == r.dataType)
                    try {
                      r.success(e, JSON.parse(a.responseText), n);
                    } catch (t) {
                      r.success(e, a.responseText, n);
                    }
                  else r.success(e, a.responseText, n);
                }
              } else
                i.Log.i(o.TAG, 'facebook request, failed:', a.responseText),
                  1 < t
                    ? o.request(r, t - 1)
                    : r.fail && r.fail(a.status, a.responseText);
          }),
            a.send(JSON.stringify(r.data));
        }),
        (t.prototype.getPlatformInfo = function () {
          var t = new i.PlatformInfo();
          (t.language = FBInstant.getLocale()),
            (t.platform = FBInstant.getPlatform()),
            (t.SDKVersion = FBInstant.getSDKVersion());
          try {
            (t.screenWidth = window.screen.width),
              (t.screenHeight = window.screen.height);
          } catch (t) {
            i.Log.w(this.TAG, 'exception occur while collecting platform info');
          }
          return t;
        }),
        (t.prototype.setStorage = function (t, e) {
          this.isLocalStorageAvailable()
            ? window.localStorage.setItem(t, e)
            : this.isSessionAvailable()
            ? window.sessionStorage.setItem(t, e)
            : i.Log.w(this.TAG, 'storage api is unavailable');
        }),
        (t.prototype.getStorage = function (t) {
          return this.isLocalStorageAvailable()
            ? window.localStorage.getItem(t)
            : this.isSessionAvailable()
            ? window.sessionStorage.getItem(t)
            : void i.Log.w(this.TAG, 'storage api is unavailable');
        }),
        (t.prototype.delStorage = function (t) {
          this.isLocalStorageAvailable()
            ? window.localStorage.removeItem(t)
            : this.isSessionAvailable()
            ? window.sessionStorage.removeItem(t)
            : i.Log.w(this.TAG, 'storage api is unavailable');
        }),
        (t.prototype.isSessionAvailable = function () {
          return !!window.sessionStorage;
        }),
        (t.prototype.isLocalStorageAvailable = function () {
          return !!window.localStorage;
        }),
        t
      );
    })();
    i.PlatformImpl4FB = t;
  })(MGRPT || (MGRPT = {})),
  (function (u) {
    var t = (function () {
      function e() {
        (this.mbEnteredBackground = !1), this.init();
      }
      return (
        (e.prototype.init = function () {
          var t = (function () {
            function t(t) {
              (this.platformImpl = null), (this.platformImpl = t);
            }
            return (
              (t.prototype.onLoad = function (t) {}),
              (t.prototype.onMaximize = function (t) {}),
              (t.prototype.onMinimize = function (t) {}),
              (t.prototype.onEnterBackground = function (t) {
                u.Log.i(
                  'MGB.PlatformImpl4QQ',
                  'BK.Game.onEnterbackground, statusInfo:' +
                    JSON.stringify(GameStatusInfo),
                ),
                  (this.platformImpl.mbEnteredBackground = !0);
              }),
              (t.prototype.onEnterForeground = function (t) {
                u.Log.i(
                  'MGB.PlatformImpl4QQ',
                  'BK.Game.onEnterforeground, statusInfo:' +
                    JSON.stringify(GameStatusInfo),
                ),
                  (this.platformImpl.mbEnteredBackground = !1);
              }),
              (t.prototype.onClose = function (t) {}),
              t
            );
          })();
          new BK.Game(new t(this));
        }),
        (e.prototype.parseCroProTag = function () {
          var t = void 0,
            e = GameStatusInfo.gameParam;
          if ((u.Log.i('MGRPT_DEBUG', 'game param: ' + JSON.stringify(e)), e)) {
            var n = JSON.parse(e);
            n && n.hasOwnProperty(u.MGCroProTag.KEY_CROSS_PROMOTION_TAG)
              ? ((t = n[u.MGCroProTag.KEY_CROSS_PROMOTION_TAG]),
                u.Log.i('MGRPT_DEBUG', 'cross promotion tag parsed: ' + t))
              : u.Log.e('MGRPT_DEBUG', 'cross promotion tag parse failed');
          } else u.Log.e('MGRPT_DEBUG', 'GameStatusInfo.gameParam undefined');
          return t;
        }),
        (e.prototype.fillShareTag = function (t) {
          if (t) {
            var e = GameStatusInfo.gameParam;
            if ((u.Log.i('MGRPT_DEBUG', '[paramLaunch]:' + e), e))
              for (var n = 0, r = e.split('&'); n < r.length; n++) {
                var o = r[n];
                if (o) {
                  var a = o.indexOf('=', 0);
                  if (!(a <= 0 || a >= o.length)) {
                    var i = o.substr(0, a),
                      s = o.substr(a + 1, o.length - a - 1);
                    i == u.MGShareTag.KEY_LEVEL
                      ? (t.setLevel(Number(s)),
                        u.Log.i('MGRPT_DEBUG', '[level]:' + s))
                      : i == u.MGShareTag.KEY_SUPER
                      ? (t.setSuper(s), u.Log.i('MGRPT_DEBUG', '[super]:' + s))
                      : i == u.MGShareTag.KEY_ORIGIN &&
                        (t.setOrigin(s),
                        u.Log.i('MGRPT_DEBUG', '[origin]:' + s));
                  }
                }
              }
          }
        }),
        (e.prototype.fillInfocEnvCfg = function (t) {
          return (
            t &&
              (t.channelKey || (t.channelKey = 2),
              t.sub_channel ||
                (t.sub_channel = u.SubChannelHelper.getSubChannel(
                  this.getLaunchParameter(),
                ))),
            t
          );
        }),
        (e.prototype.getLaunchParameter = function () {
          var t = new u.LaunchOption();
          if (this.mbEnteredBackground) return t;
          var e = GameStatusInfo.gameParam;
          if (e) {
            for (
              var n = {},
                r = ('?' === e[0] ? e.substr(1) : e).split('&'),
                o = 0;
              o < r.length;
              o++
            ) {
              var a = r[o].split('=');
              n[decodeURIComponent(a[0])] = decodeURIComponent(a[1] || '');
            }
            t.query = n;
          }
          return (t.shareTicket = GameStatusInfo.aioType.toString()), t;
        }),
        (e.prototype.request = function (r, o) {
          var a = this,
            t = r.method ? r.method : 'POST',
            e = new BK.HttpUtil(r.url);
          if ((e.setHttpMethod(t), r.header))
            for (var n in r.header) e.setHttpHeader(n, r.header[n]);
          if (r.data) {
            var i = new BK.Buffer(0, !1);
            i.writeAsString(JSON.stringify(r.data), !1), e.setHttpRawBody(i);
          }
          e.requestAsync(function (t, e) {
            var n = t.readAsString(!0);
            if (200 == e) {
              if (r.success)
                if ('json' == r.dataType)
                  try {
                    r.success(e, JSON.parse(n), null);
                  } catch (t) {
                    r.success(e, n, null);
                  }
                else r.success(e, n, null);
            } else if (0 < o) a.request(r, o - 1);
            else if (r.fail)
              if ('json' == r.dataType)
                try {
                  r.fail(e, JSON.parse(n));
                } catch (t) {
                  r.fail(e, n);
                }
              else r.fail(e, n);
          });
        }),
        (e.prototype.getPlatformInfo = function () {
          var t = new u.PlatformInfo();
          return (
            (t.version = GameStatusInfo.QQVer),
            (t.system =
              GameStatusInfo.platform + ' ' + GameStatusInfo.osVersion),
            (t.screenWidth = BK.Director.screenPixelSize.width),
            (t.screenHeight = BK.Director.screenPixelSize.height),
            (t.platform = GameStatusInfo.platform),
            t
          );
        }),
        (e.prototype.setStorage = function (t, e) {
          BK.localStorage
            ? BK.localStorage.setItem(t, e)
            : u.GameEngineProxy.setLocalItem(t, e);
        }),
        (e.prototype.getStorage = function (t) {
          return BK.localStorage
            ? BK.localStorage.getItem(t)
            : u.GameEngineProxy.getLocalItem(t);
        }),
        (e.prototype.delStorage = function (t) {
          BK.localStorage
            ? BK.localStorage.removeItem(t)
            : u.GameEngineProxy.removeLocalItem(t);
        }),
        (e.getDataPath = function () {
          BK.FileUtil.isFileExist(e.DATA_DIR) ||
            BK.FileUtil.makeDir(e.DATA_DIR);
          var t = e.DATA_DIR + GameStatusInfo.openId + '//';
          return BK.FileUtil.isFileExist(t) || BK.FileUtil.makeDir(t), t;
        }),
        (e.DATA_DIR = 'GameSandBox://data4ad//'),
        e
      );
    })();
    u.PlatformImpl4QQ = t;
  })(MGRPT || (MGRPT = {})),
  (function (n) {
    var t = (function () {
      function t() {
        this.TAG = 'MGRPT.PlatformImpl4TT';
      }
      return (
        (t.prototype.request = function (e, t) {
          var n = this;
          tt.request({
            url: e.url,
            data: e.data,
            header: e.header,
            method: e.method,
            dataType: e.dataType,
            success: function (t) {
              200 != t.statusCode
                ? e.fail && e.fail(t.statusCode, t)
                : t.data
                ? e.success && e.success(t.statusCode, t.data, t.header)
                : e.fail && e.fail(t.statusCode, t);
            },
            fail: function () {
              1 < t ? n.request(e, t - 1) : e.fail && e.fail(-1, null);
            },
          });
        }),
        (t.prototype.getPlatformInfo = function () {
          var t = tt.getSystemInfoSync(),
            e = new n.PlatformInfo();
          return (
            (e.version = t ? t.version : ''),
            (e.system = t ? t.system : '_unknow_'),
            (e.screenWidth = t ? t.screenWidth : 0),
            (e.screenHeight = t ? t.screenHeight : 0),
            (e.platform = t ? t.system : ''),
            e
          );
        }),
        (t.prototype.setStorage = function (t, e) {
          tt.setStorageSync(t, e);
        }),
        (t.prototype.getStorage = function (t) {
          return tt.getStorageSync(t);
        }),
        (t.prototype.delStorage = function (t) {
          tt.removeStorageSync(t);
        }),
        (t.prototype.fillInfocEnvCfg = function (t) {
          return (
            t &&
              (t.channelKey || (t.channelKey = 4),
              t.sub_channel ||
                (t.sub_channel = n.SubChannelHelper.getSubChannel(
                  this.getLaunchParameter(),
                ))),
            t
          );
        }),
        (t.prototype.getLaunchParameter = function () {
          var t = new n.LaunchOption(),
            e = tt.getLaunchOptionsSync();
          return e && (t.query = e), t;
        }),
        (t.prototype.fillShareTag = function (t) {
          if (t) {
            var e = tt.getLaunchOptionsSync();
            e &&
              (e.hasOwnProperty(n.MGShareTag.KEY_LEVEL) &&
                (n.Log.i('MGRPT_DEBUG', 'pl_level:' + e.agent_level),
                t.setLevel(Number(e.agent_level) + 1)),
              e.hasOwnProperty(n.MGShareTag.KEY_SUPER) &&
                (n.Log.i('MGRPT_DEBUG', 'pl_super:' + e.agent_upper),
                t.setSuper(e.agent_upper)),
              e.hasOwnProperty(n.MGShareTag.KEY_ORIGIN) &&
                (n.Log.i('MGRPT_DEBUG', 'pl_origin:' + e.agent_orign),
                t.setOrigin(e.agent_orign)));
          }
        }),
        (t.prototype.parseCroProTag = function () {
          return '';
        }),
        t
      );
    })();
    n.PlatformImpl4TT = t;
  })(MGRPT || (MGRPT = {})),
  (function (r) {
    var t = (function () {
      function t() {}
      return (
        (t.prototype.parseCroProTag = function () {
          var t = void 0,
            e = this.getLaunchParameter();
          if (e.referrerInfo && e.referrerInfo.appId) {
            var n = e.referrerInfo.extraData;
            n &&
              n.hasOwnProperty(r.MGCroProTag.KEY_CROSS_PROMOTION_TAG) &&
              ((t = n[r.MGCroProTag.KEY_CROSS_PROMOTION_TAG]),
              r.Log.i('MGRPT_DEBUG', 'cross promotion tag parsed: ' + t));
          }
          return t;
        }),
        (t.prototype.fillShareTag = function (t) {
          if (t) {
            var e = wx.getLaunchOptionsSync();
            e &&
              e.query &&
              (e.query.hasOwnProperty(r.MGShareTag.KEY_LEVEL) &&
                (r.Log.i('MGRPT_DEBUG', 'pl_level:' + e.query.agent_level),
                t.setLevel(Number(e.query.agent_level) + 1)),
              e.query.hasOwnProperty(r.MGShareTag.KEY_SUPER) &&
                (r.Log.i('MGRPT_DEBUG', 'pl_super:' + e.query.agent_upper),
                t.setSuper(e.query.agent_upper)),
              e.query.hasOwnProperty(r.MGShareTag.KEY_ORIGIN) &&
                (r.Log.i('MGRPT_DEBUG', 'pl_origin:' + e.query.agent_orign),
                t.setOrigin(e.query.agent_orign)));
          }
        }),
        (t.prototype.fillInfocEnvCfg = function (t) {
          return (
            t &&
              (t.channelKey || (t.channelKey = 1),
              t.sub_channel ||
                (t.sub_channel = r.SubChannelHelper.getSubChannel(
                  this.getLaunchParameter(),
                ))),
            t
          );
        }),
        (t.prototype.getLaunchParameter = function () {
          return wx.getLaunchOptionsSync();
        }),
        (t.prototype.login = function (t) {
          wx.login({
            success: function (t) {
              r.Log.i('WX login success. # code:' + t.code);
            },
            fail: function (t) {
              r.Log.i(
                'WX login failed. # code:' + t.code + ', errmsg:' + t.errMsg,
              );
            },
          });
        }),
        (t.prototype.getUserSetting = function (e) {
          wx.getSetting({
            success: function (t) {
              e.success && e.success(t.authSetting);
            },
            fail: function () {
              e.fail && e.fail();
            },
          });
        }),
        (t.prototype.request = function (e, t) {
          var n = this;
          wx.request({
            url: e.url,
            data: e.data,
            header: e.header,
            method: e.method,
            dataType: e.dataType,
            success: function (t) {
              200 != t.statusCode
                ? e.fail && e.fail(t.statusCode, t)
                : t.data
                ? e.success && e.success(t.statusCode, t.data, t.header)
                : e.fail && e.fail(t.statusCode, t);
            },
            fail: function () {
              1 < t ? n.request(e, t - 1) : e.fail && e.fail(-1, null);
            },
          });
        }),
        (t.prototype.getPlatformInfo = function () {
          return wx.getSystemInfoSync();
        }),
        (t.prototype.setStorage = function (t, e) {
          wx.setStorageSync(t, e);
        }),
        (t.prototype.getStorage = function (t) {
          return wx.getStorageSync(t);
        }),
        (t.prototype.delStorage = function (t) {
          wx.removeStorageSync(t);
        }),
        t
      );
    })();
    r.PlatformImpl4WX = t;
  })(MGRPT || (MGRPT = {})),
  (function (i) {
    var t = (function () {
      function t() {
        this.TAG = 'MGRPT.PlatformImpl4Web';
      }
      return (
        (t.prototype.parseCroProTag = function () {
          return '';
        }),
        (t.prototype.fillShareTag = function (t) {}),
        (t.prototype.fillInfocEnvCfg = function (t) {
          return (
            t &&
              (t.channelKey || (t.channelKey = 0),
              t.sub_channel ||
                (t.sub_channel = i.SubChannelHelper.getSubChannel(
                  this.getLaunchParameter(),
                ))),
            t
          );
        }),
        (t.prototype.getLaunchParameter = function () {
          return new i.LaunchOption();
        }),
        (t.prototype.request = function (r, t) {
          var o = this;
          i.Log.i(this.TAG, 'reqeust params: ' + r);
          var a = new XMLHttpRequest();
          for (var e in (a.open(r.method, r.url), r.header))
            a.setRequestHeader(e, r.header[e]);
          (a.onreadystatechange = function () {
            if (4 == a.readyState)
              if (200 == a.status) {
                if (
                  (i.Log.i(o.TAG, 'request, succeed:', a.responseText),
                  r.success)
                ) {
                  var e = a.status,
                    n = a.getAllResponseHeaders();
                  if ('json' == r.dataType)
                    try {
                      r.success(e, JSON.parse(a.responseText), n);
                    } catch (t) {
                      r.success(e, a.responseText, n);
                    }
                  else r.success(e, a.responseText, n);
                }
              } else
                i.Log.i(o.TAG, 'request, failed:', a.responseText),
                  1 < t
                    ? o.request(r, t - 1)
                    : r.fail && r.fail(a.status, a.responseText);
          }),
            a.send(JSON.stringify(r.data));
        }),
        (t.prototype.getPlatformInfo = function () {
          var t = new i.PlatformInfo();
          t.platform = 'web';
          try {
            (t.system = navigator.platform),
              (t.model = navigator.appName),
              (t.version = navigator.appVersion),
              (t.language = navigator.language),
              (t.screenWidth = window.screen.width),
              (t.screenHeight = window.screen.height);
          } catch (t) {
            i.Log.w(this.TAG, 'exception occur while collecting platform info');
          }
          return t;
        }),
        (t.prototype.setStorage = function (t, e) {
          this.isLocalStorageAvailable()
            ? window.localStorage.setItem(t, e)
            : this.isSessionAvailable()
            ? window.sessionStorage.setItem(t, e)
            : i.Log.w(this.TAG, 'storage api is unavailable');
        }),
        (t.prototype.getStorage = function (t) {
          return this.isLocalStorageAvailable()
            ? window.localStorage.getItem(t)
            : this.isSessionAvailable()
            ? window.sessionStorage.getItem(t)
            : void i.Log.w(this.TAG, 'storage api is unavailable');
        }),
        (t.prototype.delStorage = function (t) {
          this.isLocalStorageAvailable()
            ? window.localStorage.removeItem(t)
            : this.isSessionAvailable()
            ? window.sessionStorage.removeItem(t)
            : i.Log.w(this.TAG, 'storage api is unavailable');
        }),
        (t.prototype.isSessionAvailable = function () {
          return !!window.sessionStorage;
        }),
        (t.prototype.isLocalStorageAvailable = function () {
          return !!window.localStorage;
        }),
        t
      );
    })();
    i.PlatformImpl4Web = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function () {
      function t() {
        this.mPlatformCur = null;
      }
      return (
        (t.getInstance = function () {
          return null != this.sInst || (this.sInst = new t()), this.sInst;
        }),
        (t.prototype.init = function (t) {
          if (!this.mPlatformCur)
            switch (t) {
              case e.ENUMPLATFORM.PLATFORM_WX:
                this.mPlatformCur = new e.PlatformImpl4WX();
                break;
              case e.ENUMPLATFORM.PLATFORM_QQ:
                this.mPlatformCur = new e.PlatformImpl4QQ();
                break;
              case e.ENUMPLATFORM.PLATFORM_WEB:
                this.mPlatformCur = new e.PlatformImpl4Web();
                break;
              case e.ENUMPLATFORM.PLATFORM_FB:
                this.mPlatformCur = new e.PlatformImpl4FB();
                break;
              case e.ENUMPLATFORM.PLATFORM_TT:
                this.mPlatformCur = new e.PlatformImpl4TT();
            }
        }),
        (t.prototype.request = function (t, e) {
          void 0 === e && (e = 3),
            null != this.mPlatformCur && this.mPlatformCur.request(t, e);
        }),
        (t.prototype.getPlatformInfo = function () {
          return null == this.mPlatformCur
            ? null
            : this.mPlatformCur.getPlatformInfo();
        }),
        (t.prototype.setStorage = function (t, e) {
          if (null == this.mPlatformCur) return null;
          this.mPlatformCur.setStorage(t, e);
        }),
        (t.prototype.getStorage = function (t) {
          return null == this.mPlatformCur
            ? null
            : this.mPlatformCur.getStorage(t);
        }),
        (t.prototype.delStorage = function (t) {
          if (null == this.mPlatformCur) return null;
          this.mPlatformCur.delStorage(t);
        }),
        (t.prototype.fillInfocEnvCfg = function (t) {
          return null == this.mPlatformCur
            ? t
            : this.mPlatformCur.fillInfocEnvCfg(t);
        }),
        (t.prototype.fillShareTag = function (t) {
          this.mPlatformCur && this.mPlatformCur.fillShareTag(t);
        }),
        (t.prototype.parseCroProTag = function () {
          return this.mPlatformCur ? this.mPlatformCur.parseCroProTag() : null;
        }),
        (t.sInst = null),
        t
      );
    })();
    e.PlatformProxy = t;
  })(MGRPT || (MGRPT = {})),
  (function (o) {
    var t = (function (t) {
      function r() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        __extends(r, t),
        (r.prototype.getTableID = function () {
          return o.ENUMPLATFORM.PLATFORM_FB ===
            o.PlatformChecker.getPlatformType()
            ? 101
            : 203;
        }),
        (r.report = function (t) {
          var e = new r(),
            n = o.PlatformProxy.getInstance().getPlatformInfo();
          e.set('screenwidth', n ? n.screenWidth : 0),
            e.set('screenheight', n ? n.screenHeight : 0),
            e.set('language', n ? n.language : ''),
            e.set('clicked', t),
            e.set('game_time', 0),
            e.set('ver', this.VERSION),
            e.set('font_size', n ? n.fontSizeSetting : 0),
            e.set('source', 0),
            e.set('src_detail', ''),
            e.report();
        }),
        (r.VERSION = 1),
        (r.CLICKED_APPLICATION_INIT = 1),
        (r.CLICKED_RESLOAD_SUCCESS = 2),
        r
      );
    })(o.Infoc);
    o.minigame_common_active = t;
  })(MGRPT || (MGRPT = {})),
  (function (u) {
    var t = (function (t) {
      function s() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        __extends(s, t),
        (s.prototype.getTableID = function () {
          return u.ENUMPLATFORM.PLATFORM_FB ===
            u.PlatformChecker.getPlatformType()
            ? 102
            : 208;
        }),
        (s.report = function (t, e, n, r) {
          u.Log.i(
            'MGRPT_DEBUG',
            'minigame_common_ad.report enter. posId:' + t + ', action:' + e,
          );
          var o = new s(),
            a = s.ADSOURCE_UNKNOWN;
          if (null != o && null != t) {
            var i = '';
            (i = 'string' == typeof n ? n : String(n)),
              o.set('posid', t),
              o.set('action', e),
              o.set('err_code', i),
              o.set('ad_type', r),
              o.set('source', a),
              o.set('ver', s.VERSION),
              o.report();
          }
        }),
        (s.VERSION = 1),
        (s.ADSOURCE_UNKNOWN = 0),
        s
      );
    })(u.Infoc);
    u.minigame_common_ad = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function (t) {
      function u() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        __extends(u, t),
        (u.prototype.getTableID = function () {
          return e.ENUMPLATFORM.PLATFORM_FB ===
            e.PlatformChecker.getPlatformType()
            ? 103
            : 230;
        }),
        (u.report = function (t, e, n, r, o, a, i) {
          var s = new u();
          s.set('open_type', t),
            s.set('user_type', e),
            s.set('open_from', n),
            s.set('scene_id', r),
            s.set('source_id', o),
            s.set('source_desc', a),
            s.set('md5', i),
            s.report();
        }),
        u
      );
    })(e.Infoc);
    e.minigame_common_open_from = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function (t) {
      function I() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        __extends(I, t),
        (I.prototype.getTableID = function () {
          return e.ENUMPLATFORM.PLATFORM_FB ===
            e.PlatformChecker.getPlatformType()
            ? 104
            : 232;
        }),
        (I.report = function (
          t,
          e,
          n,
          r,
          o,
          a,
          i,
          s,
          u,
          l,
          f,
          c,
          g,
          p,
          m,
          h,
          P,
          y,
        ) {
          void 0 === o && (o = 0),
            void 0 === a && (a = ''),
            void 0 === i && (i = 0),
            void 0 === s && (s = ''),
            void 0 === u && (u = 0),
            void 0 === l && (l = ''),
            void 0 === f && (f = 0),
            void 0 === c && (c = ''),
            void 0 === g && (g = 0),
            void 0 === p && (p = ''),
            void 0 === m && (m = 0),
            void 0 === h && (h = 0),
            void 0 === P && (P = 0),
            void 0 === y && (y = 0);
          var T = new I();
          T.set('action', t),
            T.set('survival_time', e),
            T.set('mark', n),
            T.set('skin', r),
            T.set('property1', o),
            T.set('property2', i),
            T.set('property3', u),
            T.set('property4', f),
            T.set('property5', g),
            T.set('property6', m),
            T.set('property7', h),
            T.set('property8', P),
            T.set('property9', y),
            T.set('extra1', a),
            T.set('extra2', s),
            T.set('extra3', l),
            T.set('extra4', c),
            T.set('extra5', p),
            T.report();
        }),
        (I.reportInOrder = function (
          t,
          e,
          n,
          r,
          o,
          a,
          i,
          s,
          u,
          l,
          f,
          c,
          g,
          p,
          m,
          h,
          P,
          y,
        ) {
          void 0 === o && (o = 0),
            void 0 === a && (a = 0),
            void 0 === i && (i = 0),
            void 0 === s && (s = 0),
            void 0 === u && (u = 0),
            void 0 === l && (l = 0),
            void 0 === f && (f = 0),
            void 0 === c && (c = 0),
            void 0 === g && (g = 0),
            void 0 === p && (p = ''),
            void 0 === m && (m = ''),
            void 0 === h && (h = ''),
            void 0 === P && (P = ''),
            void 0 === y && (y = '');
          var T = new I();
          T.set('action', t),
            T.set('survival_time', e),
            T.set('mark', n),
            T.set('skin', r),
            T.set('property1', o),
            T.set('property2', a),
            T.set('property3', i),
            T.set('property4', s),
            T.set('property5', u),
            T.set('property6', l),
            T.set('property7', f),
            T.set('property8', c),
            T.set('property9', g),
            T.set('extra1', p),
            T.set('extra2', m),
            T.set('extra3', h),
            T.set('extra4', P),
            T.set('extra5', y),
            T.report();
        }),
        I
      );
    })(e.Infoc);
    e.minigame_common_playerdata = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function (t) {
      function f() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        __extends(f, t),
        (f.prototype.getTableID = function () {
          return e.ENUMPLATFORM.PLATFORM_FB ===
            e.PlatformChecker.getPlatformType()
            ? 105
            : 233;
        }),
        (f.report = function (t, e, n, r, o, a, i, s, u) {
          void 0 === o && (o = ''),
            void 0 === a && (a = ''),
            void 0 === i && (i = ''),
            void 0 === s && (s = ''),
            void 0 === u && (u = '');
          var l = new f();
          l.set('action', t),
            l.set('types', e),
            l.set('num', n),
            l.set('source', r),
            l.set('extra1', o),
            l.set('extra2', a),
            l.set('extra3', i),
            l.set('extra4', s),
            l.set('extra5', u),
            l.report();
        }),
        f
      );
    })(e.Infoc);
    e.minigame_common_playerdata_coin = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function (t) {
      function l() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        __extends(l, t),
        (l.prototype.getTableID = function () {
          return e.ENUMPLATFORM.PLATFORM_FB ===
            e.PlatformChecker.getPlatformType()
            ? 106
            : 229;
        }),
        (l.report = function (t, e, n, r, o, a, i, s) {
          var u = new l();
          u.set('scene_id', t),
            u.set('source_id', e),
            u.set('source_desc', n),
            u.set('share_limit', r),
            u.set('share_action', o),
            u.set('share_title', a),
            u.set('image_url', i),
            u.set('md5', s),
            u.report();
        }),
        l
      );
    })(e.Infoc);
    e.minigame_common_share_detail = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function (t) {
      function u() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        __extends(u, t),
        (u.prototype.getTableID = function () {
          return e.ENUMPLATFORM.PLATFORM_FB ===
            e.PlatformChecker.getPlatformType()
            ? 107
            : 228;
        }),
        (u.report = function (t, e, n, r, o, a, i) {
          var s = new u();
          s.set('scene_id', t),
            s.set('source_id', e),
            s.set('source_desc', n),
            s.set('share_action', r),
            s.set('share_title', o),
            s.set('share_describe', a),
            s.set('share_button', i),
            s.report();
        }),
        u
      );
    })(e.Infoc);
    e.minigame_common_share_scene = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function (t) {
      function r() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        __extends(r, t),
        (r.prototype.getTableID = function () {
          return e.ENUMPLATFORM.PLATFORM_FB ===
            e.PlatformChecker.getPlatformType()
            ? (e.Log.e(
                'MGRPT',
                'minigame_common_time not support Facebook Platform Now!!!',
              ),
              0)
            : 252;
        }),
        (r.report = function (t, e) {
          var n = new r();
          n.set('g_type', t), n.set('g_time', e), n.report();
        }),
        r
      );
    })(e.Infoc);
    e.minigame_common_time = t;
  })(MGRPT || (MGRPT = {})),
  (function (e) {
    var t = (function (t) {
      function l() {
        return (null !== t && t.apply(this, arguments)) || this;
      }
      return (
        __extends(l, t),
        (l.prototype.getTableID = function () {
          return e.ENUMPLATFORM.PLATFORM_FB ===
            e.PlatformChecker.getPlatformType()
            ? 108
            : 231;
        }),
        (l.report = function (t, e, n, r, o, a, i, s) {
          void 0 === r && (r = ''),
            void 0 === o && (o = ''),
            void 0 === a && (a = ''),
            void 0 === i && (i = ''),
            void 0 === s && (s = '');
          var u = new l();
          u.set('page', t),
            u.set('node', e),
            u.set('action', n),
            u.set('extra1', r),
            u.set('extra2', o),
            u.set('extra3', a),
            u.set('extra4', i),
            u.set('extra5', s),
            u.report();
        }),
        l
      );
    })(e.Infoc);
    e.minigame_common_user_action = t;
  })(MGRPT || (MGRPT = {})),
  (function (r) {
    var t = (function () {
      function n() {
        (this.mLevel = 1),
          (this.mPlayerId4Super = ''),
          (this.mPlayerId4Origin = ''),
          this.init(),
          this.fetchTag();
      }
      return (
        (n.prototype.getLevel = function () {
          return this.mLevel;
        }),
        (n.prototype.getSuper = function () {
          return this.mPlayerId4Super;
        }),
        (n.prototype.getOrigin = function () {
          return this.mPlayerId4Origin;
        }),
        (n.prototype.setLevel = function (t) {
          this.mLevel = t;
        }),
        (n.prototype.setSuper = function (t) {
          this.mPlayerId4Super = t;
        }),
        (n.prototype.setOrigin = function (t) {
          this.mPlayerId4Origin = t;
        }),
        (n.prototype.fetchTag = function () {
          this.isFirstRun()
            ? (this.fetchFromLaunchOptions(), this.saveShareTag())
            : this.fetchFromLocalStorage();
        }),
        (n.prototype.init = function () {
          var t = r.MGCmnRptModule.getPlayerId();
          (this.mLevel = 1),
            (this.mPlayerId4Super = ''),
            (this.mPlayerId4Origin = t);
        }),
        (n.prototype.fetchFromLaunchOptions = function () {
          r.Log.i('MGRPT_DEBUG', 'MGShareTag fetchFromLaunchOptions enter().'),
            r.PlatformProxy.getInstance().fillShareTag(this);
        }),
        (n.prototype.fetchFromLocalStorage = function () {
          r.Log.i('MGRPT_DEBUG', 'MGShareTag fetchFromLocalStorage enter().');
          var t = r.PlatformProxy.getInstance().getStorage(n.KEY_LEVEL);
          if (
            (t && 0 < t.length && (this.mLevel = Number(t)),
            (this.mPlayerId4Origin = r.PlatformProxy.getInstance().getStorage(
              n.KEY_ORIGIN,
            )),
            !this.mPlayerId4Origin)
          ) {
            r.Log.e(
              n.TAG,
              'fetchFromLocalStorage [error] Origin PlayerId is empty.',
            );
            var e = r.MGCmnRptModule.getPlayerId();
            this.mPlayerId4Origin = e;
          }
          (this.mPlayerId4Super = r.PlatformProxy.getInstance().getStorage(
            n.KEY_SUPER,
          )),
            this.mPlayerId4Super || (this.mPlayerId4Super = '');
        }),
        (n.prototype.isFirstRun = function () {
          var t = r.PlatformProxy.getInstance().getStorage(n.KEY_NOT1ST);
          return !t || 0 == t.length;
        }),
        (n.prototype.saveShareTag = function () {
          r.PlatformProxy.getInstance().setStorage(n.KEY_NOT1ST, 'dirtry'),
            r.PlatformProxy.getInstance().setStorage(
              n.KEY_LEVEL,
              String(this.mLevel),
            ),
            r.PlatformProxy.getInstance().setStorage(
              n.KEY_SUPER,
              this.mPlayerId4Super,
            ),
            r.PlatformProxy.getInstance().setStorage(
              n.KEY_ORIGIN,
              this.mPlayerId4Origin,
            );
        }),
        (n.TAG = ''),
        (n.KEY_NOT1ST = 'mgst_1st'),
        (n.KEY_LEVEL = 'agent_level'),
        (n.KEY_SUPER = 'agent_upper'),
        (n.KEY_ORIGIN = 'agent_orign'),
        n
      );
    })();
    r.MGShareTag = t;
  })(MGRPT || (MGRPT = {})),
  (function (t) {
    var r = function (t, e) {
      (this.key = null), (this.value = null), (this.key = t), (this.value = e);
    };
    t.Pair = r;
    var e = (function () {
      function t() {
        this.arr = [];
      }
      return (
        (t.prototype.put = function (t, e) {
          for (var n = 0; n < this.arr.length; n++)
            if (this.arr[n].key === t) return void (this.arr[n].value = e);
          this.arr.push(new r(t, e));
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
  })(MGRPT || (MGRPT = {})),
  (function (o) {
    var t = (function () {
      function r() {}
      return (
        (r.i = function (t) {
          for (var e = [], n = 1; n < arguments.length; n++)
            e[n - 1] = arguments[n];
          o.MGCmnRptModule.isEnableDebugEnv() &&
            (o.PlatformChecker.getPlatformType() == o.ENUMPLATFORM.PLATFORM_QQ
              ? BK.Script.log(1, 1, t + this.GetOptionalMsg(e))
              : console.info(r.getPrefix(), t, e));
        }),
        (r.w = function (t) {
          for (var e = [], n = 1; n < arguments.length; n++)
            e[n - 1] = arguments[n];
          o.MGCmnRptModule.isEnableDebugEnv() &&
            (o.PlatformChecker.getPlatformType() == o.ENUMPLATFORM.PLATFORM_QQ
              ? BK.Script.log(1, 1, t + this.GetOptionalMsg(e))
              : console.warn(r.getPrefix(), t, e));
        }),
        (r.e = function (t) {
          for (var e = [], n = 1; n < arguments.length; n++)
            e[n - 1] = arguments[n];
          o.MGCmnRptModule.isEnableDebugEnv() &&
            (o.PlatformChecker.getPlatformType() == o.ENUMPLATFORM.PLATFORM_QQ
              ? BK.Script.log(1, 1, t + this.GetOptionalMsg(e))
              : console.error(r.getPrefix(), t, e));
        }),
        (r.f = function (t) {
          for (var e = [], n = 1; n < arguments.length; n++)
            e[n - 1] = arguments[n];
          o.MGCmnRptModule.isEnableDebugEnv() &&
            (o.PlatformChecker.getPlatformType() == o.ENUMPLATFORM.PLATFORM_QQ
              ? BK.Script.log(1, 1, t + this.GetOptionalMsg(e))
              : console.error(r.getPrefix(), t, e));
        }),
        (r.formatDateTime = function () {
          var t = new Date(),
            e = t.getHours().toString(),
            n = t.getMinutes().toString(),
            r = t.getSeconds().toString(),
            o = t.getMilliseconds().toString();
          if (
            (n.length < 2 && (n = '0' + n),
            r.length < 2 && (r = '0' + r),
            o.length < 3)
          )
            for (var a = 0; a < 3 - o.length; a++) o = '0' + o;
          return e + ':' + n + ':' + r + ' ' + o;
        }),
        (r.getPrefix = function () {
          return '[' + r.formatDateTime() + '] ';
        }),
        (r.GetOptionalMsg = function () {
          for (var t = [], e = 0; e < arguments.length; e++)
            t[e] = arguments[e];
          var n = '';
          for (var r in t) n += ' ' + t[r];
          return n;
        }),
        r
      );
    })();
    o.Log = t;
  })(MGRPT || (MGRPT = {})),
  (function (t) {
    var a = 0,
      i = '';

    function e(t) {
      return o(n(l(t)));
    }

    function n(t) {
      return c(g(f(t), 8 * t.length));
    }

    function r(t, e) {
      var n = f(t);
      16 < n.length && (n = g(n, 8 * t.length));
      for (var r = Array(16), o = Array(16), a = 0; a < 16; a++)
        (r[a] = 909522486 ^ n[a]), (o[a] = 1549556828 ^ n[a]);
      var i = g(r.concat(f(e)), 512 + 8 * e.length);
      return c(g(o.concat(i), 672));
    }

    function o(t) {
      for (
        var e, n = a ? '0123456789ABCDEF' : '0123456789abcdef', r = '', o = 0;
        o < t.length;
        o++
      )
        (e = t.charCodeAt(o)),
          (r += n.charAt((e >>> 4) & 15) + n.charAt(15 & e));
      return r;
    }

    function s(t) {
      for (var e = '', n = t.length, r = 0; r < n; r += 3)
        for (
          var o =
              (t.charCodeAt(r) << 16) |
              (r + 1 < n ? t.charCodeAt(r + 1) << 8 : 0) |
              (r + 2 < n ? t.charCodeAt(r + 2) : 0),
            a = 0;
          a < 4;
          a++
        )
          8 * r + 6 * a > 8 * t.length
            ? (e += i)
            : (e +=
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(
                  (o >>> (6 * (3 - a))) & 63,
                ));
      return e;
    }

    function u(t, e) {
      var n,
        r,
        o,
        a,
        i = e.length,
        s = Array(),
        u = Array(Math.ceil(t.length / 2));
      for (n = 0; n < u.length; n++)
        u[n] = (t.charCodeAt(2 * n) << 8) | t.charCodeAt(2 * n + 1);
      for (; 0 < u.length; ) {
        for (a = Array(), n = o = 0; n < u.length; n++)
          (o = (o << 16) + u[n]),
            (o -= (r = Math.floor(o / i)) * i),
            (0 < a.length || 0 < r) && (a[a.length] = r);
        (s[s.length] = o), (u = a);
      }
      var l = '';
      for (n = s.length - 1; 0 <= n; n--) l += e.charAt(s[n]);
      var f = Math.ceil((8 * t.length) / (Math.log(e.length) / Math.log(2)));
      for (n = l.length; n < f; n++) l = e[0] + l;
      return l;
    }

    function l(t) {
      for (var e, n, r = '', o = -1; ++o < t.length; )
        (e = t.charCodeAt(o)),
          (n = o + 1 < t.length ? t.charCodeAt(o + 1) : 0),
          55296 <= e &&
            e <= 56319 &&
            56320 <= n &&
            n <= 57343 &&
            ((e = 65536 + ((1023 & e) << 10) + (1023 & n)), o++),
          e <= 127
            ? (r += String.fromCharCode(e))
            : e <= 2047
            ? (r += String.fromCharCode(192 | ((e >>> 6) & 31), 128 | (63 & e)))
            : e <= 65535
            ? (r += String.fromCharCode(
                224 | ((e >>> 12) & 15),
                128 | ((e >>> 6) & 63),
                128 | (63 & e),
              ))
            : e <= 2097151 &&
              (r += String.fromCharCode(
                240 | ((e >>> 18) & 7),
                128 | ((e >>> 12) & 63),
                128 | ((e >>> 6) & 63),
                128 | (63 & e),
              ));
      return r;
    }

    function f(t) {
      for (var e = Array(t.length >> 2), n = 0; n < e.length; n++) e[n] = 0;
      for (n = 0; n < 8 * t.length; n += 8)
        e[n >> 5] |= (255 & t.charCodeAt(n / 8)) << (24 - (n % 32));
      return e;
    }

    function c(t) {
      for (var e = '', n = 0; n < 32 * t.length; n += 8)
        e += String.fromCharCode((t[n >> 5] >>> (24 - (n % 32))) & 255);
      return e;
    }

    function g(t, e) {
      (t[e >> 5] |= 128 << (24 - (e % 32))),
        (t[15 + (((e + 64) >> 9) << 4)] = e);
      for (
        var n,
          r = Array(80),
          o = 1732584193,
          a = -271733879,
          i = -1732584194,
          s = 271733878,
          u = -1009589776,
          l = 0;
        l < t.length;
        l += 16
      ) {
        for (var f = o, c = a, g = i, p = s, m = u, h = 0; h < 80; h++) {
          r[h] =
            h < 16
              ? t[l + h]
              : I(r[h - 3] ^ r[h - 8] ^ r[h - 14] ^ r[h - 16], 1);
          var P = T(
            T(I(o, 5), y(h, a, i, s)),
            T(
              T(u, r[h]),
              (n = h) < 20
                ? 1518500249
                : n < 40
                ? 1859775393
                : n < 60
                ? -1894007588
                : -899497514,
            ),
          );
          (u = s), (s = i), (i = I(a, 30)), (a = o), (o = P);
        }
        (o = T(o, f)),
          (a = T(a, c)),
          (i = T(i, g)),
          (s = T(s, p)),
          (u = T(u, m));
      }
      return Array(o, a, i, s, u);
    }

    function y(t, e, n, r) {
      return t < 20
        ? (e & n) | (~e & r)
        : t < 40
        ? e ^ n ^ r
        : t < 60
        ? (e & n) | (e & r) | (n & r)
        : e ^ n ^ r;
    }

    function T(t, e) {
      var n = (65535 & t) + (65535 & e);
      return (((t >> 16) + (e >> 16) + (n >> 16)) << 16) | (65535 & n);
    }

    function I(t, e) {
      return (t << e) | (t >>> (32 - e));
    }
    (t.hex_sha1 = e),
      (t.b64_sha1 = function (t) {
        return s(n(l(t)));
      }),
      (t.any_sha1 = function (t, e) {
        return u(n(l(t)), e);
      }),
      (t.hex_hmac_sha1 = function (t, e) {
        return o(r(l(t), l(e)));
      }),
      (t.b64_hmac_sha1 = function (t, e) {
        return s(r(l(t), l(e)));
      }),
      (t.any_hmac_sha1 = function (t, e, n) {
        return u(r(l(t), l(e)), n);
      });
  })(MGRPT || (MGRPT = {})),
  (function (t) {
    var e = (function () {
      function t() {}
      return (
        (t.formatDate = function (t) {
          var e = t.getFullYear(),
            n = t.getMonth() + 1,
            r = n < 10 ? '0' + n : n + '',
            o = t.getDate();
          return e + '-' + r + '-' + (o < 10 ? '0' + o : o + '');
        }),
        t
      );
    })();
    t.TimeUtil = e;
  })(MGRPT || (MGRPT = {}));
