/**
 * @author chishang.lcw
 */
var LJS = {};
(function (exports) {
    var ua = navigator.userAgent,
    doc = document,
    indexOf=indexOf ?
            function (item, arr) {
                return indexOf.call(arr, item);
            } :
            function (item, arr) {
                for (var i = 0, len = arr.length; i < len; ++i) {
                    if (arr[i] === item) {
                        return i;
                    }
                }
                return -1;
            },
    mix=function (r, s, ov, wl, deep) {
            if (!s || !r) {
                return r;
            }
            if (ov === undefined) {
                ov = true;
            }
            var i, p, len;
            if (wl && (len = wl.length)) {
                for (i = 0; i < len; i++) {
                    p = wl[i];
                    if (p in s) {
                        _mix(p, r, s, ov, deep);
                    }
                }
            } else {
                for (p in s) {
                    _mix(p, r, s, ov, deep);
                }
            }
            return r;
        },
        _mix=function (p, r, s, ov, deep) {
            if (ov || !(p in r)) {
                var target = r[p],
                src = s[p];
                // prevent never-end loop
                if (target === src) {
                    return;
                }
                // \u6765\u6e90\u662f\u6570\u7ec4\u548c\u5bf9\u8c61\uff0c\u5e76\u4e14\u8981\u6c42\u6df1\u5ea6 mix
                if (deep && src && (_isArray(src) || _isPlainObject(src))) {
                    // \u76ee\u6807\u503c\u4e3a\u5bf9\u8c61\u6216\u6570\u7ec4\uff0c\u76f4\u63a5 mix
                    // \u5426\u5219 \u65b0\u5efa\u4e00\u4e2a\u548c\u6e90\u503c\u7c7b\u578b\u4e00\u6837\u7684\u7a7a\u6570\u7ec4/\u5bf9\u8c61\uff0c\u9012\u5f52 mix
                    var clone = target && (_isArray(target) || _isPlainObject(target)) ? target : (_isArray(src) ? [] : {});
                    r[p] = _mix(clone, src, ov, undefined, true);
                } else if (src !== undefined) {
                    r[p] = s[p];
                }
            }
        },
    	lang = {
    	indexOf:indexOf,
    	//日志输出
        log: function (mes) {
            console.log && console.log(mes);
        },
        inArray:function (item, arr) {
            return indexOf(item, arr) > -1;
        },
        //数组和类的遍历
        each: function (object, fn, context) {
            if (object) {
                var key, val, i = 0,
                length = object && object.length,
                isObj = length === undefined || typeof(object) === 'function';

                context = context || window;

                if (isObj) {
                    for (key in object) {
                        // can not use hasOwnProperty
                        if (fn.call(context, object[key], key, object) === false) {
                            break;
                        }
                    }
                } else {
                    for (val = object[0];
                    i < length && fn.call(context, val, i, object) !== false; val = object[++i]) {}
                }
            }
            return object;
        },
        
        //判断是否为数组
        isArray: function (o) {
            return o.prototype.toString.call(obj) === '[object Array]';
        },
        //测试对象是否是纯粹的对象
        isPlainObject: function (o) {
            /**
         * note by yiminghe
         * isPlainObject(node=document.getElementById("xx")) -> false
         * toString.call(node) : ie678 == '[object Object]',other =='[object HTMLElement]'
         * 'isPrototypeOf' in node : ie678 === false ,other === true
         */

            return o && toString.call(o) === '[object Object]' && 'isPrototypeOf' in o;
        }
    }
	exports.mix=mix;
	
    /**
     * Copies all the properties of s to r.
     * @param deep {boolean} whether recursive mix if encounter object
     * @return {Object} the augmented object
     */

    //===========================================================
    //公用函数
    //===========================================================
    exports.mix(exports, {
        _global: {
            definedMods: {},
            requiredMods: {},
            loadedMods: [],
            loadingMods:[]
        },
        //版本
        vertion: "1.0"

    });
    exports.mix(exports, lang);
    //===========================================================
    //模块的定义、添加和使用
    //===========================================================
    exports.mix(exports, {

        /**
    	 * 定义模块
    	 * @param {Object} config 模块定义参数
    	 */
        define: function (config) {
            var exports = this,
            definedMods = exports._global.definedMods,
            _config = {
                charset: "utf-8",
                combine: false
            };
            exports.mix(config, _config, false);
            exports.config = config;
            var mods = config.mods;
            exports.each(mods, function (val, key, o) {
                definedMods[val.name] = val;
            });

        },
        /**
    	 * 添加模块
    	 * @param {String} name 模块名
    	 * @param {Function} fn 回调函数
    	 */
        add: function (name, fn) {
            var exports = this,
            requiredMods = exports._global.requiredMods;
            requiredMods[name]["ismod"]=true;
            requiredMods[name]["callback"]=fn;

        },
        /**
    	 * 使用模块
    	 * @param {String/Array} name 模块名
    	 * @param {Function} fn 回调函数
    	 */
        use: function (mod, fn) {
            var exports = this;
            exports.load(mod, fn);
        }
    });
    //===========================================================
    //文件的加载
    //===========================================================
    exports.mix(exports, {
        /**
    	 * 查找模块
 		 * @param {Object} arr 加载模块列表
 		 * @param {Function} callback 模块加载完毕后的回调函数
    	 */
        load: function (arr,callback) {
            var  config = exports.config,
            global=exports._global,
            definedMods = global.definedMods,
            requiredMods=global.requiredMods;
            //判断是否已定义
            exports.each(arr,function(val,key,o){	
				 var relymods=[];
				 if(val in definedMods){
				 	if( !(val in requiredMods) ){
					 	requiredMods[val]=definedMods[val];
					 }
				 }else {
				 	exports.log("module " +val +" is not defined");
				 }
			});
            exports.each(requiredMods, function (val, key, o) {
            	var name=val['name'];
            	exports.loadMod(name,function(){
            		 var isloaded=true;
	        		 exports.each(requiredMods,function(v,k,o){
	        		 	var name=v["name"],
	        		 	isLoaded=requiredMods[name]['isloaded'];
	            		  	if(!isLoaded) {
	            		  		isloaded=false;
	            		  	} 
	            	});
            		isloaded&&callback(exports);
            	});
            });
            
			
        },
        /**
         * 查找依赖模块
         * @param name 模块名称
         * @return {Array/null} result 有依赖模块时返回数组，没有时返回null
         */
        findRelyMods:function(name){
        	var config = exports.config,
            global=exports._global,
            definedMods = global.definedMods,
            result=definedMods[name]["requires"];
			return result;
        },
        /**
         * 加载依赖模块
         * @param name 待加载模块
         * @param relymods 依赖模块
         * @param {Function } 回调函数
         */
        loadRelyMods:function(name,relymods,callback){
        	var config = exports.config,
            global=exports._global,
            requiredMods=global.requiredMods,
            definedMods = global.definedMods;
            exports.each(relymods, function (val, key, obj) {
            	if(!(val in requiredMods)){
            		requiredMods[val]=definedMods[val];
            	}
            	
            	exports.loadMod(val,function(){
            		var isloaded=true;
            		  exports.each(relymods,function(v,k,o){
            		  	
	            		  	if(!requiredMods[v]['isloaded']) {
	            		  		isloaded=false;
	            		  	}
	            		  	 
	            		  });
            		isloaded&&callback();
            	});
            	
            });
            
        },
        /**
    	 * 加载模块
    	 * @name loadMod
 		 * @param {Object} name
 		 * @param {Function} callback 回调函数
    	 */
        loadMod: function (name,callback) {
            var  config = exports.config,
            global=exports._global,
            definedMods = global.definedMods,
            requiredMods=global.requiredMods,
            loadedMods=global.loadedMods,
            loadingMods=global.loadingMods,
            root = config.root,
            curScript = definedMods[name],
            path = curScript["path"],
            fullpath = curScript["fullpath"],
            src = fullpath ? fullpath : root + path,
            startLoad=function(){
            	loadingMods.push(name);
            	exports.loadScript(src,loadSuccess);
            },
            loadSuccess=function(){
            	loadedMods.push(name);
            	requiredMods[name]["isloaded"]=true;
            	exports.log("loaded:"+name);  
            	requiredMods[name]["callback"]?requiredMods[name]["callback"](exports)&&callback():callback();
           
            };
            if(!exports.inArray(name,loadingMods)){
            	var relyMods=exports.findRelyMods(name);
            	relyMods?exports.loadRelyMods(name,relyMods,function(){
            		startLoad()
            	}):startLoad();
            }
        },
        /**
         * 加载js文件
         * @param url  js文件地址
         * @param  success 回调函数
         */
        loadScript: function (url,success) {
            var script = document.createElement('script');
            script.src = url;
            document.body.appendChild(script);
            exports.scriptOnload(script,success)
            
        }
    });
    //===========================================================
    //文件的加载
    //===========================================================
    exports.mix(exports, {
    	docHead:function() {
            return doc.getElementsByTagName('head')[0] || doc.documentElement;
        },
        isWebKit:!!ua.match(/AppleWebKit/),
        IE : !!ua.match(/MSIE/),
        isCss:function(url) {
            return /\.css(?:\?|$)/i.test(url);
        },
        isLinkNode:function(n) {
            return n.nodeName.toLowerCase() == 'link';
        },
    	/**
    	 * js文件加载完毕
    	 */
        scriptOnload:document.addEventListener ?
            function (node, callback) {
                if (exports.isLinkNode(node)) {
                    return exports.styleOnload(node, callback);
                }
                node.addEventListener('load', callback, false);
            } :
            function (node, callback) {
                if (exports.isLinkNode(node)) {
                    return exports.styleOnload(node, callback);
                }
                var oldCallback = node.onreadystatechange;
                node.onreadystatechange = function () {
                    var rs = node.readyState;
                    if (/loaded|complete/i.test(rs)) {
                        node.onreadystatechange = null;
                        oldCallback && oldCallback();
                        callback.call(this);
                    }
                };
            },

        /**
         * monitor css onload across browsers
         * \u6682\u65f6\u4e0d\u8003\u8651\u5982\u4f55\u5224\u65ad\u5931\u8d25\uff0c\u5982 404 \u7b49
         * @refer
         *  - firefox \u4e0d\u53ef\u884c\uff08\u7ed3\u8bba4\u9519\u8bef\uff09\uff1a
         *    - http://yearofmoo.com/2011/03/cross-browser-stylesheet-preloading/
         *  - \u5168\u6d4f\u89c8\u5668\u517c\u5bb9
         *    - http://lifesinger.org/lab/2011/load-js-css/css-preload.html
         *  - \u5176\u4ed6
         *    - http://www.zachleat.com/web/load-css-dynamically/
         */
        styleOnload:window.attachEvent || window.opera ?
            // ie/opera
            function (node, callback) {
                // whether to detach using function wrapper?
                function t() {
                    node.detachEvent('onload', t);
                    exports.log('ie/opera loaded : ' + node.href);
                    callback.call(node);
                }

                node.attachEvent('onload', t);
            } :
            // refer : http://lifesinger.org/lab/2011/load-js-css/css-preload.html
            // \u6682\u65f6\u4e0d\u8003\u8651\u5982\u4f55\u5224\u65ad\u5931\u8d25\uff0c\u5982 404 \u7b49
            function (node, callback) {
                var href = node.href, arr;
                arr = monitors[href] = monitors[href] || [];
                arr.node = node;
                arr.push(callback);
                startCssTimer();
            }
    });
})(LJS);