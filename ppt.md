#模块加载
##模块
###定义

为完成某一功能所需的一段程序或子程序；或指能由编译程序、装配程序等处理的独立程序单位；或指大型软件系统的一部分。

###js模块化

这取决于项目的规模。单我们的项目比较大，js文件比较多时，模块化更有利于代码的维护和团队合作。

###其他语言如何加载模块
* PHP:inlcude(‘config.php’);
* JAVA:
* C/C++:#include <fstream>
* JS:<script src=‘core.js’ />

##已有的模块加载方法
###同步

通过标签引入：<script src=""></scriot>

###异步

####异步ajax请求

获取代码片段，然后运行

* 缺点

####动态插入标签
document.write("<script src=""></scriot>");
