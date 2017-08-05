!
function() {
	function e(e, i) {
		return a(e || self.document.URL || self.location.href, i || t())
	}
	function t() {
		var e = document.getElementsByTagName("script");
		return e[e.length - 1].src
	}
	function a(e, t) {
		var a = t;
		return /^(\/|\\\\)/.test(t) ? a = /^.+?\w(\/|\\\\)/.exec(e)[0] + t.replace(/^(\/|\\\\)/, "") : /^[a-z]+:/i.test(t) || (e = e.split("#")[0].split("?")[0].replace(/[^\\\/]+$/, ""), a = e + "" + t),
		i(a)
	}
	function i(e) {
		var t = /^[a-z]+:\/\//.exec(e)[0],
		a = null,
		i = [];
		for (e = e.replace(t, "").split("?")[0].split("#")[0], e = e.replace(/\\/g, "/").split(/\//), e[e.length - 1] = ""; e.length;)".." === (a = e.shift()) ? i.pop() : "." !== a && i.push(a);
		return t + i.join("/")
	}
	var l = "//s2.pstatp.com/pgc/v2/resource/pgc_web/static/ueditor/iframe.64a6fd7.css",
	o = window.UEDITOR_HOME_URL || e();
	window.UEDITOR_CONFIG = {
		iframeUrlMap: {
			anchor: "~/dialogs/anchor/anchor.html",
			insertimage: "~/dialogs/image/image.html?ver=20150807",
			link: "~/dialogs/link/link.html",
			spechars: "~/dialogs/spechars/spechars.html",
			searchreplace: "~/dialogs/searchreplace/searchreplace.html",
			map: "~/dialogs/map/map.html",
			gmap: "~/dialogs/gmap/gmap.html",
			insertvideo: "~/dialogs/video/video.html",
			help: "~/dialogs/help/help.html",
			preview: "~/dialogs/preview/preview.html",
			emotion: "~/dialogs/emotion/emotion.html",
			wordimage: "~/dialogs/wordimage/wordimage.html",
			attachment: "~/dialogs/attachment/attachment.html",
			insertframe: "~/dialogs/insertframe/insertframe.html",
			edittip: "~/dialogs/table/edittip.html",
			edittable: "~/dialogs/table/edittable.html",
			edittd: "~/dialogs/table/edittd.html",
			webapp: "~/dialogs/webapp/webapp.html",
			snapscreen: "~/dialogs/snapscreen/snapscreen.html",
			scrawl: "~/dialogs/scrawl/scrawl.html",
			music: "~/dialogs/music/music.html",
			template: "~/dialogs/template/template.html",
			background: "~/dialogs/background/background.html",
			charts: "~/dialogs/charts/charts.html",
			commodity: "~/dialogs/commodity/commodity.html",
			ic: "~/dialogs/ic/ic.html",
			images: "~/dialogs/images/images.html",
			temai: "~/dialogs/temai/index.html",
			game: "~/dialogs/game/index.html",
			"doc-import": "~/dialogs/doc-import/doc-import.html"
		},
		UEDITOR_HOME_URL: o,
		imageUrl: "/tools/upload_picture/?type=ueditor&pgc_watermark=1",
		imagePath: "",
		imageFieldName: "upfile",
		maxImageSideLength: 5e5,
		imageActionName: "uploadimage",
		imageAllowFiles: [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
		imageUrlPrefix: "p1.pstatp.com",
		imageMaxSize: 6072e3,
		imageInsertAlign: "",
		imageCompressEnable: !1,
		catchRemoteImageEnable: !0,
		catcherUrl: "/tools/catch_picture/",
		catcherPath: "",
		staticFilePath: "http://s2.pstatp.com/ueditor/",
		separater: "|",
		catcherLocalDomain: ["127.0.0.1", "localhost", "pstatp.com"],
		catcherActionName: "catchimage",
		catcherFieldName: "upfile",
		catcherUrlPrefix: "",
		catcherMaxSize: 3072e3,
		catcherAllowFiles: [".png", ".jpg", ".jpeg", ".gif", ".bmp"],
		documentAllowFiles: [".doc", ".docx", ".pdf", ".txt"],
		toolbars: [["bold", "underline", "justifyleft", "justifycenter", "justifyright", "insertunorderedlist", "insertorderedlist", "blockquote", "removeformat", "|", "simpleupload", "insertimage", "fullscreen"]],
		labelMap: {
			simpleupload: "单图上传",
			insertimage: "图片",
			create_vote: "投票",
			upload_video: "视频",
			groupimages: "组图",
			create_rank: "插入榜单"
		},
		theme: "default",
		themePath: o + "themes/",
		iframeCssUrl: l,
		initialFrameHeight: 600,
		enableAutoSave: !1,
		saveInterval: 500,
		imagePopup: !1,
		imageScaleEnabled: !1,
		pasteplain: !0,
		filterTxtRules: function() {
			function e(e) {
				e.tagName = "p",
				e.attrs = {},
				e.setStyle()
			}
			function t(e) {
				e.attrs = {},
				e.traversal(function(t) {
					if ("element" === t.type && "img" !== t.tagName) e.removeChild(t, !0);
					else if ("img" === t.tagName) {
						var a = t.getAttr("src"); - 1 !== a.indexOf("xmtbang.com") && (a = decodeURIComponent(a.replace(/^http:\/\/(.*)\/\?url=/, "")), t.setAttr("src", a))
					}
				})
			}
			return {
				"-": "script style object iframe embed input select",
				p: function(e) {
					var t = window.UEDITOR_CONFIG.imgCaptionClass,
					a = {},
					i = new RegExp("(^|\\s+)" + t + "(\\s+|$)");
					i.test(e.attrs["class"]) && (a["class"] = t),
					e.attrs = a
				},
				div: {
					$: {}
				},
				img: {
					$: {
						src: 1,
						id: 1
					}
				},
				strong: t,
				ul: {
					$: {}
				},
				ol: {
					$: {}
				},
				li: {
					p: 0,
					$: {}
				},
				table: {
					$: {}
				},
				thead: {
					$: {}
				},
				tbody: {
					$: {}
				},
				th: {
					$: {}
				},
				tr: {
					$: {}
				},
				td: {
					$: {}
				},
				blockquote: {
					$: {}
				},
				code: {
					$: {}
				},
				h1: {
					span: 0,
					$: {}
				},
				hr: {
					$: {}
				},
				caption: e,
				h2: e,
				h3: e,
				h4: e,
				h5: e,
				h6: e,
				pre: {
					$: {
						lang: 1
					}
				}
			}
		} (),
		elementPathEnabled: !1,
		wordCount: !1,
		autoHeightEnabled: !1,
		autotypeset: {
			mergeEmptyline: !0,
			removeClass: !1,
			removeEmptyline: !0,
			pasteFilter: !0,
			clearFontSize: !0,
			clearFontFamily: !0,
			leftTrim: !0
		},
		sourceEditor: "textarea",
		imgCaptionClass: "pgc-img-caption"
	},
	window.UE = {
		getUEBasePath: e
	}
} ();