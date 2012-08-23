/**
 * @author chishang.lcw
 */
var LJS={};
(function(exports){
	var _log=function(mes){
		console.log&&console.log(mes);
	},
	_each=function (object, fn, context) {
            if (object) {
                var key,
                    val,
                    i = 0,
                    length = object && object.length,
                    isObj = length === undefined || typeof(object) === 'function';

                context = context || window;

                if (isObj) {
                    for (key in object) {
                        // can not use hasOwnProperty
                        if (fn.call(context, object[key], key, object) === FALSE) {
                            break;
                        }
                    }
                } else {
                    for (val = object[0];
                         i < length && fn.call(context, val, i, object) !==false; val = object[++i]) {
                    }
                }
            }
            return object;
        },
	 /**
     * Copies all the properties of s to r.
     * @param deep {boolean} whether recursive mix if encounter object
     * @return {Object} the augmented object
     */
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
    _mix = function (p, r, s, ov, deep) {
        if (ov || !(p in r)) {
            var target = r[p], src = s[p];
            // prevent never-end loop
            if (target === src) {
                return;
            }
            // \u6765\u6e90\u662f\u6570\u7ec4\u548c\u5bf9\u8c61\uff0c\u5e76\u4e14\u8981\u6c42\u6df1\u5ea6 mix
            if (deep && src && (_isArray(src) || _isPlainObject(src))) {
                // \u76ee\u6807\u503c\u4e3a\u5bf9\u8c61\u6216\u6570\u7ec4\uff0c\u76f4\u63a5 mix
                // \u5426\u5219 \u65b0\u5efa\u4e00\u4e2a\u548c\u6e90\u503c\u7c7b\u578b\u4e00\u6837\u7684\u7a7a\u6570\u7ec4/\u5bf9\u8c61\uff0c\u9012\u5f52 mix
                var clone = target && (_isArray(target) || _isPlainObject(target)) ?
                    target :
                    (_isArray(src) ? [] : {});
                r[p] = _mix(clone, src, ov, undefined, true);
            } else if (src !== undefined) {
                r[p] = s[p];
            }
        }
    },
    _isArray=function(o){
    	return o.prototype.toString.call(obj) === '[object Array]'; 
    },
    _isPlainObject=function(o){
    	/**
         * note by yiminghe
         * isPlainObject(node=document.getElementById("xx")) -> false
         * toString.call(node) : ie678 == '[object Object]',other =='[object HTMLElement]'
         * 'isPrototypeOf' in node : ie678 === false ,other === true
         */

        return o && toString.call(o) === '[object Object]' && 'isPrototypeOf' in o;
    };
     //===========================================================
    //公用函数
    //===========================================================
    mix(exports,{
    	_global:{
    		definedmods:{},
    		requiredmods:[],
    		loadedmods:[]
    	},
    	//版本
    	vertion:"1.0",
    	//日志输出
    	log:_log,
    	each:_each,
    	mix:mix,
    	isArray:_isArray,
    	isPlainObject:_isPlainObject
    	
    });
    //===========================================================
    //模块的定义、添加和使用
    //===========================================================
    mix(exports,{
    	
    	/**
    	 * 定义模块
    	 * @param {Object} config 模块定义参数
    	 */
    	define:function(config){
    		var self=this,
    		definedmods=self._global.definedmods,
    		_config={
    			charset:"utf-8",
    			combine:false
    		};
    		mix(config,_config,false);
    		self.config=config;
    		var mods=config.mods;
    		self.each(mods,function(val,key,o){
    			definedmods[val.name]=val;
    		});
    		
    	},
    	/**
    	 * 添加模块
    	 * @param {String} name 模块名
    	 * @param {Function} fn 回调函数
    	 */
    	add:function(name,fn){
    		var self=this,
    		definedmods=self._global.definedmods,
    		mod={
    			name:name,
    			path:"",
    			callback:fn
    		};
    		
    	},
    	/**
    	 * 使用模块
    	 * @param {String/Array} name 模块名
    	 * @param {Function} fn 回调函数
    	 */
    	use:function(mod,fn){
    		var self=this;
    		self.load(mod,fn);
    	}
    });
     //===========================================================
    //文件的加载
    //===========================================================
    mix(exports,{
    	/**
    	 * 查找模块
 		 * @param {Object} arr
    	 */
    	load:function(arr){
    		var self=this;
    		self.each(arr,function(val,key,o){   			
    			self._load(val);
    		});
    		
    	},
    	/**
    	 * 查找模块
 		 * @param {Object} name
    	 */
    	_load:function(name){
    		var self=this,
    		definedmods=self._global.definedmods;
    		if (name in definedmods) {
    			var curScript=definedmods[name],
    			root=self.config.root;
    			
    			self.log(definedmods[name]);
    			
    		};
    	},
    	loadScript:function(url){
    		var script= document.createElement('script');
			script.src = url;
			document.body.appendChild(script);
    	}
    })
})(LJS);



