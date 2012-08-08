/**
 * @author DZ
 */
/**
 * ��꾭��ҳ��js
 * @requires Common,channel
 */
var a=function(S){
	var manager=new S.Channel(); 
		//���õ�ǰ�˵�
		manager.setMenu(3);
		//��ѵ��ӰͼƬ����
		manager.carousel('#J_slide2', {
			autoplay:true,
			markupType:1,
			effect:'scrollx',
			navCls:'tab-nav',
			activeTriggerCls:'selected',
			panelCls:'tab-pannel',
			contentCls:'tab-content',
			prevBtnCls:'prev',
			nextBtnCls:'next'
		});
		//ѧԱ�������ֹ���
		manager.carousel('#J_slide1', {
			markupType:1,
			autoplay:true,
			effect:'fade',
			navCls:'tab-nav',
			activeTriggerCls:'selected',
			panelCls:'tab-pannel',
			contentCls:'tab-content'
		});
		//ѧԱ����չʾͼƬ����
		manager.carousel('#J_imgScroll', {
			markupType:1,
			autoplay:true,
			hasTriggers:false,
			effect:'scrollx',
			steps: 1,
			navCls:'tab-nav',
			panelCls:'tab-pannel',
			contentCls:'tab-content',
			prevBtnCls:'pre',
			nextBtnCls:'next',
			viewSize: [110],
			gapless:true
		});	
};

var CONTROL="999";
alert(CONTROL);
