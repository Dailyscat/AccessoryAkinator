/**
 * Jeeliz Glance Tracker - https://github.com/jeeliz/jeelizGlanceTracker
 *
 * Copyright 2018 Jeeliz ( https://jeeliz.com )
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import NNCDATA from './NNCGlance.json';

window['GLANCETRACKERAPI'] = (function() {
  function ba(a, b) {
    b(NNCDATA);
    /*
    var d = new XMLHttpRequest();
    d.open('GET', a, !0);
    d.withCredentials = !1;
    d.onreadystatechange = function() {
      4 === d.readyState && 200 === d.status && b(d.responseText);
    };
    d.send();
    */
  }
  function ea(a, b) {
    var d = b % 8;
    return (a[(b - d) / 8] >> (7 - d)) & 1;
  }
  function fa(a) {
    var b = JSON.parse(a);
    a = b.ne;
    var d = b.nf,
      e = b.n,
      g =
        'undefined' === typeof btoa
          ? Buffer.from(b.data, 'base64').toString('latin1')
          : atob(b.data),
      f = g.length,
      n;
    b = new Uint8Array(f);
    for (n = 0; n < f; ++n) b[n] = g.charCodeAt(n);
    g = new Float32Array(e);
    f = new Float32Array(d);
    n = a + d + 1;
    var k, h;
    for (k = 0; k < e; ++k) {
      var l = n * k;
      var q = 0 === ea(b, l) ? 1 : -1;
      var t = l + 1;
      var p = 1,
        v = 0;
      for (h = t + a - 1; h >= t; --h) (v += p * ea(b, h)), (p *= 2);
      h = v;
      t = b;
      p = l + 1 + a;
      v = f;
      var A = 0,
        w = v.length;
      for (l = p; l < p + w; ++l) (v[A] = ea(t, l)), ++A;
      for (l = t = 0; l < d; ++l) t += f[l] * Math.pow(2, -l - 1);
      q =
        0 === t && 0 === h
          ? 0
          : q * (1 + t) * Math.pow(2, 1 + h - Math.pow(2, a - 1));
      g[k] = q;
    }
    return g;
  }
  var m = (function() {
      function a(a, b) {
        a = c.createShader(a);
        c.shaderSource(a, b);
        c.compileShader(a);
        return c.getShaderParameter(a, c.COMPILE_STATUS) ? a : !1;
      }
      function b(b, e, d) {
        b = a(c.VERTEX_SHADER, b, d + ' VERTEX');
        e = a(c.FRAGMENT_SHADER, e, d + ' FRAGMENT');
        d = c.createProgram();
        c.attachShader(d, b);
        c.attachShader(d, e);
        c.linkProgram(d);
        return d;
      }
      function d(a) {
        void 0 === a.Y &&
          (a.Y =
            'precision lowp float;attribute vec2 a0;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=a0*.5+vec2(.5,.5);}');
        void 0 === a.$ && (a.$ = ['a0']);
        void 0 === a.U && (a.U = [2]);
        void 0 === a.precision &&
          (c.getShaderPrecisionFormat &&
          10 <=
            c.getShaderPrecisionFormat(c.FRAGMENT_SHADER, c.MEDIUM_FLOAT)
              .precision
            ? (a.precision = 'mediump')
            : (a.precision = 'highp'));
        void 0 === a.u && (a.u = []);
        a.id = n++;
        void 0 !== a.Jb &&
          a.Jb.forEach(function(b, d) {
            a.c = a.c.replace(b, a.Ra[d]);
          });
        a.ua = 0;
        a.U.forEach(function(b) {
          a.ua += 4 * b;
        });
        a.fa = b(a.Y, 'precision ' + a.precision + ' float;\n' + a.c, a.name);
        a.m = {};
        a.g.forEach(function(b) {
          a.m[b] = c.getUniformLocation(a.fa, b);
        });
        a.attributes = {};
        a.V = [];
        a.$.forEach(function(b) {
          var d = c.getAttribLocation(a.fa, b);
          a.attributes[b] = d;
          a.V.push(d);
        });
        if (a.h) {
          c.useProgram(a.fa);
          f = a;
          g = a.id;
          for (var d in a.h) c.uniform1i(a.m[d], a.h[d]);
        }
        a.Ec = !0;
      }
      function e(a) {
        ja.Rb(z);
        g !== a.id &&
          (z.N(),
          (g = a.id),
          (f = a),
          c.useProgram(a.fa),
          a.V.forEach(function(a) {
            0 !== a && c.enableVertexAttribArray(a);
          }));
      }
      var g = -1,
        f = !1,
        n = 0,
        k = !1,
        h = ['u0'],
        l = ['u1'],
        q = { u0: 0 },
        t = { u1: 0 },
        p = { u0: 0, u2: 1 },
        v = { u3: 0 },
        A = { u4: 0, u5: 1 },
        w = {
          s0: {
            name: '_',
            c:
              'uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vv0);}',
            g: h,
            h: q
          },
          s1: {
            name: '_',
            c:
              'uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vv0);}',
            g: h,
            h: q,
            precision: 'lowp'
          },
          s2: {
            name: '_',
            c:
              'uniform sampler2D u0,u2;varying vec2 vv0;void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u0,vv0);gl_FragColor=a*b;}',
            g: ['u0', 'u2'],
            h: p
          },
          s3: {
            name: '_',
            c:
              'uniform sampler2D u0;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a.r*f;}',
            g: h,
            h: q
          },
          s4: {
            name: '_',
            c:
              'uniform sampler2D u0,u2;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u2,vv0),b=texture2D(u0,vv0);gl_FragColor=a.a*b.r*f;}',
            g: ['u0', 'mask'],
            h: p
          },
          s5: {
            name: '_',
            c:
              'uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vec2(1.-vv0.x,vv0.y));}',
            g: h,
            h: q
          },
          s6: {
            name: '_',
            c:
              'uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vec2(vv0.x,1.-vv0.y));}',
            g: h,
            h: q
          },
          s7: {
            name: '_',
            c:
              'uniform sampler2D u1;uniform float u6;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=a*u6;}',
            g: ['u1', 'u6'],
            h: t
          },
          s8: {
            name: '_',
            c:
              'uniform sampler2D u1;uniform float u6;varying vec2 vv0;const vec4 g=vec4(.25,.25,.25,.25),e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);float b=dot(a*u6,g);gl_FragColor=b*e;}',
            g: ['u1', 'u6'],
            h: t
          },
          s9: {
            name: '_',
            c:
              'uniform sampler2D u0;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){float a=.25*dot(e,texture2D(u0,vv0));gl_FragColor=a*e;}',
            g: h,
            h: q
          },
          s10: {
            name: '_',
            c:
              'uniform sampler2D u0,u7;uniform float u8;const vec4 f=vec4(1.,1.,1.,1.);varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0),b=texture2D(u7,vv0);gl_FragColor=mix(b,a,u8*f);}',
            g: ['u0', 'u7', 'u8'],
            h: { u0: 0, u7: 1 }
          },
          s11: {
            name: '_',
            c:
              'uniform sampler2D u0;uniform vec2 u9;varying vec2 vv0;void main(){gl_FragColor=.25*(texture2D(u0,vv0+u9)+texture2D(u0,vv0+u9*vec2(1.,-1.))+texture2D(u0,vv0+u9*vec2(-1.,-1.))+texture2D(u0,vv0+u9*vec2(-1.,1.)));}',
            g: ['u0', 'u9'],
            h: q
          },
          s12: {
            name: '_',
            c:
              'uniform sampler2D u0;uniform vec4 u10;varying vec2 vv0;float g(float a,float b){a=floor(a)+.5;return floor(a/exp2(b));}float h(float a,float b){return floor(a*exp2(b)+.5);}float i(float a,float b){return mod(a,h(1.,b));}float e(float c,float a,float b){a=floor(a+.5),b=floor(b+.5);return i(g(c,a),b-a);}vec4 k(float a){if(a==0.)return vec4(0.,0.,0.,0.);float l=128.*step(a,0.);a=abs(a);float c=floor(log2(a)),m=c+127.,b=(a/exp2(c)-1.)*8388608.,d=m/2.,n=fract(d)*2.,o=floor(d),p=e(b,0.,8.),q=e(b,8.,16.),r=n*128.+e(b,16.,23.),j=l+o;return vec4(p,q,r,j)/255.;}void main(){float a=dot(texture2D(u0,vv0),u10);gl_FragColor=k(a);}',
            g: ['u0', 'u10'],
            h: q
          },
          s13: {
            name: '_',
            c:
              'uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0),b=e/(e+exp(-a));gl_FragColor=b;}',
            g: l,
            h: t,
            u: l,
            v: !0
          },
          s14: {
            name: '_',
            c:
              'uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(0.,0.,0.,0.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=max(e,a);}',
            g: l,
            h: t,
            u: l,
            v: !0
          },
          s15: {
            name: '_',
            c:
              'uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=mix(exp(-abs(a))-e,a,step(0.,a));}',
            g: l,
            h: t,
            u: l,
            v: !0
          },
          s16: {
            name: '_',
            c:
              'uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0),b=exp(-abs(a))-e;gl_FragColor=mix(.1*b,a,step(0.,a));}',
            g: l,
            h: t,
            u: l,
            v: !0
          },
          s17: {
            name: '_',
            c:
              'uniform sampler2D u1,u8,u11;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0),c=texture2D(u8,vv0),d=texture2D(u11,vv0),b=a/d;gl_FragColor=c*mix(exp(-abs(b))-f,b,step(0.,a));}',
            g: ['u1', 'u8', 'u11'],
            h: { u1: 0, u8: 1, u11: 2 },
            u: l,
            v: !0
          },
          s18: {
            name: '_',
            c:
              'uniform sampler2D u1;const float e=3.141593;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=atan(e*a)/e;gl_FragColor=b;}',
            g: l,
            h: t,
            u: l,
            v: !0
          },
          s19: {
            name: '_',
            c:
              'uniform sampler2D u1;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(.5,.5,.5,.5);void main(){vec4 a=texture2D(u1,vv0),b=log(e+a);gl_FragColor=b;}',
            g: l,
            h: t,
            u: l,
            v: !0
          },
          s20: {
            name: '_',
            c:
              'uniform sampler2D u1;uniform float gain;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0);gl_FragColor=exp(a);}',
            g: ['u1', 'u12'],
            h: t,
            u: l,
            v: !0
          },
          s21: {
            name: '_',
            c:
              'uniform sampler2D u1,u13;uniform float u14;const vec2 f=vec2(.5,.5);const float g=1e-5;const vec4 h=vec4(1.,1.,1.,1.),i=vec4(0.,0.,0.,0.);varying vec2 vv0;void main(){vec4 a=texture2D(u13,f);float b=u14*u14;vec4 c=max(b*a,g*h);gl_FragColor=texture2D(u1,vv0)/c;}',
            g: ['u1', 'u15', 'u14'],
            h: { u1: 0, u15: 1 }
          },
          s22: {
            name: '_',
            c:
              'uniform sampler2D u0;uniform vec2 u16;varying vec2 vv0;void main(){float a=u16.x*u16.y;vec2 b=floor(vv0*a)/a,c=fract(vv0*a),d=floor(b*u16.y),g=floor(u16.x*fract(b*u16.y)),f=(g*u16.y+d)/a;gl_FragColor=texture2D(u0,f+c/a);}',
            g: ['u0', 'u16'],
            h: q
          },
          s23: {
            name: '_',
            c:
              'uniform sampler2D u17,u5,u18;varying vec2 vv0;void main(){vec4 a=texture2D(u18,vv0);vec2 b=a.rg,c=a.ba;vec4 d=texture2D(u17,b),e=texture2D(u5,c);gl_FragColor=d*e;}',
            g: ['u17', 'u5', 'u18'],
            u: ['u17', 'u5', 'u18'],
            h: { u5: 0, u17: 1, u18: 2 },
            v: !0
          },
          s24: {
            name: '_',
            c:
              'uniform float u19;uniform sampler2D u17,u5;varying vec2 vv0;void main(){vec2 a=fract(vv0*u19);vec4 b=texture2D(u17,vv0),c=texture2D(u5,a);gl_FragColor=b*c;}',
            g: ['u5', 'u17', 'u19'],
            u: ['u5', 'u17'],
            h: { u5: 0, u17: 1 },
            v: !0
          },
          s25: {
            name: '_',
            c:
              'uniform float u19;uniform sampler2D u17,u5,u20,u21,u22,u23;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.),g=vec4(1e-3,1e-3,1e-3,1e-3);void main(){vec2 i=vv0*u19,m=floor(i),c=i-m;vec4 n=texture2D(u17,vv0),d=texture2D(u5,c),a=texture2D(u23,vv0);a=a*255.;vec4 o=texture2D(u20,c),p=texture2D(u21,c),q=texture2D(u22,c),j=step(-g,-a),b=e-j,k=b*step(-e-g,-a);b*=e-k;vec4 h=b*step(-2.*e-g,-a);b*=e-h;vec4 l=b;d=j*d+k*o+h*p+l*q,gl_FragColor=n*d;}',
            g: 'u17 u5 u19 u23 u20 u21 u22'.split(' '),
            h: {
              u5: 0,
              u17: 1,
              u23: 3,
              u20: 4,
              u21: 5,
              u22: 6
            },
            v: !0
          },
          s26: {
            name: '_',
            c:
              'uniform sampler2D u17,u5,u24;uniform float u19,u25,u26,u27;varying vec2 vv0;const vec2 j=vec2(1.,1.);void main(){vec2 a=floor(u25*vv0),g=u25*vv0-a;float b=u19/u25;vec2 c=floor(g*b),d=g*b-c,h=(a+d)/u25;float l=u25*u27/u19;vec2 m=l*c,i=(m+d*u26)/u27,e=step(i,j);vec4 n=texture2D(u17,h),o=texture2D(u5,i),p=n*o*e.x*e.y,k=texture2D(u24,h);gl_FragColor=p*u26*u26+k;}',
            g: 'u17 u5 u19 u25 u26 u27 u24'.split(' '),
            u: ['u17', 'u5', 'u24'],
            h: { u5: 0, u17: 1, u24: 2 },
            v: !0
          },
          s27: {
            name: '_',
            c:
              'uniform sampler2D u17,u5;varying vec2 vv0;void main(){vec4 a=texture2D(u17,vv0),b=texture2D(u5,vv0);gl_FragColor=a*b;}',
            g: ['u17', 'u5'],
            u: ['u17', 'u5'],
            h: { u5: 0, u17: 1 },
            v: !0
          },
          s28: {
            name: '_',
            c:
              'uniform sampler2D u0,u24;uniform float u28;varying vec2 vv0;void main(){gl_FragColor=texture2D(u24,vv0)+u28*texture2D(u0,vv0);}',
            g: ['u0', 'u24', 'u28'],
            u: ['u0', 'u24'],
            v: !0,
            h: { u0: 0, u24: 1 }
          },
          s29: {
            name: '_',
            c:
              'varying vec2 vv0;uniform sampler2D u0;const vec4 g=vec4(1.,1.,1.,1.),e=vec4(.299,.587,.114,0.);void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=dot(a,e)*g;}',
            g: h,
            h: q,
            precision: 'lowp'
          },
          s30: {
            name: '_',
            c:
              'varying vec2 vv0;uniform sampler2D u0,u2;uniform float u29;const vec4 g=vec4(1.,1.,1.,1.);void main(){vec4 a=vec4(0.);a-=texture2D(u0,vec2(vv0.x-u29,vv0.y-u29))*1.,a-=texture2D(u0,vec2(vv0.x-u29,vv0.y))*2.,a-=texture2D(u0,vec2(vv0.x-u29,vv0.y+u29))*1.,a+=texture2D(u0,vec2(vv0.x+u29,vv0.y-u29))*1.,a+=texture2D(u0,vec2(vv0.x+u29,vv0.y))*2.,a+=texture2D(u0,vec2(vv0.x+u29,vv0.y+u29))*1.;vec4 b=vec4(0.);b-=texture2D(u0,vec2(vv0.x-u29,vv0.y-u29))*1.,b-=texture2D(u0,vec2(vv0.x,vv0.y-u29))*2.,b-=texture2D(u0,vec2(vv0.x+u29,vv0.y-u29))*1.,b+=texture2D(u0,vec2(vv0.x-u29,vv0.y+u29))*1.,b+=texture2D(u0,vec2(vv0.x,vv0.y+u29))*2.,b+=texture2D(u0,vec2(vv0.x+u29,vv0.y+u29))*1.;vec3 c=sqrt(a.rgb*a.rgb+b.rgb*b.rgb);vec4 e=vec4(c,texture2D(u0,vv0).a),f=texture2D(u2,vv0);gl_FragColor=f.a*e.r*g;}',
            g: ['u0', 'u2', 'u29'],
            h: p
          },
          s31: {
            name: '_',
            c:
              'varying vec2 vv0;uniform sampler2D u0,u2;uniform float u29;const vec4 j=vec4(1.,1.,1.,1.);const vec2 k=vec2(1.,1.);void main(){float i=0.;vec2 l=k*u29,b,c;float d,a,g=0.;for(float f=-4.;f<=4.;f+=1.)for(float e=-4.;e<=4.;e+=1.)b=vec2(f,e),d=length(b)/2.,a=exp(-d*d),c=vv0+l*b,a=1.,i+=a*texture2D(u0,c).r,g+=a;vec4 m=texture2D(u2,vv0);gl_FragColor=m.a*(texture2D(u0,c).r-i/g)*j;}',
            g: ['u0', 'u2', 'u29'],
            h: p
          },
          s32: {
            name: '_',
            c:
              'uniform sampler2D u3;uniform vec2 u9;varying vec2 vv0;vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}const vec2 h=vec2(.5,.5),i=vec2(1.,0.),j=vec2(0.,1.);void main(){vec2 a=vv0-u9*h;vec4 b=texture2D(u3,a),c=texture2D(u3,a+u9*i),d=texture2D(u3,a+u9*j),k=texture2D(u3,a+u9),l=e(b,c),g=e(d,k);gl_FragColor=e(l,g);}',
            g: ['u3', 'u9'],
            h: v
          },
          s33: {
            name: '_',
            c:
              'uniform sampler2D u3;uniform vec2 u9;varying vec2 vv0;const vec2 j=vec2(1.,0.),k=vec2(0.,1.),l=vec2(2.,0.),m=vec2(0.,2.);vec4 e(vec4 a,vec4 b){vec4 c=step(a,b);return mix(a,b,c);}vec4 f(vec2 a){vec4 b=texture2D(u3,a),c=texture2D(u3,a+u9*j),d=texture2D(u3,a+u9*k),g=texture2D(u3,a+u9),i=e(b,c),h=e(d,g);return e(i,h);}void main(){vec2 a=vv0+u9*vec2(-.55,-1.05);vec4 b=f(a),c=f(a+u9*l),d=f(a+u9*2.),g=f(a+u9*m),i=e(b,c),h=e(d,g);gl_FragColor=e(i,h);}',
            g: ['u3', 'u9'],
            h: v
          },
          s34: {
            name: '_',
            c:
              'uniform sampler2D u0;varying vec2 vv0;void main(){vec4 a=texture2D(u0,vv0);gl_FragColor=a*a;}',
            g: ['u0'],
            h: q,
            precision: 'lowp'
          },
          s35: {
            name: '_',
            c:
              'uniform sampler2D u0;uniform vec2 u9;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float d=15444.;void main(){vec4 a=1001./d*texture2D(u0,vv0-3.*u9)+2002./d*texture2D(u0,vv0-2.*u9)+3003./d*texture2D(u0,vv0-u9)+3432./d*texture2D(u0,vv0)+3003./d*texture2D(u0,vv0+u9)+2002./d*texture2D(u0,vv0+2.*u9)+1001./d*texture2D(u0,vv0+3.*u9);gl_FragColor=a;}',
            g: ['u9', 'u0'],
            h: q,
            precision: 'lowp'
          },
          s36: {
            name: '_',
            c:
              'uniform sampler2D u0,u30,u31;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);const float h=.1;void main(){vec4 a=texture2D(u30,vv0),b=texture2D(u31,vv0),c=texture2D(u0,vv0),d=max(g*h,b-a*a),f=sqrt(d);gl_FragColor=(c-a)/f;}',
            g: ['u0', 'u30', 'u31'],
            h: { u0: 0, u30: 1, u31: 2 },
            v: !0
          },
          s37: {
            name: '_',
            c:
              'uniform sampler2D u17,u32,u33;varying vec2 vv0;void main(){vec4 a=texture2D(u33,vv0);vec2 b=a.rg;vec4 c=texture2D(u17,b);vec2 d=a.ba;vec4 e=texture2D(u32,d);gl_FragColor=c*e;}',
            g: ['u17', 'u32', 'u33'],
            h: { u32: 0, u33: 1, u17: 2 }
          },
          s38: {
            name: '_',
            c:
              'uniform sampler2D u17,u32;uniform float u19,u27;varying vec2 vv0;void main(){float d=u19*u27;vec2 b=vv0*u27,c=floor(b),a=b-c;a.y=1.-a.y;vec2 g=floor(a*u19),h=(g*u27+c)/d;vec4 i=texture2D(u17,h),e=texture2D(u32,a);gl_FragColor=i*e;}',
            g: ['u17', 'u32', 'u19', 'u27'],
            h: { u32: 0, u17: 1 }
          },
          s39: {
            name: '_',
            c:
              'uniform sampler2D u17,u32;uniform float u19,u27,u26,u25;varying vec2 vv0;const vec2 e=vec2(1.,1.);void main(){float k=u19*u26/u27,d=u25*u27/u19,l=k/u25,m=u19/u25,n=k/u25;vec2 g=e-vv0,c=floor(u27*g),h=u27*g-c,i=floor(u25*h),j=u25*h-i,q=j*l,r=floor(c/d),s=c-r*d,t=floor(c/d),u=t+n*j,a=(u+i*m)/u19;a=mod(a,e),a=e-a;vec2 v=s-d*q,b=mod(v/u26,e);b=e-b,b+=vec2(1./u19,1./u19),b=mod(b,e);vec2 w=floor(a*u25),f=(w+b)/u25;f=mod(f,e);vec4 x=texture2D(u17,f),o=texture2D(u32,a);gl_FragColor=x*o;}',
            g: 'u17 u32 u19 u27 u26 u25'.split(' '),
            h: { u32: 0, u17: 1 }
          },
          s40: {
            name: '_',
            c:
              'uniform sampler2D u1,u34,u35;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u34,vv0),c=texture2D(u35,vv0);gl_FragColor=a-b;}',
            g: ['u1', 'u34', 'u35'],
            h: { u1: 0, u34: 1, u35: 2 }
          },
          s41: {
            name: '_',
            c:
              'uniform sampler2D u1,u34,u35;varying vec2 vv0;void main(){vec4 a=texture2D(u1,vv0),b=texture2D(u34,vv0),c=texture2D(u35,vv0);gl_FragColor=c*(a-b);}',
            g: ['u1', 'u34', 'u35'],
            h: { u1: 0, u34: 1, u35: 2 }
          },
          s42: {
            name: '_',
            c:
              'uniform sampler2D u4,u5;uniform float u28;varying vec2 vv0;void main(){vec4 a=u28*texture2D(u4,vv0),b=texture2D(u5,vv0);gl_FragColor=a;}',
            g: ['u4', 'u5', 'u28'],
            h: A
          },
          s43: {
            name: '_',
            c:
              'uniform sampler2D u4,u5;uniform float u28;varying vec2 vv0;const vec4 f=vec4(1.,1.,1.,1.);vec4 g(vec4 b){vec4 a=exp(-b);return a/((f+a)*(f+a));}void main(){vec4 a=u28*texture2D(u4,vv0),b=texture2D(u5,vv0);gl_FragColor=a*g(b);}',
            g: ['u4', 'u5', 'u28'],
            h: A
          },
          s44: {
            name: '_',
            c:
              'uniform sampler2D u4,u5;uniform float u28;varying vec2 vv0;const vec4 g=vec4(0.,0.,0.,0.),i=vec4(1.,1.,1.,1.);const float h=1e-4;vec4 f(vec4 a){return h+step(g,a);}void main(){vec4 a=u28*texture2D(u4,vv0),b=texture2D(u5,vv0);gl_FragColor=a*f(b);}',
            g: ['u4', 'u5', 'u28'],
            h: A
          },
          s45: {
            name: '_',
            c:
              'uniform sampler2D u4,u5;uniform float u28;varying vec2 vv0;const vec4 g=vec4(1.,1.,1.,1.);vec4 f(vec4 a){vec4 b=exp(-abs(a));return mix(b,g,step(0.,a));}void main(){vec4 a=u28*texture2D(u4,vv0),b=texture2D(u5,vv0);gl_FragColor=a*f(b);}',
            g: ['u4', 'u5', 'u28'],
            h: A
          },
          s46: {
            name: '_',
            c:
              'uniform sampler2D u4,u5;uniform float u28;varying vec2 vv0;const vec4 e=vec4(1.,1.,1.,1.);const float h=3.141593;vec4 g(vec4 b){vec4 a=b*h;return e/(e+a*a);}void main(){vec2 a=vv0;vec4 b=u28*texture2D(u4,a),c=texture2D(u5,a);gl_FragColor=b*g(c);}',
            g: ['u4', 'u5', 'u28'],
            h: A
          }
        },
        B = {},
        z = {
          qa: function() {
            return k;
          },
          i: function() {
            if (!k) {
              for (var a in w) d(w[a], a);
              m.set('s0');
              c.enableVertexAttribArray(0);
              a = ka.i();
              k = !0;
              return a;
            }
          },
          $a: function(a) {
            a.forEach(function(a) {
              z.Za(a);
            });
          },
          Za: function(a) {
            w[a.id] = a;
            d(a, a.id);
          },
          Bb: function(a, b, e) {
            b || (b = a);
            w[b] = Object.create(B[a]);
            B[a].Ra &&
              B[a].Ra.forEach(function(a, d) {
                w[b].c = w[b].c.replace(new RegExp(a, 'g'), e[d]);
              });
            d(w[b], b);
          },
          set: function(a) {
            e(w[a]);
          },
          pc: function() {
            return f.mc;
          },
          N: function() {
            -1 !== g &&
              ((g = -1),
              f.V.forEach(function(a) {
                0 !== a && c.disableVertexAttribArray(a);
              }));
          },
          sa: function() {
            var a = 0;
            f.V.forEach(function(b, d) {
              d = f.U[d];
              c.vertexAttribPointer(b, d, c.FLOAT, !1, f.ua, a);
              a += 4 * d;
            });
          },
          lc: function() {
            c.enableVertexAttribArray(0);
          },
          ta: function() {
            c.vertexAttribPointer(f.V[0], 2, c.FLOAT, !1, 8, 0);
          },
          Vc: function(a, b) {
            c.uniform1i(f.m[a], b);
          },
          w: function(a, b) {
            c.uniform1f(f.m[a], b);
          },
          G: function(a, b, d) {
            c.uniform2f(f.m[a], b, d);
          },
          Wc: function(a, b) {
            c.uniform2fv(f.m[a], b);
          },
          Xc: function(a, b) {
            c.uniform3fv(f.m[a], b);
          },
          Sb: function(a, b, d, e) {
            c.uniform3f(f.m[a], b, d, e);
          },
          Ua: function(a, b) {
            c.uniform4fv(f.m[a], b);
          },
          Yc: function(a, b) {
            c.uniformMatrix2fv(f.m[a], !1, b);
          },
          Zc: function(a, b) {
            c.uniformMatrix3fv(f.m[a], !1, b);
          },
          $c: function(a, b) {
            c.uniformMatrix4fv(f.m[a], !1, b);
          },
          M: function(a, b) {
            z.set(a);
            b.forEach(function(a) {
              switch (a.type) {
                case '4f':
                  c.uniform4fv(f.m[a.name], a.value);
                  break;
                case '3f':
                  c.uniform3fv(f.m[a.name], a.value);
                  break;
                case '2f':
                  c.uniform2fv(f.m[a.name], a.value);
                  break;
                case '1f':
                  c.uniform1f(f.m[a.name], a.value);
                  break;
                case '1i':
                  c.uniform1i(f.m[a.name], a.value);
                  break;
                case 'mat2':
                  c.uniformMatrix2fv(f.m[a.name], !1, a.value);
                  break;
                case 'mat3':
                  c.uniformMatrix3fv(f.m[a.name], !1, a.value);
                  break;
                case 'mat4':
                  c.uniformMatrix4fv(f.m[a.name], !1, a.value);
              }
            });
          }
        };
      return z;
    })(),
    c,
    oa = (function() {
      function a(a) {
        console.log('ERROR in ContextFeedForward : ', a);
        return !1;
      }
      var b = !1,
        d = !1,
        e = !1,
        g = !1,
        f = !0,
        n = !1,
        k = {
          A: function() {
            return b.width;
          },
          H: function() {
            return b.height;
          },
          qc: function() {
            return b;
          },
          oc: function() {
            return c;
          },
          o: function() {
            return f;
          },
          flush: function() {
            c.flush();
          },
          tb: function() {
            n || (n = new Uint8Array(b.width * b.height * 4));
            c.readPixels(0, 0, b.width, b.height, c.RGBA, c.UNSIGNED_BYTE, n);
            return n;
          },
          sc: function() {
            return b.toDataURL('image/jpeg');
          },
          tc: function() {
            r.D();
            d ||
              ((d = document.createElement('canvas')),
              (e = d.getContext('2d')));
            d.width = b.width;
            d.height = b.height;
            var a = k.tb(),
              f = e.createImageData(d.width, d.height),
              g,
              t,
              n = d.width,
              v = d.height,
              A = f.data;
            for (t = 0; t < v; ++t) {
              var w = v - t - 1;
              for (g = 0; g < n; ++g) {
                var B = 4 * (t * n + g);
                var z = 4 * (w * n + g);
                A[B] = a[z];
                A[B + 1] = a[z + 1];
                A[B + 2] = a[z + 2];
                A[B + 3] = a[z + 3];
              }
            }
            e.putImageData(f, 0, 0);
            return d.toDataURL('image/png');
          },
          rc: function(a) {
            !d &&
              a &&
              ((d = document.createElement('canvas')),
              (e = d.getContext('2d')));
            var f = a ? d : document.createElement('canvas');
            f.width = b.width;
            f.height = b.height;
            (a ? e : f.getContext('2d')).drawImage(b, 0, 0);
            return f;
          },
          i: function(d) {
            d.Ba && !d.aa
              ? (b = document.getElementById(d.Ba))
              : d.aa && (b = d.aa);
            b || (b = document.createElement('canvas'));
            b.width = d && void 0 !== d.width ? d.width : 512;
            b.height = d && void 0 !== d.height ? d.height : 512;
            'undefined' === typeof d && (d = {});
            void 0 === d.premultipliedAlpha && (d.premultipliedAlpha = !1);
            void 0 === d.pa && (d.pa = !0);
            void 0 === d.antialias && (d.antialias = !1);
            var e = {
              antialias: d.antialias,
              alpha: !0,
              preserveDrawingBuffer: !0,
              premultipliedAlpha: d.premultipliedAlpha,
              stencil: !1,
              depth: d.pa
            };
            (c = b.getContext('webgl2', e))
              ? (f = !0)
              : ((c = b.getContext('webgl', e)) ||
                  (c = b.getContext('experimental-webgl', e)),
                (f = !1));
            if (!c) return a('WebGL is not enabled');
            (g = c.getExtension('WEBGL_lose_context')) &&
              b.addEventListener('webglcontextlost', d.Mc, !1);
            if (!u.i()) return a('not enough capabilities');
            if (!u.gb() && f)
              return a('Your configuration cannot process color buffer float');
            c.clearColor(0, 0, 0, 0);
            c.disable(c.DEPTH_TEST);
            c.disable(c.BLEND);
            c.disable(c.DITHER);
            c.disable(c.STENCIL_TEST);
            c.GENERATE_MIPMAP_HINT && c.hint(c.GENERATE_MIPMAP_HINT, c.FASTEST);
            c.disable(c.SAMPLE_ALPHA_TO_COVERAGE);
            c.disable(c.SAMPLE_COVERAGE);
            return !0;
          },
          Dc: function() {
            if (!m.i()) return !1;
            c.depthFunc(c.LEQUAL);
            c.clearDepth(1);
            return !0;
          }
        };
      return k;
    })(),
    ja = (function() {
      var a = 'undefined' === typeof m ? window.JEShaders : m;
      return {
        Rb: function(b) {
          a !== b && (a.N(), (a = b));
        },
        qa: function() {
          return a.qa();
        },
        ta: function() {
          a.ta();
        },
        sa: function() {
          a.sa();
        },
        N: function() {
          a.N();
        },
        set: function(b) {
          a.set(b);
        }
      };
    })(),
    E = (function() {
      var a,
        b,
        d = 0,
        e = -2,
        g = -2,
        f = !1,
        n = {
          reset: function() {
            g = e = -2;
          },
          i: function() {
            f ||
              ((a = c.createBuffer()),
              c.bindBuffer(c.ARRAY_BUFFER, a),
              c.bufferData(
                c.ARRAY_BUFFER,
                new Float32Array([-1, -1, 3, -1, -1, 3]),
                c.STATIC_DRAW
              ),
              (b = c.createBuffer()),
              c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, b),
              c.bufferData(
                c.ELEMENT_ARRAY_BUFFER,
                new Uint16Array([0, 1, 2]),
                c.STATIC_DRAW
              ),
              n.ia(),
              (f = !0));
          },
          a: function(a) {
            var b = d++,
              f = a.T.length,
              k = c.createBuffer();
            c.bindBuffer(c.ARRAY_BUFFER, k);
            c.bufferData(
              c.ARRAY_BUFFER,
              a.Xa instanceof Float32Array ? a.Xa : new Float32Array(a.Xa),
              c.STATIC_DRAW
            );
            e = b;
            if (a.T) {
              var n = c.createBuffer();
              c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, n);
              if (65536 > a.T.length) {
                var p = Uint16Array;
                var v = c.UNSIGNED_SHORT;
                var A = 2;
              } else (p = Uint32Array), (v = c.UNSIGNED_INT), (A = 4);
              c.bufferData(
                c.ELEMENT_ARRAY_BUFFER,
                a.T instanceof p ? a.T : new p(a.T),
                c.STATIC_DRAW
              );
              g = b;
            }
            var w = {
              eb: function(a) {
                e !== b && (c.bindBuffer(c.ARRAY_BUFFER, k), (e = b));
                a && ja.sa();
              },
              bb: function() {
                g !== b && (c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, n), (g = b));
              },
              bind: function(a) {
                w.eb(a);
                w.bb();
              },
              ic: function() {
                c.drawElements(c.TRIANGLES, f, v, 0);
              },
              jc: function(a, b) {
                c.drawElements(c.TRIANGLES, a, v, b * A);
              },
              remove: function() {
                c.deleteBuffer(k);
                a.T && c.deleteBuffer(n);
                w = null;
              }
            };
            return w;
          },
          ia: function() {
            -1 !== e && (c.bindBuffer(c.ARRAY_BUFFER, a), (e = -1));
            -1 !== g && (c.bindBuffer(c.ELEMENT_ARRAY_BUFFER, b), (g = -1));
          },
          f: function(a, b) {
            a && E.ia();
            b && ja.ta();
            c.drawElements(c.TRIANGLES, 3, c.UNSIGNED_SHORT, 0);
          },
          sb: function() {
            c.deleteBuffer(a);
            c.deleteBuffer(b);
          }
        };
      return n;
    })(),
    r = (function() {
      var a,
        b,
        d,
        e = !1,
        g = { s: -2, qb: 1 };
      return {
        i: function() {
          if (!e) {
            a = c.createFramebuffer();
            var f = u.o();
            b = f && c.DRAW_FRAMEBUFFER ? c.DRAW_FRAMEBUFFER : c.FRAMEBUFFER;
            d = f && c.READ_FRAMEBUFFER ? c.READ_FRAMEBUFFER : c.FRAMEBUFFER;
            e = !0;
          }
        },
        wc: function() {
          return b;
        },
        oa: function() {
          return d;
        },
        R: function() {
          return c.FRAMEBUFFER;
        },
        yc: function() {
          return g;
        },
        nc: function() {
          return a;
        },
        a: function(d) {
          void 0 === d.Ia && (d.Ia = !1);
          var e = d.Vb ? d.Vb : !1,
            f = d.width,
            h = void 0 !== d.height ? d.height : d.width,
            l = a,
            q = !1,
            t = !1,
            p = 0;
          e && ((f = f ? f : e.A()), (h = h ? h : e.H()));
          var v = {
            Ta: function() {
              t || ((l = c.createFramebuffer()), (t = !0), (p = g.qb++));
            },
            Ya: function() {
              v.Ta();
              v.l();
              q = c.createRenderbuffer();
              c.bindRenderbuffer(c.RENDERBUFFER, q);
              c.renderbufferStorage(c.RENDERBUFFER, c.DEPTH_COMPONENT16, f, h);
              c.framebufferRenderbuffer(
                b,
                c.DEPTH_ATTACHMENT,
                c.RENDERBUFFER,
                q
              );
              c.clearDepth(1);
            },
            bind: function(a, d) {
              p !== g.s && (c.bindFramebuffer(b, l), (g.s = p));
              e && e.l();
              d && c.viewport(0, 0, f, h);
              a && c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
            },
            bc: function() {
              p !== g.s && (c.bindFramebuffer(b, l), (g.s = p));
            },
            clear: function() {
              c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
            },
            ec: function() {
              c.clear(c.COLOR_BUFFER_BIT);
            },
            fc: function() {
              c.clear(c.DEPTH_BUFFER_BIT);
            },
            Tb: function() {
              c.viewport(0, 0, f, h);
            },
            l: function() {
              p !== g.s && (c.bindFramebuffer(b, l), (g.s = p));
            },
            rtt: function(a) {
              e = a;
              g.s !== p && (c.bindFramebuffer(c.FRAMEBUFFER, l), (g.s = p));
              a.l();
            },
            D: function() {
              c.bindFramebuffer(b, null);
              g.s = -1;
            },
            resize: function(a, b) {
              f = a;
              h = b;
              q &&
                (c.bindRenderbuffer(c.RENDERBUFFER, q),
                c.renderbufferStorage(
                  c.RENDERBUFFER,
                  c.DEPTH_COMPONENT16,
                  f,
                  h
                ));
            },
            remove: function() {
              c.bindFramebuffer(b, l);
              c.framebufferTexture2D(
                b,
                c.COLOR_ATTACHMENT0,
                c.TEXTURE_2D,
                null,
                0
              );
              q &&
                c.framebufferRenderbuffer(
                  b,
                  c.DEPTH_ATTACHMENT,
                  c.RENDERBUFFER,
                  null
                );
              c.bindFramebuffer(b, null);
              c.deleteFramebuffer(l);
              q && c.deleteRenderbuffer(q);
              v = null;
            }
          };
          d.Ia && v.Ya();
          return v;
        },
        D: function() {
          c.bindFramebuffer(b, null);
          g.s = -1;
        },
        Yb: function() {
          c.bindFramebuffer(b, null);
          c.clear(c.COLOR_BUFFER_BIT | c.DEPTH_BUFFER_BIT);
          c.viewport(0, 0, u.A(), u.H());
          g.s = -1;
        },
        reset: function() {
          g.s = -2;
        },
        J: function() {
          0 !== g.s && (c.bindFramebuffer(b, a), (g.s = 0));
        },
        clear: function() {
          c.viewport(0, 0, u.A(), u.H());
          c.clear(c.COLOR_BUFFER_BIT);
        }
      };
    })(),
    L = (function() {
      function a(a) {
        c.bindTexture(c.TEXTURE_2D, a);
      }
      function b(a) {
        O[0] = a;
        a = S[0];
        var b = (a >> 16) & 32768,
          d = (a >> 12) & 2047,
          C = (a >> 23) & 255;
        return 103 > C
          ? b
          : 142 < C
            ? b | 31744 | ((255 == C ? 0 : 1) && a & 8388607)
            : 113 > C
              ? ((d |= 2048), b | ((d >> (114 - C)) + ((d >> (113 - C)) & 1)))
              : (b = (b | ((C - 112) << 10) | (d >> 1)) + (d & 1));
      }
      function d(a) {
        var d = new Uint16Array(a.length);
        a.forEach(function(a, C) {
          d[C] = b(a);
        });
        return d;
      }
      function e() {
        if (void 0 !== K) return K;
        if (!ja.qa() || !p) return !0;
        var a = I.a({ isFloat: !1, C: !0, array: d([1, 1, 1, 1]), width: 1 });
        r.D();
        c.viewport(0, 0, 1, 1);
        c.clearColor(0, 0, 0, 0);
        c.clear(c.COLOR_BUFFER_BIT);
        ja.set('s0');
        a.wa(0);
        E.f(!1, !0);
        var b = new Uint8Array(4);
        c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, b);
        K = 0.9 < b[0];
        a.remove();
        r.J();
        return K;
      }
      var g = 0,
        f,
        n = 0,
        k,
        h = !1,
        l,
        q,
        t,
        p = !1,
        v = !1,
        A,
        w,
        B,
        z = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]],
        X = !1,
        Z = !1,
        O = new Float32Array(1),
        S = new Int32Array(O.buffer),
        K = void 0,
        I = {
          i: function() {
            if (!p) {
              q = [c.RGB, !1, c.RGB, c.RGBA];
              t = [c.RGB, !1, c.RGB, c.RGBA];
              f = [
                c.TEXTURE0,
                c.TEXTURE1,
                c.TEXTURE2,
                c.TEXTURE3,
                c.TEXTURE4,
                c.TEXTURE5,
                c.TEXTURE6,
                c.TEXTURE7
              ];
              X = 'undefined' !== typeof window.JEContext;
              Z = 'undefined' !== typeof u;
              X && window.JEContext.Kc() && f.push(c.TEXTURE8, c.TEXTURE9);
              k = [-1, -1, -1, -1, -1, -1, -1, -1];
              l = [c.UNSIGNED_BYTE, c.FLOAT, c.FLOAT];
              if (!h) {
                for (var a = new Float32Array(16384), b = 0; 16384 > b; ++b)
                  a[b] = 2 * Math.random() - 1;
                h = {
                  random: I.a({ isFloat: !0, isPot: !0, array: a, width: 64 }),
                  Wa: I.a({
                    isFloat: !1,
                    isPot: !0,
                    width: 1,
                    array: new Uint8Array([0, 0, 0, 0])
                  })
                };
              }
              p = !0;
            }
          },
          Ab: function() {
            I.Zb();
          },
          Bc: function() {
            return h.Wa;
          },
          Zb: function() {
            l[1] = u.ba();
          },
          Lb: function() {
            t = q = [c.RGBA, c.RGBA, c.RGBA, c.RGBA];
          },
          Oc: function(a, b) {
            m.set('s1');
            r.D();
            var d = a.A(),
              C = a.H();
            c.viewport(0, 0, d, C);
            a.b(0);
            E.f(!1, !1);
            c.readPixels(0, 0, d, C, c.RGBA, c.UNSIGNED_BYTE, b);
          },
          rb: function(b, d, e) {
            c.activeTexture(c.TEXTURE0);
            g = 0;
            var C = c.createTexture();
            a(C);
            var f = u.o() && c.RGBA32F ? c.RGBA32F : c.FLOAT;
            d = d instanceof Float32Array ? d : new Float32Array(d);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST);
            c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, e);
            c.texImage2D(
              c.TEXTURE_2D,
              0,
              c.RGBA,
              b.A(),
              b.H(),
              0,
              c.RGBA,
              f,
              d
            );
            a(null);
            c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
            r.J();
            m.set('s0');
            b.j();
            c.clearColor(0, 0, 0, 0);
            c.clear(c.COLOR_BUFFER_BIT);
            a(C);
            E.f(!0, !1);
            c.deleteTexture(C);
          },
          a: function(b) {
            function h() {
              a(D);
              V && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, V);
              b.isPot
                ? (c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_WRAP_S,
                    b.Ka ? c.MIRRORED_REPEAT : c.REPEAT
                  ),
                  c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_WRAP_T,
                    b.K ? c.MIRRORED_REPEAT : c.REPEAT
                  ))
                : (c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_WRAP_S,
                    c.CLAMP_TO_EDGE
                  ),
                  c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_WRAP_T,
                    c.CLAMP_TO_EDGE
                  ));
              b.da &&
                'undefined' !== typeof window.JESETTINGS &&
                c.texParameterf(
                  c.TEXTURE_2D,
                  window.JEContext.uc().TEXTURE_MAX_ANISOTROPY_EXT,
                  window.JESETTINGS.$b
                );
              c.texParameteri(
                c.TEXTURE_2D,
                c.TEXTURE_MAG_FILTER,
                b.isLinear ? c.LINEAR : c.NEAREST
              );
              b.isLinear
                ? c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_MIN_FILTER,
                    b.isMipmap && !W ? c.NEAREST_MIPMAP_LINEAR : c.LINEAR
                  )
                : c.texParameteri(
                    c.TEXTURE_2D,
                    c.TEXTURE_MIN_FILTER,
                    b.isMipmap && !W ? c.NEAREST_MIPMAP_NEAREST : c.NEAREST
                  );
              J = q[b.X - 1];
              M = t[b.X - 1];
              F = l[C];
              if (u.o()) {
                var d = c.RGBA32F;
                J === c.RGBA && F === c.FLOAT && d && (M = d);
                J === c.RGB && F === c.FLOAT && d && ((M = d), (J = c.RGBA));
              }
              if ((b.C && !b.isFloat) || (b.isFloat && b.isMipmap && ka.Eb()))
                (d = c.RGBA16F) && (M = d), (F = u.ba());
              b.Ma && 'undefined' !== typeof c.texStorage2D && (la = b.Ma);
              b.La && 4 === b.X && (J = window.JEContext.zc());
              if (b.B) c.texImage2D(c.TEXTURE_2D, 0, M, J, F, b.B);
              else if (b.url) c.texImage2D(c.TEXTURE_2D, 0, M, J, F, Q);
              else if (N) {
                try {
                  var e = c.getError();
                  e !== c.NO_ERROR &&
                    console.log('GLERR in SharedTexture :', e);
                  c.texImage2D(c.TEXTURE_2D, 0, M, x, y, 0, J, F, N);
                  c.getError() !== c.NO_ERROR &&
                    (c.texImage2D(c.TEXTURE_2D, 0, M, x, y, 0, J, F, null),
                    c.getError() !== c.NO_ERROR &&
                      c.texImage2D(
                        c.TEXTURE_2D,
                        0,
                        c.RGBA,
                        x,
                        y,
                        0,
                        c.RGBA,
                        c.UNSIGNED_BYTE,
                        null
                      ));
                } catch (Ra) {
                  c.texImage2D(c.TEXTURE_2D, 0, M, x, y, 0, J, F, null);
                }
                b.isKeepArray || (N = null);
              } else c.texImage2D(c.TEXTURE_2D, 0, M, x, y, 0, J, F, null);
              if (b.isMipmap)
                if (!W && G) G.O(), (ma = !0);
                else if (W) {
                  e = Math.log(Math.min(x, y)) / Math.log(2);
                  aa = Array(1 + e);
                  aa[0] = D;
                  for (d = 1; d <= e; ++d) {
                    var f = Math.pow(2, d);
                    var h = x / f;
                    f = y / f;
                    var n = c.createTexture();
                    a(n);
                    c.texParameteri(
                      c.TEXTURE_2D,
                      c.TEXTURE_MIN_FILTER,
                      c.NEAREST
                    );
                    c.texParameteri(
                      c.TEXTURE_2D,
                      c.TEXTURE_MAG_FILTER,
                      c.NEAREST
                    );
                    c.texImage2D(c.TEXTURE_2D, 0, M, h, f, 0, J, F, null);
                    a(null);
                    aa[d] = n;
                  }
                  ma = !0;
                }
              a(null);
              k[g] = -1;
              V && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
              O = !0;
              H && G && (H(G), (H = !1));
            }
            'undefined' === typeof b.isFloat && (b.isFloat = !1);
            'undefined' === typeof b.C && (b.C = !1);
            'undefined' === typeof b.isPot && (b.isPot = !0);
            'undefined' === typeof b.isLinear && (b.isLinear = !1);
            'undefined' === typeof b.isMipmap && (b.isMipmap = !1);
            'undefined' === typeof b.ja && (b.ja = !1);
            void 0 === b.da && (b.da = !1);
            void 0 === b.K && (b.K = !1);
            void 0 === b.Ka && (b.Ka = !1);
            void 0 === b.La && (b.La = !1);
            void 0 === b.X && (b.X = 4);
            void 0 === b.Ja && (b.Ja = !1);
            'undefined' === typeof b.isFlipY &&
              (b.isFlipY = b.url || b.array ? !0 : !1);
            'undefined' === typeof b.isKeepArray && (b.isKeepArray = !1);
            b.data &&
              ((b.array =
                'string' === typeof b.data
                  ? fa(b.data)
                  : b.isFloat
                    ? new Float32Array(b.data)
                    : new Uint8Array(b.data)),
              (b.isFlipY = !1));
            var C = 0,
              p = b.B ? !0 : !1;
            b.isFloat && (b.C = !0);
            b.C && (C = 1);
            b.Ja || u.o() || !b.isFloat || !Z || u.za() || (b.isFloat = !1);
            b.isFloat && (C = 2);
            b.da && X && !window.JEContext.Fc() && (b.da = !1);
            var D = c.createTexture(),
              H = b.ja,
              Q = null,
              N = !1,
              x = 0,
              y = 0,
              O = !1,
              K = n++,
              S = !1,
              R,
              T,
              ca,
              da,
              M,
              J,
              F,
              V = b.isFlipY,
              W = b.C && b.isMipmap && ka && !ka.ib(),
              aa,
              la = -1,
              ma = !1;
            'undefined' !== typeof b.width &&
              b.width &&
              ((x = b.width),
              (y = 'undefined' !== typeof b.height && b.height ? b.height : x));
            var G = {
              get: function() {
                return D;
              },
              A: function() {
                return x;
              },
              H: function() {
                return y;
              },
              Cc: function() {
                return b.url;
              },
              Gc: function() {
                return b.isFloat;
              },
              Ic: function() {
                return b.C;
              },
              Jc: function() {
                return b.isLinear;
              },
              O: function() {
                c.generateMipmap(c.TEXTURE_2D);
              },
              xa: function(b, d) {
                W
                  ? (b || (b = G.Fa()), G.ha(d), a(aa[b]), (k[d] = -1))
                  : G.b(d);
              },
              Fa: function() {
                -1 === la && (la = Math.log(x) / Math.log(2));
                return la;
              },
              Ea: function(b) {
                if (W) {
                  b || (b = G.Fa());
                  m.set('s11');
                  G.ha(0);
                  var d,
                    e = x,
                    f = y;
                  for (d = 1; d <= b; ++d)
                    (e /= 2),
                      (f /= 2),
                      m.G('u9', 0.25 / e, 0.25 / f),
                      c.viewport(0, 0, e, f),
                      a(aa[d - 1]),
                      c.framebufferTexture2D(
                        r.R(),
                        c.COLOR_ATTACHMENT0,
                        c.TEXTURE_2D,
                        aa[d],
                        0
                      ),
                      E.f(!1, 1 === d);
                  k[0] = -1;
                } else G.O();
              },
              ha: function(a) {
                a !== g && (c.activeTexture(f[a]), (g = a));
              },
              b: function(b) {
                if (!O) return !1;
                G.ha(b);
                if (k[b] === K) return !1;
                a(D);
                k[b] = K;
                return !0;
              },
              wa: function(b) {
                c.activeTexture(f[b]);
                g = b;
                a(D);
                k[b] = K;
              },
              l: function() {
                c.framebufferTexture2D(
                  r.R(),
                  c.COLOR_ATTACHMENT0,
                  c.TEXTURE_2D,
                  D,
                  0
                );
              },
              j: function() {
                c.viewport(0, 0, x, y);
                c.framebufferTexture2D(
                  r.R(),
                  c.COLOR_ATTACHMENT0,
                  c.TEXTURE_2D,
                  D,
                  0
                );
              },
              dd: function() {
                c.framebufferTexture2D(
                  r.R(),
                  c.COLOR_ATTACHMENT0,
                  c.TEXTURE_2D,
                  null,
                  0
                );
              },
              resize: function(a, b) {
                x = a;
                y = b;
                h();
              },
              clone: function(a) {
                a = I.a({
                  width: x,
                  height: y,
                  C: b.C,
                  isFloat: b.isFloat,
                  isLinear: b.isLinear,
                  K: b.K,
                  isFlipY: a ? !V : V,
                  isPot: b.isPot
                });
                ja.set('s0');
                r.J();
                a.l();
                c.viewport(0, 0, x, y);
                G.b(0);
                E.f(!0, !0);
                return a;
              },
              Tb: function() {
                c.viewport(0, 0, x, y);
              },
              remove: function() {
                c.deleteTexture(D);
                G = null;
              },
              refresh: function() {
                G.wa(0);
                V && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !0);
                p
                  ? c.texImage2D(c.TEXTURE_2D, 0, M, J, c.UNSIGNED_BYTE, b.B)
                  : c.texImage2D(c.TEXTURE_2D, 0, M, x, y, 0, J, F, N);
                V && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
              },
              Aa: function() {
                var a = x * y * 4;
                T = [
                  new Uint8Array(a),
                  new Uint8Array(a),
                  new Uint8Array(a),
                  new Uint8Array(a)
                ];
                R = [
                  new Float32Array(T[0].buffer),
                  new Float32Array(T[1].buffer),
                  new Float32Array(T[2].buffer),
                  new Float32Array(T[3].buffer)
                ];
                ca = new Uint8Array(4 * a);
                da = new Float32Array(ca.buffer);
                S = !0;
              },
              Qa: function() {
                S || G.Aa();
                c.readPixels(0, 0, x, 4 * y, c.RGBA, c.UNSIGNED_BYTE, ca);
                var a,
                  b = x * y,
                  d = 2 * b,
                  e = 3 * b;
                for (a = 0; a < b; ++a)
                  (R[0][a] = da[a]),
                    (R[1][a] = da[a + b]),
                    (R[2][a] = da[a + d]),
                    (R[3][a] = da[a + e]);
                return R;
              },
              Ca: function() {
                r.D();
                m.set('s12');
                G.b(0);
                c.viewport(0, 0, x, 4 * y);
                for (var a = 0; 4 > a; ++a)
                  c.viewport(0, y * a, x, y),
                    m.Ua('u10', z[a]),
                    E.f(!1, 0 === a);
              },
              ed: function(b) {
                a(D);
                V && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, V);
                c.texImage2D(c.TEXTURE_2D, 0, M, x, y, 0, J, F, b);
                k[g] = K;
                V && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
              },
              fd: function(b, d) {
                a(D);
                c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, d);
                c.texImage2D(c.TEXTURE_2D, 0, M, J, F, b);
                k[g] = K;
                d && c.pixelStorei(c.UNPACK_FLIP_Y_WEBGL, !1);
              },
              Rc: function(a, d) {
                var e = x * y,
                  f = 4 * e;
                a = b.C ? (a ? 'RGBE' : 'JSON') : 'RGBA';
                d && (a = d);
                d = u.o() && !1;
                switch (a) {
                  case 'RGBE':
                    var g = 's47';
                    break;
                  case 'JSON':
                    g = d ? 's0' : 's12';
                    break;
                  case 'RGBA':
                  case 'RGBAARRAY':
                    g = 's6';
                }
                S ||
                  ('RGBA' === a || 'RGBE' === a || 'RGBAARRAY' === a
                    ? ((T = new Uint8Array(f)), (S = !0))
                    : 'JSON' !== a || d || G.Aa());
                r.D();
                m.set(g);
                G.b(0);
                if ('RGBA' === a || 'RGBE' === a || 'RGBAARRAY' === a) {
                  c.viewport(0, 0, x, y);
                  E.f(!0, !0);
                  c.readPixels(0, 0, x, y, c.RGBA, c.UNSIGNED_BYTE, T);
                  if ('RGBAARRAY' === a) return { data: T };
                  v ||
                    ((A = document.createElement('canvas')),
                    (w = A.getContext('2d')),
                    (v = !0));
                  A.width = x;
                  A.height = y;
                  B = w.createImageData(x, y);
                  B.data.set(T);
                  w.putImageData(B, 0, 0);
                  var h = A.toDataURL('image/png');
                } else if ('JSON' === a)
                  if (d)
                    (h = new Float32Array(e)),
                      c.viewport(0, 0, x, y),
                      E.f(!0, !0),
                      c.readPixels(0, 0, x, y, c.RGBA, c.FLOAT, h);
                  else {
                    for (h = 0; 4 > h; ++h)
                      c.viewport(0, y * h, x, y),
                        m.Ua('u10', z[h]),
                        E.f(!h, !h);
                    G.Qa();
                    h = Array(e);
                    for (g = 0; g < e; ++g)
                      (h[4 * g] = R[0][g]),
                        (h[4 * g + 1] = R[1][g]),
                        (h[4 * g + 2] = R[2][g]),
                        (h[4 * g + 3] = R[3][g]);
                  }
                return {
                  format: a,
                  data: h,
                  width: x,
                  height: y,
                  isMirrorY: b.K,
                  isFlipY: 'RGBA' === a ? b.isFlipY : !b.isFlipY
                };
              }
            };
            b.isMipmap && !W && O && !ma && (G.O(), (ma = !0));
            if (b.url)
              a(D),
                c.texImage2D(
                  c.TEXTURE_2D,
                  0,
                  c.RGBA,
                  1,
                  1,
                  0,
                  c.RGBA,
                  c.UNSIGNED_BYTE,
                  null
                ),
                (Q = new Image()),
                (Q.hc = 'Anonymous'),
                (Q.crossOrigin = 'Anonymous'),
                (Q.src = b.url),
                (Q.onload = function() {
                  x = Q.width;
                  y = Q.height;
                  h();
                });
            else if (b.B) {
              var ta = function() {
                x = void 0 !== b.B.videoWidth ? b.B.videoWidth : b.B.width;
                y = void 0 !== b.B.videoHeight ? b.B.videoHeight : b.B.height;
                x ? h() : setTimeout(ta, 1);
              };
              ta();
            } else
              b.array
                ? (b.C && !b.isFloat
                    ? b.array instanceof Uint16Array
                      ? ((N = b.array), h())
                      : e()
                        ? ((N = d(b.array)), h())
                        : (h(), I.rb(G, b.array, V))
                    : ((N = b.isFloat
                        ? b.array instanceof Float32Array
                          ? b.array
                          : new Float32Array(b.array)
                        : b.array instanceof Uint8Array
                          ? b.array
                          : new Uint8Array(b.array)),
                      h()),
                  b.isKeepArray ||
                    (N && N !== b.array && (N = null), delete b.array))
                : h();
            G.wb = G.A;
            H && O && (H(G), (H = !1));
            return G;
          },
          D: function(b) {
            b !== g && (c.activeTexture(f[b]), (g = b));
            k[b] = -1;
            a(null);
          },
          cc: function(a) {
            h.random.b(a);
          },
          reset: function() {
            for (var a = 0; a < f.length; ++a) k[a] = -1;
            g = -1;
          },
          Qc: function() {
            g = -1;
          },
          bd: function() {
            for (var a = 0; a < f.length; ++a) I.D(a);
          },
          sb: function() {
            h && (h.random.remove(), h.Wa.remove());
          },
          cd: function(a, b) {
            if ('RGBA' === a.format || 'RGBE' === a.format) {
              var d = new Image();
              d.src = a.data;
              d.onload = function() {
                I.a({
                  K: a.isMirrorY,
                  isFlipY: a.isFlipY,
                  isFloat: !1,
                  B: d,
                  ja: function(d) {
                    if ('RGBA' === a.format) b(d);
                    else {
                      var e = a.width,
                        f = a.height,
                        g = I.a({
                          K: a.isMirrorY,
                          isFloat: !0,
                          width: e,
                          height: f,
                          isFlipY: a.isFlipY
                        });
                      r.J();
                      c.viewport(0, 0, e, f);
                      m.set('s48');
                      g.l();
                      d.b(0);
                      E.f(!0, !0);
                      I.D(0);
                      b(g);
                      c.flush();
                      setTimeout(d.remove, 50);
                    }
                  }
                });
              };
            } else
              'JSON' === a.format
                ? b(
                    I.a({
                      isFloat: !0,
                      isFlipY: a.isFlipY,
                      width: a.width,
                      height: a.height,
                      array: new Float32Array(a.data)
                    })
                  )
                : b(!1);
          }
        };
      return I;
    })(),
    pa = {
      a: function(a) {
        var b = [L.a(a), L.a(a)],
          d = [b[1], b[0]],
          e = d,
          g = {
            Ob: function(a) {
              e[1].l();
              e[0].b(a);
              g.Va();
            },
            Pb: function(a) {
              e[1].j();
              e[0].b(a);
              g.Va();
            },
            Va: function() {
              e = e === b ? d : b;
            },
            refresh: function() {
              e[0].refresh();
              e[1].refresh();
            },
            b: function(a) {
              e[0].b(a);
            }
          };
        return g;
      }
    },
    u = (function() {
      function a() {
        b = 'undefined' === typeof oa ? window.JEContext : oa;
        d = !0;
      }
      var b,
        d = !1,
        e = !1,
        g = !1,
        f = !1,
        n = !1,
        k = !1,
        h = !1,
        l = !1,
        q = !1,
        t = !1,
        p = !1,
        v = !0,
        A = !0,
        w = !0,
        B,
        z = {
          i: function() {
            if (d) return !0;
            a();
            z.o() || (z.Da(), z.la());
            z.ob();
            z.pb();
            r.i();
            L.i();
            if (!z.kb()) return !1;
            E.i();
            L.Ab();
            return !0;
          },
          A: function() {
            d || a();
            return b.A();
          },
          H: function() {
            d || a();
            return b.H();
          },
          o: function() {
            d || a();
            return b.o();
          },
          ob: function() {
            p = (t =
              c.getExtension('EXT_color_buffer_float') ||
              c.getExtension('WEBGL_color_buffer_float') ||
              c.getExtension('OES_color_buffer_float'))
              ? !0
              : !1;
            window.GL_EXT_COLORBUFFERFLOAT = t;
          },
          pb: function() {
            c.getExtension('EXT_color_buffer_half_float') ||
              c.getExtension('WEBGL_color_buffer_half_float') ||
              c.getExtension('OES_color_buffer_half_float');
          },
          Da: function() {
            if (!e) {
              this.o() ||
                ((g =
                  c.getExtension('OES_texture_float') ||
                  c.getExtension('MOZ_OES_texture_float') ||
                  c.getExtension('WEBKIT_OES_texture_float')),
                (n = (window.GL_EXT_FLOAT = g) ? !0 : !1));
              if (n || this.o())
                (f =
                  c.getExtension('OES_texture_float_linear') ||
                  c.getExtension('MOZ_OES_texture_float_linear') ||
                  c.getExtension('WEBKIT_OES_texture_float_linear')),
                  (window.GL_EXT_FLOATLINEAR = f);
              e = !0;
            }
          },
          la: function() {
            if (!q) {
              if (!this.o()) {
                if (
                  (k =
                    c.getExtension('OES_texture_half_float') ||
                    c.getExtension('MOZ_OES_texture_half_float') ||
                    c.getExtension('WEBKIT_OES_texture_half_float'))
                )
                  (B = k.HALF_FLOAT_OES), (h = !0);
                window.GL_EXT_HALFFLOAT = k;
              }
              if (h || this.o())
                (l =
                  c.getExtension('OES_texture_half_float_linear') ||
                  c.getExtension('MOZ_OES_texture_half_float_linear') ||
                  c.getExtension('WEBKIT_OES_texture_half_float_linear')),
                  (window.GL_EXT_HALFFLOATLINEAR = l);
              q = !0;
            }
          },
          ba: function() {
            if (z.o()) return c.HALF_FLOAT;
            z.la();
            return h ? B : c.FLOAT;
          },
          za: function() {
            return v;
          },
          hb: function() {
            return A;
          },
          dc: function() {
            return w;
          },
          gb: function() {
            return p;
          },
          mb: function() {
            A = v = !0;
            var a = c.createFramebuffer();
            c.bindFramebuffer(c.FRAMEBUFFER, a);
            var b = c.createTexture();
            c.bindTexture(c.TEXTURE_2D, b);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MIN_FILTER, c.NEAREST);
            c.texImage2D(
              c.TEXTURE_2D,
              0,
              z.o() && c.RGBA32F ? c.RGBA32F : c.RGBA,
              1,
              1,
              0,
              c.RGBA,
              c.FLOAT,
              null
            );
            c.framebufferTexture2D(
              r.R(),
              c.COLOR_ATTACHMENT0,
              c.TEXTURE_2D,
              b,
              0
            );
            var d = c.checkFramebufferStatus(r.oa());
            d !== c.FRAMEBUFFER_COMPLETE && (v = !1);
            c.texImage2D(
              c.TEXTURE_2D,
              0,
              z.o() && c.RGBA16F ? c.RGBA16F : c.RGBA,
              1,
              1,
              0,
              c.RGBA,
              z.ba(),
              null
            );
            c.framebufferTexture2D(
              r.R(),
              c.COLOR_ATTACHMENT0,
              c.TEXTURE_2D,
              b,
              0
            );
            d = c.checkFramebufferStatus(r.oa());
            d !== c.FRAMEBUFFER_COMPLETE && (A = !1);
            c.bindTexture(c.TEXTURE_2D, null);
            c.bindFramebuffer(c.FRAMEBUFFER, null);
            c.deleteTexture(b);
            c.deleteFramebuffer(a);
          },
          lb: function() {
            var a = r.a({ width: 1 });
            a.Ta();
            var b = L.a({ width: 1, isFloat: !0, X: 3 });
            a.l();
            b.l();
            c.flush();
            c.checkFramebufferStatus(r.oa()) !== c.FRAMEBUFFER_COMPLETE
              ? (L.Lb(), (w = !1))
              : (w = !0);
            a.remove();
            b.remove();
          },
          kb: function() {
            z.mb();
            if (!v && !A) return !1;
            z.lb();
            return !0;
          }
        };
      return z;
    })(),
    ka = (function() {
      var a = !1,
        b = [0.8, 1, 0.8, 1],
        d = 0,
        e,
        g = new Uint8Array(4),
        f = b.concat(b, b, b),
        n = !0,
        k = {
          i: function() {
            function b(a, b, d, e) {
              c.texParameteri(
                c.TEXTURE_2D,
                c.TEXTURE_MIN_FILTER,
                e ? c.NEAREST_MIPMAP_NEAREST : c.LINEAR
              );
              try {
                var f = c.getError();
                f !== c.NO_ERROR &&
                  console.log('GLERR in test_mipmapping() :', f);
                c.texImage2D(c.TEXTURE_2D, 0, a, 2, 2, 0, c.RGBA, b, d);
                if (c.getError() !== c.NO_ERROR) return !1;
              } catch (Z) {
                return !1;
              }
              e && c.generateMipmap(c.TEXTURE_2D);
              E.ia();
              E.f(!1, !0);
              c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, g);
              return 0 !== g[0];
            }
            function k(a) {
              return u.za() && b(t, c.FLOAT, new Float32Array(f), a)
                ? ((d = 3), !0)
                : !1;
            }
            function q(a) {
              return u.hb()
                ? b(p, u.ba(), new Uint16Array(f), a) ||
                  b(p, c.FLOAT, new Float32Array(f), a)
                  ? ((d = 2), !0)
                  : !1
                : !1;
            }
            u.Da();
            u.la();
            var t = c.RGBA,
              p = c.RGBA;
            if (oa.o()) {
              var v = c.RGBA32F;
              v && (t = v);
              (v = c.RGBA16F) && (p = v);
            }
            E.i();
            r.reset();
            r.D();
            c.viewport(0, 0, 1, 1);
            m.set('s0');
            a = !0;
            e = c.createTexture();
            c.activeTexture(c.TEXTURE0);
            c.bindTexture(c.TEXTURE_2D, e);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_S, c.REPEAT);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_WRAP_T, c.REPEAT);
            c.texParameteri(c.TEXTURE_2D, c.TEXTURE_MAG_FILTER, c.NEAREST);
            if (q(!0) || k(!0)) return !0;
            n = !1;
            return q(!1) || k(!1) ? !0 : !1;
          },
          ib: function() {
            return n;
          },
          xc: function() {
            return d;
          },
          Hc: function() {
            a || k.i();
            return 3 === d;
          },
          Eb: function() {
            a || k.i();
            return 2 === d;
          }
        };
      return k;
    })(),
    qa = {
      a: function(a) {
        var b = L.a(a.alpha),
          d = L.a(a.beta);
        return {
          nb: function() {
            b.b(1);
            d.b(2);
          }
        };
      }
    },
    ua = {
      a: function(a) {
        var b = a.Ub;
        b.index = a.index;
        b.L = a.L;
        b.parent = a.parent;
        switch (b.type) {
          case 'input':
            a = ra.a(b);
            break;
          default:
            a = sa.a(b);
        }
        return a;
      }
    },
    ra = {
      a: function(a) {
        'undefined' === typeof a.sift && (a.sift = !1);
        'undefined' === typeof a.DWT && (a.DWT = !1);
        'undefined' === typeof a.blur && (a.blur = !1);
        'undefined' === typeof a.siftOutWidth && (a.siftOutWidth = !1);
        'undefined' === typeof a.filterBank && (a.filterBank = !1);
        'undefined' === typeof a.poolType && (a.poolType = 'max');
        'undefined' === typeof a.postpreprocessing &&
          (a.postpreprocessing = 'copy');
        'undefined' === typeof a.density && (a.density = 1);
        a.filterBank &&
          (window.FilterBank.Uc(a.poolType, a.postpreprocessing),
          window.FilterBank.Sc(a.density));
        var b = !1;
        if (a.mask) {
          b = !0;
          va && void 0 !== va.ab && (a.mask = va.ab + a.mask);
          var d = L.a({ isFloat: !1, url: a.mask });
        }
        var e = !1,
          g = 'undefined' !== typeof a.preprocessing ? a.preprocessing : !1,
          f = !1;
        a.sift
          ? window.Sift.i({ zb: c, aa: !1, width: a.size, Nc: a.siftOutWidth })
          : a.DWT && window.DWT.i({ zb: c, aa: !1, width: a.size });
        switch (g) {
          case 'sobel':
            var n = 's30';
            f = !0;
            break;
          case 'meanNormalization':
            n = 's31';
            f = !0;
            break;
          case 'grayScale':
            n = 's29';
            f = !1;
            break;
          case 'copy':
            n = 's0';
            break;
          case 'inputLightRegulation':
            n = 's29';
            wa.i({ width: a.size, Na: a.nBlurPass, Db: !1 });
            e = !0;
            break;
          case 'direct':
          case 'none':
            n = !1;
            break;
          default:
            n = 's3';
        }
        b && (n += 'Mask');
        if (a.blur) var k = L.a({ isFloat: !1, isPot: !1, width: a.size });
        var h = L.a({ isFloat: !1, isPot: !1, width: a.size }),
          l,
          q,
          t,
          p = {
            A: function() {
              return a.sift
                ? window.Sift.S()
                : a.filterBank
                  ? window.FilterBank.S()
                  : a.size;
            },
            S: function() {
              return p.A();
            },
            Ha: function() {
              return a.sift
                ? window.ift.W()
                : a.DWT
                  ? window.DWT.W()
                  : a.filterBank
                    ? window.FilterBank.W()
                    : e
                      ? wa.W()
                      : h;
            },
            F: function() {
              r.J();
              a.blur &&
                (k.j(),
                m.set('s49'),
                m.G('u9', 1 / a.size, 1 / a.size),
                E.f(!1, !0),
                k.b(0));
              n &&
                (m.set(n),
                f && m.w('u29', 1 / a.size),
                h.j(),
                b && d.b(1),
                E.f(!1, !1),
                h.b(0),
                e
                  ? wa.ea(h)
                  : a.sift
                    ? (m.N(), window.Sift.ea())
                    : a.DWT
                      ? (m.N(), window.DWT.ea(4))
                      : a.filterBank && (m.N(), window.FilterBank.ea(h)));
            },
            Tc: function(a) {
              l = a;
            },
            ra: function(b) {
              l = b;
              q = 's42';
              t = L.a({ isFloat: !0, isPot: !0, width: a.size });
            },
            ma: function() {
              return t;
            },
            I: function() {
              var a = p.Ha(),
                b = l.ma();
              l.na().I(b);
              b = l.na().P();
              m.set(q);
              m.w('u28', b * b);
              a.b(1);
              t.j();
              E.f(!1, !1);
              t.b(0);
            }
          };
        return p;
      }
    },
    sa = {
      a: function(a) {
        'undefined' === typeof a.disableNormalize && (a.disableNormalize = !1);
        var b = [],
          d = [],
          e,
          g,
          f = !1,
          n,
          k = !0,
          h,
          l,
          q = a.isReorganize ? a.isReorganize : !1,
          t = a.kernelsNumber ? !0 : !1,
          p,
          v,
          A,
          w,
          B,
          z,
          X,
          Z,
          O = a.dynPelu ? qa.a(a.dynPelu) : !1,
          S = O ? !0 : !1,
          K = { isEnabled: !1 },
          I;
        if ('softmax' === a.type) {
          a.activation = 'softmax';
          a.size = Math.pow(
            2,
            Math.ceil(Math.log(Math.sqrt(a.num_classes)) / Math.log(2))
          );
          a.sparsity = 'undefined' !== typeof a.sparsity ? a.sparsity : a.L.S();
          a.gain = 'undefined' !== typeof a.gain ? a.gain : 1;
          m.M('s20', [{ type: '1f', name: 'u12', value: a.gain }]);
          var C = L.a({ isFloat: !0, isPot: !1, width: a.size }),
            Y = L.a({ isFloat: !0, isPot: !1, width: a.size, isMipmap: !0 });
          k = !1;
          var U = new Uint8Array(Math.pow(4 * a.size, 2)),
            P;
          for (P = 0; P < a.size * a.size; ++P) {
            var D = P < a.num_classes ? 255 : 0;
            U[4 * P] = D;
            U[4 * P + 1] = D;
            U[4 * P + 2] = D;
            U[4 * P + 3] = D;
          }
          var H = L.a({ isFloat: !1, isPot: !1, width: a.size, array: U });
        } else
          a.cost
            ? ((a.sparsity =
                'undefined' !== typeof a.sparsity ? a.sparsity : a.L.S()),
              (k = !1))
            : 'full' === a.connectivityUp && (a.sparsity = a.L.S());
        var Q = {
            elu: 's15',
            elu01: 's16',
            relu: 's14',
            arctan: 's18',
            sigmoid: 's13',
            copy: 's0',
            softplus: 's19',
            softmax: 's20',
            dynPelu: 's17'
          }[a.activation],
          N = a.sparsity * a.sparsity,
          x = !1,
          y = a.size;
        if (a.maxPooling) {
          switch (a.maxPooling.size) {
            case 2:
              var ha = 's32';
              break;
            case 4:
              ha = 's33';
          }
          x = !0;
          y /= a.maxPooling.size;
          var na = L.a({ isFloat: !0, isPot: !1, width: y });
        }
        var ia =
          'undefined' !== typeof a.normalization && a.normalization ? !0 : !1;
        if (ia) {
          var R = 's50' + a.index;
          m.Bb('s50', R, [((a.normalization.n - 1) / 2).toFixed(1)]);
          m.M(R, [
            { type: '1i', name: 'u0', value: 0 },
            { type: '2f', name: 'u9', value: [1 / a.size, 1 / a.size] },
            { type: '1f', name: 'u8', value: a.normalization.alpha },
            { type: '1f', name: 'u11', value: a.normalization.beta },
            { type: '1f', name: 'u36', value: a.normalization.k }
          ]);
          var T = L.a({
            isFloat: !0,
            isPot: !0,
            width: a.size
          });
          var ca = L.a({ isFloat: !0, isPot: !0, width: a.size });
        }
        U = a.size * a.sparsity;
        var da = Math.log(U / a.size) / Math.log(2),
          M = L.a({ isMipmap: !0, isFloat: !0, isPot: !0, width: U, Ma: da }),
          J = L.a({ isFloat: !0, isPot: !0, width: a.size }),
          F;
        k && (F = L.a({ isFloat: !0, isPot: !1, width: a.size }));
        var V = L.a(a.bias),
          W,
          aa = {
            A: function() {
              return a.size;
            },
            S: function() {
              return y;
            },
            Ga: function() {
              return a.num_classes;
            },
            cb: function(a) {
              I.b(a);
            },
            Ib: function() {
              a.remap &&
                a.remap.isEnabled &&
                (K = {
                  isEnabled: !0,
                  Gb: L.a({
                    isFloat: !1,
                    isFlipY: !1,
                    array: new Uint8Array(a.remap.maskTexture.data),
                    width: a.remap.maskTexture.width,
                    isPot: !1
                  }),
                  layers: a.remap.layers.map(function(b) {
                    return a.parent.vb(b);
                  }),
                  depth: a.remap.depth
                });
            },
            Nb: function() {
              switch (a.connectivityUp) {
                case 'gaussian':
                  W = xa.a(a.connectivity);
                  break;
                case 'direct':
                  W = ya.a(a.connectivity);
                  break;
                case 'square':
                  W = za.a(a.connectivity);
                  break;
                case 'full':
                  W = Aa.a(a.connectivity);
                  break;
                case 'conv':
                  (l = a.kernelsNumber),
                    (W = Ba.a(a.connectivity)),
                    q &&
                      (h = L.a({
                        width: y,
                        isFloat: !0,
                        isFlipY: !1,
                        isPot: !1
                      }));
              }
            },
            F: function(b, d) {
              I = b;
              M.j();
              t && V.b(2);
              W.F(K);
              M.b(0);
              M.Ea(da);
              J.j();
              t ? m.set('s0') : (m.set('s28'), m.w('u28', N), V.b(1));
              M.xa(da, 0);
              E.f(!1, !1);
              m.set(Q);
              ia ? T.l() : F.l();
              J.b(0);
              S && O.nb();
              E.f(!1, !1);
              ia &&
                (m.set(R),
                ca.l(),
                T.b(0),
                E.f(!1, !1),
                m.set('s51'),
                m.w('u8', 1),
                F.l(),
                ca.b(1),
                E.f(!1, !1));
              if (k)
                return (
                  x
                    ? (na.j(),
                      F.b(0),
                      m.set(ha),
                      m.G('u9', 1 / a.size, 1 / a.size),
                      E.f(!1, !1),
                      (d = na))
                    : (d = F),
                  d.b(0),
                  q &&
                    (h.l(),
                    m.set('s22'),
                    m.G('u16', l, y / l),
                    E.f(!1, !1),
                    (d = h),
                    h.b(0)),
                  (z = d)
                );
              if ('softmax' === a.type) {
                m.set('s20');
                F.b(0);
                C.l();
                E.f(!1, !1);
                a.disableNormalize
                  ? (b = C)
                  : (m.set('s2'),
                    C.b(0),
                    H.b(1),
                    Y.l(),
                    E.f(!1, !1),
                    m.set('s0'),
                    g.j(),
                    Y.b(0),
                    Y.Ea(!1),
                    E.f(!1, !1),
                    m.set('s21'),
                    e.j(),
                    Y.xa(!1, 0),
                    m.w('u14', F.wb()),
                    g.b(1),
                    E.f(!1, !1),
                    (b = e));
                if (d) {
                  switch (f) {
                    case 'cpuRGBAAvg':
                      break;
                    default:
                      var p = aa.Pa(b);
                  }
                  return p;
                }
                return !1;
              }
              if (a.cost) {
                m.set('gpuRawAvg' === f ? 's8' : 's7');
                d = F;
                a.disableNormalize ||
                  (m.w('u6', 1 / a.size), e.j(), F.b(0), E.f(!1, !1), (d = e));
                z = d;
                switch (f) {
                  case 'cpuRGBA2Float':
                    d.Ca();
                    p = aa.Pa(d);
                    n(p);
                    break;
                  case 'gpuRawAvg':
                  case 'gpuRaw':
                    d.b(0), n(d);
                }
                return !1;
              }
            },
            jb: function(h) {
              h && 'undefined' !== typeof h.Oa && ((f = h.Oa), (n = h.Hb));
              F = L.a({
                isFloat: !0,
                isPot: !0,
                isMipmap: 'softmax' === a.type,
                width: a.size
              });
              'softmax' === a.type &&
                (g = L.a({ isFloat: !0, isPot: !0, width: 1 }));
              var k = 0,
                l = 0,
                t =
                  'undefined' !== typeof a.num_classes
                    ? a.num_classes
                    : a.size * a.size;
              for (h = 0; h < t; ++h)
                b.push(k + (a.size - 1 - l) * a.size),
                  d.push([-1, -1, -1, -1]),
                  ++k,
                  k === a.size && ((k = 0), ++l);
              a.disableNormalize ||
                (e = L.a({ isFloat: !0, isPot: !0, width: a.size }));
            },
            Pa: function(a) {
              a.Ca();
              var e = a.Qa();
              b.forEach(function(a, b) {
                d[b][0] = e[0][a];
                d[b][1] = e[1][a];
                d[b][2] = e[2][a];
                d[b][3] = e[3][a];
              });
              return d;
            },
            ra: function(b) {
              B = b;
              Z = { ad: 's43', Pc: 's44', gc: 's42', kc: 's45', ac: 's46' }[
                a.activation
              ];
              b = { isFloat: !0, isPot: !0, width: a.size };
              X = L.a(b);
              v = L.a(b);
              x && L.a(b);
              q && (A = L.a(b));
              k || (w = L.a({ isFloat: !0, isPot: !1, width: a.size }));
            },
            ma: function() {
              return p;
            },
            I: function(b) {
              if (!k) {
                w.j();
                m.set('quadratic' === a.cost ? 's41' : 's40');
                b.b(1);
                z.b(0);
                E.f(!1, !1);
                w.b(0);
                var d = 1;
              }
              b = J;
              k &&
                ((d = B.ma()),
                q &&
                  (X.j(),
                  m.set('s22'),
                  J.b(0),
                  m.G('u16', l, y / l),
                  E.f(!1, !1),
                  (b = X),
                  d.b(0)),
                B.na().I(d),
                (d = B.na().P()));
              m.set(Z);
              m.w('u28', d * d);
              b.b(1);
              v.j();
              E.f(!1, !1);
              p = v;
              q &&
                (m.set('s22'),
                A.j(),
                v.b(0),
                m.G('u16', y / l, l),
                E.f(!1, !1),
                (p = A));
              p.b(0);
            }
          };
        a.L && aa.Nb(a.L);
        return aa;
      }
    };
  function Ca() {
    var a, b, d;
    a || (a = {});
    this.vb = function(a) {
      return b[a];
    };
    this.Kb = function(a) {
      var e = !1;
      b = a.map(function(a, b) {
        return (e = a = ua.a({ index: b, parent: this, Ub: a, L: e }));
      });
      d = b[b.length - 1];
      b.forEach(function(a, b) {
        0 !== b && a.Ib();
      });
    };
    this.F = function(a, d) {
      var e = d;
      b.forEach(function(b) {
        e = b.F(e, a);
      });
      return e;
    };
    this.ra = function() {
      for (var a = b.length - 1, d; 0 <= a; --a)
        (d = a !== b.length - 1 ? b[a + 1] : !1), b[a].ra(d);
    };
    this.I = function(a) {
      for (var d = b.length - 1; 0 <= d; --d) b[d].I(a);
    };
    this.W = function() {
      return d.Ha();
    };
    this.Mb = function(a) {
      d.jb(a);
    };
    this.Ga = function() {
      return d.Ga();
    };
  }
  var ya = {
      a: function(a) {
        var b = L.a(a.weights);
        delete a.weights.data;
        return {
          P: function() {
            return 1;
          },
          ca: function() {
            return b;
          },
          F: function() {
            m.set('s27');
            b.b(1);
            E.f(!1, !1);
          }
        };
      }
    },
    Aa = {
      a: function(a) {
        var b = a.fromLayerSize * a.toLayerSize,
          d = a.fromLayerSize,
          e = L.a(a.weights),
          g = L.a({ isFloat: !0, isPot: !0, width: b, isMipmap: !0 }),
          f = L.a({ isFloat: !0, isPot: !0, width: a.fromLayerSize });
        return {
          P: function() {
            return d;
          },
          ca: function() {
            return e;
          },
          vc: function() {
            return window._fboWeights;
          },
          F: function(b) {
            if (b.isEnabled) {
              m.set('s25');
              b.Gb.b(3);
              var d,
                f = Math.min(b.layers.length, b.depth);
              for (d = 0; d < f; ++d) b.layers[d].cb(4 + d);
            } else m.set('s24');
            m.w('u19', a.toLayerSize);
            e.b(1);
            E.f(!1, !1);
          },
          I: function() {
            m.set('s38');
            m.w('u19', a.toLayerSize);
            m.w('u27', a.fromLayerSize);
            g.j();
            e.b(1);
            E.f(!1, !1);
            f.j();
            m.set('s0');
            g.b(0);
            g.O();
            E.f(!1, !1);
            f.b(0);
          }
        };
      }
    },
    xa = {
      a: function(a) {
        var b = a.toSparsity * a.toLayerSize,
          d = b / a.fromLayerSize,
          e = L.a(a.weights),
          g = L.a({
            isFloat: !0,
            isPot: !0,
            width: b,
            array: new Float32Array(a.weightsFromTo)
          }),
          f = L.a({
            width: b,
            isFloat: !0,
            array: new Float32Array(a.fromBindings),
            isPot: !0
          }),
          n = L.a({
            width: b,
            isFloat: !0,
            array: new Float32Array(a.toBindings),
            isPot: !0
          });
        return {
          P: function() {
            return d;
          },
          ca: function() {
            return e;
          },
          ub: function() {
            return f;
          },
          xb: function() {
            return n;
          },
          yb: function() {
            return g;
          },
          F: function() {
            m.set('s23');
            e.b(1);
            n.b(2);
            E.f(!1, !0);
          }
        };
      }
    },
    za = {
      a: function(a) {
        var b = a.fromLayerSize,
          d = a.toLayerSize,
          e = a.toSparsity * d,
          g = e / b,
          f = a.toSparsity,
          n = b / d,
          k,
          h,
          l,
          q,
          t = 0,
          p = 0,
          v = 0,
          A = Array(f * d * f * d * 4),
          w = Array(f * d * f * d * 4),
          B = Array(f * d * f * d * 4),
          z = Array(b * b);
        for (k = 0; k < z.length; ++k) z[k] = 0;
        var X = Math.floor(f / 2),
          Z = 0.5 / d,
          O = 0.5 / b,
          S = 0.5 / e;
        for (k = 0; k < d; ++k)
          for (h = 0; h < d; ++h) {
            var K = Math.round(k * n);
            var I = Math.round(h * n);
            var C = k / d;
            var Y = h / d;
            C += Z;
            Y += Z;
            for (l = 0; l < f; ++l)
              for (q = 0; q < f; ++q) {
                var U = t / e;
                var P = p / e;
                var D = K + l - X;
                var H = I + q - X;
                0 > D && (D += b);
                0 > H && (H += b);
                D >= b && (D -= b);
                H >= b && (H -= b);
                var Q = D / b;
                var N = H / b;
                P = 1 - P - 1 / e;
                Q += O;
                N += O;
                U += S;
                P += S;
                A[4 * v] = Q;
                A[4 * v + 1] = N;
                A[4 * v + 2] = C;
                A[4 * v + 3] = Y;
                var x = k * f + l,
                  y = h * f + q;
                y = d * f - y - 1;
                x = y * d * f + x;
                w[4 * x] = U;
                w[4 * x + 1] = P;
                w[4 * x + 2] = Q;
                w[4 * x + 3] = N;
                Q = z[H * b + D]++;
                N = Q % g;
                D = D * g + N;
                H = H * g + (Q - N) / g;
                H = b * g - 1 - H;
                H = H * b * g + D;
                B[4 * H] = U;
                B[4 * H + 1] = P;
                B[4 * H + 2] = C;
                B[4 * H + 3] = Y;
                ++t >= e && ((t = 0), ++p);
                ++v;
              }
          }
        var ha = L.a(a.weights),
          na = L.a({
            isFloat: !0,
            isPot: !0,
            width: e,
            array: new Float32Array(A)
          }),
          ia = L.a({
            width: e,
            isFloat: !0,
            array: new Float32Array(B),
            isPot: !0
          });
        B = null;
        var R = L.a({
          width: e,
          isFloat: !0,
          array: new Float32Array(w),
          isPot: !0
        });
        w = null;
        var T = L.a({ isFloat: !0, isPot: !0, width: e, isMipmap: !0 }),
          ca = L.a({ isFloat: !0, isPot: !0, width: e / g });
        return {
          P: function() {
            return g;
          },
          ca: function() {
            return ha;
          },
          ub: function() {
            return ia;
          },
          xb: function() {
            return R;
          },
          yb: function() {
            return na;
          },
          F: function() {
            m.set('s23');
            ha.b(1);
            R.b(2);
            E.f(!1, !1);
          },
          I: function() {
            m.set('s37');
            T.j();
            ia.b(1);
            ha.b(2);
            E.f(!1, !1);
            m.set('s0');
            ca.j();
            T.b(0);
            T.O();
            E.f(!1, !1);
            ca.b(0);
          }
        };
      }
    },
    Ba = {
      a: function(a) {
        function b() {
          m.w('u25', d);
          m.w('u26', e);
          m.w('u19', a.toLayerSize);
          m.w('u27', a.fromLayerSize);
        }
        var d = a.kernelsNumber,
          e = a.toSparsity,
          g = e * a.toLayerSize,
          f = g / a.fromLayerSize,
          n = L.a(a.weights),
          k = L.a({ isFloat: !0, isPot: !0, width: g, isMipmap: !0 }),
          h = L.a({ isFloat: !0, isPot: !0, width: a.fromLayerSize });
        return {
          P: function() {
            return f;
          },
          Ac: function() {
            return e;
          },
          ca: function() {
            return n;
          },
          F: function() {
            m.set('s26');
            b();
            n.b(1);
            E.f(!1, !1);
          },
          I: function() {
            m.set('s39');
            b();
            k.j();
            n.b(1);
            E.f(!1, !1);
            m.set('s0');
            h.j();
            k.b(0);
            k.O();
            E.f(!1, !1);
            h.b(0);
          }
        };
      }
    },
    wa = (function() {
      var a, b, d, e, g, f, n, k, h;
      return {
        i: function(l) {
          a = l.Na ? l.Na : 3;
          b = l.width ? l.width : 64;
          e = l.Db ? !0 : !1;
          l = { isFloat: !1, width: b, isPot: !1, isFlipY: !1 };
          g = L.a(l);
          f = L.a(l);
          n = L.a(l);
          k = L.a(l);
          h = L.a({ isFloat: !0, width: b, isPot: !1, isFlipY: !1 });
          d = 1 / b;
        },
        ea: function(b) {
          m.set('s35');
          for (var l = 0; l < a; ++l)
            g.l(),
              m.G('u9', d, 0),
              E.f(e, !1),
              f.l(),
              g.b(0),
              m.G('u9', 0, d),
              E.f(e, !1),
              f.b(0);
          m.set('s34');
          k.l();
          b.b(0);
          E.f(e);
          m.set('s35');
          for (l = 0; l < a; ++l)
            n.l(),
              k.b(0),
              m.G('u9', d, 0),
              E.f(e, !1),
              k.l(),
              n.b(0),
              m.G('u9', 0, d),
              E.f(e, !1);
          m.set('s36');
          h.l();
          b.b(0);
          f.b(1);
          k.b(2);
          E.f(e, !1);
          h.b(0);
        },
        W: function() {
          return h;
        }
      };
    })();
  function Da() {
    var a = !1,
      b = navigator.userAgent || navigator.vendor || window.opera;
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        b
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        b.substr(0, 4)
      )
    )
      a = !0;
    return a;
  }
  function Ea() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }
  function Fa() {
    var a = navigator.userAgent.toLowerCase();
    return -1 == a.indexOf('safari') || -1 < a.indexOf('chrome') ? !1 : !0;
  }
  function Ga() {
    return navigator.mediaDevices && navigator.mediaDevices.getUserMedia
      ? !0
      : !1;
  }
  function Ha(a) {
    if (!a) return a;
    var b = !1;
    if (a.video) {
      var d = function(a) {
        var b = {};
        'undefined' !== typeof a.min && (b.min = a.min);
        'undefined' !== typeof a.max && (b.max = a.max);
        'undefined' !== typeof a.ideal && (b.ideal = a.ideal);
        return b;
      };
      b = {};
      'undefined' !== typeof a.video.width && (b.width = d(a.video.width));
      'undefined' !== typeof a.video.height && (b.height = d(a.video.height));
      'undefined' !== typeof a.video.facingMode &&
        (b.facingMode = a.video.facingMode);
    }
    b = { audio: a.audio, video: b };
    'undefined' !== typeof a.deviceId && (b.deviceId = a.deviceId);
    return b;
  }
  function Ia(a) {
    var b = a.video.width;
    a.video.width = a.video.height;
    a.video.height = b;
    return a;
  }
  function Ja(a) {
    function b(a) {
      return [
        480,
        576,
        640,
        648,
        720,
        768,
        800,
        960,
        1080,
        1152,
        1280,
        1366,
        1920
      ].sort(function(b, d) {
        return Math.abs(b - a) - Math.abs(d - a);
      });
    }
    function d(b) {
      e.push(b(Ha(a)));
    }
    var e = [];
    if (!a || !a.video) return e;
    if (a.video.width && a.video.height) {
      if (a.video.width.ideal && a.video.height.ideal)
        for (
          var g = b(a.video.width.ideal).slice(0, 3),
            f = b(a.video.height.ideal).slice(0, 3),
            n = 0,
            k;
          n < g.length;
          ++n
        ) {
          k = g[n];
          for (var h = 0, l; h < f.length; ++h)
            if (
              ((l = f[h]),
              k !== a.video.width.ideal || l !== a.video.height.ideal)
            ) {
              var q = Math.max(k, l) / Math.min(k, l);
              q < 4 / 3 - 0.1 ||
                q > 16 / 9 + 0.1 ||
                d(function(a) {
                  a.video.width.ideal = k;
                  a.video.height.ideal = l;
                  return a;
                });
            }
        }
      d(function(a) {
        return Ia(a);
      });
    }
    a.video.facingMode &&
      (d(function(a) {
        delete a.video.facingMode;
        return a;
      }),
      a.video.width &&
        a.video.height &&
        d(function(a) {
          Ia(a);
          delete a.video.facingMode;
          return a;
        }));
    a.video.width &&
      a.video.height &&
      (a.video.width.ideal &&
        a.video.height.ideal &&
        d(function(a) {
          delete a.video.width.ideal;
          delete a.video.height.ideal;
          return a;
        }),
      d(function(a) {
        delete a.video.width;
        delete a.video.height;
        return a;
      }));
    e.push({ audio: a.audio, video: !0 });
    return e;
  }
  function Ka(a) {
    try {
      var b = window.matchMedia('(orientation: portrait)').matches ? !0 : !1;
    } catch (e) {
      b = window.innerHeight > window.innerWidth;
    }
    if (b) {
      b = a.video.width;
      var d = a.video.height;
      b.ideal &&
        d.ideal &&
        b.ideal > d.ideal &&
        ((a.video.height = b), (a.video.width = d));
    }
  }
  function La(a, b, d, e) {
    navigator.mediaDevices
      .getUserMedia(e)
      .then(function(e) {
        function f() {
          setTimeout(function() {
            if (a.currentTime) {
              var f = a.videoWidth,
                g = a.videoHeight;
              0 === f || 0 === g
                ? d('VIDEO_NULLSIZE')
                : ((f = a.videoWidth),
                  (g = a.videoHeight),
                  f && (a.style.width = f.toString() + 'px'),
                  g && (a.style.height = g.toString() + 'px'),
                  Ea()
                    ? (document.body.appendChild(a),
                      b(a, e),
                      setTimeout(function() {
                        a.style.transform = 'scale(0.0001,0.0001)';
                        a.style.position = 'fixed';
                        a.style.bottom = '0px';
                        a.style.right = '0px';
                      }, 100))
                    : b(a, e));
            } else d('VIDEO_NOTSTARTED');
          }, 200);
        }
        function g() {
          var b = a.play();
          'undefined' === typeof b
            ? f()
            : b
                .then(function() {
                  f();
                })
                .catch(function() {
                  d('VIDEO_PLAYPROMISEREJECTED');
                });
        }
        Ea() || a.addEventListener('loadeddata', g, !1);
        'undefined' !== typeof a.srcObject
          ? (a.srcObject = e)
          : ((a.src = window.URL.createObjectURL(e)), (a.videoStream = e));
        if (Fa() && ((a.volume = 0), 1 === a.volume)) {
          var k = function() {
            a.volume = 0;
            window.removeEventListener('mousemove', k, !1);
            window.removeEventListener('touchstart', k, !1);
          };
          window.addEventListener('mousemove', k, !1);
          window.addEventListener('touchstart', k, !1);
        }
        Ea() && g();
      })
      .catch(d);
  }
  function Ma(a, b) {
    var d = Ga() ? document.createElement('video') : !1,
      e = {
        video: {
          facingMode: { ideal: 'user' },
          width: { min: 480, max: 1280, ideal: 800 },
          height: { min: 480, max: 1280, ideal: 600 }
        },
        audio: !1
      };
    if (d)
      if (Ga()) {
        var g = function(a) {
          d[a] = !0;
          d.setAttribute(a, 'true');
        };
        e &&
          e.video &&
          (Ea() ? Ka(e) : Da() && Ka(e),
          e.video.width &&
            e.video.width.ideal &&
            (d.style.width = e.video.width.ideal + 'px'),
          e.video.height &&
            e.video.height.ideal &&
            (d.style.height = e.video.height.ideal + 'px'));
        g('autoplay');
        g('playsinline');
        e && e.audio ? (d.volume = 0) : g('muted');
        La(
          d,
          a,
          function() {
            function f(e) {
              if (0 === e.length) b('INVALID_FALLBACKCONSTRAINS');
              else {
                var g = e.shift();
                La(
                  d,
                  a,
                  function() {
                    f(e);
                  },
                  g
                );
              }
            }
            var g = Ja(e);
            f(g);
          },
          e
        );
      } else b && b('MEDIASTREAMAPI_NOTFOUND');
    else b && b('VIDEO_NOTPROVIDED');
  }
  var Na = [1, 1, 2],
    Oa = [0.2, 0.8],
    va = {};
  function Pa(a) {
    function b(a) {
      C = setTimeout(e.bind(null, a), 10);
    }
    function d() {
      I && (window.cancelAnimationFrame(I), (I = !1));
      C && (window.clearTimeout(C), (C = !1));
    }
    function e() {
      if (B !== w.pause) {
        r.J();
        var a = h.currentTime - D;
        0 > a && (D = h.currentTime);
        20 > 1e3 * a ||
          (l.refresh(), (D += a), m.set('s54'), q.j(), l.b(0), E.f(!1, !0));
        for (a = 0; 1 > a; ++a)
          m.set('s55'), t.j(), q.b(0), p.b(1), E.f(!1, !1), t.b(0), f.F(!1, t);
        X === z.visible && (r.Yb(), m.set('s53'), p.b(0), q.b(1), E.f(!1, !1));
        c.flush();
        I = window.requestAnimationFrame(b);
      }
    }
    var g = Date.now(),
      f,
      n = 1.6 / 3,
      k = [0.125, 0.125],
      h,
      l,
      q,
      t,
      p,
      v,
      A = new Uint8Array([0, 0, 0, 0]),
      w = { Fb: 0, ga_: 1, ka: 2, pause: 3 },
      B = w.Fb,
      z = { hidden: 0, visible: 1 },
      X = a.Cb ? z.visible : z.hidden,
      Z = 0,
      O = 0.25,
      S = 0.25,
      K = 1.6,
      I = !1,
      C = !1,
      Y = 0,
      U = 'undefined' !== typeof a.va ? a.va : './',
      P =
        (('undefined' !== typeof a.Sa ? a.Sa : 0.55) - Oa[0]) / (Oa[1] - Oa[0]),
      D = 0;
    return {
      Qb: function(a) {
        P = a;
      },
      Wb: function(a) {
        X = a ? z.visible : z.hidden;
      },
      Xb: function(a) {
        a && B !== w.pause
          ? ((B = w.pause), d())
          : a || B !== w.pause || ((B = w.ka), d(), (B = w.ga_), e(0));
      },
      i: function(b) {
        h = b;
        m.$a([
          {
            id: 's54',
            name: '_',
            Y:
              'attribute vec2 a0;uniform vec2 u37,u38;varying vec2 vv0;void main(){gl_Position=vec4(a0,0.,1.),vv0=u38+u37*a0;}',
            $: ['a0'],
            U: [2],
            c:
              'uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vv0);}',
            g: ['u0', 'u37', 'u38'],
            precision: 'lowp'
          },
          {
            id: 's55',
            name: '_',
            c:
              'uniform sampler2D u0;varying vec2 vv0;void main(){gl_FragColor=texture2D(u0,vv0);}',
            Y:
              'attribute vec2 a0;uniform sampler2D u39;uniform vec2 u40;const vec2 k=vec2(.25,.5),j=vec2(.75,.5),e=vec2(.5,.5);varying vec2 vv0;void main(){vec4 a=texture2D(u39,k);vec2 d=a.gb,b=a.a*u40;vec4 c=texture2D(u39,j);float l=c.a,g=c.y;vec2 f=vec2(1./cos(g),1.);b*=f;vec2 i=a0*.5+e;vv0=d+(i-e)*b,gl_Position=vec4(a0,0.,1.);}',
            $: ['a0'],
            U: [2],
            g: ['u0', 'u39', 'u40'],
            precision: 'lowp'
          },
          {
            id: 's56',
            name: '_',
            Y: 'attribute vec2 a0;void main(){gl_Position=vec4(a0,0.,1.);}',
            c:
              'uniform sampler2D u41,u39;uniform vec3 u42,u43;uniform float u44,u45,u46,u47,u48,u49;const vec4 e=vec4(.25,.25,.25,.25);const float f=1e-3;void main(){vec4 b=texture2D(u39,vec2(.25,.5));float a=floor(b.r+f),h=dot(e,texture2D(u41,vec2(.25,.75))),i=dot(e,texture2D(u41,vec2(.5,.75))),j=dot(e,texture2D(u41,vec2(.75,.75))),k=dot(e,texture2D(u41,vec2(0.,.75))),c=clamp(k,-1.+f,1.-f);vec4 l=texture2D(u41,vec2(0.,.5)),m=texture2D(u41,vec2(.25,.5));float d=dot(l,e),n=dot(m,e);bool o=d>u47&&d>n+u48;o?a=2.:a>u46?a=0.:a>1.9&&(b.a>u45||b.a<u44)?a=0.:a>1.9?a+=1.:0.;if(a<.9)b.gba=u42,a=1.,c=0.;else{float p=step(1.5,a);a*=p;float g=b.a*u49;b.gba+=vec3(h,i,j)*u43*g;}b.r=a+c*.5+.5,gl_FragColor=b;}',
            g: 'u41 u39 u42 u44 u45 u46 u48 u47 u43 u49'.split(' ')
          },
          {
            id: 's57',
            name: '_',
            c:
              'uniform sampler2D u39,u50;uniform float u51;varying vec2 vv0;const vec2 e=vec2(.5,.5);void main(){vec4 a=texture2D(u39,e),b=texture2D(u50,e);float c=step(2.,a.r),d=fract(a.r);vec4 f=vec4(c,d,0.,1.);gl_FragColor=mix(f,b,u51);}',
            g: ['u39', 'u50', 'u51']
          },
          {
            id: 's53',
            name: '_',
            c:
              'uniform sampler2D u39,u52;uniform vec2 u40;varying vec2 vv0;const vec2 j=vec2(1.,1.);const vec3 k=vec3(0.,.7,1.);void main(){vec4 g=texture2D(u39,vec2(.5,.5));vec3 l=texture2D(u52,vv0).rgb;vec2 h=g.gb;float m=g.a;vec2 b=m*u40,d=h+b,c=h;c-=b/2.,d-=b/2.;vec2 n=.5*(c+d),i=step(c,vv0)*step(vv0,d);float o=i.x*i.y;vec2 a=2.*abs(n-vv0)/b;a=pow(a,3.*j);float f=max(a.x,a.y);f*=o,gl_FragColor=vec4(mix(l,k,f),1.);}',
            g: ['u39', 'u52', 'u40']
          }
        ]);
        m.M('s55', [
          { type: '1i', name: 'u0', value: 0 },
          { type: '1i', name: 'u39', value: 1 },
          { type: '2f', name: 'u40', value: k }
        ]);
        m.M('s57', [
          { type: '1i', name: 'u39', value: 0 },
          { type: '1i', name: 'u50', value: 1 },
          { type: '1f', name: 'u51', value: 0.9 }
        ]);
        m.M('s53', [
          { type: '1i', name: 'u39', value: 0 },
          { type: '1i', name: 'u52', value: 1 },
          { type: '2f', name: 'u40', value: k }
        ]);
        m.M('s56', [
          { type: '1i', name: 'u41', value: 0 },
          { type: '1i', name: 'u39', value: 1 },
          { type: '1f', name: 'u44', value: 1.1 },
          { type: '1f', name: 'u45', value: 5.8 },
          {
            type: '1f',
            name: 'u46',
            value: 55
          },
          { type: '1f', name: 'u47', value: 0.95 },
          { type: '1f', name: 'u48', value: 1.1 },
          { type: '1f', name: 'u49', value: k[0] },
          {
            type: '3f',
            name: 'u43',
            value: [Na[0] * k[0], Na[1] * k[1], Na[2]]
          }
        ]);
        l = L.a({ B: h, isPot: !1, isFloat: !1, isFlipY: !0 });
        q = L.a({ isPot: !1, Lc: !0, isFloat: !1, width: 512, height: 512 });
        t = L.a({ isPot: !0, isFloat: !1, width: 64 });
        p = pa.a({
          width: 1,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0.25, 0.25, 0])
        });
        v = pa.a({
          width: 1,
          height: 1,
          isFloat: !0,
          isPot: !1,
          array: new Float32Array([0, 0.5, 0, 1])
        });
        ba(U + 'NNC.json', function(b) {
          b = b;
          f = new Ca();
          f.Kb(b.layers);
          f.Mb({
            Oa: 'gpuRawAvg',
            Hb: function() {
              p.Pb(1);
              m.set('s56');
              m.Sb('u42', O, S, K);
              E.f(!1, !1);
              0 !== ++Z % 2 &&
                ((K += n),
                3.2 < K &&
                  ((O += 0.1),
                  (K = 1.6),
                  0.75 < O &&
                    ((O = 0.25), (S += 0.1), 0.75 < S && (S = 0.25))));
              m.set('s57');
              v.Ob(1);
              p.b(0);
              E.f(!1, !1);
              var b = Date.now();
              if (100 < b - g) {
                g = b;
                m.set('s1');
                r.D();
                v.b(0);
                E.f(!1, !1);
                c.readPixels(0, 0, 1, 1, c.RGBA, c.UNSIGNED_BYTE, A);
                b = Oa[0] + P * (Oa[1] - Oa[0]);
                var d = Math.abs((A[1] / 255) * 2 - 1),
                  e = 128 < A[0],
                  f = e && d < b + 0.1;
                B === w.ga_ && e && d < b - 0.1
                  ? (a.ya(!0), (B = w.ka))
                  : B !== w.ka || f || (a.ya(!1), (B = w.ga_));
                r.J();
              }
            }
          });
          ++Y;
          1 === Y &&
            ((Qa.ready = !0), a.fb(!1), d(), (B = w.ga_), e(0), (Y = 0));
        });
      }
    };
  }
  var Qa = {
    ready: !1,
    set_sensibility: function(a) {
      Qa.ready && Qa.Z.Qb(a);
    },
    toggle_pause: function(a) {
      Qa.ready && Qa.Z.Xb(a);
    },
    toggle_display: function(a) {
      Qa.ready && Qa.Z.Wb(a);
    },
    init: function(a) {
      function b(b) {
        a.callbackReady && a.callbackReady(b ? b : 'UNKNOW_ERROR');
      }
      Qa.Z = Pa({
        Cb: 'undefined' === typeof a.isDisplayVideo ? !0 : a.isDisplayVideo,
        fb: function() {
          a.callbackReady && a.callbackReady();
        },
        ya: a.callbackTrack,
        Sa: a.sensibility,
        va: a.NNCpath
      });
      if (
        !oa.i({
          Ba: a.canvasId,
          width: 512,
          height: 512,
          debug: !1,
          pa: !1,
          premultipliedAlpha: !0
        })
      )
        return b && b('COMPAT_FAIL'), !1;
      m.i();
      Ma(
        function(a) {
          var b = [0.5, 0.5],
            d = a.videoHeight / a.videoWidth,
            f = oa.H() / oa.A();
          d > f
            ? 1 >= d
              ? (b[0] *= d)
              : (b[1] /= d)
            : ((b[0] *= d), (d = 1 / f), (b[0] *= d), (b[1] *= d));
          b[1] *= f;
          Qa.Z.i(a);
          m.M('s54', [
            { type: '1i', name: 'u0', value: 0 },
            { type: '2f', name: 'u37', value: b },
            { type: '2f', name: 'u38', value: [0.5, 0.5] }
          ]);
        },
        function() {
          b('NO_WEBCAM');
        }
      );
      return !0;
    }
  };
  window.GLANCETRACKERAPI = Qa;
  return window.GLANCETRACKERAPI;
})();

export default window.GLANCETRACKERAPI;
