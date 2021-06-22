(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],2:[function(require,module,exports){
(function (global){(function (){
var getStroke = require("perfect-freehand").default

global.window.getStroke = getStroke

}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"perfect-freehand":3}],3:[function(require,module,exports){
(function (process){(function (){

'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./perfect-freehand.cjs.production.min.js')
} else {
  module.exports = require('./perfect-freehand.cjs.development.js')
}

}).call(this)}).call(this,require('_process'))
},{"./perfect-freehand.cjs.development.js":4,"./perfect-freehand.cjs.production.min.js":5,"_process":1}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * Negate a vector.
 * @param A
 */
/**
 * Add vectors.
 * @param A
 * @param B
 */

function add(A, B) {
  return [A[0] + B[0], A[1] + B[1]];
}
/**
 * Subtract vectors.
 * @param A
 * @param B
 */

function sub(A, B) {
  return [A[0] - B[0], A[1] - B[1]];
}
/**
 * Get the vector from vectors A to B.
 * @param A
 * @param B
 */

function vec(A, B) {
  // A, B as vectors get the vector from A to B
  return [B[0] - A[0], B[1] - A[1]];
}
/**
 * Vector multiplication by scalar
 * @param A
 * @param n
 */

function mul(A, n) {
  return [A[0] * n, A[1] * n];
}
/**
 * Vector division by scalar.
 * @param A
 * @param n
 */

function div(A, n) {
  return [A[0] / n, A[1] / n];
}
/**
 * Perpendicular rotation of a vector A
 * @param A
 */

function per(A) {
  return [A[1], -A[0]];
}
/**
 * Dot product
 * @param A
 * @param B
 */

function dpr(A, B) {
  return A[0] * B[0] + A[1] * B[1];
}
/**
 * Length of the vector
 * @param A
 */

function len(A) {
  return Math.hypot(A[0], A[1]);
}
/**
 * Length of the vector squared
 * @param A
 */

function len2(A) {
  return A[0] * A[0] + A[1] * A[1];
}
/**
 * Dist length from A to B squared.
 * @param A
 * @param B
 */

function dist2(A, B) {
  return len2(sub(A, B));
}
/**
 * Get normalized / unit vector.
 * @param A
 */

function uni(A) {
  return div(A, len(A));
}
/**
 * Dist length from A to B
 * @param A
 * @param B
 */

function dist(A, B) {
  return Math.hypot(A[1] - B[1], A[0] - B[0]);
}
/**
 * Rotate a vector around another vector by r (radians)
 * @param A vector
 * @param C center
 * @param r rotation in radians
 */

function rotAround(A, C, r) {
  var s = Math.sin(r);
  var c = Math.cos(r);
  var px = A[0] - C[0];
  var py = A[1] - C[1];
  var nx = px * c - py * s;
  var ny = px * s + py * c;
  return [nx + C[0], ny + C[1]];
}
/**
 * Interpolate vector A to B with a scalar t
 * @param A
 * @param B
 * @param t scalar
 */

function lrp(A, B, t) {
  return add(A, mul(vec(A, B), t));
} //  isLeft: >0 for counterclockwise
function isEqual(a, b) {
  return a[0] === b[0] && a[1] === b[1];
}

function lerp(y1, y2, mu) {
  return y1 * (1 - mu) + y2 * mu;
}
function clamp(n, a, b) {
  return Math.max(a, Math.min(b, n));
}
/**
 * Convert an array of points to the correct format ([x, y, radius])
 * @param points
 * @returns
 */

function toPointsArray(points) {
  if (Array.isArray(points[0])) {
    return points.map(function (_ref) {
      var x = _ref[0],
          y = _ref[1],
          _ref$ = _ref[2],
          pressure = _ref$ === void 0 ? 0.5 : _ref$;
      return [x, y, pressure];
    });
  } else {
    return points.map(function (_ref2) {
      var x = _ref2.x,
          y = _ref2.y,
          _ref2$pressure = _ref2.pressure,
          pressure = _ref2$pressure === void 0 ? 0.5 : _ref2$pressure;
      return [x, y, pressure];
    });
  }
}
/**
 * Compute a radius based on the pressure.
 * @param size
 * @param thinning
 * @param easing
 * @param pressure
 * @returns
 */

function getStrokeRadius(size, thinning, easing, pressure) {
  if (pressure === void 0) {
    pressure = 0.5;
  }

  if (!thinning) return size / 2;
  pressure = clamp(easing(pressure), 0, 1);
  return (thinning < 0 ? lerp(size, size + size * clamp(thinning, -0.95, -0.05), pressure) : lerp(size - size * clamp(thinning, 0.05, 0.95), size, pressure)) / 2;
}

var min = Math.min,
    PI = Math.PI;
/**
 * ## getStrokePoints
 * @description Get points for a stroke.
 * @param points An array of points (as `[x, y, pressure]` or `{x, y, pressure}`). Pressure is optional.
 * @param streamline How much to streamline the stroke.
 * @param size The stroke's size.
 */

function getStrokePoints(points, options) {
  var _options$simulatePres = options.simulatePressure,
      simulatePressure = _options$simulatePres === void 0 ? true : _options$simulatePres,
      _options$streamline = options.streamline,
      streamline = _options$streamline === void 0 ? 0.5 : _options$streamline,
      _options$size = options.size,
      size = _options$size === void 0 ? 8 : _options$size;
  streamline /= 2;

  if (!simulatePressure) {
    streamline /= 2;
  }

  var pts = toPointsArray(points);
  var len = pts.length;
  if (len === 0) return [];
  if (len === 1) pts.push(add(pts[0], [1, 0]));
  var strokePoints = [{
    point: [pts[0][0], pts[0][1]],
    pressure: pts[0][2],
    vector: [0, 0],
    distance: 0,
    runningLength: 0
  }];

  for (var i = 1, curr = pts[i], prev = strokePoints[0], j = 0; i < pts.length; i++, curr = pts[i], prev = strokePoints[j]) {

    var point = lrp(prev.point, curr, 1 - streamline);
    if (isEqual(prev.point, point)) {
        continue;
    }
    j += 1;
    var pressure = curr[2];
    var vector = uni(vec(point, prev.point));
    var distance = dist(point, prev.point);
    var runningLength = prev.runningLength + distance;
    strokePoints.push({
      point: point,
      pressure: pressure,
      vector: vector,
      distance: distance,
      runningLength: runningLength
    });
  }
  /*
    Align vectors at the end of the line
       Starting from the last point, work back until we've traveled more than
    half of the line's size (width). Take the current point's vector and then
    work forward, setting all remaining points' vectors to this vector. This
    removes the "noise" at the end of the line and allows for a better-facing
    end cap.
  */


  len = strokePoints.length;
  var totalLength = strokePoints[len - 1].runningLength;

  for (var _i = len - 2; _i > 1; _i--) {
    var _strokePoints$_i = strokePoints[_i],
        _runningLength = _strokePoints$_i.runningLength,
        _vector = _strokePoints$_i.vector;
    var dpr$1 = dpr(strokePoints[_i - 1].vector, strokePoints[_i].vector);

    if (totalLength - _runningLength > size / 2 || dpr$1 < 0.8) {
      for (var j = _i; j < len; j++) {
        strokePoints[j].vector = _vector;
      }

      break;
    }
  }

  return strokePoints;
}
/**
 * ## getStrokeOutlinePoints
 * @description Get an array of points (as `[x, y]`) representing the outline of a stroke.
 * @param points An array of points (as `[x, y, pressure]` or `{x, y, pressure}`). Pressure is optional.
 * @param options An (optional) object with options.
 * @param options.size	The base size (diameter) of the stroke.
 * @param options.thinning The effect of pressure on the stroke's size.
 * @param options.smoothing	How much to soften the stroke's edges.
 * @param options.easing	An easing function to apply to each point's pressure.
 * @param options.simulatePressure Whether to simulate pressure based on velocity.
 * @param options.start Tapering and easing function for the start of the line.
 * @param options.end Tapering and easing function for the end of the line.
 * @param options.last Whether to handle the points as a completed stroke.
 */

function getStrokeOutlinePoints(points, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$size2 = _options.size,
      size = _options$size2 === void 0 ? 8 : _options$size2,
      _options$thinning = _options.thinning,
      thinning = _options$thinning === void 0 ? 0.5 : _options$thinning,
      _options$smoothing = _options.smoothing,
      smoothing = _options$smoothing === void 0 ? 0.5 : _options$smoothing,
      _options$simulatePres2 = _options.simulatePressure,
      simulatePressure = _options$simulatePres2 === void 0 ? true : _options$simulatePres2,
      _options$easing = _options.easing,
      easing = _options$easing === void 0 ? function (t) {
    return t;
  } : _options$easing,
      _options$start = _options.start,
      start = _options$start === void 0 ? {} : _options$start,
      _options$end = _options.end,
      end = _options$end === void 0 ? {} : _options$end,
      _options$last = _options.last,
      isComplete = _options$last === void 0 ? false : _options$last;
  var _options2 = options,
      _options2$streamline = _options2.streamline,
      streamline = _options2$streamline === void 0 ? 0.5 : _options2$streamline;
  streamline /= 2;
  var _start$taper = start.taper,
      taperStart = _start$taper === void 0 ? 0 : _start$taper,
      _start$easing = start.easing,
      taperStartEase = _start$easing === void 0 ? function (t) {
    return t * (2 - t);
  } : _start$easing;
  var _end$taper = end.taper,
      taperEnd = _end$taper === void 0 ? 0 : _end$taper,
      _end$easing = end.easing,
      taperEndEase = _end$easing === void 0 ? function (t) {
    return --t * t * t + 1;
  } : _end$easing; // The number of points in the array

  var len = points.length; // We can't do anything with an empty array.

  if (len === 0) return []; // The total length of the line

  var totalLength = points[len - 1].runningLength; // Our collected left and right points

  var leftPts = [];
  var rightPts = []; // Previous pressure (start with average of first five pressures)

  var prevPressure = points.slice(0, 5).reduce(function (acc, cur) {
    return (acc + cur.pressure) / 2;
  }, points[0].pressure); // The current radius

  var radius = getStrokeRadius(size, thinning, easing, points[len - 1].pressure); // Previous vector

  var prevVector = points[0].vector; // Previous left and right points

  var pl = points[0].point;
  var pr = pl; // Temporary left and right points

  var tl = pl;
  var tr = pr;
  /*
    Find the outline's left and right points
      Iterating through the points and populate the rightPts and leftPts arrays,
   skipping the first and last pointsm, which will get caps later on.
  */

  for (var i = 1; i < len - 1; i++) {
    var _points$i = points[i],
        point = _points$i.point,
        pressure = _points$i.pressure,
        vector = _points$i.vector,
        distance = _points$i.distance,
        runningLength = _points$i.runningLength;
    /*
      Calculate the radius
           If not thinning, the current point's radius will be half the size; or
      otherwise, the size will be based on the current (real or simulated)
      pressure.
    */

    if (thinning) {
      if (simulatePressure) {
        var rp = min(1, 1 - distance / size);
        var sp = min(1, distance / size);
        pressure = min(1, prevPressure + (rp - prevPressure) * (sp / 2));
      }

      radius = getStrokeRadius(size, thinning, easing, pressure);
    } else {
      radius = size / 2;
    }
    /*
      Apply tapering
           If the current length is within the taper distance at either the
      start or the end, calculate the taper strengths. Apply the smaller
      of the two taper strengths to the radius.
    */


    var ts = runningLength < taperStart ? taperStartEase(runningLength / taperStart) : 1;
    var te = totalLength - runningLength < taperEnd ? taperEndEase((totalLength - runningLength) / taperEnd) : 1;
    radius *= Math.min(ts, te);
    /*
      Handle sharp corners
           Find the difference (dot product) between the current and next vector.
      If the next vector is at more than a right angle to the current vector,
      draw a cap at the current point.
    */

    var nextVector = points[i + 1].vector;
    var dpr$1 = dpr(vector, nextVector);

    if (dpr$1 < 0) {
      var _offset = mul(per(prevVector), radius);

      for (var t = 0; t < 1; t += 0.2) {
        tr = rotAround(add(point, _offset), point, PI * -t);
        tl = rotAround(sub(point, _offset), point, PI * t);
        rightPts.push(tr);
        leftPts.push(tl);
      }

      pl = tl;
      pr = tr;
      continue;
    }
    /*
      Add regular points
           Project points to either side of the current point, using the
      calculated size as a distance. If a point's distance to the
      previous point on that side greater than the minimum distance
      (or if the corner is kinda sharp), add the points to the side's
      points array.
    */


    var offset = mul(per(lrp(nextVector, vector, dpr$1)), radius);
    tl = sub(point, offset);
    tr = add(point, offset);
    var alwaysAdd = i === 1 || dpr$1 < 0.25;
    var minDistance = Math.pow((runningLength > size ? size : size / 2) * smoothing, 2);

    if (alwaysAdd || dist2(pl, tl) > minDistance) {
      leftPts.push(lrp(pl, tl, streamline));
      pl = tl;
    }

    if (alwaysAdd || dist2(pr, tr) > minDistance) {
      rightPts.push(lrp(pr, tr, streamline));
      pr = tr;
    } // Set variables for next iteration


    prevPressure = pressure;
    prevVector = vector;
  }
  /*
    Drawing caps

    Now that we have our points on either side of the line, we need to
    draw caps at the start and end. Tapered lines don't have caps, but
    may have dots for very short lines.
  */


  var firstPoint = points[0];
  var lastPoint = points[len - 1];
  var isVeryShort = rightPts.length < 2 || leftPts.length < 2;
  /*
    Draw a dot for very short or completed strokes

    If the line is too short to gather left or right points and if the line is
    not tapered on either side, draw a dot. If the line is tapered, then only
    draw a dot if the line is both very short and complete. If we draw a dot,
    we can just return those points.
  */

  if (isVeryShort && (!(taperStart || taperEnd) || isComplete)) {
    var ir = 0;

    for (var _i2 = 0; _i2 < len; _i2++) {
      var _points$_i = points[_i2],
          _pressure = _points$_i.pressure,
          _runningLength2 = _points$_i.runningLength;

      if (_runningLength2 > size) {
        ir = getStrokeRadius(size, thinning, easing, _pressure);
        break;
      }
    }

    var _start = sub(firstPoint.point, mul(per(uni(vec(lastPoint.point, firstPoint.point))), ir || radius));

    var dotPts = [];

    for (var _t = 0, step = 0.1; _t <= 1; _t += step) {
      dotPts.push(rotAround(_start, firstPoint.point, PI * 2 * _t));
    }

    return dotPts;
  }
  /*
    Draw a start cap
       Unless the line has a tapered start, or unless the line has a tapered end
    and the line is very short, draw a start cap around the first point. Use
    the distance between the second left and right point for the cap's radius.
    Finally remove the first left and right points. :psyduck:
  */


  var startCap = [];

  if (!taperStart && !(taperEnd && isVeryShort)) {
    tr = rightPts[1];

    for (var _i3 = 1; _i3 < leftPts.length; _i3++) {
      if (!isEqual(tr, leftPts[_i3])) {
        tl = leftPts[_i3];
        break;
      }
    }

    if (!isEqual(tr, tl)) {
      var _start2 = sub(firstPoint.point, mul(uni(vec(tr, tl)), dist(tr, tl) / 2));

      for (var _t2 = 0, _step = 0.2; _t2 <= 1; _t2 += _step) {
        startCap.push(rotAround(_start2, firstPoint.point, PI * _t2));
      }

      leftPts.shift();
      rightPts.shift();
    }
  }
  /*
    Draw an end cap
       If the line does not have a tapered end, and unless the line has a tapered
    start and the line is very short, draw a cap around the last point. Finally,
    remove the last left and right points. Otherwise, add the last point. Note
    that This cap is a full-turn-and-a-half: this prevents incorrect caps on
    sharp end turns.
  */


  var endCap = [];

  if (!taperEnd && !(taperStart && isVeryShort)) {
    var _start3 = sub(lastPoint.point, mul(per(lastPoint.vector), radius));

    for (var _t3 = 0, _step2 = 0.1; _t3 <= 1; _t3 += _step2) {
      endCap.push(rotAround(_start3, lastPoint.point, PI * 3 * _t3));
    }
  } else {
    endCap.push(lastPoint.point);
  }
  /*
    Return the points in the correct windind order: begin on the left side, then
    continue around the end cap, then come back along the right side, and finally
    complete the start cap.
  */


  return leftPts.concat(endCap, rightPts.reverse(), startCap);
}
/**
 * ## getStroke
 * @description Returns a stroke as an array of outline points.
 * @param points An array of points (as `[x, y, pressure]` or `{x, y, pressure}`). Pressure is optional.
 * @param options An (optional) object with options.
 * @param options.size	The base size (diameter) of the stroke.
 * @param options.thinning The effect of pressure on the stroke's size.
 * @param options.smoothing	How much to soften the stroke's edges.
 * @param options.easing	An easing function to apply to each point's pressure.
 * @param options.simulatePressure Whether to simulate pressure based on velocity.
 * @param options.start Tapering and easing function for the start of the line.
 * @param options.end Tapering and easing function for the end of the line.
 * @param options.last Whether to handle the points as a completed stroke.
 */

function getStroke(points, options) {
  if (options === void 0) {
    options = {};
  }

  return getStrokeOutlinePoints(getStrokePoints(points, options), options);
}

exports.default = getStroke;
exports.getStrokeOutlinePoints = getStrokeOutlinePoints;
exports.getStrokePoints = getStrokePoints;


},{}],5:[function(require,module,exports){
"use strict";function r(r,n){return[r[0]+n[0],r[1]+n[1]]}function n(r,n){return[r[0]-n[0],r[1]-n[1]]}function t(r,n){return[n[0]-r[0],n[1]-r[1]]}function e(r,n){return[r[0]*n,r[1]*n]}function i(r){return[r[1],-r[0]]}function o(r,n){return r[0]*n[0]+r[1]*n[1]}function u(r,t){return function(r){return r[0]*r[0]+r[1]*r[1]}(n(r,t))}function a(r){return function(r,n){return[r[0]/n,r[1]/n]}(r,function(r){return Math.hypot(r[0],r[1])}(r))}function s(r,n){return Math.hypot(r[1]-n[1],r[0]-n[0])}function v(r,n,t){var e=Math.sin(t),i=Math.cos(t),o=r[0]-n[0],u=r[1]-n[1];return[o*i-u*e+n[0],o*e+u*i+n[1]]}function f(n,i,o){return r(n,e(t(n,i),o))}function c(r,n){return r[0]===n[0]&&r[1]===n[1]}function p(r,n,t){return r*(1-t)+n*t}function h(r,n,t){return Math.max(n,Math.min(t,r))}function d(r,n,t,e){return void 0===e&&(e=.5),n?(e=h(t(e),0,1),(n<0?p(r,r+r*h(n,-.95,-.05),e):p(r-r*h(n,.05,.95),r,e))/2):r/2}Object.defineProperty(exports,"__esModule",{value:!0});var g=Math.min,l=Math.PI;function m(n,e){var i=e.simulatePressure,u=e.streamline,v=void 0===u?.5:u,p=e.size,h=void 0===p?8:p;v/=2,void 0===i||i||(v/=2);var d=function(r){return Array.isArray(r[0])?r.map((function(r){var n=r[2];return[r[0],r[1],void 0===n?.5:n]})):r.map((function(r){var n=r.pressure;return[r.x,r.y,void 0===n?.5:n]}))}(n),g=d.length;if(0===g)return[];1===g&&d.push(r(d[0],[1,0]));for(var l=[{point:[d[0][0],d[0][1]],pressure:d[0][2],vector:[0,0],distance:0,runningLength:0}],m=1,M=d[m],L=l[0];m<d.length;M=d[++m],L=l[m-1]){var x=f(L.point,M,1-v);if(!c(L.point,x)){var y=M[2],P=a(t(x,L.point)),k=s(x,L.point);l.push({point:x,pressure:y,vector:P,distance:k,runningLength:L.runningLength+k})}}for(var b=l[g-1].runningLength,z=g-2;z>1;z--){var A=l[z],O=A.runningLength,S=A.vector,_=o(l[z-1].vector,l[z].vector);if(b-O>h/2||_<.8){for(var j=z;j<g;j++)l[j].vector=S;break}}return l}function M(p,h){void 0===h&&(h={});var m=h.size,M=void 0===m?8:m,L=h.thinning,x=void 0===L?.5:L,y=h.smoothing,P=void 0===y?.5:y,k=h.simulatePressure,b=void 0===k||k,z=h.easing,A=void 0===z?function(r){return r}:z,O=h.start,S=void 0===O?{}:O,_=h.end,j=void 0===_?{}:_,w=h.last,I=void 0!==w&&w,q=h.streamline,B=void 0===q?.5:q;B/=2;var C=S.taper,D=void 0===C?0:C,E=S.easing,F=void 0===E?function(r){return r*(2-r)}:E,G=j.taper,H=void 0===G?0:G,J=j.easing,K=void 0===J?function(r){return--r*r*r+1}:J,N=p.length;if(0===N)return[];for(var Q=p[N-1].runningLength,R=[],T=[],U=p.slice(0,5).reduce((function(r,n){return(r+n.pressure)/2}),p[0].pressure),V=d(M,x,A,p[N-1].pressure),W=p[0].vector,X=p[0].point,Y=X,Z=X,$=Y,rr=1;rr<N-1;rr++){var nr=p[rr],tr=nr.point,er=nr.pressure,ir=nr.vector,or=nr.distance,ur=nr.runningLength;if(x){if(b){var ar=g(1,1-or/M),sr=g(1,or/M);er=g(1,U+sr/2*(ar-U))}V=d(M,x,A,er)}else V=M/2;var vr=ur<D?F(ur/D):1,fr=Q-ur<H?K((Q-ur)/H):1;V*=Math.min(vr,fr);var cr=p[rr+1].vector,pr=o(ir,cr);if(pr<0){for(var hr=e(i(W),V),dr=0;dr<1;dr+=.2)$=v(r(tr,hr),tr,l*-dr),Z=v(n(tr,hr),tr,l*dr),T.push($),R.push(Z);X=Z,Y=$}else{var gr=e(i(f(cr,ir,pr)),V);Z=n(tr,gr),$=r(tr,gr);var lr=1===rr||pr<.25,mr=Math.pow((ur>M?M:M/2)*P,2);(lr||u(X,Z)>mr)&&(R.push(f(X,Z,B)),X=Z),(lr||u(Y,$)>mr)&&(T.push(f(Y,$,B)),Y=$),U=er,W=ir}}var Mr=p[0],Lr=p[N-1],xr=T.length<2||R.length<2;if(xr&&(!D&&!H||I)){for(var yr=0,Pr=0;Pr<N;Pr++){var kr=p[Pr];if(kr.runningLength>M){yr=d(M,x,A,kr.pressure);break}}for(var br=n(Mr.point,e(i(a(t(Lr.point,Mr.point))),yr||V)),zr=[],Ar=0;Ar<=1;Ar+=.1)zr.push(v(br,Mr.point,2*l*Ar));return zr}var Or=[];if(!(D||H&&xr)){$=T[1];for(var Sr=1;Sr<R.length;Sr++)if(!c($,R[Sr])){Z=R[Sr];break}if(!c($,Z)){for(var _r=n(Mr.point,e(a(t($,Z)),s($,Z)/2)),jr=0;jr<=1;jr+=.2)Or.push(v(_r,Mr.point,l*jr));R.shift(),T.shift()}}var wr=[];if(H||D&&xr)wr.push(Lr.point);else for(var Ir=n(Lr.point,e(i(Lr.vector),V)),qr=0;qr<=1;qr+=.1)wr.push(v(Ir,Lr.point,3*l*qr));return R.concat(wr,T.reverse(),Or)}exports.default=function(r,n){return void 0===n&&(n={}),M(m(r,n),n)},exports.getStrokeOutlinePoints=M,exports.getStrokePoints=m;


},{}]},{},[2]);