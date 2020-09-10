function createCommonjsModule(fn, basedir, module) {
	return module = {
	  path: basedir,
	  exports: {},
	  require: function (path, base) {
      return commonjsRequire(path, (base === undefined || base === null) ? module.path : base);
    }
	}, fn(module, module.exports), module.exports;
}

function commonjsRequire () {
	throw new Error('Dynamic requires are not currently supported by @rollup/plugin-commonjs');
}

var index_bundle = createCommonjsModule(function (module, exports) {
(function e(t,i){module.exports=i();})(window,(function(){return function(e){var t={};function i(r){if(t[r]){return t[r].exports}var o=t[r]={i:r,l:false,exports:{}};e[r].call(o.exports,o,o.exports,i);o.l=true;return o.exports}i.m=e;i.c=t;i.d=function(e,t,r){if(!i.o(e,t)){Object.defineProperty(e,t,{enumerable:true,get:r});}};i.r=function(e){if(typeof Symbol!=="undefined"&&Symbol.toStringTag){Object.defineProperty(e,Symbol.toStringTag,{value:"Module"});}Object.defineProperty(e,"__esModule",{value:true});};i.t=function(e,t){if(t&1)e=i(e);if(t&8)return e;if(t&4&&typeof e==="object"&&e&&e.__esModule)return e;var r=Object.create(null);i.r(r);Object.defineProperty(r,"default",{enumerable:true,value:e});if(t&2&&typeof e!="string")for(var o in e)i.d(r,o,function(t){return e[t]}.bind(null,o));return r};i.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};i.d(t,"a",t);return t};i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};i.p="";return i(i.s=0)}([function(e,t,i){i.r(t);i.d(t,"isSameColor",(function(){return n}));i.d(t,"setColorAtPixel",(function(){return o}));i.d(t,"getColorAtPixel",(function(){return r}));i.d(t,"colorToRGBA",(function(){return l}));i.d(t,"hex2RGBA",(function(){return a}));function r(e,t,i){var r=e.width,o=e.data;var n=4*(i*r+t);if(o[n+3]===undefined){throw new Error("Invalid pixel coordinates: x="+t+"; y="+i)}return {r:o[n],g:o[n+1],b:o[n+2],a:o[n+3]}}function o(e,t,i,r){var o=e.width,n=e.data;var a=4*(r*o+i);if(n[a+3]===undefined){throw new Error("Invalid pixel coordinates. Cannot set color at: x="+i+"; y="+r)}n[a+0]=t.r&255;n[a+1]=t.g&255;n[a+2]=t.b&255;n[a+3]=t.a&255;}function n(e,t,i){if(i===void 0){i=0;}return !(Math.abs(e.r-t.r)>i||Math.abs(e.g-t.g)>i||Math.abs(e.b-t.b)>i||Math.abs(e.a-t.a)>i)}function a(e,t){if(t===void 0){t=255;}var i=e;if(e.indexOf("#")===0){i=e.slice(1);}if(i.length===3){i=i[0]+i[0]+i[1]+i[1]+i[2]+i[2];}if(i.length!==6){throw new Error("Invalid HEX color "+i+".")}var r=parseInt(i.slice(0,2),16);var o=parseInt(i.slice(2,4),16);var n=parseInt(i.slice(4,6),16);return {r:r,g:o,b:n,a:t}}function l(e){if(e.indexOf("rgba")!==-1){var t=/rgba\(.*?([0-9]{1,3}).*?([0-9]{1,3}).*?([0-9]{1,3}).*?([0-9\.]{1,})/g.exec(e),i=t[0],r=t[1],o=t[2],n=t[3],l=t[4];return {r:parseInt(r),g:parseInt(o),b:parseInt(n),a:Math.ceil(parseFloat(l)*255)}}else if(e.indexOf("rgb")!==-1){var u=/rgb\(.*?([0-9]{1,3}).*?([0-9]{1,3}).*?([0-9]{1,3})/g.exec(e),i=u[0],r=u[1],o=u[2],n=u[3];return {r:parseInt(r),g:parseInt(o),b:parseInt(n),a:255}}else if(e.indexOf("#")!==-1){return a(e)}else {throw new Error("Unsupported color format. Please use CSS rgba, rgb, or HEX!")}}var u=function(){function e(e){this.collectModifiedPixels=false;this.modifiedPixelsCount=0;this.modifiedPixels=new Set;this._tolerance=0;this._queue=[];this.imageData=e;}e.prototype.fill=function(e,t,i,o){this._newColor=l(e);this._replacedColor=r(this.imageData,t,i);this._tolerance=o;if(n(this._replacedColor,this._newColor,this._tolerance)){return}this.addToQueue([t,t,i,-1]);this.fillQueue();};e.prototype.addToQueue=function(e){this._queue.push(e);};e.prototype.popFromQueue=function(){if(!this._queue.length){return null}return this._queue.pop()};e.prototype.isValidTarget=function(e){if(e===null){return}var t=r(this.imageData,e.x,e.y);return n(this._replacedColor,t,this._tolerance)};e.prototype.fillLineAt=function(e,t){if(!this.isValidTarget({x:e,y:t})){return [-1,-1]}this.setPixelColor(this._newColor,{x:e,y:t});var i=e;var r=e;var o=this.getPixelNeighbour("left",i,t);while(o&&this.isValidTarget(o)){this.setPixelColor(this._newColor,o);i=o.x;o=this.getPixelNeighbour("left",i,t);}o=this.getPixelNeighbour("right",r,t);while(o&&this.isValidTarget(o)){this.setPixelColor(this._newColor,o);r=o.x;o=this.getPixelNeighbour("right",r,t);}return [i,r]};e.prototype.fillQueue=function(){var e=this.popFromQueue();while(e){var t=e[0],i=e[1],r=e[2],o=e[3];var n=t;while(n!==-1&&n<=i){var a=this.fillLineAt(n,r),l=a[0],u=a[1];if(l!==-1){if(l>=t&&u<=i&&o!==-1){if(o<r&&r+1<this.imageData.height){this.addToQueue([l,u,r+1,r]);}if(o>r&&r>0){this.addToQueue([l,u,r-1,r]);}}else {if(r>0){this.addToQueue([l,u,r-1,r]);}if(r+1<this.imageData.height){this.addToQueue([l,u,r+1,r]);}}}if(u===-1&&n<=i){n+=1;}else {n=u+1;}}e=this.popFromQueue();}};e.prototype.setPixelColor=function(e,t){o(this.imageData,e,t.x,t.y);this.modifiedPixelsCount++;this.collectModifiedPixels&&this.modifiedPixels.add(t.x+"|"+t.y);};e.prototype.getPixelNeighbour=function(e,t,i){t=t|0;i=i|0;var r;switch(e){case"right":r={x:t+1|0,y:i};break;case"left":r={x:t-1|0,y:i};break}if(r.x>=0&&r.x<this.imageData.width){return r}return null};return e}();var s=u;var f=t["default"]=s;}])}));

});

export default index_bundle;