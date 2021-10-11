(window.onShare = function (n, e, o, r) {
  if ('undefined' != typeof GameJs)
    try {
      if (GameJs && GameJs.onShare) {
        console.log('CMPlayShare onShare supported'),
          GameJs.onShare(Infoc_Page_BrickesNBalls, n, e, o);
        r({
          result: !0,
        });
      } else console.log('onShare not supported!!!');
    } catch (n) {
      console.log('onShare', n);
    }
}),
  (window.getQueryString = function (n) {
    var e = window.location.search;
    if (null == e || -1 === e.indexOf('?')) return 'zh';
    if ((e = e.substr(1) || window.location.hash.split('?')[1])) {
      var o = new RegExp('(^|&)' + n + '=([^&]*)(&|$)'),
        r = e.match(o);
      return null != r ? decodeURIComponent(r[2]) : 'zh';
    }
  }),
  (window.getQueryStringRegion = function (n, e) {
    var o = window.location.search;
    if (null == o || -1 === o.indexOf('?')) return e;
    if ((o = o.substr(1) || window.location.hash.split('?')[1])) {
      var r = new RegExp('(^|&)' + n + '=([^&]*)(&|$)'),
        t = o.match(r);
      return null != t ? decodeURIComponent(t[2]) : e;
    }
  });
