(function (I, t) {
    var o=I.JSON, j=I.document, C=I.navigator.userAgent, E=I.navigator.language ? I.navigator.language : I.navigator.userLanguage;
    namespace=I.location.href.replace(/\/[^\/]*$/i, "");
    var F=/\?/ig, Q=/([^a-z0-9]|^)-([^0-9])/ig, c=/^([\W\w]*)\.([^:.]*)(:[\W\w]*)$/i;
    var x=/Webkit/i.test(C) ? "-webkit-" : /Gecko/i.test(C) ? "-moz-" : "", z="$1" + x + "$2", a={computer:!/(iPhone|iPad|iPod|Android)/i.test(C), mobile:/(iPhone|iPad|iPod|Android)/i.test(C), iOS:/(iPhone|iPad|iPod)/i.test(C), iPad:/iPad/i.test(C), iPhone:/iPhone/i.test(C), iPod:/iPod/i.test(C), android:/Android/i.test(C), version:parseFloat(/(iPhone|iPad|iPod|Android|Chrome|Safari|Firefox|MSIE)[^0-9]*([0-9._]*)/i.exec(C)[2].replace("_", "."))};
    var N, m, G, e, u, g={}, l={}, B={}, K={};
    var w=Array.prototype.slice, s=function (R) {
        var T, U, S=arguments.length;
        while (S-- > 1) {
            U=arguments[S];
            for (T in U) {
                R[T]=U[T];
            }
        }
        return R;
    }, h=function (R) {
        if (R.nodeType) {
            return R;
        } else {
            if (R.__mate__ && R.__mate__.nodeType) {
                return R.__mate__;
            }
        }
    }, v=function (R) {
        while (R && !R.__mate__) {
            R=R.parentNode;
        }
        return R ? R.__mate__ : t;
    }, r=function () {
        I.setTimeout(function () {
            I.scrollTo(0, a.android ? 1 : 0);
        }, 500);
    }, p=function () {
        if (l.root !== t) {
            var R=h(l.root).getBoundingClientRect();
            m=R.left < 0 ? 0 : R.left;
            G=R.top < 0 ? 0 : R.top;
        }
    }, y=function (R, S) {
        var T=R.path;
        if (!!T && typeof R[S] === "function") {
            if (B[S] === t) {
                B[S]={};
            }
            B[S][T]=R;
        }
    }, M=function (R, S) {
        var T=R.path;
        if (!!T) {
            delete B[S][T];
        }
    }, q=function (U) {
        var S, R, T, V=B[U];
        if (V) {
            T=w.call(arguments, 1);
            for (S in V) {
                (R=V[S])[U].apply(R, T);
            }
        }
    }, D=function (X, V, U) {
        var T, S=0, W=K;
        X=X.split(".");
        T=X.length - 1;
        for (; S < T; S++) {
            if (typeof W[X[S]] === "object") {
                W=W[X[S]];
            } else {
                W=W[X[S]]={};
            }
        }
        if (V === t) {
            return W[X[S]];
        } else {
            W[X[S]]=V;
            if (U === true) {
                try {
                    I.localStorage.setItem(namespace, o.stringify(K));
                } catch (R) {
                    console.log("Local Storage Max");
                }
            }
        }
    }, k=function (T) {
        var R=0, S=arguments;
        return T.replace(F, function () {
            return S[++R];
        });
    }, J=function (S, R) {
        if ((S=h(S)) !== t) {
            if (R.indexOf(":") !== -1) {
                S.style.cssText+=R.replace(Q, z);
            } else {
                return S.style[R];
            }
        }
    }, L=function (S) {
        var R=1, T=arguments.length, U=[];
        while (R < T) {
            U[U.length]=arguments[R++];
            U[U.length - 1].msec=arguments[R++];
        }
        return(function (X) {
            var V, W;
            V=X.shift();
            W=I.setTimeout(function () {
                V.call(S);
                V=X.shift();
                if (V) {
                    W=I.setTimeout(argument.callee, V.msec);
                }
            }, V.msec);
            return function () {
                I.clearTimeout(W);
            };
        })(U);
    }, f=function (S, R) {
        return j.elementFromPoint(S + m, R + G);
    }, n=function (S) {
        var R=h(S).getBoundingClientRect();
        return{top:R.top - G, left:R.left - m, right:R.right - m, bottom:R.bottom - G, width:R.width, height:R.height, };
    }, H=function (W) {
        var V, T, S, R, U=N.store.local && N.store.local[W];
        if (U === t || arguments.callee.lang === W) {
            return;
        }
        N.language=arguments.callee.lang=W;
        V=j.querySelectorAll("*[local]");
        T=V.length;
        while (T--) {
            R=V[T].__mate__;
            S=V[T].getAttribute("local");
            if (R !== t) {
                R.lang ? R.lang(U[S]) : R.text(U[S]);
            }
        }
    }, d=function (R, S) {
        S=I.prompt(N.store.local[H.lang][R], S || D("system.input." + R));
        if (S !== null) {
            D("system.input." + R, S, true);
        }
        return S !== null ? S : t;
    }, A=function (R, S) {
        S= ~~S;
        return parseInt(Math.random() * (R + 1 - S) + S);
    }, i=function (W, R, Y) {
        var T, U, S, V, X;
        if (W === t) {
            return D("system.audio");
        } else {
            if (W.nodeName !== "AUDIO" || (D("system.audio") === false && R !== true)) {
                return t;
            }
        }
        D("system.audio", true, true);
        U=W.readyState !== 4;
        S= !I.isNaN(W.duration);
        if (!U) {
            if (S) {
                W.currentTime=0;
            }
            W.loop=1;
            W.play();
            if (S) {
                T=I.setInterval(function () {
                    W.currentTime=0;
                    W.play();
                }, (parseInt(W.duration) - 1) * 1000);
            }
            V=function () {
                W.play();
            };
            X=function () {
                W.pause();
            };
            I.addEventListener("pageshow", V, false);
            I.addEventListener("pagehide", X, false);
        }
        if (typeof Y === "function") {
            Y(true);
        }
        return function () {
            if (!U) {
                I.clearInterval(T);
                I.removeEventListener("pageshow", V, false);
                I.removeEventListener("pagehide", X, false);
                W.pause();
            }
            D("system.audio", false, true);
            if (typeof Y === "function") {
                Y(false);
            }
        };
    }, O=function (R, S) {
        var T;
        T=g[R]=function () {
        };
        s(T.prototype, S, P.__make__);
        T.prototype.className=R;
    }, P=function (R, X, W, V, U) {
        var S, T;
        R=h(R);
        if (R !== t && R.__mate__) {
            T=R.__mate__.path + "." + X;
            S=l[T]=new g[W];
            S.name=X;
            S.path=T;
            S.__mate__=R.appendChild(j.createElement(U || "DIV"));
            S.__mate__.appendChild(j.createElement("DIV"));
            S.__mate__.__mate__=S;
            J(S, "position: absolute; " + (V || ""));
            return S;
        }
    }, b=function (U) {
        var S=arguments.callee, R=b.__make__[U], T=function () {
            if (this.finish === true) {
                return;
            }
            this.finish=true;
            I.setTimeout(function () {
                if (++S.finish >= S.count) {
                    q("after", S.finish, S.count);
                    if (I.location.hash === "#debug") {
                        q("debug");
                    }
                } else {
                    q("load", S.finish, S.count);
                }
            }, 0);
        };
        if (U === t && S.count === 0) {
            T();
        }
        if (S.finish === t) {
            S.count=0;
            S.finish=0;
        }
        return R !== t ? function (V) {
            S.count++;
            return R.call(S, V, T);
        } : function (V) {
            return V;
        };
    };
    tween=function (U, Z, V, R, W) {
        var X=+new Date, S=tween.__make__, T=U.concat(), Y=U.length;
        while (Y--) {
            U[Y].time=X;
        }
        V=typeof V === "number" ? V : 20;
        R=R === true ? true : false;
        return(function () {
            var ab, aa=U.length;
            ab=I.setTimeout(function () {
                var ad, ah, af=[], ae=0, ac=[], ag=+new Date;
                for (; ae < aa; ae++) {
                    ad=U[ae];
                    if (ad === t) {
                        ac[ac.length]=true;
                        continue;
                    }
                    ah=ag - ad.time;
                    if (ah < ad[3]) {
                        af[ae]=S[ad[0]](ah, ad[1], ad[2], ad[3]);
                    } else {
                        if (ah >= ad[3] && ad[4] === t) {
                            af[ae]=S[ad[0]](ad[3], ad[1], ad[2], ad[3]);
                            U[ae]=t;
                        } else {
                            af[ae]=S[ad[0]](ad[3], ad[1], ad[2], ad[3]);
                            U[ae]=ad.slice(4);
                            U[ae].time=ag;
                        }
                    }
                }
                Z(af);
                if (ac.length < aa) {
                    ab=I.setTimeout(arguments.callee, V);
                } else {
                    if (R === true) {
                        U=T.concat();
                        ae=U.length;
                        while (ae--) {
                            U[ae].time=ag;
                        }
                        ab=I.setTimeout(arguments.callee, V);
                    }
                }
            }, V);
            return function () {
                I.clearTimeout(ab);
                W && W();
            };
        })();
    }, getPointColor=function (U, S, V) {
        var R, T=u;
        T.drawImage(U, 0, 0);
        R=T.getImageData(S, V, 1, 1);
        return R.data;
    }, canvas2D=function (U, S) {
        var T, R;
        U=h(U);
        T=n(U);
        R=U.appendChild(j.createElement("CANVAS"));
        R.width=T.width;
        R.height=T.height;
        J(R, "position: absolute; left: 0px; top: 0px;");
        S=R.getContext(S);
        S.dirtyRect=[];
        S.childNodes=[];
        return S;
    }, sprite=function (R, S) {
        R.childNodes.push(this);
        this.source=S;
        this.parent=R;
    }, parse=function (U) {
        var T, W, X=["config", "class", "object", "store"], S=0, V=X.length, R=parse.__make__;
        for (; S < V; S++) {
            T=X[S];
            R[T](U[T]);
        }
        W=j.createEvent("HTMLEvents");
        W.initEvent("orientationchange", true, true, I, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        I.dispatchEvent(W);
    }, debug=function () {
        return l;
    }, assignEvent=(function () {
        var T, S, R;
        if (a.mobile) {
            return function (X) {
                var W, U, V=X.type, Y=X.target.nodeType === 3 ? X.target.parentNode : X.target, Z=X.touches[0];
                if (X.touches.length > 1) {
                    return;
                }
                U=v(Y);
                if (U === t) {
                    return;
                }
                if (Z) {
                    S=Z.pageX - m;
                    R=Z.pageY - G;
                }
                argument={target:Y, code:X.keyCode, button:1, clientX:S, clientY:R};
                switch (V) {
                    case"touchstart":
                        U.mouseover && U.mouseover(argument);
                        U.mousedown && U.mousedown(argument);
                        break;
                    case"touchmove":
                        U.mousemove && U.mousemove(argument);
                        break;
                    case"touchend":
                        U.mouseup && U.mouseup(argument);
                        if (U.click) {
                            W=n(Y);
                            if (S > W.left && S < W.right && R > W.top && R < W.bottom) {
                                U.click(argument);
                            }
                        }
                        U.mouseout && U.mouseout(argument);
                        break;
                }
                X.stopPropagation();
                if (Y.nodeName === "DIV") {
                    X.preventDefault();
                }
            };
        } else {
            return function (X) {
                var U, W, V=X.type, Y=X.target.nodeType === 3 ? X.target.parentNode : X.target;
                Y=V === "mousedown" ? T=Y : T || Y;
                if (V === "mouseup") {
                    T=t;
                }
                U=v(Y);
                if (U === t || typeof U[V] !== "function") {
                    return;
                }
                W={target:Y, code:X.keyCode, button:T === t ? 0 : 1, clientX:X.pageX - m, clientY:X.pageY - G};
                U[V](W);
                X.stopPropagation();
                if (Y.nodeName === "DIV") {
                    X.preventDefault();
                }
            };
        }
    })();
    parse.__make__={config:function (T) {
        var R, S;
        T.target=T.target === t ? j.body : (j.getElementById(T.target) || j.body);
        T.angle=T.angle === 90 ? 90 : 0;
        T.width=T.width || 320;
        T.height=T.height || 416;
        T.offset=T.offset === t ? ["auto", "auto"] : T.offset.split(" ");
        if (T.offset.length === 1) {
            T.offset.push(T.offset[0]);
        }
        T.offsetLeft=T.offset[1] === "auto" ? -T.width / 2 + "px" : T.offset[1];
        T.offsetTop=T.offset[0] === "auto" ? -T.height / 2 + "px" : T.offset[0];
        O(":Unknown", {});
        R=l.root=T.target.appendChild(j.createElement("DIV"));
        R.__mate__={name:"root", path:"root", className:":Unknown"};
        J(R, k("position: absolute; left: ?; top: ?; width: ?px; height: ?px; margin: ? 0px 0px ?; -user-select: none; overflow: hidden; background: ?;", T.offset[1] === "auto" ? "50%" : "0px", T.offset[0] === "auto" ? "50%" : "0px", T.width, T.height, T.offsetTop, T.offsetLeft, T.background !== t ? "url(" + T.background + ") no-repeat center" || "#FFF" : ""));
        if(a.iPad){
            R.style.marginLeft = '-360px';
        }
        s(CanvasRenderingContext2D.prototype, canvas2D.__make__);
        e=T.dirty === true ? j.body.appendChild(j.createElement("CANVAS")) : j.createElement("CANVAS");
        e.width=600;
        e.height=600;
        u=e.getContext("2d");
        S=j.getElementsByTagName("head")[0].appendChild(j.createElement("STYLE"));
        S.type="text/css";
        S.textContent=" * { padding: 0px; margin: 0px; cursor: default; } body { font: 12px/20px Palatino; }";
        p();
        K=o.parse(I.localStorage.getItem(namespace) || "{}");
        N.config=T;
        if (D("system.audio") === t) {
            D("system.audio", true, true);
        }
    }, "class":function (S) {
        var R;
        for (R in S) {
            O(R, S[R]);
        }
    }, object:function (T) {
        var S, R;
        for (S in T) {
            R=c.exec(S);
            P(l[R[1]], R[2], R[3], T[S]);
        }
        I.setTimeout(function () {
            for (S in l) {
                (R=l[S]).construct && R.construct();
            }
        }, 0);
    }, store:function (V) {
        var T, U, S, R;
        q("before");
        for (T in V) {
            S=V[T];
            U=b(T);
            switch (typeof S) {
                case"string":
                    V[T]=U(V[T]);
                    break;
                case"object":
                    if (!(S instanceof Array)) {
                        for (R in S) {
                            S[R]=U(S[R]);
                        }
                        break;
                    }
                case"array":
                    R=S.length;
                    while (R--) {
                        S[R]=U(S[R]);
                    }
                    break;
            }
        }
        N.store=V || {};
        b();
    }};
    P.__make__={parent:function () {
        return v(this.__mate__.parentNode);
    }, child:function (R) {
        return l[this.path + "." + R];
    }, local:function (R) {
        return R === t ? this.__mate__.getAttribute("local") : this.__mate__.setAttribute("local", R);
    }, text:function (R) {
        var S=this.__mate__.firstChild;
        return R === t ? S.innerHTML : S.innerHTML=R;
    }, rect:function () {
        return n(this.__mate__);
    }, context:function (R) {
        if (this.__context__ === t) {
            this.__context__=canvas2D(this, R);
        }
        return this.__context__;
    }};
    b.__make__={image:function (S, R) {
        var T=new Image();
        T.addEventListener("load", R, false);
        T.src=S;
        return T;
    }, audio:function (S, R) {
        var T=new Audio();
        R();
        T.src=S;
        T.load();
        T.play();
        T.pause();
        return T;
    }, file:function (S, R) {
        var T=new XMLHttpRequest();
        T.addEventListener("readystatechange", function () {
            if (T.readyState === 4 && T.status === 200) {
                R();
            }
        }, false);
        T.open("GET", S, true);
        T.send(null);
        return T;
    }};
    tween.__make__={linear:function (S, R, U, T) {
        return U * S / T + R;
    }, "cubic-ease-in":function (S, R, U, T) {
        return U * (S/=T) * S * S + R;
    }, "cubic-ease-out":function (S, R, U, T) {
        return U * ((S=S / T - 1) * S * S + 1) + R;
    }, "cubic-ease-in-out":function (S, R, U, T) {
        if ((S/=T / 2) < 1) {
            return U / 2 * S * S * S + R;
        }
        return U / 2 * ((S-=2) * S * S + 2) + R;
    }, "elastic-ease-out":function (T, R, X, W, S, V) {
        if (T == 0) {
            return R;
        }
        if ((T/=W) == 1) {
            return R + X;
        }
        if (!V) {
            V=W * 0.3;
        }
        if (!S || S < Math.abs(X)) {
            S=X;
            var U=V / 4;
        } else {
            var U=V / (2 * Math.PI) * Math.asin(X / S);
        }
        return(S * Math.pow(2, -10 * T) * Math.sin((T * W - U) * (2 * Math.PI) / V) + X + R);
    }, "bounce-ease-in":function (S, R, U, T) {
        return U - tween.__make__["bounce-ease-out"](T - S, 0, U, T) + R;
    }, "bounce-ease-out":function (S, R, U, T) {
        if ((S/=T) < (1 / 2.75)) {
            return U * (7.5625 * S * S) + R;
        } else {
            if (S < (2 / 2.75)) {
                return U * (7.5625 * (S-=(1.5 / 2.75)) * S + 0.75) + R;
            } else {
                if (S < (2.5 / 2.75)) {
                    return U * (7.5625 * (S-=(2.25 / 2.75)) * S + 0.9375) + R;
                } else {
                    return U * (7.5625 * (S-=(2.625 / 2.75)) * S + 0.984375) + R;
                }
            }
        }
    }};
    canvas2D.__make__={appendChild:function (U, T, R) {
        var S=new sprite(this, U);
        S.size(T, R);
        return S;
    }, clear:function (R) {
        this.childNodes.length=0;
        if (R !== false) {
            this.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }, draw:function () {
        var S, R=0, U=this.childNodes, T=U.length;
        this.setTransform(1, 0, 0, 1, 0, 0);
        this.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (; R < T; R++) {
            S=U[R];
            this.globalAlpha=S.alpha;
            this.setTransform(S.m11, S.m12, S.m21, S.m22, S.left, S.top);
            S.draw(this);
        }
        this.setTransform(1, 0, 0, 1, 0, 0);
    }, refresh:function () {
        var ak, U, X=0, T=this.childNodes, W=T.length, ai=this.dirtyRect, ad=this.canvas.width, ab=this.canvas.height, af, ac, aa, aj, Z, ah, V, S, R, Y, ae, ag;
        if (ai.length === 0) {
            return;
        }
        af=ai[0] < 0 ? 0 : Math.floor(ai[0]);
        ac=Math.ceil(ai[2] > ad ? ad : ai[2]);
        aa=ai[1] < 0 ? 0 : Math.floor(ai[1]);
        aj=Math.ceil(ai[3] > ab ? ab : ai[3]);
        Z=ac - af;
        ah=aj - aa;
        if (Z <= 0 || ah <= 0) {
            return;
        }
        U=u;
        U.setTransform(1, 0, 0, 1, 0, 0);
        U.clearRect(af, aa, Z, ah);
        for (; X < W; X++) {
            ak=T[X];
            V=ak.left;
            S=ak.left + ak.width;
            R=ak.top;
            Y=ak.top + ak.height;
            if (ak.dirty === true || ((S < ac ? S : ac) >= (V > af ? V : af) && (Y < aj ? Y : aj) >= (R > aa ? R : aa))) {
                U.globalAlpha=ak.alpha;
                U.setTransform(ak.m11, ak.m12, ak.m21, ak.m22, V, R);
                ak.draw(U);
                ak.dirty=false;
            }
        }
        this.clearRect(af, aa, Z, ah);
        this.drawImage(e, af, aa, Z, ah, af, aa, Z, ah);
        this.dirtyRect.length=0;
    }};
    sprite.prototype={RAD:Math.PI / 180, parent:t, source:t, dirty:false, alpha:1, left:0, top:0, width:0, height:0, m11:1, m12:0, m21:0, m22:1, col:0, row:0, cellWidth:0, cellHeight:0, offset:0, draw:function (R) {
        R.drawImage(this.source, 0, 0, this.width, this.height);
    }, remove:function () {
        var R;
        R=this.parent.childNodes.indexOf(this);
        if (R !== -1) {
            this.merge();
            this.parent.childNodes.splice(R, 1);
        }
    }, slice:function (R, S) {
        if (R === 0) {
            this.cellHeight=parseInt(this.source.naturalHeight / S);
            this.cellWidth=this.cellHeight;
            this.row=S;
            this.col=this.source.naturalWidth / this.cellWidth;
        } else {
            if (S === 0) {
                this.cellWidth=parseInt(this.source.naturalWidth / R);
                this.cellHeight=this.cellWidth;
                this.col=R;
                this.row=this.source.naturalHeight / this.cellHeight;
            } else {
                this.cellWidth=parseInt(this.source.naturalWidth / R);
                this.cellHeight=parseInt(this.source.naturalHeight / S);
                this.col=R;
                this.row=S;
            }
        }
    }, index:function (R) {
        var T, S, U=false;
        if (this.col === 0 || this.row === 0) {
            return U;
        } else {
            if (R === t) {
                R=this.offset;
                R=++R < this.col * this.row ? R : 0;
                if (R === 0) {
                    U=true;
                }
            }
        }
        this.offset=R;
        T=(R % this.col) * this.cellWidth;
        S=parseInt(R / this.cellHeight) * this.cellHeight;
        this.draw=function (V) {
            V.drawImage(this.source, T, S, this.cellWidth, this.cellHeight, 0, 0, this.width, this.height);
        };
        this.merge();
        return U;
    }, merge:function () {
        var T=this.parent.dirtyRect, V=this.left, U=this.top, S=V + this.width, R=U + this.height;
        this.dirty=true;
        !(T[0] < V) && (T[0]=V);
        !(T[1] < U) && (T[1]=U);
        !(T[2] > S) && (T[2]=S);
        !(T[3] > R) && (T[3]=R);
    }, sprite:function (R) {
        this.source=R;
        this.merge();
        delete this.draw;
        this.col=this.row=0;
    }, opacity:function (R) {
        this.alpha=R;
        this.merge();
    }, position:function (S, R) {
        this.merge();
        this.left=S;
        this.top=R;
        this.merge();
    }, rotate:function (T) {
        var R=this.RAD * T, U=Math.cos(R), S=Math.sin(R);
        this.m11=U;
        this.m12=S;
        this.m21= -S;
        this.m22=U;
    }, size:function (S, R) {
        this.merge();
        this.width=S;
        this.height=R;
        this.merge();
    }};
    j.addEventListener("DOMContentLoaded", function () {
        I.Audio=I.Audio || function () {
        };
        I.addEventListener("scroll", r, false);
        I.addEventListener("load", r, false);
        j.addEventListener("touchstart", function (R) {
            if (R.target.value === t) {
                R.preventDefault();
            }
        }, true);
        (function () {
            var R, S, T=t;
            if (a.mobile) {
                R=j.body.appendChild(j.createElement("DIV"));
                J(R, "position: absolute; display: none; background: url(./image/rotate.png) no-repeat #FFF center; left: 0px; top: 0px; width: 100%; font: bolder 20px/200px Verdana; text-align: center; -user-select: none; z-index: 100000;");
                S=j.getElementsByTagName("head")[0].appendChild(j.createElement("META"));
                S.name="viewport";

                if(a.android){
                    S.content = "initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0;";
                }else{

                    if(a.iPad){
                        mobile.sendMeta("width=device-width, initial-scale=2.1, minimum-scale=2.1, maximum-scale=2.1, user-scalable=no;");
                        //S.content = "width=devive-width, initial-scale=2.1, minimum-scale=2.1, maximum-scale=2.1, user-scalable=no;";
                    }else{
                        S.content = "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no;"
                    }

                    //mobile.sendMeta
                }

               //S.content=a.android ? "initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0;" : a.iPad ? "width=devive-width, initial-scale=2.1, minimum-scale=2.1, maximum-scale=2.1, user-scalable=no;"
                //    : "width=devive-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no;";


                j.addEventListener("touchstart", assignEvent, false);
                j.addEventListener("touchmove", assignEvent, false);
                j.addEventListener("touchend", assignEvent, false);
//                onceChanged = 0;
                I.addEventListener("orientationchange", function () {

                    var orientation = typeof customOrientation != 'undefined' ? customOrientation : window.orientation;

                    if (T !== t && T === (Math.abs(orientation) === 90 ? 90 : 0)) {
                        return;
                    }
                    p();
                    r();
                    I.setTimeout(function () {
                        var orientation = typeof customOrientation != 'undefined' ? customOrientation : window.orientation;
                        T=Math.abs(orientation) === 90 ? 90 : 0;
                        N.message("orientation", T);
                        N.config && J(R, k("display: ?; width: ?px; height: ?px;", N.config.angle === T ? "none" : "block", I.innerWidth, I.innerHeight));
                        p();
                        r();
//                        //if(a.android){
//                        //console.log(onceChanged);
//                        if(typeof l.root != 'undefined' && a.android && onceChanged > 1){
//                            //if(l.root.style.marginLeft)
//                            //l.root.style.marginLeft = '-266px';
//                        }
//                        //console.log('do');
//
//                        //}
//                        onceChanged++ ;
                    }, a.android ? 1000 : 0);
                }, false);
            } else {
                j.addEventListener("mouseover", assignEvent, false);
                j.addEventListener("mousedown", assignEvent, false);
                j.addEventListener("mousemove", assignEvent, false);
                j.addEventListener("mouseup", assignEvent, false);
                j.addEventListener("mouseout", assignEvent, false);
                j.addEventListener("click", assignEvent, false);
            }
        })();
    }, false);
    I.System=N={platform:a, language:E.toLowerCase(), empty:"data:image/gif;base64,R0lGODlhAQABAJEAAAAAAP///////wAAACH5BAEAAAIALAAAAAABAAEAAAICVAEAOw==", parse:parse, connect:y, disconnect:M, message:q, createObject:P, style:J, getNode:h, getObject:v, getNodeByPoint:f, getNodeRect:n, getPointColor:getPointColor, extend:s, input:d, storage:D, template:k, timeout:L, local:H, tween:tween, random:A, playAudio:i, debug:debug, };
})(window);
(function (a, b) {
    window.construct={config:{offset:a.platform.iPhone || a.platform.iPod ? "-20px auto" : "0px auto", width:320, height:480, }, store:{image:["./image/begin.png", "./image/b.png", "./image/a.png", "./image/m.png", "./image/tragedy.png", "./image/prompt.png", "./image/level.png", "./image/load.png", "./image/main.png", "./image/menu.png", "./image/pass.png", "./image/start.png", "./image/restart.png", "./image/quit.png", "./image/defaultPage.png", "./image/currentPage.png", "./image/left.png", "./image/right.png", "./image/all.png", "./image/lock.png", "./image/audio.png", ], audio:"./audio/AquaLabyrinth.mp3", level:[
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 2, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 1, 0, 0, 0],
            [0, 0, 1, 2, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 2, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 2, 1, 1, 1, 0],
            [0, 1, 1, 1, 2, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 2, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 2, 0, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1],
            [0, 0, 1, 0, 1, 1],
            [0, 2, 1, 0, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 2, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 2, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 0, 0],
            [0, 1, 1, 1, 2, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 1, 1],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 2, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 2, 1, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 2, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 2, 0],
            [0, 1, 3, 1, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 3, 1, 1, 0],
            [0, 1, 1, 1, 2, 0],
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 3, 2, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 2, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 3, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 1, 1],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 3, 1, 1, 0],
            [0, 1, 1, 1, 2, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 3, 2, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 1, 2, 1, 1, 0],
            [0, 1, 3, 1, 2, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0, 0],
            [0, 1, 1, 2, 0, 0],
            [0, 1, 1, 3, 1, 0],
            [0, 1, 1, 2, 1, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 1, 1, 1, 2, 0],
            [0, 1, 3, 1, 1, 0],
            [0, 1, 2, 1, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 3, 1, 0],
            [0, 2, 1, 1, 1, 0],
            [0, 1, 2, 1, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [1, 1, 1, 3, 1, 2],
            [0, 1, 1, 1, 1, 1],
            [0, 1, 3, 1, 2, 1],
            [0, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 1, 2, 3, 1, 0],
            [0, 1, 3, 1, 1, 0],
            [0, 1, 1, 2, 1, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 1],
            [0, 1, 1, 1, 1, 1],
            [0, 1, 1, 1, 3, 1],
            [0, 0, 2, 1, 3, 1],
            [0, 0, 0, 0, 2, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 1, 1, 3, 1, 0],
            [0, 1, 1, 2, 1, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 1, 1, 2, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 2, 1],
            [0, 1, 2, 3, 1, 1],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 3, 1, 0],
            [0, 1, 2, 1, 1, 0],
            [0, 1, 3, 1, 2, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 3, 3, 1, 0],
            [0, 1, 1, 2, 1, 1],
            [1, 1, 1, 1, 2, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 3, 2, 1, 1],
            [0, 1, 3, 1, 3, 1],
            [0, 1, 2, 1, 1, 1],
            [0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 1],
            [0, 1, 1, 1, 2, 1],
            [0, 1, 3, 1, 1, 1],
            [0, 1, 2, 3, 3, 1],
            [0, 0, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 2],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 0, 2],
            [0, 1, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 2],
            [0, 1, 1, 1, 3, 1],
            [0, 1, 3, 1, 1, 1],
            [0, 1, 2, 1, 0, 0],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1],
            [0, 1, 1, 2, 3, 1],
            [0, 0, 1, 1, 1, 1],
            [0, 1, 1, 0, 0, 1],
            [0, 1, 1, 2, 0, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1],
            [0, 1, 1, 3, 1, 1],
            [0, 1, 1, 2, 1, 1],
            [0, 1, 3, 1, 0, 1],
            [0, 1, 1, 1, 1, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 1, 3, 1, 2, 1],
            [0, 1, 3, 1, 1, 1],
            [0, 1, 1, 1, 3, 1],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 1, 1, 3, 1, 1],
            [0, 1, 3, 1, 2, 1],
            [0, 1, 1, 1, 3, 1],
            [0, 0, 0, 1, 1, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1],
            [0, 1, 1, 3, 2, 1],
            [0, 1, 2, 3, 1, 1],
            [0, 1, 3, 1, 1, 1],
            [0, 1, 1, 1, 0, 1],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 1],
            [0, 1, 1, 2, 3, 1],
            [1, 1, 3, 1, 3, 1],
            [1, 3, 1, 1, 1, 1],
            [2, 1, 1, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [1, 1, 1, 1, 1, 2],
            [1, 3, 3, 1, 1, 1],
            [1, 2, 3, 1, 3, 1],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [1, 2, 0, 0, 0, 0],
            [1, 1, 1, 1, 0, 0],
            [2, 1, 3, 1, 0, 0],
            [1, 1, 3, 1, 1, 1],
            [1, 1, 3, 2, 1, 0],
            [0, 1, 1, 1, 1, 1],
        ],
        [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 0, 1, 1, 1, 1],
            [0, 1, 1, 3, 1, 1],
            [0, 1, 3, 1, 1, 0],
            [0, 1, 1, 1, 2, 0],
            [0, 1, 1, 1, 1, 0],
        ],
        [
            [0, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 2],
            [0, 1, 1, 3, 3, 1],
            [0, 0, 1, 1, 3, 1],
            [0, 1, 1, 1, 1, 1],
            [0, 1, 2, 1, 1, 0],
            [0, 0, 0, 1, 0, 0],
        ],
        [
            [0, 0, 0, 1, 1, 1],
            [0, 1, 2, 1, 2, 1],
            [0, 1, 1, 3, 3, 1],
            [0, 1, 1, 1, 3, 1],
            [0, 1, 3, 1, 2, 1],
            [0, 1, 1, 1, 1, 0],
            [0, 0, 1, 1, 1, 0],
        ],
        [
            [2, 1, 1, 1, 1, 0],
            [1, 1, 1, 3, 1, 1],
            [1, 1, 3, 3, 2, 1],
            [0, 1, 1, 1, 1, 0],
            [0, 1, 1, 3, 1, 1],
            [1, 1, 0, 1, 1, 1],
            [0, 0, 0, 2, 1, 1],
        ],
        [
            [0, 1, 1, 1, 2, 1],
            [0, 1, 2, 1, 1, 1],
            [1, 3, 3, 1, 1, 1],
            [1, 3, 1, 1, 1, 0],
            [1, 3, 1, 3, 1, 1],
            [1, 1, 1, 1, 2, 1],
            [0, 0, 0, 1, 1, 1],
        ],
        [
            [1, 1, 1, 0, 0, 0],
            [1, 1, 1, 1, 1, 1],
            [0, 0, 1, 1, 2, 1],
            [1, 1, 1, 1, 3, 1],
            [1, 1, 3, 1, 1, 1],
            [1, 2, 1, 3, 3, 1],
            [1, 1, 1, 2, 1, 1],
        ],
        [
            [2, 1, 1, 1, 1, 1],
            [2, 1, 1, 1, 1, 1],
            [2, 1, 1, 1, 1, 1],
            [2, 1, 1, 1, 1, 1],
            [2, 1, 1, 1, 1, 1],
            [2, 1, 1, 1, 1, 1],
            [2, 1, 1, 1, 1, 1],
        ],
    ]}, object:{"root.load:Load":"top: 0px; left: 0px; width: 100%; height: 100%; background: url(./image/load.png) no-repeat;", "root.load.progress:Unknown":"top: 330px; left: 50%; width: 10px; height: 16px; margin-left: -112px; -box-sizing: border-box; -border-radius: 10px; background: rgba(255, 255, 255, 0.4); border: 2px solid #2f4473;", "root.menu:Menu":"display: none; top: 0px; left: 0px; width: 100%; height: 100%; background: url(./image/menu.png) no-repeat;", "root.menu.start:Button":"top: 340px; left: 50%; width: 119px; height: 44px; margin-left: -59px; background: url(./image/start.png) no-repeat;", "root.menu.music:Audio":"top: 380px; left: 20px; width: 46px; height: 41px; background: url(./image/audio.png) no-repeat;", "root.level:Level":"display: none; top: 0px; left: 0px; width: 100%; height: 100%; background: url(./image/level.png) no-repeat;", "root.level.array:LevelArray":"top: 80px; left: 10px; width: 300px; height: 300px;", "root.level.array.list:Unknown":"top: 0px; left: 0px; width: 100%; height: 100%;", "root.level.array.page:Unknown":"top: 313px; left: 50%; width: 150px; height: 30px; margin-left: -75px; text-align: center;", "root.level.array.left:Button":"top: 302px; left: 30px; width: 32px; height: 42px; background: url(./image/left.png) no-repeat;", "root.level.array.right:Button":"top: 302px; right: 30px; width: 32px; height: 42px; background: url(./image/right.png) no-repeat;", "root.main:Main":"display: none; top: 0px; left: 0px; width: 100%; height: 100%; background: url(./image/main.png) no-repeat;", "root.main.restart:Button":"top: 392px; left: 20px; width: 97px; height: 37px; background: url(./image/restart.png) no-repeat;", "root.main.title:Unknown":"top: 392px; left: 50%; width: 50px; height: 37x; margin-left: -2px; text-align: center; font: bold 16px/37px Georgia; color: #2f4473;", "root.main.quit:Button":"top: 392px; right: 20px; width: 97px; height: 37px; background: url(./image/quit.png) no-repeat;", "root.main.logic:Logic":"top: 42px; left: 50%; width: 286px; height: 355px; margin-left: -143px;", "root.main.next:Unknown":"display: none; top: 190px; left: 50%; width: 292px; height: 88px; margin-left: -146px; background: url(./image/pass.png) no-repeat;", "root.main.all:Unknown":"display: none; top: 130px; left: 50%; width: 295px; height: 180px; margin-left: -147px; background: url(./image/all.png) no-repeat;", }, "class":{":Button":{construct:function () {
    }, click:function () {
        switch (this.name) {
            case"restart":
                a.message("cmd", "restart");
                break;
            case"quit":
                a.message("cmd", "save");
                a.message("scene", "menu");
                break;
            case"start":
                a.message("scene", "level");
                break;
            case"left":
                a.message("setPage", "-1");
                break;
            case"right":
                a.message("setPage", "+1");
                break;
        }
    }, mouseover:function () {
        a.style(this, "background-position: right top;");
    }, mouseout:function () {
        a.style(this, "background-position: left top;");
    }, }, ":Audio":{construct:function () {
        if (a.playAudio() === true) {
            a.style(this, "background-position: right;");
            a.connect(this, "after");
        } else {
            a.style(this, "background-position: left;");
        }
    }, after:function () {
        this.active=a.playAudio(a.store.audio);
    }, click:function () {
        if (this.active !== b) {
            this.active();
            this.active=b;
            a.style(this, "background-position: left;");
        } else {
            this.active=a.playAudio(a.store.audio, true);
            a.style(this, "background-position: right;");
        }
    }}, ":Load":{construct:function () {
        a.connect(this, "load");
        a.connect(this, "after");
        this.progress=this.child("progress");
    }, load:function (c, d) {
        a.style(this.progress, "width: " + (224 / d * c) + "px;");
    }, after:function () {
        var c=a.store.image, d=a.storage("game.level");
        a.style(this, "display: none;");
        a.Color=[c[1], c[2], c[3], c[4]];
        a.Block=c[0];
        a.Prompt=c[5];
        if (a.storage("game.maxLevel") === b) {
            a.storage("game.maxLevel", 0, true);
        }
        a.connect(this, "debug");
        if (d !== b) {
            a.message("scene", "main", d);
        } else {
            a.message("scene", "menu");
        }
    }, debug:function () {
        alert("Now, You are God!");
        a.storage("game.maxLevel", 50, true);
    }}, ":Menu":{construct:function () {
        a.connect(this, "scene");
    }, scene:function (c) {
        if (c === this.name) {
            a.style(this, "display: block;");
        } else {
            a.style(this, "display: none;");
        }
    }}, ":Level":{construct:function () {
        a.connect(this, "scene");
    }, scene:function (c) {
        if (c === this.name) {
            a.style(this, "display: block;");
            this.child("array").show();
        } else {
            a.style(this, "display: none;");
        }
    }}, ":LevelArray":{construct:function () {
        var f=a.store.level, d=0, g=f.length - 1, c=[], e=[];
        this.list=this.child("list");
        this.page=this.child("page");
        do {
            c[d]=a.createObject(this.list, "l" + d, ":DoubleDeposit", a.template("left: ?px; top: ?px; width: 48px; height: 48px; text-align: center; font: bold 16px/44px Georgia; background: url(./image/b.png) no-repeat; color: #2F4473; text-shadow: #FFF 1px 1px 4px;", (30 + (parseInt(d / 20) * 300) + (65 * (d % 4))), (10 + 60 * parseInt(d % 20 / 4))));
            c[d].text(d + 1);
        } while (++d < g);
        this.objectList=c;
        g=parseInt(g / 20);
        d=0;
        do {
            e[d]=a.createObject(this.page, "p" + d, ":Unknown", "display: inline-block; position: static; width: 30px; height: 30px; background: url(./image/defaultPage.png) no-repeat center;");
        } while (d++ < g);
        a.connect(this, "setPage");
        this.pageList=e;
        this.setPage(0);
    }, show:function () {
        var c=a.storage("game.maxLevel"), e=this.objectList, d=e.length;
        while (d--) {
            if (d <= c) {
                a.style(e[d], "background: url(./image/begin.png) no-repeat;");
                e[d].input=1;
            } else {
                a.style(e[d], "background: url(./image/lock.png) right bottom no-repeat, url(./image/b.png) no-repeat;");
                e[d].input=0;
            }
        }
    }, setPage:function (f, e) {
        var c=this.pageList, d=c.length;
        if (f === "+1") {
            f=this.page + 1;
        } else {
            if (f === "-1") {
                f=this.page - 1;
            }
        }
        if (d <= f || f < 0) {
            return;
        }
        this.page=f;
        a.style(this.list, "left: -" + (f * 300) + "px;");
        while (d--) {
            if (d != f) {
                a.style(c[d], "background: url(./image/defaultPage.png) no-repeat;");
            } else {
                a.style(c[d], "background: url(./image/currentPage.png) no-repeat;");
            }
        }
    }}, ":DoubleDeposit":{click:function () {
        if (this.input === 1) {
            a.message("scene", "main", this.text() - 1);
        }
    }, }, ":Main":{construct:function () {
        a.connect(this, "scene");
    }, scene:function (c, d) {
        if (c === this.name) {
            a.style(this, "display: block;");
            a.message("cmd", "level", parseInt(d));
        } else {
            a.style(this, "display: none;");
        }
    }}, ":Logic":{construct:function () {
        var c=this;
        a.connect(this, "cmd");
        a.connect(this, "scene");
        a.connect(this, "orientation");
        this.showLevel=this.parent().child("title");
        this.nextLevel=this.parent().child("next");
        this.allLevel=this.parent().child("all");
        this.allLevel.click=function () {
            a.message("scene", "level");
        };
    }, scene:function () {
        a.style(this.allLevel, "display: none;");
    }, orientation:function (c) {
        if (c === 90) {
            this.busy=true;
        } else {
            this.busy=false;
        }
    }, mousedown:function (f) {
        if (this.busy === true) {
            return;
        }
        var c=parseInt((f.clientX - this.LogicRect.left) / 50), g=parseInt((f.clientY - this.LogicRect.top) / 50), e=this.objectList, d;
        d=e[g] && e[g][c];
        if (d !== this.thisObject) {
            if (d === b || d.tag !== 1) {
                this.isMouseDown=false;
                return;
            }
        }
        if (this.Prompt !== b) {
            this.Prompt.remove();
        }
        if (this.thisObject) {
            this.thisObject.tag=2;
            this.thisObject.sprite(a.Color[1]);
        }
        this.thisObject=d;
        this.thisObject.sprite(a.Color[2]);
        this.context("2d").refresh();
        this.isMouseDown=true;
    }, mousemove:function (c) {
        if (!this.isMouseDown || this.busy === true) {
            return;
        }
        var k=parseInt((c.clientX - this.LogicRect.left) / 50), j=parseInt((c.clientY - this.LogicRect.top) / 50), i=this, p=this.objectList, d=a.Color, f, h=this.thisObject, o=h.dx, n=h.dy, l, m, g, e;
        if ((l=Math.abs(j - n)) !== 0 && o - k === 0) {
            e=j < n ? true : false;
            for (g=1; g < l; g++) {
                f=p[e ? n - g : n + g][k];
                if (f && f.tag === 0) {
                    (function (q) {
                        q.tag=1;
                        q.sprite(d[2]);
                        i.thisObject.tag=2;
                        i.thisObject.sprite(d[1]);
                        i.thisObject=q;
                        i.context("2d").refresh();
                    })(f);
                } else {
                    this.context("2d").refresh();
                    return;
                }
            }
        } else {
            if ((l=Math.abs(k - o)) !== 0 && n - j === 0) {
                e=k < o ? true : false;
                for (g=1; g < l; g++) {
                    f=p[j][e ? o - g : o + g];
                    if (f && f.tag === 0) {
                        (function (q) {
                            q.tag=1;
                            q.sprite(d[2]);
                            i.thisObject.tag=2;
                            i.thisObject.sprite(d[1]);
                            i.thisObject=q;
                            i.context("2d").refresh();
                        })(f);
                    } else {
                        this.context("2d").refresh();
                        return;
                    }
                }
            } else {
                return;
            }
        }
        f=p[j] && p[j][k];
        if (f === b || f.tag !== 0) {
            return;
        }
        f.tag=1;
        f.color=h.color;
        f.sprite(d[2]);
        this.thisObject.tag=2;
        this.thisObject.sprite(d[1]);
        this.thisObject=f;
        this.context("2d").refresh();
    }, mouseup:function () {
        if (this.busy === true) {
            return;
        }
        this.thisObject.tag=2;
        this.isMouseDown=false;
        this.check();
    }, check:function () {
        var g=this.objectList, f=this.nextLevel, e=this, h, d, c;
        h=g.length;
        while (h--) {
            d=g[h].length;
            while (d--) {
                c=g[h][d];
                if (c && (c.tag === 0 || c.tag === 1)) {
                    return false;
                }
            }
        }
        if (this.level < a.store.level.length - 1) {
            a.style(f, "display: block;");
            this.busy=true;
            window.setTimeout(function () {
                a.style(f, "display: none;");
                a.message("cmd", "level", e.level + 1);
                e.busy=false;
            }, 1500);
        } else {
            a.style(this.allLevel, "display: block;");
        }
        return true;
    }, cmd:function (k, j) {
        var g=this.context("2d"), i=a.store.level, o=[], e=a.Color, f=a.Block, c=this.allLevel, d, n, h, m, l;
        this.LogicRect=this.rect();
        this.isMouseDown=false;
        switch (k) {
            case"restart":
                j=this.level;
                a.style(this.allLevel, "display: none;");
                if (this.busy === true) {
                    a.message("scene", "level");
                    return;
                }
            case"level":
                this.showLevel.text(j + 1);
                this.level=j;
                d=i[j];
                g.clear();
                n=d.length;
                while (n--) {
                    h=d[n].length;
                    o[n]=[];
                    while (h--) {
                        m=d[n][h];
                        switch (m) {
                            case 1:
                                l=o[n][h]=g.appendChild(f, 48, 48);
                                l.position(h * 48, n * 48);
                                l.dx=h;
                                l.dy=n;
                                l.tag=0;
                                break;
                            case 2:
                                l=o[n][h]=g.appendChild(e[0], 48, 48);
                                l.position(h * 48, n * 48);
                                l.dx=h;
                                l.dy=n;
                                l.tag=1;
                                break;
                            case 3:
                                break;
                        }
                    }
                }
                if (this.level === 0) {
                    this.Prompt=l=g.appendChild(a.Prompt, 291, 105);
                    l.position(10, 143);
                } else {
                    this.Prompt=b;
                }
                g.refresh();
                this.objectList=o;
                a.storage("game.level", this.level, true);
                if (a.storage("game.maxLevel") < this.level) {
                    a.storage("game.maxLevel", this.level, true);
                }
                return;
            case"save":
                a.storage("game.level", this.level, true);
                if (a.storage("game.maxLevel") < this.level) {
                    a.storage("game.maxLevel", this.level, true);
                }
                return;
        }
    }}}};
    window.onload=function () {
        window.setTimeout(function () {
            construct && a.parse(construct);
        }, 0);
    };
})(System);