#javascript 模块加载
##什么事模块加载

##为什么要用模块加载

##已有模块加载
###controlJs

ControlJS是由Steve Souners开发的脚本加载器，ControlJS改变了页面中脚本原来的同步加载和执行方式，改用异步下载JS文件而不解析执行，直到window.onload时解析并执行javascript。连ControlJS本身都采用异步方式加载，减少了脚本对页面其它资源的阻塞和渲染。ControlJS并行加载所有脚本，脚本之间不能有顺序依赖关系。

###LabJS       

LabJS也是一个脚本加载器，LabJS中加入了同步机制，可以用于有依赖关系的脚本加载。

[官网](http://stevesouders.com/controljs/)
   
###Do          

Do是豆瓣网的Javascript开发框架。它的核心功能是对模块进行组织和加载。加载采取并行异步队列的策略，并且可以控制执行时机。Do可以任意置换核心类库，默认是jQuery。Do和ControlJS、LabJS最大的区别是加入了代码模块的组织和管理，有利于模块化网站中的脚本。但是Do没有实现模块机制，还算不上模块加载器。
[github](http://kejun.github.com/Do/)

###CommonJS

CommonJS是一个以构建JavaScript语言生态系统为目的组织。JavaScript要用于服务器端编程，就必须像java、php、python等有强大的标准库和代码组织规范。CommonJS是构建JavaScript标准库的规范，包含Modules定义规范，binary、io、system、sockets、event-queue等类库。js先天不足，没有严格模块化定义机制，所以CommonJS只能从如何定义标准模块的规范做起。CommonJS可能成为JavaScipt语法发展进化的方向之一。
[规范wiki](http://wiki.commonjs.org/wiki/CommonJS)
###RequireJS

RequireJS是遵循CommonJS Modules/AMD规范的模块加载器，require方法比较灵活，参数不同则功能也不一样，我也不喜欢这方式。RequireJS还考虑在NodeJS下运行，有与jQuery集成的代码。
[官网](http://requirejs.org/)  
###SeaJS

 和RequireJS不一样，SeaJS是遵循CommonJS Modules/AMD规范的模块加载器，比较赞同SeaJS的设计理念，专注于浏览器，崇尚简单，还支持CSS加载。提供部署打包工具spm 。想深入了解推荐玉伯的文章《SeaJS和RequireJS异同》
[官网](http://seajs.com/)

##我的加载器
###原理
###实现
###api文档
###demo


##todo
