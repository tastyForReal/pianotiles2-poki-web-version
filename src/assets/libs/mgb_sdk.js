var MGB,
    __extends =
        (this && this.__extends) ||
        (function () {
            var n = function (t, e) {
                return (n =
                    Object.setPrototypeOf ||
                    ({
                        __proto__: [],
                    } instanceof Array &&
                        function (t, e) {
                            t.__proto__ = e;
                        }) ||
                    function (t, e) {
                        for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o]);
                    })(t, e);
            };
            return function (t, e) {
                function o() {
                    this.constructor = t;
                }
                n(t, e), (t.prototype = null === e ? Object.create(e) : ((o.prototype = e.prototype), new o()));
            };
        })();
(function (t) {
    var e = (function () {
        function t() {}
        return (
            (t.VERSION = '1.0.0.3'),
            (t.PLATFORM_WX = 'wechat'),
            (t.PLATFORM_QQ = 'qq'),
            (t.PLATFORM_WEB = 'web'),
            (t.PLATFORM_FB = 'facebook'),
            (t.GETYPE_CC = 'cocos-creator'),
            (t.GETYPE_LAYABOX = 'layabox'),
            (t.APTYPE_UNKNOWN = 0),
            (t.APTYPE_WX_REWARDVIDEO = 1),
            (t.APTYPE_QQ_REWARDVIDEO = 1),
            (t.APTYPE_FB_REWARDVIDEO = 1),
            (t.APTYPE_WX_BANNER = 2),
            (t.APTYPE_QQ_BANNER = 2),
            (t.APTYPE_FB_INTERSTITIAL = 4),
            (t.APTYPE_RCMD_UNKNOWN = 5),
            (t.APTYPE_RCMD_GIFTBOX = 5),
            (t.APTYPE_RCMD_SCOREWALL = 5),
            (t.ADTYPE_UNKNOWN = 0),
            (t.ADTYPE_WX_REWARDVIDEO = 1),
            (t.ADTYPE_QQ_REWARDVIDEO = 1),
            (t.ADTYPE_FB_REWARDVIDEO = 1),
            (t.ADTYPE_WX_BANNER = 2),
            (t.ADTYPE_QQ_BANNER = 2),
            (t.ADTYPE_FB_INTERSTITIAL = 4),
            (t.ADTYPE_RCMD_UNKNOWN = 5),
            (t.ADTYPE_RCMD_GIFTBOX = 5),
            (t.ADTYPE_RCMD_SCOREWALL = 5),
            (t.ADSOURCE_UNKNOWN = 0),
            t
        );
    })();
    t.MGBAdDefs = e;
})(MGB || (MGB = {})),
    (function (i) {
        var t = (function () {
            function t() {
                (this.TAG = 'MGB_AdModule'),
                    (this.mPlatFormType = i.MGBAdDefs.PLATFORM_WX),
                    (this.mAdEnvCfg = null),
                    (this.mDepotPosIdCfg = null),
                    (this.mbInited = !1),
                    (this.mMapPosId2AdDepot = new Map()),
                    (this.mAdInterceptor = null),
                    (this.mMapExitFlag = new Map());
            }
            return (
                (t.getInstance = function () {
                    return null != this.sInst || (this.sInst = new t()), this.sInst;
                }),
                (t.prototype.init = function (t, e) {
                    return this.mbInited
                        ? i.MGBAdErrCode.ADERR_ADMODULE_INITED
                        : null == t
                        ? i.MGBAdErrCode.ADERR_ADMODULE_INIT_NO_ADENVCFG
                        : null == e
                        ? i.MGBAdErrCode.ADERR_ADMODULE_INIT_NO_LISTPOSCFG
                        : ((this.mPlatFormType = t.getPlatformType()),
                          (this.mAdInterceptor = new i.MGBAdInterceptor(this.mPlatFormType)),
                          (this.mAdEnvCfg = t),
                          (this.mDepotPosIdCfg = new i.MGBAdPosIdCfgDepot(e)),
                          (this.mbInited = !0),
                          this.registerCreators(),
                          i.MGBAdErrCode.ADERR_SUCCESS);
                }),
                (t.prototype.registerCreators = function () {
                    var e = this;
                    this.mAdInterceptor && !this.mAdInterceptor.intercept()
                        ? (this.regASCreator(i.MGBAdSelector4Auto.ASNAME, {
                              createNewAdSelector: function (t) {
                                  return new i.MGBAdSelector4Auto(e.mPlatFormType, t);
                              },
                          }),
                          this.regAPCreator(i.MGBAdProvider4WXBanner.APNAME, {
                              createNewAdProvider: function () {
                                  return new i.MGBAdProvider4WXBanner();
                              },
                          }),
                          this.regAPCreator(i.MGBAdProvider4WXRewardVideo.APNAME, {
                              createNewAdProvider: function () {
                                  return new i.MGBAdProvider4WXRewardVideo();
                              },
                          }),
                          this.regAPCreator(i.MGBAdProvider4QQBanner.APNAME, {
                              createNewAdProvider: function () {
                                  return new i.MGBAdProvider4QQBanner();
                              },
                          }),
                          this.regAPCreator(i.MGBAdProvider4QQRewardVideo.APNAME, {
                              createNewAdProvider: function () {
                                  return new i.MGBAdProvider4QQRewardVideo();
                              },
                          }),
                          this.regAPCreator(i.MGBAdProvider4FBRewardVideo.APNAME, {
                              createNewAdProvider: function () {
                                  return new i.MGBAdProvider4FBRewardVideo();
                              },
                          }),
                          this.regAPCreator(i.MGBAdProvider4FBInterstitial.APNAME, {
                              createNewAdProvider: function () {
                                  return new i.MGBAdProvider4FBInterstitial();
                              },
                          }))
                        : i.Log.w(this.TAG, "can't execute action: registerCreators()");
                }),
                (t.prototype.getAdEnvCfg = function () {
                    return this.mAdEnvCfg;
                }),
                (t.prototype.getPosIdCfg = function (t) {
                    return null == t ? null : null == this.mDepotPosIdCfg ? null : this.mDepotPosIdCfg.getPosIdCfg(t);
                }),
                (t.prototype.fetchAd = function (t, e, o) {
                    if (!this.mAdInterceptor || this.mAdInterceptor.intercept())
                        return (
                            i.Log.e(this.TAG, 'intercept ad fetch request because of unsupported platform'),
                            new i.ResultFetchAd(i.MGBAdErrCode.ADERR_ADMODULE_PLATFORM_INTERCEPT)
                        );
                    if (this.hasSceneExitFlag(t)) return new i.ResultFetchAd(i.MGBAdErrCode.ADERR_ADM_EXIT_SCENE);
                    var n = this.getAdDepot(t);
                    return null == n
                        ? new i.ResultFetchAd(i.MGBAdErrCode.ADERR_ADMODULE_FETCH_NO_ADDEPOT)
                        : n.doFetch(e, o);
                }),
                (t.prototype.loadAd = function (t, e, o) {
                    if (!this.mAdInterceptor || this.mAdInterceptor.intercept())
                        return (
                            i.Log.e(this.TAG, 'intercept ad load request because of unsupported platform'),
                            i.MGBAdErrCode.ADERR_ADMODULE_PLATFORM_INTERCEPT
                        );
                    var n = this.getAdDepot(t);
                    if (null == n) return i.MGBAdErrCode.ADERR_ADMODULE_LOAD_NO_ADDEPOT;
                    var r = n.doLoad(e, o);
                    return (
                        r != i.MGBAdErrCode.ADERR_SUCCESS &&
                            MGRPT.minigame_common_ad.report(
                                t,
                                i.MGBAdAction.ACTION_NOT_TO_LOAD,
                                r,
                                i.MGBAdDefs.ADTYPE_UNKNOWN,
                            ),
                        r
                    );
                }),
                (t.prototype.regAPCreator = function (t, e) {
                    this.mAdInterceptor.intercept()
                        ? i.Log.w(this.TAG, "can't execute action: regAPCreator()")
                        : i.MGBAdCompFactory.getInstance().regAPCreator(t, e);
                }),
                (t.prototype.regASCreator = function (t, e) {
                    this.mAdInterceptor.intercept()
                        ? i.Log.w(this.TAG, "can't execute action: regASCreator()")
                        : i.MGBAdCompFactory.getInstance().regASCreator(t, e);
                }),
                (t.prototype.getAdDepot = function (t) {
                    if (this.mAdInterceptor.intercept()) return null;
                    if (!this.mbInited) return null;
                    if (null == t) return null;
                    if (null == this.mMapPosId2AdDepot) return null;
                    var e = null;
                    if (this.mMapPosId2AdDepot.has(t)) e = this.mMapPosId2AdDepot.get(t);
                    else {
                        var o = this.getPosIdCfg(t);
                        if (null == o) return null;
                        (e = new i.MGBAdDepot(o)), this.mMapPosId2AdDepot.set(t, e);
                    }
                    return e;
                }),
                (t.prototype.getCacheSize = function (t) {
                    if (!this.mAdInterceptor || this.mAdInterceptor.intercept())
                        return i.Log.w(this.TAG, "can't execute action: getCacheSize()"), 0;
                    var e = this.getAdDepot(t);
                    return null == e ? 0 : e.getCacheSize();
                }),
                (t.prototype.destroyLastAd = function (t) {
                    if (this.mAdInterceptor && !this.mAdInterceptor.intercept()) {
                        if (null != t) {
                            var e = this.getAdDepot(t);
                            null != e && e.destoryLastAd();
                        }
                    } else i.Log.w(this.TAG, "can't execute action: destroyLastAd()");
                }),
                (t.prototype.enterScene = function (t) {
                    this.mAdInterceptor && !this.mAdInterceptor.intercept()
                        ? null != this.mMapExitFlag && t && 0 != t.length && this.mMapExitFlag.set(t, !1)
                        : i.Log.w(this.TAG, "can't execute action: enterScene()");
                }),
                (t.prototype.exitScene = function (t, e) {
                    this.mAdInterceptor && !this.mAdInterceptor.intercept()
                        ? null != this.mMapExitFlag &&
                          t &&
                          0 != t.length &&
                          (this.mMapExitFlag.set(t, !0), e && this.destroyLastAd(t))
                        : i.Log.w(this.TAG, "can't execute action: exitScene()");
                }),
                (t.prototype.hasSceneExitFlag = function (t) {
                    if (this.mAdInterceptor && !this.mAdInterceptor.intercept())
                        return (
                            !(null == this.mMapExitFlag || !t || 0 == t.length) &&
                            !!this.mMapExitFlag.has(t) &&
                            this.mMapExitFlag.get(t)
                        );
                    i.Log.w(this.TAG, "can't execute action: hasSceneExitFlag()");
                }),
                (t.prototype.rptCommonAd = function (t, e, o) {
                    this.mAdInterceptor && !this.mAdInterceptor.intercept()
                        ? t && MGRPT.minigame_common_ad.report(t, e, i.MGBAdErrCode.ADERR_SUCCESS, this.getAdType(t), o)
                        : i.Log.w(this.TAG, "can't execute action: rptCommonAd()");
                }),
                (t.prototype.rptCommonActive = function (t) {
                    this.mAdInterceptor && !this.mAdInterceptor.intercept()
                        ? MGRPT.minigame_common_active.report(t)
                        : i.Log.w(this.TAG, "can't execute action: rptCommonActive()");
                }),
                (t.prototype.enable = function (t) {
                    this.mAdInterceptor && this.mAdInterceptor.switch4Ad(t);
                }),
                (t.prototype.isDisable = function () {
                    return !!this.mAdInterceptor && this.mAdInterceptor.intercept();
                }),
                (t.prototype.isClickRVAdTooMuch = function (t) {
                    return i.MGBAdShowRecord.getInstance().isShowAdTooMuch(t);
                }),
                (t.prototype.showAd = function (t, e) {
                    if (this.mAdInterceptor && !this.mAdInterceptor.intercept()) {
                        if (!this.isClickRVAdTooMuch(t))
                            if (
                                (MGRPT.minigame_common_ad.report(
                                    t,
                                    i.MGBAdAction.ACTION_SHOW_BEGIN,
                                    i.MGBAdErrCode.ADERR_SUCCESS,
                                    this.getAdType(t),
                                ),
                                0 < this.getCacheSize(t))
                            )
                                this.fetchAndShow(t, e);
                            else {
                                var o = this.fetchAndShow.bind(this);
                                this.loadAd(t, new i.ParamAdLoad(), {
                                    onSuccess: function () {
                                        o && o(t, e);
                                    },
                                    onFailed: function (t, e, o) {},
                                });
                            }
                    } else i.Log.w(this.TAG, "can't execute action: showAd()");
                }),
                (t.prototype.getAdType = function (t) {
                    var e = this.getAdDepot(t);
                    return e || i.MGBAdDefs.ADTYPE_UNKNOWN, e.getAdType();
                }),
                (t.prototype.fetchAndShow = function (t, e) {
                    var o = this.fetchAd(t, new i.ParamAdFetch(), null);
                    if (o.mAdErrCode == i.MGBAdErrCode.ADERR_SUCCESS) {
                        var n = o.getAd();
                        if (n) return n.show(e);
                    } else e && e.onShowFail(null, null, null);
                }),
                (t.sInst = null),
                t
            );
        })();
        i.MGBAdModule = t;
    })(MGB || (MGB = {})),
    (function (s) {
        var t = (function () {
            function t() {
                (this.TAG = 'MGB_MGBAdProvider4FBInterstitial'), (this.mAdCache = new s.MGBAdCache());
            }
            return (
                (t.prototype.getAPName = function () {
                    return t.APNAME;
                }),
                (t.prototype.doLoad = function (e, t, o, n) {
                    var r,
                        i = this;
                    return null == t
                        ? (s.Log.e(this.TAG, 'facebook interstitial ad require Placement ID'),
                          s.MGBAdErrCode.ADERR_AP_LOAD_NO_NATIVEPOSID)
                        : null == e
                        ? s.MGBAdErrCode.ADERR_AP_LOAD_NO_POSIDCFG
                        : (s.Log.i(this.TAG, 'facebook interstitial start doLoad, posId = ' + e.getPosId()),
                          FBInstant.getInterstitialAdAsync(t)
                              .then(function (t) {
                                  return (
                                      (r = t),
                                      MGRPT.minigame_common_ad.report(
                                          e.getPosId(),
                                          s.MGBAdAction.ACTION_AP_LOAD_START,
                                          s.MGBAdErrCode.ADERR_SUCCESS,
                                          this.getAdType(),
                                      ),
                                      r.loadAsync()
                                  );
                              })
                              .then(function () {
                                  s.Log.i(i.TAG, 'Preload FB interstitial successfully, posId = ' + e.getPosId()),
                                      MGRPT.minigame_common_ad.report(
                                          e.getPosId(),
                                          s.MGBAdAction.ACTION_AP_LOAD_SUCCESS,
                                          s.MGBAdErrCode.ADERR_SUCCESS,
                                          this.getAdType(),
                                      );
                                  var t = new s.MGBAd4FBInterstitial(r, e);
                                  i.mAdCache.pushBack(t),
                                      s.Log.i(
                                          i.TAG,
                                          'Current facebook interstitial ad cache size: ' + i.mAdCache.getSize(),
                                      ),
                                      n && n.onSuccess();
                              })
                              .catch(function (t) {
                                  s.Log.e(
                                      i.TAG,
                                      'FB interstitial failed to preload, posId = ' +
                                          e.getPosId() +
                                          '; errInfo = ' +
                                          t.code +
                                          ', ' +
                                          t.message,
                                  ),
                                      MGRPT.minigame_common_ad.report(
                                          e.getPosId(),
                                          s.MGBAdAction.ACTION_AP_LOAD_FAILED,
                                          s.MGBAdErrCode.ADERR_SUCCESS,
                                          this.getAdType(),
                                      ),
                                      n && n.onFailed(s.MGBAdErrCode.ADERR_UNKNOWN, t.code, t.message);
                              }),
                          s.MGBAdErrCode.ADERR_LOADING);
                }),
                (t.prototype.doFetch = function (t, e, o, n) {
                    if (null == t) return new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_ARGS_ERROR);
                    if (!e)
                        return (
                            s.Log.e(this.TAG, 'facebook interstitial ad require Placement ID'),
                            new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NO_NATIVEPOSID)
                        );
                    if (
                        (s.Log.i(this.TAG, 'start doFetch, posId = ' + t.getPosId()),
                        MGRPT.minigame_common_ad.report(
                            t.getPosId(),
                            s.MGBAdAction.ACTION_AP_FETCH_START,
                            s.MGBAdErrCode.ADERR_SUCCESS,
                            this.getAdType(),
                        ),
                        null == this.mAdCache || 0 == this.mAdCache.getSize())
                    )
                        return (
                            MGRPT.minigame_common_ad.report(
                                t.getPosId(),
                                s.MGBAdAction.ACTION_AP_FETCH_FAILED,
                                s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE,
                                this.getAdType(),
                            ),
                            new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE)
                        );
                    var r = this.mAdCache.popFront();
                    return (
                        this.isNeedLoadMore() && this.doLoad(t, e, new s.ParamAdLoad(), null),
                        null == r
                            ? (MGRPT.minigame_common_ad.report(
                                  t.getPosId(),
                                  s.MGBAdAction.ACTION_AP_FETCH_FAILED,
                                  s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE,
                                  this.getAdType(),
                              ),
                              new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE))
                            : (s.Log.i(this.TAG, 'doFetch success, posId = ' + t.getPosId()),
                              MGRPT.minigame_common_ad.report(
                                  t.getPosId(),
                                  s.MGBAdAction.ACTION_AP_FETCH_SUCCESS,
                                  s.MGBAdErrCode.ADERR_SUCCESS,
                                  this.getAdType(),
                              ),
                              new s.ResultFetchAd(s.MGBAdErrCode.ADERR_SUCCESS).fillAd(r))
                    );
                }),
                (t.prototype.getAdType = function () {
                    return s.MGBAdDefs.ADTYPE_FB_INTERSTITIAL;
                }),
                (t.prototype.getAdCache = function () {
                    return this.mAdCache;
                }),
                (t.prototype.getCacheSize = function () {
                    return this.mAdCache ? this.mAdCache.getSize() : 0;
                }),
                (t.prototype.isNeedLoadMore = function () {
                    return !1;
                }),
                (t.APNAME = 'fb_interstitial'),
                t
            );
        })();
        s.MGBAdProvider4FBInterstitial = t;
    })((window.MGB = MGB) || (MGB = {})),
    (function (s) {
        var t = (function () {
            function t() {
                (this.TAG = 'MGB_MGBAdProvider4FBRewardVideo'), (this.mAdCache = new s.MGBAdCache());
            }
            return (
                (t.prototype.getAPName = function () {
                    return t.APNAME;
                }),
                (t.prototype.doLoad = function (e, t, o, n) {
                    var r,
                        i = this;
                    return null == t
                        ? (s.Log.e(this.TAG, 'facebook video ad require Placement ID'),
                          s.MGBAdErrCode.ADERR_AP_LOAD_NO_NATIVEPOSID)
                        : null == e
                        ? s.MGBAdErrCode.ADERR_AP_LOAD_NO_POSIDCFG
                        : (s.Log.i(this.TAG, 'facebook video start doLoad, posId = ' + e.getPosId()),
                          FBInstant.getRewardedVideoAsync(t)
                              .then(function (t) {
                                  return (
                                      (r = t),
                                      MGRPT.minigame_common_ad.report(
                                          e.getPosId(),
                                          s.MGBAdAction.ACTION_AP_LOAD_START,
                                          s.MGBAdErrCode.ADERR_SUCCESS,
                                          this.getAdType(),
                                      ),
                                      r.loadAsync()
                                  );
                              })
                              .then(function () {
                                  s.Log.i(i.TAG, 'Preload FB video successfully, posId = ' + e.getPosId()),
                                      MGRPT.minigame_common_ad.report(
                                          e.getPosId(),
                                          s.MGBAdAction.ACTION_AP_LOAD_SUCCESS,
                                          s.MGBAdErrCode.ADERR_SUCCESS,
                                          this.getAdType(),
                                      );
                                  var t = new s.MGBAd4FBRewardVideo(r, e);
                                  i.mAdCache.pushBack(t),
                                      s.Log.i(i.TAG, 'Current facebook video ad cache size: ' + i.mAdCache.getSize()),
                                      n && n.onSuccess();
                              })
                              .catch(function (t) {
                                  s.Log.e(
                                      i.TAG,
                                      'FB video failed to preload, posId = ' +
                                          e.getPosId() +
                                          '; errInfo = ' +
                                          t.code +
                                          ', ' +
                                          t.message,
                                  ),
                                      MGRPT.minigame_common_ad.report(
                                          e.getPosId(),
                                          s.MGBAdAction.ACTION_AP_LOAD_FAILED,
                                          s.MGBAdErrCode.ADERR_SUCCESS,
                                          this.getAdType(),
                                      ),
                                      n && n.onFailed(s.MGBAdErrCode.ADERR_UNKNOWN, t.code, t.message);
                              }),
                          s.MGBAdErrCode.ADERR_LOADING);
                }),
                (t.prototype.doFetch = function (t, e, o, n) {
                    if (null == t) return new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_ARGS_ERROR);
                    if (!e)
                        return (
                            s.Log.e(this.TAG, 'facebook video ad require Placement ID'),
                            new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NO_NATIVEPOSID)
                        );
                    if (
                        (s.Log.i(this.TAG, 'start doFetch, posId = ' + t.getPosId()),
                        MGRPT.minigame_common_ad.report(
                            t.getPosId(),
                            s.MGBAdAction.ACTION_AP_FETCH_START,
                            s.MGBAdErrCode.ADERR_SUCCESS,
                            this.getAdType(),
                        ),
                        null == this.mAdCache || 0 == this.mAdCache.getSize())
                    )
                        return (
                            MGRPT.minigame_common_ad.report(
                                t.getPosId(),
                                s.MGBAdAction.ACTION_AP_FETCH_FAILED,
                                s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE,
                                this.getAdType(),
                            ),
                            new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE)
                        );
                    var r = this.mAdCache.popFront();
                    return (
                        this.isNeedLoadMore() && this.doLoad(t, e, new s.ParamAdLoad(), null),
                        null == r
                            ? (MGRPT.minigame_common_ad.report(
                                  t.getPosId(),
                                  s.MGBAdAction.ACTION_AP_FETCH_FAILED,
                                  s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE,
                                  this.getAdType(),
                              ),
                              new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE))
                            : (s.Log.i(this.TAG, 'doFetch success, posId = ' + t.getPosId()),
                              MGRPT.minigame_common_ad.report(
                                  t.getPosId(),
                                  s.MGBAdAction.ACTION_AP_FETCH_SUCCESS,
                                  s.MGBAdErrCode.ADERR_SUCCESS,
                                  this.getAdType(),
                              ),
                              new s.ResultFetchAd(s.MGBAdErrCode.ADERR_SUCCESS).fillAd(r))
                    );
                }),
                (t.prototype.getAdType = function () {
                    return s.MGBAdDefs.ADTYPE_FB_REWARDVIDEO;
                }),
                (t.prototype.getAdCache = function () {
                    return this.mAdCache;
                }),
                (t.prototype.getCacheSize = function () {
                    return this.mAdCache ? this.mAdCache.getSize() : 0;
                }),
                (t.prototype.isNeedLoadMore = function () {
                    return !1;
                }),
                (t.APNAME = 'fb_video'),
                t
            );
        })();
        s.MGBAdProvider4FBRewardVideo = t;
    })(MGB || (MGB = {})),
    (function (a) {
        var t = (function () {
            function t() {
                (this.TAG = 'MGB_AdProvider4QQBanner'), (this.mAdCache = new a.MGBAdCache());
            }
            return (
                (t.prototype.getAPName = function () {
                    return t.APNAME;
                }),
                (t.prototype.doLoad = function (r, t, e, i) {
                    var s = this;
                    return null == r
                        ? a.MGBAdErrCode.ADERR_AP_LOAD_ARGS_ERROR
                        : (a.Log.i(this.TAG, 'start doLoad, posId = ' + r.getPosId()),
                          null == t && a.Log.i(this.TAG, "QQ banner doesn't require native posid"),
                          null == r
                              ? a.MGBAdErrCode.ADERR_AP_LOAD_NO_POSIDCFG
                              : (MGRPT.minigame_common_ad.report(
                                    r.getPosId(),
                                    a.MGBAdAction.ACTION_AP_LOAD_START,
                                    a.MGBAdErrCode.ADERR_SUCCESS,
                                    this.getAdType(),
                                ),
                                BK.Advertisement.fetchBannerAd(function (t, e, o) {
                                    if ((a.Log.i(s.TAG, 'BK Ad fetchBannerAd callback', t), 0 == t)) {
                                        a.Log.i(s.TAG, 'load QQ banner successfully, posId = ' + r.getPosId()),
                                            MGRPT.minigame_common_ad.report(
                                                r.getPosId(),
                                                a.MGBAdAction.ACTION_AP_LOAD_SUCCESS,
                                                a.MGBAdErrCode.ADERR_SUCCESS,
                                                s.getAdType(),
                                            );
                                        var n = new a.MGBAd4QQBanner(o, r);
                                        s.mAdCache.pushBack(n), i && i.onSuccess();
                                    } else a.Log.e(s.TAG, 'load QQ banner failed, posId = ' + r.getPosId() + '; errInfo = ' + e), MGRPT.minigame_common_ad.report(r.getPosId(), a.MGBAdAction.ACTION_AP_LOAD_FAILED, e, s.getAdType()), i && i.onFailed(t, e, null);
                                }),
                                a.MGBAdErrCode.ADERR_LOADING));
                }),
                (t.prototype.doFetch = function (t, e, o, n) {
                    if (null == t) return new a.ResultFetchAd(a.MGBAdErrCode.ADERR_AP_FETCH_ARGS_ERROR);
                    if (
                        (a.Log.i(this.TAG, 'start doFetch, posId = ' + t.getPosId()),
                        MGRPT.minigame_common_ad.report(
                            t.getPosId(),
                            a.MGBAdAction.ACTION_AP_FETCH_START,
                            a.MGBAdErrCode.ADERR_SUCCESS,
                            this.getAdType(),
                        ),
                        null == this.mAdCache || 0 == this.mAdCache.getSize())
                    )
                        return new a.ResultFetchAd(a.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE);
                    var r = this.mAdCache.popFront();
                    return null == r
                        ? new a.ResultFetchAd(a.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE)
                        : (a.Log.i(this.TAG, 'doFetch success, posId = ' + t.getPosId()),
                          MGRPT.minigame_common_ad.report(
                              t.getPosId(),
                              a.MGBAdAction.ACTION_AP_FETCH_SUCCESS,
                              a.MGBAdErrCode.ADERR_SUCCESS,
                              this.getAdType(),
                          ),
                          new a.ResultFetchAd(a.MGBAdErrCode.ADERR_SUCCESS).fillAd(r));
                }),
                (t.prototype.getAdType = function () {
                    return a.MGBAdDefs.ADTYPE_QQ_BANNER;
                }),
                (t.prototype.getAdCache = function () {
                    return this.mAdCache;
                }),
                (t.prototype.getCacheSize = function () {
                    return this.mAdCache ? this.mAdCache.getSize() : 0;
                }),
                (t.prototype.isNeedLoadMore = function () {
                    return !1;
                }),
                (t.APNAME = 'qq_banner'),
                t
            );
        })();
        a.MGBAdProvider4QQBanner = t;
    })(MGB || (MGB = {})),
    (function (s) {
        var t = (function () {
            function t() {
                (this.TAG = 'MGB_AdProvider4QQVideo'), (this.mAdCache = new s.MGBAdCache());
            }
            return (
                (t.prototype.getAPName = function () {
                    return t.APNAME;
                }),
                (t.prototype.doLoad = function (r, t, e, i) {
                    if (null == r) return s.MGBAdErrCode.ADERR_AP_LOAD_ARGS_ERROR;
                    if ((null == t && s.Log.i(this.TAG, "QQ video doesn't require native posid"), null == r))
                        return s.MGBAdErrCode.ADERR_AP_LOAD_NO_POSIDCFG;
                    var o = r.getNum(s.MGBAdPosIdCfg.KEY_AP4QQVIDEO_TYPE, -1);
                    return -1 == o
                        ? (s.Log.e(this.TAG, 'MGBAdProvider4QQRewardVideo video type is -1, posId = ' + r.getPosId()),
                          s.MGBAdErrCode.ADERR_AP_LOAD_ARGS_ERROR)
                        : (s.Log.i(this.TAG, 'MGBAdProvider4QQRewardVideo start doLoad, posId = ' + r.getPosId()),
                          MGRPT.minigame_common_ad.report(
                              r.getPosId(),
                              s.MGBAdAction.ACTION_AP_LOAD_START,
                              s.MGBAdErrCode.ADERR_SUCCESS,
                              this.getAdType(),
                          ),
                          BK.Advertisement.fetchVideoAd(
                              o,
                              function (t, e, o) {
                                  if ((s.Log.i(this.TAG, 'BK Ad fetchVideoAd callback', t), 0 == t)) {
                                      s.Log.i(this.TAG, 'load QQ video successfully, posId = ' + r.getPosId()),
                                          MGRPT.minigame_common_ad.report(
                                              r.getPosId(),
                                              s.MGBAdAction.ACTION_AP_LOAD_SUCCESS,
                                              s.MGBAdErrCode.ADERR_SUCCESS,
                                              this.getAdType(),
                                          );
                                      var n = new s.MGBAd4QQRewardVideo(o, r);
                                      this.mAdCache.pushBack(n), i && i.onSuccess();
                                  } else
                                      s.Log.e(
                                          this.TAG,
                                          'load QQ video failed, posId = ' + r.getPosId() + '; errInfo = ' + e,
                                      ),
                                          MGRPT.minigame_common_ad.report(
                                              r.getPosId(),
                                              s.MGBAdAction.ACTION_AP_LOAD_FAILED,
                                              s.MGBAdErrCode.ADERR_SUCCESS,
                                              this.getAdType(),
                                          ),
                                          i && i.onFailed(t, e, null);
                              }.bind(this),
                          ),
                          s.MGBAdErrCode.ADERR_LOADING);
                }),
                (t.prototype.doFetch = function (t, e, o, n) {
                    if (null == t || -1 == t.getNum(s.MGBAdPosIdCfg.KEY_AP4QQVIDEO_TYPE, -1))
                        return new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_ARGS_ERROR);
                    if (
                        (s.Log.i(this.TAG, 'start doFetch, posId = ' + t.getPosId()),
                        MGRPT.minigame_common_ad.report(
                            t.getPosId(),
                            s.MGBAdAction.ACTION_AP_FETCH_START,
                            s.MGBAdErrCode.ADERR_SUCCESS,
                            this.getAdType(),
                        ),
                        null == this.mAdCache || 0 == this.mAdCache.getSize())
                    )
                        return (
                            MGRPT.minigame_common_ad.report(
                                t.getPosId(),
                                s.MGBAdAction.ACTION_AP_FETCH_FAILED,
                                s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE,
                                this.getAdType(),
                            ),
                            new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE)
                        );
                    var r = this.mAdCache.popFront();
                    return (
                        this.isNeedLoadMore() && this.doLoad(t, e, new s.ParamAdLoad(), null),
                        null == r
                            ? (MGRPT.minigame_common_ad.report(
                                  t.getPosId(),
                                  s.MGBAdAction.ACTION_AP_FETCH_FAILED,
                                  s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE,
                                  this.getAdType(),
                              ),
                              new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE))
                            : (s.Log.i(this.TAG, 'doFetch success, posId = ' + t.getPosId()),
                              MGRPT.minigame_common_ad.report(
                                  t.getPosId(),
                                  s.MGBAdAction.ACTION_AP_FETCH_SUCCESS,
                                  s.MGBAdErrCode.ADERR_SUCCESS,
                                  this.getAdType(),
                              ),
                              new s.ResultFetchAd(s.MGBAdErrCode.ADERR_SUCCESS).fillAd(r))
                    );
                }),
                (t.prototype.getAdType = function () {
                    return s.MGBAdDefs.ADTYPE_QQ_REWARDVIDEO;
                }),
                (t.prototype.getAdCache = function () {
                    return this.mAdCache;
                }),
                (t.prototype.getCacheSize = function () {
                    return this.mAdCache ? this.mAdCache.getSize() : 0;
                }),
                (t.prototype.isNeedLoadMore = function () {
                    return this.getCacheSize() < 1;
                }),
                (t.APNAME = 'qq_video'),
                t
            );
        })();
        s.MGBAdProvider4QQRewardVideo = t;
    })(MGB || (MGB = {})),
    (function (A) {
        var t = (function () {
            function t() {
                (this.TAG = 'MGB_AdProvider4WXBanner'),
                    (this.mAdCache = new A.MGBAdCache()),
                    A.WXBannerAdMonitor.getInstance().init();
            }
            return (
                (t.prototype.getAPName = function () {
                    return t.APNAME;
                }),
                (t.prototype.doLoad = function (e, t, o, n) {
                    var r = this;
                    if (null == e) return A.MGBAdErrCode.ADERR_AP_LOAD_NO_POSIDCFG;
                    if (
                        (A.Log.i(this.TAG, 'start doLoad, posId = ' + e.getPosId()),
                        MGRPT.minigame_common_ad.report(
                            e.getPosId(),
                            A.MGBAdAction.ACTION_AP_LOAD_START,
                            A.MGBAdErrCode.ADERR_SUCCESS,
                            this.getAdType(),
                        ),
                        null == t)
                    )
                        return (
                            A.Log.e(this.TAG, 'nativePosId is null, posId = ' + e.getPosId()),
                            A.MGBAdErrCode.ADERR_AP_LOAD_NO_NATIVEPOSID
                        );
                    if (!wx.createBannerAd) return A.MGBAdErrCode.ADERR_AP4WXBANNER_LOAD_NO_API;
                    var i = e.getNum(A.MGBAdPosIdCfg.KEY_AP4WXBANNER_LOAD_WIDTH, 300),
                        s = wx.createBannerAd({
                            adUnitId: t,
                            style: {
                                left: 0,
                                width: i,
                                height: 0,
                                top: 0,
                            },
                        });
                    if (null == s) return A.MGBAdErrCode.ADERR_AP4WXBANNER_LOAD_NO_ADHANDLER;
                    var a = this.getWXBAdPosAdapter(e),
                        d = new A.MGBAd4WXBanner(e, s);
                    return (
                        s.onResize(function (t) {
                            A.Log.i(r.TAG, 'enter wxadHandler.onResize, posId = ' + e.getPosId()),
                                null != t
                                    ? null != a
                                        ? a.onReSize(t.width, t.height, d)
                                        : A.Log.e(
                                              r.TAG,
                                              'wxadHandler.onResize  posAdapter != null, posId = ' + e.getPosId(),
                                          )
                                    : A.Log.e(r.TAG, 'wxadHandler.onResize  res == null, posId = ' + e.getPosId());
                        }),
                        s.onLoad(function () {
                            r.mAdCache.pushBack(d),
                                A.Log.i(
                                    r.TAG,
                                    'after wxadHandler.onLoad, cache size:' +
                                        r.mAdCache.getSize() +
                                        '; posId = ' +
                                        e.getPosId(),
                                ),
                                MGRPT.minigame_common_ad.report(
                                    e.getPosId(),
                                    A.MGBAdAction.ACTION_AP_LOAD_SUCCESS,
                                    A.MGBAdErrCode.ADERR_SUCCESS,
                                    r.getAdType(),
                                ),
                                null != n && n.onSuccess();
                        }),
                        s.onError(function (t) {
                            null != n &&
                                (A.Log.e(
                                    r.TAG,
                                    'after wxadHandler.onError err' + JSON.stringify(t) + ', posId = ' + e.getPosId(),
                                ),
                                MGRPT.minigame_common_ad.report(
                                    e.getPosId(),
                                    A.MGBAdAction.ACTION_AP_LOAD_FAILED,
                                    JSON.stringify(t),
                                    r.getAdType(),
                                ),
                                n.onFailed(A.MGBAdErrCode.ADERR_AP_LOAD_WXBH_ONERROR, t, null));
                        }),
                        A.MGBAdErrCode.ADERR_SUCCESS
                    );
                }),
                (t.prototype.doFetch = function (t, e, o, n) {
                    if (null == t) return new A.ResultFetchAd(A.MGBAdErrCode.ADERR_AP_FETCH_ARGS_ERROR);
                    if (null == e)
                        return (
                            A.Log.e(this.TAG, 'nativePosId is null, posId = ' + t.getPosId()),
                            new A.ResultFetchAd(A.MGBAdErrCode.ADERR_AP_FETCH_NO_NATIVEPOSID)
                        );
                    if (
                        (A.Log.i(this.TAG, 'start doFetch, posId = ' + t.getPosId()),
                        MGRPT.minigame_common_ad.report(
                            t.getPosId(),
                            A.MGBAdAction.ACTION_AP_FETCH_START,
                            A.MGBAdErrCode.ADERR_SUCCESS,
                            this.getAdType(),
                        ),
                        null == this.mAdCache || 0 == this.mAdCache.getSize())
                    )
                        return new A.ResultFetchAd(A.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE);
                    var r = this.mAdCache.popFront();
                    return null == r
                        ? new A.ResultFetchAd(A.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE)
                        : (A.Log.i(this.TAG, 'doFetch success, posId = ' + t.getPosId()),
                          MGRPT.minigame_common_ad.report(
                              t.getPosId(),
                              A.MGBAdAction.ACTION_AP_FETCH_SUCCESS,
                              A.MGBAdErrCode.ADERR_SUCCESS,
                              this.getAdType(),
                          ),
                          new A.ResultFetchAd(A.MGBAdErrCode.ADERR_SUCCESS).fillAd(r));
                }),
                (t.prototype.getWXBAdPosAdapter = function (t) {
                    return null == t ? null : t.getObject(A.MGBAdPosIdCfg.KEY_AP4WXBANNER_POS_ADAPTER, null);
                }),
                (t.prototype.getAdCache = function () {
                    return this.mAdCache;
                }),
                (t.prototype.getCacheSize = function () {
                    return null == this.mAdCache ? 0 : this.mAdCache.getSize();
                }),
                (t.prototype.getAdType = function () {
                    return A.MGBAdDefs.ADTYPE_WX_BANNER;
                }),
                (t.prototype.isNeedLoadMore = function () {
                    return !1;
                }),
                (t.APNAME = 'wx_banner'),
                t
            );
        })();
        A.MGBAdProvider4WXBanner = t;
    })(MGB || (MGB = {})),
    (function (s) {
        var t = (function () {
            function t() {
                this.TAG = 'MGB_AdProvider4WXRewardVideo';
            }
            return (
                (t.prototype.getAPName = function () {
                    return t.APNAME;
                }),
                (t.prototype.getAdType = function () {
                    return s.MGBAdDefs.ADTYPE_WX_REWARDVIDEO;
                }),
                (t.prototype.doLoad = function (n, t, e, r) {
                    var i = this;
                    return n
                        ? t
                            ? (MGRPT.minigame_common_ad.report(
                                  n.getPosId(),
                                  s.MGBAdAction.ACTION_AP_LOAD_START,
                                  s.MGBAdErrCode.ADERR_SUCCESS,
                                  this.getAdType(),
                              ),
                              s.WXRewardVideoProxy.getInstance().load(n, t, {
                                  onSuccess: function () {
                                      MGRPT.minigame_common_ad.report(
                                          n.getPosId(),
                                          s.MGBAdAction.ACTION_AP_LOAD_SUCCESS,
                                          s.MGBAdErrCode.ADERR_SUCCESS,
                                          i.getAdType(),
                                      ),
                                          r && r.onSuccess();
                                  },
                                  onFailed: function (t, e, o) {
                                      MGRPT.minigame_common_ad.report(
                                          n.getPosId(),
                                          s.MGBAdAction.ACTION_AP_LOAD_FAILED,
                                          t,
                                          i.getAdType(),
                                      ),
                                          r && r.onFailed(t, e, o);
                                  },
                              }),
                              s.MGBAdErrCode.ADERR_SUCCESS)
                            : (s.Log.e(this.TAG, 'nativePosId is null, posId = ' + n.getPosId()),
                              s.MGBAdErrCode.ADERR_AP_LOAD_NO_NATIVEPOSID)
                        : s.MGBAdErrCode.ADERR_AP_LOAD_NO_POSIDCFG;
                }),
                (t.prototype.doFetch = function (t, e, o, n) {
                    if (!t) return new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NO_POSIDCFG);
                    if (!e)
                        return (
                            s.Log.e(this.TAG, 'nativePosId is null, posId = ' + t.getPosId()),
                            new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NO_NATIVEPOSID)
                        );
                    MGRPT.minigame_common_ad.report(
                        t.getPosId(),
                        s.MGBAdAction.ACTION_AP_FETCH_START,
                        s.MGBAdErrCode.ADERR_SUCCESS,
                        this.getAdType(),
                    );
                    var r = s.WXRewardVideoProxy.getInstance().fetch(t, e);
                    if (!r)
                        return (
                            MGRPT.minigame_common_ad.report(
                                t.getPosId(),
                                s.MGBAdAction.ACTION_AP_FETCH_FAILED,
                                s.MGBAdErrCode.ADERR_AP4WXVIDEO_FETCH_NO_ADHANDLER,
                                this.getAdType(),
                            ),
                            new s.ResultFetchAd(s.MGBAdErrCode.ADERR_AP_FETCH_NOAD_INCACHE)
                        );
                    var i = new s.MGBAd4WXRewardVideo(t, r);
                    return (
                        MGRPT.minigame_common_ad.report(
                            t.getPosId(),
                            s.MGBAdAction.ACTION_AP_FETCH_SUCCESS,
                            s.MGBAdErrCode.ADERR_SUCCESS,
                            this.getAdType(),
                        ),
                        new s.ResultFetchAd(s.MGBAdErrCode.ADERR_SUCCESS).fillAd(i)
                    );
                }),
                (t.prototype.getAdCache = function () {
                    return null;
                }),
                (t.prototype.getCacheSize = function () {
                    return s.WXRewardVideoProxy.getInstance().hasCache() ? 1 : 0;
                }),
                (t.prototype.isNeedLoadMore = function () {
                    return !1;
                }),
                (t.APNAME = 'wx_video'),
                t
            );
        })();
        s.MGBAdProvider4WXRewardVideo = t;
    })(MGB || (MGB = {})),
    (function (t) {
        var e = (function () {
            function t() {}
            return (
                (t.prototype.onReSize = function (t, e, o) {
                    if (null != o) {
                        var n = wx.getSystemInfoSync();
                        if (null != n) {
                            var r = n.screenHeight - e,
                                i = (n.screenWidth - t) / 2,
                                s = t;
                            parseInt(((100 * e) / t).toString()) > parseInt((16e3 / 560).toString()) && (s = 300),
                                o.setAdPos(i, r, s);
                        }
                    }
                }),
                t
            );
        })();
        t.DefaultWXBAdPosAdapter = e;
    })(MGB || (MGB = {})),
    (function (o) {
        var t = (function () {
            function e() {
                (this.bInit = !1), (this.mClickCallback = null), (this.mPosIdCur = ''), this._init();
            }
            return (
                (e.getInstance = function () {
                    return e.sInst ? e.sInst : (e.sInst = new e());
                }),
                (e.prototype.init = function () {
                    this._init();
                }),
                (e.prototype._init = function () {
                    this.bInit || (wx.onShow(this.onShow.bind(this)), (this.bInit = !0));
                }),
                (e.prototype.onShow = function (t) {
                    this.mClickCallback && this.mClickCallback.onShowFinish(null, null, null);
                }),
                (e.prototype.regClickCallback = function (t, e) {
                    t && e && ((this.mPosIdCur = t), (this.mClickCallback = e));
                }),
                (e.prototype.unregClickCallback = function (t) {
                    t &&
                        (this.mPosIdCur == t
                            ? ((this.mClickCallback = null), (this.mPosIdCur = ''))
                            : o.Log.e(
                                  e.TAG,
                                  '[unregClickCallback] ERROR mPosIdCur:' + this.mPosIdCur + ', posId:' + t,
                              ));
                }),
                (e.TAG = 'MGB_WXBannerAdMonitor'),
                (e.sInst = null),
                e
            );
        })();
        o.WXBannerAdMonitor = t;
    })(MGB || (MGB = {})),
    (function (r) {
        var t = (function () {
            function n() {
                (this.mWXAdHandler = null), (this.mCacheStatus = 0), (this.mCacheStatus = n.STATUS_CACHE_NONE);
            }
            return (
                (n.getInstance = function () {
                    return n.sInst ? n.sInst : (n.sInst = new n());
                }),
                (n.prototype._init = function (t) {
                    this.mWXAdHandler ||
                        (wx.createRewardedVideoAd &&
                            ((this.mWXAdHandler = wx.createRewardedVideoAd({
                                adUnitId: t,
                            })),
                            this.mWXAdHandler &&
                                (this.mWXAdHandler.onLoad(this.onAdLoad.bind(this)),
                                this.mWXAdHandler.onError(this.onAdError.bind(this)))));
                }),
                (n.prototype.load = function (e, t, o) {
                    this._init(t),
                        this.mWXAdHandler
                            ? this.mWXAdHandler
                                  .load()
                                  .then(function () {
                                      o && o.onSuccess();
                                  })
                                  .catch(function (t) {
                                      r.Log.e(
                                          n.TAG,
                                          'mWXAdHandler.load().catch(), posId = ' +
                                              e.getPosId() +
                                              ', ' +
                                              JSON.stringify(t),
                                      ),
                                          o &&
                                              o.onFailed(
                                                  r.MGBAdErrCode.ADERR_AP_LOAD_WXBH_ONERROR,
                                                  JSON.stringify(t),
                                                  null,
                                              );
                                  })
                            : o && o.onFailed(r.MGBAdErrCode.ADERR_AP4WXVIDEO_LOAD_NO_ADHANDLER, 0, 0);
                }),
                (n.prototype.fetch = function (t, e) {
                    return (
                        r.Log.i('MGB_ROM', 'WXRewardVideoProxy.fetch enter. this.mCacheStatus:' + this.mCacheStatus),
                        this.hasCache() ? ((this.mCacheStatus = n.STATUS_CACHE_NONE), this.mWXAdHandler) : null
                    );
                }),
                (n.prototype.hasCache = function () {
                    return this.mCacheStatus == n.STATUS_CACHE_ENOUGH;
                }),
                (n.prototype.onAdLoad = function () {
                    (this.mCacheStatus = n.STATUS_CACHE_ENOUGH),
                        r.Log.i(n.TAG, 'WX reward video load success. mCacheStatus:' + this.mCacheStatus);
                }),
                (n.prototype.onAdError = function (t) {
                    MGRPT.minigame_common_ad.report(
                        '',
                        r.MGBAdAction.ACTION_WXRV_ONADERROR,
                        JSON.stringify(t),
                        r.MGBAdDefs.ADTYPE_WX_REWARDVIDEO,
                    ),
                        r.Log.i(n.TAG, 'WX reward video error:' + t);
                }),
                (n.TAG = 'MGB_WXRewardVideoProxy'),
                (n.sInst = null),
                (n.STATUS_CACHE_NONE = 1),
                (n.STATUS_CACHE_ENOUGH = 2),
                n
            );
        })();
        r.WXRewardVideoProxy = t;
    })(MGB || (MGB = {})),
    (function (n) {
        var t = (function () {
            function t(t, e) {
                (this.TAG = 'MGB_MGBAd4FBInterstitial'),
                    (this.mPosIdCfg = null),
                    (this.mInterstitialAdInstance = null),
                    (this.mPosIdCfg = e),
                    (this.mInterstitialAdInstance = t);
            }
            return (
                (t.prototype.getAPName = function () {
                    return n.MGBAdProvider4FBInterstitial.APNAME;
                }),
                (t.prototype.isCurValid = function () {
                    return null !== this.mInterstitialAdInstance && void 0 !== typeof this.mInterstitialAdInstance;
                }),
                (t.prototype.show = function (e) {
                    if (this.mInterstitialAdInstance) {
                        this.doRptAdShow();
                        var o = this;
                        this.mInterstitialAdInstance
                            .showAsync()
                            .then(function () {
                                e && e.onShowSuccess(o, null, null),
                                    n.Log.i(o.TAG, 'FB interstitial ad show successfully'),
                                    o.mPosIdCfg &&
                                        MGRPT.minigame_common_ad.report(
                                            o.mPosIdCfg.getPosId(),
                                            n.MGBAdAction.ACTION_WXRV_CLOSE_CLICK_END,
                                            n.MGBAdErrCode.ADERR_SUCCESS,
                                            n.MGBAdDefs.ADTYPE_FB_INTERSTITIAL,
                                        ),
                                    e && e.onShowFinish(o, null, null);
                            })
                            .catch(function (t) {
                                n.Log.e(o.TAG, 'FB interstitial ad show failed, errInfo:' + t.code + ', ' + t.message),
                                    o.mPosIdCfg &&
                                        MGRPT.minigame_common_ad.report(
                                            o.mPosIdCfg.getPosId(),
                                            n.MGBAdAction.ACTION_SHOW_FAILED,
                                            JSON.stringify(t),
                                            n.MGBAdDefs.ADTYPE_FB_INTERSTITIAL,
                                        ),
                                    e && e.onShowFail(o, t.code, t.message);
                            });
                    } else
                        n.Log.w(this.TAG, 'FB interstitial ad show failed since adInstance not initialized'),
                            e && e.onShowFail(this, null, null);
                }),
                (t.prototype.doRptAdShow = function () {
                    this.mPosIdCfg &&
                        MGRPT.minigame_common_ad.report(
                            this.mPosIdCfg.getPosId(),
                            n.MGBAdAction.ACTION_SHOW_SUCCESS,
                            n.MGBAdErrCode.ADERR_LOADING,
                            n.MGBAdDefs.ADTYPE_FB_INTERSTITIAL,
                        );
                }),
                (t.prototype.doRptClick = function () {}),
                (t.prototype.doHandleShow = function () {}),
                (t.prototype.doHandleClick = function () {}),
                (t.prototype.destroy = function () {
                    this.mInterstitialAdInstance = void 0;
                }),
                t
            );
        })();
        n.MGBAd4FBInterstitial = t;
    })(MGB || (MGB = {})),
    (function (n) {
        var t = (function () {
            function t(t, e) {
                (this.TAG = 'MGB_MGBAd4FBRewardVideo'),
                    (this.mPosIdCfg = null),
                    (this.mVideoAdInstance = null),
                    (this.mPosIdCfg = e),
                    (this.mVideoAdInstance = t);
            }
            return (
                (t.prototype.getAPName = function () {
                    return n.MGBAdProvider4FBRewardVideo.APNAME;
                }),
                (t.prototype.isCurValid = function () {
                    return null !== this.mVideoAdInstance && void 0 !== typeof this.mVideoAdInstance;
                }),
                (t.prototype.show = function (e) {
                    if (this.mVideoAdInstance) {
                        this.doRptAdShow();
                        var o = this;
                        this.mVideoAdInstance
                            .showAsync()
                            .then(function () {
                                n.Log.i(o.TAG, 'FB Rewarded video watched successfully'),
                                    o.mPosIdCfg &&
                                        MGRPT.minigame_common_ad.report(
                                            o.mPosIdCfg.getPosId(),
                                            n.MGBAdAction.ACTION_WXRV_CLOSE_CLICK_END,
                                            n.MGBAdErrCode.ADERR_SUCCESS,
                                            n.MGBAdDefs.ADTYPE_FB_REWARDVIDEO,
                                        ),
                                    e && e.onShowFinish(o, null, null);
                            })
                            .catch(function (t) {
                                n.Log.e(o.TAG, 'FB Rewarded video show failed, errInfo:' + t.code + ', ' + t.message),
                                    o.mPosIdCfg &&
                                        MGRPT.minigame_common_ad.report(
                                            o.mPosIdCfg.getPosId(),
                                            n.MGBAdAction.ACTION_SHOW_FAILED,
                                            JSON.stringify(t),
                                            n.MGBAdDefs.ADTYPE_FB_REWARDVIDEO,
                                        ),
                                    e && e.onShowFail(o, t.code, t.message);
                            });
                    } else
                        n.Log.w(this.TAG, 'FB Rewarded video show failed since adInstance not initialized'),
                            e && e.onShowFail(this, null, null);
                }),
                (t.prototype.doRptAdShow = function () {
                    this.mPosIdCfg &&
                        MGRPT.minigame_common_ad.report(
                            this.mPosIdCfg.getPosId(),
                            n.MGBAdAction.ACTION_SHOW_SUCCESS,
                            n.MGBAdErrCode.ADERR_LOADING,
                            n.MGBAdDefs.ADTYPE_FB_REWARDVIDEO,
                        );
                }),
                (t.prototype.doRptClick = function () {}),
                (t.prototype.doHandleShow = function () {}),
                (t.prototype.doHandleClick = function () {}),
                (t.prototype.destroy = function () {
                    this.mVideoAdInstance = void 0;
                }),
                t
            );
        })();
        n.MGBAd4FBRewardVideo = t;
    })(MGB || (MGB = {})),
    (function (i) {
        var t = (function () {
            function t(t, e) {
                (this.TAG = 'MGB_Ad4QQBanner'),
                    (this.mBannerHandler = void 0),
                    (this.mPosIdCfg = null),
                    (this.mLeft = 0),
                    (this.mTop = 0),
                    (this.mWidth = 0),
                    (this.mHeight = 0),
                    (this.mBannerHandler = t),
                    (this.mPosIdCfg = e);
            }
            return (
                (t.prototype.getAPName = function () {
                    return i.MGBAdProvider4QQBanner.APNAME;
                }),
                (t.prototype.isCurValid = function () {
                    return void 0 !== typeof this.mBannerHandler;
                }),
                (t.prototype.show = function (n) {
                    var r = this;
                    i.Log.i(this.TAG, 'ready to show QQ banner ad, posId = ' + this.mPosIdCfg.getPosId()),
                        this.mBannerHandler &&
                            this.mBannerHandler.show(function (t, e, o) {
                                if (0 == t) {
                                    if (
                                        (i.Log.i(r.TAG, ' QQ banner show success, posId = ' + r.mPosIdCfg.getPosId()),
                                        i.MGBAdModule.getInstance().hasSceneExitFlag(r.mPosIdCfg.getPosId()))
                                    )
                                        return (
                                            i.Log.i(
                                                r.TAG,
                                                ' QQ banner need destroy now, because has exit flag, posId = ' +
                                                    r.mPosIdCfg.getPosId(),
                                            ),
                                            MGRPT.minigame_common_ad.report(
                                                r.mPosIdCfg.getPosId(),
                                                i.MGBAdAction.ACTION_SHOW_FAILED,
                                                i.MGBAdErrCode.ADERR_ADM_EXIT_SCENE,
                                                i.MGBAdDefs.ADTYPE_QQ_BANNER,
                                            ),
                                            void r.destroy()
                                        );
                                    r.doRptAdShow(), n && n.onShowSuccess(r, t, e);
                                } else r.mPosIdCfg && MGRPT.minigame_common_ad.report(r.mPosIdCfg.getPosId(), i.MGBAdAction.ACTION_SHOW_FAILED, i.MGBAdErrCode.ADERR_ADM_EXIT_SCENE, i.MGBAdDefs.ADTYPE_QQ_BANNER), i.Log.e(r.TAG, 'QQ banner show failed, posId = ' + r.mPosIdCfg.getPosId() + '; errInfo = ' + e), n && n.onShowFail(r, t, e);
                            });
                }),
                (t.prototype.doRptAdShow = function () {
                    this.mPosIdCfg &&
                        MGRPT.minigame_common_ad.report(
                            this.mPosIdCfg.getPosId(),
                            i.MGBAdAction.ACTION_SHOW_SUCCESS,
                            i.MGBAdErrCode.ADERR_SUCCESS,
                            i.MGBAdDefs.ADTYPE_QQ_BANNER,
                        );
                }),
                (t.prototype.doRptClick = function () {}),
                (t.prototype.doHandleShow = function () {}),
                (t.prototype.doHandleClick = function () {}),
                (t.prototype.destroy = function () {
                    this.mBannerHandler && this.mBannerHandler.close();
                }),
                t
            );
        })();
        i.MGBAd4QQBanner = t;
    })(MGB || (MGB = {})),
    (function (r) {
        var t = (function () {
            function t(t, e) {
                (this.TAG = 'MGBAd4QQRewardVideo'),
                    (this.mPosIdCfg = null),
                    (this.mVideoAdHandler = void 0),
                    (this.mVideoAdHandler = t),
                    (this.mPosIdCfg = e);
            }
            return (
                (t.prototype.getAPName = function () {
                    return r.MGBAdProvider4QQRewardVideo.APNAME;
                }),
                (t.prototype.isCurValid = function () {
                    return null !== this.mVideoAdHandler && void 0 !== typeof this.mVideoAdHandler;
                }),
                (t.prototype.show = function (o) {
                    if (this.mVideoAdHandler) {
                        var n = !1;
                        this.mVideoAdHandler.setEventCallack(
                            function (t, e) {
                                this.mVideoAdHandler = void 0;
                            }.bind(this),
                            function (t, e) {
                                n = !0;
                            }.bind(this),
                            function (t, e) {
                                (this.mVideoAdHandler = void 0),
                                    n
                                        ? (this.mPosIdCfg &&
                                              MGRPT.minigame_common_ad.report(
                                                  this.mPosIdCfg.getPosId(),
                                                  r.MGBAdAction.ACTION_WXRV_CLOSE_CLICK_END,
                                                  r.MGBAdErrCode.ADERR_SUCCESS,
                                                  r.MGBAdDefs.ADTYPE_QQ_REWARDVIDEO,
                                              ),
                                          o && o.onShowFinish(this, t, e))
                                        : (this.mPosIdCfg &&
                                              MGRPT.minigame_common_ad.report(
                                                  this.mPosIdCfg.getPosId(),
                                                  r.MGBAdAction.ACTION_WXRV_CLOSE_CLICK_NOT_END,
                                                  r.MGBAdErrCode.ADERR_SUCCESS,
                                                  r.MGBAdDefs.ADTYPE_QQ_REWARDVIDEO,
                                              ),
                                          o && o.onShowUnFinish(this, t, e));
                            }.bind(this),
                            function (t, e) {
                                this.doRptAdShow(), o && o.onShowSuccess(this, t, e);
                            }.bind(this),
                        ),
                            this.mVideoAdHandler.jump();
                    } else
                        this.mPosIdCfg &&
                            MGRPT.minigame_common_ad.report(
                                this.mPosIdCfg.getPosId(),
                                r.MGBAdAction.ACTION_SHOW_FAILED,
                                r.MGBAdErrCode.ADERR_ADM_EXIT_SCENE,
                                r.MGBAdDefs.ADTYPE_QQ_REWARDVIDEO,
                            ),
                            o && o.onShowFail(this, null, null);
                }),
                (t.prototype.doRptAdShow = function () {
                    this.mPosIdCfg &&
                        MGRPT.minigame_common_ad.report(
                            this.mPosIdCfg.getPosId(),
                            r.MGBAdAction.ACTION_SHOW_SUCCESS,
                            r.MGBAdErrCode.ADERR_SUCCESS,
                            r.MGBAdDefs.ADTYPE_QQ_REWARDVIDEO,
                        );
                }),
                (t.prototype.doRptClick = function () {}),
                (t.prototype.doHandleShow = function () {}),
                (t.prototype.doHandleClick = function () {}),
                (t.prototype.destroy = function () {
                    this.mVideoAdHandler && (this.mVideoAdHandler = void 0);
                }),
                t
            );
        })();
        r.MGBAd4QQRewardVideo = t;
    })(MGB || (MGB = {})),
    (function (n) {
        var t = (function () {
            function t(t, e) {
                (this.TAG = 'MGB_Ad4WXBanner'),
                    (this.mWXAdHandler = null),
                    (this.mPosAdapter = null),
                    (this.mLeft = 0),
                    (this.mTop = 0),
                    (this.mWidth = 0),
                    (this.mHeight = 0),
                    (this.mPosIdCfg = null),
                    (this.mWXAdHandler = e),
                    (this.mPosIdCfg = t);
            }
            return (
                (t.prototype.getAPName = function () {
                    return n.MGBAdProvider4WXBanner.APNAME;
                }),
                (t.prototype.isCurValid = function () {
                    return !0;
                }),
                (t.prototype.getTop = function () {
                    return this.mTop;
                }),
                (t.prototype.getLeft = function () {
                    return this.mLeft;
                }),
                (t.prototype.getWidth = function () {
                    return this.mWidth;
                }),
                (t.prototype.getHeight = function () {
                    return this.mHeight;
                }),
                (t.prototype.doRptAdShow = function () {
                    this.mPosIdCfg &&
                        MGRPT.minigame_common_ad.report(
                            this.mPosIdCfg.getPosId(),
                            n.MGBAdAction.ACTION_SHOW_SUCCESS,
                            n.MGBAdErrCode.ADERR_SUCCESS,
                            n.MGBAdDefs.ADTYPE_WX_BANNER,
                        );
                }),
                (t.prototype.doRptClick = function () {}),
                (t.prototype.doHandleShow = function () {}),
                (t.prototype.doHandleClick = function () {}),
                (t.prototype.destroy = function () {
                    this.unRegClickCallback(),
                        null != this.mWXAdHandler && (this.mWXAdHandler.hide(), this.mWXAdHandler.destroy());
                }),
                (t.prototype.setAdPos = function (t, e, o) {
                    null != this.mWXAdHandler &&
                        ((this.mWXAdHandler.style.top = e),
                        (this.mWXAdHandler.style.left = t),
                        (this.mWXAdHandler.style.width = o),
                        (this.mTop = e),
                        (this.mLeft = t),
                        (this.mWidth = o));
                }),
                (t.prototype.show = function (e) {
                    var o = this;
                    if (this.mPosIdCfg && this.mPosIdCfg.getPosId()) {
                        if (n.MGBAdModule.getInstance().hasSceneExitFlag(this.mPosIdCfg.getPosId()))
                            return void MGRPT.minigame_common_ad.report(
                                this.mPosIdCfg.getPosId(),
                                n.MGBAdAction.ACTION_SHOW_FAILED,
                                n.MGBAdErrCode.ADERR_ADM_EXIT_SCENE,
                                n.MGBAdDefs.ADTYPE_WX_BANNER,
                            );
                        n.WXBannerAdMonitor.getInstance().regClickCallback(this.mPosIdCfg.getPosId(), e);
                    }
                    n.Log.i(this.TAG, 'ready to show WX banner ad, posId = ' + this.mPosIdCfg.getPosId()),
                        this.mWXAdHandler &&
                            this.mWXAdHandler
                                .show()
                                .then(function () {
                                    o.doRptAdShow(),
                                        e &&
                                            e.onShowSuccess(
                                                o,
                                                o.mWXAdHandler.style.realWidth,
                                                o.mWXAdHandler.style.realHeight,
                                            ),
                                        n.Log.i(o.TAG, ' WX banner show success, posId = ' + o.mPosIdCfg.getPosId());
                                })
                                .catch(function (t) {
                                    o.mPosIdCfg &&
                                        MGRPT.minigame_common_ad.report(
                                            o.mPosIdCfg.getPosId(),
                                            n.MGBAdAction.ACTION_SHOW_FAILED,
                                            JSON.stringify(t),
                                            n.MGBAdDefs.ADTYPE_WX_BANNER,
                                        ),
                                        e && e.onShowFail(o, null, null),
                                        n.Log.e(
                                            o.TAG,
                                            'WX banner show failed, posId = ' +
                                                o.mPosIdCfg.getPosId() +
                                                '; errInfo = ' +
                                                t,
                                        );
                                });
                }),
                (t.prototype.hide = function () {
                    this.unRegClickCallback(), this.mWXAdHandler && this.mWXAdHandler.hide();
                }),
                (t.prototype.unRegClickCallback = function () {
                    this.mPosIdCfg &&
                        this.mPosIdCfg.getPosId() &&
                        n.WXBannerAdMonitor.getInstance().unregClickCallback(this.mPosIdCfg.getPosId());
                }),
                t
            );
        })();
        n.MGBAd4WXBanner = t;
    })(MGB || (MGB = {})),
    (function (o) {
        var t = (function () {
            function t(t, e) {
                (this.TAG = 'MGB_Ad4WXRewardVideo'),
                    (this.mWXAdHandler = null),
                    (this.mAdShowCallback = null),
                    (this.mPosIdCfg = null),
                    (this.mCloseCallback = null),
                    (this.mWXAdHandler = e),
                    (this.mPosIdCfg = t),
                    this.init();
            }
            return (
                (t.prototype.init = function () {
                    this.mWXAdHandler &&
                        ((this.mCloseCallback = this.onAdClose.bind(this)),
                        this.mWXAdHandler.onClose(this.mCloseCallback));
                }),
                (t.prototype.unInit = function () {
                    this.mWXAdHandler && this.mWXAdHandler.offClose(this.mCloseCallback);
                }),
                (t.prototype.getAPName = function () {
                    return o.MGBAdProvider4WXRewardVideo.APNAME;
                }),
                (t.prototype.isCurValid = function () {
                    return !0;
                }),
                (t.prototype.doRptAdShow = function () {}),
                (t.prototype.doRptClick = function () {}),
                (t.prototype.doHandleShow = function () {}),
                (t.prototype.doHandleClick = function () {}),
                (t.prototype.destroy = function () {
                    this.unInit();
                }),
                (t.prototype.show = function (t) {
                    var e = this;
                    this.mPosIdCfg &&
                    this.mPosIdCfg.getPosId() &&
                    o.MGBAdModule.getInstance().hasSceneExitFlag(this.mPosIdCfg.getPosId())
                        ? MGRPT.minigame_common_ad.report(
                              this.mPosIdCfg.getPosId(),
                              o.MGBAdAction.ACTION_SHOW_FAILED,
                              o.MGBAdErrCode.ADERR_ADM_EXIT_SCENE,
                              o.MGBAdDefs.ADTYPE_WX_REWARDVIDEO,
                          )
                        : ((this.mAdShowCallback = t),
                          null != this.mWXAdHandler &&
                              this.mWXAdHandler
                                  .show()
                                  .then(function () {
                                      e.mPosIdCfg &&
                                          MGRPT.minigame_common_ad.report(
                                              e.mPosIdCfg.getPosId(),
                                              o.MGBAdAction.ACTION_SHOW_SUCCESS,
                                              o.MGBAdErrCode.ADERR_SUCCESS,
                                              o.MGBAdDefs.ADTYPE_WX_REWARDVIDEO,
                                          ),
                                          e.mAdShowCallback && e.mAdShowCallback.onShowSuccess(e, null, null);
                                  })
                                  .catch(function (t) {
                                      e.mPosIdCfg &&
                                          MGRPT.minigame_common_ad.report(
                                              e.mPosIdCfg.getPosId(),
                                              o.MGBAdAction.ACTION_SHOW_FAILED,
                                              JSON.stringify(t),
                                              o.MGBAdDefs.ADTYPE_WX_REWARDVIDEO,
                                          ),
                                          o.Log.e(
                                              e.TAG,
                                              'mRewardedVideoAd 弹出广告全屏框失败了..., posId = ' +
                                                  e.mPosIdCfg.getPosId(),
                                          ),
                                          e.mAdShowCallback && e.mAdShowCallback.onShowFail(e, null, null),
                                          e.tryAgain(e.mPosIdCfg.getPosId());
                                  }));
                }),
                (t.prototype.tryAgain = function (t) {
                    if (this.mWXAdHandler) {
                        var e = this.mWXAdHandler;
                        e.load().then(function () {
                            e.show().then(function () {
                                MGRPT.minigame_common_ad.report(
                                    t,
                                    o.MGBAdAction.ACTION_WXRV_SHOW_TRYAGAIN,
                                    o.MGBAdErrCode.ADERR_SUCCESS,
                                    o.MGBAdDefs.ADTYPE_WX_REWARDVIDEO,
                                );
                            });
                        });
                    }
                }),
                (t.prototype.onAdClose = function (t) {
                    o.Log.i(this.TAG, 'onAdClose, posId = ' + this.mPosIdCfg.getPosId()),
                        null != this.mAdShowCallback &&
                            ((t && t.isEnded) || void 0 === t
                                ? (this.mPosIdCfg &&
                                      MGRPT.minigame_common_ad.report(
                                          this.mPosIdCfg.getPosId(),
                                          o.MGBAdAction.ACTION_WXRV_CLOSE_CLICK_END,
                                          o.MGBAdErrCode.ADERR_SUCCESS,
                                          o.MGBAdDefs.ADTYPE_WX_REWARDVIDEO,
                                      ),
                                  o.Log.i(
                                      this.TAG,
                                      '正常播放结束，可以下发游戏奖励, posId = ' + this.mPosIdCfg.getPosId(),
                                  ),
                                  this.mAdShowCallback && this.mAdShowCallback.onShowFinish(this, null, null))
                                : (this.mPosIdCfg &&
                                      MGRPT.minigame_common_ad.report(
                                          this.mPosIdCfg.getPosId(),
                                          o.MGBAdAction.ACTION_WXRV_CLOSE_CLICK_NOT_END,
                                          o.MGBAdErrCode.ADERR_SUCCESS,
                                          o.MGBAdDefs.ADTYPE_WX_REWARDVIDEO,
                                      ),
                                  o.Log.i(
                                      this.TAG,
                                      '播放中途退出，不下发游戏奖励, posId = ' + this.mPosIdCfg.getPosId(),
                                  ),
                                  this.mAdShowCallback && this.mAdShowCallback.onShowUnFinish(this, null, null)),
                            (this.mAdShowCallback = null));
                }),
                t
            );
        })();
        o.MGBAd4WXRewardVideo = t;
    })(MGB || (MGB = {})),
    (function (r) {
        var t = (function () {
            function n(t, e) {
                (this.TAG = 'MGB_AdSelector4Auto'),
                    (this.mPosIdCfg = null),
                    (this.mAdProvider = null),
                    (this.mPlatformType = null),
                    (this.mPlatformType = t),
                    (this.mPosIdCfg = e);
            }
            return (
                (n.prototype.fetchAd = function (t, e) {
                    if ((this.prepareAdProviders(), null == this.mAdProvider))
                        return new r.ResultFetchAd(r.MGBAdErrCode.ADERR_AS_FETCH_NO_ADPROVIDER);
                    if (null == this.mPosIdCfg) return new r.ResultFetchAd(r.MGBAdErrCode.ADERR_AS_FETCH_NO_POSIDCFG);
                    var o = this.mPosIdCfg.getNativePosId();
                    return this.mAdProvider.doFetch(this.mPosIdCfg, o, t, e);
                }),
                (n.prototype.loadAd = function (t, e) {
                    if ((this.prepareAdProviders(), null == this.mAdProvider))
                        return r.MGBAdErrCode.ADERR_AS_LOAD_NO_ADPROVIDER;
                    if (null == this.mPosIdCfg) return r.MGBAdErrCode.ADERR_AS_LOAD_NO_POSIDCFG;
                    var o = this.mPosIdCfg.getNativePosId();
                    return this.mAdProvider.doLoad(this.mPosIdCfg, o, t, e);
                }),
                (n.prototype.getCurSelAdType = function () {
                    return (
                        this.prepareAdProviders(),
                        this.mAdProvider ? this.mAdProvider.getAdType() : r.MGBAdDefs.ADTYPE_UNKNOWN
                    );
                }),
                (n.prototype.prepareAdProviders = function () {
                    if (null == this.mAdProvider && null != this.mPosIdCfg) {
                        var t = this.mPosIdCfg.getNum(r.MGBAdPosIdCfg.KEY_ADTYPE, -1);
                        -1 != t
                            ? ((this.mAdProvider = this.instanceProvider(this.mPlatformType, t)),
                              null != this.mAdProvider ||
                                  r.Log.e(
                                      this.TAG,
                                      "didn't find match adprovider for " + this.mPlatformType + ' / ' + t,
                                  ))
                            : r.Log.e(this.TAG, 'PosIdConfig must be specified adType');
                    }
                }),
                (n.prototype.getCacheSize = function () {
                    return (
                        this.prepareAdProviders(),
                        null == this.mAdProvider
                            ? (r.Log.e(this.TAG, 'MGBAdSelector4Auto this.mAdProvider == null.'), 0)
                            : this.mAdProvider.getCacheSize()
                    );
                }),
                (n.prototype.instanceProvider = function (t, e) {
                    var o = null;
                    switch (t) {
                        case r.MGBAdDefs.PLATFORM_WX:
                            n.ADTYPE_BANNER == e
                                ? (o = r.MGBAdProvider4WXBanner.APNAME)
                                : n.ADTYPE_REWARD_VIDEO == e && (o = r.MGBAdProvider4WXRewardVideo.APNAME);
                            break;
                        case r.MGBAdDefs.PLATFORM_QQ:
                            n.ADTYPE_BANNER == e
                                ? (o = r.MGBAdProvider4QQBanner.APNAME)
                                : n.ADTYPE_REWARD_VIDEO == e && (o = r.MGBAdProvider4QQRewardVideo.APNAME);
                            break;
                        case r.MGBAdDefs.PLATFORM_FB:
                            n.ADTYPE_BANNER == e
                                ? (r.Log.w(this.TAG, "facebook doesn't provide banner ad"),
                                  (o = r.MGBAdProvider4FBInterstitial.APNAME))
                                : n.ADTYPE_REWARD_VIDEO == e && (o = r.MGBAdProvider4FBRewardVideo.APNAME);
                    }
                    return r.MGBAdCompFactory.getInstance().createAP(o);
                }),
                (n.ADTYPE_BANNER = 100),
                (n.ADTYPE_REWARD_VIDEO = 200),
                (n.ASNAME = 'auto_selector'),
                n
            );
        })();
        r.MGBAdSelector4Auto = t;
    })(MGB || (MGB = {})),
    (function (n) {
        var t = (function () {
            function t(t) {
                (this.mPosIdCfg = null), (this.mAdProvider = null), (this.mPosIdCfg = t);
            }
            return (
                (t.prototype.fetchAd = function (t, e) {
                    if ((this.prepareAdProviders(), null == this.mAdProvider))
                        return new n.ResultFetchAd(n.MGBAdErrCode.ADERR_AS_FETCH_NO_ADPROVIDER);
                    if (null == this.mPosIdCfg) return new n.ResultFetchAd(n.MGBAdErrCode.ADERR_AS_FETCH_NO_POSIDCFG);
                    var o = this.mPosIdCfg.getNativePosId();
                    return this.mAdProvider.doFetch(this.mPosIdCfg, o, t, e);
                }),
                (t.prototype.loadAd = function (t, e) {
                    if ((this.prepareAdProviders(), null == this.mAdProvider))
                        return n.MGBAdErrCode.ADERR_AS_FETCH_NO_ADPROVIDER;
                    if (null == this.mPosIdCfg) return n.MGBAdErrCode.ADERR_AS_LOAD_NO_POSIDCFG;
                    var o = this.mPosIdCfg.getNativePosId();
                    return this.mAdProvider.doLoad(this.mPosIdCfg, o, t, e);
                }),
                (t.prototype.prepareAdProviders = function () {
                    if (null == this.mAdProvider && null != this.mPosIdCfg) {
                        var t = this.mPosIdCfg.getStr(n.MGBAdPosIdCfg.KEY_ADPROVIDER_NAME, '');
                        null != t &&
                            ((this.mAdProvider = n.MGBAdCompFactory.getInstance().createAP(t)), this.mAdProvider);
                    }
                }),
                (t.prototype.getCurSelAdType = function () {
                    return (
                        this.prepareAdProviders(),
                        this.mAdProvider ? this.mAdProvider.getAdType() : n.MGBAdDefs.ADTYPE_UNKNOWN
                    );
                }),
                (t.prototype.getCacheSize = function () {
                    return null == this.mAdProvider ? 0 : this.mAdProvider.getCacheSize();
                }),
                (t.ASNAME = 'manual_selector'),
                t
            );
        })();
        n.MGBAdSelector4Manual = t;
    })(MGB || (MGB = {})),
    (function (i) {
        var t = (function () {
            function t() {
                (this.TAG = 'MGB_MGBGameDepot'), (this.mListRcmdDest = new Array());
            }
            return (
                (t.prototype.saveGames = function (t) {
                    if (t) {
                        for (var e = 0, o = t; e < o.length; e++) {
                            var n = o[e],
                                r = new i.MGBRcmdGame(n);
                            this.mListRcmdDest.push(r);
                        }
                        i.Log.i(this.TAG, 'mListRcmdDest.size:' + this.mListRcmdDest.length);
                    }
                }),
                (t.prototype.getItem = function (t) {
                    return 0 == this.mListRcmdDest.length || t < 0 || t >= this.mListRcmdDest.length
                        ? null
                        : this.mListRcmdDest[t];
                }),
                (t.prototype.getSize = function () {
                    return this.mListRcmdDest ? this.mListRcmdDest.length : 0;
                }),
                t
            );
        })();
        i.MGBGameDepot = t;
    })(MGB || (MGB = {})),
    (function (i) {
        var t = (function () {
            function t() {
                (this.TAG = 'MGB_MGBImg4Flag'), (this.mapImgUrls = {});
            }
            return (
                (t.prototype.saveImgUrls = function (t) {
                    if (t)
                        for (var e = 0, o = Object.keys(t); e < o.length; e++) {
                            var n = o[e];
                            if (n) {
                                var r = t[n];
                                (this.mapImgUrls[n] = r), i.Log.i(this.TAG, 'imgurls flag[' + n + ']: ' + r);
                            }
                        }
                }),
                (t.prototype.getImgUrl = function (t) {
                    return t && this.mapImgUrls ? this.mapImgUrls[t] : null;
                }),
                t
            );
        })();
        i.MGBImg4Flag = t;
    })(MGB || (MGB = {})),
    (function (s) {
        var t = (function () {
            function i(t, e) {
                (this.mPosId = null), (this.mPosId = t);
                var o = s.MGBRcmdModule.inst().getGameId();
                this.isDataCached()
                    ? (MGRPT.minigame_common_ad.report(
                          t,
                          s.MGBAdAction.ACTION_RCMD_LOAD_FROM_LOCAL_START,
                          0,
                          this.getRptAdType(),
                      ),
                      this.loadFromCache(o, e))
                    : (MGRPT.minigame_common_ad.report(
                          t,
                          s.MGBAdAction.ACTION_RCMD_LOAD_FROM_NET_START,
                          0,
                          this.getRptAdType(),
                      ),
                      this.loadFromNet(o, e));
            }
            return (
                (i.prototype.loadFromNet = function (t, o) {
                    var n = this,
                        e = this.prepareUrl(t),
                        r = this;
                    if (!e || 0 == e.length) return s.Log.e(i.TAG, 'urlDest is empty.'), void (o && o.onFailed());
                    s.Log.i(i.TAG, 'loadFromNet urlDest:' + e),
                        s.PlatformProxy.getInstance().request({
                            url: e,
                            header: {
                                Referer: 'sqimg.qq.com',
                            },
                            method: 'GET',
                            dataType: 'json',
                            success: function (t, e) {
                                e
                                    ? (MGRPT.minigame_common_ad.report(
                                          n.mPosId,
                                          s.MGBAdAction.ACTION_RCMD_LOAD_FROM_NET_SUCCESS,
                                          s.MGBAdErrCode.ADERR_SUCCESS,
                                          n.getRptAdType(),
                                      ),
                                      n.saveData2Cache(e),
                                      o && o.onReady(r))
                                    : (s.Log.e(i.TAG, 'enter success: data == null'),
                                      MGRPT.minigame_common_ad.report(
                                          n.mPosId,
                                          s.MGBAdAction.ACTION_RCMD_LOAD_FROM_NET_FAILED,
                                          'NO DATA',
                                          n.getRptAdType(),
                                      ),
                                      o && o.onFailed());
                            },
                            fail: function (t, e) {
                                MGRPT.minigame_common_ad.report(
                                    n.mPosId,
                                    s.MGBAdAction.ACTION_RCMD_LOAD_FROM_NET_FAILED,
                                    t,
                                    n.getRptAdType(),
                                ),
                                    s.Log.e(i.TAG, 'enter fail: code:' + t),
                                    o && o.onFailed();
                            },
                        });
                }),
                (i.prototype.loadFromCache = function (t, e) {
                    s.Log.i(i.TAG, 'loadFromLocal begin.');
                    this.isDataCached()
                        ? e &&
                          (MGRPT.minigame_common_ad.report(
                              this.mPosId,
                              s.MGBAdAction.ACTION_RCMD_LOAD_FROM_LOCAL_SUCCESS,
                              0,
                              this.getRptAdType(),
                          ),
                          e.onReady(this))
                        : e &&
                          (MGRPT.minigame_common_ad.report(
                              this.mPosId,
                              s.MGBAdAction.ACTION_RCMD_LOAD_FROM_LOCAL_FAILED,
                              0,
                              this.getRptAdType(),
                          ),
                          e.onFailed());
                }),
                (i.prototype.getRptAdType = function () {
                    return s.MGBAdDefs.ADTYPE_RCMD_UNKNOWN;
                }),
                (i.prototype.prepareUrl = function (t) {
                    var e = s.MGBRcmdModule.inst().getRcmdDataHost();
                    return e || (e = s.MGBRcmdDefs.HOST), e + t + '/rcmdtype_' + this.getRcmdType() + '.json';
                }),
                (i.TAG = 'MGB_MGBRcmd'),
                i
            );
        })();
        s.MGBRcmd = t;
    })(MGB || (MGB = {})),
    (function (n) {
        var t = (function (t) {
            function o() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return (
                __extends(o, t),
                (o.prototype.getRcmdType = function () {
                    return n.MGBRcmdDefs.RCMDTYPE_BIGCARD;
                }),
                (o.prototype.isDataCached = function () {
                    return !!o.sRcmdTypeData;
                }),
                (o.prototype.saveData2Cache = function (t) {
                    return o._saveData2Cache(t);
                }),
                (o._saveData2Cache = function (t) {
                    if (!t) return !1;
                    (o.sRcmdTypeData = t), o.sGameDepot || (o.sGameDepot = new n.MGBGameDepot());
                    var e = o.sRcmdTypeData.games;
                    return e && o.sGameDepot.saveGames(e), !0;
                }),
                (o.TAG = 'MGB_MGBRcmd4BigCard'),
                (o.sRcmdTypeData = null),
                (o.sGameDepot = null),
                o
            );
        })(n.MGBRcmd);
        n.MGBRcmd4BigCard = t;
    })(MGB || (MGB = {})),
    (function (i) {
        var t = (function (e) {
            function r() {
                var t = (null !== e && e.apply(this, arguments)) || this;
                return (t.mCurPos = 0), (t.mbGetStartPos = !1), t;
            }
            return (
                __extends(r, e),
                (r.prototype.isDataCached = function () {
                    return !!r.sRawJsonData;
                }),
                (r.prototype.getRcmdType = function () {
                    return i.MGBRcmdDefs.RCMDTYPE_GIFTBOX;
                }),
                (r.prototype.saveData2Cache = function (t) {
                    return r._saveData2Cache(t);
                }),
                (r._saveData2Cache = function (t) {
                    if (!t) return !1;
                    (r.sRawJsonData = t), r.sGameDepot || (r.sGameDepot = new i.MGBGameDepot());
                    var e = r.sRawJsonData.games;
                    return e && r.sGameDepot.saveGames(e), !0;
                }),
                (r.prototype.getIconUrlCur = function () {
                    var t = this.getRCmdGamePosCur(),
                        e = r.sGameDepot.getItem(t);
                    return e ? e.iconUrl : (i.Log.i(r.TAG, '!game'), null);
                }),
                (r.prototype.jump = function (e) {
                    var o = this;
                    void 0 === e && (e = null);
                    var t = this.getRCmdGamePosCur(),
                        n = r.sGameDepot.getItem(t);
                    n
                        ? (MGRPT.minigame_common_ad.report(
                              this.mPosId,
                              i.MGBAdAction.ACTION_RCMD_JUMPGAME_START,
                              n.getGameId(),
                              i.MGBAdDefs.ADTYPE_RCMD_GIFTBOX,
                          ),
                          i.PlatformProxy.getInstance().skipGame(this.mPosId, n, {
                              success: function (t) {
                                  e && e.success(t),
                                      MGRPT.minigame_common_ad.report(
                                          o.mPosId,
                                          i.MGBAdAction.ACTION_RCMD_JUMPGAME_END,
                                          n.getGameId(),
                                          i.MGBAdDefs.ADTYPE_RCMD_GIFTBOX,
                                      );
                              },
                              fail: function (t) {
                                  e && e.fail(t);
                              },
                          }))
                        : i.Log.e(r.TAG, 'jump failed. no game match.');
                }),
                (r.prototype.getRCmdGamePosCur = function () {
                    return (
                        this.mbGetStartPos || ((this.mCurPos = this.getStartPos()), (this.mbGetStartPos = !0)),
                        this.mCurPos
                    );
                }),
                (r.prototype.next = function () {
                    var t = this.getGameDestCount();
                    0 != t
                        ? (this.mCurPos = (this.mCurPos + 1) % t)
                        : i.Log.e(r.TAG, "nGameCount == 0, can't goto next.");
                }),
                (r.prototype.getStartPos = function () {
                    if (!r.sRawJsonData) return 0;
                    var t = r.sRawJsonData.posconfig;
                    if (!t) return i.Log.e(r.TAG, '!posConfig'), 0;
                    for (var e = 0, o = t; e < o.length; e++) {
                        var n = o[e];
                        if (n && n.posid && n.posid == this.mPosId) return n.start_pos ? n.start_pos : 0;
                    }
                    return 0;
                }),
                (r.prototype.getGameDestCount = function () {
                    if (!r.sRawJsonData) return 0;
                    var t = r.sRawJsonData.games;
                    return t ? t.length : 0;
                }),
                (r.fillCache = function (e) {
                    try {
                        var t = JSON.parse(e);
                    } catch (t) {
                        return void i.Log.e(r.TAG, 'JSON.parse failed. cacheData:' + e);
                    }
                    r._saveData2Cache(t);
                }),
                (r.TAG = 'MGB_MGBRcmd4GiftBox'),
                (r.sRawJsonData = null),
                (r.sGameDepot = null),
                r
            );
        })(i.MGBRcmd);
        i.MGBRcmd4GiftBox = t;
    })(MGB || (MGB = {})),
    (function (a) {
        var t = (function (e) {
            function s() {
                var t = (null !== e && e.apply(this, arguments)) || this;
                return (t.mGameSelected = null), t;
            }
            return (
                __extends(s, e),
                (s.prototype.getRcmdType = function () {
                    return a.MGBRcmdDefs.RCMDTYPE_SCOREWALL;
                }),
                (s.prototype.isDataCached = function () {
                    return !!s.sRawJsonData;
                }),
                (s.prototype.saveData2Cache = function (t) {
                    var e;
                    return (e = s._saveData2Cache(t)), this._savePosIdCfg(), e;
                }),
                (s._saveData2Cache = function (t) {
                    if (!t) return !1;
                    if (s.sRawJsonData) return !1;
                    (s.sRawJsonData = t), s.sGameDepot || (s.sGameDepot = new a.MGBGameDepot());
                    var e = s.sRawJsonData.games;
                    e && s.sGameDepot.saveGames(e);
                    var o = s.sRawJsonData.img4flag;
                    return o && (s.sImg4Flags || (s.sImg4Flags = new a.MGBImg4Flag()), s.sImg4Flags.saveImgUrls(o)), !0;
                }),
                (s.fillCache = function (e) {
                    try {
                        var t = JSON.parse(e);
                    } catch (t) {
                        return void a.Log.e(s.TAG, 'JSON.parse failed. cacheData:' + e);
                    }
                    s._saveData2Cache(t);
                }),
                (s.prototype.getSize = function () {
                    return this.isDataCached()
                        ? (this._savePosIdCfg(), this.mGameSelected ? Object.keys(this.mGameSelected).length : 0)
                        : 0;
                }),
                (s.prototype.getGameInfo = function (t) {
                    if (!this.isDataCached()) return null;
                    this._savePosIdCfg();
                    var e = this.getGameIdx(t);
                    return s.sGameDepot.getItem(e);
                }),
                (s.prototype.jump = function (t, e) {
                    var o = this;
                    if ((void 0 === e && (e = null), !this.isDataCached())) return !1;
                    this._savePosIdCfg();
                    var n = this.getGameIdx(t),
                        r = s.sGameDepot.getItem(n);
                    if (!r) return a.Log.e(s.TAG, 'No Game. jump_idxGS[' + t + ']_gameIdx[' + n + ']'), !1;
                    MGRPT.minigame_common_ad.report(
                        this.mPosId,
                        a.MGBAdAction.ACTION_RCMD_JUMPGAME_START,
                        r.getGameId(),
                        a.MGBAdDefs.ADTYPE_RCMD_SCOREWALL,
                    ),
                        a.PlatformProxy.getInstance().skipGame(this.mPosId, r, {
                            success: function (t) {
                                e && e.success(t),
                                    MGRPT.minigame_common_ad.report(
                                        o.mPosId,
                                        a.MGBAdAction.ACTION_RCMD_JUMPGAME_END,
                                        r.getGameId(),
                                        a.MGBAdDefs.ADTYPE_RCMD_SCOREWALL,
                                    );
                            },
                            fail: function (t) {
                                e && e.fail(t);
                            },
                        });
                }),
                (s.getFlagUrl = function (t) {
                    return t && s.sImg4Flags ? s.sImg4Flags.getImgUrl(t) : null;
                }),
                (s.prototype.getGameIdx = function (t) {
                    return t < 0 || !this.mGameSelected || t >= this.mGameSelected.length ? -1 : this.mGameSelected[t];
                }),
                (s.prototype._savePosIdCfg = function () {
                    if (!(this.mGameSelected && 0 < this.mGameSelected.length))
                        if (this.isDataCached())
                            if (this.mPosId) {
                                var t = s.sRawJsonData.posconfig;
                                if (t)
                                    for (var e = 0, o = t; e < o.length; e++) {
                                        var n = o[e];
                                        if (n) {
                                            var r = n.posid;
                                            if (r && r == this.mPosId) {
                                                var i = n.game_sel;
                                                return void (i && this._saveGameSel(i));
                                            }
                                        }
                                    }
                                else a.Log.e(s.TAG, '!aryPosCfg in MGBRcmd4ScoreWall');
                            } else a.Log.e(s.TAG, 'no mPosId in MGBRcmd4ScoreWall');
                        else a.Log.e(s.TAG, 'no DataCached in MGBRcmd4ScoreWall');
                }),
                (s.prototype._saveGameSel = function (t) {
                    t &&
                        (this.mGameSelected && 0 < this.mGameSelected.length
                            ? a.Log.i(s.TAG, 'in _saveGameSel, this.mGameSelected saved.')
                            : ((this.mGameSelected = t),
                              a.Log.i(s.TAG, '_saveGameSel size:' + this.mGameSelected.length)));
                }),
                (s.TAG = 'MGB_MGBRcmd4ScoreWall'),
                (s.sRawJsonData = null),
                (s.sGameDepot = null),
                (s.sImg4Flags = null),
                s
            );
        })(a.MGBRcmd);
        a.MGBRcmd4ScoreWall = t;
    })(MGB || (MGB = {})),
    (function (t) {
        var e = (function () {
            function t() {}
            return (
                (t.RCMDTYPE_GIFTBOX = 1),
                (t.RCMDTYPE_BIGCARD = 2),
                (t.RCMDTYPE_SCOREWALL = 3),
                (t.HOST = 'https://piano-weixin-game.cmcm.com/pianotiles2/cfg/game_rcmd/'),
                t
            );
        })();
        t.MGBRcmdDefs = e;
    })(MGB || (MGB = {})),
    (function (o) {
        var t = (function () {
            function t(t) {
                (this.name = ''),
                    (this.iconUrl = ''),
                    (this.gameidWX = ''),
                    (this.gameidQQ = 0),
                    (this.bigimgURL = ''),
                    (this.title = ''),
                    (this.describe = ''),
                    (this.describe2 = ''),
                    (this.flag = ''),
                    (this.mapRewards = {}),
                    t &&
                        ((this.name = t.name),
                        t.icon && (this.iconUrl = t.icon),
                        (this.gameidWX = t.gameid_wx),
                        (this.gameidQQ = t.gameid_qq ? Number(t.gameid_qq) : 0),
                        t.big_img && (this.bigimgURL = t.big_img),
                        t.title && (this.title = t.title),
                        t.describe && (this.describe = t.describe),
                        t.describe2 && (this.describe2 = t.describe2),
                        t.rewards && this._saveRewards(t.rewards),
                        t.flag && (this.flag = t.flag));
            }
            return (
                (t.prototype.getGameId = function () {
                    var t = o.PlatformChecker.getPlatformType();
                    return t == o.MGBAdDefs.PLATFORM_QQ
                        ? this.gameidQQ
                        : t == o.MGBAdDefs.PLATFORM_WX
                        ? this.gameidWX
                        : '';
                }),
                (t.prototype._saveRewards = function (t) {
                    if (t)
                        for (var e in t)
                            (this.mapRewards[e] = t[e]),
                                o.Log.i('[MGB_ROM] in _saveRewards, key:' + e + ', count:' + t[e]);
                }),
                t
            );
        })();
        o.MGBRcmdGame = t;
    })(MGB || (MGB = {})),
    (function (o) {
        var t = (function () {
            function t() {
                (this.mGameId4RCmd = 0), (this.mUrlRcmdDir = null);
            }
            return (
                (t.inst = function () {
                    return t.sInst ? t.sInst : (t.sInst = new t());
                }),
                (t.prototype.init = function (t) {
                    var e = o.PlatformChecker.getPlatformType();
                    o.PlatformProxy.getInstance().init(e), (this.mGameId4RCmd = t);
                }),
                (t.prototype.getGameId = function () {
                    return this.mGameId4RCmd;
                }),
                (t.prototype.setRcmdDataHost = function (t) {
                    this.mUrlRcmdDir = t;
                }),
                (t.prototype.getRcmdDataHost = function () {
                    return this.mUrlRcmdDir;
                }),
                (t.sInst = null),
                t
            );
        })();
        o.MGBRcmdModule = t;
    })(MGB || (MGB = {})),
    (function (e) {
        var t = (function () {
            function t() {}
            return (
                (t.prototype.getPlatformType = function () {
                    return this.isPlatformWX()
                        ? e.MGBAdDefs.PLATFORM_WX
                        : this.isPlatformQQ()
                        ? e.MGBAdDefs.PLATFORM_QQ
                        : this.isPlatformFB()
                        ? e.MGBAdDefs.PLATFORM_FB
                        : this.isPlatformWeb()
                        ? e.MGBAdDefs.PLATFORM_WEB
                        : 'unknown_platform';
                }),
                (t.prototype.isPlatformWX = function () {
                    return cc.sys.platform == cc.sys.WECHAT_GAME;
                }),
                (t.prototype.isPlatformQQ = function () {
                    return cc.sys.platform == cc.sys.QQ_PLAY;
                }),
                (t.prototype.isPlatformWeb = function () {
                    return cc.sys.platform == cc.sys.DESKTOP_BROWSER || cc.sys.platform == cc.sys.MOBILE_BROWSER;
                }),
                (t.prototype.isPlatformFB = function () {
                    return 'undefined' != typeof FBInstant;
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
    })(MGB || (MGB = {})),
    (function (e) {
        var t = (function () {
            function t() {}
            return (
                (t.prototype.getPlatformType = function () {
                    return this.isPlatformWX()
                        ? e.MGBAdDefs.PLATFORM_WX
                        : this.isPlatformQQ()
                        ? e.MGBAdDefs.PLATFORM_QQ
                        : this.isPlatformFB()
                        ? e.MGBAdDefs.PLATFORM_FB
                        : this.isPlatformWeb()
                        ? e.MGBAdDefs.PLATFORM_WEB
                        : 'unknown_platform';
                }),
                (t.prototype.isPlatformWX = function () {
                    if (Laya.Browser.onMiniGame) return !0;
                }),
                (t.prototype.isPlatformQQ = function () {
                    return !!(Laya.Browser.userAgent && -1 < Laya.Browser.userAgent.indexOf('limixiu'));
                }),
                (t.prototype.isPlatformWeb = function () {
                    return !0;
                }),
                (t.prototype.isPlatformFB = function () {
                    return 'undefined' != typeof FBInstant;
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
    })(MGB || (MGB = {})),
    (function (e) {
        var t = (function () {
            function o() {}
            return (
                (o.getPlatformType = function () {
                    return o.mPlatformTypeCur
                        ? o.mPlatformTypeCur
                        : (o.prepareGECur(),
                          o.mGameEngineCur ? (o.mPlatformTypeCur = o.mGameEngineCur.getPlatformType()) : '');
                }),
                (o.isPlatformWX = function () {
                    return o.prepareGECur(), !!o.mGameEngineCur && o.mGameEngineCur.isPlatformWX();
                }),
                (o.isPlatformQQ = function () {
                    return o.prepareGECur(), !!o.mGameEngineCur && o.mGameEngineCur.isPlatformQQ();
                }),
                (o.isPlatformWeb = function () {
                    return o.prepareGECur(), !!o.mGameEngineCur && o.mGameEngineCur.isPlatformWeb();
                }),
                (o.isPlatformFB = function () {
                    return o.prepareGECur(), !!o.mGameEngineCur && o.mGameEngineCur.isPlatformFB();
                }),
                (o.setLocalItem = function (t, e) {
                    o.prepareGECur(), o.mGameEngineCur && o.mGameEngineCur.setLocalItem(t, e);
                }),
                (o.getLocalItem = function (t) {
                    o.prepareGECur(), o.mGameEngineCur && o.mGameEngineCur.getLocalItem(t);
                }),
                (o.removeLocalItem = function (t) {
                    o.prepareGECur(), o.mGameEngineCur && o.mGameEngineCur.removeLocalItem(t);
                }),
                (o.clear = function () {
                    o.prepareGECur(), o.mGameEngineCur && o.clear();
                }),
                (o.prepareGECur = function () {
                    if (!o.mGameEngineCur) {
                        var t = o.getCurEngineType();
                        o.setCurGameEngine(t);
                    }
                }),
                (o.setCurGameEngine = function (t) {
                    if (!this.mGameEngineCur && t && 0 != t.length)
                        switch (t) {
                            case e.MGBAdDefs.GETYPE_CC:
                                this.mGameEngineCur = new e.GameEngine4CC();
                                break;
                            case e.MGBAdDefs.GETYPE_LAYABOX:
                                this.mGameEngineCur = new e.GameEngine4LayaBox();
                        }
                }),
                (o.getCurEngineType = function () {
                    return 'undefined' != typeof Laya && void 0 !== Laya.LocalStorage
                        ? e.MGBAdDefs.GETYPE_LAYABOX
                        : 'undefined' != typeof cc && void 0 !== cc.sys
                        ? e.MGBAdDefs.GETYPE_CC
                        : '';
                }),
                (o.mGameEngineCur = null),
                (o.mPlatformTypeCur = null),
                o
            );
        })();
        e.GameEngineProxy = t;
    })(MGB || (MGB = {})),
    (function (t) {
        var e = (function () {
            function t() {
                this.mMapObject = new Map();
            }
            return (
                (t.prototype.setNum = function (t, e) {
                    this.mMapObject.set(t, e);
                }),
                (t.prototype.getNum = function (t, e) {
                    if (!this.mMapObject.has(t)) return e;
                    var o = this.mMapObject.get(t);
                    return null == o || 'number' != typeof o ? e : o;
                }),
                (t.prototype.setStr = function (t, e) {
                    this.mMapObject.set(t, e);
                }),
                (t.prototype.getStr = function (t, e) {
                    if (!this.mMapObject.has(t)) return e;
                    var o = this.mMapObject.get(t);
                    return null == o || 'string' != typeof o ? e : o;
                }),
                (t.prototype.setObject = function (t, e) {
                    this.mMapObject.set(t, e);
                }),
                (t.prototype.getObject = function (t, e) {
                    return this.mMapObject.has(t) ? this.mMapObject.get(t) : e;
                }),
                t
            );
        })();
        t.Params = e;
    })(MGB || (MGB = {})),
    (function (t) {
        var e = function () {
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
        t.PlatformInfo = e;
        var o = function () {};
        t.LaunchOption = o;
    })(MGB || (MGB = {})),
    (function (t) {
        var e = (function () {
            function t() {}
            return (
                (t.ACTION_UNKNOWN = 0),
                (t.ACTION_SHOW_SUCCESS = 1),
                (t.ACTION_CLICK = 2),
                (t.ACTION_SHOW_FAILED = 3),
                (t.ACTION_SHOW_BEGIN = 4),
                (t.ACTION_SELECTOR_FETCH_START = 20),
                (t.ACTION_SELECTOR_FETCH_SUCCESS = 21),
                (t.ACTION_SELECTOR_FETCH_FAILED = 22),
                (t.ACTION_SELECTOR_LOAD_START = 40),
                (t.ACTION_SELECTOR_LOAD_SUCCESS = 41),
                (t.ACTION_SELECTOR_LOAD_FAILED = 42),
                (t.ACTION_AP_FETCH_START = 100),
                (t.ACTION_AP_FETCH_SUCCESS = 101),
                (t.ACTION_AP_FETCH_FAILED = 102),
                (t.ACTION_AP_LOAD_START = 120),
                (t.ACTION_AP_LOAD_SUCCESS = 121),
                (t.ACTION_AP_LOAD_FAILED = 122),
                (t.ACTION_NOT_TO_LOAD = 123),
                (t.ACTION_WXRV_CLOSE_CLICK_NOT_END = 150),
                (t.ACTION_WXRV_CLOSE_CLICK_END = 151),
                (t.ACTION_WXRV_SHOW_TRYAGAIN = 152),
                (t.ACTION_WXRV_ONADERROR = 153),
                (t.ACTION_RCMD_LOAD_FROM_NET_START = 501),
                (t.ACTION_RCMD_LOAD_FROM_NET_SUCCESS = 502),
                (t.ACTION_RCMD_LOAD_FROM_NET_FAILED = 503),
                (t.ACTION_RCMD_LOAD_FROM_LOCAL_START = 511),
                (t.ACTION_RCMD_LOAD_FROM_LOCAL_SUCCESS = 512),
                (t.ACTION_RCMD_LOAD_FROM_LOCAL_FAILED = 513),
                (t.ACTION_RCMD_JUMPGAME_START = 10002),
                (t.ACTION_RCMD_JUMPGAME_END = 551),
                (t.ACTION_BUTTON_SHOW = 10001),
                (t.ACTION_BUTTON_CLICK = 10002),
                t
            );
        })();
        t.MGBAdAction = e;
    })(MGB || (MGB = {})),
    (function (t) {
        var e = (function () {
            function t() {
                this.mAdCache = new Array();
            }
            return (
                (t.prototype.getSize = function () {
                    return this.removeInvalidCache(), null == this.mAdCache ? 0 : this.mAdCache.length;
                }),
                (t.prototype.pushBack = function (t) {
                    this.mAdCache.push(t);
                }),
                (t.prototype.popFront = function () {
                    return this.mAdCache.pop();
                }),
                (t.prototype.removeInvalidCache = function () {
                    if (null != this.mAdCache && 0 != this.mAdCache.length)
                        for (var t = !1, e = 0, o = ((t = !1), this.mAdCache.length); e < o; t ? e : e++) {
                            var n = this.mAdCache[e];
                            null != n && n.isCurValid() ? (t = !1) : (this.mAdCache.splice(e, 1), (t = !0));
                        }
                }),
                t
            );
        })();
        t.MGBAdCache = e;
    })(MGB || (MGB = {})),
    (function (o) {
        var t = (function () {
            function t() {
                (this.mMapId2APCreator = new Map()),
                    (this.mMapId2ASCreator = new Map()),
                    (this.TAG = 'MGB_AdCompFactory');
            }
            return (
                (t.getInstance = function () {
                    return null != t.sInst ? t.sInst : (t.sInst = new t());
                }),
                (t.prototype.regAPCreator = function (t, e) {
                    this.mMapId2APCreator.set(t, e);
                }),
                (t.prototype.createAP = function (t) {
                    if (null == t || !this.mMapId2APCreator.has(t))
                        return o.Log.e(this.TAG, 'apName is not registered to MGBAdCompFactory.'), null;
                    var e = this.mMapId2APCreator.get(t);
                    return null == e ? null : e.createNewAdProvider();
                }),
                (t.prototype.getAPCreator = function (t) {
                    if (!this.mMapId2APCreator.has(t)) return null;
                    this.mMapId2APCreator.get(t);
                }),
                (t.prototype.regASCreator = function (t, e) {
                    this.mMapId2ASCreator.set(t, e);
                }),
                (t.prototype.createAS = function (t, e) {
                    if (null == t || !this.mMapId2ASCreator.has(t)) return null;
                    var o = this.mMapId2ASCreator.get(t);
                    return null == o ? null : o.createNewAdSelector(e);
                }),
                (t.prototype.getASCreator = function (t) {
                    if (!this.mMapId2ASCreator.has(t)) return null;
                    this.mMapId2ASCreator.get(t);
                }),
                (t.sInst = null),
                t
            );
        })();
        o.MGBAdCompFactory = t;
    })(MGB || (MGB = {})),
    (function (n) {
        var t = (function () {
            function t(t) {
                (this.mPosIdCfg = null),
                    (this.mAdSelector = null),
                    (this.mAdLast = null),
                    (this.TAG = 'MGB_AdDepot'),
                    (this.mPosIdCfg = t);
            }
            return (
                (t.prototype.doLoad = function (t, e) {
                    return (
                        this.prepareAdSelector(),
                        null == this.mAdSelector
                            ? n.MGBAdErrCode.ADERR_DEPOT_LOAD_NO_ADSELECTOR
                            : (null == t && (t = new n.ParamAdLoad()),
                              this.destoryLastAd(),
                              this.mAdSelector.loadAd(t, e))
                    );
                }),
                (t.prototype.doFetch = function (t, e) {
                    if ((this.prepareAdSelector(), null == this.mAdSelector))
                        return new n.ResultFetchAd(n.MGBAdErrCode.ADERR_DEPOT_FETCH_NO_ADSELECTOR);
                    null == t && (t = new n.ParamAdFetch()), this.destoryLastAd();
                    var o = this.mAdSelector.fetchAd(t, e);
                    return null != o && o.mAdErrCode == n.MGBAdErrCode.ADERR_SUCCESS && (this.mAdLast = o.getAd()), o;
                }),
                (t.prototype.prepareAdSelector = function () {
                    if (null == this.mAdSelector && null != this.mPosIdCfg) {
                        var t = this.mPosIdCfg.getStr(n.MGBAdPosIdCfg.KEY_ADSELECTOR_NAME, '');
                        (null != t && 0 != t.length) || n.Log.e(this.TAG, 'posId: asName == null'),
                            (this.mAdSelector = n.MGBAdCompFactory.getInstance().createAS(t, this.mPosIdCfg));
                    }
                }),
                (t.prototype.getCacheSize = function () {
                    return (
                        this.prepareAdSelector(),
                        null == this.mAdSelector
                            ? (n.Log.e('MGB_DEBUG', 'MGBAdDepot.getCacheSize: this.mAdSelector == null'), 0)
                            : this.mAdSelector.getCacheSize()
                    );
                }),
                (t.prototype.destoryLastAd = function () {
                    null != this.mAdLast && (this.mAdLast.destroy(), (this.mAdLast = null));
                }),
                (t.prototype.getAdType = function () {
                    return (
                        this.prepareAdSelector(),
                        this.mAdSelector ? this.mAdSelector.getCurSelAdType() : n.MGBAdDefs.ADTYPE_UNKNOWN
                    );
                }),
                t
            );
        })();
        n.MGBAdDepot = t;
    })(MGB || (MGB = {})),
    (function (o) {
        var t = (function (e) {
            function t() {
                var t = e.call(this) || this;
                return (
                    (t.TAG = 'MGB_AdEnvCfg'),
                    (t.mPlatformType = null),
                    (t.mPlatformInfo = null),
                    (t.mInitTime = Date.now()),
                    (t.mPlatformType = o.PlatformChecker.getPlatformType()),
                    o.PlatformProxy.getInstance().init(t.mPlatformType),
                    o.Log.i(t.TAG, 'PlatformProxy.init: ' + t.mPlatformType),
                    (t.mPlatformInfo = o.PlatformProxy.getInstance().getPlatformInfo()),
                    o.Log.i(t.TAG, '[platform]: ' + JSON.stringify(t.mPlatformInfo)),
                    t
                );
            }
            return (
                __extends(t, e),
                (t.prototype.getPlatformType = function () {
                    return this.mPlatformType;
                }),
                (t.prototype.getPlatformInfo = function () {
                    return this.mPlatformInfo;
                }),
                t
            );
        })(o.Params);
        o.MGBAdEnvCfg = t;
    })(MGB || (MGB = {})),
    (function (t) {
        var e = (function () {
            function t() {}
            return (
                (t.ADERR_UNKNOWN = -1),
                (t.ADERR_SUCCESS = 0),
                (t.ADERR_LOADING = 1),
                (t.ADERR_DEPOT_LOAD_NO_ADSELECTOR = 40),
                (t.ADERR_DEPOT_FETCH_NO_ADSELECTOR = 41),
                (t.ADERR_AS_FETCH_NO_ADPROVIDER = 60),
                (t.ADERR_AS_LOAD_NO_ADPROVIDER = 61),
                (t.ADERR_AS_FETCH_NO_POSIDCFG = 62),
                (t.ADERR_AS_LOAD_NO_POSIDCFG = 63),
                (t.ADERR_AP_LOAD_NO_NATIVEPOSID = 100),
                (t.ADERR_AP_LOAD_NO_POSIDCFG = 101),
                (t.ADERR_AP_LOAD_WXBH_ONERROR = 102),
                (t.ADERR_AP_LOAD_ARGS_ERROR = 103),
                (t.ADERR_AP_FETCH_NO_NATIVEPOSID = 120),
                (t.ADERR_AP_FETCH_NO_POSIDCFG = 121),
                (t.ADERR_AP_FETCH_NOAD_INCACHE = 122),
                (t.ADERR_AP_FETCH_ARGS_ERROR = 123),
                (t.ADERR_ADMODULE_INITED = 140),
                (t.ADERR_ADMODULE_INIT_NO_LISTPOSCFG = 141),
                (t.ADERR_ADMODULE_INIT_NO_ADENVCFG = 142),
                (t.ADERR_ADMODULE_FETCH_NO_ADDEPOT = 151),
                (t.ADERR_ADMODULE_LOAD_NO_ADDEPOT = 161),
                (t.ADERR_ADMODULE_PLATFORM_INTERCEPT = 162),
                (t.ADERR_ADM_EXIT_SCENE = 163),
                (t.ADERR_AP4WXBANNER_LOAD_NO_ADHANDLER = 500),
                (t.ADERR_AP4WXBANNER_LOAD_NO_API = 501),
                (t.ADERR_AP4WXVIDEO_LOAD_NO_ADHANDLER = 550),
                (t.ADERR_AP4WXVIDEO_NOT_SUPPORT = 551),
                (t.ADERR_AP4WXVIDEO_FETCH_NO_ADHANDLER = 552),
                t
            );
        })();
        t.MGBAdErrCode = e;
    })(MGB || (MGB = {})),
    (function (e) {
        var t = (function () {
            function t(t) {
                (this.TAG = 'MGB_AdInterceptor'),
                    (this.VALID_WXAD_SDKVERSION = '2.0.4'),
                    (this.mbEnableAdOutSide = !0),
                    (this.mPlatformType = t);
            }
            return (
                (t.prototype.switch4Ad = function (t) {
                    (this.mbEnableAdOutSide = t)
                        ? e.Log.w(this.TAG, 'MGBAdSDK will be enable, ^_^')
                        : e.Log.w(this.TAG, 'MGBAdSDK will be disable, =.=!!');
                }),
                (t.prototype.intercept = function () {
                    if (!this.mbEnableAdOutSide) return e.Log.e(this.TAG, 'MGBAd SDK is disable'), !0;
                    switch (this.mPlatformType) {
                        case e.MGBAdDefs.PLATFORM_WX:
                            return !this.isWXSDKVersionValid();
                        case e.MGBAdDefs.PLATFORM_QQ:
                            return !1;
                        case e.MGBAdDefs.PLATFORM_FB:
                            return !this.isFaceBookAdAPISupported();
                    }
                    return !0;
                }),
                (t.prototype.isFaceBookAdAPISupported = function () {
                    var e = this;
                    if (!this.mFaceBookVideoAPI) return !0;
                    var t = FBInstant.getSupportedAPIs();
                    return (
                        t &&
                            t.forEach(function (t) {
                                if ('getRewardedVideoAsync' === t) return (e.mFaceBookVideoAPI = t), !0;
                            }),
                        !1
                    );
                }),
                (t.prototype.isWXSDKVersionValid = function () {
                    return wx.getSystemInfoSync().SDKVersion >= this.VALID_WXAD_SDKVERSION;
                }),
                t
            );
        })();
        e.MGBAdInterceptor = t;
    })(MGB || (MGB = {})),
    (function (r) {
        var t = (function (o) {
            function n(t) {
                var e = o.call(this) || this;
                return (
                    e.setStr(n.KEY_POSID, t),
                    e.setStr(r.MGBAdPosIdCfg.KEY_ADSELECTOR_NAME, r.MGBAdSelector4Auto.ASNAME),
                    e
                );
            }
            return (
                __extends(n, o),
                (n.prototype.getPosId = function () {
                    return this.getStr(n.KEY_POSID, '');
                }),
                (n.prototype.getNativePosId = function () {
                    var t = this.getStr(n.KEY_ADPROVIDER_NATIVE_POSID, '');
                    return t && 0 < t.length ? t : r.PlatformProxy.getInstance().getNativePosId(this);
                }),
                (n.KEY_POSID = 1),
                (n.KEY_ADTYPE = 2),
                (n.KEY_ADPROVIDER_NATIVE_POSID = 11),
                (n.KEY_ADPROVIDER_NAME = 12),
                (n.KEY_ADSELECTOR_NAME = 21),
                (n.KEY_AP4WXBANNER_LOAD_WIDTH = 101),
                (n.KEY_AP4WXBANNER_POS_ADAPTER = 102),
                (n.KEY_AP4QQVIDEO_TYPE = 103),
                (n.KEY_NATIVE_POSID_WX = 201),
                (n.KEY_NATIVE_POSID_QQ = 202),
                (n.KEY_NATIVE_POSID_FB = 203),
                (n.KEY_NATIVE_POSID_OPPO = 204),
                n
            );
        })(r.Params);
        r.MGBAdPosIdCfg = t;
    })(MGB || (MGB = {})),
    (function (t) {
        var e = (function () {
            function t(t) {
                (this.mMapId2Cfg = new Map()), this.addAdPosIdCfgList(t);
            }
            return (
                (t.prototype.addAdPosIdCfgList = function (t) {
                    if (null != t && 0 != t.length)
                        for (var e = 0, o = t; e < o.length; e++) {
                            var n = o[e];
                            if (null != n) {
                                var r = n.getPosId();
                                null != r && this.mMapId2Cfg.set(r, n);
                            }
                        }
                }),
                (t.prototype.getPosIdCfg = function (t) {
                    return null == t ? null : this.mMapId2Cfg.has(t) ? this.mMapId2Cfg.get(t) : null;
                }),
                t
            );
        })();
        t.MGBAdPosIdCfgDepot = e;
    })(MGB || (MGB = {})),
    (function (n) {
        var t = (function () {
            function t() {
                this.mMapId2Time = new Map();
            }
            return (
                (t.prototype.MGBAdShowRecord = function () {}),
                (t.getInstance = function () {
                    return t.sInst ? t.sInst : (t.sInst = new t());
                }),
                (t.prototype.isShowAdTooMuch = function (t) {
                    if (!t) return !1;
                    var e,
                        o = Date.now();
                    return (
                        (e = o - this.getAdPosLastShowTime(t) < 2e3),
                        this.saveAdPosLastShowTime(t, o),
                        e && n.Log.i('MGB_DEBUG', '[' + t + '], show ad too much.'),
                        e
                    );
                }),
                (t.prototype.getAdPosLastShowTime = function (t) {
                    return this.mMapId2Time.has(t) ? this.mMapId2Time.get(t) : 0;
                }),
                (t.prototype.saveAdPosLastShowTime = function (t, e) {
                    this.mMapId2Time && this.mMapId2Time.set(t, e);
                }),
                (t.sInst = null),
                t
            );
        })();
        n.MGBAdShowRecord = t;
    })(MGB || (MGB = {})),
    (function (t) {
        var e = (function (t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return __extends(e, t), e;
        })(t.Params);
        t.ParamAdFetch = e;
    })(MGB || (MGB = {})),
    (function (t) {
        var e = (function (t) {
            function e() {
                return (null !== t && t.apply(this, arguments)) || this;
            }
            return __extends(e, t), e;
        })(t.Params);
        t.ParamAdLoad = e;
    })(MGB || (MGB = {})),
    (function (e) {
        var t = (function () {
            function t(t) {
                (this.mAd = null), (this.mAdErrCode = e.MGBAdErrCode.ADERR_UNKNOWN), (this.mAdErrCode = t);
            }
            return (
                (t.prototype.fillAd = function (t) {
                    return (this.mAd = t), this;
                }),
                (t.prototype.getAd = function () {
                    return this.mAd;
                }),
                t
            );
        })();
        e.ResultFetchAd = t;
    })(MGB || (MGB = {})),
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
                (t.isPlatformWeb = function () {
                    return e.GameEngineProxy.isPlatformWeb();
                }),
                (t.isPlatformFB = function () {
                    return e.GameEngineProxy.isPlatformFB();
                }),
                t
            );
        })();
        e.PlatformChecker = t;
    })(MGB || (MGB = {})),
    (function (s) {
        var t = (function () {
            function t() {
                this.TAG = 'MGB_PlatformImpl4FB';
            }
            return (
                (t.prototype.getLaunchParameter = function () {
                    var t = new s.LaunchOption();
                    return (
                        FBInstant.getEntryPointData() ||
                            s.Log.w(this.TAG, 'no launch options associated with current entry point'),
                        t
                    );
                }),
                (t.prototype.request = function (n, t) {
                    var r = this;
                    s.Log.i(this.TAG, 'facebook reqeust params: ' + JSON.stringify(n));
                    var i = new XMLHttpRequest();
                    for (var e in (i.open(n.method, n.url), n.header)) i.setRequestHeader(e, n.header[e]);
                    (i.onreadystatechange = function () {
                        if (i.readyState == XMLHttpRequest.DONE)
                            if (
                                (s.Log.i(r.TAG, 'facebook request, response code:', i.status),
                                s.Log.i(r.TAG, 'facebook request, response:', i.response),
                                200 == i.status)
                            ) {
                                if ((s.Log.i(r.TAG, 'facebook request, succeed:', i.responseText), n.success)) {
                                    var e = i.status,
                                        o = i.getAllResponseHeaders();
                                    if ('json' == n.dataType)
                                        try {
                                            n.success(e, JSON.parse(i.responseText), o);
                                        } catch (t) {
                                            n.success(e, i.responseText, o);
                                        }
                                    else n.success(e, i.responseText, o);
                                }
                            } else
                                s.Log.i(r.TAG, 'facebook request, failed:', i.responseText),
                                    1 < t ? r.request(n, t - 1) : n.fail && n.fail(i.status, i.responseText);
                    }),
                        i.send(JSON.stringify(n.data));
                }),
                (t.prototype.getPlatformInfo = function () {
                    var t = new s.PlatformInfo();
                    (t.language = FBInstant.getLocale()),
                        (t.platform = FBInstant.getPlatform()),
                        (t.SDKVersion = FBInstant.getSDKVersion());
                    try {
                        (t.screenWidth = window.screen.width), (t.screenHeight = window.screen.height);
                    } catch (t) {
                        s.Log.w(this.TAG, 'exception occur while collecting platform info');
                    }
                    return t;
                }),
                (t.prototype.setStorage = function (t, e) {
                    this.isLocalStorageAvailable()
                        ? window.localStorage.setItem(t, e)
                        : this.isSessionAvailable()
                        ? window.sessionStorage.setItem(t, e)
                        : s.Log.w(this.TAG, 'storage api is unavailable');
                }),
                (t.prototype.getStorage = function (t) {
                    return this.isLocalStorageAvailable()
                        ? window.localStorage.getItem(t)
                        : this.isSessionAvailable()
                        ? window.sessionStorage.getItem(t)
                        : void s.Log.w(this.TAG, 'storage api is unavailable');
                }),
                (t.prototype.delStorage = function (t) {
                    this.isLocalStorageAvailable()
                        ? window.localStorage.removeItem(t)
                        : this.isSessionAvailable()
                        ? window.sessionStorage.removeItem(t)
                        : s.Log.w(this.TAG, 'storage api is unavailable');
                }),
                (t.prototype.isSessionAvailable = function () {
                    return !!window.sessionStorage;
                }),
                (t.prototype.isLocalStorageAvailable = function () {
                    return !!window.localStorage;
                }),
                (t.prototype.skipGame = function (t, e) {
                    return !1;
                }),
                (t.prototype.getNativePosId = function (t) {
                    return t ? t.getStr(s.MGBAdPosIdCfg.KEY_NATIVE_POSID_FB, '') : '';
                }),
                t
            );
        })();
        s.PlatformImpl4FB = t;
    })(MGB || (MGB = {})),
    (function (d) {
        var t = (function () {
            function a() {
                (this.mbEnteredBackground = !1), this.init();
            }
            return (
                (a.prototype.init = function () {
                    var t = (function () {
                        function t(t) {
                            (this.TAG = 'MGB_PlatformImpl4QQ'), (this.platformImpl = null), (this.platformImpl = t);
                        }
                        return (
                            (t.prototype.onLoad = function (t) {}),
                            (t.prototype.onMaximize = function (t) {}),
                            (t.prototype.onMinimize = function (t) {}),
                            (t.prototype.onEnterBackground = function (t) {
                                this.platformImpl.mbEnteredBackground = !0;
                            }),
                            (t.prototype.onEnterForeground = function (t) {
                                this.platformImpl.mbEnteredBackground = !1;
                            }),
                            (t.prototype.onClose = function (t) {}),
                            t
                        );
                    })();
                    new BK.Game(new t(this));
                }),
                (a.prototype.getLaunchParameter = function () {
                    var t = new d.LaunchOption();
                    if (this.mbEnteredBackground) return t;
                    var e = GameStatusInfo.gameParam;
                    if (e) {
                        for (var o = {}, n = ('?' === e[0] ? e.substr(1) : e).split('&'), r = 0; r < n.length; r++) {
                            var i = n[r].split('=');
                            o[decodeURIComponent(i[0])] = decodeURIComponent(i[1] || '');
                        }
                        t.query = o;
                    }
                    return (t.shareTicket = GameStatusInfo.aioType.toString()), t;
                }),
                (a.prototype.request = function (n, r) {
                    var i = this,
                        t = n.method ? n.method : 'POST',
                        e = new BK.HttpUtil(n.url);
                    if ((e.setHttpReferer('sqimg.qq.com'), e.setHttpMethod(t), n.header))
                        for (var o in n.header) e.setHttpHeader(o, n.header[o]);
                    if (n.data) {
                        var s = new BK.Buffer(0, !1);
                        s.writeAsString(JSON.stringify(n.data), !1), e.setHttpRawBody(s);
                    }
                    e.requestAsync(function (t, e) {
                        var o = t.readAsString(!1);
                        if (200 == e) {
                            if (n.success)
                                if ('json' == n.dataType)
                                    try {
                                        n.success(e, JSON.parse(o), null);
                                    } catch (t) {
                                        d.Log.e(a.TAG, 'success 2. rsp:' + o), n.success(e, o, null);
                                    }
                                else n.success(e, o, null);
                        } else if ((d.Log.e(a.TAG, 'code(' + e + ') != 200'), 0 < r)) i.request(n, r - 1);
                        else if (n.fail)
                            if ('json' == n.dataType)
                                try {
                                    n.fail(e, JSON.parse(o));
                                } catch (t) {
                                    n.fail(e, o);
                                }
                            else n.fail(e, o);
                    });
                }),
                (a.prototype.getPlatformInfo = function () {
                    var t = new d.PlatformInfo();
                    return (
                        (t.version = GameStatusInfo.QQVer),
                        (t.system = GameStatusInfo.platform + ' ' + GameStatusInfo.osVersion),
                        (t.screenWidth = BK.Director.screenPixelSize.width),
                        (t.screenHeight = BK.Director.screenPixelSize.height),
                        (t.platform = GameStatusInfo.platform),
                        t
                    );
                }),
                (a.prototype.setStorage = function (t, e) {
                    d.GameEngineProxy.setLocalItem(t, e);
                }),
                (a.prototype.getStorage = function (t) {
                    return d.GameEngineProxy.getLocalItem(t);
                }),
                (a.prototype.delStorage = function (t) {
                    d.GameEngineProxy.removeLocalItem(t);
                }),
                (a.prototype.skipGame = function (t, e, o) {
                    if (!BK.QQ.skipGame)
                        return d.Log.i(a.TAG, 'BK.QQ.skipGame undefined.'), o && o.fail && o.fail(null), !1;
                    var n = MGRPT.MGCroProTag.KEY_CROSS_PROMOTION_TAG,
                        r = MGRPT.MGCmnRptModule.getCroProTag().fetch(),
                        i = MGRPT.MGCmnRptModule.getInfocEnvCfg(),
                        s = {};
                    return (
                        (s[n] = r),
                        (s.cm_game_id = i.game_id),
                        BK.QQ.skipGame(e.gameidQQ, JSON.stringify(s)),
                        d.Log.i(a.TAG, 'after call BK.QQ.skipGame. gameid_qq:' + e.gameidQQ),
                        o && o.success && o.success(null),
                        !0
                    );
                }),
                (a.getDataPath = function () {
                    BK.FileUtil.isFileExist(a.DATA_DIR) || BK.FileUtil.makeDir(a.DATA_DIR);
                    var t = a.DATA_DIR + GameStatusInfo.openId + '/';
                    return BK.FileUtil.isFileExist(t) || BK.FileUtil.makeDir(t), t;
                }),
                (a.prototype.getNativePosId = function (t) {
                    return t ? t.getStr(d.MGBAdPosIdCfg.KEY_NATIVE_POSID_QQ, '') : '';
                }),
                (a.TAG = 'MGB_PlatformImpl4QQ'),
                (a.DATA_DIR = 'GameSandBox://data4ad/'),
                a
            );
        })();
        d.PlatformImpl4QQ = t;
    })(MGB || (MGB = {})),
    (function (A) {
        var t = (function () {
            function d() {}
            return (
                (d.prototype.getLaunchParameter = function () {
                    return wx.getLaunchOptionsSync();
                }),
                (d.prototype.login = function (t) {
                    wx.login({
                        success: function (t) {
                            A.Log.i(d.TAG, 'WX login success. # code:' + t.code);
                        },
                        fail: function (t) {
                            A.Log.i(d.TAG, 'WX login failed. # code:' + t.code + ', errmsg:' + t.errMsg);
                        },
                    });
                }),
                (d.prototype.getUserSetting = function (e) {
                    wx.getSetting({
                        success: function (t) {
                            e.success && e.success(t.authSetting);
                        },
                        fail: function () {
                            e.fail && e.fail();
                        },
                    });
                }),
                (d.prototype.request = function (e, t) {
                    var o = this;
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
                            1 < t ? o.request(e, t - 1) : e.fail && e.fail(-1, null);
                        },
                    });
                }),
                (d.prototype.getPlatformInfo = function () {
                    return wx.getSystemInfoSync();
                }),
                (d.prototype.setStorage = function (t, e) {
                    wx.setStorageSync(t, e);
                }),
                (d.prototype.getStorage = function (t) {
                    return wx.getStorageSync(t);
                }),
                (d.prototype.delStorage = function (t) {
                    wx.removeStorageSync(t);
                }),
                (d.prototype.skipGame = function (t, e, o) {
                    if (!wx || !wx.navigateToMiniProgram)
                        return A.Log.i(d.TAG, 'wx.navigateToMiniProgram undefined.'), !1;
                    var n = MGRPT.MGCroProTag.KEY_CROSS_PROMOTION_TAG,
                        r = MGRPT.MGCmnRptModule.getCroProTag().fetch(),
                        i = MGRPT.MGCmnRptModule.getInfocEnvCfg(),
                        s = {};
                    (s[n] = r), (s.cm_game_id = i.game_id);
                    var a = {
                        appId: e.getGameId(),
                        extraData: s,
                        success: function (t) {
                            A.Log.i(d.TAG, 'navigateToMiniProgram success(). res:' + JSON.stringify(t)),
                                o && o.success && o.success(t);
                        },
                        fail: function (t) {
                            A.Log.i(d.TAG, 'navigateToMiniProgram fail(). res:' + JSON.stringify(t)),
                                o && o.fail && o.fail(t);
                        },
                        complete: function (t) {
                            A.Log.i(d.TAG, 'navigateToMiniProgram complete(). res:' + JSON.stringify(t));
                        },
                    };
                    return wx.navigateToMiniProgram(a), !0;
                }),
                (d.prototype.getNativePosId = function (t) {
                    return t ? t.getStr(A.MGBAdPosIdCfg.KEY_NATIVE_POSID_WX, '') : '';
                }),
                (d.TAG = 'MGB_PlatformImpl4WX'),
                d
            );
        })();
        A.PlatformImpl4WX = t;
    })(MGB || (MGB = {})),
    (function (s) {
        var t = (function () {
            function t() {
                this.TAG = 'MGB_PlatformImpl4Web';
            }
            return (
                (t.prototype.getLaunchParameter = function () {
                    return new s.LaunchOption();
                }),
                (t.prototype.request = function (n, t) {
                    var r = this;
                    s.Log.i(this.TAG, 'reqeust params: ' + n);
                    var i = new XMLHttpRequest();
                    for (var e in (i.open(n.method, n.url), n.header)) i.setRequestHeader(e, n.header[e]);
                    (i.onreadystatechange = function () {
                        if (4 == i.readyState)
                            if (200 == i.status) {
                                if ((s.Log.i(r.TAG, 'request, succeed:', i.responseText), n.success)) {
                                    var e = i.status,
                                        o = i.getAllResponseHeaders();
                                    if ('json' == n.dataType)
                                        try {
                                            n.success(e, JSON.parse(i.responseText), o);
                                        } catch (t) {
                                            n.success(e, i.responseText, o);
                                        }
                                    else n.success(e, i.responseText, o);
                                }
                            } else
                                s.Log.i(r.TAG, 'request, failed:', i.responseText),
                                    1 < t ? r.request(n, t - 1) : n.fail && n.fail(i.status, i.responseText);
                    }),
                        i.send(JSON.stringify(n.data));
                }),
                (t.prototype.getPlatformInfo = function () {
                    var t = new s.PlatformInfo();
                    t.platform = 'web';
                    try {
                        (t.system = navigator.platform),
                            (t.model = navigator.appName),
                            (t.version = navigator.appVersion),
                            (t.language = navigator.language),
                            (t.screenWidth = window.screen.width),
                            (t.screenHeight = window.screen.height);
                    } catch (t) {
                        s.Log.w(this.TAG, 'exception occur while collecting platform info');
                    }
                    return t;
                }),
                (t.prototype.setStorage = function (t, e) {
                    this.isLocalStorageAvailable()
                        ? window.localStorage.setItem(t, e)
                        : this.isSessionAvailable()
                        ? window.sessionStorage.setItem(t, e)
                        : s.Log.w(this.TAG, 'storage api is unavailable');
                }),
                (t.prototype.getStorage = function (t) {
                    return this.isLocalStorageAvailable()
                        ? window.localStorage.getItem(t)
                        : this.isSessionAvailable()
                        ? window.sessionStorage.getItem(t)
                        : void s.Log.w(this.TAG, 'storage api is unavailable');
                }),
                (t.prototype.delStorage = function (t) {
                    this.isLocalStorageAvailable()
                        ? window.localStorage.removeItem(t)
                        : this.isSessionAvailable()
                        ? window.sessionStorage.removeItem(t)
                        : s.Log.w(this.TAG, 'storage api is unavailable');
                }),
                (t.prototype.isSessionAvailable = function () {
                    return !!window.sessionStorage;
                }),
                (t.prototype.isLocalStorageAvailable = function () {
                    return !!window.localStorage;
                }),
                (t.prototype.skipGame = function (t, e) {
                    return !1;
                }),
                (t.prototype.getNativePosId = function (t) {
                    return '';
                }),
                t
            );
        })();
        s.PlatformImpl4Web = t;
    })(MGB || (MGB = {})),
    (function (e) {
        var t = (function () {
            function t() {
                (this.mPlatformCur = null), (this.mInfocEnvCfg = null);
            }
            return (
                (t.getInstance = function () {
                    return null != this.sInst || (this.sInst = new t()), this.sInst;
                }),
                (t.prototype.init = function (t) {
                    if (!this.mPlatformCur)
                        switch (t) {
                            case e.MGBAdDefs.PLATFORM_WX:
                                this.mPlatformCur = new e.PlatformImpl4WX();
                                break;
                            case e.MGBAdDefs.PLATFORM_QQ:
                                this.mPlatformCur = new e.PlatformImpl4QQ();
                                break;
                            case e.MGBAdDefs.PLATFORM_WEB:
                                this.mPlatformCur = new e.PlatformImpl4Web();
                                break;
                            case e.MGBAdDefs.PLATFORM_FB:
                                this.mPlatformCur = new e.PlatformImpl4FB();
                        }
                }),
                (t.prototype.request = function (t, e) {
                    void 0 === e && (e = 3),
                        this.mPlatformCur ? this.mPlatformCur.request(t, e) : t && t.fail && t.fail(0, null);
                }),
                (t.prototype.getPlatformInfo = function () {
                    return this.mPlatformCur ? this.mPlatformCur.getPlatformInfo() : null;
                }),
                (t.prototype.setStorage = function (t, e) {
                    if (!this.mPlatformCur) return null;
                    this.mPlatformCur.setStorage(t, e);
                }),
                (t.prototype.getStorage = function (t) {
                    return this.mPlatformCur ? this.mPlatformCur.getStorage(t) : null;
                }),
                (t.prototype.delStorage = function (t) {
                    if (!this.mPlatformCur) return null;
                    this.mPlatformCur.delStorage(t);
                }),
                (t.prototype.skipGame = function (t, e, o) {
                    return void 0 === o && (o = null), !!this.mPlatformCur && this.mPlatformCur.skipGame(t, e, o);
                }),
                (t.prototype.getNativePosId = function (t) {
                    return this.mPlatformCur ? this.mPlatformCur.getNativePosId(t) : '';
                }),
                (t.sInst = null),
                t
            );
        })();
        e.PlatformProxy = t;
    })(MGB || (MGB = {})),
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
                    for (var e = 0; e < this.arr.length; e++) if (this.arr[e].key === t) return this.arr[e].value;
                    return null;
                }),
                (t.prototype.getPair = function (t) {
                    for (var e = 0; e < this.arr.length; e++) if (this.arr[e].key === t) return this.arr[e];
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
    })(MGB || (MGB = {})),
    (function (r) {
        var t = (function () {
            function n() {}
            return (
                (n.i = function (t) {
                    for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
                    n.isEnableLog() &&
                        (r.PlatformChecker.getPlatformType() == r.MGBAdDefs.PLATFORM_QQ
                            ? BK.Script.log(1, 1, t + this.GetOptionalMsg(e))
                            : console.info(n.getPrefix(), t, e));
                }),
                (n.w = function (t) {
                    for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
                    n.isEnableLog() &&
                        (r.PlatformChecker.getPlatformType() == r.MGBAdDefs.PLATFORM_QQ
                            ? BK.Script.log(1, 1, t + this.GetOptionalMsg(e))
                            : console.warn(n.getPrefix(), t, e));
                }),
                (n.e = function (t) {
                    for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
                    n.isEnableLog() &&
                        (r.PlatformChecker.getPlatformType() == r.MGBAdDefs.PLATFORM_QQ
                            ? BK.Script.log(1, 1, t + this.GetOptionalMsg(e))
                            : console.error(n.getPrefix(), t, e));
                }),
                (n.f = function (t) {
                    for (var e = [], o = 1; o < arguments.length; o++) e[o - 1] = arguments[o];
                    n.isEnableLog() &&
                        (r.PlatformChecker.getPlatformType() == r.MGBAdDefs.PLATFORM_QQ
                            ? BK.Script.log(1, 1, t + this.GetOptionalMsg(e))
                            : console.error(n.getPrefix(), t, e));
                }),
                (n.formatDateTime = function () {
                    var t = new Date(),
                        e = t.getHours().toString(),
                        o = t.getMinutes().toString(),
                        n = t.getSeconds().toString(),
                        r = t.getMilliseconds().toString();
                    if ((o.length < 2 && (o = '0' + o), n.length < 2 && (n = '0' + n), r.length < 3))
                        for (var i = 0; i < 3 - r.length; i++) r = '0' + r;
                    return e + ':' + o + ':' + n + ' ' + r;
                }),
                (n.getPrefix = function () {
                    return '[' + n.formatDateTime() + '] ';
                }),
                (n.GetOptionalMsg = function () {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    var o = '';
                    for (var n in t) o += ' ' + t[n];
                    return o;
                }),
                (n.enableLog = function (t) {
                    n.sEnable = t;
                }),
                (n.isEnableLog = function () {
                    return n.sEnable;
                }),
                (n.sEnable = !0),
                n
            );
        })();
        r.Log = t;
    })(MGB || (MGB = {})),
    (function (t) {
        var i = 0,
            s = '';

        function e(t) {
            return r(o(A(t)));
        }

        function o(t) {
            return u(l(c(t), 8 * t.length));
        }

        function n(t, e) {
            var o = c(t);
            16 < o.length && (o = l(o, 8 * t.length));
            for (var n = Array(16), r = Array(16), i = 0; i < 16; i++)
                (n[i] = 909522486 ^ o[i]), (r[i] = 1549556828 ^ o[i]);
            var s = l(n.concat(c(e)), 512 + 8 * e.length);
            return u(l(r.concat(s), 672));
        }

        function r(t) {
            for (var e, o = i ? '0123456789ABCDEF' : '0123456789abcdef', n = '', r = 0; r < t.length; r++)
                (e = t.charCodeAt(r)), (n += o.charAt((e >>> 4) & 15) + o.charAt(15 & e));
            return n;
        }

        function a(t) {
            for (var e = '', o = t.length, n = 0; n < o; n += 3)
                for (
                    var r =
                            (t.charCodeAt(n) << 16) |
                            (n + 1 < o ? t.charCodeAt(n + 1) << 8 : 0) |
                            (n + 2 < o ? t.charCodeAt(n + 2) : 0),
                        i = 0;
                    i < 4;
                    i++
                )
                    8 * n + 6 * i > 8 * t.length
                        ? (e += s)
                        : (e += 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.charAt(
                              (r >>> (6 * (3 - i))) & 63,
                          ));
            return e;
        }

        function d(t, e) {
            var o,
                n,
                r,
                i,
                s = e.length,
                a = Array(),
                d = Array(Math.ceil(t.length / 2));
            for (o = 0; o < d.length; o++) d[o] = (t.charCodeAt(2 * o) << 8) | t.charCodeAt(2 * o + 1);
            for (; 0 < d.length; ) {
                for (i = Array(), o = r = 0; o < d.length; o++)
                    (r = (r << 16) + d[o]),
                        (r -= (n = Math.floor(r / s)) * s),
                        (0 < i.length || 0 < n) && (i[i.length] = n);
                (a[a.length] = r), (d = i);
            }
            var A = '';
            for (o = a.length - 1; 0 <= o; o--) A += e.charAt(a[o]);
            var c = Math.ceil((8 * t.length) / (Math.log(e.length) / Math.log(2)));
            for (o = A.length; o < c; o++) A = e[0] + A;
            return A;
        }

        function A(t) {
            for (var e, o, n = '', r = -1; ++r < t.length; )
                (e = t.charCodeAt(r)),
                    (o = r + 1 < t.length ? t.charCodeAt(r + 1) : 0),
                    55296 <= e &&
                        e <= 56319 &&
                        56320 <= o &&
                        o <= 57343 &&
                        ((e = 65536 + ((1023 & e) << 10) + (1023 & o)), r++),
                    e <= 127
                        ? (n += String.fromCharCode(e))
                        : e <= 2047
                        ? (n += String.fromCharCode(192 | ((e >>> 6) & 31), 128 | (63 & e)))
                        : e <= 65535
                        ? (n += String.fromCharCode(224 | ((e >>> 12) & 15), 128 | ((e >>> 6) & 63), 128 | (63 & e)))
                        : e <= 2097151 &&
                          (n += String.fromCharCode(
                              240 | ((e >>> 18) & 7),
                              128 | ((e >>> 12) & 63),
                              128 | ((e >>> 6) & 63),
                              128 | (63 & e),
                          ));
            return n;
        }

        function c(t) {
            for (var e = Array(t.length >> 2), o = 0; o < e.length; o++) e[o] = 0;
            for (o = 0; o < 8 * t.length; o += 8) e[o >> 5] |= (255 & t.charCodeAt(o / 8)) << (24 - (o % 32));
            return e;
        }

        function u(t) {
            for (var e = '', o = 0; o < 32 * t.length; o += 8)
                e += String.fromCharCode((t[o >> 5] >>> (24 - (o % 32))) & 255);
            return e;
        }

        function l(t, e) {
            (t[e >> 5] |= 128 << (24 - (e % 32))), (t[15 + (((e + 64) >> 9) << 4)] = e);
            for (
                var o,
                    n = Array(80),
                    r = 1732584193,
                    i = -271733879,
                    s = -1732584194,
                    a = 271733878,
                    d = -1009589776,
                    A = 0;
                A < t.length;
                A += 16
            ) {
                for (var c = r, u = i, l = s, m = a, h = d, f = 0; f < 80; f++) {
                    n[f] = f < 16 ? t[A + f] : C(n[f - 3] ^ n[f - 8] ^ n[f - 14] ^ n[f - 16], 1);
                    var p = g(
                        g(C(r, 5), _(f, i, s, a)),
                        g(
                            g(d, n[f]),
                            (o = f) < 20 ? 1518500249 : o < 40 ? 1859775393 : o < 60 ? -1894007588 : -899497514,
                        ),
                    );
                    (d = a), (a = s), (s = C(i, 30)), (i = r), (r = p);
                }
                (r = g(r, c)), (i = g(i, u)), (s = g(s, l)), (a = g(a, m)), (d = g(d, h));
            }
            return Array(r, i, s, a, d);
        }

        function _(t, e, o, n) {
            return t < 20 ? (e & o) | (~e & n) : t < 40 ? e ^ o ^ n : t < 60 ? (e & o) | (e & n) | (o & n) : e ^ o ^ n;
        }

        function g(t, e) {
            var o = (65535 & t) + (65535 & e);
            return (((t >> 16) + (e >> 16) + (o >> 16)) << 16) | (65535 & o);
        }

        function C(t, e) {
            return (t << e) | (t >>> (32 - e));
        }
        (t.hex_sha1 = e),
            (t.b64_sha1 = function (t) {
                return a(o(A(t)));
            }),
            (t.any_sha1 = function (t, e) {
                return d(o(A(t)), e);
            }),
            (t.hex_hmac_sha1 = function (t, e) {
                return r(n(A(t), A(e)));
            }),
            (t.b64_hmac_sha1 = function (t, e) {
                return a(n(A(t), A(e)));
            }),
            (t.any_hmac_sha1 = function (t, e, o) {
                return d(n(A(t), A(e)), o);
            });
    })(MGB || (MGB = {})),
    (function (t) {
        var e = (function () {
            function t() {}
            return (
                (t.formatDate = function (t) {
                    var e = t.getFullYear(),
                        o = t.getMonth() + 1,
                        n = o < 10 ? '0' + o : o + '',
                        r = t.getDate();
                    return e + '-' + n + '-' + (r < 10 ? '0' + r : r + '');
                }),
                t
            );
        })();
        t.TimeUtil = e;
    })(MGB || (MGB = {}));
